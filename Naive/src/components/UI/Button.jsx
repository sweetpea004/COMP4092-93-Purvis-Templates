
export default function Button( {children, textOnly, className, overrideDefaultCSS, ...props }) {
    let cssClasses = textOnly ? 'text-button' : 'button';
    if (overrideDefaultCSS) {
        cssClasses = className;
    } else {
        cssClasses += ' ' + className;
    }

    return <span {...props} className={cssClasses}>{children}</span>
}