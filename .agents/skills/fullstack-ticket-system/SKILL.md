---
name: fullstack-ticket-system
description: Build, modify, or debug the VG2 IT exam ticket system (support portal). Use this skill when the user asks to build the ticket system, add features like filtering or status updates, fix bugs in the web app, create the database schema, or work on anything related to the frontend or backend of the support portal. Also use it when the user asks about Node.js/Express, PHP, SQLite, MariaDB, HTML forms, or the API routes.
---

# Fullstack Ticket System

Bygg et enkelt og eksamensvennlig IT-støtteportal der ansatte kan opprette tickets og IT-avdelingen kan behandle dem.

---

## Anbefalt teknologivalg

**Alternativ A — Node.js (anbefalt for Utvikling-karakter)**
- Backend: Node.js + Express
- Database: SQLite (enklest) eller MariaDB
- Frontend: HTML/CSS + Vanilla JS (fetch API)

**Alternativ B — PHP (enklere å sette opp på LAMP)**
- Backend: PHP med PDO
- Database: MariaDB
- Frontend: HTML + PHP-templates

Velg Alternativ A hvis du vil vise mer kompetanse i Utvikling. Velg B hvis LAMP-serveren er allerede satt opp og du vil spare tid.

---

## Databaseskjema

```sql
CREATE TABLE tickets (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    tittel      TEXT NOT NULL,
    beskrivelse TEXT NOT NULL,
    status      TEXT NOT NULL DEFAULT 'Åpen'
                CHECK(status IN ('Åpen','Under arbeid','Løst','Lukket')),
    prioritet   TEXT NOT NULL DEFAULT 'Normal'
                CHECK(prioritet IN ('Lav','Normal','Høy','Kritisk')),
    kategori    TEXT NOT NULL DEFAULT 'Generelt'
                CHECK(kategori IN ('Hardware','Software','Nettverk','Tilgang','Generelt')),
    kø          TEXT NOT NULL DEFAULT 'IT-støtte',
    opprettet   DATETIME DEFAULT CURRENT_TIMESTAMP,
    oppdatert   DATETIME DEFAULT CURRENT_TIMESTAMP,
    løsning     TEXT
);
```

---

## API-ruter (Node.js/Express)

```
GET    /api/tickets          — hent alle tickets (støtter ?status=&prioritet=&kategori=)
GET    /api/tickets/:id       — hent ett ticket
POST   /api/tickets          — opprett nytt ticket
PUT    /api/tickets/:id       — oppdater ticket (status, prioritet, løsning)
DELETE /api/tickets/:id       — slett ticket (kun admin)
```

### Eksempel: POST /api/tickets

Validér alltid input på serveren:
```javascript
const { tittel, beskrivelse, prioritet, kategori } = req.body;

if (!tittel || tittel.trim().length < 3) {
  return res.status(400).json({ feil: 'Tittel må være minst 3 tegn.' });
}
if (!beskrivelse || beskrivelse.trim().length < 10) {
  return res.status(400).json({ feil: 'Beskrivelse må være minst 10 tegn.' });
}

// Bruk parameteriserte spørringer — aldri string-concatenation
db.run(
  'INSERT INTO tickets (tittel, beskrivelse, prioritet, kategori) VALUES (?, ?, ?, ?)',
  [tittel.trim(), beskrivelse.trim(), prioritet, kategori],
  function(err) { ... }
);
```

---

## Frontend-design — profesjonelt mørkt firmasystem

Systemet skal se ut som et ekte bedriftsverktøy, ikke et skoleprosjekt. Bruk mørkt tema som standard. Majoriteten av nettsiden skal være mørk: body, sidebar, toppfelt, kort, tabeller, skjema og detaljpanel. Lyse flater skal bare brukes som små kontrastfelt hvis det hjelper lesbarhet.

### Fargepalett og CSS-variabler

```css
:root {
  --app-bg: #080b12;            /* Hovedbakgrunn */
  --brand-dark: #0f172a;        /* Sidebar, paneler, knapper */
  --brand-mid: #1e293b;         /* Hover-tilstand */
  --surface: #111827;
  --surface-secondary: #0b1220;
  --surface-tertiary: #1f2937;
  --border: rgba(255,255,255,0.10);
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
  --text-tertiary: #94a3b8;
  --accent: #38bdf8;

  /* Status-farger */
  --open-bg: rgba(56,189,248,0.16);      --open-text: #7dd3fc;
  --working-bg: rgba(251,191,36,0.16);   --working-text: #facc15;
  --solved-bg: rgba(34,197,94,0.16);     --solved-text: #86efac;

  /* Prioritet-farger */
  --critical-bg: rgba(244,63,94,0.18);   --critical-text: #fda4af;
  --high-bg: rgba(249,115,22,0.18);      --high-text: #fdba74;
  --normal-bg: rgba(59,130,246,0.16);    --normal-text: #93c5fd;
}
```

### Layoutstruktur

