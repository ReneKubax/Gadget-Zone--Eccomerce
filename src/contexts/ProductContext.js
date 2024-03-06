import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

/**
 * Creates a product provider component that fetches and provides product data through context.
 *
 * @param {Object} children - The child components to be rendered within the provider.
 * @return {JSX.Element} The product provider component.
 */
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
