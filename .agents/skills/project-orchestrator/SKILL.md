---
name: project-orchestrator
description: Orchestrate the full VG2 IT exam project. Use when planning, prioritizing, choosing scope, connecting Utvikling/Driftstøtte/Brukerstøtte, deciding what to build next, or preparing a safe execution plan before touching multiple parts of the repo. Must coordinate UI/UX, frontend, backend, deployment, security, testing, documentation, and exam demo work.
---

# Project Orchestrator

Use this skill as the first stop for broad or multi-part exam tasks. The goal is to keep the project impressive, explainable, and realistic for a VG2 IT tverrfaglig eksamen.

## Non-negotiable priorities

1. Frontend/UI/UX quality is the highest priority.
2. Dark theme is the default for all frontend work unless the user explicitly asks for another theme.
3. Every feature must connect clearly to one or more exam subjects:
   - Utvikling: code, database, API, UI, validation, tests.
   - Driftstøtte: server, deployment, firewall, backup, monitoring, logs.
   - Brukerstøtte: user guide, admin guide, troubleshooting, support process.
4. Do not finish a task without a verification report.
5. Prefer simple, robust, explainable solutions over over-engineered production systems.

## Activation workflow

Before implementation, create a brief but concrete plan:

- Goal: what the task should achieve.
- Scope: exact files/modules likely affected.
- Skills to use: UI/UX, frontend, backend, testing, security, deployment, documentation.
- Risks: what can break or become hard to explain.
- Checks: exact commands or manual tests that will prove it works.

If the task touches UI, load/use `ui-ux-research-designer` and `frontend-dark-ui-engineer` before coding.
If the task touches APIs, database, authentication, validation, or server runtime, load/use `backend-resilience-architect` and `security-hardening-review`.
If the task changes behavior, load/use `testing-quality-gate` before completion.

## Recommended project architecture

For the exam ticket/support portal:

```txt
ticket-system/
├── server/                 # API, database, validation, logging
├── client/                 # frontend UI
├── docs/                   # guides, diagrams, demo script
├── deployment/             # Apache/systemd/UFW/netplan notes
├── backup/                 # BackupPC + DB dump scripts/docs
├── monitoring/             # service checks / Icinga notes
├── tests/                  # API/UI/manual test scripts
├── AGENTS.md
└── README.md
```

If the repo already has another structure, preserve it unless there is a clear reason to refactor.

## Feature scoring rule

When deciding what to build, prioritize features with high exam value:

- Shows a complete user flow: employee creates ticket, IT handles it, status changes, solution is documented.
- Has visible frontend quality: dashboard, filters, state badges, detail panel, form validation.
- Has backend quality: validation, safe SQL, error handling, logs, health endpoint.
- Has operations quality: deployable on Ubuntu, firewall, backup, monitoring.
- Has documentation quality: user guide, admin guide, troubleshooting, demo explanation.

Avoid features that take a lot of time but are hard to explain in 10-15 minutes.

## Done output

End every task with:

```txt
Resultat: <what changed>
Fagkobling: <Utvikling/Driftstøtte/Brukerstøtte explanation>
Endrede filer: <list>
Tester/verifisering: <commands/manual tests + result>
Risiko igjen: <known issues or "ingen kjente">
Neste beste steg: <one recommendation>
```
