# AGENTS.md

## Project context

This is a Norwegian VG2 IT interdisciplinary exam project.

The project is a company support portal / ticket system for a small fictional company.

The work must always connect to these subjects:

1. Utvikling
2. Driftstøtte
3. Brukerstøtte

The goal is to create a realistic IT solution that can be explained clearly to an examiner.

## Important Codex skill rule

This repository has project-specific Codex skills stored in:

.agents/skills/

When a task matches one of these skills, use the relevant skill from .agents/skills before starting the work.

Available project skills:

- git-sync-review
- exam-project-planner
- fullstack-ticket-system
- cpp-log-analyzer
- ubuntu-lamp-deploy
- backuppc-runbook
- icinga-monitoring
- security-review
- norwegian-exam-documentation

If the user asks to plan the project, use exam-project-planner.

If the user asks to build or modify the ticket system, use fullstack-ticket-system.

If the user asks about C++, logs, diagnostics, or operations tools, use cpp-log-analyzer.

If the user asks about Ubuntu Server, Apache, LAMP, deployment, firewall, SSH, or server setup, use ubuntu-lamp-deploy.

If the user asks about backup, restore, BackupPC, or disaster recovery, use backuppc-runbook.

If the user asks about monitoring, alerts, server checks, Icinga, or availability, use icinga-monitoring.

If the user asks about security, vulnerabilities, validation, permissions, secrets, or hardening, use security-review.

If the user asks for documentation, README, user guides, exam scripts, Norwegian explanations, brukerstøtte, or sensor explanations, use norwegian-exam-documentation.

Before making repository changes, use git-sync-review.

## Required Git workflow

Before making repository changes, always use the git-sync-review skill.

Always:

1. Check git status.
2. Check current branch.
3. Fetch remote changes.
4. Pull/rebase only if safe.
5. Never overwrite local changes.
6. Make the requested change.
7. Run relevant tests/build/lint if available.
8. Perform self code review.
9. Commit only relevant files.
10. Push only if checks pass.
11. Never force push unless explicitly requested.

At the end of every task, report:

- changed files
- checks run
- review result
- commit hash if committed
- push status

## Main solution

Build an internal support portal where employees can create IT support tickets and the IT department can manage them.

Core features:

- Create ticket
- List tickets
- Filter by status, priority, category, and queue
- Update ticket status
- Add solution/comment
- Store tickets in a local database
- Simple admin/IT view
- Simple employee/user view

## Preferred stack

Use simple and exam-friendly technology.

Preferred:

- Node.js/Express or PHP
- SQLite or MariaDB
- HTML/CSS/JavaScript or React
- Ubuntu Server deployment
- Apache or Nginx
- BackupPC for backup
- Icinga for monitoring
- Optional C++ tool for log analysis or server diagnostics

Avoid unnecessary complexity unless it improves the exam explanation.

## Code style

- Keep the code simple and readable.
- Prefer clear names over clever code.
- Add comments only where they help explain important logic.
- Avoid overengineering.
- Use small files and clear folder structure.
- Validate user input.
- Handle errors clearly.
- Do not add features that are not useful for the exam.

## Security requirements

Always consider:

- Input validation
- SQL injection prevention
- XSS prevention
- Password handling if login is implemented
- Least privilege
- Firewall rules
- Backup
- Logging
- Safe error messages

If authentication is too time-consuming, use a simple demo login and clearly document that it is for exam demonstration only.

## Driftstøtte requirements

Whenever deployment or infrastructure is discussed, include:

- Ubuntu Server setup
- Static IP
- Web server setup
- Database setup
- Firewall with UFW
- SSH administration
- BackupPC backup plan
- Icinga monitoring plan
- What to show the examiner
- Common troubleshooting steps

## Brukerstøtte requirements

Whenever documentation is requested, produce Norwegian documentation suitable for VG2 IT.

Include:

- User guide for employees
- IT admin guide
- Troubleshooting routine
- Security advice
- Simple language
- Professional but understandable tone

## Exam explanation

For every major feature or setup, explain:

- What it does
- Why it is useful for a company
- Which subject it connects to
- What can be demonstrated live
- What can be said to the examiner
- Possible improvements

## Testing

Always suggest how to test changes.

For web app:

- Start server
- Open app in browser
- Create ticket
- Filter ticket
- Update status
- Check database
- Test invalid input

For server:

- Check service status
- Check IP
- Check firewall
- Check logs
- Check backup
- Check monitoring

## Output style

When giving explanations, use Norwegian Bokmål unless asked otherwise.

Keep explanations suitable for a 17-18 year old VG2 IT student aiming for grade 4-5.
