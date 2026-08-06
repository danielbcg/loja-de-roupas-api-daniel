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

import com.daniel.api_loja.model.Roupa;
import com.daniel.api_loja.service.RoupaService;

@RestController
@RequestMapping("/roupas")
public class RoupaController {
    
    @Autowired
    private RoupaService roupaService;

    //listar roupas
    @GetMapping
    public List<Roupa> listar(){
        return roupaService.listarRoupas();
    }

    //criar roupa
    @PostMapping
    public Roupa criar(@RequestBody Roupa roupa){
        return roupaService.criarRoupa(roupa);
    }

    //atualizar roupa
    @PutMapping("/{id}")
    public Roupa atualizar(@PathVariable Long id, @RequestBody Roupa roupa){
        return roupaService.atualizarRoupa(id, roupa);
    }

    //excluir roupa
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        roupaService.excluirRoupa(id);
    }

}
