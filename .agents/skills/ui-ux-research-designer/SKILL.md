---
name: ui-ux-research-designer
description: Research, plan, and critique UI/UX before any frontend design or redesign. Use for layouts, dashboards, forms, navigation, visual hierarchy, flows, design systems, accessibility, empty/loading/error states, and when the user asks for professional or top-notch design. Always use before implementing frontend UI for this project.
---

# UI/UX Research Designer

This is the most important design skill for the project. It exists to stop generic, rushed, AI-looking UI and force a professional product-design process before coding.

## Default direction

- Dark theme by default.
- Professional IT-support/admin-dashboard aesthetic.
- Clean, calm, high-contrast, structured, modern.
- Looks like a real internal tool/SaaS dashboard, not a school website.
- Prioritize usability over flashy visuals.

## Research requirement

Before designing or redesigning UI:

1. Research or inspect professional references when web/search is available.
   - Look for admin dashboards, helpdesk portals, ticket systems, ITSM tools, status pages, and SaaS internal tools.
   - Use references for patterns only: layout, density, navigation, tables, filters, empty states, cards, hierarchy.
   - Do not copy branding, proprietary UI, icons, text, screenshots, or exact layouts.
2. If web/search is unavailable, inspect local screenshots, existing app files, README, and common SaaS/admin-dashboard patterns.
3. State the design direction before implementation:
   - target user
   - page purpose
   - primary action
   - information hierarchy
   - layout pattern
   - states required
   - accessibility concerns

## Deep planning checklist

Before making UI code, answer these internally or in a short plan:

### User and task
- Who is the user? Employee, IT technician, admin, teacher/sensor?
- What is the fastest path to their goal?
- What should be visible without scrolling?
- What decision does the user need to make on this screen?

### Information architecture
- Is navigation obvious?
- Are pages grouped logically?
- Is the current page/location clear?
- Are labels Norwegian and understandable for a 17-18-year-old exam context?

### Visual hierarchy
- One clear H1 per page.
- One primary action per view.
- Use scale, spacing, contrast, and grouping to show importance.
- Avoid everything having the same visual weight.

### Interaction states
Every interactive component must have:
- default
- hover
- focus-visible
- active/pressed where useful
- disabled
- loading if async
- success/error feedback if user action changes data

### Data states
Every data-heavy screen must include:
- loading state, preferably skeletons for tables/cards
- empty state with explanation and next action
- error state with recovery action
- filtered-no-results state
- partial data state if some API calls fail

### Accessibility
- Keyboard navigation must work.
- Focus indicators must be visible.
- Form fields must have labels, not placeholder-only labels.
- Error messages must explain how to fix the issue.
- Color cannot be the only indicator of status.
- Respect reduced motion when animations are used.

## Dashboard-specific guidance

For the ticket/admin dashboard, prefer:

- left sidebar for main navigation
- topbar with page title and search/action area
- KPI cards at top, but not too many
- filter row above table/list
- table/list with strong row readability
- status and priority badges
- right-side detail drawer or dedicated detail page
- activity timeline for ticket history
- quick actions near the ticket detail, not hidden randomly

## Form-specific guidance

For ticket creation forms:

- Put the form inside a focused card/max-width container.
- Group related fields.
- Explain priority/categories simply.
- Validate inline and on submit.
- Preserve user input after errors.
- Show a clear confirmation after success.
- Avoid asking for fields that are not used.

## Output before coding

For substantial UI tasks, provide this first:

```txt
UX-plan:
- Bruker:
- Mål:
- Primær handling:
- Layout:
- Referanse-mønstre:
- Komponenter:
- States:
- Accessibility:
- Risiko:
```

Then implement.

## Review rubric

A UI is not done until it passes:

- Purpose is obvious within 5 seconds.
- Primary action is obvious.
- Layout works at desktop and laptop sizes; mobile is acceptable if relevant.
- Loading, empty, error, and success states exist.
- Text has readable contrast.
- Keyboard focus is visible.
- It looks cohesive: spacing, radius, typography, borders, colors, icons.
- It can be explained to sensor as a professional support system.

## Done output

End with:

```txt
UX-resultat: <what improved>
Designvalg: <why this layout/theme/components>
States dekket: <loading/empty/error/success/etc.>
Accessibility: <checks done>
```
