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

import com.daniel.api_loja.model.Blusa;
import com.daniel.api_loja.service.BlusaService;

@RestController
@RequestMapping("/blusas")
public class BlusaController {
    
    @Autowired
    private BlusaService blusaService;

    @GetMapping
    public List<Blusa> listar(){
        return blusaService.listarBlusas();
    }

    @PostMapping
    public Blusa criar(@RequestBody Blusa blusa){
        return blusaService.criar(blusa);
    }

    @PutMapping("/{id}")
    public Blusa atualizar(@PathVariable Long id, @RequestBody Blusa blusa){
        return blusaService.atualizar(id, blusa);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        blusaService.excluir(id);
    }



}
