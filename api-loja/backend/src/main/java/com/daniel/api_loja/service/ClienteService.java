package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Carrinho;
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

    //criar cliente (já cria o carrinho automaticamente junto)
    public Cliente criarCliente(Cliente cliente){
        Carrinho carrinho = new Carrinho();
        carrinho.setDataCriacao(LocalDate.now());
        carrinho.setValorTotal(0.0);
        cliente.setCarrinho(carrinho);

        return clienteRepository.save(cliente);
    }

    //atualizar cliente
    public Cliente atualizarCliente(Long id, Cliente dadosNovos){
        Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Cliente não existe"));

        cliente.setNome(dadosNovos.getNome());
        cliente.setEmail(dadosNovos.getEmail());
        cliente.setSenha(dadosNovos.getSenha());
        cliente.setCpf(dadosNovos.getCpf());
        cliente.setEndereco(dadosNovos.getEndereco());
        cliente.setVendedor(dadosNovos.isVendedor());
        
        return clienteRepository.save(cliente);
    }

    //excluir cliente
    public void excluirCliente(Long id){
        clienteRepository.deleteById(id);
    }
}