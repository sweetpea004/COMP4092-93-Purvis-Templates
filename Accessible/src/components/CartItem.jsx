import { currencyFormatter } from "../util/formatting"

export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {

    /*
     * WCAG 2.2 2.1.1 Keyboard (A), 2.5.3 Label in Name (A), 4.1.2 Name, Role, Value (A):
     * quantity changes are buttons named with the visible "+" and "-".
     * 2.5.8 Target Size (Minimum) (AA): the 24px hit area is set on
     * .cart-item-actions button in index.css.
     */
    return <li className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}