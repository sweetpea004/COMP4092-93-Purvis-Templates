# Food Order Site Documentation

## Accessibility Requirements

| ID | Requirement | Description |
| -- | ----------- | ----------- | 
| Req01 | Perceivable | Information and user interface components SHALL be presentable to users in ways they can perceive (e.g., text alternatives for non-text content). |
| Req02 | Operable | User interface components and navigation SHALL be operable (e.g., keyboard accessible, enough time provided). |
| Req03 | Understandable | Information and the operation of the user interface must be understandable (e.g., readable and predictable text). |
| Req04 | Robust | Content must be robust enough to be interpreted reliably by a wide variety of user agents, including assistive technologies. | 
| Req05 | Conformance Level | The codebase SHALL have level A and AA conformance |

Req05 targets [WCAG 2.2](https://www.w3.org/TR/WCAG22/) Level A and Level AA. Level AA includes every Level A criterion. Level AAA is out of scope, including the WCAG 2.2 AAA additions 2.4.12 Focus Not Obscured (Enhanced), 2.4.13 Focus Appearance, and 3.3.9 Accessible Authentication (Enhanced). Success criterion 4.1.1 Parsing was removed in WCAG 2.2 and is not part of this outline.

The claim covers the Accessible food-order UI: the meal list, the cart dialog, and the checkout dialog. Comments in the source use the same criterion numbers.

- **Meets** means the UI satisfies the criterion as written. 
- **Not applicable** means this UI has none of the content or interaction the criterion covers. 
- **Not met** means the criterion applies and the UI does not satisfy it yet.

### Perceivable (Req01)

| Criterion | Level | Result | Where this UI addresses it |
| --------- | ----- | ------ | -------------------------- |
| 1.1.1 Non-text Content | A | Meets | `Header.jsx` gives the logo a text alternative. `Meal.jsx` uses the meal name as the image alternative. |
| 1.2.1 Audio-only and Video-only (Prerecorded) | A | Not applicable | No audio or video. |
| 1.2.2 Captions (Prerecorded) | A | Not applicable | No prerecorded synchronised media. |
| 1.2.3 Audio Description or Media Alternative (Prerecorded) | A | Not applicable | No prerecorded video. |
| 1.2.4 Captions (Live) | AA | Not applicable | No live audio. |
| 1.2.5 Audio Description (Prerecorded) | AA | Not applicable | No prerecorded video. |
| 1.3.1 Info and Relationships | A | Meets | `index.html` and `App.jsx` expose `header`, `nav`, and `main`. Meals and cart lines are lists. Meal names are `h3` headings inside `article`. `Input.jsx` binds each label with `htmlFor` and `id`. |
| 1.3.2 Meaningful Sequence | A | Meets | DOM order follows the visual order: header, meal list, then dialogs. There is no positive `tabIndex`. |
| 1.3.3 Sensory Characteristics | A | Meets | Instructions name the control ("Add to Cart", "Go to Checkout") and do not rely on shape, colour, or position alone. |
| 1.3.4 Orientation | AA | Meets | `index.html` does not lock orientation, and the layout is not restricted to one orientation. |
| 1.3.5 Identify Input Purpose | AA | Meets | `Checkout.jsx` sets `autocomplete` on each user field: `name`, `email`, `address-line1` (street), `postal-code`, and `address-level2` (city). `Input.jsx` passes that attribute through to the input. |
| 1.4.1 Use of Color | A | Meets | Price, errors, and actions are conveyed with text. Colour reinforces that text. Hover styles change colour on controls that already have a text label. |
| 1.4.2 Audio Control | A | Not applicable | No audio that plays automatically. |
| 1.4.3 Contrast (Minimum) | AA | Meets | `index.css` token pairs used for text are above 4.5:1. The lowest text pair in use is white `#ffffff` on delivery red `#c4161c` at 6.0:1. Body ink `#14281c` on the page, card, and modal backgrounds is 13.6:1–15.6:1. |
| 1.4.4 Resize Text | AA | Meets | The viewport allows zoom. Type is sized in `rem` from the browser default, so text can scale to 200%. |
| 1.4.5 Images of Text | AA | Meets | The site name and meal information are HTML text. The logo is a logo, which this criterion allows. |
| 1.4.10 Reflow | AA | Meets | `#meals` uses `minmax(min(20rem, 100%), 1fr)`, so a column shrinks to the grid at a 320px-wide viewport. |
| 1.4.11 Non-text Contrast | AA | Meets | Author-drawn UI boundaries are above 3:1: the field border `#3d5648` on the modal is 7.9:1, the red button on the page background is 5.5:1, and the quantity control on the modal is 6.5:1. Focus styling is left to the user agent (see 2.4.7). |
| 1.4.12 Text Spacing | AA | Meets | Text containers grow with their content. `overflow: hidden` on `.meal-item` clips the rounded image corners; it does not set a fixed text height. |
| 1.4.13 Content on Hover or Focus | AA | Not applicable | Hover and focus change colour and show the user-agent focus ring. They do not reveal extra content. |

### Operable (Req02)

| Criterion | Level | Result | Where this UI addresses it |
| --------- | ----- | ------ | -------------------------- |
| 2.1.1 Keyboard | A | Meets | Actions are native `button` and `input` elements (`Button.jsx`, `Input.jsx`, `CartItem.jsx`). `Modal.jsx` opens with `showModal()`, which is keyboard-operable. |
| 2.1.2 No Keyboard Trap | A | Meets | `showModal()` keeps focus inside the open dialog. Escape fires the dialog `close` event, and `onClose` returns the user to the page. |
| 2.1.4 Character Key Shortcuts | A | Not applicable | No single-character shortcut keys. |
| 2.2.1 Timing Adjustable | A | Not applicable | No time limit on reading or completing the order. |
| 2.2.2 Pause, Stop, Hide | A | Meets | The only motion is the dialog entrance in `index.css` (`fade-slide-up`, 0.3s). It is shorter than five seconds and is not blinking or auto-updating. |
| 2.3.1 Three Flashes or Below Threshold | A | Meets | Nothing flashes. |
| 2.4.1 Bypass Blocks | A | Not applicable | This is a single view. The criterion applies to blocks repeated across multiple pages. `header`, `nav`, and `main` are still present for users who navigate by landmark. |
| 2.4.2 Page Titled | A | Meets | `index.html` titles the page "React FoodOrder". |
| 2.4.3 Focus Order | A | Meets | Tab order follows DOM order. Opening a dialog moves focus into it. Checkout moves focus to the Checkout, Confirm Order, or Success heading when that step is shown. Closing the dialog returns focus to the page. |
| 2.4.4 Link Purpose (In Context) | A | Not applicable | The UI has no links. Actions are buttons whose text states the action. |
| 2.4.5 Multiple Ways | AA | Not applicable | There is one page. Checkout is a step in a process, which this criterion excepts. |
| 2.4.6 Headings and Labels | AA | Meets | The page has one `h1` ("Food Order"). Dialogs use `h2` ("Your Cart", "Checkout", "Confirm Order", "Success!") and errors use `h2` for the error title. Meal names are `h3`. Form labels name each field. Quantity buttons are named "+" and "-" beside the item name and count. |
| 2.4.7 Focus Visible | AA | Meets | `index.css` does not remove outlines. Keyboard focus uses the browser's focus indicator. |
| 2.4.11 Focus Not Obscured (Minimum) | AA | Meets | The header is in normal flow, not fixed or sticky, so it does not cover a focused control. An open dialog is in the top layer and focus is inside that dialog. |
| 2.5.1 Pointer Gestures | A | Not applicable | Every action is a single click or tap. |
| 2.5.2 Pointer Cancellation | A | Meets | Activation uses `click`, which completes on release, so the user can move the pointer away to cancel. |
| 2.5.3 Label in Name | A | Meets | For buttons and inputs, the accessible name contains the visible label, including the cart count in the header button. |
| 2.5.4 Motion Actuation | A | Not applicable | No function depends on device motion or shaking. |
| 2.5.7 Dragging Movements | AA | Not applicable | No dragging. Added in WCAG 2.2. |
| 2.5.8 Target Size (Minimum) | AA | Meets | `.cart-item-actions button` is `1.5rem` by `1.5rem` (24 by 24 CSS pixels at the default root font size), with a `1rem` gap. Text and filled buttons are larger. Added in WCAG 2.2. |

### Understandable (Req03)

| Criterion | Level | Result | Where this UI addresses it |
| --------- | ----- | ------ | -------------------------- |
| 3.1.1 Language of Page | A | Meets | `index.html` sets `lang="en"`. |
| 3.1.2 Language of Parts | AA | Not applicable | Visible copy is English, matching the page language. |
| 3.2.1 On Focus | A | Meets | Focusing a control does not open a dialog, submit the form, or change context. |
| 3.2.2 On Input | A | Meets | Changing a checkout field does not submit the order. Submit Order opens the confirmation. The purchase is sent from Confirm Order (`Checkout.jsx`). |
| 3.2.3 Consistent Navigation | AA | Not applicable | One page, so navigation is not repeated across a set of pages. The cart control stays in the header. |
| 3.2.4 Consistent Identification | AA | Meets | The same action uses the same label: "Add to Cart" on every meal, "Close" on both dialogs, and "+" / "-" for quantity. |
| 3.2.6 Consistent Help | A | Not applicable | No help mechanism is offered. Added in WCAG 2.2. If help is added later, it needs the same relative order on every page. |
| 3.3.1 Error Identification | A | Meets | Empty fields and invalid email use native constraint validation on the labelled control (`required`, `type="email"`). Failed requests render `Error` with a title and a message in text. |
| 3.3.2 Labels or Instructions | A | Meets | Every checkout field has a visible label. Required fields use the `required` attribute. |
| 3.3.3 Error Suggestion | AA | Meets | Format errors for email are reported by the browser's constraint validation, which states the expected form of the value. |
| 3.3.4 Error Prevention (Legal, Financial, Data) | AA | Meets | The order is a purchase. Submit Order shows the cart, total, and customer details. Confirm Order sends them. Go Back returns to the same form if a detail is wrong. |
| 3.3.7 Redundant Entry | A | Meets | Each checkout fact is requested once. The checkout form stays mounted, so Go Back shows the values already entered. Added in WCAG 2.2. |
| 3.3.8 Accessible Authentication (Minimum) | AA | Not applicable | There is no login or other cognitive test. Added in WCAG 2.2. |

### Robust (Req04)

| Criterion | Level | Result | Where this UI addresses it |
| --------- | ----- | ------ | -------------------------- |
| 4.1.2 Name, Role, Value | A | Meets | Buttons and inputs use native elements, so role and value come from the browser and each input's name comes from its label. `Modal.jsx` sets `aria-labelledby`. Cart, checkout, confirmation, and success each point that attribute at their `h2`. |
| 4.1.3 Status Messages | AA | Meets | "Fetching meals..." and "Sending order data..." use `<output>`. These messages are announced without moving focus. |
