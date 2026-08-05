import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  RotateCcw,
  ArrowLeft,
  Zap,
  Briefcase,
  Code2,
  Heart,
} from "lucide-react";
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
- Wife / Partner: Shibila Sini (Initial: E.K. / Edakodamban) from Anakkayam, Manjeri. Their Nikkah was completed on January 31, 2025, and they are awaiting their wedding celebration! She is studying B.Com CA at Noble Women's College, Manjeri. Her Instagram: https://www.instagram.com/sxib.ila/
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

const QUICK_PROMPTS = [
  {
    icon: Code2,
    label: "Tech Stack",
    prompt: "What is CvSuhail's primary tech stack and favorite frontend tools?",
  },
  {
    icon: Briefcase,
    label: "Hire / Projects",
    prompt: "Is CvSuhail available for freelance projects or full-time tech roles?",
  },
  {
    icon: Zap,
    label: "Top SaaS Apps",
    prompt: "What featured SaaS applications and platforms has CvSuhail built?",
  },
  {
    icon: Heart,
    label: "About CvSuhail",
    prompt: "Tell me about CvSuhail's bio, background, and personal journey.",
  },
];

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content:
        "Hey there! 👋 I'm CV's AI. Ask me anything about CvSuhail's work, tech stack, projects, or how to hire him!",
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
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();

    // Prevent background scrolling on mobile when modal is open
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

  const sendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    if (!textToSend) setInput("");
    setMessages((prev) => [...prev, { role: "user", content: messageContent }]);
    setIsLoading(true);

    const history = messages
      .filter((m) => m.role !== "assistant" || messages.indexOf(m) !== 0)
      .map((m) => ({ role: m.role, content: m.content }));

    const shouldShowCTA = isEnquiryIntent(messageContent);
    if (shouldShowCTA) {
      setShowWhatsAppCTA(true);
      setWhatsAppPrefill(buildWhatsAppPrefill(messageContent));
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
            { role: "user", content: messageContent },
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
        buildWhatsAppPrefill(messageContent)
      )})`;
      setMessages((prev) => [...prev, { role: "assistant", content: fallbackReply }]);
      setShowWhatsAppCTA(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        role: "assistant",
        content:
          "Hey there! 👋 I'm CV's AI. Ask me anything about CvSuhail's work, tech stack, projects, or how to hire him!",
      },
    ]);
    setShowWhatsAppCTA(false);
  };

  return (
    <>
      {/* Desktop Floating Trigger Button */}
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
          <>
            <Sparkles className="w-4 h-4 text-primary-foreground animate-pulse" />
            <span>Chat with CV's AI</span>
          </>
        )}
      </button>

      {/* AI Chat Screen Modal (Full Native Mobile Screen on Mobile, Popover Card on Desktop) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 w-full h-[100dvh] md:h-[540px] md:inset-auto md:bottom-24 md:right-6 md:w-[400px] md:rounded-2xl overflow-hidden flex flex-col transition-all duration-300 bg-background border-0 md:border md:border-primary/30 shadow-2xl"
          style={{
            boxShadow: "0 25px 70px hsl(0 0% 0% / 0.85), var(--gold-glow)",
          }}
        >
          {/* Mobile Native App Bar / Top Header */}
          <div className="p-3.5 sm:p-4 border-b border-border/80 flex items-center justify-between bg-card/95 backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-3">
              {/* Back Button for Mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden p-1.5 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground active:scale-95 transition-all"
                aria-label="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/40 shadow-inner">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                {/* Active Online Status Indicator */}
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-background animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-heading font-bold text-foreground tracking-tight">
                    CV's AI Assistant
                  </h3>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono">
                    v2.0
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-body flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block"></span>
                  Online • Powered by DeepSeek
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Reset Chat Button */}
              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-secondary/60 active:scale-95 transition-all"
                aria-label="Reset Chat"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Close Button (Desktop) */}
              <button
                onClick={() => setIsOpen(false)}
                className="hidden md:block p-2 rounded-full bg-secondary/80 text-muted-foreground hover:text-foreground transition-colors active:scale-95"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-background via-background to-card/30">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex gap-2.5 ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/30 shadow-sm">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm font-body leading-relaxed break-words [word-break:break-word] overflow-hidden ${
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-xs shadow-md font-medium"
                      : "bg-secondary/90 text-foreground rounded-bl-xs border border-border/60 shadow-sm"
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
                  <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1 border border-primary/20">
                    <User className="w-3.5 h-3.5 text-primary" />
                  </div>
                )}
              </div>
            ))}

            {/* AI Typing Indicator */}
            {isLoading && (
              <div className="flex gap-2.5 items-center">
                <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 border border-primary/30">
                  <Bot className="w-3.5 h-3.5 text-primary" />
                </div>
                <div className="bg-secondary/90 rounded-2xl rounded-bl-xs px-4 py-3 border border-border/60">
                  <div className="flex gap-1.5 items-center">
                    <span className="text-xs text-muted-foreground font-body mr-1">
                      Thinking
                    </span>
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Prompt Chips (Scrollable Mobile Pills) */}
          <div className="px-3 py-2 border-t border-border/40 bg-card/40 backdrop-blur-md shrink-0">
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {QUICK_PROMPTS.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => sendMessage(item.prompt)}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-full bg-secondary/80 hover:bg-primary/20 border border-border/60 hover:border-primary/40 text-muted-foreground hover:text-primary text-[11px] font-heading font-medium transition-all active:scale-95 disabled:opacity-50"
                  >
                    <Icon className="w-3 h-3 text-primary" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Direct Action CTA */}
          {showWhatsAppCTA && (
            <div className="px-3.5 py-2.5 border-t border-border/70 bg-primary/5 shrink-0">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-heading font-semibold px-4 py-2.5 transition-colors shadow-lg active:scale-98"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat Directly on WhatsApp</span>
              </a>
            </div>
          )}

          {/* Input Form Bar (Mobile Safe Area Compliant) */}
          <div className="p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))] border-t border-border bg-card/95 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex gap-2 items-center"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, hire, or projects..."
                className="flex-1 bg-secondary/90 rounded-full px-4 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground font-body outline-none border border-border/80 focus:border-primary transition-colors"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:opacity-90 transition-all disabled:opacity-40 shrink-0 shadow-md active:scale-95"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Mobile Bottom Navigation Bar (Hidden when AI Chat screen is active) */}
      <MobileBottomNav onOpenAI={() => setIsOpen(true)} isAIOpen={isOpen} />
    </>
  );
};

export default AIChatWidget;
