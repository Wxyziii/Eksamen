---
name: git-sync-review
description: Safe Git workflow for the Eksamen exam project. Use this skill BEFORE making any file changes, commits, or pushes in the repository. Always run this skill first when the user asks to "save changes", "commit", "push", "sync", or "update the repo". Also use it when starting a new task to ensure the working tree is clean and up to date.
---

# Git Sync & Review

Run this workflow **before every task** that touches files in the repo.

## Step 1 — Check state

```bash
git status
git branch
git log --oneline -5
```

Report: current branch, any uncommitted changes, last 5 commits.

## Step 2 — Fetch remote

```bash
git fetch origin
git status -sb   # shows ahead/behind vs remote
```

**Rules:**
- If local is behind → pull with rebase: `git pull --rebase origin main`
- If local has uncommitted changes → stash first: `git stash`, then pull, then `git stash pop`
- If there are merge conflicts → STOP. Report conflicts to user. Never auto-resolve.
- If local is ahead or equal → safe to continue without pulling.

## Step 3 — Make the change

Do the actual task requested (code, config, docs, etc.).

## Step 4 — Self code review

Before committing, check:
- [ ] No passwords, API keys, or secrets in any file
- [ ] No debug `console.log` / print statements left in production code
- [ ] Input validation present on all user-facing fields
- [ ] SQL queries use parameterized placeholders, not string concatenation
- [ ] No unnecessary files (node_modules, .env, build artifacts) staged
- [ ] File names and folder structure match the project convention

Fix any issues found before continuing.

## Step 5 — Run checks (if available)

```bash
# Node.js projects
npm test 2>/dev/null || echo "No tests"
npm run lint 2>/dev/null || echo "No linter"

# PHP projects
php -l <changed-files>

# C++ tools
make 2>/dev/null || echo "No Makefile"
```

## Step 6 — Stage and commit

Only stage files relevant to this task:

```bash
git add <specific-files>   # NOT git add .
git status                 # confirm what is staged
git diff --staged          # final review of diff
```

Commit message format:
```
<type>: <short description in Norwegian or English>

Types: feat, fix, docs, refactor, chore, security
Examples:
  feat: legg til filtrering på prioritet i ticket-oversikten
  fix: rett SQL injection i søkefeltet
  docs: oppdater brukerguide for ansatte
```

```bash
git commit -m "<message>"
```

## Step 7 — Push

Only push if all checks passed:

```bash
git push origin main
```

**Never** use `git push --force` unless user explicitly requests it and explains why.

## End-of-task report

Always end with:
```
Endrede filer: <list>
Sjekker kjørt: <list or "ingen tilgjengelig">
Kode-review: <Godkjent / Problemer funnet: ...>
Commit-hash: <hash or "ikke committet">
Push-status: <Vellykket / Ikke pushet / Feil: ...>
```
