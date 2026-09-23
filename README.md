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

## Credits

Base React app Food Ordering Webapp and assets from [React - The Complete Guide (incl. Next.js, Redux) Udemy Course](https://www.udemy.com/course/react-the-complete-guide-incl-redux/) by [Academind](https://www.udemy.com/user/academind/) [Maximilian Schwarzmüller](https://www.udemy.com/user/maximilian-schwarzmuller/)
- This includes functionality and user interactions with page elements.
- It has been modified to be more or less Accessible for testing purposes
