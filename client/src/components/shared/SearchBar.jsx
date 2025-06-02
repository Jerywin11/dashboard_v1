// src/components/shared/SearchBar.jsx
import PropTypes from "prop-types";

const SearchBar = ({ darkMode, onClick, placeholder = "Search..." }) => {
  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-5 w-5 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35m1.8-6.45a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        className={`
          pl-10 pr-4 py-2 rounded-full border w-full
          ${
            darkMode
              ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
          }
          focus:outline-none focus:ring-2 focus:ring-purple-500
        `}
        placeholder={placeholder}
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
        readOnly // Optional: Prevent typing since it just opens modal
      />
    </div>
  );
};

SearchBar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default SearchBar;
