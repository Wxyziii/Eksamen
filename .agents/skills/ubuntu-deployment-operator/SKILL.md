---
name: ubuntu-deployment-operator
description: Deploy or troubleshoot the exam project on Ubuntu Server with Apache, Node/PHP, MariaDB/SQLite, static IP, SSH, UFW, systemd, logs, and LAN access. Use for Driftstøtte deployment, server setup, service checks, Apache reverse proxy/static hosting, and exam verification.
---

# Ubuntu Deployment Operator

This skill focuses on a reliable, exam-friendly Ubuntu deployment.

## Deployment goals

- App reachable from LAN.
- Services start after reboot.
- Firewall allows only necessary traffic.
- Logs are available for troubleshooting.
- Commands are explainable to sensor.

## Pre-flight checklist

```bash
lsb_release -a
ip a
ip route
sudo systemctl status ssh || sudo systemctl status sshd
sudo ufw status verbose
```

Confirm:

- Correct VM/network mode.
- Static IP or DHCP reservation known.
- SSH works before changing firewall.
- You know whether frontend is static, Node, or PHP.

## Static IP with Netplan

Prefer safe testing:

```bash
sudo cp /etc/netplan/00-installer-config.yaml /etc/netplan/00-installer-config.yaml.bak
sudo nano /etc/netplan/00-installer-config.yaml
sudo netplan try
ip a
ip route
```

Modern route pattern:

```yaml
network:
  version: 2
  ethernets:
    ens33:
      dhcp4: no
      addresses:
        - 192.168.1.100/24
      routes:
        - to: default
          via: 192.168.1.1
      nameservers:
        addresses: [1.1.1.1, 8.8.8.8]
```

Replace interface/IP/gateway with actual values.

## Apache options

### Static frontend/PHP

```apache
<VirtualHost *:80>
    ServerName 192.168.1.100
    DocumentRoot /var/www/it-portal/public

    <Directory /var/www/it-portal/public>
        Require all granted
        AllowOverride All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/it-portal-error.log
    CustomLog ${APACHE_LOG_DIR}/it-portal-access.log combined
</VirtualHost>
```

### Node backend reverse proxy

```bash
sudo a2enmod proxy proxy_http headers rewrite
```

```apache
<VirtualHost *:80>
    ServerName 192.168.1.100

    ProxyPreserveHost On
    ProxyPass /api http://127.0.0.1:3000/api
    ProxyPassReverse /api http://127.0.0.1:3000/api

    DocumentRoot /var/www/it-portal/client
    <Directory /var/www/it-portal/client>
        Require all granted
        AllowOverride All
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/it-portal-error.log
    CustomLog ${APACHE_LOG_DIR}/it-portal-access.log combined
</VirtualHost>
```

## Node systemd service

```ini
[Unit]
Description=IT Portal API
After=network.target

[Service]
WorkingDirectory=/var/www/it-portal/server
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=5
Environment=NODE_ENV=production
EnvironmentFile=/etc/it-portal.env
User=www-data
Group=www-data

[Install]
WantedBy=multi-user.target
```

Commands:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now it-portal-api
sudo systemctl status it-portal-api
journalctl -u it-portal-api -n 50 --no-pager
```

## UFW

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw enable
sudo ufw status verbose
```

Only allow 443 if HTTPS is actually configured.

## Verification

```bash
curl -I http://localhost
curl http://localhost/api/health
sudo apachectl configtest
sudo systemctl status apache2
sudo systemctl status it-portal-api
sudo ufw status verbose
```

## Done output

```txt
Deploy-resultat: <what works>
Adresse: <LAN URL>
Tjenester: <apache/node/db status>
Firewall: <allowed ports>
Logger: <where to check>
Tester: <commands + result>
```
