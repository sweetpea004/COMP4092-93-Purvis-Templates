import { useContext } from "react";

import Modal from "./UI/Modal";
import CartContext from "../store/CartContent";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../store/UserProgressContext";
import Button from "./UI/Button";
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
        <Modal 
            className="cart" 
            onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} 
            open={userProgressCtx.progress === 'cart'}
        >
            <h2>Your Cart</h2>
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
                <Button className="text-button" onClick={handleCloseCart}>Close</Button>
                {cartCtx.items.length > 0 && 
                    <Button className="fake-button" onClick={handleOpenCheckout}>Go to Checkout</Button>
                }
            </p>
        </Modal>
    );
}