package com.daniel.api_loja.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
@JsonIgnoreProperties({"carrinho", "senha", "password", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
public class Cliente extends Usuario {

    private String endereco;

    private boolean vendedor;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "carrinho_id")
    private Carrinho carrinho;
    
    //setters e getters

    public void setEndereco(String endereco){
        this.endereco=endereco;
    }

    public String getEndereco(){
        return endereco;
    }

    public void setCarrinho(Carrinho carrinho){
        this.carrinho=carrinho;
    }
    public Carrinho getCarrinho(){
        return carrinho;
    }

    public void setVendedor(boolean vendedor){
        this.vendedor=vendedor;
    }

    public boolean isVendedor(){
        return vendedor;
    }

}
