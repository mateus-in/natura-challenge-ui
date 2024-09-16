# 📦 Teste Técnico Natura&Co (Desenvolvedor Sênior)

Este é o repositório do frontend do projeto Natura Challenge, que complementa a [API desenvolvida](https://github.com/mateus-in/natura-challenge-api) para fornecer uma aplicação web completa de e-commerce. Este frontend foi criado usando **React** com **Vite** e está integrado com a API para oferecer funcionalidades como listagem de produtos, gerenciamento de carrinho, autenticação de usuários, entre outros.

## 🚀 Tecnologias Utilizadas

- **React** para construção da interface de usuário
- **Vite** para desenvolvimento e build rápido
- **React Router** para gerenciamento de rotas
- **React Hook Form** e **Zod** para gerenciamento e validação de formulários
- **Axios** para requisições HTTP
- **React Query** para gerenciamento de estado remoto e otimização de chamadas à API
- **js-cookie** para manipulação de cookies e gerenciamento do token de autenticação

## 📁 Estrutura de Pastas

A estrutura de pastas do projeto segue boas práticas de organização para garantir modularidade, escalabilidade e fácil manutenção.

```plaintext
src/
├── components            # Componentes reutilizáveis (Header, Footer, etc.)
├── contexts              # Contextos globais, como autenticação e carrinho
├── helpers               # Funções auxiliares e utilitárias
├── hooks                 # Hooks personalizados para lógica de negócios
├── interfaces            # Definições de interfaces TypeScript
├── lib                   # Instâncias e configurações de bibliotecas (ex: axios)
├── pages                 # Páginas principais do aplicativo (Home, Cart, SignIn, SignUp, etc.)
├── services              # Serviços para interações com a API (auth, user, products, etc.)
├── styles                # Estilos globais e configurações de CSS/Tailwind
└── main.tsx              # Arquivo principal de entrada do aplicativo
```

### 📄 Explicação dos Diretórios

- **components/**: Contém componentes reutilizáveis e modulares utilizados em várias partes do aplicativo.
- **contexts/**: Armazena contextos globais que gerenciam o estado compartilhado, como autenticação e gerenciamento do carrinho.
- **helpers/**: Inclui funções utilitárias e auxiliares usadas em todo o projeto.
- **hooks/**: Hooks personalizados para encapsular e reutilizar lógica de negócios complexa.
- **interfaces/**: Definições de interfaces TypeScript que descrevem tipos e contratos do projeto.
- **lib/**: Configurações e instâncias de bibliotecas externas (ex: configuração do Axios).
- **pages/**: Páginas principais que representam as diferentes rotas do aplicativo.
- **services/**: Serviços para chamadas à API e lógica de negócios relacionada a essas operações.
- **styles/**: Contém estilos globais, como arquivos CSS ou configurações do TailwindCSS.

## 📚 Casos de Uso

### Produtos

- **Listar produtos**: Exibe todos os produtos disponíveis na loja.
- **Filtrar produtos por departamento**: Permite filtrar produtos com base no departamento selecionado.
- **Filtrar produtos por categoria**: Permite filtrar produtos com base na categoria selecionada.
- **Adicionar produto ao carrinho**: Permite adicionar produtos ao carrinho de compras.
- **Remover produto do carrinho**: Remove um produto específico do carrinho.
- **Atualizar a quantidade de um determinado item do carrinho**: Permite ajustar a quantidade de um item específico no carrinho.
- **Limpar o carrinho**: (A fazer) Remove todos os itens do carrinho de compras.
- **Concluir uma compra e gerar um pedido**: Finaliza o pedido e gera uma ordem de compra.
- **Listar os pedidos do usuário**: Exibe o histórico de pedidos do usuário autenticado.

### Autenticação

- **Fazer login**: Autentica o usuário na plataforma e armazena o token de acesso.
- **Cadastrar o usuário**: (A fazer) Registra um novo usuário na plataforma.

## 🛠️ Como Executar o Projeto

### Pré-requisitos

- Node.js v16.x ou superior
- API (https://github.com/mateus-in/natura-challenge-api)

### Instalação

1. Clone o repositório:

  ```bash
  git clone https://github.com/mateus-in/natura-challenge-ui.git
  cd natura-challenge-ui
  ```

2. Instale as dependências:

  ```bash
  npm i
  ```

3.	Acesse a aplicação em:

  ```bash
  http://localhost:5173
  ```


## 🧑‍💻 Usuário de Testes

Para facilitar o teste da aplicação, você pode utilizar um dos usuários de testes já criados. Apenas certifique-se de que o banco de dados está rodando e que as seeds foram executadas.

### Usuário USER

user1@naturachallenge.com.br
naturachallengepass'
