package com.daniel.api_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Administrador;

public interface AdministradorRepository extends JpaRepository<Administrador,Long> {
    
}
