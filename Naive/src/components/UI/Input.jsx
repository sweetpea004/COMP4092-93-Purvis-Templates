
export default function Input({label, id, ...props}) {

    return <p className="control">
        <label>{label}</label>
        <input name={id} placeholder={label} tabIndex={-1} required {...props}/>
    </p>
}