# API Node.js

**Objetivo:** Implementar uma API básica do tipo REST com o objetivo de estudo do curso de Node.js da Rocketseat.

## Tecnologias
- **TypeScript**
- **Fastify**
- **ESLint**
- **SQLite**
- **Knex.js**

## Configuração do TypeScript
Para fazer com que o Node.js entenda TypeScript:

1. **Instale o TypeScript junto do pacote de tipos como dependência de desenvolvimento (D):**
   ```bash
   npm install typescript @types/node ts-node -D
   ```

2. **Crie o arquivo de configuração do TypeScript:**
   ```bash
   npx tsc --init
   ```

3. **No `tsconfig.json`, configure:**
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "commonjs"
     }
   }
   ```

## Configurando o ESLint
O ESLint padroniza o desenvolvimento, tornando-o mais organizado.

1. **Instale o ESLint com os padrões da RocketSeat:**
   ```bash
   npm i eslint @rocketseat/eslint-config -D
   ```

2. **Crie o arquivo de configuração `.eslintrc.json` e especifique a configuração:**
   ```json
   {
     "extends": [
       "@rocketseat/eslint-config/node"
     ]
   }
   ```

3. **Adicione em `settings.json` para padronizar automaticamente o projeto:**
   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.formatOnSave": true
   }
   ```

4. **Adicione o script de lint no `package.json` para garantir que o código esteja sempre formatado:**
   ```json
   {
     "lint": "eslint src --ext .ts --fix"
   }
   ```

## Configurando o Knex.js
O Knex.js é um SQL Query builder

1. Instalação

```bash
npm i knex sqlite3
```
2. Exportar configuração de `src/database.ts`:

```typescript
export const config = {
  client: 'sqlite3',
  connection: {
    filename: './tmp/app.db',
  },
  useNullAsDefault: true,
}
```

3. Importar configuração nonovo arquivo `knexfile.ts`:

```typescript
import { config } from './src/database'

export default config
```

4. Criar o arquivo de Migration:
```bash
npx knex migrate:make create-documents
```
## Executando a Aplicação
Para executar a aplicação, utilize o seguinte comando:
```bash
npm run dev
```

Antes de subir para produção, execute:

```bash
npm run lint
```


## Observações
- Certifique-se de que todas as dependências estão instaladas corretamente.
- Utilize o ESLint para manter a qualidade do código.

