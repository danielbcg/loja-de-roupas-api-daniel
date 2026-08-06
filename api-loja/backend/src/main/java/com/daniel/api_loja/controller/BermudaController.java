package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.api_loja.model.Bermuda;
import com.daniel.api_loja.service.BermudaService;

@RestController
@RequestMapping("/bermudas")
public class BermudaController {
    
    @Autowired
    private BermudaService bermudaService;

    @GetMapping
    public List<Bermuda> listar(){
        return bermudaService.listarBermudas();
    }

    @PostMapping
    public Bermuda criar(@RequestBody Bermuda bermuda){
        return bermudaService.criar(bermuda);
    }

    @PutMapping("/{id}")
    public Bermuda atualizar(@PathVariable Long id, @RequestBody Bermuda bermuda){
        return bermudaService.atualizar(id, bermuda);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        bermudaService.excluir(id);
    }


}
