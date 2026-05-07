# AGENTS.md — Eksamen Project

## Project mission

Build a professional, dark-theme IT support/ticket system for VG2 IT tverrfaglig eksamen. The project must be easy to demonstrate and explain across:

- Utvikling: frontend, backend, database, validation, tests.
- Driftstøtte: Ubuntu server, Apache/Node/PHP, firewall, backup, monitoring, logs.
- Brukerstøtte: user guide, admin guide, troubleshooting, support workflow.

## Most important rule

Frontend UI/UX is the highest priority. All frontend work must use dark theme by default unless the user explicitly requests another theme.

## Skill routing

Use these skills from `.agents/skills/`:

1. `project-orchestrator` — broad planning and multi-part tasks.
2. `ui-ux-research-designer` — before all UI design/redesign.
3. `frontend-dark-ui-engineer` — all frontend implementation.
4. `frontend-quality-auditor` — before marking frontend as done.
5. `backend-resilience-architect` — APIs, database, validation, runtime failures.
6. `fullstack-ticket-system` — support portal features.
7. `testing-quality-gate` — before completion.
8. `security-hardening-review` — security-sensitive changes and reviews.
9. `ubuntu-deployment-operator` — server/deployment/Apache/UFW/systemd.
10. `backup-restore-operator` — BackupPC, database dumps, restore testing.
11. `monitoring-observability-operator` — Icinga, health checks, logs.
12. `git-safe-workflow` — before commits/pushes/sync.
13. `exam-documentation-presenter` — Norwegian docs and sensor explanation.
14. `cpp-log-diagnostics` — optional C++ log analyzer.

## Working agreement

Before coding substantial changes:

- Inspect existing files.
- Make a concrete plan.
- Think through failure modes.
- Preserve existing user work.
- Do not add unnecessary dependencies.
- Do not hardcode secrets.

Before saying done:

- Run relevant tests/checks.
- Verify UI states if frontend changed.
- Verify API failure paths if backend changed.
- Report changed files, checks, and remaining risks.

## Frontend standard

All UI must feel like a real SaaS/admin dashboard:

- Dark theme.
- Clear visual hierarchy.
- Good spacing.
- Accessible forms.
- Loading/empty/error/success states.
- Responsive enough for laptop and desktop.
- No generic AI dashboard look.

## Backend standard

All backend work must include:

- Server-side validation.
- Parameterized SQL/prepared statements.
- Safe error responses.
- Useful logging.
- Health endpoint where practical.
- Tests or curl/manual verification.

## Git standard

Never commit secrets, `.env`, databases, `node_modules`, build output, or temporary files. Stage only files relevant to the task.
