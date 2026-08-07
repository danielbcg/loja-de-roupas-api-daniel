package com.daniel.api_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente,Long>{
    
}
