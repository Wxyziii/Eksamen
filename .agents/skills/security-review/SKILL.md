---
name: security-review
description: Review and improve the security of the exam project. Use this skill when the user asks about security, SQL injection, XSS, input validation, password handling, firewall rules, permissions, secrets management, vulnerability hardening, or wants a security check of the code or server. Also use it when preparing the security section of the exam presentation.
---

# Security Review

Gå gjennom dette sjekklista for hele prosjektet — kode, server og dokumentasjon.

---

## Sjekkliste — Kode (Utvikling)

### SQL-injeksjon
```javascript
// ❌ FEIL — aldri gjør dette:
db.query("SELECT * FROM tickets WHERE id = " + req.params.id);

// ✅ RIKTIG — parameteriserte spørringer:
db.query("SELECT * FROM tickets WHERE id = ?", [req.params.id]);
```

Sjekk alle database-spørringer i koden. Søk etter `.query(` og se om noen bruker `+` for å bygge SQL-strenger.

### Cross-Site Scripting (XSS)
```javascript
// ❌ FEIL — injiserer rå HTML:
element.innerHTML = userInput;

// ✅ RIKTIG — escaper tekst:
element.textContent = userInput;
// eller server-side:
const escaped = userInput.replace(/</g, '&lt;').replace(/>/g, '&gt;');
```

### Input-validering (alltid på server, ikke bare klient)
```javascript
function validerTicket(body) {
    const feil = [];
    if (!body.tittel || body.tittel.trim().length < 3)
        feil.push('Tittel må være minst 3 tegn');
    if (!body.beskrivelse || body.beskrivelse.trim().length < 10)
        feil.push('Beskrivelse må være minst 10 tegn');
    const gyldigePrioriteter = ['Lav','Normal','Høy','Kritisk'];
    if (!gyldigePrioriteter.includes(body.prioritet))
        feil.push('Ugyldig prioritet');
    return feil;
}
```

### Passord (hvis login er implementert)
```javascript
// Bruk bcrypt — aldri lagre klartekst-passord
const bcrypt = require('bcrypt');
const hash = await bcrypt.hash(passord, 12);   // lagre hash
const ok = await bcrypt.compare(passord, hash); // verifiser
```

### Miljøvariabler — ikke hardkod hemmeligheter
```bash
# .env-fil (IKKE i Git!)
DB_PASSORD=SterkPassord123!
SESSION_SECRET=tilfeldig-lang-streng
```

```bash
# Legg til .gitignore
echo ".env" >> .gitignore
echo "*.db" >> .gitignore
echo "node_modules/" >> .gitignore
```

---

## Sjekkliste — Server (Driftstøtte)

### Brannmur
```bash
sudo ufw status verbose
# Kun nødvendige porter skal være åpne: 22 (SSH), 80 (HTTP)
# Alle andre skal være DENY
```

### Minste privilegium — database
```sql
-- Databasebrukeren skal KUN ha tilgang til én database
SHOW GRANTS FOR 'portal_bruker'@'localhost';
-- Skal vise: GRANT ALL PRIVILEGES ON `it_portal`.* TO ...
-- IKKE: GRANT ALL PRIVILEGES ON *.* (altfor bredt!)
```

### Apache-sikkerhet
```bash
sudo nano /etc/apache2/conf-available/security.conf
# Sett: ServerTokens Prod       (skjuler Apache-versjon)
# Sett: ServerSignature Off     (skjuler versjon i feilsider)
sudo a2enconf security
sudo systemctl reload apache2
```

### Loggføring
```bash
# Sjekk at logger finnes og er lesbare
ls -la /var/log/apache2/
tail -20 /var/log/apache2/error.log
tail -20 /var/log/apache2/access.log
```

---

## Sikkerhets-demo for sensor

Demonstrer disse punktene live:

1. **SQL-injeksjon forhindret**: Prøv `' OR '1'='1` i søkefeltet → skal ikke returnere alle tickets
2. **Input-validering**: Send tomt skjema → skal gi feilmelding
3. **UFW aktiv**: `sudo ufw status` → viser kun port 22 og 80 åpen
4. **Ingen hemmeligheter i Git**: `cat .gitignore` → viser at .env er ekskludert

---

## Kjapp kode-audit

Kjør disse kommandoene i prosjektmappen for å finne potensielle problemer:

```bash
# Finn alle DB-spørringer
grep -rn "query\|execute\|prepare" --include="*.js" --include="*.php" .

# Sjekk om .env er i Git
git log --all --full-history -- .env

# Se om det finnes hardkodede passord
grep -rn "password\|passord\|secret" --include="*.js" --include="*.php" . \
  | grep -v node_modules | grep -v ".gitignore"
```

---

## Sensorbeskrivelse

> "Jeg har tenkt på sikkerhet på tre nivåer: i koden bruker jeg parameteriserte spørringer for å forhindre SQL-injeksjon, og jeg validerer all input på serveren — ikke bare i nettleseren. På servernivå er brannmuren konfigurert til å blokkere alt unntatt port 22 og 80. Passord og nøkler lagres aldri i koden — de er i en .env-fil som er ekskludert fra Git."
