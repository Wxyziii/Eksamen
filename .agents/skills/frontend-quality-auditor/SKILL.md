---
name: frontend-quality-auditor
description: Audit existing frontend UI for UX, accessibility, visual design, responsiveness, state handling, forms, tables, and dashboard quality. Use when reviewing a page, checking if UI is professional, improving before exam, or before calling a frontend task done.
---

# Frontend Quality Auditor

Use this skill after building UI or when the user asks if the design is good enough.

## Audit order

1. Understand the user goal and page purpose.
2. Inspect rendered UI or source files.
3. Compare against professional dashboard/product UI patterns.
4. Check accessibility and interaction states.
5. Produce prioritized findings.
6. Fix critical issues if asked or if already in implementation mode.

## Audit rubric

Score each section from 1-5:

### UX clarity
- Page purpose clear?
- Primary action clear?
- Navigation obvious?
- Important info visible early?

### Visual design
- Consistent spacing?
- Clear hierarchy?
- Good contrast?
- Dark theme cohesive?
- Components look related?

### Interaction quality
- Hover/focus/disabled states?
- Loading/empty/error/success states?
- Errors explain recovery?
- Async actions do not feel frozen?

### Accessibility
- Semantic HTML?
- Labels on fields?
- Keyboard focus visible?
- Color not the only status signal?
- Motion not excessive?

### Responsiveness
- Works on laptop width?
- Sidebar/table does not break?
- Forms remain usable?
- Content does not overflow horizontally unnecessarily?

### Code quality
- No duplicated giant CSS where tokens/components should exist?
- No unsafe `innerHTML` for user content?
- API logic separated enough from UI?
- No hidden hardcoded data when real API exists?

## Output format

```txt
Frontend audit:
Score: <x>/30
Critical fixes:
1. file:line — issue — fix
Important improvements:
1. file:line — issue — fix
Polish:
1. file:line — issue — fix
Exam impact:
<what sensor will notice>
```

When fixing, run the relevant tests/checks after changes.
