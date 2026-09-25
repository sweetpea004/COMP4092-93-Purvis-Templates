import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import CartContext from "../store/CartContent";

export default function Meal({ meal }) {
    const cartCtx = useContext(CartContext);

    function handleAddMealToCart() {
        cartCtx.addItem(meal);
    }

    return (
        <li className="meal-item">
            <div>
                <img src={`http://localhost:3000/${meal.image}`} tabIndex={2} />
                <div>
                    <h3>{meal.name}</h3>
                    <div className="meal-item-price">{currencyFormatter.format(meal.price)}</div>
                    <div className="meal-item-description">{meal.description}</div>
                </div>
                <div className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add</Button>
                    <Button onClick={handleAddMealToCart}>+</Button>
                </div>
            </div>
        </li>
    );
}