/*
 * WCAG 2.2 3.3.1 Error Identification (A) and 1.4.1 Use of Color (A): the error
 * is a heading plus a text message, not colour alone.
 * 4.1.3 Status Messages (AA): role="alert" announces the error without moving focus.
 */
export default function Error({title, message}) {
    return <div className="error" role="alert">
        <h2>{title}</h2>
        <p>{message}</p>
    </div>
}