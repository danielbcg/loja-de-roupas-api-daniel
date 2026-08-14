package com.daniel.api_loja.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.daniel.api_loja.model.Pagamento;

public interface PagamentoRepository extends JpaRepository<Pagamento, Long> {

}