```
┌─────────────────────────────────────────────────┐
│ Sidebar (220px) │ Hovedinnhold  │ Detaljpanel   │
│                 │               │ (360px, lukk- │
│ - Logo          │ - Topbar      │  bar på klikk)│
│ - Navigasjon    │ - Statistikk  │               │
│ - Køer          │ - Filtre      │ - Ticket-info │
│ - Bruker        │ - Ticket-tabell│ - Aktivitet  │
└─────────────────────────────────────────────────┘
```

### Viktige UI-regler

**Sidebar:**
```css
.sidebar {
  width: 220px;
  background: var(--brand-dark);
  border-right: 0.5px solid var(--border);
}
.nav-item.active {
  background: var(--accent);
  color: #06111f;
}
```

**Mørk tema-regler:**
- `body` skal bruke `background: var(--app-bg)` eller `var(--surface-secondary)`.
- Kort, tabell, skjema og detaljpanel skal bruke `var(--surface)`.
- Inputs og filterfelt skal bruke mørk bakgrunn og lys tekst.
- Unngå store hvite områder. Maks små badges, varsler eller fokuselementer kan være lyse.
- Sørg for god kontrast på tekst, borders og hover-tilstander.

```css
body {
  background: var(--app-bg);
  color: var(--text-primary);
}
.card,
.detail-panel,
table {
  background: var(--surface);
  color: var(--text-primary);
}
input,
select,
textarea {
  background: var(--surface-tertiary);
  color: var(--text-primary);
  border: 0.5px solid var(--border);
}
```

**Knapper:**
```css
.primary-button {
  background: var(--accent);
  color: #06111f;
}
.ghost-button {
  background: transparent;
  color: var(--text-primary);
  border: 0.5px solid var(--border);
}
```

**Ticket-tabell:**
- Bruk `border-collapse: collapse` og `0.5px solid var(--border)` mellom rader
- Rad-hover: `background: var(--surface-tertiary)`
- Aldri full border rundt celler — bare horisontale linjer mellom rader

**Status-badges:**
```css
.badge { padding: 3px 8px; border-radius: 99px; font-size: 11px; font-weight: 500; }
.badge::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; margin-right: 5px; }
```

**Statistikk-kort:**
- 4 kort i grid øverst: Åpne, Under arbeid, Løst i dag, Snitt responstid
- Mørk bakgrunn, tynn lys border, `border-radius: 12px`
- Stor tall (24px), liten label over (10px uppercase)

### Tre sider

### 1. ansatt.html — Opprett ticket
- Sentert kort-layout (maks 600px bredde)
- Tydelig overskrift: "Meld inn IT-problem"
- Felt: Tittel, Beskrivelse (textarea), Prioritet (select), Kategori (select)
- Primærknapp med `background: var(--brand-dark)`
- Suksessmelding med grønn border-left etter innsending

### 2. admin.html — Ticket-oversikt (sidebar-layout)
- Full sidebar med navigasjon og køer
- Statistikk-kort øverst (4 kolonner)
- Filtre: Status, Prioritet, Kategori (dropdowns i rad)
- Tabell med kolonner: ID, Tittel, Status, Prioritet, Kategori, Tildelt, Tid
- Klikk på rad → åpner slideout-panel til høyre

### 3. Ticket-detaljpanel (slideout)
- Seksjoner: Detaljer (grid), Beskrivelse, Aktivitetslogg
- Aktivitetslogg: avatar-bobler, tidsstempel, tekst
- Footer-knapper: "Feilsøk" (sekundær) + "Merk løst" (primær mørk)

---

## Mappestruktur

```
ticket-system/
├── server.js          (eller index.php)
├── database.js        (DB-oppsett og -tilkobling)
├── routes/
│   └── tickets.js     (alle API-ruter)
├── public/
│   ├── ansatt.html
│   ├── admin.html
│   ├── detalj.html
│   ├── style.css
│   └── app.js         (frontend fetch-kall)
├── package.json
└── .gitignore         (husk: node_modules/, *.db)
```

---

## Manuell testing

Test disse scenariene før eksamen:

1. **Opprett ticket** — fyll inn alt korrekt → skal lykkes
2. **Tom tittel** → skal gi feilmelding
3. **Liste med filtrering** → endre filter, sjekk at listen endres
4. **Oppdater status** → fra "Åpen" til "Under arbeid"
5. **Legg til løsning** → skriv inn løsning, lagre
6. **Ugyldig ID** → GET /api/tickets/99999 → skal gi 404

---

## Typiske eksamensspørsmål — forbered svar

- *"Hvorfor bruker du parameteriserte spørringer?"* → Forhindrer SQL-injeksjon
- *"Hva skjer hvis en bruker sender ugyldig data?"* → Server validerer og returnerer 400-feil
- *"Hvordan er frontend og backend koblet?"* → fetch() kaller REST API, JSON-respons
- *"Hvilke HTTP-metoder bruker du og hvorfor?"* → GET=les, POST=opprett, PUT=oppdater, DELETE=slett
