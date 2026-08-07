package com.daniel.api_loja.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    //listar clientes
    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

    //criar cliente
    public Cliente criarCliente(Cliente cliente){
        return clienteRepository.save(cliente);
    }

    //atualizar cliente
    public Cliente atualizarCliente(Long id, Cliente dadosNovos){
        Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Cliente não existe"));

        cliente.setEndereco(dadosNovos.getEndereco());
        cliente.setVendedor(dadosNovos.isVendedor());
        cliente.setCarrinho(dadosNovos.getCarrinho());
        cliente.setCpf(dadosNovos.getCpf());
        cliente.setEmail(dadosNovos.getEmail());
        cliente.setNome(dadosNovos.getNome());
        cliente.setSenha(dadosNovos.getSenha());

        return clienteRepository.save(cliente);
    
    }

    //excluir cliente
    public void excluirCliente(Long id){
        clienteRepository.deleteById(id);
    }

}
