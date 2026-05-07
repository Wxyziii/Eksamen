# Backend risk register — IT-støtteportal

Dette dokumentet brukes for å vise at backend er planlagt seriøst. Bruk det både under utvikling og i sensorframføring.

| # | Mulig feil | Konsekvens | Forebygging | Test | Eksamenforklaring |
|---:|---|---|---|---|---|
| 1 | Ugyldig input ved ticket-oppretting | Dårlige data i databasen eller krasj i API | Server-side validering av tittel, beskrivelse, prioritet og kategori | Send tom tittel og for kort beskrivelse | “Jeg validerer data på serveren fordi klientvalidering kan omgås.” |
| 2 | SQL injection | Angriper kan lese/endre data | Parameteriserte spørringer / prepared statements | Prøv `' OR '1'='1` i søk/felt | “Jeg bygger aldri SQL med string-concatenation.” |
| 3 | XSS via ticket-beskrivelse | Skadelig script kan kjøre i nettleser | Bruk `textContent`, escaping og aldri `innerHTML` med user input | Opprett ticket med `<script>alert(1)</script>` | “Brukerdata behandles som tekst, ikke HTML.” |
| 4 | Databasefil mangler eller feil path | API kan ikke lagre/hente tickets | `.env.example`, tydelig `DATABASE_URL`, opprett data-mappe | Start server uten databasefil | “Oppsettet er dokumentert, og serveren gir kontrollert feilmelding.” |
| 5 | Database er låst / busy | Tickets lagres ikke midlertidig | Feilhåndtering, retry ved behov, kortvarige transaksjoner | Simuler feil eller stopp DB | “Backend svarer med riktig HTTP-feil i stedet for å krasje.” |
| 6 | Server krasjer på uventet feil | Hele systemet går ned | Global error handler, logging, try/catch/async wrapper | Kall ugyldig API-route | “Uventede feil logges og gir 500 uten å lekke detaljer.” |
| 7 | Secrets committed i Git | Passord/nøkler kan lekke | `.env` i `.gitignore`, `.env.example` commitet | `git status` og sjekk repo | “Jeg committer aldri ekte hemmeligheter.” |
| 8 | CORS for åpent | Andre sider kan misbruke API-et | Begrens CORS til behov eller LAN-demo | Test request fra annen origin | “CORS er konfigurert etter behov, ikke bare wildcard i produksjon.” |
| 9 | Manglende statuskoder | Frontend forstår ikke feil | Bruk 200/201/400/404/409/500 korrekt | Test GET ugyldig ID og POST ugyldig data | “HTTP-statuskoder gjør API-et forutsigbart.” |
| 10 | Manglende logging | Vanskelig å feilsøke | Logg requests, errors og viktige hendelser | Sjekk logg etter request | “Logging hjelper IT-drift og brukerstøtte.” |
| 11 | Disk full | Database/backup kan feile | Overvåk diskplass og roter logger/backups | `df -h` og backup-test | “Drift handler også om kapasitet, ikke bare kode.” |
| 12 | Backup finnes, men restore er ikke testet | Falsk trygghet | Test restore med demo-data | Kjør restore på testdatabase | “Backup er ikke ferdig før restore er verifisert.” |
| 13 | API returnerer sensitiv stack trace | Kan lekke intern info | Skjul detaljer i production, logg internt | Sett `NODE_ENV=production` og provoser feil | “Brukeren får trygg feilmelding, loggen har detaljer.” |
| 14 | Race condition ved samtidig oppdatering | Status/løsning kan overskrives | Oppdatert-timestamp og kontrollert update-flow | Oppdater samme ticket to ganger | “Jeg har tenkt på at flere IT-teknikere kan jobbe samtidig.” |
| 15 | Manglende health endpoint | Vanskelig å overvåke | Lag `/api/health` som returnerer status | `curl /api/health` | “Overvåking kan sjekke API-et automatisk.” |

## Minimum backend quality gate

Før backend regnes som ferdig:

- [ ] Alle API-ruter validerer input.
- [ ] Alle SQL-spørringer er parameteriserte.
- [ ] Ugyldig data gir 400.
- [ ] Ugyldig ID gir 404.
- [ ] Uventet feil gir 500 uten stack trace til bruker.
- [ ] `.env.example` finnes.
- [ ] `.env` er i `.gitignore`.
- [ ] API smoke test er kjørt.
- [ ] Seed/demo-data fungerer.
- [ ] Backend-risikoene over er forklart i sensor-scriptet.
