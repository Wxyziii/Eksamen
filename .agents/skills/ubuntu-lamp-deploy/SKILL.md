---
name: ubuntu-lamp-deploy
description: Set up and configure the Ubuntu Server for the exam project. Use this skill when the user asks about Ubuntu Server, Apache, LAMP stack, NGINX, static IP, UFW firewall, SSH, MariaDB installation, deploying the ticket system to a server, or any server infrastructure topic. Also use it when the user needs to know what to show the examiner about the server setup.
---

# Ubuntu LAMP Deploy

Komplett oppsett av Ubuntu Server for eksamen. Kjør kommandoene i rekkefølge.

---

## 1. Grunnleggende serveroppsett

```bash
# Oppdater systemet
sudo apt update && sudo apt upgrade -y

# Sett vertsnavn
sudo hostnamectl set-hostname it-portal-server
```

### Sett statisk IP

Finn nettverksgrensesnittet ditt:
```bash
ip a   # f.eks. ens33 eller eth0
```

Rediger Netplan-konfig:
```bash
sudo nano /etc/netplan/00-installer-config.yaml
```

```yaml
network:
  version: 2
  ethernets:
    ens33:                    # bytt til ditt grensesnitt
      dhcp4: no
      addresses: [192.168.1.100/24]
      gateway4: 192.168.1.1
      nameservers:
        addresses: [8.8.8.8, 8.8.4.4]
```

```bash
sudo netplan apply
ip a   # bekreft ny IP
```

---

## 2. LAMP-stack installasjon

```bash
# Apache
sudo apt install apache2 -y
sudo systemctl enable apache2
sudo systemctl start apache2

# MariaDB
sudo apt install mariadb-server -y
sudo mysql_secure_installation   # svar "Y" på alle spørsmål
sudo systemctl enable mariadb

# PHP (for PHP-prosjekt)
sudo apt install php libapache2-mod-php php-mysql -y

# Node.js (for Node.js-prosjekt)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install nodejs -y
```

### Bekreft installasjon:
```bash
apache2 -v
mysql --version
php -v        # eller node -v
```

---

## 3. MariaDB — Opprett database

```bash
sudo mysql -u root -p
```

```sql
CREATE DATABASE it_portal CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'portal_bruker'@'localhost' IDENTIFIED BY 'SterkPassord123!';
GRANT ALL PRIVILEGES ON it_portal.* TO 'portal_bruker'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

---

## 4. Apache-konfigurasjon

```bash
sudo nano /etc/apache2/sites-available/it-portal.conf
```

```apache
<VirtualHost *:80>
    ServerName 192.168.1.100
    DocumentRoot /var/www/it-portal/public

    <Directory /var/www/it-portal/public>
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/it-portal-error.log
    CustomLog ${APACHE_LOG_DIR}/it-portal-access.log combined
</VirtualHost>
```

```bash
sudo a2ensite it-portal.conf
sudo a2enmod rewrite
sudo a2dissite 000-default.conf
sudo systemctl reload apache2
```

### Distribuer applikasjonen:
```bash
sudo mkdir -p /var/www/it-portal
sudo cp -r /home/bruker/ticket-system/* /var/www/it-portal/
sudo chown -R www-data:www-data /var/www/it-portal
```

---

## 5. UFW Brannmur

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow ssh
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS (valgfritt)
sudo ufw enable
sudo ufw status verbose  # bekreft regler
```

---

## 6. SSH-administrasjon

Sjekk at SSH kjører:
```bash
sudo systemctl status sshd
```

Fra klient (Windows/Mac/Linux):
```bash
ssh bruker@192.168.1.100
```

Sikre SSH (valgfritt men imponerende for sensor):
```bash
sudo nano /etc/ssh/sshd_config
# Endre: PermitRootLogin no
# Endre: PasswordAuthentication no  (kun hvis SSH-nøkler er konfigurert)
sudo systemctl restart sshd
```

---

## 7. Verifisering — hva du viser sensor

```bash
systemctl status apache2          # Tjeneste kjører
systemctl status mariadb          # Database kjører
ufw status                        # Brannmur aktiv
ip addr show                      # Statisk IP
curl http://localhost              # Web tilgjengelig
tail -20 /var/log/apache2/access.log   # Loggfiler
```

**Sensorbeskrivelse:**
> "Serveren kjører Ubuntu Server med LAMP-stack. Jeg har satt statisk IP slik at adressen ikke endres. UFW-brannmuren blokkerer all innkommende trafikk unntatt port 22 (SSH) og 80 (HTTP). MariaDB kjører lokalt og er bare tilgjengelig fra serveren selv — ikke fra utsiden."

---

## Feilsøking

| Problem | Kommando |
|---|---|
| Apache starter ikke | `sudo journalctl -xe -u apache2` |
| Nettside ikke tilgjengelig | `sudo ufw status` / `curl localhost` |
| MariaDB tilkoblingsfeil | `sudo systemctl status mariadb` |
| Feil IP etter reboot | `sudo netplan apply` |
