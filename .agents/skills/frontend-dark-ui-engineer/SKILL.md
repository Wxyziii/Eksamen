---
name: frontend-dark-ui-engineer
description: Build or redesign frontend UI with dark theme, polished dashboard UX, responsive layout, accessible components, robust API states, and non-generic visual quality. Use for HTML/CSS/JS, React, Tailwind, component systems, forms, tables, filters, modals, drawers, dashboards, and all frontend work in the exam project.
---

# Frontend Dark UI Engineer

Build frontend that looks like a real, professional IT support product. This skill is implementation-focused; pair it with `ui-ux-research-designer` for planning.

## Hard rules

- Dark theme is mandatory unless the user explicitly asks for light theme.
- Never ship a UI with only the happy path.
- Never use placeholder-only labels for forms.
- Never render user input with unsafe raw HTML.
- Never finish without running or explaining tests/checks.
- Do not create a generic purple/blue AI-looking dashboard. Use deliberate design tokens.

## Default dark design system

Use or adapt these tokens unless the repo already has a better design system:

```css
:root {
  color-scheme: dark;

  --bg: #070b12;
  --bg-soft: #0b1220;
  --surface: #101827;
  --surface-2: #141f33;
  --surface-3: #1b2942;
  --border: rgba(148, 163, 184, 0.16);
  --border-strong: rgba(148, 163, 184, 0.28);

  --text: #f8fafc;
  --text-soft: #cbd5e1;
  --text-muted: #94a3b8;

  --brand: #38bdf8;
  --brand-strong: #0ea5e9;
  --brand-soft: rgba(56, 189, 248, 0.14);

  --success: #22c55e;
  --success-soft: rgba(34, 197, 94, 0.14);
  --warning: #f59e0b;
  --warning-soft: rgba(245, 158, 11, 0.14);
  --danger: #ef4444;
  --danger-soft: rgba(239, 68, 68, 0.14);
  --info: #60a5fa;
  --info-soft: rgba(96, 165, 250, 0.14);

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 18px;
  --shadow-soft: 0 18px 60px rgba(0, 0, 0, 0.28);
}
```

## Layout standards

For an IT support dashboard:

```txt
┌──────────────────────────────────────────────────────────────┐
│ Sidebar │ Topbar: title/search/action                        │
│         ├────────────────────────────────────────────────────│
│         │ KPI cards                                          │
│         │ Filter toolbar                                     │
│         │ Ticket table/list             │ Detail drawer       │
└──────────────────────────────────────────────────────────────┘
```

Rules:
- Main content max width should feel intentional, not stretched randomly.
- Use 8px spacing system: 4, 8, 12, 16, 24, 32, 48.
- Use cards for grouping, not for every tiny item.
- Tables need sticky-ish header if practical, clear row hover, badges, and readable density.
- Do not use full heavy borders everywhere; use subtle borders and surfaces.
- Use icons only when they clarify meaning.

## Components that must be production-like

### Buttons
- Primary, secondary, ghost, danger variants.
- `:focus-visible` ring.
- Disabled state.
- Loading state for async actions.

### Forms
- Label, help text, error text.
- Inline validation where useful.
- Submit validation always.
- Preserve typed values after failed submit.
- Use semantic `form`, `label`, `input`, `textarea`, `select`, `button`.

### Tables/lists
- Loading skeleton or row placeholders.
- Empty state.
- Error state.
- No-results state for filters/search.
- Row action or detail open behavior.
- Status and priority badge styling.

### Drawers/modals
- Close button.
- Escape key if JS framework supports it.
- Focus handling where practical.
- Do not hide important actions outside the drawer.

## API integration standards

For every fetch/API call:

```txt
idle -> loading -> success | empty | error
```

- Show loading feedback immediately.
- Catch network errors.
- Show user-friendly Norwegian error messages.
- Avoid stale UI after update; re-fetch or update local state predictably.
- Handle non-2xx responses.
- Do not expose raw stack traces to users.

## File organization

For vanilla frontend:

```txt
public/
├── index.html
├── admin.html
├── assets/
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── pages.css
└── js/
    ├── api.js
    ├── state.js
    ├── tickets.js
    └── ui.js
```

For React/Tailwind:

```txt
src/
├── app/
├── components/
│   ├── ui/
│   ├── tickets/
│   └── layout/
├── lib/
│   ├── api.ts
│   └── validators.ts
├── styles/
└── tests/
```

Preserve existing structure if already established.

## Testing before done

Minimum checks:

- App starts without console/build errors.
- Main page renders.
- Form can submit valid data.
- Invalid form shows errors.
- Table/list loads data.
- Filters/search work.
- Update action works.
- Network/API failure shows error state.
- Keyboard tab order is not broken.

Use available commands: `npm test`, `npm run lint`, `npm run build`, Playwright, or manual browser testing. If unavailable, state exactly what was manually checked.

## Done output

```txt
Frontend-resultat: <what changed>
Designsystem: <tokens/components used>
UX-states: <loading/empty/error/success/no-results>
Responsivitet: <what was checked>
Tester: <commands/manual checks>
```
