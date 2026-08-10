package com.daniel.api_loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.enums.CategoriaRoupa;
import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.model.Roupa;

public interface RoupaRepository extends JpaRepository<Roupa, Long> {
    List<Roupa> findByCategoria(CategoriaRoupa categoria);

    List<Roupa> findByAtivoTrue();

    List<Roupa> findByVendedor(Cliente vendedor);

}