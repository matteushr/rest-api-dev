# API Node.js

**Objetivo:** Implementar uma API básica do tipo REST com objetivo de estudo do curso de Node.js da Rocketseat

## Tecnologias
- TypeScript
- Fastify
- Commitlint: Enforces Conventional Commits
- Commitizen: Interactive commit wizard
- Husky: Git Hook

## Configuração do TypeScript
Para fazer com que o Node.js entenda TypeScript:

1. Instale as dependências necessárias:

```bash
npm install typescript @types/node ts-node -D
```

2. Crie o arquivo de configuração do TypeScript:
```bash
npx tsc --init
```

3. No tsconfig.json, configure:
```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "commonjs",
    "outDir": "./dist",
    // ... outras configurações
  }
}
```

