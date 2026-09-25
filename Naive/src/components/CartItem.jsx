import { currencyFormatter } from "../util/formatting"

export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {

    return <div className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <button className="qty-hit" onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button className="qty-hit" onClick={onIncrease}>+</button>
        </p>
    </div>
}