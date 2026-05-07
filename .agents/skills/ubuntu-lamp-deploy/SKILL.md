---
name: ubuntu-lamp-deploy
description: Deploy a small web application on Ubuntu Server using Apache, PHP or Node, database, firewall, and basic operations routines.
---

# Ubuntu LAMP Deploy

Use this skill when deploying the ticket system to Ubuntu Server.

## Include steps for

- Ubuntu Server update
- Static IP
- Apache installation
- PHP/MariaDB or Node setup
- Database setup
- Application deployment
- File permissions
- UFW firewall
- SSH
- Service status checks
- Logs
- Troubleshooting

## Command style

Commands should be practical and exam-friendly.

For every important command, explain:

- What the command does
- How to verify it worked
- What can go wrong

## Useful checks

Use relevant commands such as:

```bash
ip a
hostname -I
systemctl status apache2
sudo ufw status
curl http://localhost
sudo tail -f /var/log/apache2/error.log
```

For MariaDB:

```bash
systemctl status mariadb
sudo mysql
```

For Node:

```bash
node -v
npm -v
npm run
```

## Security

Always include:

- UFW firewall
- SSH access
- File permissions
- Database user permissions
- No secrets in Git

## Exam explanation

Always include:

- What to show examiner
- Why server deployment matters
- How this connects to driftstøtte
- How to troubleshoot if the website is down
