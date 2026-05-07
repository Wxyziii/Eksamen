# Demo script for sensor — 10 til 15 minutter

Målet er å vise at prosjektet dekker **Utvikling**, **Driftstøtte** og **Brukerstøtte** på en ryddig måte.

---

## Før demo starter

Ha disse klare:

- Nettleser med ansatt-side.
- Nettleser med admin dashboard.
- Terminal på server/prosjektmappe.
- Dokumentasjon åpnet.
- Backup/status-kommandoer klare.
- Demo-data seedet.

---

## 0:00–1:00 — Kort introduksjon

Si:

> “Jeg har laget en IT-støtteportal for en bedrift/skole. Ansatte kan melde inn IT-problemer, og IT-avdelingen kan behandle tickets i et admin-dashboard. Prosjektet dekker Utvikling gjennom webapplikasjonen, Driftstøtte gjennom server, backup og overvåking, og Brukerstøtte gjennom brukerveiledning og feilsøkingsrutiner.”

Vis raskt:

- ansatt-side
- admin dashboard
- dokumentasjon

---

## 1:00–4:00 — Utvikling: ansatt-flow

Vis:

1. Åpne ansatt-siden.
2. Forklar skjemaet.
3. Send tomt skjema først for å vise validering.
4. Opprett et realistisk ticket:
   - Tittel: “Wi-Fi faller ut i klasserom 204”
   - Kategori: Nettverk
   - Prioritet: Høy
5. Vis success state med ticket-ID.

Si:

> “Her viser jeg server-side validering. Jeg stoler ikke bare på nettleseren, fordi en bruker kan omgå frontend-validering. Backend sjekker derfor at dataen er gyldig før den lagres.”

---

## 4:00–7:00 — Utvikling: admin-dashboard

Vis:

1. Admin dashboard.
2. KPI-kort: åpne, kritiske, under arbeid, løst.
3. Ticket-tabell.
4. Filter på prioritet/status/kategori.
5. Klikk på ticket.
6. Detail drawer åpner.
7. Endre status til “Under arbeid”.
8. Skriv løsning og merk som “Løst”.

Si:

> “Admin-siden er laget som et ekte dashboard. IT-tekniker kan raskt se køen, filtrere etter kritiske saker og behandle tickets uten å miste oversikt.”

---

## 7:00–9:30 — Sikkerhet og backend

Vis terminal/kode kort:

```bash
npm run test:api
```

Vis eller forklar:

- parameteriserte SQL-spørringer
- input-validering
- `.env.example`
- `.env` skal ikke være i Git
- kontrollert error handling

Si:

> “Jeg har tenkt på backend-feil som ugyldig input, databasefeil og sikkerhet. SQL-injeksjon hindres med parameteriserte spørringer, og brukerdata vises som tekst for å unngå XSS.”

---

## 9:30–12:00 — Driftstøtte

Vis relevante kommandoer:

```bash
systemctl status apache2
systemctl status mariadb
ufw status
curl http://localhost
```

Hvis Node/service brukes:

```bash
systemctl status it-portal
curl http://localhost:3000/api/health
```

Si:

> “Driftstøtte-delen handler om at systemet faktisk kjører stabilt på en server. Jeg kan vise tjenestestatus, brannmur, IP/oppsett og at API-et svarer.”

---

## 12:00–13:30 — Backup og restore

Vis:

```bash
ls -lh /var/backups/
# eller prosjektets backup-mappe
```

Forklar restore:

> “Backup er ikke nyttig hvis man ikke vet hvordan man gjenoppretter. Derfor har jeg dokumentert restore-prosedyren og kan forklare hvordan jeg får tilbake database/tickets hvis noe går galt.”

---

## 13:30–15:00 — Brukerstøtte og dokumentasjon

Vis:

- `docs/design-system.md`
- brukerveiledning
- testplan
- backend risk register
- screenshots hvis klare

Si:

> “Brukerstøtte handler om at brukere og IT-avdelingen skal forstå systemet. Derfor har jeg laget brukerveiledning, testplan og feilsøkingsrutine. Dette gjør løsningen enklere å drifte og overlevere.”

---

## Hvis sensor spør: “Hva ville du forbedret videre?”

Svar:

> “Neste steg ville vært innlogging med roller, e-postvarsling, bedre audit logg, SLA-frister, og mer automatisert testing med Playwright. Jeg har prioritert en stabil MVP som dekker alle tre fagene og kan demonstreres trygt på kort tid.”

---

## Kriseplan hvis noe ikke fungerer live

Hvis nettsiden ikke åpner:

1. Vis dokumentasjonen først.
2. Kjør:

```bash
systemctl status apache2
ufw status
curl localhost
```

3. Forklar feilsøkingsrutinen.

Hvis databasen feiler:

1. Vis backup/restore-plan.
2. Vis seed-data.
3. Forklar hva feilen betyr og hvordan du ville fikset den.

Si:

> “Dette er også en del av Driftstøtte: å kunne feilsøke strukturert når systemet ikke fungerer.”
