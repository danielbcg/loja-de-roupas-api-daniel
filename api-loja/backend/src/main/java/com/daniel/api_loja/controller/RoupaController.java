package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.model.Roupa;
import com.daniel.api_loja.service.RoupaService;

@RestController
@RequestMapping("/roupas")
@CrossOrigin(origins = "http://localhost:5173") //depois confirma com o claude, ve sobre o node.js tbm
public class RoupaController {
    
    @Autowired
    private RoupaService roupaService;

    @GetMapping
    public List<Roupa> listar(){
        return roupaService.listarRoupas();
    }

    @PostMapping
    public Roupa criar(@RequestBody Roupa roupa, Authentication authentication){
        Cliente vendedor = (Cliente) authentication.getPrincipal();
        return roupaService.criarRoupa(roupa, vendedor);
    }

    @PutMapping("/{id}")
    public Roupa atualizar(@PathVariable Long id, @RequestBody Roupa roupa, Authentication authentication){
        Object usuarioLogado = authentication.getPrincipal();
        return roupaService.atualizarRoupa(id, roupa, usuarioLogado);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id, Authentication authentication){
        Object usuarioLogado = authentication.getPrincipal();
        roupaService.excluirRoupa(id, usuarioLogado);
    }

    @GetMapping("/minhas")
    public List<Roupa> minhasRoupas(Authentication authentication){
        Cliente vendedor = (Cliente) authentication.getPrincipal();
        return roupaService.listarPorVendedor(vendedor);
    }
}