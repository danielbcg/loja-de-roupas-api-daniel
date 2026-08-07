package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.api_loja.model.Administrador;
import com.daniel.api_loja.service.AdministradorService;

@RestController
@RequestMapping("/admins")
public class AdministradorController {
    
    @Autowired
    private AdministradorService administradorService;

    //listar adms
    @GetMapping
    public List<Administrador> listar(){
        return administradorService.listarADMs();
    }

    //atualizar adm
    @PutMapping("/{id}")
    public Administrador atualizar(@RequestBody Administrador dadosNovos, @PathVariable Long id){
        return administradorService.atualizarADM(id, dadosNovos);
    }

    //excluir adm
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        administradorService.excluirADM(id);
    }

}
