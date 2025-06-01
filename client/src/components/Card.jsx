// Card.jsx
import React from "react";

const Card = ({ children }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 md:p-8">{children}</div>
    </div>
  );
};

export default Card;
