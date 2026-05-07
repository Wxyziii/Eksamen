---
name: backup-restore-operator
description: Design, set up, test, or explain BackupPC and database/file backups for the exam project. Use for backup strategy, restore procedures, cron dumps, retention, disaster recovery, verification, and Driftstøtte/Brukerstøtte explanation.
---

# Backup Restore Operator

Backups only count if restore has been tested.

## Backup goals

Protect:

- Application files.
- Database/data file.
- Apache/systemd configuration.
- Documentation and scripts.

## Recommended exam strategy

Use two simple layers:

1. File backup via BackupPC or documented copy/rsync if BackupPC is too time-consuming.
2. Database backup via scheduled dump/copy with retention.

## Do not hardcode secrets

Do not put real database passwords directly in scripts. Prefer root-only config files or environment files.

Example for MariaDB dump config:

```ini
# /root/.my.cnf
[client]
user=portal_bruker
password=REPLACE_WITH_REAL_PASSWORD
```

Permissions:

```bash
sudo chmod 600 /root/.my.cnf
```

## Database backup script

```bash
#!/usr/bin/env bash
set -euo pipefail

DATE=$(date +%Y-%m-%d_%H%M%S)
DEST="/var/backups/it-portal/db"
DB_NAME="it_portal"
RETENTION_DAYS=7

mkdir -p "$DEST"
mysqldump --defaults-extra-file=/root/.my.cnf "$DB_NAME" > "$DEST/${DB_NAME}_${DATE}.sql"
find "$DEST" -type f -name "${DB_NAME}_*.sql" -mtime +$RETENTION_DAYS -delete

echo "[$(date '+%F %T')] Backup OK: $DEST/${DB_NAME}_${DATE}.sql"
```

For SQLite:

```bash
sqlite3 /var/www/it-portal/server/data/tickets.db ".backup '/var/backups/it-portal/db/tickets_$(date +%Y-%m-%d_%H%M%S).db'"
```

## Cron

```bash
sudo crontab -e
```

```cron
0 2 * * * /usr/local/bin/it-portal-db-backup.sh >> /var/log/it-portal-backup.log 2>&1
```

## Restore test

A backup is not complete without a restore test.

MariaDB:

```bash
mysql -u portal_bruker -p it_portal_test < /var/backups/it-portal/db/it_portal_YYYY-MM-DD_HHMMSS.sql
```

SQLite:

```bash
sqlite3 /tmp/restore-test.db ".restore /var/backups/it-portal/db/tickets_YYYY-MM-DD_HHMMSS.db"
sqlite3 /tmp/restore-test.db "SELECT COUNT(*) FROM tickets;"
```

## Exam explanation

Explain:

- What is backed up.
- How often.
- Where it is stored.
- How long it is kept.
- How restore is tested.
- Why backup helps both Driftstøtte and Brukerstøtte.

## Done output

```txt
Backup-resultat: <configured/tested>
Dekker: <files/db/config>
Retention: <policy>
Restore-test: <command/result>
Sensorforklaring: <short Norwegian explanation>
```
