package com.daniel.api_loja.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.daniel.api_loja.model.Carrinho;
import com.daniel.api_loja.service.CarrinhoService;

@RestController
@RequestMapping("/carrinhos")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    @GetMapping
    public List<Carrinho> listar(){
        return carrinhoService.listarCarrinhos();
    }
    
    @PostMapping("/{carrinhoId}/adicionar/{produtoId}")
    public Carrinho adicionarProduto(@PathVariable Long carrinhoId, @PathVariable Long produtoId){
        return carrinhoService.adicionarProduto(carrinhoId, produtoId);
    }

    @PostMapping("/{carrinhoId}/remover/{produtoId}")
    public Carrinho removerProduto(@PathVariable Long carrinhoId, @PathVariable Long produtoId){
        return carrinhoService.removerProduto(carrinhoId, produtoId);
    }

    @PutMapping("/{carrinhoId}/esvaziar")
    public Carrinho esvaziar(@PathVariable Long carrinhoId){
        return carrinhoService.esvaziarCarrinho(carrinhoId);
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id){
        carrinhoService.excluirCarrinho(id);
    }

}
