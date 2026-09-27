import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Header from "./components/Header";
import Meals from "./components/Meals";
import { CartContextProvider } from "./store/CartContent";
import { UserProgressContextProvider } from "./store/UserProgressContext";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <Header/>
        {/* WCAG 2.2 1.3.1 Info and Relationships (A): main landmark for the order UI. */}
        <main>
          <Meals/>
          <Cart/>
          <Checkout />
        </main>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
