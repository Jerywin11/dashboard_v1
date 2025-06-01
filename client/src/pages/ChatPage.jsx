import { useState, useRef, useEffect } from "react";
import {
  FiMenu,
  FiSearch,
  FiPaperclip,
  FiMic,
  FiSend,
  FiMoreVertical,
  FiChevronLeft,
  FiX,
  FiCpu,
  FiCode,
  FiAlertCircle,
} from "react-icons/fi";
import { IoCheckmarkDone } from "react-icons/io5";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Deepseek Coder, your AI programming assistant. How can I help you today?",
      sender: "deepseek",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTyping, setIsTyping] = useState(false);
  const [apiStatus, setApiStatus] = useState("disconnected");
  const [currentStreamingId, setCurrentStreamingId] = useState(null);
  const messagesEndRef = useRef(null);

  // Deepseek Coder configuration with HTTPS
  const deepseekConfig = {
    name: "Deepseek Coder",
    model: "granite3.2-vision:latest",
    apiEndpoint: "https://naughty-fog-62594.pktriot.net/api/chat",
    origins: [
      "https://naughty-fog-62594.pktriot.net",
      "https://127.0.0.1",
      "https://0.0.0.0",
      "app://*",
      "file://*",
    ],
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check API connection on component mount
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch(deepseekConfig.apiEndpoint, {
          method: "OPTIONS",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          setApiStatus("connected");
          setIsOnline(true);
        } else {
          setApiStatus("error");
          setIsOnline(false);
        }
      } catch (error) {
        console.error("API Connection Error:", error);
        setApiStatus("error");
        setIsOnline(false);

        // Add error message to chat
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            text: "⚠️ Failed to connect to Deepseek Coder API. Please ensure the server is running with HTTPS enabled.",
            sender: "system",
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            read: true,
          },
        ]);
      }
    };

    checkApiConnection();
  }, []);

  const handleStreamResponse = async (response, messageId) => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let fullResponse = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });
      const lines = chunk.split("\n").filter((line) => line.trim() !== "");

      for (const line of lines) {
        try {
          const parsed = JSON.parse(line);
          if (parsed.message && parsed.message.content) {
            fullResponse += parsed.message.content;

            // Update the message in real-time
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === messageId ? { ...msg, text: fullResponse } : msg
              )
            );
          }
        } catch (e) {
          console.error("Error parsing stream chunk:", e);
        }
      }
    }

    // Final update with complete message
    setMessages((prev) =>
      prev.map((msg) => (msg.id === messageId ? { ...msg, read: true } : msg))
    );
    setCurrentStreamingId(null);
  };

  const sendToDeepseekAPI = async (message) => {
    setIsTyping(true);
    const messageId = messages.length + 2; // Pre-set the ID for the incoming message

    try {
      // Create a placeholder message for the streaming response
      setMessages((prev) => [
        ...prev,
        {
          id: messageId,
          text: "", // Start with empty text
          sender: "deepseek",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          read: false,
        },
      ]);

      setCurrentStreamingId(messageId);

      const response = await fetch(deepseekConfig.apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: deepseekConfig.model,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          stream: true, // Enable streaming
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      await handleStreamResponse(response, messageId);
    } catch (error) {
      console.error("API Error:", error);

      // Update the message with error if streaming failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === messageId
            ? {
                ...msg,
                text: `⚠️ API Error: ${error.message}`,
                read: true,
              }
            : msg
        )
      );

      return `⚠️ API Error: ${error.message}`;
    } finally {
      setIsTyping(false);
      setCurrentStreamingId(null);
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      read: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Get response from Deepseek Coder
    await sendToDeepseekAPI(inputValue);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left sidebar - Conversations list */}
      <div
        className={`${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transform fixed md:static inset-y-0 left-0 w-72 bg-white border-r border-gray-200 flex flex-col z-10 transition-transform duration-300 ease-in-out`}
      >
        {/* Header */}
        <div className="p-3 border-b border-gray-200 flex justify-between items-center bg-teal-500 text-white">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-teal-500 font-semibold">
              <FiCode size={20} />
            </div>
            <span className="ml-2 font-semibold text-lg">ZBC Chat</span>
          </div>
          <button className="md:hidden p-1" onClick={toggleSidebar}>
            <FiX size={25} />
          </button>
        </div>

        {/* Search */}
        <div className="p-2 border-b border-gray-200">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400" size={16} />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 focus:bg-white"
              placeholder="Search"
            />
          </div>
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          <div
            className={`p-3 flex items-center hover:bg-gray-100 cursor-pointer bg-gray-100`}
            onClick={() => isMobile && setShowSidebar(false)}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <FiCpu size={20} />
              </div>
              {isOnline ? (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              ) : (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3 flex-1">
              <div className="flex justify-between items-center">
                <span className="font-medium text-gray-800">
                  {deepseekConfig.name}
                </span>
                <span className="text-xs text-gray-500">
                  {messages[messages.length - 1].time}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500 truncate w-40">
                  {messages[messages.length - 1].text.substring(0, 30)}...
                </p>
                {messages[messages.length - 1].sender === "user" &&
                  !messages[messages.length - 1].read && (
                    <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                  )}
              </div>
            </div>
          </div>
        </div>

        {/* Model info footer */}
        <div className="p-3 border-t border-gray-200 text-xs text-gray-500">
          <div className="font-medium flex items-center">
            Current Model:
            {apiStatus === "connected" ? (
              <span className="ml-1 text-green-500 flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
                {deepseekConfig.model}
              </span>
            ) : (
              <span className="ml-1 text-red-500 flex items-center">
                <FiAlertCircle className="mr-1" size={14} />
                Disconnected
              </span>
            )}
          </div>
          <div className="mt-1 break-all">
            API: {deepseekConfig.apiEndpoint}
          </div>
          <div className="mt-1 text-gray-400">Status: {apiStatus}</div>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat header */}
        <div className="bg-white p-3 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            {/* Toggle sidebar by clicking the avatar */}
            <div
              className="relative md:mr-3 mr-2 cursor-pointer"
              onClick={() => isMobile && toggleSidebar()}
            >
              <div className="w-10 h-10 rounded-full bg-purple-500 flex items-center justify-center text-white">
                <FiCpu size={20} />
              </div>
              {isOnline ? (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              ) : (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3">
              <div className="font-medium">{deepseekConfig.name}</div>
              <div className="text-xs text-gray-500">
                {isTyping
                  ? "typing..."
                  : isOnline
                  ? "online"
                  : "offline - check API connection"}
              </div>
            </div>
          </div>
          <div className="flex space-x-4 text-gray-500">
            <button className="hover:bg-gray-100 p-1 rounded-full">
              <FiSearch size={18} />
            </button>
            <button className="hover:bg-gray-100 p-1 rounded-full">
              <FiMoreVertical size={18} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          <div className="w-full px-4 py-2 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-3xl rounded-lg px-4 py-2 relative ${
                    message.sender === "user"
                      ? "bg-teal-500 text-white rounded-br-none"
                      : message.sender === "system"
                      ? "bg-yellow-100 text-yellow-800 rounded-lg"
                      : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                  }`}
                >
                  <p>
                    {message.text}
                    {currentStreamingId === message.id && (
                      <span className="animate-pulse">▍</span>
                    )}
                  </p>
                  <div
                    className={`flex items-center justify-end space-x-1 mt-1 ${
                      message.sender === "user"
                        ? "text-teal-100"
                        : message.sender === "system"
                        ? "text-yellow-600"
                        : "text-gray-500"
                    }`}
                  >
                    <span className="text-xs">{message.time}</span>
                    {message.sender === "user" && (
                      <IoCheckmarkDone
                        size={16}
                        className={
                          message.read ? "text-white" : "text-teal-200"
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && !currentStreamingId && (
              <div className="flex justify-start">
                <div className="max-w-3xl rounded-lg px-4 py-2 bg-white text-gray-800 rounded-bl-none shadow-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-gray-300 animate-bounce"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input area */}
        <div className="bg-white border-t border-gray-200 p-3">
          <div className="flex items-center">
            <button className="p-2 text-gray-500 hover:text-gray-700 mx-1">
              <FiPaperclip size={22} />
            </button>
            <div className="flex-1 mx-2">
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <textarea
                  className="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none max-h-20"
                  placeholder={`Message ${deepseekConfig.name}...`}
                  rows="1"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={!isOnline || isTyping}
                />
              </div>
            </div>
            {inputValue.trim() === "" ? (
              <button
                className="p-2 text-gray-500 hover:text-gray-700 mx-1"
                disabled={!isOnline || isTyping}
              >
                <FiMic size={22} />
              </button>
            ) : (
              <button
                className="p-2 text-white bg-teal-500 rounded-full hover:bg-teal-600 mx-1 disabled:opacity-50"
                onClick={handleSendMessage}
                disabled={!isOnline || isTyping}
              >
                <FiSend size={22} />
              </button>
            )}
          </div>
          {!isOnline && (
            <div className="text-xs text-red-500 mt-1 flex items-center">
              <FiAlertCircle className="mr-1" />
              API connection failed. Please check your HTTPS server
              configuration.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
