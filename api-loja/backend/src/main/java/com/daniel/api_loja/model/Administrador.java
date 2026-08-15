package com.daniel.api_loja.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;

@Entity
@JsonIgnoreProperties({"authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
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
