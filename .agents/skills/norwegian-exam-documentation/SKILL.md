---
name: norwegian-exam-documentation
description: Write Norwegian documentation for the VG2 IT exam project. Use this skill when the user asks for documentation, README, user guides, brukerveiledning, IT-admin-guide, feilsøkingsrutine, sensorbeskrivelse, or Norwegian explanations of any part of the project. Also use it when the user wants to prepare for the oral exam presentation or needs to explain something to the examiner (sensor).
---

# Norwegian Exam Documentation

Skriv profesjonell norsk dokumentasjon for eksamen. Tilpasset VG2 IT-nivå — tydelig, faglig, men ikke unødvendig komplisert.

---

## Dokument 1: Brukerveiledning for ansatte

```markdown
# Brukerveiledning — IT-støtteportal
**For ansatte i [Firmanavn]**
Versjon 1.0 | [Dato]

---

## Hva er IT-støtteportalen?
IT-støtteportalen er et nettbasert system der du kan melde inn IT-problemer til IT-avdelingen.
I stedet for å sende e-post eller ringe, oppretter du et "ticket" som IT-teamet følger opp.

## Slik oppretter du et ticket

1. Åpne nettleseren og gå til: **http://192.168.1.100**
2. Klikk på **"Opprett nytt ticket"**
3. Fyll inn:
   - **Tittel**: Kort beskrivelse av problemet (f.eks. "Kan ikke logge inn på PCen")
   - **Beskrivelse**: Beskriv problemet mer detaljert. Jo mer info, jo raskere hjelp.
   - **Prioritet**: Velg hvor kritisk problemet er
   - **Kategori**: Velg den kategorien som passer best
4. Klikk **"Send inn ticket"**
5. Du får en bekreftelse med ticket-nummer. Ta vare på dette nummeret.

## Prioritetsnivåer
| Prioritet | Når bruker du det? |
|---|---|
| Kritisk | Hele arbeidsstasjonen er nede, kan ikke jobbe |
| Høy | Et viktig program virker ikke |
| Normal | Vanlig problem som hindrer arbeid |
| Lav | Kosmetisk problem, ikke haster |

## Spørsmål?
Kontakt IT-avdelingen på: it@firmanavn.no
```

---

## Dokument 2: IT-admin-guide

```markdown
# IT-administrasjonsguide — Ticket-system
**For IT-avdelingen**
Versjon 1.0 | [Dato]

---

## Tilgang til systemet
- **Webapplikasjon**: http://192.168.1.100 (admin-visning)
- **SSH til server**: `ssh admin@192.168.1.100`
- **Databasetilgang**: `mysql -u portal_bruker -p it_portal`

## Behandle et ticket
1. Logg inn på admin-visningen
2. Tickets med status "Åpen" vises øverst
3. Klikk på et ticket for å se detaljer
4. Endre status til "Under arbeid" når du starter behandlingen
5. Skriv inn løsning og endre status til "Løst" når ferdig

## Daglige rutiner
- [ ] Sjekk nye tickets (prioritet Kritisk og Høy behandles først)
- [ ] Oppdater status på tickets under arbeid
- [ ] Sjekk serverlogg: `tail -20 /var/log/apache2/error.log`
- [ ] Bekreft at backup kjørte: `ls -lh /var/backups/db/`

## Serveradministrasjon
```bash
# Sjekk at alt kjører
systemctl status apache2 mariadb

# Start på nytt ved behov
sudo systemctl restart apache2
sudo systemctl restart mariadb

# Se aktive brannmurregler
sudo ufw status
```
```

---

## Dokument 3: Feilsøkingsrutine

```markdown
# Feilsøkingsrutine — IT-støtteportal

## Problem: Nettsiden er ikke tilgjengelig

**Steg 1** — Sjekk om Apache kjører:
```bash
sudo systemctl status apache2
```
→ Hvis "inactive": `sudo systemctl start apache2`

**Steg 2** — Sjekk brannmuren:
```bash
sudo ufw status
```
→ Port 80 skal være "ALLOW"

**Steg 3** — Sjekk feillogg:
```bash
tail -50 /var/log/apache2/error.log
```

---

## Problem: Tickets lagres ikke

**Steg 1** — Sjekk om MariaDB kjører:
```bash
sudo systemctl status mariadb
```

**Steg 2** — Test databasetilkobling:
```bash
mysql -u portal_bruker -pSterkPassord123! -e "SELECT 1" it_portal
```

**Steg 3** — Sjekk diskplass:
```bash
df -h
```
→ Hvis over 90% full: rydd opp i loggfiler
```

---

## Sensorbeskrivelse (norsk)

Forbered deg på å forklare disse punktene:

**Om systemet generelt:**
> "Prosjektet er et IT-støtteportal der ansatte kan opprette tickets og IT-avdelingen kan behandle dem. Løsningen dekker alle tre fagene: ticket-systemet er Utvikling, serveroppsettet er Driftstøtte, og dokumentasjonen og brukerveiledningen er Brukerstøtte."

**Om teknologivalg:**
> "Jeg valgte Node.js og SQLite fordi det er enkelt å sette opp og forklare. SQLite lagrer hele databasen i én fil, noe som gjør backup enkelt. Til eksamen er enkelhet og forklarbarhet viktigere enn skalerbarhet."

**Om sikkerhet:**
> "Jeg har implementert parameteriserte spørringer for å forhindre SQL-injeksjon, server-side validering av all input, og UFW-brannmur som bare tillater SSH og HTTP."

---

## Generelle skriveråd for eksamensdokumentasjon

- Bruk bokmål, ikke nynorsk (med mindre skolen krever nynorsk)
- Skriv for en 17-18-åring som skal forstå det uten IT-bakgrunn
- Forklar *hvorfor*, ikke bare *hva*: "Vi bruker brannmur **fordi** det hindrer uautorisert tilgang"
- Bruk tabeller og punktlister — sensor leser fort
- Referer til de tre fagene eksplisitt der det er naturlig
