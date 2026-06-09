# 🚀 API - Documentação Geral de Rotas

Lista unificada de todos os endpoints da aplicação, detalhando os métodos HTTP, as rotas e os campos esperados no corpo da requisição (payload) para operações de escrita.

---

## 📄 Apresentação (Registro Único)
*Como é um registro único, não há passagem de ID.*
- **GET** `/apresentacao` : Retorna os dados da apresentação.
- **PUT** `/apresentacao` : Atualiza a apresentação. *(Body: titulo, texto_negrito, texto_completo)*
- **DELETE** `/apresentacao` : Remove os dados da apresentação.

**Exemplo de Body (PUT):**
```json
{
  "titulo": "Olá - sou Yoseph Levi",
  "texto_negrito": "Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores",
  "texto_completo": "Sou um Desenvolvedor de Software focado em criar aplicações web que automatizam e organizam processos nos mais variados setores. Meu Fascínio pela Tecnologia tem me levado a entender cada vez mais as camadas mais profundas do funcionamento das tecnologias atuais."
}
```

---

## 🎓 Formação
- **GET** `/formacoes` : Lista todas as formações acadêmicas.
- **GET** `/formacoes/:id` : Retorna os detalhes de uma formação específica.
- **POST** `/formacoes` : Cria o registro de uma nova formação. *(Body: nome, status, local, inicio, fim)*
- **PUT** `/formacoes/:id` : Atualiza os dados de uma formação existente.
- **DELETE** `/formacoes/:id` : Remove uma formação do sistema.

**Exemplo de Body (POST/PUT):**
```json
{
  "nome": "Ciência da Computação",
  "status": true,
  "local": "Universidade de Taubaté",
  "inicio": 2022,
  "fim": 2026
}
```

---

## 💼 Experiência
- **GET** `/experiencias` : Lista todas as experiências profissionais.
- **POST** `/experiencias` : Adiciona uma nova experiência. *(Body: nome, local, atual, inicio, fim, descricao, tecnologias)*
- **PUT** `/experiencias/:id` : Atualiza o registro de uma experiência.
- **DELETE** `/experiencias/:id` : Remove uma experiência do portfólio.

**Exemplo de Body (POST/PUT):**
```json
{
  "nome": "Desenvolvedor Full Stack",
  "local": "Tech Solutions",
  "atual": true,
  "inicio": "Jun - 2024",
  "fim": "Sep - 2025",
  "descricao": "Desenvolvimento de APIs e interfaces web.",
  "tecnologias": ["Node.js", "React", "Docker"]
}
```

---

## 🛠️ Habilidade Técnica
- **GET** `/habilidades` : Retorna a lista de todas as habilidades técnicas.
- **POST** `/habilidades` : Cadastra uma nova habilidade. *(Body: nome, categoria, img)*
- **PUT** `/habilidades/:id` : Atualiza uma habilidade cadastrada.
- **DELETE** `/habilidades/:id` : Deleta uma habilidade.

**Exemplo de Body (POST/PUT):**
```json
{
  "nome": "Linux Mint",
  "categoria": "Ferramentas",
  "img": "[https://meu-dominio.com/assets/linux.png](https://meu-dominio.com/assets/linux.png)"
}
```

---

## 🚀 Projeto
- **GET** `/projetos` : Lista todos os projetos do portfólio.
- **POST** `/projetos` : Insere um novo projeto. *(Body: titulo, finalizado, img, descricao, tecnologias, link?)*
- **PUT** `/projetos/:id` : Atualiza as informações de um projeto.
- **DELETE** `/projetos/:id` : Remove um projeto da base de dados.

**Exemplo de Body (POST/PUT):**
```json
{
  "titulo": "Plataforma Normativa",
  "finalizado": false,
  "img": "[https://meu-dominio.com/assets/akaer.png](https://meu-dominio.com/assets/akaer.png)",
  "descricao": "Plataforma de Gestão de Normas Técnicas para agilizar consulta sobre requisitos técnicos.",
  "tecnologias": ["JavaScript", "Node.js", "CSS"],
  "link": "https://github.com/meu-usuario/meu-repo"
}
```

---

## 📜 Certificação
- **GET** `/certificacoes` : Lista todos os certificados e cursos.
- **POST** `/certificacoes` : Adiciona uma nova certificação. *(Body: nome, instituicao, ano, url?)*
- **PUT** `/certificacoes/:id` : Atualiza uma certificação existente.
- **DELETE** `/certificacoes/:id` : Exclui uma certificação.

**Exemplo de Body (POST/PUT):**
```json
{
  "nome": "Arquitetura de Redes e Segurança",
  "instituicao": "Plataforma X",
  "ano": 2025,
  "url": "[https://plataformax.com/certificado/123456](https://plataformax.com/certificado/123456)"
}
```

---

## 📞 Forma de Contato
- **GET** `/contatos` : Lista todas as formas de contato cadastradas.
- **POST** `/contatos` : Cria um novo meio de contato. *(Body: img, url)*
- **PUT** `/contatos/:id` : Atualiza os dados de um contato.
- **DELETE** `/contatos/:id` : Remove uma forma de contato.

**Exemplo de Body (POST/PUT):**
```json
{
  "img": "[https://meu-dominio.com/assets/github-icon.png](https://meu-dominio.com/assets/github-icon.png)",
  "url": "[https://github.com/meu-usuario](https://github.com/meu-usuario)"
}
```