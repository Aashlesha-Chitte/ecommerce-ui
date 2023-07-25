import React from 'react';
import './Cart.css'; 

const Cart = ({ cartItems }) => {
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((product) => (
              <li key={product._id} className="cart-item">
                <span className="product-name">
                  {product.name} - {product.price} x {product.quantity}
                </span>
              </li>
            ))}
          </ul>
          <p className="total-price">Total Price: {calculateTotalPrice()}</p>
        </>
      )}
    </div>
  );
};

export default Cart;
