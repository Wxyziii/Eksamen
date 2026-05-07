---
name: git-safe-workflow
description: Use safe Git workflow before and after repo changes. Trigger before file changes, commits, pushes, sync, pull, merge, branch work, or when the user asks to save/update repo. Prevents lost work, bad commits, secrets, and accidental force pushes.
---

# Git Safe Workflow

Use this skill before changing repository files when Git is involved.

## Before changes

```bash
git status --short
git branch --show-current
git log --oneline -5
git remote -v
```

If remote exists:

```bash
git fetch origin
git status -sb
```

Rules:

- If uncommitted user changes exist, do not overwrite them.
- If behind remote, pull/rebase safely only when working tree is clean or changes are stashed.
- Never auto-resolve merge conflicts without reporting.
- Never force push unless the user explicitly asks and understands why.

## During changes

- Stage only relevant files, not `git add .` by default.
- Keep commits focused.
- Do not include secrets, `.env`, databases, node_modules, build outputs, or large generated caches.

## Before commit

```bash
git status --short
git diff -- <changed-files>
git diff --staged
```

Run relevant checks:

```bash
npm test || true
npm run lint || true
npm run build || true
```

Only use `|| true` for discovery/reporting; if a command fails, report it honestly.

## Commit message format

```txt
feat: legg til mørkt admin-dashboard
fix: rett validering for ticket-status
docs: oppdater brukerveiledning
security: fjern hardkodet passord
chore: rydd prosjektstruktur
```

## End report

```txt
Git-status: <clean/dirty/ahead/behind>
Endrede filer: <list>
Sjekker: <commands + result>
Commit: <hash or ikke committet>
Push: <status>
```
