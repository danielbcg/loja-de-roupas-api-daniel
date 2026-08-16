package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
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

    public Cliente atualizarCliente(Long id, Cliente dadosNovos, Authentication authentication){
        Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Cliente não existe"));
        
        verificarPermissao(cliente, authentication);

        boolean trocouEmail = !cliente.getEmail().equalsIgnoreCase(dadosNovos.getEmail());
        if (trocouEmail && clienteRepository.existsByEmail(dadosNovos.getEmail())) {
            throw new RuntimeException("Já existe uma conta cadastrada com este email.");
        }

        cliente.setNome(dadosNovos.getNome());
        cliente.setEmail(dadosNovos.getEmail());
        cliente.setCpf(dadosNovos.getCpf());
        cliente.setEndereco(dadosNovos.getEndereco());
        cliente.setVendedor(dadosNovos.isVendedor());
        // senha não é atualizada aqui — trocar senha merece endpoint próprio, com confirmação

        return clienteRepository.save(cliente);
    }

    public void excluirCliente(Long id, Authentication authentication){
        Cliente cliente = clienteRepository.findById(id)
        .orElseThrow(()->new RuntimeException("Cliente não existe"));
 
        verificarPermissao(cliente, authentication);
 
        clienteRepository.deleteById(id);
    }

    // só o próprio dono da conta ou um administrador podem editar/excluir
    private void verificarPermissao(Cliente cliente, Authentication authentication){
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(autoridade -> autoridade.getAuthority().equals("ROLE_ADMINISTRADOR"));
 
        if (isAdmin) return;
 
        Object principal = authentication.getPrincipal();
        if (!(principal instanceof Cliente) || !((Cliente) principal).getId().equals(cliente.getId())) {
            throw new RuntimeException("Você não tem permissão para alterar esta conta.");
        }
    }
}