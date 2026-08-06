package com.daniel.api_loja.model;

import jakarta.persistence.Entity;

@Entity
public class Bermuda extends Produto {
    
    private String cor;

    private String marca;

    private String tamanho;

    //setters e getters

    public void setCor(String cor){
        this.cor=cor;
    }

    public String getCor(){
        return cor;
    }

    public void setMarca(String marca){
        this.marca=marca;
    }

    public String getMarca(){
        return marca;
    }

    public void setTamanho(String tamanho){
        this.tamanho=tamanho;
    }

    public String getTamanho(){
        return tamanho;
    }

}
