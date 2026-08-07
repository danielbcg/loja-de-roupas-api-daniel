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

    //criar usuario
    public Usuario criarUsuario(Usuario usuario){
        return usuarioRepository.save(usuario);
    }

    //atualizar usuarios por id (dados do mesmo)
    public Usuario atualizarUsuario(Long id, Usuario dadosNovos){
        Usuario usuario = usuarioRepository.findById(id)
                            .orElseThrow(()->new RuntimeException("Usuário não encontrado."));
        usuario.setCpf(dadosNovos.getCpf());
        usuario.setEmail(dadosNovos.getEmail());
        usuario.setNome(dadosNovos.getNome());
        usuario.setSenha(dadosNovos.getSenha());
        
        return usuarioRepository.save(usuario);
    }

    //excluir usuario (por id)
    public void excluirUsuario(Long id){
        usuarioRepository.deleteById(id);
    }

}
