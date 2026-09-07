import express from "express";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

// Health check
app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    app: "TwoStarTrader Forex Academy",
    geminiAvailable: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// Live / simulated Forex rates ticker and economic events
const baseRates = [
  { pair: "EUR/USD", bid: 1.08452, ask: 1.08465, change24h: 0.28, high: 1.08820, low: 1.08210, trend: "bullish", category: "Major" },
  { pair: "GBP/USD", bid: 1.29810, ask: 1.29828, change24h: -0.15, high: 1.30240, low: 1.29650, trend: "neutral", category: "Major" },
  { pair: "USD/JPY", bid: 153.420, ask: 153.435, change24h: 0.42, high: 153.890, low: 152.950, trend: "bullish", category: "Major" },
  { pair: "USD/CHF", bid: 0.88720, ask: 0.88735, change24h: -0.08, high: 0.88950, low: 0.88600, trend: "bearish", category: "Major" },
  { pair: "AUD/USD", bid: 0.65410, ask: 0.65425, change24h: -0.32, high: 0.65750, low: 0.65310, trend: "bearish", category: "Commodity" },
  { pair: "USD/CAD", bid: 1.38920, ask: 1.38938, change24h: 0.19, high: 1.39200, low: 1.38680, trend: "bullish", category: "Commodity" },
  { pair: "NZD/USD", bid: 0.59240, ask: 0.59258, change24h: -0.22, high: 0.59600, low: 0.59120, trend: "bearish", category: "Commodity" },
  { pair: "XAU/USD", bid: 2742.60, ask: 2743.10, change24h: 1.15, high: 2755.00, low: 2730.20, trend: "bullish", category: "Metal" },
  { pair: "EUR/GBP", bid: 0.83540, ask: 0.83556, change24h: 0.35, high: 0.83720, low: 0.83380, trend: "bullish", category: "Cross" },
  { pair: "GBP/JPY", bid: 199.180, ask: 199.215, change24h: 0.24, high: 199.850, low: 198.600, trend: "bullish", category: "Cross" },
];

app.get("/api/forex/rates", (_req, res) => {
  // Add subtle realistic micro-fluctuations
  const rates = baseRates.map((r) => {
    const delta = (Math.random() - 0.5) * 0.0004 * (r.bid > 50 ? 50 : 1);
    const newBid = Number((r.bid + delta).toFixed(r.bid > 50 ? 2 : 5));
    const spread = Number((r.ask - r.bid).toFixed(r.bid > 50 ? 2 : 5));
    const newAsk = Number((newBid + spread).toFixed(r.bid > 50 ? 2 : 5));
    return {
      ...r,
      bid: newBid,
      ask: newAsk,
      spreadPips: Number(((spread) * (r.bid > 50 ? 100 : 10000)).toFixed(1)),
    };
  });

  const economicCalendar = [
    { time: "08:30 GMT", currency: "USD", impact: "High", event: "Non-Farm Payrolls (NFP)", actual: "215K", forecast: "180K", previous: "165K" },
    { time: "12:45 GMT", currency: "EUR", impact: "High", event: "ECB Main Refinancing Rate", actual: "3.25%", forecast: "3.25%", previous: "3.50%" },
    { time: "14:00 GMT", currency: "USD", impact: "Medium", event: "ISM Manufacturing PMI", actual: "49.8", forecast: "49.5", previous: "48.9" },
    { time: "23:50 GMT", currency: "JPY", impact: "High", event: "Bank of Japan Monetary Policy Statement", actual: "0.25%", forecast: "0.25%", previous: "0.25%" },
  ];

  res.json({
    rates,
    economicCalendar,
    serverTime: new Date().toISOString(),
  });
});

