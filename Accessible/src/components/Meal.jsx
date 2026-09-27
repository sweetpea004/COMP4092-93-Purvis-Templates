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
        /*
         * WCAG 2.2 1.1.1 Non-text Content (A): alt text is the meal name.
         * 1.3.1 Info and Relationships (A) and 2.4.6 Headings and Labels (AA):
         * the name is an h3 inside an article. 2.4.4 is not applicable (no links);
         * "Add to Cart" is the visible button name (2.5.3 Label in Name, A).
         */
        <li className="meal-item">
            <article>
                <img src={`http://localhost:3000/${meal.image}`} alt={meal.name}/>
                <div>
                    <h3>{meal.name}</h3>
                    <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                    <p className="meal-item-description">{meal.description}</p>
                </div>
                <p className="meal-item-actions">
                    <Button onClick={handleAddMealToCart}>Add to Cart</Button>
                </p>
            </article>
        </li>
    );
}