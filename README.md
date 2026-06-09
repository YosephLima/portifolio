# Meu Portfólio

Portfólio desenvolvido no curso de Desenvolvimento de Software Multiplataforma (FATEC SJC). O repositório utiliza a estrutura de **Monorepo** (NPM Workspaces) com pastas separadas para o Frontend, Backend e arquivos compartilhados.

## 🚀 Tecnologias

### Frontend
- **HTML, CSS, JavaScript**

### Backend
- **Node.js** com **Express** para a criação da API REST
- **Prisma** (ORM com MySQL) para conexão com banco de dados
- **Zod** para validação por schemas
- **Nodemon** para recarregamento automático no desenvolvimento

## ⚙️ Pré-requisitos

Para rodar este projeto na sua máquina, você vai precisar de:
- **Node.js** (LTS recomendado)
- **npm** (gerenciador de pacotes padrão do Node)
- **MySQL** rodando (necessário para o banco de dados do backend)

## 🛠️ Como rodar o projeto

**1. Clone o repositório:**
```bash
git clone https://github.com/YosephLima/portifolio.git
cd portifolio
```

**2. Instale as dependências:**
Na raiz do repositório, rode o comando de instalação. 
> 💡 **Nota:** Como o projeto usa NPM Workspaces, rodar `npm install` na raiz irá instalar as dependências de todas as subpastas simultaneamente e **também rodará automaticamente o `postinstall` do backend** (executando o `prisma generate`).
```bash
npm install
```

**3. Configure o Banco de Dados (Backend):**
Antes de iniciar a API, você precisa configurar a conexão com o banco de dados. 

Crie um arquivo chamado `.env` dentro da pasta `backend/` com a variável `DATABASE_URL`. O Prisma utiliza essa variável para se conectar ao banco de dados MySQL, e o formato dela deve ser assim:

```env
DATABASE_URL="mysql://usuario:senha@localhost:3306/nome_do_banco"
```
*(Substitua `usuario`, `senha` e `nome_do_banco` pelas credenciais do seu MySQL local).*

Em seguida, acesse a pasta do backend e rode as migrations para criar as tabelas do banco:
```bash
cd backend
npm run migrate
```

**4. Inicie o Backend:**
Ainda na pasta do backend, inicie o servidor de desenvolvimento:
```bash
npm run dev
```
> Se tudo estiver configurado corretamente, a API do backend estará rodando em `http://localhost:3000`.

**5. Inicie o Frontend:**
Para ver a interface do usuário, acesse a pasta `frontend/` e abra o `index.html` em seu navegador (ou utilize a extensão Live Server do VS Code).

### 🔐 Acesso ao Modo Admin
Para acessar o modo administrador, clique no nome **"Yoseph Levi"** no cabeçalho (Header) da interface. Irá aparecer um modal solicitando a senha. A senha padrão é: `admin`.

## 📂 Estrutura do Projeto

Aqui está um resumo da organização dos arquivos:

```text
📁 portfolio/
├── 📁 backend/                # API REST (Node.js + Express)
│   ├── 📁 docs/               # Documentação das Rotas e Modelos em Markdown
│   ├── 📁 prisma/             # Configurações do ORM (Schema do DB e Migrations)
│   └── 📁 src/                # Código-fonte principal da API
│       ├── 📁 controllers/    # Controladores (regras de negócio de cada rota)
│       ├── 📁 prisma/         # Instância do Prisma Client exportada
│       ├── 📁 routes/         # Definição das rotas da API REST
│       ├── 📄 app.js          # Configuração do Express e Middlewares
│       └── 📄 server.js       # Ponto de entrada do servidor backend
│
├── 📁 frontend/               # Interface de Usuário (HTML, CSS, Vanilla JS)
│   ├── 📁 img/                # Imagens e assets estáticos
│   ├── 📁 js/                 # Scripts do Frontend (Lógica, API, Admin)
│   ├── 📄 index.html          # Estrutura principal da página (Single Page)
│   └── 📄 style.css           # Estilização da página
│
└── 📁 shared/                 # Código comum (NPM Workspace)
    └── 📁 schemas/            # Schemas de validação Zod para os dados
```

## 📚 Documentação da API

Você pode encontrar detalhes mais aprofundados sobre a API REST (Backend) nos seguintes arquivos:
- [Modelo de dados](backend/docs/modelo_de_dados.md)
- [Detalhes das rotas](backend/docs/detalhes_rotas.md)
