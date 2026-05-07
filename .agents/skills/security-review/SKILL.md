---
name: security-review
description: Review the exam ticket system and server setup for basic security issues.
---

# Security Review

Use this skill when reviewing code, server setup, or documentation.

## Check code for

- Input validation
- SQL injection
- XSS
- Authentication weaknesses
- Bad error handling
- Unsafe file paths
- Secrets in code
- Hardcoded passwords
- Missing authorization checks
- Insecure dependencies

## Check server setup for

- Firewall rules
- SSH exposure
- File permissions
- Database permissions
- Apache configuration
- Backup security
- Log visibility
- Unnecessary open ports

## Output format

Use this structure:

1. Critical issues
2. Medium issues
3. Low issues
4. Quick fixes before exam
5. What to explain to examiner

## Security rules

Never add:

- Real passwords
- API keys
- Secrets
- Private tokens
- Sensitive personal data

Do not commit:

- .env
- database files with real data
- backup files with secrets
- credentials

## Exam explanation

Always explain security in a simple but professional way.

Connect it to:

- confidentiality
- integrity
- availability
- least privilege
- backup
- logging
- user safety
