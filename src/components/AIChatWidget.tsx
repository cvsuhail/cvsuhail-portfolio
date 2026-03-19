import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { supabase } from "@/integrations/supabase/client";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatFunctionResponse {
  reply: string;
  shouldRedirectWhatsApp?: boolean;
}

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: "Hi! 👋 I'm CvSuhail's AI assistant. Ask me anything about his skills, projects, or experience!" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showWhatsAppCTA, setShowWhatsAppCTA] = useState(false);
  const [whatsAppPrefill, setWhatsAppPrefill] = useState(
    "Hi CvSuhail, I came from your portfolio AI chat and would like to connect."
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const whatsappNumber = "919562770397";

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const buildWhatsAppPrefill = (userMessage: string) =>
    `Hi CvSuhail, I came from your portfolio AI chat.

My enquiry:
"${userMessage}"

Please let me know the next steps.`;

  const isEnquiryIntent = (message: string) =>
    /(appointment|book|schedule|meeting|call|consult|consultation|project|enquiry|inquiry|hire|hiring|work together|collaborate|collaboration|budget|quote|proposal|timeline|start|contact|whatsapp|reach out|connect)/i.test(
      message
    );

  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsAppPrefill)}`;

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages
        .filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0)
        .map((m) => ({ role: m.role, content: m.content }));

      const { data, error } = await supabase.functions.invoke<ChatFunctionResponse>("chat-about-me", {
        body: { message: userMessage, history },
      });

      if (error) throw error;

      const shouldShowCTA = Boolean(data?.shouldRedirectWhatsApp) || isEnquiryIntent(userMessage);
      if (shouldShowCTA) {
        setShowWhatsAppCTA(true);
        setWhatsAppPrefill(buildWhatsAppPrefill(userMessage));
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data?.reply || "Sorry, I couldn't generate a response right now." },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, something went wrong. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground items-center justify-center hover:scale-110 transition-transform duration-300"
        style={{ boxShadow: "var(--gold-glow-strong)" }}
        aria-label="Chat with AI"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Panel */}
      {isOpen && (
        <div
          className="hidden md:flex fixed bottom-20 md:bottom-24 right-4 md:right-6 left-4 md:left-auto z-50 w-auto md:w-[360px] max-h-[60vh] md:max-h-[500px] rounded-2xl overflow-hidden flex-col"
          style={{
            background: "hsl(0 0% 6%)",
            border: "1px solid hsl(43 80% 55% / 0.2)",
            boxShadow: "0 20px 60px hsl(0 0% 0% / 0.5), var(--gold-glow)",
          }}
        >
          {/* Header */}
          <div className="p-4 border-b border-border flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-heading font-semibold text-foreground">Ask about CvSuhail</p>
              <p className="text-xs text-muted-foreground font-body">AI-powered • Always available</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh] md:max-h-[340px]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm font-body ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none [&>p]:m-0 [&>ul]:my-1 [&>ol]:my-1">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3 h-3 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-3 h-3 text-primary" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp CTA */}
          {showWhatsAppCTA && (
            <div className="px-4 pb-2 border-t border-border/70 bg-background/60">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 text-xs md:text-sm text-white font-heading font-semibold px-4 py-2 hover:bg-emerald-400 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Continue on WhatsApp
              </a>
            </div>
          )}

          {/* Input */}
          <div className="p-3 border-t border-border bg-background/90">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="flex-1 bg-secondary rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground font-body outline-none border border-border focus:border-primary/50 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChatWidget;
