package com.daniel.api_loja.model;

import jakarta.persistence.Entity;

@Entity
public class Administrador extends Usuario{
    
    private String nivelPermissao;

    //setters e getters
    public void setNivelPermissao(String nivelPermissao){
        this.nivelPermissao=nivelPermissao;
    }
    public String getNivelPermissao(){
        return nivelPermissao;
    }

}
