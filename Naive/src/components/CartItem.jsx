import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button";

export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {

    return <div className="cart-item">
        <p>
            {name} - {quantity} x {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            <Button className="qty-hit" onClick={onDecrease} overrideDefaultCSS={true}>-</Button>
            <span>{quantity}</span>
            <Button className="qty-hit" onClick={onIncrease} overrideDefaultCSS={true}>+</Button>
        </p>
    </div>
}