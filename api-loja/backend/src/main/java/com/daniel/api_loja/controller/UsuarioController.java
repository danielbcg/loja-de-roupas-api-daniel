package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.api_loja.model.Usuario;
import com.daniel.api_loja.service.UsuarioService;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    
    @Autowired
    private UsuarioService usuarioService;

    //listar usuarios
    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.listarUsuarios();
    }



}
