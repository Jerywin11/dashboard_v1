// src/components/shared/Dropdown.jsx
import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Dropdown = ({
  trigger,
  children,
  position = "right",
  width = "w-72",
  darkMode = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Position classes
  const positionClasses = {
    right: "right-0",
    left: "left-0",
    center: "left-1/2 transform -translate-x-1/2",
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div onClick={toggleDropdown} className="cursor-pointer">
        {trigger}
      </div>

      <div
        className={`absolute ${
          positionClasses[position]
        } mt-2 ${width} rounded-lg shadow-lg overflow-hidden transition-all duration-200 origin-top-right ${
          dropdownOpen
            ? "transform opacity-100 scale-100"
            : "transform opacity-0 scale-95 pointer-events-none"
        } ${
          darkMode ? "bg-gray-700" : "bg-white"
        } ring-1 ring-black/10 dark:ring-white/10 z-20`}
      >
        {children}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node.isRequired,
  position: PropTypes.oneOf(["right", "left", "center"]),
  width: PropTypes.string,
  darkMode: PropTypes.bool,
};

export default Dropdown;
