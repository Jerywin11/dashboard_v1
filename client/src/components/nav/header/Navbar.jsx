import { useState, useEffect } from "react";
import { FiX, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeHover, setActiveHover] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Solutions", id: "solutions", color: "from-blue-400 to-cyan-400" },
    { name: "Features", id: "features", color: "from-purple-400 to-pink-400" },
    {
      name: "Technology",
      id: "technology",
      color: "from-green-400 to-teal-400",
    },
    { name: "Contact", id: "contact", color: "from-yellow-400 to-amber-400" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-gray-900/90 backdrop-blur-lg py-2"
          : "bg-gray-900/50 py-4"
      }`}
    >
      {/* Holographic top border */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-80"></div>

      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo + Shine + Glow */}
          <div className="flex items-center space-x-1 relative group">
            <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
            <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-[2px]" />

            <span className="relative z-10 text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-md hover:drop-shadow-lg transition-all duration-300 hover:scale-105 transform">
              ZeriByteCare
              <span
                className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(-75deg, rgba(0,0,0,0.6) 30%, #000 50%, rgba(0,0,0,0.6) 70%)",
                  WebkitMaskSize: "200%",
                  animation: "shine 2s infinite",
                }}
              />
            </span>

            <span className="relative z-10 text-[10px] md:text-xs font-mono font-bold bg-gray-800 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30 ml-1 hover:bg-blue-500/10 transition-colors">
              AI-POWERED
            </span>
          </div>

          {/* Desktop Navigation - Holographic Interface */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div
                key={item.id}
                onHoverStart={() => setActiveHover(item.id)}
                onHoverEnd={() => setActiveHover(null)}
                className="relative px-1"
              >
                <a
                  href={`#${item.id}`}
                  className={`relative z-10 px-4 py-2 text-sm font-medium transition-all duration-300 ${
                    activeHover === item.id
                      ? "text-white"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  {item.name}
                </a>

                <AnimatePresence>
                  {activeHover === item.id && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className={`absolute inset-0 rounded-lg bg-gradient-to-r ${item.color} opacity-20`}
                      layoutId="navHover"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.6,
                      }}
                    />
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Holographic Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-4 px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Get Started <FiChevronRight className="ml-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
            </motion.button>
          </div>

          {/* Mobile Toggle - Digital Interface */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white focus:outline-none relative"
          >
            <div className="w-6 h-6 flex flex-col justify-between">
              <span
                className={`h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "rotate-45 translate-y-2.5" : ""
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`h-0.5 w-full bg-gray-300 transition-all duration-300 ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu - Digital Panel */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2 bg-gray-900/95 backdrop-blur-lg border-t border-gray-800">
              {navItems.map((item) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsMenuOpen(false)}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="block px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all flex items-center"
                >
                  <span
                    className={`w-2 h-2 rounded-full mr-3 bg-gradient-to-r ${item.color}`}
                  ></span>
                  {item.name}
                  <FiChevronRight className="ml-auto text-gray-500" />
                </motion.a>
              ))}

              <motion.button
                whileTap={{ scale: 0.95 }}
                className="w-full mt-4 px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium flex items-center justify-center"
              >
                Get Started <FiChevronRight className="ml-1" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
