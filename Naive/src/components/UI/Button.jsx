
export default function Button( {children, textOnly, className, ...props }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    cssClasses += ' ' + className;

    return <span {...props} className={cssClasses}>{children}</span>
}