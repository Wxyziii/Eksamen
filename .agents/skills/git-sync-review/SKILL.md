---
name: git-sync-review
description: Always synchronize with Git before work, avoid overwriting local changes, verify the project, perform a code review, then commit and push safe changes.
---

# Git Sync Review Skill

Use this skill whenever making changes to this repository, fixing bugs, adding features, editing documentation, or refactoring code.

The goal is to keep the local repository synchronized with GitHub, avoid conflicts, verify changes, review the code, and push completed work safely.

## Mandatory workflow

Before making changes:

1. Inspect repository state:

```bash
git status --short
git branch --show-current
git remote -v
git log --oneline -5
```

2. Fetch remote changes:

```bash
git fetch --all --prune
```

3. Compare local branch with upstream:

```bash
git status -sb
git log --oneline --left-right --graph HEAD...@{u}
```

4. If the working tree is clean and the remote branch is ahead, pull safely:

```bash
git pull --rebase
```

5. If there are local uncommitted changes, do not overwrite them.

Instead:

- Explain that local changes exist.
- Inspect them with:

```bash
git diff
git diff --staged
```

- Continue only if the changes are clearly part of the current task.
- Do not run destructive commands such as git reset --hard, git clean -fd, or force push unless the user explicitly asks.

## During work

Make the smallest correct change.

Prefer:

- Clear code
- Small focused commits
- Simple implementation
- No unnecessary dependencies
- No unrelated formatting changes
- No generated junk files
- No secrets or credentials

## Verification before commit

After changes, run the project's relevant checks.

Use commands from:

- AGENTS.md
- README.md
- package.json
- Makefile
- CMakeLists.txt
- project documentation

For Node projects, check available scripts:

```bash
npm run
```

Common checks:

```bash
npm install
npm run lint
npm run test
npm run build
```

For C++ projects, check CMake/build instructions:

```bash
cmake -S . -B build
cmake --build build
ctest --test-dir build
```

Only run commands that make sense for the repository.

If a command fails:

- Diagnose the failure.
- Fix it if it is related to the current change.
- Do not hide failed checks.
- Do not commit or push unless the remaining failure is clearly unrelated and documented.

## Code review before commit

Before committing, perform a self-review.

Review:

1. Correctness
2. Bugs
3. Security
4. Input validation
5. Error handling
6. Database safety
7. File paths and permissions
8. Performance issues
9. Readability
10. Whether the change matches the exam project goal

Also check the final diff:

```bash
git diff
git diff --staged
```

## Commit rules

Stage only relevant files:

```bash
git add <relevant-files>
```

Do not stage:

- .env
- secrets
- passwords
- API keys
- database files unless intentionally required
- build folders
- node_modules
- .DS_Store
- temporary files
- large generated files

Commit message format:

```text
type: short description
```

Allowed types:

- feat
- fix
- docs
- refactor
- test
- chore
- security

Examples:

```bash
git commit -m "feat: add ticket status filtering"
git commit -m "fix: validate ticket priority input"
git commit -m "docs: add Ubuntu deployment guide"
```

## Push rules

Before pushing:

```bash
git status -sb
git log --oneline -5
```

Push only if:

- The intended work is complete
- The working tree is clean
- Relevant checks passed
- Code review is complete
- No secrets are included
- The branch is correct

Push:

```bash
git push
```

If push is rejected because remote changed:

```bash
git fetch --all --prune
git pull --rebase
```

Resolve conflicts carefully, rerun checks, then push again.

Never force push unless the user explicitly asks.

## Final response

At the end, always report:

- What changed
- What files were changed
- What checks were run
- Whether code review was performed
- Whether commit was created
- Whether push succeeded
- Any remaining risks or TODOs
