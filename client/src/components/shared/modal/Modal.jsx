// src/shared/Modal.jsx
import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { XMarkIcon } from "@heroicons/react/20/solid";

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  darkMode,
  size = "md",
  height = null, // Add custom height prop
  closeOnOverlayClick = true,
}) => {
  // Close modal when pressing Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizeClasses = {
    sm: {
      width: "max-w-sm min-w-[300px]",
      height: "max-h-[400px] min-h-[200px]",
    },
    md: {
      width: "max-w-md min-w-[400px]",
      height: "max-h-[500px] min-h-[250px]",
    },
    lg: {
      width: "max-w-lg min-w-[500px]",
      height: "max-h-[600px] min-h-[300px]",
    },
    xl: {
      width: "max-w-xl min-w-[600px]",
      height: "max-h-[700px] min-h-[350px]",
    },
    "2xl": {
      width: "max-w-2xl min-w-[700px]",
      height: "max-h-[80vh] min-h-[400px]",
    },
    full: {
      width: "max-w-full w-full",
      height: "h-full",
    },
  };

  // Use custom height if provided, otherwise use the size-based height
  const heightClass = height ? height : sizeClasses[size].height;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-white/10 backdrop-blur-sm transition-opacity"
        onClick={closeOnOverlayClick ? onClose : null}
      ></div>
      {/* Modal container */}
      <div className="flex items-center justify-center min-h-screen px-4 text-center sm:block sm:p-0 z-50 relative">
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        {/* Modal content */}
        <div
          className={`inline-block w-full ${sizeClasses[size].width} ${heightClass} align-bottom rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle`}
        >
          <div
            className={`${
              darkMode ? "bg-gray-800" : "bg-white"
            } px-4 pt-5 pb-4 sm:p-6 sm:pb-4 h-full`}
          >
            {title && (
              <div className="flex items-center justify-between mb-4">
                <h3
                  className={`text-lg leading-6 font-medium ${
                    darkMode ? "text-white" : "text-gray-900"
                  }`}
                >
                  {title}
                </h3>
                <button
                  type="button"
                  className={`rounded-full p-1 ${
                    darkMode
                      ? "text-gray-400 hover:text-gray-300 hover:bg-gray-700"
                      : "text-gray-500 hover:text-gray-600 hover:bg-gray-100"
                  } focus:outline-none`}
                  onClick={onClose}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
            )}

            <div className="mt-2 h-[calc(100%-40px)] overflow-auto">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl", "full"]),
  height: PropTypes.string, // Add prop type for custom height
  closeOnOverlayClick: PropTypes.bool,
};

export default Modal;
