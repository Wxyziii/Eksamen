---
name: security-hardening-review
description: Review and harden application/server security. Use for SQL injection, XSS, validation, authentication, authorization, secrets, dependencies, CORS, rate limiting, firewall, Apache/SSH hardening, permissions, and exam security explanation.
---

# Security Hardening Review

Security must be practical, demonstrable, and explainable for the exam.

## Main principle

Think in layers:

1. Frontend: safe rendering, clear validation feedback.
2. Backend: trust nothing from the client.
3. Database: parameterized queries and least privilege.
4. Server: firewall, permissions, logs, no exposed secrets.
5. Git: no `.env`, database dumps, passwords, or build artifacts committed.

## Code security checklist

### SQL injection
- Use parameterized queries/prepared statements.
- Never build SQL using string concatenation with user input.
- Test with payloads like `' OR '1'='1`.

### XSS
- Render user content as text, not raw HTML.
- Avoid `innerHTML` for ticket title/description/solution unless sanitized.
- Escape/encode output in templates.

### Validation
- Validate all inputs server-side.
- Enforce length limits and enum values.
- Return safe, specific validation messages.

### Authentication/authorization if implemented
- Hash passwords with bcrypt/argon2.
- Protect admin endpoints.
- Check authorization on every protected request.
- Add rate limiting to login.

### Secrets
- Use `.env` and `.env.example`.
- Do not commit `.env`, DB dumps, private keys, or backup credentials.
- Rotate any secret that has been committed.

## Server security checklist

```bash
sudo ufw status verbose
sudo apachectl configtest
ls -la /var/www/it-portal
ls -la /var/log/apache2
```

Expected:

- Only needed ports open, usually 22 and 80 for local exam LAN.
- Apache hides unnecessary version info where practical.
- Web files owned by appropriate user/group.
- Logs exist and are readable by admin.
- MariaDB is not exposed publicly unless explicitly required.

## Git audit

```bash
git status --short
git log --all --full-history -- .env
grep -RniE "password|passord|secret|token|apikey|api_key" . \
  --exclude-dir=node_modules --exclude-dir=.git
```

Review grep results manually; not every match is a leak.

## Exam demo ideas

- Show invalid input returns 400.
- Show SQL injection payload does not bypass search.
- Show `.gitignore` excludes `.env` and databases.
- Show UFW allows only necessary ports.
- Explain why frontend validation alone is not enough.

## Done output

```txt
Sikkerhetsstatus: <Godkjent/Delvis/Ikke godkjent>
Funn: <issues>
Tiltak gjort: <fixes>
Tester: <security checks run>
Sensorforklaring: <short Norwegian explanation>
```
