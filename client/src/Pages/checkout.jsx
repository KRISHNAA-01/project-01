import React, { useContext } from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { CartContext } from "../Components/context/CartContext";
import { Link } from "react-router-dom";

const Checkout = () => {
  const { cartItem } = useContext(CartContext);

  // Calculate total price and items
  const subtotal = cartItem.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const totalItems = cartItem.reduce((total, item) => total + item.quantity, 0);
  const shipping = 30.0;
  const total = subtotal + shipping;

  const EmptyCart = () => {
    return (
      <div className="container text-center py-5">
        <h4 className="text-2xl">No item in Cart</h4>
        <Link to="/" className="btn btn-outline-dark mx-4">
          <i className="fa fa-arrow-left"></i> Continue Shopping
        </Link>
      </div>
    );
  };

  const ShowCheckout = () => {
    return (
      <div className="w-3/5 mx-auto">
        <h2 className="text-center pt-12 text-4xl">Checkout</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
          {/* Billing Section */}
          <div className="md:col-span-2">
            <div className="border p-4 mb-4">
              <h4 className="mb-4 text-xl font-semibold">Billing Address</h4>
              <form className="space-y-4">
                {/* Billing form details (similar to your previous form) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium">First name</label>
                    <input type="text" id="firstName" className="form-input mt-1 block w-full" required />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium">Last name</label>
                    <input type="text" id="lastName" className="form-input mt-1 block w-full" required />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input type="email" id="email" className="form-input mt-1 block w-full" required />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium">Address</label>
                  <input type="text" id="address" className="form-input mt-1 block w-full" required />
                </div>
                <div>
                  <label htmlFor="address2" className="block text-sm font-medium">Address 2 (Optional)</label>
                  <input type="text" id="address2" className="form-input mt-1 block w-full" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium">Country</label>
                    <select id="country" className="form-select mt-1 block w-full" required>
                      <option value="">Choose...</option>
                      <option>India</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium">State</label>
                    <select id="state" className="form-select mt-1 block w-full" required>
                      <option value="">Choose...</option>
                      <option>Punjab</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="zip" className="block text-sm font-medium">Zip</label>
                    <input type="text" id="zip" className="form-input mt-1 block w-full" required />
                  </div>
                </div>
                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-2">Payment</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="cc-name" className="block text-sm font-medium">Name on card</label>
                      <input type="text" id="cc-name" className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                      <label htmlFor="cc-number" className="block text-sm font-medium">Credit card number</label>
                      <input type="text" id="cc-number" className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                      <label htmlFor="cc-expiration" className="block text-sm font-medium">Expiration</label>
                      <input type="text" id="cc-expiration" className="form-input mt-1 block w-full" required />
                    </div>
                    <div>
                      <label htmlFor="cc-cvv" className="block text-sm font-medium">CVV</label>
                      <input type="text" id="cc-cvv" className="form-input mt-1 block w-full" required />
                    </div>
                  </div>
                </div>
                <button className="w-full btn btn-primary mt-6" type="submit">
                  Continue to checkout
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="border p-4">
              <h5 className="mb-4 text-xl font-semibold">Order Summary</h5>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span>Products ({totalItems})</span>
                  <span>Rs. {Math.round(subtotal)}</span>
                </li>
                <li className="flex justify-between">
                  <span>Shipping</span>
                  <span>Rs. {shipping}</span>
                </li>
                <li className="flex justify-between font-semibold">
                  <span>Total amount</span>
                  <span>Rs. {Math.round(total)}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header />
      <div className="container my-3 py-3">
        {cartItem.length ? <ShowCheckout /> : <EmptyCart />}
      </div>
      <Footer />
    </>
  );
};

export default Checkout;
