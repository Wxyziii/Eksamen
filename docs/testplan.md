# Testplan — IT-støtteportal

Denne testplanen skal brukes før hver demo og før eksamen. Målet er å dokumentere at systemet faktisk fungerer.

---

## 1. NPM-scripts som bør finnes

Legg dette inn i `package.json` og tilpass kommandoene til prosjektet ditt:

```json
{
  "scripts": {
    "dev": "node server.js",
    "build": "echo \"No build step configured yet\"",
    "lint": "echo \"No linter configured yet\"",
    "test:api": "node scripts/api-smoke-test.mjs",
    "test:e2e": "playwright test",
    "test:e2e:ui": "playwright test --ui",
    "seed": "node scripts/seed-demo-data.mjs"
  }
}
```

Hvis du bruker Vite/React, bør `build` heller være:

```json
"build": "vite build"
```

Hvis du bruker ESLint, bør `lint` være:

```json
"lint": "eslint ."
```

---

## 2. Installer Playwright

```bash
npm install -D @playwright/test
npx playwright install
```

---

## 3. Kjør tester

```bash
npm run build
npm run lint
npm run test:api
npm run test:e2e
```

Hvis en kommando ikke finnes enda, dokumenter det og lag den senere. Til eksamen er det bedre å kunne forklare hva som er testet enn å bare si “det funker”.

---

## 4. API smoke test

Smoke testen skal minst sjekke:

- API svarer.
- `/api/health` fungerer hvis endpoint finnes.
- `/api/tickets` returnerer JSON.
- Ugyldig ID gir kontrollert feil.
- Valgfritt: POST test-ticket hvis `SMOKE_ALLOW_WRITE=1` er satt.

Kommando:

```bash
BASE_URL=http://localhost:3000 npm run test:api
```

Med write-test:

```bash
BASE_URL=http://localhost:3000 SMOKE_ALLOW_WRITE=1 npm run test:api
```

---

## 5. Manuell test checklist

### Ansatt-flow

- [ ] Åpne ansatt-siden.
- [ ] Skjema laster uten console-feil.
- [ ] Prøv å sende tomt skjema.
- [ ] Feilmeldinger vises ved riktige felt.
- [ ] Fyll inn realistisk ticket.
- [ ] Send inn ticket.
- [ ] Suksessmelding vises.
- [ ] Ticket-ID eller bekreftelse vises.

### Admin-flow

- [ ] Åpne admin dashboard.
- [ ] KPI-kort viser tall.
- [ ] Ticket-listen viser demo-data.
- [ ] Filtrer på status.
- [ ] Filtrer på prioritet.
- [ ] Filtrer på kategori.
- [ ] Klikk på en ticket.
- [ ] Detail drawer åpner.
- [ ] Endre status til “Under arbeid”.
- [ ] Legg inn løsning.
- [ ] Endre status til “Løst”.

### UI-states

- [ ] Loading state vises ved treg API.
- [ ] Empty state vises når filter gir 0 treff.
- [ ] Error state vises hvis API er nede.
- [ ] Success state vises etter innsending.
- [ ] Focus state er synlig med Tab-tasten.
- [ ] Hover/selected state finnes i ticket-listen.

### Backend

- [ ] `GET /api/tickets` fungerer.
- [ ] `GET /api/tickets/999999` gir 404.
- [ ] `POST /api/tickets` med ugyldig data gir 400.
- [ ] `POST /api/tickets` med gyldig data gir 201/200.
- [ ] SQL injection payload gir ikke alle tickets.
- [ ] XSS payload vises som tekst, ikke script.

### Drift

- [ ] Apache/Node service kjører.
- [ ] Database finnes og kan leses.
- [ ] UFW har riktige regler.
- [ ] Backup-script finnes.
- [ ] Minst én backup er opprettet.
- [ ] Restore-prosedyre er testet eller dokumentert.

---

## 6. Testresultat-mal

Fyll ut før eksamen:

```md
# Testresultat

Dato: YYYY-MM-DD
Testet av: Marcel
Versjon/commit: <commit hash>

## Automatiske tester

| Test | Resultat | Kommentar |
|---|---|---|
| npm run build | PASS/FAIL | |
| npm run lint | PASS/FAIL | |
| npm run test:api | PASS/FAIL | |
| npm run test:e2e | PASS/FAIL | |

## Manuelle tester

| Flow | Resultat | Kommentar |
|---|---|---|
| Ansatt oppretter ticket | PASS/FAIL | |
| Admin filtrerer tickets | PASS/FAIL | |
| Admin løser ticket | PASS/FAIL | |
| Error state ved API-feil | PASS/FAIL | |
| Backup verifisert | PASS/FAIL | |

## Kjente begrensninger

- ...
```
