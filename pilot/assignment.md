# Pilot key

This file stays in the thesis repository. The generation chats use only the folders below.

Open each folder on its own, in a new Cursor window and a new chat. Leave `C:\Users\Computer\Documents\fo-runs` closed, because that parent holds every run.

| Folder | Condition | Prompt | Site inside the folder |
| --- | --- | --- | --- |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKA` | A | Naive | Naive food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKB` | B | Naive | Compliant food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKC` | C | Aware | Naive food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKD` | D | Aware | Compliant food-order app |

Order is A, then B, then C, then D. Each folder is a clean app with no git history, no scanner harness, and no README. The compliant folders still contain the WCAG comments and `documentation.md`, because that documentation is part of the compliant site.

The agent’s sampling temperature cannot be set to 0.2, this pilot uses default Cursor sampling.

## Prompt for 1mc01GRKA and 1mc01GRKB

```
Generate an implementation of a main content
component
for presenting the primary content of a food-order page, with a short introduction to the restaurant and a section that introduces the available meals.
The component should be its own JSX file to be inserted into other relevant
components.
```

## Prompt for 1mc01GRKC and 1mc01GRKD

```
Generate an accessible implementation of a main content
for presenting the primary content of a food-order page, with a short introduction to the restaurant and a section that introduces the available meals.
Use the WCAG 2.2 AA accessibility standards and best practices. The component should: (1) be its own JSX file for integration into target templates, (2) utilise semantic HTML, (3) include necessary accessibility features (e.g., ARIA roles, keyboard navigation, alternative text), (4) be styled clearly with CSS, and (5) be populated with realistic content.
```

## Score sheet

Fill this after insertion. Net change is same-day baseline count minus the count after insertion.

| Run | M1 ESLint | M2 axe / pa11y | M3 highest impact | M4 keyboard | M5 Narrator | M6 net change | M7 rules added or removed | Other files the agent edited |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A (1mc01GRKA) |  |  |  |  |  |  |  |  |
| B (1mc01GRKB) |  |  |  |  |  |  |  |  |
| C (1mc01GRKC) |  |  |  |  |  |  |  |  |
| D (1mc01GRKD) |  |  |  |  |  |  |  |  |
