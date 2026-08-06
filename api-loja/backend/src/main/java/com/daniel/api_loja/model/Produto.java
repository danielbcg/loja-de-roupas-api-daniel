package com.daniel.api_loja.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String titulo;

    private LocalDate dataChegada;

    private boolean disponivel;

    private Double preco;

    private Long quantidade;

    //Setteres e Getters

    public void setId(Long id){
        this.id=id;
    }

    public Long getId(){
        return id;
    }

    public void setTitulo(String titulo){
        this.titulo=titulo;
    }
    
    public String getTitulo(){
        return titulo;
    }

    public void setDataChegada(LocalDate dataChegada){
        this.dataChegada=dataChegada;
    }

    public LocalDate getDataChegada(){
        return dataChegada;
    }

    public void setDisponivel(boolean disponivel){
        this.disponivel=disponivel;
    }

    public boolean getDisponivel(){
        return disponivel;
    }

    public void setPreco(Double preco){
        this.preco=preco;
    }

    public Double getPreco(){
        return preco;
    }

    public void setQuantidade(Long quantidade){
        this.quantidade=quantidade;
    }

    public Long getQuantidade(){
        return quantidade;
    }

}
