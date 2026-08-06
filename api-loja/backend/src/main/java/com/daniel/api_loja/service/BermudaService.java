package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Bermuda;
import com.daniel.api_loja.repository.BermudaRepository;

@Service
public class BermudaService {
    
    @Autowired
    private BermudaRepository bermudaRepository;

    //listar bermudas
    public List<Bermuda> listarBermudas(){
        return bermudaRepository.findAll();
    }

    //criar bermuda
    public Bermuda criar(Bermuda bermuda){
        return bermudaRepository.save(bermuda);
    }

    //atualizar bermuda
    public Bermuda atualizar(Long id, Bermuda dadosNovos){
        Bermuda bermuda = bermudaRepository.findById(id)
        .orElseThrow( ()-> new RuntimeException("bermuda não encontrada"));

        bermuda.setTitulo(dadosNovos.getTitulo());
        bermuda.setTamanho(dadosNovos.getTamanho());
        bermuda.setQuantidade(dadosNovos.getQuantidade());
        bermuda.setPreco(dadosNovos.getPreco());
        bermuda.setMarca(dadosNovos.getMarca());
        bermuda.setDisponivel(dadosNovos.getDisponivel());
        bermuda.setDataChegada(dadosNovos.getDataChegada());
        bermuda.setCor(dadosNovos.getCor());
    
        return bermudaRepository.save(bermuda);
    
    }

    //excluir bermuda
    public void excluir(Long id){
        bermudaRepository.deleteById(id);
    }


}
