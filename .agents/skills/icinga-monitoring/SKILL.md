---
name: icinga-monitoring
description: Plan and configure Icinga monitoring for a small company server environment.
---

# Icinga Monitoring

Use this skill when setting up or documenting monitoring.

## What to monitor

Monitor:

- Host alive / ping
- HTTP service
- SSH service
- Disk usage
- CPU/load
- Memory
- Apache status if possible
- Database service if possible

## Explanation

Always explain:

- Why monitoring matters
- What each check means
- How IT staff can react to alerts
- How monitoring helps before users report problems

## Example checks

For a web server, include:

- Ping check
- HTTP check
- SSH check
- Disk check
- Load check

## Troubleshooting

If a check fails, suggest:

- Check if server is online
- Check IP address
- Check firewall
- Check Apache status
- Check logs
- Check disk space

Useful commands:

```bash
ping <server-ip>
curl http://<server-ip>
systemctl status apache2
sudo ufw status
df -h
uptime
```

## Exam explanation

Always include:

- What to demonstrate to examiner
- Why Icinga is useful in driftstøtte
- How monitoring connects to user support
- Possible improvements
