# Frontend research — IT-støtteportal

Mål: Bruk profesjonelle produkter som inspirasjon for layout, informasjonsarkitektur og UX-mønstre. Ikke kopier designet direkte. Bruk referansene til å forstå hva et ekte support-/adminsystem trenger.

## Research-prinsipp

Før UI bygges skal agenten gjøre dette:

1. Identifiser hovedbrukere: ansatt, IT-tekniker og eventuell admin.
2. Skriv brukerflyt før design: opprette ticket, finne ticket, filtrere, åpne detaljer, endre status, skrive løsning.
3. Sammenlign mot referansene under.
4. Lag layout-plan før koding.
5. Kontroller at dark theme, kontrast, forms, tabeller og feilstates fungerer.

---

## 1. Helpdesk/ticket dashboard

### Referanse: Zendesk Support dashboard

Link: https://support.zendesk.com/hc/en-us/articles/4408835985434-Overview-of-the-Zendesk-Support-dashboard

**Hvorfor relevant:**
Zendesk viser hvordan supportdashboards organiserer tickets, rapporter og filtre. Spesielt relevant for admin-siden i eksamensprosjektet.

**Patterns å lære av:**

- Tydelig ticket-/rapportoversikt.
- Filtre for dato, gruppe, kanal, prioritet og organisasjon.
- Dashboard delt inn i faner eller seksjoner.
- Viktige tall/metrics øverst.
- Tabeller og lister for operativt arbeid.

**Bruk i prosjektet:**

- Admin dashboard bør ha KPI-kort øverst: åpne, kritiske, under arbeid, løst i dag.
- Ticket-listen bør kunne filtreres på status, prioritet og kategori.
- Radklikk bør åpne detaljpanel/drawer.

**Screenshot slot:**

- `docs/screenshots/research-zendesk-dashboard.png`

---

## 2. ITSM/service dashboard

### Referanse: Geckoboard Zendesk service desk dashboard

Link: https://www.geckoboard.com/dashboard-examples/itsm/zendesk-service-desk-dashboard/

**Hvorfor relevant:**
Dette viser et glanceable dashboard for intern IT-support med backlog, SLA-risiko og arbeidsmengde.

**Patterns å lære av:**

- Få, tydelige metrics som gir rask status.
- Bruk charts bare når de hjelper beslutningstaking.
- Vis backlog og prioritet visuelt.
- Dashboardet må kunne forstås raskt av IT-teamet.

**Bruk i prosjektet:**

- Lag en enkel “drift/status”-seksjon i admin dashboard.
- Vis kategori-fordeling og kritiske tickets.
- Bruk tomme/enkle charts hvis det ikke finnes nok data.

**Screenshot slot:**

- `docs/screenshots/research-geckoboard-itsm.png`

---

## 3. Clean SaaS/admin dashboard

### Referanse: Vercel Next.js + shadcn/ui Admin Dashboard Template

Link: https://vercel.com/templates/next.js/next-js-and-shadcn-ui-admin-dashboard

**Hvorfor relevant:**
Vercel/shadcn-stilen er moderne, ryddig og realistisk for et adminverktøy. Den passer godt til dark theme, cards, sidebar, tables og responsive layout.

**Patterns å lære av:**

- Sidebar + topbar + hovedinnhold.
- Cards med lav visuell støy.
- Konsistent spacing og border radius.
- Moderne tabell- og filtermønstre.
- Komponentbasert design.

**Bruk i prosjektet:**

- Bygg admin-siden som et ekte dashboard, ikke en enkel HTML-tabell.
- Bruk cards, badges, command/filter area og drawer.
- Hold designet rolig og profesjonelt.

**Screenshot slot:**

- `docs/screenshots/research-vercel-admin-dashboard.png`

---

## 4. Dark-theme dashboard / issue tracker

### Referanse: Linear dark mode / issue list

Link: https://mobbin.com/explore/screens/cc5d476b-5ba1-4bc2-bcf3-d6dcc9a636a3

**Hvorfor relevant:**
Linear er et av de beste eksemplene på dark theme for issue-/ticket-lister: ren sidebar, kompakt liste, tydelig hierarki, lite støy.

**Patterns å lære av:**

- Dark theme med lav kontrast på flater, høy kontrast på tekst.
- Sidebar med aktive states.
- Listebasert arbeidsflyt for tickets/issues.
- Status/priority badges som ikke skriker.
- Minimalistisk, men fortsatt informativt.

**Bruk i prosjektet:**

- Bruk mørke flater og subtile borders.
- Ikke bruk for mange sterke farger.
- Gi aktive filtre og valgte tickets tydelig state.

**Screenshot slot:**

- `docs/screenshots/research-linear-dark-list.png`

---

## 5. Form-heavy page

### Referanse: Atlassian ProForma form design

Link: https://confluence.atlassian.com/spaces/PF/pages/1087521151/How%2Bto%2Bdesign%2Bgreat%2Bforms%2Bwith%2BProForma

**Hvorfor relevant:**
Ansatt-siden i prosjektet er form-heavy. Brukeren må enkelt kunne melde inn et IT-problem uten å bli forvirret.

**Patterns å lære av:**

- Del lange skjema i logiske seksjoner.
- Bruk labels som forklarer feltet tydelig.
- Hold inputs i en ryddig vertikal linje.
- Bruk hjelpetekst der brukeren kan være usikker.
- Valider tidlig og vis feilmelding nær feltet.

**Bruk i prosjektet:**

- Ansatt-skjema: tittel, beskrivelse, kategori, prioritet, kontaktinfo.
- Vis hva som skjer etter innsending.
- Suksess-state skal vise ticket-ID.
- Feil-state skal forklare hva som må rettes.

**Screenshot slot:**

- `docs/screenshots/research-form-heavy-page.png`

---

## 6. Table/filter-heavy page

### Referanse: Atlassian components

Link: https://atlassian.design/components

**Hvorfor relevant:**
Atlassian viser profesjonelle komponentmønstre for tabeller, forms, buttons, banners og navigation. Dette passer godt for ticket-admin.

**Patterns å lære av:**

- Filtre skal ligge nær tabellen de påvirker.
- Tomme states skal fortelle hva brukeren kan gjøre videre.
- Buttons må ha tydelig primær/sekundær/destruktiv rolle.
- Tabeller må ha tydelige kolonner og hover/selected state.

**Bruk i prosjektet:**

- Admin-siden skal ha filterbar ticket-tabell.
- “Ingen tickets funnet” skal være en god empty state.
- Feil ved API-kall skal vises som banner/toast.

**Screenshot slot:**

- `docs/screenshots/research-atlassian-components.png`

---

## Design-konklusjon for prosjektet

Det ferdige systemet skal føles som et ekte IT-supportverktøy:

- Dark theme som default.
- Sidebar-basert admin dashboard.
- Separate ansatt- og admin-opplevelser.
- Statistikk øverst, filtrerbar ticket-liste i midten, detaljdrawer på høyre side.
- Ansatt-skjema skal være enkelt, trygt og tydelig.
- Alle states må finnes: loading, empty, error, success, disabled, hover, focus, selected.

## Ikke gjør dette

- Ikke kopier logoer, farger eller layout 1:1 fra referansene.
- Ikke lag en lys skole-nettside.
- Ikke bruk random neon overalt.
- Ikke skjul feilmeldinger i console.
- Ikke la tabeller bli uleselige på små skjermer.
