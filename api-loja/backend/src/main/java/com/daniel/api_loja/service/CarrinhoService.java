package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Carrinho;
import com.daniel.api_loja.model.Produto;
import com.daniel.api_loja.repository.CarrinhoRepository;
import com.daniel.api_loja.repository.ProdutoRepository;

@Service
public class CarrinhoService {
    
    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ProdutoRepository produtoRepository;


    //listar carrinhos
    public List<Carrinho> listarCarrinhos(){
        return carrinhoRepository.findAll();
    }

    //criar carrinho
    public Carrinho criarCarrinho(Carrinho carrinho){
        return carrinhoRepository.save(carrinho);
    }

    //adicionar produto do carrinho
    public Carrinho adicionarProduto(Long carrinhoId, Long produtoId){
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId)
                            .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        Produto produto = produtoRepository.findById(produtoId)
                            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        carrinho.adicionarProduto(produto);
        carrinho.calcularTotal();
        return carrinhoRepository.save(carrinho);
    }

    //remover produto do carrinho
    public Carrinho removerProduto(Long carrinhoId, Long produtoId){
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId)
                            .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        Produto produto = produtoRepository.findById(produtoId)
                            .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        carrinho.removerProduto(produto);
        carrinho.calcularTotal();
        return carrinhoRepository.save(carrinho);
    }

    //esvaziar carrinho
    public Carrinho esvaziarCarrinho(Long carrinhoId){
        Carrinho carrinho = carrinhoRepository.findById(carrinhoId)
                            .orElseThrow(() -> new RuntimeException("Carrinho não encontrado"));
        carrinho.esvaziar();
        carrinho.calcularTotal();
        return carrinhoRepository.save(carrinho);
    }

    //excluir carrinho
    public void excluirCarrinho(Long id){
        carrinhoRepository.deleteById(id);
    }

}
