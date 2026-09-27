/*
 * WCAG 2.2 1.3.1 Info and Relationships (A), 3.3.2 Labels or Instructions (A),
 * and 4.1.2 Name, Role, Value (A): htmlFor and id attach the visible label to the input.
 * 3.3.1 Error Identification (A): required lets the browser name an empty field.
 * 1.3.5 Identify Input Purpose (AA): autocomplete is passed through in props.
 * Checkout sets name, email, address-line1, postal-code, and address-level2.
 */
export default function Input({label, id, ...props}) {

    return <p className="control">
        <label htmlFor={id}>{label}</label>
        <input id={id} name={id} required {...props}/>
    </p>
}