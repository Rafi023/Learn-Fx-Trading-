import React, { useState } from "react";
import {
  X,
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Compass,
  BookOpen,
  Copy,
  Check,
  Loader2,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface AIMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTopic?: string;
}

interface Message {
  id: string;
  sender: "user" | "mentor";
  text: string;
  timestamp: string;
}

export const AIMentorModal: React.FC<AIMentorModalProps> = ({
  isOpen,
  onClose,
  defaultTopic,
}) => {
  const { profile } = useAuth();
  const [activeTab, setActiveTab] = useState<"chat" | "analyzer">("chat");

  // Chat states
  const [inputQuery, setInputQuery] = useState(defaultTopic || "");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "intro-1",
      sender: "mentor",
      text: `### Welcome to TwoStarTrader Forex Academy Desk
I am your **TwoStarTrader AI Trading Mentor** powered by Gemini 3.8 Flash. I specialize in institutional market structure: **ICT (Inner Circle Trader), CRT (Candle Range Theory), SMC (Smart Money Concepts), and Interbank Price Action**.

⭐ **Important Onboarding for Enrolled Students:**
Before taking live setups, you should first create your live/demo account on our official broker link:
👉 **[Open Exness Account](https://one.exnessonelink.com/a/apwsjz8n8p)**
Then deposit a minimum of **$40** into your trading account to start learning and earning simultaneously!

Your $25 academy enrollment covers the **ENTIRE course and all strategies** with lifetime access.

How can I help you master liquidity, order blocks, CRT wicks, or risk management today?

*Academic Support: khrafiullah2@gmail.com | 03110116709 / 03188154587 | Regard TwoStarTrader*`,
      timestamp: "Just now",
    },
  ]);

  // Analyzer states
  const [analyzerPair, setAnalyzerPair] = useState("EUR/USD");
  const [analyzerTimeframe, setAnalyzerTimeframe] = useState("4H");
  const [analyzerStrategy, setAnalyzerStrategy] = useState("Smart Money Concepts (SMC)");
  const [analyzerLevels, setAnalyzerLevels] = useState("1.0820 Support & 1.0900 Liquidity Pool");
  const [analyzerSentiment, setAnalyzerSentiment] = useState("Bullish Order Flow after Asian sweep");
  const [analyzerResult, setAnalyzerResult] = useState<string | null>(null);
  const [analyzerLoading, setAnalyzerLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSendMessage = async (queryToSend?: string) => {
    const text = queryToSend || inputQuery;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: "msg-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery("");
    setLoading(true);

    try {
      const response = await fetch("/api/ai/ask-mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: text,
          userLevel: profile?.experienceLevel || "Intermediate",
          context: "Institutional Forex Academy Mentorship",
        }),
      });

      if (!response.ok) {
        throw new Error("Server response failed");
      }

      const data = await response.json();
      const mentorMsg: Message = {
        id: "msg-" + (Date.now() + 1),
        sender: "mentor",
        text: data.answer || "Unable to retrieve mentor guidance at this time.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, mentorMsg]);
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          id: "msg-err-" + Date.now(),
          sender: "mentor",
          text: `**System Alert**: Connection to the mentor terminal timed out. Please check your network or ensure your Gemini API credentials are configured in Settings.`,
          timestamp: "Error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleRunAnalyzer = async () => {
    setAnalyzerLoading(true);
    setAnalyzerResult(null);

    try {
      const res = await fetch("/api/ai/analyze-setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pair: analyzerPair,
          timeframe: analyzerTimeframe,
          setupType: analyzerStrategy,
          keyLevels: analyzerLevels,
          sentiment: analyzerSentiment,
        }),
      });

      if (!res.ok) throw new Error("Analyzer request failed");
      const data = await res.json();
      setAnalyzerResult(data.analysis || "No analysis returned");
    } catch (err: any) {
      setAnalyzerResult("Failed to complete setup analysis. Please verify your connection.");
    } finally {
      setAnalyzerLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const samplePrompts = [
    "How does ICT Silver Bullet and FVG work in the London/NY session?",
    "Explain CRT (Candle Range Theory) high/low wick sweeps",
    "How do I set up my Exness account with the minimum $40 deposit?",
    "What is the difference between an SMC Order Block and Fair Value Gap?",
    "Calculate lot size for 1% risk on a $5,000 account",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        id="ai-mentor-modal" 
        className="bg-[#0c1222] border border-slate-700/80 rounded-2xl w-full max-w-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#080d1a]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 font-black">
              ★
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-100">TwoStarTrader AI Trading Mentor</h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Gemini 3.8 Flash
                </span>
              </div>
              <p className="text-xs text-slate-400">ICT, CRT, SMC &amp; Real Interbank Price Action Copilot</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Tabs */}
            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-0.5 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("chat")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "chat" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Mentor Chat
              </button>
              <button
                onClick={() => setActiveTab("analyzer")}
                className={`px-3 py-1.5 rounded-lg transition ${
                  activeTab === "analyzer" ? "bg-indigo-600 text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                Setup Analyzer
              </button>
            </div>

            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        {activeTab === "chat" ? (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#0a0f1d]">
            {/* Messages Scroll Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => {
                const isMentor = msg.sender === "mentor";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${isMentor ? "justify-start" : "justify-end"}`}
                  >
                    {isMentor && (
                      <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0 mt-1">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm relative leading-relaxed ${
                        isMentor
                          ? "bg-slate-900/90 border border-slate-800 text-slate-200 shadow-md"
                          : "bg-indigo-600 text-white shadow-md font-medium"
                      }`}
                    >
                      <div className="prose prose-invert prose-xs sm:prose-sm max-w-none break-words whitespace-pre-wrap">
                        {msg.text}
                      </div>

                      <div className="flex items-center justify-between gap-2 mt-2 pt-1.5 border-t border-white/5 text-[10px] text-slate-400">
                        <span>{msg.timestamp}</span>
                        {isMentor && (
                          <button
                            onClick={() => copyToClipboard(msg.text, msg.id)}
                            className="hover:text-slate-200 flex items-center gap-1 transition"
                            title="Copy response"
                          >
                            {copiedId === msg.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-400" />
                                <span className="text-emerald-400">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3" />
                                <span>Copy</span>
                              </>
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex gap-3 items-center text-indigo-400 text-xs py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Institutional Mentor analyzing Forex market dynamics...</span>
                </div>
              )}
            </div>

            {/* Quick Prompts Bar */}
            <div className="px-4 py-2 border-t border-slate-800/80 bg-slate-950/70 overflow-x-auto no-scrollbar flex gap-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendMessage(p)}
                  className="shrink-0 text-xs px-3 py-1.5 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 text-slate-300 rounded-full border border-slate-800 transition flex items-center gap-1.5"
                >
                  <Sparkles className="w-3 h-3 text-indigo-400" />
                  <span>{p}</span>
                </button>
              ))}
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-800 bg-[#080d1a] flex gap-2">
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask your mentor about market structure, risk formulas, liquidity or pair setups..."
                className="flex-1 px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:border-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => handleSendMessage()}
                disabled={loading || !inputQuery.trim()}
                className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-xl font-bold flex items-center gap-2 transition cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Submit</span>
              </button>
            </div>
          </div>
        ) : (
          /* Setup Analyzer Tab */
          <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-[#0a0f1d]">
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm mb-1">
                <Compass className="w-4 h-4" />
                <span>Trade Setup Plan Generator</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Enter your live currency candidate. Our Gemini model will assess market structure, calculate invalidation stop-loss rationale, and outline your execution checklist.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Pair</label>
                <select
                  value={analyzerPair}
                  onChange={(e) => setAnalyzerPair(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none"
                >
                  <option value="EUR/USD">EUR/USD</option>
                  <option value="GBP/USD">GBP/USD</option>
                  <option value="USD/JPY">USD/JPY</option>
                  <option value="XAU/USD">XAU/USD (Gold)</option>
                  <option value="AUD/USD">AUD/USD</option>
                  <option value="USD/CAD">USD/CAD</option>
                  <option value="GBP/JPY">GBP/JPY</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Timeframe</label>
                <select
                  value={analyzerTimeframe}
                  onChange={(e) => setAnalyzerTimeframe(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Daily">Daily (Macro Structure)</option>
                  <option value="4H">4-Hour (Swing POI)</option>
                  <option value="1H">1-Hour (Trend Flow)</option>
                  <option value="15M">15-Minute (Execution Trigger)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Strategy / Framework</label>
                <select
                  value={analyzerStrategy}
                  onChange={(e) => setAnalyzerStrategy(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm font-semibold focus:border-indigo-500 focus:outline-none"
                >
                  <option value="Smart Money Concepts (SMC)">Smart Money Concepts (SMC)</option>
                  <option value="Support & Resistance Break/Retest">Support & Resistance Break/Retest</option>
                  <option value="Order Block & FVG Mitigation">Order Block & FVG Mitigation</option>
                  <option value="Multi-timeframe Trend Continuation">Multi-timeframe Trend Continuation</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Key Levels (Support / Resistance / POI)</label>
                <input
                  type="text"
                  value={analyzerLevels}
                  onChange={(e) => setAnalyzerLevels(e.target.value)}
                  placeholder="e.g. 1.0820 Support & 1.0900 Liquidity Pool"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">Observed Momentum / Sentiment</label>
                <input
                  type="text"
                  value={analyzerSentiment}
                  onChange={(e) => setAnalyzerSentiment(e.target.value)}
                  placeholder="e.g. Bullish displacement after Asian low sweep"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <button
              onClick={handleRunAnalyzer}
              disabled={analyzerLoading}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              {analyzerLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Synthesizing Institutional Analysis...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Generate Institutional Setup Plan</span>
                </>
              )}
            </button>

            {analyzerResult && (
              <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                    <ShieldCheck className="w-4 h-4" />
                    <span>AI Trade Plan Breakdown</span>
                  </div>
                  <button
                    onClick={() => copyToClipboard(analyzerResult, "analyzer")}
                    className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1"
                  >
                    {copiedId === "analyzer" ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === "analyzer" ? "Copied" : "Copy Plan"}</span>
                  </button>
                </div>
                <div className="prose prose-invert prose-sm max-w-none whitespace-pre-wrap leading-relaxed text-slate-200">
                  {analyzerResult}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
