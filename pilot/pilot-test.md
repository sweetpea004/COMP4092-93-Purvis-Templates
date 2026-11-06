# Pilot

| Folder | Condition | Prompt | Site inside the folder |
| --- | --- | --- | --- |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKA` | A | Naive | Naive food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKB` | B | Naive | Compliant food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKC` | C | Aware | Naive food-order app |
| `C:\Users\Computer\Documents\fo-runs\1mc01GRKD` | D | Aware | Compliant food-order app |

Generate components in order: A, then B, then C, then D. Each folder is only either the Naive or Compliant app with no git history, no test scanners, and no README. 
- The compliant folders still contain the WCAG comments and `documentation.md`, because that documentation is part of the compliant site.

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

Before test scores for Baseline templates:
- Naive: eslint = 6, axe = 392, pa11y = 924, therefore total = 1,322
- Accessible: eslint = 0, axe = 0, pa11y = 0, therefore total = 0

| Condition | Folder | M1 ESLint | M2 axe / pa11y | M3 highest impact | M4 keyboard | M5 Narrator | M6 net change | M7 Instances of Errors | Other files the agent edited |
| --- | ------ | --- | --- | --- | --- | --- | --- | --- | --- |
| A | 1mc01GRKA | 6 | 402 / 952 | Critical | X | X | +38 | Colour Contrast, Keyboard controls, Screen Reading | App.jsx and index.css |
| B | 1mc01GRKB | 0 | 0 / 8 | Serious | ✓ | ✓ | +8 | Colour Contrast | App.jsx and index.css |
| C | 1mc01GRKC | 0 | 28 / 53 | Serious | X | X | -1,241 | Colour Contrast, Keyboard Controls, Screen Reading | App.jsx, useHTTPS.js, Meals.jsx, Meal.jsx, Header.jsx |
| D | 1mc01GRKD | 0 | 0 / 22 | Serious | ✓ | ✓ | +22 | Colour Contrast | App.js, index.css, documentation.md |

### Notes: 
- narrator completely skipped the main content every time I tried to get it to read it on Condition A (would read individual orders though)
- For Condition B, interesting that despite the naive prompt, it specified that it stuck to hieriachal heading WCAG requirements (LLM Output: "Headings are h2 elements, so the page still has a single h1 in the header. The meals remain a list under the new section.")
- Condition C resulted in other unrelated changes to the site to make it more accessible as expected:
    - The heading order is one h1, then section h2s, then each meal as an h3 inside a list.
    - A “Skip to main content” link is the first stop on the keyboard and moves focus to the main region. “Browse available meals” moves focus to the menu.
    - Meal photos have alternative text. The restaurant illustration is described by its caption.
    - Add-to-cart controls are real buttons, at least 44 pixels tall, named for the dish. After a click, a status message confirms the item and quantity.
    - Text, prices, buttons, and focus outlines meet WCAG 2.2 AA contrast. The page can be zoomed, and the menu reflows to one column on a narrow screen.
- Condition C:
    - heavily relied on modifying tabIndex (although it did remove some). This is not recommended as it can cause more errors when changing the order of elements.
    - Attempted to re-enable zoom
    - Fixed Contrast issues in main content but practically ignored all other components by adding a completely separate css file instead of editing existing (while it fixes errors it creates added architectural issues).
    - Compared to the outputs of the naive prompt, this condition results in a lot of extra information being added including location, service times etc in the main content. This is a great example of better accessibility within the content itself.
- Changes made under Condition D:
    - The introduction and the meals block are section elements named with aria-labelledby, so each one is a region.
    - Heading order stays h1, then h2, then each meal's h3.
    - Links are native anchors, underlined, and at least 24 pixels tall. Skip targets use tabIndex={-1}, so they are not extra tab stops.
    - "Skip to main content" is the first control and moves focus to main.
    - This component has no images. Meal photos keep the meal name as their text alternative.
    - Updates Documentation
- Condition C ended up having better Add to cart buttons (Having the meal name with the button) than Condition D? Interesting.

### Things to improve in experiment:
  - Accessible template add to cart buttons fails narrator in my opinion. They announce what they are correctly but they should indicate what item would be added if a user were to interact with it. In terms of this pilot I scored based on its ability to narrarate the added component (The main content).
  - The gradient background on the Accessible template, while nice, makes it really hard to test colour contrast ratios properly (false positive errors on pa11y)
  - When automating the process, I want to scan the json files in order to get a list of all the error types (or even the WCAG code) to add to the list in M7