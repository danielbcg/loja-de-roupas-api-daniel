package com.daniel.api_loja.model;

import jakarta.persistence.*;

@Entity
public class ItemPedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "produto_id")
    private Produto produto;

    private Long quantidade;

    private Double precoUnitario;

    // setters e getters
    public void setId(Long id){ this.id = id; }
    public Long getId(){ return id; }

    public void setProduto(Produto produto){ this.produto = produto; }
    public Produto getProduto(){ return produto; }

    public void setQuantidade(Long quantidade){ this.quantidade = quantidade; }
    public Long getQuantidade(){ return quantidade; }

    public void setPrecoUnitario(Double precoUnitario){ this.precoUnitario = precoUnitario; }
    public Double getPrecoUnitario(){ return precoUnitario; }

    public Double getSubtotal(){
        return precoUnitario * quantidade;
    }
}