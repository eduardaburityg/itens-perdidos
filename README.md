# Sistema de Itens Perdidos

Este projeto é uma aplicação web desenvolvida em **React + Express + Prisma** que permite o cadastro e visualização de itens perdidos, com autenticação de usuários.

## 🔧 Tecnologias: 

- Frontend: React + Tailwind CSS
- Backend: Node.js + Express
- ORM: Prisma
- Banco de Dados: SQLite
- Gerenciador de pacotes: npm

## 💻 Funcionalidades

- Cadastro de usuários
- Login com verificação
- Cadastro de itens perdidos
- Exibição dos itens cadastrados
- Visual responsivo e moderno
- Inserção de itens achados

## ⚙️ Como executar localmente

```bash
# Clone o projeto
git clone https://github.com/eduardaburityg/itens-perdidos.git
cd itens-perdidos

# Instale as dependências do backend
cd backend
npm install

# Gere o cliente Prisma e crie o banco de dados
npx prisma generate
npx prisma migrate dev --name init

# Inicie o servidor backend
node index.js

# Em outro terminal, instale e execute o frontend
cd frontend
npm install
npm run dev
