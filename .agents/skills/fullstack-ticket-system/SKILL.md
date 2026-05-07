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

## Frontend-design — profesjonelt firmasystem

Systemet skal se ut som et ekte bedriftsverktøy, ikke et skoleprosjekt. Bruk dette designsystemet konsekvent.

### Fargepalett og CSS-variabler

```css
:root {
  --brand-dark: #1a1a2e;        /* Primærfarge: sidebar, knapper */
  --brand-mid: #2d2d4e;         /* Hover-tilstand */
  --surface: #ffffff;
  --surface-secondary: #f8f8f9;
  --surface-tertiary: #f1f1f3;
  --border: rgba(0,0,0,0.08);
  --text-primary: #111111;
  --text-secondary: #6b7280;
  --text-tertiary: #9ca3af;

  /* Status-farger */
  --open-bg: #e8f4fd;       --open-text: #1565c0;
  --working-bg: #fff8e1;    --working-text: #b55900;
  --solved-bg: #e8f5e9;     --solved-text: #2e7d32;

  /* Prioritet-farger */
  --critical-bg: #fce4ec;   --critical-text: #880e4f;
  --high-bg: #fbe9e7;       --high-text: #bf360c;
  --normal-bg: #e3f2fd;     --normal-text: #0d47a1;
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
  background: var(--surface);
  border-right: 0.5px solid var(--border);
}
.nav-item.active {
  background: var(--brand-dark);
  color: #ffffff;
}
```

**Ticket-tabell:**
- Bruk `border-collapse: collapse` og `0.5px solid var(--border)` mellom rader
- Rad-hover: `background: var(--surface-secondary)`
- Aldri full border rundt celler — bare horisontale linjer mellom rader

**Status-badges:**
```css
.badge { padding: 3px 8px; border-radius: 99px; font-size: 11px; font-weight: 500; }
.badge::before { content: ''; display: inline-block; width: 5px; height: 5px; border-radius: 50%; margin-right: 5px; }
```

**Statistikk-kort:**
- 4 kort i grid øverst: Åpne, Under arbeid, Løst i dag, Snitt responstid
- Hvit bakgrunn, tynn border, `border-radius: 12px`
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
