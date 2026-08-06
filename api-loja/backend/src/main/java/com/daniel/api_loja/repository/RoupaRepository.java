package com.daniel.api_loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.enums.CategoriaRoupa;
import com.daniel.api_loja.model.Roupa;

public interface RoupaRepository extends JpaRepository<Roupa,Long> {
    
    //dessa forma eu consigo filtrar os tipos de Roupa por categoria
    List<Roupa> findByCategoriaRoupa(CategoriaRoupa categoriaRoupa);

}
