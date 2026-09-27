import { useContext } from 'react';
import logoImg from '../assets/logo.jpg';
import Button from './UI/Button';
import CartContext from '../store/CartContent';
import UserProgressContext from '../store/UserProgressContext';

export default function Header() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity;
    }, 0);

    function handleShowCart() {
        userProgressCtx.showCart();
    }

    return (
        /*
         * WCAG 2.2 1.1.1 Non-text Content (A): the logo image has a text alternative.
         * 1.3.1 Info and Relationships (A): header and nav landmarks, with one h1.
         * 2.4.6 Headings and Labels (AA): the h1 names the page.
         * 2.5.3 Label in Name (A) and 4.1.2 Name, Role, Value (A): the cart control is a
         * button whose accessible name is the visible text, including the item count.
         */
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt="A restaurant logo" />
                <h1>Food Order</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    );
}