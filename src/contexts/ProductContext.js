import React, { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

/**
 * Creates a product provider component that fetches and provides product data through context.
 * Also manages loading state and error handling for the API call.
 *
 * @param {Object} children - The child components to be rendered within the provider.
 * @return {JSX.Element} The product provider component.
 */
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
          throw new Error('Error when ordering products from the server');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error.message);
        alert(`Error: ${error.message}`); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, isLoading, error }}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
