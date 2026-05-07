---
name: backuppc-runbook
description: Set up and explain BackupPC for the exam project. Use this skill when the user asks about backup, BackupPC, restore procedures, disaster recovery, backup plans, or how to protect data on the server. Also use it when the user needs to explain the backup solution to the examiner.
---

# BackupPC Runbook

BackupPC er et gratis backup-system som kan ta kopi av filer og databaser fra Ubuntu-serveren.

---

## Installasjon

```bash
sudo apt install backuppc -y
```

Under installasjonen blir du spurt om e-post og webserver — trykk Enter for standardverdier.

```bash
# Hent det genererte admin-passordet
sudo cat /etc/backuppc/apache.passwd

# Åpne i nettleseren
# http://192.168.1.100/backuppc
```

Logg inn med bruker `backuppc` og passordet fra filen over.

---

## Konfigurer backup av applikasjonen

### Legg til lokal backup-jobb

Rediger konfig:
```bash
sudo nano /etc/backuppc/localhost.pl
```

Legg til:
```perl
$Conf{BackupFilesOnly} = [
    '/var/www/it-portal',
    '/etc/apache2/sites-available',
    '/etc/netplan',
];
```

### Backup av MariaDB (databasedump)

Lag et dump-skript:
```bash
sudo nano /usr/local/bin/db-backup.sh
```

```bash
#!/bin/bash
DATO=$(date +%Y-%m-%d_%H%M)
DEST="/var/backups/db"
mkdir -p "$DEST"
mysqldump -u portal_bruker -pSterkPassord123! it_portal > "$DEST/it_portal_$DATO.sql"
# Behold bare de siste 7 backupene
ls -t "$DEST"/*.sql | tail -n +8 | xargs rm -f
echo "Backup fullført: it_portal_$DATO.sql"
```

```bash
sudo chmod +x /usr/local/bin/db-backup.sh
```

Planlegg automatisk daglig backup:
```bash
sudo crontab -e
```

Legg til:
```
0 2 * * * /usr/local/bin/db-backup.sh >> /var/log/db-backup.log 2>&1
```

---

## Manuell kjøring og testing

```bash
# Kjør database-backup manuelt
sudo /usr/local/bin/db-backup.sh

# Sjekk at filen ble opprettet
ls -lh /var/backups/db/

# Se backup-logg
cat /var/log/db-backup.log
```

---

## Gjenoppretting (restore)

### Gjenopprett databasen:
```bash
# Finn siste backup
ls -lt /var/backups/db/*.sql | head -1

# Gjenopprett
mysql -u portal_bruker -pSterkPassord123! it_portal < /var/backups/db/it_portal_2025-01-15_0200.sql
```

### Gjenopprett applikasjonsfiler via BackupPC:
1. Åpne BackupPC webgrensesnitt: `http://192.168.1.100/backuppc`
2. Klikk på `localhost` → velg backup-dato
3. Naviger til `/var/www/it-portal`
4. Klikk "Restore" på ønskede filer

---

## Verifisering for eksamen

```bash
# Vis at backup-script finnes
ls -la /usr/local/bin/db-backup.sh

# Vis at cron-jobb er satt opp
sudo crontab -l

# Vis eksisterende backups
ls -lh /var/backups/db/

# Vis BackupPC-status
sudo systemctl status backuppc
```

---

## Sensorbeskrivelse

> "Backup-løsningen min har to lag: BackupPC tar backup av applikasjonsfilene og Apache-konfigurasjonen, mens et egenutviklet skript tar daglig database-dump med mysqldump. Databasebackupene lagres i 7 dager og slettes automatisk. Hvis serveren krasjer, kan jeg gjenopprette databasen på under 5 minutter ved å kjøre en enkel mysql-kommando."

---

## Kobling til eksamensfag

- **Driftstøtte**: Backup er kritisk del av IT-drift — sikrer mot datatap
- **Brukerstøtte**: Gjenopprettingsprosedyren er dokumentert slik at IT-teamet vet hva de gjør i en krise
