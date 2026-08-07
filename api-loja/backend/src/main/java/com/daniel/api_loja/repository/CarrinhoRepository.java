package com.daniel.api_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Carrinho;

public interface CarrinhoRepository extends JpaRepository<Carrinho,Long>{
    
}
