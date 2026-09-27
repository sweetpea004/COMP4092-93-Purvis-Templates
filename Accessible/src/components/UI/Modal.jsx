import { useEffect, useRef } from "react";
import { createPortal } from "react-dom"

/*
 * WCAG 2.2 2.1.1 Keyboard (A), 2.1.2 No Keyboard Trap (A), 2.4.3 Focus Order (A),
 * and 2.4.11 Focus Not Obscured (Minimum) (AA): showModal() moves focus into the
 * dialog and keeps it there until Escape or Close. The dialog is in the top layer,
 * so the page does not cover the focused control.
 * 4.1.2 Name, Role, Value (A): labelledBy sets aria-labelledby to the heading
 * id rendered inside the dialog, so the dialog has a programmatic name.
 */
export default function Modal({ children, open, className = '', onClose, labelledBy }) {
    const dialog = useRef();

    useEffect(() => {
        const modal = dialog.current;

        if (open) {
            modal.showModal();
        }

        return () => modal.close();
    }, [open])

    return createPortal(
        <dialog ref={dialog} className={`modal ${className}`} onClose={onClose} aria-labelledby={labelledBy}>
            {children}
        </dialog>, 
        document.getElementById('modal')
    );
}