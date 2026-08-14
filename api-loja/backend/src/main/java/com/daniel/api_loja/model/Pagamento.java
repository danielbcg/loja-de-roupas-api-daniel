package com.daniel.api_loja.model;

import java.time.LocalDate;

import com.daniel.api_loja.enums.StatusPagamento;

import jakarta.persistence.*;

@Entity
public class Pagamento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "pedido_id")
    private Pedido pedido;

    @Enumerated(EnumType.STRING)
    private StatusPagamento status;

    private Double valor;

    private LocalDate dataPagamento;

    // setters e getters
    public void setId(Long id){ this.id = id; }
    public Long getId(){ return id; }

    public void setPedido(Pedido pedido){ this.pedido = pedido; }
    public Pedido getPedido(){ return pedido; }

    public void setStatus(StatusPagamento status){ this.status = status; }
    public StatusPagamento getStatus(){ return status; }

    public void setValor(Double valor){ this.valor = valor; }
    public Double getValor(){ return valor; }

    public void setDataPagamento(LocalDate dataPagamento){ this.dataPagamento = dataPagamento; }
    public LocalDate getDataPagamento(){ return dataPagamento; }
}