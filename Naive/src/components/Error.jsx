export default function Error({title, message}) {
    return <div className="error">
        <div className="error-title">{title}</div>
        <div>{message}</div>
    </div>
}