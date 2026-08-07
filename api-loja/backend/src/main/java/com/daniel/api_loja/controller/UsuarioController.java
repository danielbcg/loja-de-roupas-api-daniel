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

    //criar usuario
    @PostMapping
    public Usuario criar(@RequestBody Usuario usuario){
        return usuarioService.criarUsuario(usuario);
    }

    //atualizar usuario
    @PutMapping
    public Usuario atualizar(@PathVariable Long id, @RequestBody Usuario usuario){
        return usuarioService.atualizarUsuario(id, usuario);
    }

    //excluir usuario
    @DeleteMapping
    public void excluir(@PathVariable Long id){
        usuarioService.excluirUsuario(id);
    }



}
