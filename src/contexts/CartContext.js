import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

/**
 * A context provider for a shopping cart, including functions to add, remove, clear, increase and decrease the quantity of products in the cart.
 *
 * @param {Object} children - The child components.
 * @return {JSX.Element} The cart context provider.
 */
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [itemAmount, setItemAmount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const total = cart.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount, 0);
    setTotal(total);
  }, [cart]);

  useEffect(() => {
    const amount = cart.reduce((accumulator, currentItem) => accumulator + currentItem.amount, 0);
    setItemAmount(amount);
  }, [cart]);

  /**
   * Adds a product to the cart or increases its quantity if it's already in the cart.
   * @param {Object} product - The product to add.
   * @param {number} id - The id of the product.
   */
  const addToCart = (product, id) => {
    const newItem = { ...product, amount: 1 };
    const cartItem = cart.find(item => item.id === id);
    if (cartItem) {
      const newCart = cart.map(item => item.id === id ? { ...item, amount: item.amount + 1 } : item);
      setCart(newCart);
    } else {
      setCart([...cart, newItem]);
    }
  };

  /**
   * Removes a product from the cart.
   * @param {number} id - The id of the product to remove.
   */
  const removeFromCart = (id) => {
    const newCart = cart.filter(item => item.id !== id);
    setCart(newCart);
  };

  /**
   * Clears all products from the cart.
   */
  const clearCart = () => {
    setCart([]);
  };

  /**
   * Increases the quantity of a product in the cart.
   * @param {number} id - The id of the product to increase.
   */
  const increaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    addToCart(cartItem, id);
  };

  /**
   * Decreases the quantity of a product in the cart. If the quantity reaches 0, it removes the product from the cart.
   * @param {number} id - The id of the product to decrease.
   */
  const decreaseAmount = (id) => {
    const cartItem = cart.find(item => item.id === id);
    if (cartItem && cartItem.amount > 1) {
      const newCart = cart.map(item => item.id === id ? { ...item, amount: item.amount - 1 } : item);
      setCart(newCart);
    } else {
      removeFromCart(id);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        increaseAmount,
        decreaseAmount,
        itemAmount,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