// Dynamic fallback generator for instantaneous institutional mentor response
function generateInstitutionalMentorAnswer(question: string, _context?: string, _userLevel?: string): string {
  const q = question.toLowerCase();

  // 1. Account Creation, Exness & Onboarding queries
  if (q.includes("exness") || q.includes("account") || q.includes("deposit") || q.includes("start") || q.includes("earn") || q.includes("broker") || q.includes("register")) {
    return `### TwoStarTrader Student Onboarding & Live Account Setup

Welcome to the **TwoStarTrader Forex Academy**! Here is your mandatory roadmap to begin trading institutional market structure:

1. **Step 1: Open Your Official Trading Account**
   - Click our official academy registration link: [https://one.exnessonelink.com/a/apwsjz8n8p](https://one.exnessonelink.com/a/apwsjz8n8p)
   - Complete verification (ID & proof of residence) to ensure instantaneous deposits and withdrawals.

2. **Step 2: Minimum Account Funding**
   - Deposit a **minimum of $40** into your live Standard or Raw Spread account.
   - This ensures adequate margin for applying proper micro-lot risk sizing (0.01 - 0.02 lots).

3. **Step 3: Learn & Earn Simultaneously**
   - Study the **ICT, CRT, SMC, and Price Action** modules in the academy.
   - Paper-trade in our interactive Trading Simulator first, then execute confirmed setups on your live Exness terminal with 1% risk per trade.

*Course Fee Reminder: Your $25 USD tuition fee covers the WHOLE academy curriculum (all strategies, simulator, certifications, and AI mentor). You will NEVER be charged per strategy.*

Direct Academic Support:
- Email: [khrafiullah2@gmail.com](mailto:khrafiullah2@gmail.com)
- WhatsApp / Phone: 03110116709 | 03188154587

Regard "TwoStarTrader"`;
  }

  // 2. ICT (Inner Circle Trader) queries
  if (q.includes("ict") || q.includes("fvg") || q.includes("fair value") || q.includes("judas") || q.includes("killzone") || q.includes("silver bullet")) {
    return `### TwoStarTrader ICT Institutional Breakdown

Regarding your query on **${question}**:

- **Liquidity & Time of Day (Killzones):**
  - **London Open (02:00 - 05:00 EST / 07:00 - 10:00 GMT):** Look for the classic **Judas Swing**—an aggressive fake run above Asian session highs or below Asian session lows engineered by smart money to induce retail traders.
  - **New York Open (07:00 - 10:00 EST):** True directional expansion often begins here following the Judas manipulation.

- **Fair Value Gaps (FVG):**
  - An FVG is a 3-candle sequence where Candle 1's wick and Candle 3's wick do not overlap, leaving an imbalance in Candle 2.
  - **Consequent Encroachment (C.E.):** The 50% midpoint of the FVG is your prime institutional mitigation entry level.

- **Execution Checklist:**
  1. High-Timeframe (H4/D1) draw on liquidity identified.
  2. Lower-Timeframe (M15/M5) liquidity sweep of an old high or low.
  3. Market Structure Shift (MSS) with displacement leaving an unfilled FVG.
  4. Enter at the FVG with Stop Loss placed cleanly beyond the swing extremity (1:2.5 minimum R:R).

*Remember to practice this on your Exness live terminal ($40 min deposit) after mastering the simulator!*

Regard "TwoStarTrader"`;
  }

  // 3. CRT (Candle Range Theory) queries
  if (q.includes("crt") || q.includes("candle range") || q.includes("wick") || q.includes("range theory")) {
    return `### Candle Range Theory (CRT) Mastery Guide

Regarding **${question}**:

- **Core Concept:**
  - Candle Range Theory treats every closed candlestick (Daily, 4-Hour, or 1-Hour) as an independent trading range with a High, Low, Open, and Close.
  - Smart money often wicks beyond the previous candle's High or Low to capture resting buy/sell stop liquidity before closing back *inside* the range.

- **The Wick Purge Rule:**
  - When the current candle wicks beyond the prior candle's range but fails to close beyond it (forming a wick rejection), this signals an institutional **Wick Purge & Trap**.
  - Target the opposite side of the candle's range or the 50% Equilibrium level.

- **Three CRT Execution Rules:**
  1. **Identify the Range Candle:** High and Low of the benchmark candle (e.g. Previous Daily Candle).
  2. **Wait for the Liquidity Purge:** Let the active session expand outside the range during London or NY killzones.
  3. **Wait for the Candle Close:** Look for a lower timeframe close back inside the range with an internal displacement shift.

*Regard "TwoStarTrader"*`;
  }

  // 4. SMC (Smart Money Concepts) & Market Structure queries
  if (q.includes("smc") || q.includes("smart money") || q.includes("order block") || q.includes("bos") || q.includes("mss") || q.includes("choc") || q.includes("mitigation")) {
    return `### Smart Money Concepts (SMC) Institutional Structure

Analysis on **${question}**:

- **Order Blocks (OB):**
  - An institutional Order Block is the last opposite-colored candle before an aggressive displacement that breaks market structure.
  - **Bullish OB:** Last down-close candle before a forceful upward impulse breaking prior highs.
  - **Bearish OB:** Last up-close candle before a forceful downward impulse breaking prior lows.

- **BMS (Break of Market Structure) vs. MSS (Market Structure Shift):**
  - **BMS (Continuation):** Price breaks a previous swing high/low in the direction of the dominant trend.
  - **MSS (Reversal):** Price sweeps key high-timeframe liquidity and breaks the most recent opposite swing point with an energetic displacement candle.

- **Premium vs. Discount:**
  - Use the Fibonacci tool from swing low to swing high.
  - Buy **ONLY in Discount** (below the 50% equilibrium level, ideally 61.8% to 78.6% OTE - Optimal Trade Entry).
  - Sell **ONLY in Premium** (above 50%).

*Regard "TwoStarTrader"*`;
  }

  // 5. Risk Management & Lot Size Calculations
  if (q.includes("risk") || q.includes("lot") || q.includes("pips") || q.includes("money") || q.includes("calculate") || q.includes("margin") || q.includes("leverage")) {
    return `### Institutional Risk Architecture & Lot Size Formula

Regarding **${question}**:

- **The 1% Rule:**
  - Never risk more than **1% to 2%** of your total account equity on any single trade setup.
  - If your account balance is $1,000, 1% risk = **$10 max loss**.
  - If your account balance is $40 (starter deposit), 1% - 2% risk = **$0.40 - $0.80 max loss** (use micro lots: 0.01).

- **The Exact Position Sizing Formula:**
  - Lot Size = ($ Account Equity × Risk %) / (Stop Loss in Pips × Pip Value per Lot)

- **Example Calculation:**
  - Account: $500
  - Risk: 2% ($10)
  - Pair: EUR/USD (Pip value = $10 per standard lot)
  - Stop Loss distance: 20 pips
  - Calculation: $10 / (20 × $10) = **0.05 Lots**

- **Rule of Asymmetry:**
  - Only execute setups offering a minimum of **1:2 or 1:2.5 Risk-to-Reward ratio**. Even with a 45% win rate, you will achieve strong institutional profitability.

*Regard "TwoStarTrader"*`;
  }

  // 6. Comprehensive Institutional Forex Advice (Default)
  return `### TwoStarTrader AI Mentor Institutional Guidance

Regarding your question on **"${question}"**:

- **Market Structure Evaluation:**
  - In institutional Forex, liquidity drives all price movement. Price continuously oscillates between internal range liquidity (FVGs, Order Blocks) and external range liquidity (old session highs, swing lows, equal highs/lows).
  - Always identify who is trapped: Are retail breakout traders being induced before the true move?

- **Top-Down Analysis Routine:**
  1. **Daily / 4-Hour Timeframe:** Determine the overarching directional bias and identify high-probability Key Levels.
  2. **1-Hour Timeframe:** Track intermediate market structure shifts (MSS) and liquidity pools.
  3. **15-Minute / 5-Minute Timeframe:** Wait for session killzone timing (London Open or NY Open) and enter on fair value gap mitigation.

- **Next Action Steps for Students:**
  - Open your live trading account via our official link: [https://one.exnessonelink.com/a/apwsjz8n8p](https://one.exnessonelink.com/a/apwsjz8n8p) with a $40 minimum deposit.
  - Remember: Your $25 academy pass grants lifetime access to **all strategies (ICT, CRT, SMC & Price Action)**.

*Direct Contact: khrafiullah2@gmail.com | 03110116709 / 03188154587*

Regard "TwoStarTrader"`;
}

