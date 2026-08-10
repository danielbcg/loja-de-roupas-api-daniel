package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.model.Pedido;
import com.daniel.api_loja.service.PedidoService;

@RestController
@RequestMapping("/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping("/checkout")
    public Pedido checkout(Authentication authentication){
        Cliente cliente = (Cliente) authentication.getPrincipal();
        return pedidoService.checkout(cliente);
    }

    @GetMapping("/meus")
    public List<Pedido> meusPedidos(Authentication authentication){
        Cliente cliente = (Cliente) authentication.getPrincipal();
        return pedidoService.listarMeusPedidos(cliente);
    }

    @GetMapping("/{id}")
    public Pedido buscarPorId(@PathVariable Long id){
        return pedidoService.buscarPorId(id);
    }
}