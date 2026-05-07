---
name: fullstack-ticket-system
description: Build, modify, debug, or explain the VG2 IT exam support/ticket system. Use for employee ticket forms, admin dashboard, filters, status updates, REST API, SQLite/MariaDB schema, frontend/backend integration, demo data, and exam-friendly feature planning.
---

# Fullstack Ticket System

This skill connects frontend, backend, database, security, testing, and exam explanation for the support portal.

## Product goal

Create a local IT support portal where:

- Employees can report IT problems.
- IT staff can view, filter, prioritize, and update tickets.
- The system demonstrates real-world support workflow.
- The whole solution can be explained clearly in the exam.

## Required user flows

### Employee flow
1. Open support portal.
2. Fill title, description, category, priority.
3. Submit ticket.
4. Receive confirmation with ticket number/status.

### IT/admin flow
1. Open admin dashboard.
2. See overview stats.
3. Filter/search tickets.
4. Open ticket detail.
5. Change status/priority.
6. Add solution.
7. Mark as solved.

## Recommended stack

Prefer the stack that is already in the repo. If choosing from scratch:

- Frontend: HTML/CSS/Vanilla JS for simplest exam explanation, or React + Tailwind for stronger UI.
- Backend: Node.js + Express.
- Database: SQLite for local simplicity, MariaDB if the exam specifically needs LAMP/database server depth.
- Deployment: Ubuntu Server + Apache reverse proxy or static hosting + Node service.

## Data model

Minimum `tickets` table:

```sql
CREATE TABLE IF NOT EXISTS tickets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Åpen',
  priority TEXT NOT NULL DEFAULT 'Normal',
  category TEXT NOT NULL DEFAULT 'Generelt',
  assigned_to TEXT,
  solution TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

Optional but strong:

```sql
CREATE TABLE IF NOT EXISTS ticket_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  ticket_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE CASCADE
);
```

## API contract

```txt
GET    /api/health
GET    /api/tickets
GET    /api/tickets/:id
POST   /api/tickets
PATCH  /api/tickets/:id
GET    /api/stats
```

Filters:

```txt
/api/tickets?status=Åpen&priority=Høy&category=Nettverk&q=printer
```

## Frontend pages

### Employee page
- Dark, focused card layout.
- Form with field labels/help text.
- Inline + submit validation.
- Success receipt card.

### Admin dashboard
- Sidebar navigation.
- KPI cards: open, in progress, solved, critical.
- Search/filter toolbar.
- Ticket table/list.
- Detail drawer with status/priority controls and activity.

### Optional demo page
- System health panel showing API status, server time, and database reachable.
- Useful for Driftstøtte explanation.

## Exam explanation hooks

When adding any feature, also prepare a sentence:

- Utvikling: “Dette viser ... fordi ...”
- Driftstøtte: “Dette hjelper drift fordi ...”
- Brukerstøtte: “Dette hjelper brukeren/IT-avdelingen fordi ...”

Examples:

- Filters: “IT-avdelingen kan prioritere kritiske saker først.”
- Activity log: “Det blir enklere å se hva som er gjort i en sak.”
- Validation: “Systemet hindrer feil data før det lagres.”
- Health endpoint: “Drift kan raskt sjekke om API og database svarer.”

## Testing checklist

Before completion:

- Create ticket from UI.
- Try invalid form data.
- Load admin dashboard.
- Search/filter tickets.
- Open detail view.
- Update status.
- Refresh page and confirm data persists.
- Stop backend or simulate API failure and confirm frontend shows error state.

## Done output

```txt
Fullstack-resultat: <feature/fix>
Frontend: <what changed>
Backend/API: <what changed>
Database: <schema/data changes>
Tester: <manual/automated checks>
Sensorforklaring: <short Norwegian explanation>
```
