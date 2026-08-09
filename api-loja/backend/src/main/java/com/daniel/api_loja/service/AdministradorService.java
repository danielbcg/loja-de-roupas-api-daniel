package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Administrador;
import com.daniel.api_loja.repository.AdministradorRepository;

@Service
public class AdministradorService {

    @Autowired
    private AdministradorRepository administradorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    //listar adms
    public List<Administrador> listarADMs(){
        return administradorRepository.findAll();
    }

    //criar adm
    public Administrador criarADM(Administrador adm){
        adm.setSenha(passwordEncoder.encode(adm.getSenha()));
        return administradorRepository.save(adm);
    }

    //atualizar adm
    public Administrador atualizarADM(Long id, Administrador dadosNovos){
        Administrador adm = administradorRepository.findById(id)
                            .orElseThrow(()->new RuntimeException("ADM não encontrado!"));

        adm.setNivelPermissao(dadosNovos.getNivelPermissao());
        adm.setCpf(dadosNovos.getCpf());
        adm.setEmail(dadosNovos.getEmail());
        adm.setNome(dadosNovos.getNome());
        // senha não é atualizada aqui — mesma lógica do ClienteService

        return administradorRepository.save(adm);
    }

    //excluir adm
    public void excluirADM(Long id){
        administradorRepository.deleteById(id);
    }
    
}