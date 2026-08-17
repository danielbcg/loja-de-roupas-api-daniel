package com.daniel.api_loja.model;

import java.time.LocalDate;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; 

    private String titulo;

    private String marca;

    private LocalDate dataChegada;

    private boolean disponivel;

    private Double preco;

    private String imagemUrl;

    private Long quantidade;

    @ManyToOne
    @JoinColumn(name="vendedor_id")
    private Cliente vendedor;

    private boolean ativo = true;

    @ManyToOne
    @JoinColumn(name = "excluido_por_admin_id")
    private Administrador excluidoPor;

    private LocalDate dataExclusao;

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

    public void setMarca(String marca){
        this.marca=marca;
    }

    public String getMarca(){
        return marca;
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

    public void setImagemUrl(String imagemUrl){
        this.imagemUrl = imagemUrl;
    }
 
    public String getImagemUrl(){
        return imagemUrl;
    }

    public void setQuantidade(Long quantidade){
        this.quantidade=quantidade;
    }

    public Long getQuantidade(){
        return quantidade;
    }

    public void setVendedor(Cliente vendedor){
        this.vendedor = vendedor;
    }

    public Cliente getVendedor(){
        return vendedor;
    }

    public void setAtivo(boolean ativo){
        this.ativo = ativo;
    }
    public boolean isAtivo(){
        return ativo;
    }

    public void setExcluidoPor(Administrador excluidoPor){
        this.excluidoPor = excluidoPor;
    }
    public Administrador getExcluidoPor(){
        return excluidoPor;
    }

    public void setDataExclusao(LocalDate dataExclusao){
        this.dataExclusao = dataExclusao;
    }
    public LocalDate getDataExclusao(){
        return dataExclusao;
    }

}
