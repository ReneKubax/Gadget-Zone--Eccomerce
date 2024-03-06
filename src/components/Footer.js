import React from "react";

/**
 * Renders the footer component with copyright information.
 *
 * @return {JSX.Element} The footer component
 */
const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto">
        <p className="text-white text-center">
          Copyright &copy; Rene Fuentes 2024. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
