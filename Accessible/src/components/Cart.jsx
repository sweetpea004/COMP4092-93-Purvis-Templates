import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContent";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce(
        (totalPrice, item) => totalPrice + item.quantity * item.price, 
        0
    );

    function handleCloseCart() {
        userProgressCtx.hideCart();
    }

    function handleOpenCheckout() {
        userProgressCtx.showCheckout();
    }

    return (
        /*
         * WCAG 2.2 2.4.6 Headings and Labels (AA): the dialog content is headed
         * "Your Cart". Close and Go to Checkout name their actions (2.5.3, A).
         * 1.3.1 Info and Relationships (A): line items are a list.
         */
        <Modal 
            className="cart" 
            labelledBy="cart-title"
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} 
            open={userProgressCtx.progress === 'cart'}
        >
            <h2 id="cart-title">Your Cart</h2>
            <ul>
                {cartCtx.items.map((item) => 
                    <CartItem 
                        key={item.id} 
                        {...item} 
                        onIncrease={() => cartCtx.addItem(item)} 
                        onDecrease={() => cartCtx.removeItem(item.id)}/>
                )}
            </ul>
            <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
            <p className="modal-actions">
                <Button textOnly onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && 
                    <Button onClick={handleOpenCheckout}>Go to Checkout</Button>
                }
            </p>
        </Modal>
    );
}