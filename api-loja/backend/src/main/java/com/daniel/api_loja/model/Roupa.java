package com.daniel.api_loja.model;

import com.daniel.api_loja.enums.CategoriaRoupa;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Roupa extends Produto{

    private String cor;

    private String tamanho;

    @Enumerated(EnumType.STRING)
    private CategoriaRoupa categoria;

    //setters e getters

    public void setCor(String cor){
        this.cor=cor;
    }

    public String getCor(){
        return cor;
    }

    public void setTamanho(String tamanho){
        this.tamanho=tamanho;
    }

    public String getTamanho(){
        return tamanho;
    }

    public void setCategoria(CategoriaRoupa categoria){
        this.categoria=categoria;
    }

    public CategoriaRoupa getCategoria(){
        return categoria;
    }

    
}
