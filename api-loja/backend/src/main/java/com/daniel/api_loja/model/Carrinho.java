package com.daniel.api_loja.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Carrinho {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToMany
    @JoinTable(
        name = "carrinho_produto",
        joinColumns = @JoinColumn(name = "carrinho_id"),
        inverseJoinColumns = @JoinColumn(name = "produto_id")
    )
    private List<Produto> itens = new ArrayList<>();

    private LocalDate dataCriacao;

    private Double valorTotal;

    // setters e getters
    public void setId(Long id){
        this.id = id;
    }
    public Long getId(){
        return id;
    }

    public void setItens(List<Produto> itens){
        this.itens = itens;
    }
    public List<Produto> getItens(){
        return itens;
    }

    public void setDataCriacao(LocalDate dataCriacao){
        this.dataCriacao = dataCriacao;
    }
    public LocalDate getDataCriacao(){
        return dataCriacao;
    }

    public void setValorTotal(Double valorTotal){
        this.valorTotal = valorTotal;
    }
    public Double getValorTotal(){
        return valorTotal;
    }


    //regras de negócio
    public void adicionarProduto(Produto produto){
        itens.add(produto);
    }
    public void removerProduto(Produto produto){
        itens.remove(produto);
    }

    public void esvaziar(){
        itens.clear();
    }

    public Double calcularTotal(){
        double soma = 0;
        for (Produto p : itens) {
            soma += p.getPreco();
        }
        this.valorTotal = soma;
        return valorTotal;
    }

}
