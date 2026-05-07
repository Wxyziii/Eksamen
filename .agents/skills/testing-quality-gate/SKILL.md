---
name: testing-quality-gate
description: Run and design quality gates before a task is considered complete. Use after any code/config change, before commits, before exam demo, and when the user says test, verify, check, make sure it works, or complete the task. Covers frontend, backend, API, deployment, security smoke tests, and manual fallback testing.
---

# Testing Quality Gate

A task is not complete until it has been tested or there is a clear explanation of why a test could not be run.

## Test hierarchy

Use the strongest available checks:

1. Automated unit/integration/e2e tests.
2. Build/lint/typecheck.
3. API smoke tests with `curl`.
4. Browser/manual UI tests.
5. Service/deployment checks.
6. Static inspection as fallback.

## Common commands

Run commands that exist in the repo. Do not invent scripts without checking `package.json`, Makefile, README, etc.

```bash
npm test
npm run lint
npm run build
npm run typecheck
npm run dev
```

Backend/API smoke tests:

```bash
curl -i http://localhost:3000/api/health
curl -i http://localhost:3000/api/tickets
curl -i -X POST http://localhost:3000/api/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Printer virker ikke","description":"Printeren på rom 201 svarer ikke.","priority":"Normal","category":"Hardware"}'
```

Server/deployment:

```bash
systemctl status apache2
systemctl status mariadb
systemctl status <node-service-name>
sudo ufw status verbose
curl -I http://localhost
journalctl -u <service> -n 50 --no-pager
```

## Frontend manual tests

Check:

- Page loads without obvious console errors.
- Navigation works.
- Form labels and validation work.
- Empty state appears when there are no tickets.
- Loading state appears during fetch.
- Error state appears when API fails.
- Filters/search work.
- Keyboard tab order works.
- Dark theme contrast is readable.

## Backend manual tests

Check:

- Valid request succeeds.
- Invalid request returns 400.
- Unknown ID returns 404.
- SQL injection payload does not break app.
- Server logs useful errors.
- Database persists after restart.

## Bug handling

If a test fails:

1. Report the failing test briefly.
2. Fix the smallest root cause.
3. Re-run the failing test.
4. Re-run related smoke tests.
5. Do not claim completion if failure remains; state it clearly.

## Completion format

```txt
Tester kjørt:
- <command/manual test>: <pass/fail>

Feil funnet:
- <issue or "ingen">

Fikset:
- <fix or "ikke relevant">

Kvalitetsstatus: <Godkjent / Delvis godkjent / Ikke godkjent>
```
