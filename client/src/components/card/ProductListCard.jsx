import React from "react";
import PropTypes from "prop-types";

const ProductListCard = ({
  title = "Top Products",
  products,
  darkMode = false,
  className = "",
  icon = (
    <svg
      className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
      />
    </svg>
  ),
}) => {
  return (
    <section
      className={`rounded-lg shadow overflow-hidden transition-colors duration-200 ${
        darkMode ? "bg-gray-800" : "bg-white"
      } ${className}`}
    >
      <div
        className={`px-6 py-4 border-b ${
          darkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h3
          className={`text-lg font-medium ${
            darkMode ? "text-white" : "text-gray-900"
          }`}
        >
          {title}
        </h3>
      </div>
      <div
        className={`divide-y ${
          darkMode ? "divide-gray-700" : "divide-gray-200"
        }`}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className={`px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between ${
              darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            } sm:px-6`}
          >
            <div className="flex items-center mb-2 sm:mb-0">
              <div
                className={`h-10 w-10 rounded-md flex items-center justify-center ${
                  darkMode ? "bg-indigo-900" : "bg-indigo-100"
                }`}
              >
                {product.icon || icon}
              </div>
              <div className="ml-4">
                <p
                  className={`text-sm font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {product.name}
                </p>
                <p
                  className={`text-xs ${
                    darkMode ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  {product.sales} sales
                </p>
              </div>
            </div>
            <p
              className={`text-sm font-medium ${
                darkMode ? "text-white" : "text-gray-900"
              } sm:text-right`}
            >
              {product.revenue}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

ProductListCard.propTypes = {
  title: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      sales: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      revenue: PropTypes.string.isRequired,
      icon: PropTypes.node,
    })
  ).isRequired,
  darkMode: PropTypes.bool,
  className: PropTypes.string,
  icon: PropTypes.node,
};

export default ProductListCard;