// Gemini AI Trading Mentor chat endpoint
app.post("/api/ai/ask-mentor", async (req, res) => {
  try {
    const { question, context, userLevel } = req.body;
    if (!question || typeof question !== "string") {
      return res.status(400).json({ error: "A valid question string is required." });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        answer: generateInstitutionalMentorAnswer(question, context, userLevel),
        model: "institutional-mentor-engine",
      });
    }

    const prompt = `You are the Lead Institutional Forex Mentor at TwoStarTrader Forex Academy. 
The student level is "${userLevel || "Intermediate"}".
Current topic context: "${context || "General Forex Trading, ICT, CRT, SMC & Risk Architecture"}".

Student query: "${question}"

Core Academy Directives & Knowledge:
1. TwoStarTrader Forex Academy covers complete institutional trading strategies: ICT (Inner Circle Trader with Judas Swings, FVGs, Silver Bullet), CRT (Candle Range Theory & Wick Purging), SMC (Smart Money Concepts with Order Blocks, Liquidity Sweeps, BMS/MSS), and Pure Interbank Price Action.
2. The academy tuition fee of $25 USD covers the WHOLE course and all strategies (not per-strategy).
3. Student Onboarding Requirement: Whenever students ask about getting started, account setup, funding, or broker registration, always remind them:
   - First create your account on the official link: https://one.exnessonelink.com/a/apwsjz8n8p
   - Deposit a minimum amount of $40
   - Start learning the strategies and earning in the live market as well!
4. Academy Support & Contacts: Email: khrafiullah2@gmail.com, Phone numbers: 03110116709, 03188154587. Regard: "TwoStarTrader".

Response Instructions:
- Deliver a rapid, sharp, institutional-grade, easy-to-understand explanation using markdown with clear headings, bullet points, and practical math or examples.
- Emphasize strict risk management (1-2% risk per trade, minimum 1:2 or 1:2.5 Risk-to-Reward ratio, invalidation stop loss rules).
- Keep the tone professional, encouraging, analytical, and authoritative.
- Sign off with 'Regard "TwoStarTrader"'.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({
      answer: response.text,
      model: "gemini-3.8-flash",
    });
  } catch (error: any) {
    console.error("Gemini AI Mentor fallback triggered:", error?.message);
    const { question, context, userLevel } = req.body;
    res.json({
      answer: generateInstitutionalMentorAnswer(question || "Forex Trading", context, userLevel),
      model: "institutional-mentor-engine",
    });
  }
});

// Gemini AI Market Scenario / Chart Setup Analyzer
app.post("/api/ai/analyze-setup", async (req, res) => {
  const { pair, timeframe, setupType, keyLevels, sentiment } = req.body;
  const targetPair = pair || "EUR/USD";
  const targetTf = timeframe || "4H";

  const fallbackAnalysis = `### Institutional Trade Setup Review: ${targetPair} (${targetTf})

1. **Bias & Structure Analysis:**
   - **Market Direction:** ${sentiment || "Bullish order flow observed following liquidity sweeps on the high timeframe."}
   - **Structure Status:** Respecting institutional key levels around ${keyLevels || "session range highs/lows and recent Fair Value Gaps"}.

2. **Key Confluence Checklist:**
   - Strategy: **${setupType || "ICT / SMC Liquidity Sweep & Mitigation"}**
   - High-timeframe draw on liquidity confirmed.
   - Lower-timeframe Market Structure Shift (MSS) present with strong candle displacement.
   - Clean Fair Value Gap (FVG) or Unmitigated Order Block (OB) available for tight entry.

3. **Invalidation Level (Stop Loss Strategy):**
   - Place Stop Loss strictly beyond the invalidation swing high/low where the trade premise becomes logically void.
   - Never move stop losses into loss; accept the planned 1% risk if invalidation occurs.

4. **Target Strategy (Take Profit):**
   - **TP 1:** 50% range equilibrium or internal session liquidity pool (1:1.5 - 1:2 R:R). Take partial profits and set Stop to Breakeven.
   - **TP 2:** External range liquidity (equal highs/lows or major daily swing points) for 1:3+ R:R.

5. **Execution Warning:**
   - Verify spread conditions on your [Exness account](https://one.exnessonelink.com/a/apwsjz8n8p) before entering. Avoid market execution during high-impact news releases unless planned.

Regard "TwoStarTrader"`;

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        analysis: fallbackAnalysis,
        model: "institutional-rule-engine",
      });
    }

    const prompt = `You are the Head Market Analyst at TwoStarTrader Forex Academy.
Analyze the following currency setup:
- Currency Pair: ${targetPair}
- Timeframe: ${targetTf}
- Setup / Strategy: ${setupType || "ICT / SMC Liquidity Sweep & Mitigation"}
- Key Support / Resistance: ${keyLevels || "Near session highs/lows / FVG"}
- Market Sentiment / Trend: ${sentiment || "Bullish order flow after liquidity sweep"}

Provide a comprehensive trading plan breakdown formatted in clean markdown:
1. **Bias & Structure Analysis**: (Bullish, Bearish, or Ranging and why)
2. **Key Confluence Checklist**: (Order block / liquidity sweep / Fair Value Gap / CRT range)
3. **Invalidation Level (Stop Loss Strategy)**: (Exact logic for where the trade idea becomes invalid)
4. **Target Strategy (Take Profit 1 & 2)**: (Logical institutional liquidity pools)
5. **Execution Warning**: (Spread warning, session timing, e.g. London / New York overlap)
Conclude with: Regard "TwoStarTrader"`;

    const response = await ai.models.generateContent({
      model: "gemini-3.8-flash",
      contents: prompt,
    });

    res.json({
      analysis: response.text,
      model: "gemini-3.8-flash",
    });
  } catch (error: any) {
    console.error("Setup analyzer error fallback:", error?.message);
    res.json({
      analysis: fallbackAnalysis,
      model: "institutional-rule-engine",
    });
  }
});

// Payment checkout simulation and order verification
app.post("/api/payments/create-intent", (req, res) => {
  const { courseId, courseTitle, tier, amount, userEmail } = req.body;
  if (!courseId || !amount) {
    return res.status(400).json({ error: "Course details and amount are required." });
  }

  const transactionId = "TXN-" + Math.random().toString(36).substring(2, 9).toUpperCase() + "-" + Date.now().toString().slice(-4);

  res.json({
    success: true,
    transactionId,
    amount,
    currency: "USD",
    courseId,
    courseTitle,
    tier: tier || "Standard",
    clientSecret: "sim_secret_" + Math.random().toString(36).substring(2, 15),
    userEmail,
    timestamp: new Date().toISOString(),
  });
});

// Contact message endpoint
app.post("/api/contact", (req, res) => {
  const { name, email, subject, message, inquiryType } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Name, email, and message are required." });
  }

  const ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
  console.log(`[TwoStarTrader Support Ticket ${ticketId}] From: ${name} <${email}> Type: ${inquiryType || "General"} Subject: ${subject}`);

  res.json({
    success: true,
    ticketId,
    message: "Thank you for reaching out to TwoStarTrader Forex Academy. Rafiullah and our academic support team will contact you directly via email (khrafiullah2@gmail.com) or phone (03110116709 / 03188154587). Regard TwoStarTrader.",
    receivedAt: new Date().toISOString(),
  });
});

// Start Express server and mount Vite in dev or static files in production
async function startServer() {
  // Determine if running the bundled production server or in production mode
  const isCompiledBundle = typeof __filename !== "undefined" && __filename.endsWith(".cjs");
  const isProduction = process.env.NODE_ENV === "production" || isCompiledBundle;

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Locate the built static dist directory
    let distPath = path.join(process.cwd(), "dist");
    if (typeof __dirname !== "undefined" && fs.existsSync(path.join(__dirname, "index.html"))) {
      distPath = __dirname;
    } else if (fs.existsSync(path.join(process.cwd(), "dist", "index.html"))) {
      distPath = path.join(process.cwd(), "dist");
    }

    console.log(`[TwoStarTrader] Serving production assets from: ${distPath}`);
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      const indexPath = path.join(distPath, "index.html");
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send("Application index.html not found. Please verify the build.");
      }
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`TwoStarTrader Forex Academy server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
