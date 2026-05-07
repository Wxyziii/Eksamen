# Design system — IT-støtteportal

Dette design systemet skal brukes for hele frontend-prosjektet. Standardtema er **dark theme**. Light theme skal ikke lages med mindre det eksplisitt blir bedt om.

---

## 1. Designmål

Systemet skal se ut som et moderne IT-support/admin-dashboard:

- profesjonelt
- mørkt
- ryddig
- lett å forstå
- realistisk for en liten bedrift/skole
- enkelt å forklare til sensor

UI skal aldri føles som en tilfeldig skoleoppgave med basic HTML. Det skal føles som et faktisk verktøy en IT-avdeling kunne brukt.

---

## 2. Farger

Bruk design tokens. Ikke hardkod tilfeldige farger rundt i komponentene.

```css
:root {
  color-scheme: dark;

  --bg: #070b12;
  --bg-soft: #0b1120;
  --bg-muted: #111827;

  --surface: #0f172a;
  --surface-2: #111c31;
  --surface-3: #172033;
  --surface-hover: #1e293b;
  --surface-selected: rgba(59, 130, 246, 0.14);

  --border: rgba(148, 163, 184, 0.16);
  --border-strong: rgba(148, 163, 184, 0.28);

  --text: #f8fafc;
  --text-soft: #cbd5e1;
  --text-muted: #94a3b8;
  --text-disabled: #64748b;

  --brand: #3b82f6;
  --brand-hover: #2563eb;
  --brand-soft: rgba(59, 130, 246, 0.14);

  --success: #22c55e;
  --success-soft: rgba(34, 197, 94, 0.14);

  --warning: #f59e0b;
  --warning-soft: rgba(245, 158, 11, 0.16);

  --danger: #ef4444;
  --danger-soft: rgba(239, 68, 68, 0.14);

  --info: #38bdf8;
  --info-soft: rgba(56, 189, 248, 0.14);

  --critical: #fb7185;
  --critical-soft: rgba(251, 113, 133, 0.16);
}
```

### Bruksregler

| Token | Bruk |
|---|---|
| `--bg` | hovedbakgrunn |
| `--surface` | cards, sidebar, panels |
| `--surface-2` | inputs, tabell-header, nested cards |
| `--brand` | primærknapper og aktiv navigasjon |
| `--danger` | sletting, kritiske feil |
| `--warning` | høy prioritet / advarsler |
| `--success` | løst ticket / suksess |

---

## 3. Typografi

Bruk systemfont for rask og native følelse.

```css
body {
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  background: var(--bg);
  color: var(--text);
}
```

| Element | Størrelse | Vekt | Bruk |
|---|---:|---:|---|
| Page title | 28–32px | 700 | dashboard/sideoverskrift |
| Section title | 18–20px | 650 | cards/seksjoner |
| Body | 14–16px | 400 | vanlig tekst |
| Small/meta | 12–13px | 500 | tid, labels, metadata |
| Badge | 11–12px | 600 | status/prioritet |

Tekst skal ha god kontrast. Ikke bruk ren grå tekst på mørk bakgrunn hvis den blir vanskelig å lese.

---

## 4. Spacing

Bruk 4px-grid.

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
}
```

| Område | Spacing |
|---|---|
| Side padding desktop | 24–32px |
| Card padding | 16–24px |
| Form gap | 14–18px |
| Table row height | 48–56px |
| Button padding | 10px 14px |

---

## 5. Border radius

```css
:root {
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 22px;
  --radius-pill: 999px;
}
```

Regler:

- Inputs/buttons: `8px–10px`
- Cards: `14px–18px`
- Dashboard panels: `16px–22px`
- Badges: pill radius

---

## 6. Shadows

Dark UI skal bruke subtile shadows og borders.

```css
:root {
  --shadow-card: 0 18px 50px rgba(0, 0, 0, 0.28);
  --shadow-panel: 0 24px 80px rgba(0, 0, 0, 0.38);
  --shadow-focus: 0 0 0 3px rgba(59, 130, 246, 0.28);
}
```

Ikke bruk kraftige glød-effekter overalt. Det skal se profesjonelt ut.

---

## 7. Layout

### Admin dashboard

```txt
┌────────────────────────────────────────────────────────────┐
│ Sidebar  │ Topbar                                          │
│          ├─────────────────────────────────────────────────┤
│          │ KPI cards                                       │
│          │ Filters                                         │
│          │ Ticket table/list             │ Detail drawer    │
└────────────────────────────────────────────────────────────┘
```

### Ansatt-side

```txt
┌────────────────────────────────────────────┐
│ Header                                     │
│ Centered form card                         │
│ Help text + success/error state            │
└────────────────────────────────────────────┘
```

---

## 8. Komponenter

### Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border-radius: var(--radius-sm);
  border: 1px solid transparent;
  padding: 10px 14px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background 160ms ease, border-color 160ms ease, transform 120ms ease;
}

.btn:focus-visible {
  outline: none;
  box-shadow: var(--shadow-focus);
}

.btn-primary {
  background: var(--brand);
  color: white;
}

.btn-primary:hover {
  background: var(--brand-hover);
}

.btn-secondary {
  background: var(--surface-2);
  color: var(--text);
  border-color: var(--border);
}

.btn-danger {
  background: var(--danger-soft);
  color: #fecaca;
  border-color: rgba(239, 68, 68, 0.28);
}

.btn:disabled {
  cursor: not-allowed;
  opacity: 0.55;
}
```

### Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: var(--radius-pill);
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 650;
  border: 1px solid transparent;
}

.badge-open { background: var(--info-soft); color: #7dd3fc; }
.badge-working { background: var(--warning-soft); color: #fcd34d; }
.badge-solved { background: var(--success-soft); color: #86efac; }
.badge-critical { background: var(--critical-soft); color: #fda4af; }
```

### Card

```css
.card {
  background: linear-gradient(180deg, var(--surface), var(--surface-2));
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  padding: var(--space-6);
}
```

### Form fields

```css
.field {
  display: grid;
  gap: 7px;
}

.label {
  font-size: 13px;
  font-weight: 650;
  color: var(--text-soft);
}

.input,
.select,
.textarea {
  width: 100%;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface-2);
  color: var(--text);
  padding: 11px 12px;
  font-size: 14px;
}

.input:focus,
.select:focus,
.textarea:focus {
  outline: none;
  border-color: rgba(59, 130, 246, 0.7);
  box-shadow: var(--shadow-focus);
}

.field-error {
  color: #fca5a5;
  font-size: 13px;
}

.field-help {
  color: var(--text-muted);
  font-size: 13px;
}
```

### Table

```css
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  text-align: left;
  font-size: 12px;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 12px 14px;
  border-bottom: 1px solid var(--border);
}

.table td {
  padding: 14px;
  border-bottom: 1px solid var(--border);
  color: var(--text-soft);
}

.table tr:hover td {
  background: var(--surface-hover);
}

.table tr[aria-selected="true"] td {
  background: var(--surface-selected);
}
```

### Drawer

```css
.drawer {
  background: var(--surface);
  border-left: 1px solid var(--border);
  box-shadow: var(--shadow-panel);
  width: min(420px, 100vw);
}
```

---

## 9. States som alltid må finnes

| State | Krav |
|---|---|
| Loading | skeleton eller spinner med tekst |
| Empty | forklar hvorfor det er tomt og hva brukeren kan gjøre |
| Error | synlig banner/toast, ikke bare console |
| Success | tydelig bekreftelse og ticket-ID |
| Disabled | knapper/inputs skal se disabled ut |
| Hover | rader, knapper og nav items skal reagere |
| Focus | keyboard focus må være synlig |
| Selected | aktiv ticket/filter/nav må være tydelig |

---

## 10. Accessibility

Minimumskrav:

- Bruk labels på alle inputs.
- Ikke bruk farge alene for status.
- Alle knapper må ha tydelig tekst eller aria-label.
- Fokusindikator må være synlig.
- Tab-rekkefølge må være logisk.
- Kontrast må være god nok på mørk bakgrunn.
- Feilmeldinger skal kobles til feltet de gjelder.

---

## 11. Responsive regler

Desktop først for eksamensdemo, men må ikke knekke på små skjermer.

- Sidebar kan bli topbar eller hamburger på smal skjerm.
- Tabellen kan bli cards på mobil.
- Drawer skal dekke hele skjermen på mobil.
- Forms skal være én kolonne på mobil.

---

## 12. UI quality gate

Før frontend regnes som ferdig:

- [ ] Dark theme brukt overalt.
- [ ] Ingen uleselig tekst.
- [ ] Alle forms har labels og feilmeldinger.
- [ ] Admin dashboard har KPI-kort, filtre, ticket-liste og detail drawer.
- [ ] Loading, empty, error og success states finnes.
- [ ] `npm run build` fungerer.
- [ ] `npm run lint` fungerer eller dokumenteres hvis ikke prosjektet har linter.
- [ ] Minst én manuell test av ansatt-flow og admin-flow er kjørt.
