import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import MobileBottomNav from "./MobileBottomNav";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

const DEEPSEEK_API_KEY =
  import.meta.env.VITE_DEEPSEEK_API_KEY ||
  import.meta.env.DEEPSEEK_API_KEY ||
  "sk-9dfcc650bd0a4a8ca2d89777c1db22da";

const SYSTEM_PROMPT = `You are CV's AI — the official personal AI assistant for Muhammed Suhail CV (CvSuhail).

ABOUT CVSUHAIL:
- Full Name: Muhammed Suhail CV (C.V. stands for Changaram Veetil).
- Age: 25 years old (Born April 27, 2001).
- Hometown: Cherukode, Wandoor (Nirannaparambu), Malappuram, Kerala, India (UTC+05:30).
- Specialization: Favorite area is Frontend Technologies, along with Full-Stack Web and Mobile Development.
- Education: BCA from Malabar College of Advanced Studies; Ma'din HSS (+1 & +2); GHSS Porur (8th-10th); Al Furqan Public School, Wandoor (LKG-7th).
- Instagram: https://www.instagram.com/stories.of.cv/

PERSONAL & RELATIONSHIPS:
- Lover / Partner: Shibila Sini (Initial: E.K. / Edakodamban) from Anakkayam, Manjeri. She is studying B.Com CA at Noble Women's College, Manjeri. Her Instagram: https://www.instagram.com/sxib.ila/
- Family: Father Abdul Rahim CV, Mother Bushrathunneesa, Brother Hafiz Muhammed Swalih, Sisters Fathima Sahla & Husna Fathima (youngest).

CURRENT ROLES & EXPERIENCE:
- Tech Lead at SSF Kerala.
- Co-founder & Product Engineer at Peedia.online (co-founded with founder Jafar Swadhique).
- 4+ years of professional experience building SaaS, web, and mobile apps.
- Formerly Remote Product Developer at UnitVilla LLC / HabiLife (Vancouver, BC; CEO: Zakir Zain).

PERSONALITY & RESPONSE STYLE:
- Talk like a real, friendly human. Keep your replies VERY SHORT, punchy, and concise (1 to 3 short sentences max).
- Speak enthusiastically about CvSuhail! Highlight his experience, projects, tech stack, and personal story when asked.
- Answer questions warmly about CvSuhail's life, background, family, partner (Shibila Sini), and work.
- FOR HIRING, BOOKING MEETINGS, PROJECT REQUESTS, OR CONSULTATIONS:
  Give a short enthusiastic reply AND always provide a direct WhatsApp markdown link formatted as:
  [Chat on WhatsApp (+91 95627 70397)](https://wa.me/919562770397?text=Hi%20CvSuhail%2C%20I%20want%20to%20discuss%20a%20project%20or%20hiring%20opportunity.)

PROJECTS & LINKS:
- FestFloww (https://festfloww.com)
- Peedia.online (https://peedia.online)
- HabiLife (https://habilife.app)
- PlanUndo (https://planundo.online)
- BrandQR (https://brandqr.site)
- Umigle (https://umigle.cvsuhail.online/)
- AppReady (https://apprdy.cvsuhail.online/)
- Sensorium (https://sensorium.ssfkerala.org/)
- Kerala Sahityotsav (https://keralasahityotsav.com)
- Reelman Uniforms (https://reelmanuniforms.com)
- Reelman Bespoke (https://reelmanbespoke.com)
- Yas Orcin (https://yas-orcin.vercel.app)`;

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm CV's AI. What would you like to know about CvSuhail's work, projects, or how to hire him?",
    },
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

    // Lock body scroll on mobile when AI modal is open to prevent page bleeding
    if (isOpen && typeof window !== "undefined" && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
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

    const history = messages
      .filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0)
      .map((m) => ({ role: m.role, content: m.content }));

    const shouldShowCTA = isEnquiryIntent(userMessage);
    if (shouldShowCTA) {
      setShowWhatsAppCTA(true);
      setWhatsAppPrefill(buildWhatsAppPrefill(userMessage));
    }

    try {
      const response = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...history,
            { role: "user", content: userMessage },
          ],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.statusText}`);
      }

      const data = await response.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "I couldn't process that right now. Feel free to chat directly with CvSuhail on WhatsApp!";

      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      console.error("AI Chat Error:", err);
      const fallbackReply = `I'm having trouble reaching my AI backend right now. Message CvSuhail directly on WhatsApp:\n\n[Chat on WhatsApp (+91 95627 70397)](https://wa.me/919562770397?text=${encodeURIComponent(
        buildWhatsAppPrefill(userMessage)
      )})`;
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackReply }]);
      setShowWhatsAppCTA(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Desktop Floating Action Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hidden md:flex fixed bottom-6 right-6 z-50 items-center gap-2 px-5 py-3 rounded-full bg-primary text-primary-foreground font-heading font-semibold text-xs lg:text-sm hover:scale-105 transition-all duration-300 shadow-2xl cursor-pointer"
        style={{ boxShadow: "var(--gold-glow-strong)" }}
        aria-label="Chat with CV's AI"
      >
        {isOpen ? (
          <>
            <X className="w-4 h-4" />
            <span>Close Chat</span>
          </>
        ) : (
          <span>Chat with CV's AI to know more about him</span>
        )}
      </button>

      {/* AI Chat Modal (FULLSCREEN 100dvh on Mobile, Popup on Desktop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 w-full h-[100dvh] md:h-[520px] md:inset-auto md:bottom-24 md:right-6 md:w-[380px] md:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 bg-background border border-primary/30 shadow-2xl"
          style={{
            boxShadow: "0 25px 70px hsl(0 0% 0% / 0.8), var(--gold-glow)",
          }}
        >
          {/* Header Bar */}
          <div className="p-4 border-b border-border/80 flex items-center justify-between bg-card/90 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Bot className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-heading font-bold text-foreground">CV's AI Assistant</p>
                <p className="text-xs text-muted-foreground font-body">Ask about CvSuhail's skills & work</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/30">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-body leading-relaxed break-words [word-break:break-word] overflow-hidden ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md shadow-md"
                      : "bg-secondary text-foreground rounded-bl-md border border-border/50 shadow-sm"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <div className="prose prose-sm prose-invert max-w-none break-words [word-break:break-word] [&>p]:m-0 [&>p]:leading-relaxed [&>ul]:my-1 [&>ol]:my-1 [&_a]:text-primary [&_a]:font-semibold [&_a]:underline [&_a]:break-all">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  ) : (
                    msg.content
                  )}
                </div>
                {msg.role === "user" && (
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                  <div className="flex gap-2 items-center">
                    <span className="text-xs text-muted-foreground font-body">CV's AI Thinking</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* WhatsApp CTA Action */}
          {showWhatsAppCTA && (
            <div className="px-4 py-2.5 border-t border-border/70 bg-background/80 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary text-xs md:text-sm text-primary-foreground font-heading font-semibold px-4 py-2.5 hover:opacity-90 transition-colors shadow-md"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Input Form Bar with Mobile Safe-Area Padding */}
          <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-background/95 shrink-0">
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
                placeholder="Ask about skills, projects, or hire..."
                className="flex-1 bg-secondary rounded-full px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground font-body outline-none border border-border focus:border-primary/60 transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0 shadow-md active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav onOpenAI={() => setIsOpen(true)} isAIOpen={isOpen} />
    </>
  );
};

export default AIChatWidget;
