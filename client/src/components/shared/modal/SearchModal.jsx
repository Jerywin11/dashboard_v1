import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { XMarkIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  searchSuggestions,
  recentSearches,
  mostSearched,
} from "../../../data/search/searchData";

const sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
};

const SearchModal = ({ darkMode, isOpen, onClose, size = "xl" }) => {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  const handleClose = useCallback(() => {
    // Don't close if keyboard is likely open (on mobile)
    if (window.innerHeight < window.outerHeight) {
      return;
    }

    if (window.innerWidth <= 768) {
      setTimeout(onClose, 100);
    } else {
      onClose();
    }
  }, [onClose]);
  useEffect(() => {
    function onViewportResize() {
      const viewportHeight = window.visualViewport.height;
      // reposition or adjust the modal if needed
    }
    window.visualViewport.addEventListener("resize", onViewportResize);
    return () =>
      window.visualViewport.removeEventListener("resize", onViewportResize);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const input = document.querySelector('input[type="text"]');
      if (input) input.focus();
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyboardEvent = (e) => {
      if (e.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleKeyboardEvent);
    return () => {
      window.removeEventListener("keydown", handleKeyboardEvent);
    };
  }, [isOpen, handleClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 px-4"
      style={{ position: "fixed", overflow: "hidden" }}
    >
      <div
        className="fixed inset-0 z-40"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            handleClose();
          }
        }}
        aria-hidden="true"
      />
      <div
        className={`relative z-50 w-full rounded-2xl shadow-2xl transition-all duration-300 search-modal-container ${
          sizeClasses[size] || "max-w-xl"
        } ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-700/20 transition"
        >
          <XMarkIcon
            className={`h-5 w-5 ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          />
        </button>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          {/* Search Input */}
          <div className="relative">
            <MagnifyingGlassIcon
              className={`absolute left-3 top-3.5 h-5 w-5 ${
                darkMode ? "text-gray-400" : "text-gray-500"
              }`}
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onTouchStart={(e) => {
                e.stopPropagation();
                e.preventDefault();
              }}
              onTouchMove={(e) => e.stopPropagation()}
              placeholder="Search..."
              autoFocus
              className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-base focus:outline-none focus:ring-2 focus:ring-purple-500
                ${
                  darkMode
                    ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                    : "bg-gray-100 border-gray-300 text-gray-900 placeholder-gray-500"
                }`}
            />
          </div>
          {/* Suggestions */}
          {query.trim() !== "" && filtered.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-purple-500">Suggestions</p>
              {filtered.map((result, idx) => (
                <div
                  key={idx}
                  className={`px-4 py-2 rounded-lg cursor-pointer transition-colors ${
                    darkMode ? "hover:bg-gray-700" : "hover:bg-purple-50"
                  }`}
                >
                  {result}
                </div>
              ))}
            </div>
          )}

          {/* Empty or Initial State */}
          {query.trim() === "" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold mb-2 text-purple-500">
                  Recent Searches
                </p>
                <ul className="space-y-2">
                  {recentSearches.map((item, i) => (
                    <li
                      key={i}
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        darkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-purple-50 text-gray-700"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold mb-2 text-purple-500">
                  Most Searched
                </p>
                <ul className="space-y-2">
                  {mostSearched.map((item, i) => (
                    <li
                      key={i}
                      className={`px-4 py-2 rounded-md cursor-pointer ${
                        darkMode
                          ? "hover:bg-gray-700 text-gray-300"
                          : "hover:bg-purple-50 text-gray-700"
                      }`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        <div
          className={`px-6 py-4 border-t ${
            darkMode ? "border-gray-700" : "border-gray-200"
          } flex justify-end`}
        >
          <button
            onClick={onClose}
            className={`inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition
              ${
                darkMode
                  ? "bg-gray-700 text-white hover:bg-gray-600"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

SearchModal.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg", "xl", "2xl"]),
};

export default SearchModal;
