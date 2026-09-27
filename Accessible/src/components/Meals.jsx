import Meal from "./Meal";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {}

export default function Meals() {
    const {
        data: loadedMeals, 
        isLoading, 
        error
    } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        /*
         * WCAG 2.2 4.1.3 Status Messages (AA): role="status" announces loading
         * without moving focus.
         */
        return <p className="center" role="status">Fetching meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals" message={error}/>
    }

    // if (!data) {
    //     return <p>No Meals Found.</p>
    // }

    return (
        /* WCAG 2.2 1.3.1 Info and Relationships (A): meals are a list of items. */
        <ul id="meals">
            {loadedMeals.map((meal) => 
                <Meal key={meal.id} meal={meal}/>
            )}
        </ul>
    );
}