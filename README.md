# COMP4092 and COMP4093 Thesis

## EVALUATION OF WCAG 2.2 CONFORMANCE IN AI-GENERATED FRONT-END CODE: Measuring the effects of prompt intent and contextual code quality

### Student: Emma Persephone Purvis (Bachelor of Software Engineering)
### Supervisor/s: Dr Ansgar Fehnker
### Macquarie University

## Running Automated Testing

### Before using any of the following commands, cd into the correct folder:
```
cd Accessible
```
or
```
cd Naive
```

### Dynamic Runtime DOM Scanners:

#### pa11y: 

Uses axe and HTML_CodeSniffer

Starts the backend and the vite server, runs pa11y, shuts down both
```
npm run test:a11y
```

Runs checks with site already running
```
npm run pa11y
```

Report errors in JSON form in terminal (site must be running)
```
npx pa11y-ci --json
```

Report errors in JSON form save to file (site must be running)
```
npx pa11y-ci --json > pa11y-results.json
```

#### axe-core:

Starts the backend and the vite server, runs pa11y, shuts down both
```
npm run test:axe
```

Runs checks with site already running
```
npm run axe
```

Report errors in JSON form in terminal (site must be running)
```
npm run axe:json --silent
```

Report errors in JSON form save to file (site must be running)
```
npm run axe:json --silent > axe-results.json
```

### Static AST Scanner:

#### ESLint:

Report Errors with reference to code base
```
npm run lint
```

## Credits & Baseline Codebase Acknowledgments

* **Application Origin:** The front-end application logic, component structure, and state management were implemented by me, following the design pattern and starter backend/assets from the course **["React - The Complete Guide (incl. Next.js, Redux) Udemy Course"](https://www.udemy.com/course/react-the-complete-guide-incl-redux/)** by [Academind](https://www.udemy.com/user/academind/) / [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/)
* **License:** Starter code scaffolds and provided assets are used under the terms of the **MIT License**.

### Experimental Modifications for Thesis Research
This web application serves as a standardized benchmark for evaluating Large Language Model (LLM) code generation. For research purposes, the codebase has been adapted into two experimental variants:

1. **Accessibility-Naive Baseline:** Modified to deliberately incorporate common real-world accessibility anti-patterns (e.g., non-semantic interactive elements, missing form label associations, incomplete keyboard interaction models).
2. **Accessibility-Compliant Baseline:** Refactored and fully audited to conform strictly with **WCAG 2.2 Level AA** standards.