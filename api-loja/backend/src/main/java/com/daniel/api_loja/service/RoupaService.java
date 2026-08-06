package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Roupa;
import com.daniel.api_loja.repository.RoupaRepository;

@Service
public class RoupaService {
    
    @Autowired
    private RoupaRepository roupaRepository;

    //listar roupas
    public List<Roupa> listarRoupas(){
        return roupaRepository.findAll();
    }

    //criar Roupa
    public Roupa criarRoupa(Roupa roupa){
        return roupaRepository.save(roupa);
    }

    //atualizar Roupa
    public Roupa atualizarRoupa(Long id, Roupa dadosNovos){
        Roupa roupa = roupaRepository.findById(id)
                        .orElseThrow( () -> new RuntimeException("Roupa não encontrada."));
        
        roupa.setCategoria(dadosNovos.getCategoria());
        roupa.setCor(dadosNovos.getCor());
        roupa.setDataChegada(dadosNovos.getDataChegada());
        roupa.setDisponivel(dadosNovos.getDisponivel());
        roupa.setMarca(dadosNovos.getMarca());
        roupa.setPreco(dadosNovos.getPreco());
        roupa.setQuantidade(dadosNovos.getQuantidade());
        roupa.setTamanho(dadosNovos.getTamanho());
        roupa.setTitulo(dadosNovos.getTitulo());

        return roupaRepository.save(roupa);
        
    }


    //excluir
    public void excluirRoupa(Long id){
        roupaRepository.deleteById(id);
    }
}
