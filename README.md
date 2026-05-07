# Eksamen project assets — docs, tests, seed-data og design system

Dette er en drop-in pakke for IT-støtteportal/ticket-system prosjektet.

## Innhold

```txt
docs/
  frontend-research.md
  design-system.md
  backend-risk-register.md
  testplan.md
  demo-script-sensor.md
  screenshots/README.md
src/styles/design-system.css
scripts/api-smoke-test.mjs
scripts/seed-demo-data.mjs
tests/e2e/ticket-system.spec.ts
playwright.config.ts
data/demo-tickets.json
data/demo-tickets.sql
.env.example
.gitignore.additions
package.scripts.patch.json
```

## Hvordan bruke

1. Kopier filene inn i roten av prosjektet ditt.
2. Merge `.gitignore.additions` inn i `.gitignore`.
3. Merge `package.scripts.patch.json` inn i `package.json`.
4. Installer Playwright hvis du vil bruke E2E-test:

```bash
npm install -D @playwright/test
npx playwright install
```

5. Test API:

```bash
BASE_URL=http://localhost:3000 npm run test:api
```

6. Kjør E2E:

```bash
npm run test:e2e
```

## Viktig

- `.env.example` skal commit’es.
- Ekte `.env` skal ikke commit’es.
- Demo-data må tilpasses hvis databasen din bruker andre kolonnenavn.
- Playwright-testene er generiske og kan trenge små selector-justeringer hvis UI-en din bruker andre labels/tekster.
