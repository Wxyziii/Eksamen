---
name: cpp-log-analyzer
description: Build C++ tools for log analysis, diagnostics, and IT operations support.
---

# C++ Log Analyzer

Use this skill when working on a C++ tool for the exam project.

The tool should support driftstøtte by helping IT staff analyze logs or diagnose server issues.

## Possible features

The tool can:

- Read Apache access logs
- Read Apache error logs
- Count HTTP status codes
- Detect 404 errors
- Detect 500 errors
- Detect failed login attempts if logs contain them
- Count requests per IP
- Export report to TXT or JSON
- Show summary in terminal

## Technical requirements

Use:

- Modern C++17 or C++20
- Simple structure
- Clear function names
- Safe file handling
- Good error messages
- Minimal dependencies

Avoid unnecessary libraries unless they clearly help.

## Build instructions

When writing or changing C++ code, include build instructions.

For CMake:

```bash
cmake -S . -B build
cmake --build build
```

For simple g++:

```bash
g++ -std=c++20 main.cpp -o log-analyzer
```

## Testing

Include test examples:

- Missing log file
- Empty log file
- Normal Apache log
- Log with 404 errors
- Log with 500 errors

## Exam explanation

Always explain:

- What the tool does
- How it helps IT operations
- How it connects to development
- How it connects to driftstøtte
- How it can be demonstrated during exam
