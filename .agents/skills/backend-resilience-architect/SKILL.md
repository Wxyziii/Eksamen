---
name: backend-resilience-architect
description: Design, build, or review backend/API/database architecture with deep failure analysis. Use for Node/Express, PHP, SQLite, MariaDB, REST APIs, validation, error handling, data models, logging, health checks, migrations, concurrency, and anything that could make the backend fail. Always use before completing backend changes.
---

# Backend Resilience Architect

Backend work must be boring, predictable, secure, and explainable. Think through what can fail before coding.

## Hard rules

- Validate on the server, not only in the frontend.
- Use parameterized queries/prepared statements.
- Do not hardcode secrets or passwords.
- Do not expose raw errors/stack traces to users.
- Every endpoint must handle success, invalid input, not found, and server error cases.
- Every backend task must end with tests or concrete manual verification.

## Deep backend planning

Before backend changes, produce or internally use this plan:

```txt
Backend-plan:
- Data model:
- API endpoints:
- Validation rules:
- Failure modes:
- Security concerns:
- Logging/observability:
- Tests:
- Rollback/recovery:
```

## Failure-mode checklist

Think through:

### Request failures
- Missing required fields.
- Wrong field types.
- Too short/long text.
- Invalid enum values.
- Malformed JSON.
- Duplicate submissions.
- Unknown ID.
- Unsupported HTTP method.

### Database failures
- Database file missing/unwritable.
- Migration not applied.
- Constraint violation.
- Connection refused.
- Disk full.
- Locked SQLite database.
- Foreign key mismatch.
- Backup/restore compatibility.

### Runtime failures
- Port already in use.
- Environment variables missing.
- Dependency not installed.
- Process crash.
- Unhandled promise rejection.
- Slow or hanging request.

### Security failures
- SQL injection.
- XSS via stored ticket content.
- Mass assignment.
- Broken authorization if login exists.
- CORS too open.
- Rate-limiting missing for login or spam-prone endpoints.
- Secrets committed to Git.

## API standards

For a ticket system, prefer:

```txt
GET    /api/health
GET    /api/tickets?status=&priority=&category=&q=
GET    /api/tickets/:id
POST   /api/tickets
PATCH  /api/tickets/:id
POST   /api/tickets/:id/comments      # optional
DELETE /api/tickets/:id               # optional/admin-only
```

Return consistent JSON:

```json
{
  "data": {},
  "error": null,
  "meta": {}
}
```

For errors:

```json
{
  "data": null,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Tittel må være minst 3 tegn.",
    "fields": { "title": "For kort tittel" }
  }
}
```

## Validation rules for tickets

Minimum:

- title: required, trimmed, 3-120 chars
- description: required, trimmed, 10-2000 chars
- priority: enum `Lav`, `Normal`, `Høy`, `Kritisk`
- category: enum `Hardware`, `Software`, `Nettverk`, `Tilgang`, `Generelt`
- status: enum `Åpen`, `Under arbeid`, `Løst`, `Lukket`
- solution: optional, max 2000 chars; required if status becomes `Løst` when appropriate

## Database standards

- Use migrations or an idempotent `initDb` that creates missing tables safely.
- Enable foreign keys in SQLite if relations are used.
- Use `created_at` and `updated_at` consistently.
- Never use string concatenation to build SQL from user input.
- Keep seed/test data separate from production/demo data.
- Include backup/restore notes when schema changes.

## Error handling standards

- Central error handler.
- 400 for validation.
- 404 for not found.
- 409 for conflicts.
- 500 for unexpected server errors.
- Log detailed server error internally; return safe message to client.
- Health endpoint must be simple and fast.

## Testing before done

At minimum, verify:

- Server starts.
- `/api/health` returns OK.
- Create valid ticket works.
- Invalid ticket returns 400.
- List tickets works.
- Filter/search works if implemented.
- Unknown ID returns 404.
- Update status works.
- SQL injection payload does not break query or bypass logic.

Use automated tests if available. Otherwise use `curl` examples and report outputs.

## Done output

```txt
Backend-resultat: <what changed>
Failure modes vurdert: <list>
Security: <validation/sql/secrets/errors>
Tester: <commands/manual checks + result>
```
