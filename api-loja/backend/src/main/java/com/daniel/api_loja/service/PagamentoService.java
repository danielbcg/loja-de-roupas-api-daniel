package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.daniel.api_loja.enums.StatusPagamento;
import com.daniel.api_loja.enums.StatusPedido;
import com.daniel.api_loja.model.Pagamento;
import com.daniel.api_loja.model.Pedido;
import com.daniel.api_loja.repository.PagamentoRepository;
import com.daniel.api_loja.repository.PedidoRepository;

@Service
public class PagamentoService {

    @Autowired
    private PagamentoRepository pagamentoRepository;

    @Autowired
    private PedidoRepository pedidoRepository;

    private final Random random = new Random();

    @Transactional
    public Pagamento processarPagamento(Long pedidoId){
        Pedido pedido = pedidoRepository.findById(pedidoId)
                .orElseThrow(() -> new RuntimeException("Pedido não encontrado."));

        if (pedido.getStatus() != StatusPedido.PENDENTE) {
            throw new RuntimeException("Este pedido já foi processado ou não está pendente de pagamento.");
        }

        // Simula o resultado: 70% aprovado, 20% recusado, 10% pendente
        StatusPagamento status = sortearStatus();

        Pagamento pagamento = new Pagamento();
        pagamento.setPedido(pedido);
        pagamento.setStatus(status);
        pagamento.setValor(pedido.getValorTotal());
        pagamento.setDataPagamento(LocalDate.now());

        Pagamento pagamentoSalvo = pagamentoRepository.save(pagamento);

        if (status == StatusPagamento.APPROVED) {
            pedido.setStatus(StatusPedido.PAGO);
            pedidoRepository.save(pedido);
        } else if (status == StatusPagamento.DECLINED) {
            pedido.setStatus(StatusPedido.CANCELADO);
            pedidoRepository.save(pedido);
        }
        // se PENDING, o pedido continua PENDENTE, sem mudança

        return pagamentoSalvo;
    }

    private StatusPagamento sortearStatus(){
        int sorteio = random.nextInt(100);
        if (sorteio < 70) return StatusPagamento.APPROVED;
        if (sorteio < 90) return StatusPagamento.DECLINED;
        return StatusPagamento.PENDING;
    }
}