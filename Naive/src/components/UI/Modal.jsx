import { createPortal } from "react-dom"

export default function Modal({ children, open, className = '', onClose }) {
    function handleBackdropClick(event) {
        if (event.target === event.currentTarget && onClose) {
            onClose();
        }
    }

    return createPortal(
        <div
            className={`modal-backdrop${open ? ' open' : ''}`}
            aria-hidden="true"
            onClick={handleBackdropClick}
        >
            <div className={`modal ${className}`}>
                {children}
            </div>
        </div>,
        document.getElementById('modal')
    );
}
