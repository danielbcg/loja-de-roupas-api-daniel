package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daniel.api_loja.enums.StatusPedido;
import com.daniel.api_loja.model.*;
import com.daniel.api_loja.repository.CarrinhoRepository;
import com.daniel.api_loja.repository.PedidoRepository;
import com.daniel.api_loja.repository.ProdutoRepository;


@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    @Transactional
    public Pedido checkout(Cliente cliente){
        Carrinho carrinho = carrinhoRepository.findById(cliente.getCarrinho().getId())
            .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));

        if (carrinho.getItens().isEmpty()) {
            throw new RuntimeException("Carrinho vazio. Adicione produtos antes de finalizar a compra.");
        }

        List<ItemPedido> itensPedido = new ArrayList<>();
        double total = 0;

        for (Produto produto : carrinho.getItens()) {
            // Regra 2: produto precisa ter estoque
            if (produto.getQuantidade() == null || produto.getQuantidade() < 1) {
                throw new RuntimeException("Produto '" + produto.getTitulo() + "' está sem estoque.");
            }

            // Regra 3: preço registrado no momento da compra (congelado)
            ItemPedido item = new ItemPedido();
            item.setProduto(produto);
            item.setQuantidade(1L); // cada unidade no carrinho = 1 item (mesmo padrão do Carrinho)
            item.setPrecoUnitario(produto.getPreco());
            itensPedido.add(item);

            total += produto.getPreco();

            // Regra 4: estoque deve ser atualizado
            produto.setQuantidade(produto.getQuantidade() - 1);
            produtoRepository.save(produto);
        }

        Pedido pedido = new Pedido();
        pedido.setCliente(cliente);
        pedido.setItens(itensPedido);
        pedido.setEndereco(cliente.getEndereco());
        pedido.setValorTotal(total);
        pedido.setStatus(StatusPedido.PENDENTE); // Regra 5: pedido começa com status definido
        pedido.setDataCriacao(LocalDate.now());

        Pedido pedidoSalvo = pedidoRepository.save(pedido);

        // Esvazia o carrinho após o checkout
        carrinho.esvaziar();
        carrinho.calcularTotal();
        carrinhoRepository.save(carrinho);

        return pedidoSalvo;
    }

    public List<Pedido> listarMeusPedidos(Cliente cliente){
        return pedidoRepository.findByCliente(cliente);
    }

    public Pedido buscarPorId(Long id){
        return pedidoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));
    }

    public List<Pedido> listarTodos(){
        return pedidoRepository.findAll();
    }
}