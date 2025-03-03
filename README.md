# Node.js API

**Objective:** Implement a basic REST API for educational purposes as part of the Rocketseat Node.js course.

## Technologies
- **TypeScript**
- **Fastify**
- **ESLint**
- **SQLite**
- **Knex.js**

## TypeScript Configuration
To make Node.js understand TypeScript:

1. **Install TypeScript and type definitions as development dependencies (D):**
   ```bash
   npm install typescript @types/node ts-node -D
   ```

2. **Create the TypeScript configuration file:**
   ```bash
   npx tsc --init
   ```

3. **In `tsconfig.json`, configure:**
   ```json
   {
     "compilerOptions": {
       "target": "es2020",
       "module": "commonjs"
     }
   }
   ```

## Setting Up ESLint
ESLint standardizes code for organized development.

1. **Install ESLint with Rocketseat's preset:**
   ```bash
   npm i eslint @rocketseat/eslint-config -D
   ```

2. **Create the `.eslintrc.json` configuration file:**
   ```json
   {
     "extends": [
       "@rocketseat/eslint-config/node"
     ]
   }
   ```

3. **Add to `settings.json` for auto-formatting:**
   ```json
   {
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     },
     "editor.formatOnSave": true
   }
   ```

4. **Add the lint script to `package.json`:**
   ```json
   {
     "lint": "eslint src --ext .ts --fix"
   }
   ```

## Setting Up Knex.js
Knex.js is a SQL query builder.

1. **Installation:**
   ```bash
   npm i knex sqlite3
   ```

2. **Export configuration in `src/database.ts`:**
   ```typescript
   export const config = {
     client: 'sqlite3',
     connection: {
       filename: './tmp/app.db',
     },
     useNullAsDefault: true,
   }
   ```

3. **Import configuration in `knexfile.ts`:**
   ```typescript
   import { config } from './src/database'

   export default config
   ```

4. **Create a migration file:**
   ```bash
   npx knex migrate:make create-documents
   ```

## Database Migrations
This project uses Knex.js migrations to manage the database schema:

1. **Create a migration:**
   ```bash
   npm run knex migrate:make migration-name
   ```

2. **Run migrations:**
   ```bash
   npm run migrate:latest
   ```

3. **Rollback migrations:**
   ```bash
   npm run knex migrate:rollback
   ```

Existing migrations:
- `create-transactions`: Creates the transactions table
- `add-session-id-to-transactions`: Adds session_id column

## Estrutura do Banco de Dados

A aplicação utiliza uma tabela chamada `transactions` com a seguinte estrutura:

- **id**: UUID, chave primária.
- **title**: Texto, não nulo.
- **amount**: Decimal, não nulo.
- **created_at**: Timestamp, não nulo, padrão para o momento da criação.
- **session_id**: UUID, índice, adicionado para rastreamento de sessões.

## Configuração do Ambiente

As variáveis de ambiente são gerenciadas usando o pacote `dotenv`. Um arquivo `.env` deve ser criado na raiz do projeto com as seguintes variáveis:

DATABASE_URL=./tmp/app.db
PORT=3333
NODE_ENV=development

## Running the Application
To start the application:
```bash
npm run dev
```

Before deploying to production, run:
```bash
npm run lint
```

## Notes
- Ensure all dependencies are installed correctly.
- Use ESLint to maintain code quality.

## Project Structure
- `src/`: Source code
  - `server.ts`: API server definition
  - `database.ts`: Database configuration
  - `env/`: Environment configuration
- `db/`: Database files
  - `migrations/`: Database migration scripts

--- 
