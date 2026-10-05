import CartContext from "../store/CartContent";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import { useContext, useEffect, useState } from "react";
import UserProgressContext from "../store/UserProgressContext";
import useHttp from "../hooks/useHttp";
import Error from "./Error";

const requestConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function Checkout() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  const [confirming, setConfirming] = useState(null);

  const {
    data,
    error,
    sendRequest,
    clearData,
    isLoading,
  } = useHttp('http://localhost:3000/orders', requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleClose() {
    setConfirming(null);
    userProgressCtx.hideCheckout();
  }

  function handleFinish() {
    setConfirming(null);
    userProgressCtx.hideCheckout();
    cartCtx.clearCart();
    clearData();
  }

  function handleBack() {
    setConfirming(null);
  }

  function handleConfirm() {
    sendRequest(
      JSON.stringify({
        order: {
          items: cartCtx.items,
          customer: confirming,
        },
      })
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    setConfirming(Object.fromEntries(new FormData(event.currentTarget).entries()));
  }

  useEffect(() => {
    if (userProgressCtx.progress !== 'checkout') {
      return;
    }

    const headingId = data && !error
      ? 'order-success-title'
      : confirming
        ? 'confirm-title'
        : 'checkout-title';

    document.getElementById(headingId)?.focus();
  }, [confirming, data, error, userProgressCtx.progress]);

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (data && !error) {
    return (
      <Modal
        open={userProgressCtx.progress === 'checkout'}
        onClose={handleFinish}
        labelledBy="order-success-title"
      >
        <h2 id="order-success-title" >Success!</h2>
        <output>Your order was submitted successfully.</output>
        <p>
          We will get back to you with more details via email within the next
          few minutes.
        </p>
        <p className="modal-actions">
          <Button onClick={handleFinish}>Okay</Button>
        </p>
      </Modal>
    );
  }

  return (
    /*
     * WCAG 2.2 3.3.4 Error Prevention (AA): Submit Order shows this confirmation.
     * The purchase is sent only from Confirm Order. Go Back returns to the same
     * form, which stays mounted so the entered values remain (3.3.7, A).
     * 4.1.2 Name, Role, Value (A): the dialog name is the visible heading.
     */
    <Modal
      open={userProgressCtx.progress === 'checkout'}
      onClose={handleClose}
      labelledBy={confirming ? 'confirm-title' : 'checkout-title'}
    >
      {confirming && (
        <div>
          <h2 id="confirm-title" >Confirm Order</h2>
          <p>Go back if any of these details are wrong.</p>
          <ul>
            {cartCtx.items.map((item) => (
              <li key={item.id}>
                {item.name} - {item.quantity} x {currencyFormatter.format(item.price)}
              </li>
            ))}
          </ul>
          <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
          <dl className="review-details">
            <div>
              <dt>Full Name</dt>
              <dd>{confirming.name}</dd>
            </div>
            <div>
              <dt>E-Mail Address</dt>
              <dd>{confirming.email}</dd>
            </div>
            <div>
              <dt>Street</dt>
              <dd>{confirming.street}</dd>
            </div>
            <div>
              <dt>Postal Code</dt>
              <dd>{confirming['postal-code']}</dd>
            </div>
            <div>
              <dt>City</dt>
              <dd>{confirming.city}</dd>
            </div>
          </dl>
          {error && !isLoading && <Error title="Failed to submit order" message={error} />}
          <p className="modal-actions">
            {isLoading ? (
              <output>Sending order data...</output>
            ) : (
              <>
                <Button type="button" textOnly onClick={handleBack}>Go Back</Button>
                <Button type="button" onClick={handleConfirm}>Confirm Order</Button>
              </>
            )}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} hidden={confirming ? true : undefined}>
        <h2 id="checkout-title" >Checkout</h2>
        <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

        <Input label="Full Name" type="text" id="name" autocomplete="name"/>
        <Input label="E-Mail Address" type="email" id="email" autocomplete="email"/>
        <Input label="Street" type="text" id="street" autocomplete="address-line1"/>
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" autocomplete="postal-code"/>
          <Input label="City" type="text" id="city" autocomplete="address-level2"/>
        </div>

        {error && !confirming && <Error title="Failed to submit order" message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}