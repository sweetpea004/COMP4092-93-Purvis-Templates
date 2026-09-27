/*
 * WCAG 2.2 2.1.1 Keyboard (A) and 4.1.2 Name, Role, Value (A): a native button.
 * The browser supplies the role, keyboard support, and the accessible name from
 * the visible children (2.5.3 Label in Name, A). Activation is on click, which
 * completes on pointer release (2.5.2 Pointer Cancellation, A).
 */
export default function Button( {children, textOnly, className, ...props }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return <button {...props} className={cssClasses}>{children}</button>
}