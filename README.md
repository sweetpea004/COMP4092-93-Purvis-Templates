# COMP4092 and COMP4093 Thesis

## EVALUATION OF WCAG 2.2 CONFORMANCE IN AI-GENERATED FRONT-END CODE: Measuring the effects of prompt intent and contextual code quality

### Student: Emma Persephone Purvis (Bachelor of Software Engineering)
### Supervisor/s: Dr Ansgar Fehnker
### Macquarie University

## Running Automated Testing

Run these commands from the repository root. Each command takes the site to evaluate: `Accessible` or `Naive`.

The scanners live in `testing/` and are not part of either site. `Accessible` and `Naive` only contain the food-order app and what it needs to run.

Install the harness once, from the root:

```
npm install
```

### Dynamic Runtime DOM Scanners:

#### pa11y

Uses axe and HTML_CodeSniffer.

Starts the chosen site and its backend, runs pa11y, then shuts both down:

```
npm run test:pa11y -- Accessible
```

Runs pa11y when that site is already running on port 5173, with the backend on port 3000:

```
npm run pa11y -- Accessible
```

Write the report as JSON. Add `--silent` so npm's own banners stay out of the file:

```
npm run test:pa11y:json -- Naive --silent > pa11y-results.json
```

#### axe-core

Starts the chosen site and its backend, runs axe-core, then shuts both down:

```
npm run test:axe -- Naive
```

Runs axe-core when that site is already running:

```
npm run axe -- Accessible
```

Write the report as JSON:

```
npm run test:axe:json -- Naive --silent > axe-results.json
```

### Static AST Scanner:

#### ESLint

Reports jsx-a11y findings against the chosen site. Nothing is started.

```
npm run lint -- Accessible
```

## Credits & Baseline Codebase Acknowledgments

* **Application Origin:** The front-end application logic, component structure, and state management were implemented by me, following the design pattern and starter backend/assets from the course **["React - The Complete Guide (incl. Next.js, Redux) Udemy Course"](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** by [Academind](https://www.udemy.com/user/academind/) / [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/)
* **License:** Starter code scaffolds and provided assets are used under the terms of the **MIT License**.

### Experimental Modifications for Thesis Research
This web application serves as a standardized benchmark for evaluating Large Language Model (LLM) code generation. For research purposes, the codebase has been adapted into two experimental variants:

1. **Accessibility-Naive Baseline:** Modified to deliberately incorporate common real-world accessibility anti-patterns (e.g., non-semantic interactive elements, missing form label associations, incomplete keyboard interaction models).
2. **Accessibility-Compliant Baseline:** Refactored and fully audited to conform strictly with **WCAG 2.2 Level AA** standards.