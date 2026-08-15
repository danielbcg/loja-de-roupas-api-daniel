package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Carrinho;
import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.repository.ClienteRepository;

@Service
public class ClienteService {
    
    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<Cliente> listarClientes(){
        return clienteRepository.findAll();
    }

        public Cliente criarCliente(Cliente cliente){
            cliente.setSenha(passwordEncoder.encode(cliente.getSenha()));

            Carrinho carrinho = new Carrinho();
            carrinho.setDataCriacao(LocalDate.now());
            carrinho.setValorTotal(0.0);
            cliente.setCarrinho(carrinho);

            return clienteRepository.save(cliente);
        }

    public Cliente atualizarCliente(Long id, Cliente dadosNovos){
        Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Cliente não existe"));

        cliente.setNome(dadosNovos.getNome());
        cliente.setEmail(dadosNovos.getEmail());
        cliente.setCpf(dadosNovos.getCpf());
        cliente.setEndereco(dadosNovos.getEndereco());
        cliente.setVendedor(dadosNovos.isVendedor());
        // senha não é atualizada aqui — trocar senha merece endpoint próprio, com confirmação

        return clienteRepository.save(cliente);
    }

    public void excluirCliente(Long id){
        clienteRepository.deleteById(id);
    }
}