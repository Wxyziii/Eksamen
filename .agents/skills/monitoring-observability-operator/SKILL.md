---
name: monitoring-observability-operator
description: Set up, test, or explain monitoring/observability for the exam project. Use for Icinga, service health scripts, uptime checks, logs, Apache/API/database monitoring, alerts, health endpoints, and Driftstøtte demonstration.
---

# Monitoring Observability Operator

Monitoring should prove that the system is alive and help troubleshoot when it is not.

## Practical exam approach

Use Icinga if you have time. If not, build a simple monitoring script with cron/logs; it is easier to explain and demonstrate.

## What to monitor

- Apache: service active + HTTP response.
- API: `/api/health` returns OK.
- Database: reachable or DB file readable.
- Disk space: not over threshold.
- Backup: recent backup exists.
- Logs: recent errors visible.

## Simple health endpoint expectation

Backend should expose:

```txt
GET /api/health
```

Response:

```json
{
  "status": "ok",
  "time": "2026-05-07T10:00:00.000Z",
  "database": "ok"
}
```

## Monitoring script

```bash
#!/usr/bin/env bash
set -u
LOG="/var/log/it-portal-monitor.log"
DATE=$(date '+%F %T')
STATUS="OK"

check_service() {
  local name="$1"
  if systemctl is-active --quiet "$name"; then
    echo "$DATE [$name] OK"
  else
    echo "$DATE [$name] CRITICAL service down"
    STATUS="FAIL"
  fi
}

check_http() {
  local url="$1"
  local code
  code=$(curl -s -o /dev/null -w "%{http_code}" "$url" || true)
  if [ "$code" = "200" ]; then
    echo "$DATE [$url] OK HTTP 200"
  else
    echo "$DATE [$url] WARNING HTTP $code"
    STATUS="FAIL"
  fi
}

check_disk() {
  local used
  used=$(df / | awk 'NR==2 {gsub("%", "", $5); print $5}')
  if [ "$used" -lt 85 ]; then
    echo "$DATE [disk] OK ${used}% used"
  else
    echo "$DATE [disk] WARNING ${used}% used"
    STATUS="FAIL"
  fi
}

check_service apache2
check_http http://localhost
check_http http://localhost/api/health
check_disk

echo "$DATE [overall] $STATUS"
echo "---"
```

Cron:

```cron
*/5 * * * * /usr/local/bin/it-portal-monitor.sh >> /var/log/it-portal-monitor.log 2>&1
```

## Icinga option

If using Icinga:

- Install Icinga 2/Icinga Web according to current distro docs.
- Monitor localhost services.
- Add HTTP check for the portal.
- Add disk check.
- Demonstrate dashboard and one simulated failure if safe.

## Verification

```bash
sudo /usr/local/bin/it-portal-monitor.sh
tail -40 /var/log/it-portal-monitor.log
systemctl status apache2
curl -i http://localhost/api/health
```

## Done output

```txt
Monitorering-resultat: <what is checked>
Frekvens: <cron/Icinga>
Logg/dashboard: <where>
Tester: <commands + result>
Sensorforklaring: <short Norwegian explanation>
```
