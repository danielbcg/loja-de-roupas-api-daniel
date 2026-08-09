package com.daniel.api_loja.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario,Long> {
    
    Optional<Usuario> findByEmail(String email);

}
