---
name: backuppc-runbook
description: Create BackupPC backup and restore routines for a small exam server environment.
---

# BackupPC Runbook

Use this skill when working with backup routines.

## Target system

The main target is an Ubuntu Server hosting a support portal.

## Backup targets

Back up:

- Application files
- Database dump
- Apache config
- Netplan config
- Important documentation
- Optional log analyzer reports

Common paths:

```text
/var/www/html
/opt/support-app
/etc/apache2
/etc/netplan
/home
```

Database dump example:

```bash
mysqldump -u root -p supportdb > supportdb-backup.sql
```

## Backup explanation

Always explain:

- What is backed up
- Why it is backed up
- How often backup should run
- Where backup is stored
- How to verify backup
- How to restore

## Restore test

Always suggest a simple restore demonstration.

Example:

1. Back up one test file.
2. Delete or rename the original.
3. Restore it from BackupPC.
4. Verify the file works again.

## Exam explanation

Always include:

- Why backup is important for a company
- What data the company could lose
- How BackupPC helps
- What to show examiner
- What could be improved later
