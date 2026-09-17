"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Maximize2, Paperclip, ArrowUp, X } from "lucide-react";
import { getPropertyById, Source } from "@/data/properties";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  suggestedQueries?: string[];
}

interface ChatPanelProps {
  propertyId: string;
  onClose?: () => void;
}

function renderMarkdown(text: string) {
  const parts = text.split(/(\*{2}[^*]+\*{2})/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return <span key={i}>{part}</span>;
  });
}

export default function ChatPanel({ propertyId, onClose }: ChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const property = getPropertyById(propertyId);
    if (property && property.welcomeMessage) {
      const initialFollowUps = property.qaBank && property.qaBank.length > 1
        ? [
            property.qaBank[1]?.question || "Is there any flood risk?",
            property.qaBank[2]?.question || "Check for legal risks",
            property.qaBank[3]?.question || "Verify zoning status"
          ]
        : [
            "Verify legal site area",
            "Check for zoning discrepancies",
            "Show encumbrances"
          ];

      setMessages([
        {
          role: "assistant",
          content: property.welcomeMessage,
          suggestedQueries: initialFollowUps
        }
      ]);
    } else {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I am your PropertyIQ Assistant. How can I help you analyze this property today?",
          suggestedQueries: [
            "Summarize this property",
            "Check for legal risks",
            "What is the zoning?"
          ]
        }
      ]);
    }
  }, [propertyId]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ propertyId, message: text }),
      });
      
      if (res.ok) {
        const data = await res.json();
        const astMsg: ChatMessage = {
          role: "assistant",
          content: data.answer || "No response received.",
          sources: data.sources || [],
          suggestedQueries: data.suggestedQueries || [],
        };
        setMessages((prev) => [...prev, astMsg]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I encountered an error processing your query." }]);
      }
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't reach the analysis engine." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderSourceTag = (source: Source, idx: number) => {
    let colors = "border-gray-200 text-gray-600 bg-gray-50";
    if (source.type === "legal") colors = "border-red-200 text-red-600 bg-red-50";
    if (source.type === "locality") colors = "border-orange-200 text-orange-600 bg-orange-50";
    if (source.type === "insurance") colors = "border-blue-200 text-blue-600 bg-blue-50";
    if (source.type === "listing") colors = "border-green-200 text-green-600 bg-green-50";

    const prefix = source.type === "legal" ? "📄" : source.type === "locality" ? "📍" : source.type === "insurance" ? "🛡️" : "📋";

    return (
      <span key={`${source.label}-${idx}`} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium border ${colors}`}>
        {prefix} {source.label}
      </span>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Panel Header */}
      <div className="p-4 border-b border-gray-100 flex items-center justify-between shrink-0 bg-white">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">PropertyIQ Assistant</h2>
            <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Grounded in legal & locality reports</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            type="button"
            onClick={() => {
              const property = getPropertyById(propertyId);
              if (property) {
                handleSend("Summarize everything about this property");
              }
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
            title="Full Summary"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors p-1.5 rounded-lg hover:bg-gray-100 cursor-pointer"
              title="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 chat-scroll flex flex-col gap-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}>
            {msg.role === "assistant" && (
              <div className="flex items-center gap-1.5 mb-1.5 ml-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-gray-400 tracking-wider">PROPERTYIQ</span>
              </div>
            )}
            
            <div
              className={`max-w-[90%] rounded-2xl px-4 py-2.5 text-sm ${
                msg.role === "user"
                  ? "bg-gray-800 text-white rounded-tr-sm shadow-xs"
                  : "bg-gray-50 text-gray-800 rounded-tl-sm border border-gray-100 shadow-xs"
              }`}
            >
              <div className="whitespace-pre-wrap leading-relaxed">{renderMarkdown(msg.content)}</div>
              
              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-gray-200/60 flex flex-wrap gap-1.5">
                  {msg.sources.map(renderSourceTag)}
                </div>
              )}
            </div>

            {msg.suggestedQueries && msg.suggestedQueries.length > 0 && (
              <div className="mt-3 ml-2">
                <div className="text-[10px] font-bold text-gray-400 tracking-wider mb-2">SUGGESTED QUERIES</div>
                <div className="flex flex-wrap gap-1.5">
                  {msg.suggestedQueries.map((q, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSend(q)}
                      className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white shadow-xs cursor-pointer"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex flex-col items-start">
            <div className="flex items-center gap-1.5 mb-1.5 ml-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold text-gray-400 tracking-wider">PROPERTYIQ</span>
            </div>
            <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot"></div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full typing-dot"></div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t border-gray-100 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(input);
          }}
          className="relative flex items-center"
        >
          <span className="absolute left-3 text-gray-400">
            <Paperclip className="w-4 h-4" />
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about this property..."
            className="w-full pl-9 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white transition-colors"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-1.5 w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors shadow-xs cursor-pointer"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </form>
        <p className="text-center text-[10px] text-gray-400 mt-2">
          AI analysis may require human verification.
        </p>
      </div>
    </div>
  );
}
