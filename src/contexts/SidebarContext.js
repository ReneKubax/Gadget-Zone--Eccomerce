import React, {useState, createContext} from 'react';

export const SidebarContext = createContext();

/**
 * SidebarProvider component to provide sidebar context to its children.
 *
 * @param {Object} children - The child elements to be wrapped by the SidebarProvider.
 * @return {JSX.Element} The wrapped elements with sidebar context.
 */
const SidebarProvider = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

    /**
   * Function to handle the closing action.
   *
   * @return {void} 
   */
  const handleClose = () => {
    setIsOpen(false)
  }

  return <SidebarContext.Provider value={{isOpen, setIsOpen, handleClose}}>{children}</SidebarContext.Provider>;
};

export default SidebarProvider;
