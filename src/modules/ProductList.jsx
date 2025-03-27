import React, { useEffect, useState } from 'react';
import axiosInstance from '../api';
import './Product.css';
import axios from 'axios';

const ProductList = ({ isAuthenticated, cartItems, setCartItems }) => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://ecommerce-svc.vercel.app/ecommerce-ui/products');
      setProducts(response.data.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const getProductQuantityInCart = (productId) => {
    const productInCart = cartItems.find((item) => item._id === productId);
    return productInCart ? productInCart.quantity : 0;
  };

  const handleAddToCart = (productId) => {
    const productToAdd = products.find((product) => product._id === productId);
    if (productToAdd) {
      const existingCartItem = cartItems.find((item) => item._id === productId);
      if (existingCartItem) {
        setCartItems((prevCartItems) =>
          prevCartItems.map((item) =>
            item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } else {
        setCartItems((prevCartItems) => [...prevCartItems, { ...productToAdd, quantity: 1 }]);
      }
    }
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item._id === productId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item
      )
    );
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Product List</h2>
      <div class="product-container">
        {products.map((product) => (
          <ul class="product-grid" key={product._id} style={{ marginBottom: '10px' }}>
            <img width="200px" height="350px" src={product.image} alt="Smartphone" />
            <h4 style={{ marginBottom: '-15px' }}>{product.name}</h4>
            <h2>{product.price}</h2>
            {isAuthenticated && (
              <div className="product-controls">
                <button onClick={() => handleRemoveFromCart(product._id)}>
                  -
                </button>
                <span className="quantity-label">
                  {getProductQuantityInCart(product._id) || ` Add To Cart`}
                </span>
                <button onClick={() => handleAddToCart(product._id)}>
                  +
                </button>
              </div>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
