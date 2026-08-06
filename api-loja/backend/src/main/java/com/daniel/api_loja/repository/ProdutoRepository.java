package com.daniel.api_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long> {
    

}
