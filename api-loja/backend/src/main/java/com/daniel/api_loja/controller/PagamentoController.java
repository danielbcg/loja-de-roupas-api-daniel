package com.daniel.api_loja.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.api_loja.model.Pagamento;
import com.daniel.api_loja.service.PagamentoService;

@RestController
@RequestMapping("/payments")
public class PagamentoController {

    @Autowired
    private PagamentoService pagamentoService;

    @PostMapping("/{pedidoId}")
    public Pagamento pagar(@PathVariable Long pedidoId){
        return pagamentoService.processarPagamento(pedidoId);
    }
}