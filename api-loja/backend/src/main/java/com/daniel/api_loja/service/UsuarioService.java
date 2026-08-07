package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Usuario;
import com.daniel.api_loja.repository.UsuarioRepository;

@Service
public class UsuarioService {
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    //listar usuarios
    public List<Usuario> listarUsuarios(){
        return usuarioRepository.findAll();
    }

}
