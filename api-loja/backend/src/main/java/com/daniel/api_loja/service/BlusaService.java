package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Blusa;
import com.daniel.api_loja.repository.BlusaRepository;

@Service
public class BlusaService {

    @Autowired
    private BlusaRepository blusaRepository;

    //listar blusas
    public List<Blusa> listarBlusas(){
        return blusaRepository.findAll();
    }

    //criar blusa
    public Blusa criar(Blusa blusa){
        return blusaRepository.save(blusa);
    }

    //atualizar blusa
    public Blusa atualizar(Long id, Blusa dadosNovos){
        Blusa blusa = blusaRepository.findById(id)
        .orElseThrow( ()-> new RuntimeException("Blusa não encontrada"));

        blusa.setTitulo(dadosNovos.getTitulo());
        blusa.setTamanho(dadosNovos.getTamanho());
        blusa.setQuantidade(dadosNovos.getQuantidade());
        blusa.setPreco(dadosNovos.getPreco());
        blusa.setMarca(dadosNovos.getMarca());
        blusa.setDisponivel(dadosNovos.getDisponivel());
        blusa.setDataChegada(dadosNovos.getDataChegada());
        blusa.setCor(dadosNovos.getCor());
    
        return blusaRepository.save(blusa);
    
    }

    //excluir blusa
    public void excluir(Long id){
        blusaRepository.deleteById(id);
    }


}
