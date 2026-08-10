package com.daniel.api_loja.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.daniel.api_loja.enums.StatusPedido;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;

@Entity
public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "cliente_id")
    @JsonIgnoreProperties({"carrinho", "senha", "password", "authorities", "accountNonExpired", "accountNonLocked", "credentialsNonExpired", "enabled", "username"})
    private Cliente cliente;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "pedido_id")
    private List<ItemPedido> itens = new ArrayList<>();

    private String endereco;

    private Double valorTotal;

    @Enumerated(EnumType.STRING)
    private StatusPedido status;

    private LocalDate dataCriacao;

    // setters e getters
    public void setId(Long id){ this.id = id; }
    public Long getId(){ return id; }

    public void setCliente(Cliente cliente){ this.cliente = cliente; }
    public Cliente getCliente(){ return cliente; }

    public void setItens(List<ItemPedido> itens){ this.itens = itens; }
    public List<ItemPedido> getItens(){ return itens; }

    public void setEndereco(String endereco){ this.endereco = endereco; }
    public String getEndereco(){ return endereco; }

    public void setValorTotal(Double valorTotal){ this.valorTotal = valorTotal; }
    public Double getValorTotal(){ return valorTotal; }

    public void setStatus(StatusPedido status){ this.status = status; }
    public StatusPedido getStatus(){ return status; }

    public void setDataCriacao(LocalDate dataCriacao){ this.dataCriacao = dataCriacao; }
    public LocalDate getDataCriacao(){ return dataCriacao; }
}