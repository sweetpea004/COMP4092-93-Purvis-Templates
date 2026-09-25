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
        <header id="main-header">
            <div id="title">
                <img src={logoImg} tabIndex={1} />
                <div className="site-title">Food Order</div>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>
                    <span aria-hidden="true">Cart ({totalCartItems})</span>
                </Button>
                <Button textOnly onClick={handleShowCart}>+</Button>
            </nav>
        </header>
    );
}