## 🗂️ Modelo de Dados

Abaixo está o detalhamento dos campos, tipos e regras de negócio para cada entidade do sistema:

### 📄 Apresentação
- `titulo` (string)
- `texto_negrito` (string) — trecho que será exibido em negrito no frontend
- `texto_completo` (string) — parágrafo completo, incluindo o trecho em negrito
> ⚠️ **Regra de Negócio**: Permite apenas READ, UPDATE e DELETE. Trata-se de um registro único, não existindo a operação de POST (Create) para múltiplos registros.

### 🎓 Formação
- `nome` (string)
- `status` (boolean)
- `local` (string)
- `inicio` (int - formato AAAA)
- `fim` (int - formato AAAA)
> ⚠️ **Regras de Negócio**: 
> - `inicio < fim` (O ano de início deve ser anterior ao ano de término)
> - `inicio != fim` (O curso deve ter duração de pelo menos anos distintos)

### 💼 Experiência
- `nome` (string)
- `local` (string)
- `atual` (boolean)
- `inicio` (string - ex: "YYYY-MM")
- `fim` (string - ex: "YYYY-MM" ou null se atual)
- `descricao` (string)
- `tecnologias` (Array de strings)

### 🛠️ Habilidade Técnica
- `nome` (string)
- `categoria` (ENUM: `["Front-End", "Back-End", "Ferramentas"]`)
- `img` (string - URL ou caminho da imagem)

### 🚀 Projeto
- `titulo` (string)
- `finalizado` (boolean)
- `img` (string - URL ou caminho da imagem)
- `descricao` (string)
- `tecnologias` (Array de strings)
- `link` (string, opcional - URL do repositório ou deploy)

### 📜 Certificação
- `nome` (string)
- `instituicao` (string)
- `ano` (int - formato AAAA)
- `url` (string, opcional - link para validação; null se não houver link público)

### 📞 Forma de Contato
- `img` (string - ícone ou logo)
- `url` (string - link do contato/rede social)