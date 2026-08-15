package com.daniel.api_loja.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Usuario implements UserDetails{
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;

    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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


    // métodos exigidos pela interface UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String tipo = this.getClass().getSimpleName().toUpperCase(); // "CLIENTE" ou "ADMINISTRADOR"
        return List.of(new SimpleGrantedAuthority("ROLE_" + tipo));
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return this.senha;
    }

    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    
}
