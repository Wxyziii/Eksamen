---
name: exam-project-planner
description: Plan and structure the VG2 IT interdisciplinary exam project (Utvikling, Driftstøtte, Brukerstøtte). Use this skill when the user asks to plan the project, create a timeline, decide what to build, organize tasks, or figure out what to show the examiner. Also use it when the user seems stuck or unsure where to start.
---

# Exam Project Planner

This is a **Norwegian VG2 IT tverrfaglig eksamen** project. The solution must connect all three subjects:

| Fag | Hva det betyr for prosjektet |
|---|---|
| **Utvikling** | Kode: ticket-system webapplikasjon |
| **Driftstøtte** | Server: Ubuntu, Apache, backup, overvåking |
| **Brukerstøtte** | Dokumentasjon: brukerveiledning, feilsøking |

---

## Anbefalt prosjektstruktur

### Fase 1 — Planlegging (gjør dette først)
1. Skriv en kort systembeskrivelse (hva er bedriften, hva er problemet IT løser)
2. Lag en enkel kravliste (hva MÅ systemet kunne gjøre)
3. Tegn et enkelt arkitekturdiagram (klient → webserver → database)
4. Planlegg hvilke fag hvert element dekker

### Fase 2 — Utvikling
1. Sett opp prosjektmappe og Git-repo
2. Lag databaseskjema (tickets-tabell med alle felt)
3. Bygg backend API (ruter for CRUD på tickets)
4. Bygg frontend (HTML-sider koblet til API)
5. Test alle funksjoner manuelt

### Fase 3 — Driftstøtte
1. Installer Ubuntu Server (VM eller fysisk)
2. Sett opp LAMP-stack (Apache, MariaDB, PHP/Node)
3. Konfigurer UFW brannmur
4. Sett opp BackupPC
5. Sett opp Icinga-overvåking
6. Dokumenter alle steg

### Fase 4 — Brukerstøtte
1. Skriv brukerveiledning for ansatte
2. Skriv IT-admin-guide
3. Skriv feilsøkingsprosedyre
4. Forbered sensorbeskrivelse (hva du kan vise live)

---

## Hva du KAN vise sensor live

Prioriter disse punktene — de gir best inntrykk:

**Utvikling:**
- Opprette et ticket i nettleseren
- Vise ticket-liste med filtrering (status, prioritet)
- Oppdatere status på et ticket
- Vise at ugyldig input håndteres (f.eks. tomt felt)

**Driftstøtte:**
- `systemctl status apache2` (tjeneste kjører)
- `ufw status` (brannmur aktiv med riktige porter)
- Vise Icinga-dashboard (grønn status)
- Vise BackupPC web-grensesnitt (backup gjennomført)

**Brukerstøtte:**
- Åpne brukerveiledningen og gå gjennom ett punkt
- Demonstrere feilsøkingsrutine (f.eks. "hva gjør du hvis nettsiden er nede?")

---

## Fag-kobling for sensorforklaring

For hvert element i løsningen, øv deg på å si:
> "Dette dekker [fag] fordi [begrunnelse]."

Eksempler:
- "Ticket-systemet dekker Utvikling fordi jeg har kodet en fullstack webapplikasjon med database."
- "UFW-oppsett dekker Driftstøtte fordi det sikrer serveren mot uautorisert tilgang."
- "Brukerveiledningen dekker Brukerstøtte fordi den hjelper ansatte å bruke systemet uten IT-hjelp."

---

## Realistisk tidsbruk

| Aktivitet | Estimert tid |
|---|---|
| Planlegging og database-design | 2–3 timer |
| Backend API | 4–6 timer |
| Frontend | 3–5 timer |
| Ubuntu Server + LAMP | 3–4 timer |
| Backup + Overvåking | 2–3 timer |
| Dokumentasjon | 3–4 timer |
| **Totalt** | **17–25 timer** |

---

## Neste steg

Når planen er klar, bruk disse skillsene:
- `fullstack-ticket-system` → for å starte koding
- `ubuntu-lamp-deploy` → for serveroppsett
- `norwegian-exam-documentation` → for dokumentasjon
