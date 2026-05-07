---
name: cpp-log-diagnostics
description: Build, improve, test, or explain a C++ log analyzer/diagnostics tool for the exam project. Use for Apache logs, system logs, status-code analysis, error counting, CLI tools, reports, and showing extra technical depth in Utvikling + Driftstøtte.
---

# C++ Log Diagnostics

This is optional extra depth. Keep it useful and demonstrable.

## Goal

Create a CLI tool that analyzes logs and gives a short operational summary.

Minimum:

- Read a log file line by line.
- Count total lines.
- Count HTTP status codes.
- Count 4xx and 5xx errors.
- Print a clear report.

Strong extension:

- Count top IPs.
- Count top requested paths.
- Filter by status code or date text.
- Export report to `.txt` or `.json`.
- Exit with non-zero code if critical threshold is exceeded.

## Code quality rules

- C++17 or newer.
- No hardcoded log path unless it is a default with CLI override.
- Gracefully handle missing files.
- Avoid crashing on malformed lines.
- Keep parsing logic separated from output logic.
- Include test log file.

## Example CLI

```bash
./logdiag /var/log/apache2/access.log
./logdiag --file access.log --status 500
./logdiag --file access.log --export report.txt
```

## Build

```bash
g++ -std=c++17 -Wall -Wextra -O2 -o logdiag src/main.cpp
```

Prefer a Makefile or CMake if the repo already uses it.

## Test cases

- Valid Apache log.
- Empty file.
- Missing file.
- Malformed lines.
- Log with 404/500 statuses.
- Large-ish file if available.

## Exam explanation

> “Jeg lagde et C++-verktøy som analyserer Apache-logger. Det hjelper drift fordi jeg raskt kan se om mange brukere får 404 eller 500-feil. Det viser også Utvikling fordi jeg har jobbet med filhåndtering, parsing, datastrukturer og feilhåndtering.”

## Done output

```txt
C++-resultat: <what changed>
Build: <command/result>
Tester: <cases/result>
Driftsverdi: <how it helps troubleshooting>
```
