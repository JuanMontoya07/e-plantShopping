import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './ProductList.css';

const ProductList = ({ products, onHomeClick }) => {
  const dispatch = useDispatch();
  const CartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const calculateTotalQuantity = () => {
    return CartItems ? CartItems.reduce((total, item) => total + item.quantity, 0) : 0;
  };

  const isProductInCart = (productName) => {
    return CartItems.some((item) => item.name === productName);
  };

  const handleAddToCart = (product) => {
    dispatch(addItem(product));
  };

  const handleCartClick = () => setShowCart(true);
  const handlePlantsClick = () => setShowCart(false);
  const handleContinueShopping = () => setShowCart(false);

  return (
    <div>
      {/* Navbar */}
      <div className="navbar">
        <div className="luxury">
          <img
            src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
            alt="Logo"
          />
          <a href="/" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
            <div>
              <h3>Paradise Nursery</h3>
              <i>Where Green Meets Serenity</i>
            </div>
          </a>
        </div>

        <div className="nav-links">
          <span onClick={handlePlantsClick}>Plants</span>
          <span onClick={handleCartClick}>🛒 {calculateTotalQuantity()}</span>
        </div>
      </div>

      {/* Product list or Cart */}
      {!showCart ? (
        <div className="product-list-container">
          <h2>Products</h2>
          <div className="product-list">
            {products.map((product) => (
              <div className="product-card" key={product.name}>
                <img className="product-image" src={product.image} alt={product.name} />
                <div className="product-details">
                  <div className="product-name">{product.name}</div>
                  <div className="product-cost">{product.cost}</div>
                  {isProductInCart(product.name) ? (
                    <button className="added-button" disabled>
                      ✅ Added to Cart
                    </button>
                  ) : (
                    <button className="add-to-cart-button" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
};

export default ProductList;
