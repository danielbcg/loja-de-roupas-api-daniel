package com.daniel.api_loja.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.daniel.api_loja.model.Administrador;
import com.daniel.api_loja.model.Cliente;
import com.daniel.api_loja.model.Roupa;
import com.daniel.api_loja.repository.RoupaRepository;

@Service
public class RoupaService {
    
    @Autowired
    private RoupaRepository roupaRepository;

    //listar roupas (catálogo público — só ativas)
    public List<Roupa> listarRoupas(){
        return roupaRepository.findByAtivoTrue();
    }

    public Roupa buscarPorId(Long id){
        return roupaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado."));
    }

    //listar roupas do próprio vendedor (inclui removidas)
    public List<Roupa> listarPorVendedor(Cliente vendedor){
        return roupaRepository.findByVendedor(vendedor);
    }

    //criar Roupa
    public Roupa criarRoupa(Roupa roupa, Cliente vendedor){
        if (!vendedor.isVendedor()) {
            throw new RuntimeException("Apenas contas de vendedor podem cadastrar produtos.");
        }
        roupa.setVendedor(vendedor);
        roupa.setAtivo(true);
        return roupaRepository.save(roupa);
    }

    //atualizar Roupa (só o dono pode)
    public Roupa atualizarRoupa(Long id, Roupa dadosNovos, Object usuarioLogado){
        Roupa roupa = roupaRepository.findById(id)
                        .orElseThrow( () -> new RuntimeException("Roupa não encontrada."));
        
        if (!(usuarioLogado instanceof Cliente) || !roupa.getVendedor().getId().equals(((Cliente) usuarioLogado).getId())) {
            throw new RuntimeException("Você não tem permissão para editar este produto.");
        }

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

    //excluir Roupa: dono exclui de verdade; admin faz soft delete
    public void excluirRoupa(Long id, Object usuarioLogado){
        Roupa roupa = roupaRepository.findById(id)
                        .orElseThrow( () -> new RuntimeException("Roupa não encontrada."));

        if (usuarioLogado instanceof Cliente) {
            Cliente cliente = (Cliente) usuarioLogado;
            if (!roupa.getVendedor().getId().equals(cliente.getId())) {
                throw new RuntimeException("Você não tem permissão para excluir este produto.");
            }
            roupaRepository.deleteById(id);
        } else if (usuarioLogado instanceof Administrador) {
            Administrador admin = (Administrador) usuarioLogado;
            roupa.setAtivo(false);
            roupa.setExcluidoPor(admin);
            roupa.setDataExclusao(LocalDate.now());
            roupaRepository.save(roupa);
        }
    }
}