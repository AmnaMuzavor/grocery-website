import React, { useState, useContext, useRef, useEffect } from "react";
import { AppContext } from "../context/AppContext";
const API = "https://grocery-website-bjbz.onrender.com";
function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const { user } = useContext(AppContext);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addToCart = async (productId) => {
    try {
      const response = await fetch(`${API}/api/cart/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, productId })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.message || "Added to cart!" }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Failed to add to cart." }]);
    }
  };

  const sendMessage = async () => {
    if (!input) return;
    if (!user) {
      alert("Please login to use chatbot.");
      return;
    }

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setTyping(true);

    try {
      const response = await fetch(`${API}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, userId: user.id })
      });

      const data = await response.json();

      if (data.type === "product" && data.product) {
        setMessages(prev => [...prev, { sender: "bot", type: "product", product: data.product }]);
      } else {
        setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
      }
    } catch (err) {
      setMessages(prev => [...prev, { sender: "bot", text: "Error: Could not fetch response." }]);
    }

    setTyping(false);
  };

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      {!open && (
        <div
          onClick={() => setOpen(true)}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            backgroundColor: "#064e3b",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            boxShadow: "0 4px 6px rgba(0,0,0,0.3)"
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="#ffffff" viewBox="0 0 24 24" width="28" height="28">
            <path d="M12 2C7.03 2 3 6.03 3 11v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-4.97-4.03-9-9-9zm-1 14h-2v-2h2v2zm6 0h-2v-2h2v2zm-3-4c-2.21 0-4-1.79-4-4h8c0 2.21-1.79 4-4 4z"/>
          </svg>
        </div>
      )}

      {open && (
        <div
          style={{
            width: "300px",
            height: "400px",
            backgroundColor: "#064e3b",
            borderRadius: "10px",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            boxShadow: "0 8px 15px rgba(0,0,0,0.3)"
          }}
        >
          <div style={{
            backgroundColor: "#059669",
            color: "white",
            padding: "10px",
            fontWeight: "bold",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span>ChatBot</span>
            <span onClick={() => setOpen(false)} style={{ cursor: "pointer", fontWeight: "bold" }}>
              &#10005;
            </span>
          </div>

          <div style={{ flex: 1, padding: "10px", overflowY: "auto", backgroundColor: "#e6f4f1" }}>
          {messages.map((msg, i) => (
  <div key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left", marginBottom: "10px" }}>
    <b>{msg.sender}:</b> {msg.text}

    {/* Show product card if exists */}
    {msg.product && (
      <div style={{
        border: "1px solid #ddd",
        borderRadius: "5px",
        padding: "5px",
        marginTop: "5px",
        backgroundColor: "#fff",
        textAlign: "left"
      }}>
        <img src={msg.product.image_url} alt={msg.product.name} style={{ width: "100%", borderRadius: "5px" }} />
        <b>{msg.product.name}</b>
        <p>₹{msg.product.price} / {msg.product.unit}</p>
        <button
          onClick={() => addToCart(msg.product)}
          style={{
            backgroundColor: "#064e3b",
            color: "#fff",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Add to Cart
        </button>
      </div>
    )}
  </div>
))}
            {typing && <div style={{ textAlign: "left", marginBottom: "5px" }}><b>bot:</b> typing...</div>}
            <div ref={messagesEndRef}></div>
          </div>

          <div style={{ display: "flex", padding: "10px", backgroundColor: "#059669" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Type message..."
              style={{ flex: 1, padding: "5px", borderRadius: "5px", border: "none" }}
            />
            <button
              onClick={sendMessage}
              style={{
                backgroundColor: "#064e3b",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: "5px",
                borderRadius: "5px",
                cursor: "pointer"
              }}
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBot;
