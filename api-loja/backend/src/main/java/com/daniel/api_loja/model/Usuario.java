package com.daniel.api_loja.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public class Usuario {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    private String senha;

    private String cpf;

    //setters e getters
    public void setId(Long id){
        this.id=id;
    }
    public Long getId(){
        return id;
    }

    public void setNome(String nome){
        this.nome=nome;
    }
    public String getNome(){
        return nome;
    }

    public void setEmail(String email){
        this.email=email;
    }
    public String getEmail(){
        return email;
    }

    public void setSenha(String senha){
        this.senha=senha;
    }
    public String getSenha(){
        return senha;
    }

    public void setCpf(String cpf){
        this.cpf=cpf;
    }
    public String getCpf(){
        return cpf;
    }

    
}
