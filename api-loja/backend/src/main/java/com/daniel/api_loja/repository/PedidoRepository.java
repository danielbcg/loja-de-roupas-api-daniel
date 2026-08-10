package com.daniel.api_loja.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.model.Pedido;

public interface PedidoRepository extends JpaRepository<Pedido, Long> {

    List<Pedido> findByCliente(Cliente cliente);

}