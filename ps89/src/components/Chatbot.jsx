import { useState } from "react";

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "Hi! 👋 I'm your AI assistant. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  // ==========================================
  // SEND MESSAGE TO BACKEND
  // ==========================================

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { role: "user", text: userMessage },
    ]);

    setMessage("");
    setIsLoading(true);

    try {
      // Convert previous messages into Gemini format
      const history = messages
        .filter((msg) => msg.role !== "system")
        .map((msg) => ({
          role: msg.role,
          parts: [{ text: msg.text }],
        }));

      const response = await fetch(
        "http://localhost:5000/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userMessage,
            history,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setMessages((prev) => [
        ...prev,
        { role: "model", text: data.reply },
      ]);
    } catch (error) {
      console.error("Chatbot Error:", error);

      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "Sorry, I couldn't connect to the AI right now. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // HANDLE ENTER KEY
  // ==========================================

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* ==========================================
          FLOATING BUTTON
      ========================================== */}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#C1622B] text-2xl text-white shadow-xl transition-all duration-300 hover:scale-110 hover:bg-[#a94f22]"
        aria-label="Open AI Chatbot"
      >
        {isOpen ? "×" : "✦"}
      </button>

      {/* ==========================================
          CHAT WINDOW
      ========================================== */}

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[500px] w-[380px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between bg-[#C1622B] px-5 py-4 text-white">
            <div>
              <h3 className="font-semibold">AI Assistant</h3>
              <p className="text-xs text-white/80">
                Ask me anything
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 space-y-4 overflow-y-auto bg-[#faf6f0] p-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "rounded-br-sm bg-[#C1622B] text-white"
                      : "rounded-bl-sm bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Loading */}
            {isLoading && (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-sm bg-white px-4 py-3 text-sm text-gray-500 shadow-sm">
                  <span className="animate-pulse">Thinking...</span>
                </div>
              </div>
            )}

          </div>

          {/* Input */}
          <div className="border-t border-gray-200 bg-white p-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2">

              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything..."
                className="flex-1 bg-transparent text-sm outline-none"
                disabled={isLoading}
              />

              <button
                onClick={sendMessage}
                disabled={isLoading || !message.trim()}
                className="text-xl text-[#C1622B] transition hover:scale-110 disabled:opacity-40"
              >
                ↑
              </button>

            </div>
          </div>

        </div>
      )}
    </>
  );
}

export default Chatbot;