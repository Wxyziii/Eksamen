---
name: icinga-monitoring
description: Set up and explain Icinga monitoring for the exam project. Use this skill when the user asks about monitoring, Icinga, server health checks, uptime alerts, availability monitoring, or how to detect when a service goes down. Also use it when the user needs to demonstrate or explain the monitoring setup to the examiner.
---

# Icinga Monitoring

Icinga overvåker servertjenester og varsler hvis noe slutter å fungere. Imponerer sensor ved å vise at du tenker på proaktiv drift.

---

## Installasjon (Icinga 2 + IcingaWeb 2)

```bash
# Legg til Icinga-repo
curl -sSL https://packages.icinga.com/icinga.key | sudo apt-key add -
echo "deb https://packages.icinga.com/ubuntu icinga-$(lsb_release -cs) main" \
  | sudo tee /etc/apt/sources.list.d/icinga.list

sudo apt update
sudo apt install icinga2 icingaweb2 icingacli -y

# Start og aktiver
sudo systemctl enable icinga2
sudo systemctl start icinga2
```

### Sett opp webgrensesnitt:
```bash
sudo icingacli setup token create
# Kopier tokenet som vises

# Åpne i nettleseren: http://192.168.1.100/icingaweb2/setup
# Lim inn tokenet og følg installasjonsveiviseren
```

---

## Alternativ: Enkel overvåking uten Icinga

Hvis Icinga er for komplisert å sette opp på eksamen, lag et enkelt overvåkingsskript som gir samme pedagogiske verdi:

```bash
sudo nano /usr/local/bin/sjekk-tjenester.sh
```

```bash
#!/bin/bash
LOGG="/var/log/tjeneste-status.log"
DATO=$(date '+%Y-%m-%d %H:%M:%S')
STATUS="OK"

sjekk_tjeneste() {
    local navn="$1"
    if systemctl is-active --quiet "$navn"; then
        echo "$DATO [$navn] OK - tjeneste kjører"
    else
        echo "$DATO [$navn] KRITISK - tjeneste er nede!"
        STATUS="FEIL"
        # Forsøk automatisk omstart
        systemctl restart "$navn"
        echo "$DATO [$navn] Omstart forsøkt"
    fi
}

sjekk_http() {
    if curl -s -o /dev/null -w "%{http_code}" http://localhost | grep -q "200"; then
        echo "$DATO [HTTP] OK - nettside svarer"
    else
        echo "$DATO [HTTP] ADVARSEL - nettside svarer ikke"
        STATUS="FEIL"
    fi
}

# Kjør sjekker
sjekk_tjeneste "apache2"
sjekk_tjeneste "mariadb"
sjekk_http

echo "---"
```

```bash
sudo chmod +x /usr/local/bin/sjekk-tjenester.sh

# Kjør hvert 5. minutt
sudo crontab -e
# Legg til:
*/5 * * * * /usr/local/bin/sjekk-tjenester.sh >> /var/log/tjeneste-status.log 2>&1
```

---

## Hva du overvåker

| Tjeneste | Sjekk | Konsekvens ved feil |
|---|---|---|
| Apache | `systemctl is-active` + HTTP 200 | Ticket-systemet er utilgjengelig |
| MariaDB | `systemctl is-active` | Ingen tickets kan lagres/hentes |
| Disk | `df -h` (> 80% full) | Server kan krasje |
| SSH | Port 22 åpen | Mister administrasjonstilgang |

---

## Vis status for eksamen

```bash
# Kjør overvåkingsskript manuelt
sudo /usr/local/bin/sjekk-tjenester.sh

# Se statuslogg
tail -30 /var/log/tjeneste-status.log

# Icinga (hvis installert)
sudo systemctl status icinga2
# Åpne: http://192.168.1.100/icingaweb2
```

---

## Sensorbeskrivelse

> "Jeg har satt opp automatisk overvåking av Apache og MariaDB. Hvert 5. minutt kjøres et skript som sjekker om tjenestene er oppe. Hvis Apache slutter å svare, prøver skriptet automatisk å starte tjenesten på nytt og logger hendelsen. Dette er viktig for Driftstøtte fordi IT-avdelingen raskt kan se om det har vært problemer, uten å måtte logge inn og sjekke manuelt."

---

## Kobling til eksamensfag

- **Driftstøtte**: Proaktiv overvåking er grunnleggende IT-drift — oppdager problemer før brukerne gjør det
- **Brukerstøtte**: Loggene hjelper til med feilsøking når brukere rapporterer at systemet er nede
