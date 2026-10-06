# BONYWEAR

> E-commerce de roupas desenvolvido com foco em arquitetura robusta, segurança com Spring Security e persistência de dados.

![Java](https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Spring Security](https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=spring-security&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Maven](https://img.shields.io/badge/Maven-C71A36?style=for-the-badge&logo=apache-maven&logoColor=white)

---

## Sobre o projeto

O **BONYWEAR** é um projeto pessoal solo criado com o objetivo de consolidar e levar para a prática conceitos avançados de backend com o ecossistema Spring.

A motivação principal foi ir além do básico: construir uma API REST estruturada, com arquitetura em camadas bem definida, padrões como DTOs e Mappers, modelagem de dados relacional e tratamento rigoroso de segurança, autenticação e regras de acesso.

---

## Funcionalidades

- **Autenticação e Autorização:** Implementação via Spring Security utilizando tokens JWT stateless.
- **Controle de Acesso Baseado em Perfis (RBAC):** Separação de permissões entre clientes e administradores.
- **Restrição por Propriedade:** Regras de negócio que garantem que usuários acessem e modifiquem exclusivamente seus próprios recursos.
- **Gestão de Produtos:** CRUD completo com validações de entrada.
- **Filtros Avançados:** Busca e listagem flexível de peças no catálogo.
- **Controle de Estoque:** Atualização e consistência da quantidade de itens disponíveis.
- **Carrinho de Compras:** Gestão dos itens selecionados pelo usuário em sessão/conta.
- **Persistência em Nuvem:** Conexão direta com banco relacional PostgreSQL hospedado no Neon DB.

---

## Stack técnica

### Backend
- Java
- Spring Boot
- Spring Security (Autenticação JWT & RBAC)
- REST API (Arquitetura em camadas com DTOs e Mappers)
- Maven (Gerenciamento de dependências e build)

### Banco de dados
- PostgreSQL (hospedado via Neon DB)

### Frontend
- React
- JavaScript

### Ferramentas & Produtividade
- Git e GitHub
- Insomnia (Testes de endpoints)

---

## Aprendizados & Processo

Minha zona de conforto sempre foi a lógica e a arquitetura de backend. No entanto, para que a aplicação tivesse um ciclo completo de uso, era necessário construir uma interface web integrada.

Eu nunca tinha trabalhado com React antes deste projeto. Em vez de travar ou terceirizar a solução sem entender o funcionamento, utilizei ferramentas de IA generativa como acelerador de aprendizado. Com isso, estudei o ecossistema de componentes, estados e consumo de APIs HTTP no frontend, implementando a interface necessária enquanto mantinha o foco principal na solidez da arquitetura backend.

Não me tornei um especialista em React, mas essa experiência reforçou uma competência técnica essencial: capacidade de pesquisa, iteração rápida e o uso consciente de IA para aprender e desbloquear problemas técnicos sem abrir mão do senso crítico e do controle sobre o código.

---

## Como rodar o projeto

### Pré-requisitos
- JDK 17+ instalado
- Maven instalado (ou use o wrapper `./mvnw`)
- Node.js e npm instalados
- Instância do PostgreSQL (ou conta no [Neon DB](https://neon.tech))

### 1. Clonar o repositório

```bash
git clone https://github.com/danielbcg/loja-de-roupas-api-daniel.git
cd loja-de-roupas-api-daniel