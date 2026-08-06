package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Produto;
import com.daniel.api_loja.repository.ProdutoRepository;

@Service
public class ProdutoService {

    @Autowired
    private ProdutoRepository produtoRepository;

    //Listar produtos
    public List<Produto> listarProdutos(){
        return produtoRepository.findAll();
    }

    //Criar produto
    public Produto criar(Produto produto){
        return produtoRepository.save(produto);
    }

    //Atualizar produto
    public Produto atualizar(Long id, Produto dadosNovos){
        Produto produto = produtoRepository.findById(id)
                         .orElseThrow(() -> new RuntimeException("PRODUTO NÃO ENCONTRADO"));
        produto.setDataChegada(dadosNovos.getDataChegada());
        produto.setDisponivel(dadosNovos.getDisponivel());
        produto.setPreco(dadosNovos.getPreco());
        produto.setQuantidade(dadosNovos.getQuantidade());

        return produtoRepository.save(produto);
    }

    //Excluir produto
    public void excluir(Long id){
        produtoRepository.deleteById(id);
    }

    
}
