---
name: exam-documentation-presenter
description: Write or improve Norwegian exam documentation and presentation material. Use for README, brukerveiledning, admin-guide, feilsøking, sensorforklaring, demo script, diagrams, fagkobling, and making explanations natural for VG2 IT level.
---

# Exam Documentation Presenter

Documentation must make the project easy to understand for sensor.

## Writing style

- Bokmål unless the user asks otherwise.
- Clear, natural 17-18-year-old level.
- Professional but not overcomplicated.
- Explain why, not only what.
- Use headings, tables, checklists, and short examples.

## Core documents

Create/maintain:

```txt
docs/
├── systembeskrivelse.md
├── brukerveiledning-ansatte.md
├── admin-guide.md
├── feilsoking.md
├── sikkerhet.md
├── backup-og-restore.md
├── drift-og-monitorering.md
├── testplan.md
└── demo-script-sensor.md
```

## Required documentation sections

### Systembeskrivelse
- Problem.
- Users.
- Solution.
- Architecture.
- What subjects are covered.

### Brukerveiledning
- How to create a ticket.
- Priority/category explanation.
- What happens after submission.
- Simple troubleshooting/contact info.

### Admin guide
- How IT handles tickets.
- Daily routines.
- How to check logs/status.
- Backup and restore basics.

### Feilsøking
Use symptom -> cause -> check -> fix.

Example:

```txt
Problem: Nettsiden åpner ikke.
Mulig årsak: Apache er stoppet eller brannmuren blokkerer.
Sjekk: systemctl status apache2, ufw status, curl localhost.
Tiltak: start Apache, åpne port 80, sjekk Apache-logg.
```

### Demo script
Include exact order:

1. Show frontend employee flow.
2. Show admin dashboard/filter/update.
3. Show API/database briefly.
4. Show server status/firewall.
5. Show backup/restore evidence.
6. Show monitoring/logs.
7. Explain security.
8. Tie to all three subjects.

## Fagkobling phrases

- “Dette dekker Utvikling fordi ...”
- “Dette dekker Driftstøtte fordi ...”
- “Dette dekker Brukerstøtte fordi ...”

## Done output

```txt
Dokumentasjon-resultat: <documents changed>
Målgruppe: <ansatt/admin/sensor>
Fagkobling: <subjects covered>
Neste øving: <what user should practice saying>
```
