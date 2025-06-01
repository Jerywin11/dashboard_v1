import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "../components";
import Hero from "../components/hero/Hero";

import {
  FiArrowRight,
  FiCheck,
  FiCode,
  FiSmartphone,
  FiGlobe,
  FiServer,
  FiShield,
  FiMail,
  FiUser,
  FiMessageSquare,
  FiSend,
  FiX,
  FiMic,
  FiPaperclip,
} from "react-icons/fi";

// Chatbot component
const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm Nexa, your virtual assistant. How can I help you today?",
      sender: "bot",
      avatar: "🤖",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const userMessage = {
      text: inputValue,
      sender: "user",
      avatar: "👤",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Simulate bot typing
    setIsTyping(true);

    // Simulate bot response after a delay
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          text: "Thanks for your message! Our team will get back to you soon. For immediate assistance, please call +1 (555) 123-4567.",
          sender: "bot",
          avatar: "🤖",
          timestamp: new Date(),
        },
      ]);
    }, 1500 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="w-80 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 overflow-hidden transform transition-all duration-300 ease-in-out">
          {/* Chat header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white text-xl">
                🤖
              </div>
              <div>
                <h3 className="font-bold text-white">Nexa Assistant</h3>
                <p className="text-xs text-white/80">
                  {isTyping ? "Typing..." : "Online"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:text-gray-200 transition p-1 rounded-full hover:bg-white/10"
            >
              <FiX size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4 bg-gray-900/50 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex-shrink-0 mr-2 self-end">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">
                      {message.avatar}
                    </div>
                  </div>
                )}
                <div className="max-w-[70%]">
                  <div
                    className={`p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white rounded-br-none"
                        : "bg-gray-700 text-gray-200 rounded-bl-none"
                    }`}
                  >
                    {message.text}
                  </div>
                  <div
                    className={`text-xs mt-1 opacity-70 ${
                      message.sender === "user" ? "text-right" : "text-left"
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </div>
                </div>
                {message.sender === "user" && (
                  <div className="flex-shrink-0 ml-2 self-end">
                    <div className="w-8 h-8 bg-blue-600/20 rounded-full flex items-center justify-center text-lg">
                      {message.avatar}
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex-shrink-0 mr-2">
                  <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center text-lg">
                    🤖
                  </div>
                </div>
                <div className="bg-gray-700 text-gray-200 rounded-lg rounded-bl-none p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Modern Chat Input */}
          <div className="p-3 border-t border-gray-700 bg-gray-800">
            <div className="relative flex items-center">
              <button className="p-2 text-gray-400 hover:text-white transition">
                <FiPaperclip size={18} />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition">
                <FiMic size={18} />
              </button>
              <div className="flex-1 relative">
                <textarea
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  rows="1"
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg px-4 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none max-h-32"
                  style={{ minHeight: "44px" }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={inputValue.trim() === ""}
                  className={`absolute right-2 bottom-2 p-1 rounded-full transition ${
                    inputValue.trim() === ""
                      ? "text-gray-500"
                      : "text-blue-400 hover:text-blue-300"
                  }`}
                >
                  <FiSend size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 300);
          }}
          className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all relative group"
        >
          <div className="absolute top-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
          <div className="relative group-hover:rotate-12 transition-transform">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
};
const LandingPage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("web");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log("Form submitted:", formData);
    alert("Thank you for your message! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Technology stack data
  const techStack = {
    frontend: [
      {
        name: "React",
        icon: "⚛️",
        description: "Library for building user interfaces",
      },
      {
        name: "Next.js",
        icon: "⏭️",
        description: "React framework for production",
      },
      {
        name: "Flutter",
        icon: "📱",
        description: "UI toolkit for cross-platform apps",
      },
      {
        name: "Tailwind CSS",
        icon: "🎨",
        description: "Utility-first CSS framework",
      },
    ],
    backend: [
      {
        name: "Node.js",
        icon: "🟢",
        description: "JavaScript runtime environment",
      },
      { name: "Express", icon: "🚂", description: "Web application framework" },
      { name: "Django", icon: "🐍", description: "Python web framework" },
      { name: "Spring Boot", icon: "🌱", description: "Java framework" },
    ],
    database: [
      { name: "MongoDB", icon: "🍃", description: "NoSQL document database" },
      { name: "PostgreSQL", icon: "🐘", description: "Relational database" },
      { name: "Firebase", icon: "🔥", description: "Cloud-hosted database" },
      { name: "Redis", icon: "🔴", description: "In-memory data store" },
    ],
    devops: [
      { name: "Docker", icon: "🐳", description: "Containerization platform" },
      {
        name: "Kubernetes",
        icon: "☸️",
        description: "Container orchestration",
      },
      { name: "AWS", icon: "☁️", description: "Cloud computing services" },
      {
        name: "CI/CD",
        icon: "🔄",
        description: "Continuous integration/deployment",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 animate-pulse"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      </div>

      {/* Navigation */}

      <Navbar />
      <Hero
        title="For Your Business"
        highlightText="Digital Transformation"
        subtitle="We build cutting-edge software solutions that drive growth, efficiency, and innovation for your business."
        primaryButton={{
          text: "Explore Solutions",
          onClick: () => console.log("Primary clicked"),
        }}
        secondaryButton={{
          text: "Learn More",
          onClick: () => console.log("Secondary clicked"),
        }}
        tabs={[
          {
            title: "Web",
            icon: <FiGlobe />,
            code: {
              title: "Web Application",
              variableName: "webApp",
              properties: [
                { key: "framework", value: '"React/Next.js"' },
                { key: "scalability", value: '"Cloud-native"' },
                { key: "features", value: '["SSR", "API", "PWA"]' },
              ],
            },
          },
          {
            title: "Mobile",
            icon: <FiSmartphone />,
            code: {
              title: "Mobile Application",
              variableName: "mobileApp",
              properties: [
                { key: "platform", value: '"React Native/Flutter"' },
                { key: "performance", value: '"60fps"' },
                { key: "features", value: '["Offline", "Push", "Biometrics"]' },
              ],
            },
          },
          {
            title: "Software",
            icon: <FiServer />,
            code: {
              title: "Enterprise Software",
              variableName: "enterpriseApp",
              properties: [
                { key: "architecture", value: '"Microservices"' },
                { key: "security", value: '"OAuth2 + MFA"' },
                {
                  key: "features",
                  value: '["Scalable", "Reliable", "Secure"]',
                },
              ],
            },
          },
        ]}
        // Optional customizations:
        // gradientFrom="from-indigo-500"
        // gradientTo="to-pink-500"
        // blobColor1="bg-pink-600"
        // blobColor2="bg-indigo-600"
        // background="bg-gray-800"
        // textColor="text-white"
      />

      {/* Features Section */}
      <section id="features" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Why Choose Our Solutions
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                We combine technical excellence with business understanding to
                deliver exceptional results.
              </p>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-6">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <FiShield className="text-2xl text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Enterprise-Grade Security
                    </h3>
                    <p className="text-gray-300">
                      Built with security-first approach using industry best
                      practices and compliance standards.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-6">
                    <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center">
                      <FiCode className="text-2xl text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Cutting-Edge Technology
                    </h3>
                    <p className="text-gray-300">
                      We use the latest frameworks and tools to build
                      performant, scalable, and maintainable solutions.
                    </p>
                  </div>
                </div>
                <div className="flex">
                  <div className="mr-6">
                    <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center">
                      <FiServer className="text-2xl text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">
                      Cloud-Native Architecture
                    </h3>
                    <p className="text-gray-300">
                      Designed for the cloud with scalability, reliability, and
                      cost-efficiency in mind.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8 shadow-2xl">
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">UI/UX Design</span>
                    <span className="text-blue-400">95%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: "95%" }}
                    ></div>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Performance</span>
                    <span className="text-blue-400">98%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: "98%" }}
                    ></div>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Security</span>
                    <span className="text-blue-400">100%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <div className="mb-8">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Scalability</span>
                    <span className="text-blue-400">97%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: "97%" }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-300">Customer Satisfaction</span>
                    <span className="text-blue-400">99%</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full"
                      style={{ width: "99%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Solutions Section */}
      <section id="solutions" className="py-20 px-6 bg-gray-800/50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Comprehensive Digital Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We deliver end-to-end digital products tailored to your business
              needs
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <FiGlobe className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Web Applications</h3>
              <p className="text-gray-300 mb-4">
                Modern, responsive web applications with cutting-edge
                technologies for seamless user experiences.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Progressive Web
                  Apps
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Single Page
                  Applications
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> E-commerce
                  Solutions
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-purple-500 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                <FiSmartphone className="text-2xl text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Mobile Applications</h3>
              <p className="text-gray-300 mb-4">
                Cross-platform mobile apps with native performance for iOS and
                Android from a single codebase.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> React
                  Native/Flutter
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Offline
                  Capabilities
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> App Store
                  Optimization
                </li>
              </ul>
            </div>
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all hover:-translate-y-2">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6">
                <FiServer className="text-2xl text-blue-400" />
              </div>
              <h3 className="text-xl font-bold mb-3">Enterprise Software</h3>
              <p className="text-gray-300 mb-4">
                Scalable business solutions with robust architecture for your
                organization's unique requirements.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Custom CRM/ERP
                  Systems
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Cloud Integration
                </li>
                <li className="flex items-center">
                  <FiCheck className="text-green-500 mr-2" /> Data Analytics
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* Technology Section */}
      <section id="technology" className="py-20 px-6 bg-gray-800/50 relative">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We leverage cutting-edge technologies to build robust, scalable
              solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {Object.entries(techStack).map(([category, technologies]) => (
              <div
                key={category}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700 hover:border-blue-500 transition-all"
              >
                <h3 className="text-xl font-bold mb-6 capitalize text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  {category}
                </h3>
                <div className="space-y-4">
                  {technologies.map((tech) => (
                    <div key={tech.name} className="flex items-start">
                      <span className="text-2xl mr-3 mt-1">{tech.icon}</span>
                      <div>
                        <h4 className="font-medium">{tech.name}</h4>
                        <p className="text-sm text-gray-400">
                          {tech.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/50 to-purple-900/50 relative">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Let's discuss how we can build the perfect digital solution for your
            specific needs.
          </p>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold hover:shadow-xl hover:shadow-white/20 transition-all">
            Schedule a Consultation
          </button>
        </div>
      </section>

      {/* Get in Touch Section */}
      <section id="contact" className="py-20 px-6 relative">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-12 lg:mb-0 lg:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Get in Touch
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Have a project in mind or want to discuss how we can help your
                business? Reach out to us.
              </p>
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mr-6">
                    <FiMail className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Email Us</h3>
                    <p className="text-gray-300 hover:text-blue-400 transition">
                      <a href="mailto:zeribytecare@gmail.com">
                        zeribytecare.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-purple-500/10 rounded-lg flex items-center justify-center mr-6">
                    <FiSmartphone className="text-2xl text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Call Us</h3>
                    <p className="text-gray-300 hover:text-blue-400 transition">
                      <a href="tel:+15551234567">+1 (555) 123-4567</a>
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mr-6">
                    <FiGlobe className="text-2xl text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Visit Us</h3>
                    <p className="text-gray-300">
                      123 Tech Park Drive
                      <br />
                      Silicon Valley, CA 94000
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-gray-300 mb-2">
                      Your Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiUser className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-gray-300 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="john@example.com"
                        required
                      />
                    </div>
                  </div>
                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-gray-300 mb-2"
                    >
                      Your Message
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 pt-3 pointer-events-none">
                        <FiMessageSquare className="text-gray-500" />
                      </div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows="5"
                        className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Tell us about your project..."
                        required
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-900/80 relative">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-8 md:mb-0">
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  <div className="flex items-center space-x-1 relative group">
                    {/* Animated background particles */}
                    <div className="absolute -inset-1 rounded-md bg-gradient-to-r from-blue-900/20 to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                    {/* Glowing outline effect */}
                    <div className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-[2px]"></div>

                    {/* Main text with enhanced effects */}
                    <span className="relative z-10 text-2xl md:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 drop-shadow-md hover:drop-shadow-lg transition-all duration-300 hover:scale-105 transform">
                      ZeriByteCare
                      {/* Subtle shine effect */}
                      <span
                        className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                        style={{
                          maskImage:
                            "linear-gradient(-75deg, rgba(0,0,0,0.6) 30%, #000 50%, rgba(0,0,0,0.6) 70%)",
                          maskSize: "200%",
                          animation: "shine 2s infinite",
                        }}
                      ></span>
                    </span>

                    {/* Optional tech badge */}
                    <span className="relative z-10 text-[10px] md:text-xs font-mono font-bold bg-gray-800 text-blue-400 px-1.5 py-0.5 rounded-full border border-blue-500/30 ml-1 hover:bg-blue-500/10 transition-colors">
                      AI-POWERED
                    </span>

                    {/* CSS for shine animation */}
                    <style jsx>{`
                      @keyframes shine {
                        from {
                          mask-position: 150%;
                        }
                        to {
                          mask-position: -50%;
                        }
                      }
                    `}</style>
                  </div>
                </span>
              </div>
              <p className="text-gray-400 max-w-xs">
                Building the future of digital experiences with cutting-edge
                technology.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4">Solutions</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Web Applications
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Mobile Apps
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Enterprise Software
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Cloud Solutions
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Company</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Careers
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Case Studies
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white transition"
                    >
                      Blog
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li className="text-gray-400">hello@ZeriByteCare.com</li>
                  <li className="text-gray-400">+1 (555) 123-4567</li>
                  <li className="text-gray-400">
                    123 Tech Park, Silicon Valley
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">
              © 2023 ZeriByteCare. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-500 hover:text-white transition">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                Terms of Service
              </a>
              <a href="#" className="text-gray-500 hover:text-white transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
      <ChatBot />
    </div>
  );
};

export default LandingPage;
