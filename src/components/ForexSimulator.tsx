import React, { useState, useMemo, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Clock,
  Shield,
  Award,
  Zap,
  DollarSign,
  Maximize2,
  RefreshCw,
  BarChart3,
  Sliders,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "./../context/AuthContext";
import { CandleStick } from "../types";

const PAIRS = [
  { id: "EUR/USD", name: "Euro / US Dollar", category: "Major", pipDecimals: 4 },
  { id: "GBP/USD", name: "British Pound / US Dollar", category: "Major", pipDecimals: 4 },
  { id: "USD/JPY", name: "US Dollar / Japanese Yen", category: "Major", pipDecimals: 2 },
  { id: "XAU/USD", name: "Gold / US Dollar", category: "Metal", pipDecimals: 1 },
  { id: "BTC/USD", name: "Bitcoin / US Dollar", category: "Crypto", pipDecimals: 0 },
];

const TIMEFRAMES = ["1M", "5M", "15M", "1H", "4H"];

export const ForexSimulator: React.FC = () => {
  const {
    currentTickPrices,
    simPositions,
    simHistory,
    simAccount,
    placeSimulatedOrder,
    closeSimulatedPosition,
    closeAllSimulatedPositions,
    resetSimulator,
  } = useAcademy();

  const { profile } = useAuth();

  const [selectedPair, setSelectedPair] = useState<string>("EUR/USD");
  const [selectedTimeframe, setSelectedTimeframe] = useState<string>("5M");
  const [orderType, setOrderType] = useState<"BUY" | "SELL">("BUY");
  const [lotSize, setLotSize] = useState<number>(0.5);
  const [useSL, setUseSL] = useState<boolean>(false);
  const [slPips, setSlPips] = useState<number>(20);
  const [useTP, setUseTP] = useState<boolean>(false);
  const [tpPips, setTpPips] = useState<number>(40);
  const [activeTab, setActiveTab] = useState<"positions" | "history">("positions");
  const [executing, setExecuting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const currentPrice = currentTickPrices[selectedPair] || {
    bid: 1.085,
    ask: 1.0852,
    high: 1.088,
    low: 1.082,
    change: 0.1,
  };

  const isJpy = selectedPair.includes("JPY");
  const isGold = selectedPair.includes("XAU");
  const isCrypto = selectedPair.includes("BTC");

  const pipValue = isJpy ? 6.5 : isGold ? 10 : isCrypto ? 1 : 10;
  const estMargin = (lotSize * (isCrypto ? 1000 : 1000)).toFixed(0);

  // Generate synthetic candles for SVG charting
  const candles: CandleStick[] = useMemo(() => {
    const list: CandleStick[] = [];
    const base = currentPrice.bid;
    let prevClose = base - 0.003;

    for (let i = 24; i >= 0; i--) {
      const volatility = isJpy ? 0.08 : isGold ? 1.5 : isCrypto ? 120 : 0.0006;
      const noise = (Math.sin(i * 0.7) + (Math.random() - 0.5)) * volatility;
      const open = prevClose;
      const close = i === 0 ? currentPrice.bid : open + noise;
      const high = Math.max(open, close) + Math.random() * volatility * 0.8;
      const low = Math.min(open, close) - Math.random() * volatility * 0.8;

      list.push({
        time: `${24 - i}m`,
        open,
        high,
        low,
        close,
      });
      prevClose = close;
    }
    return list;
  }, [selectedPair, selectedTimeframe, currentPrice.bid]);

  // Chart bounds
  const minPrice = Math.min(...candles.map((c) => c.low));
  const maxPrice = Math.max(...candles.map((c) => c.high));
  const priceRange = maxPrice - minPrice || 0.001;

  const handleOrder = async () => {
    setExecuting(true);
    setFeedback(null);
    try {
      let slPrice: number | undefined;
      let tpPrice: number | undefined;

      const pipDelta = isJpy ? slPips * 0.01 : isGold ? slPips * 0.1 : isCrypto ? slPips * 1 : slPips * 0.0001;
      const tpDelta = isJpy ? tpPips * 0.01 : isGold ? tpPips * 0.1 : isCrypto ? tpPips * 1 : tpPips * 0.0001;

      if (orderType === "BUY") {
        if (useSL) slPrice = currentPrice.ask - pipDelta;
        if (useTP) tpPrice = currentPrice.ask + tpDelta;
      } else {
        if (useSL) slPrice = currentPrice.bid + pipDelta;
        if (useTP) tpPrice = currentPrice.bid - tpDelta;
      }

      await placeSimulatedOrder(selectedPair, orderType, lotSize, slPrice, tpPrice);
      setFeedback(`Opened ${orderType} ${lotSize} Lots on ${selectedPair}`);
      setTimeout(() => setFeedback(null), 3500);
    } catch (err: any) {
      setFeedback(err?.message || "Failed to execute order");
    } finally {
      setExecuting(false);
    }
  };

  return (
    <div id="forex-simulator-root" className="w-full bg-slate-950 text-slate-100 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
      {/* Top Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
            <BarChart3 className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-white tracking-tight">TwoStarTrader Simulator</h2>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">
                LIVE FEED
              </span>
            </div>
            <p className="text-xs text-slate-400">Institutional Execution & Order Matching Sandbox</p>
          </div>
        </div>

        {/* Currency Pair Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {PAIRS.map((pair) => (
            <button
              key={pair.id}
              onClick={() => setSelectedPair(pair.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                selectedPair === pair.id
                  ? "bg-amber-500 text-slate-950 shadow-md font-bold"
                  : "bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
              }`}
            >
              {pair.id}
            </button>
          ))}
        </div>
      </div>

      {/* Account Metric Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-b border-slate-800/80 bg-slate-900/30 text-xs divide-x divide-slate-800/60">
        <div className="p-3 sm:p-4">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Balance</span>
          <span className="text-base font-bold text-white">${simAccount.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Equity</span>
          <span className="text-base font-bold text-white">${simAccount.equity.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Floating P&L</span>
          <span
            className={`text-base font-bold flex items-center gap-1 ${
              simAccount.equity - simAccount.balance >= 0 ? "text-emerald-400" : "text-rose-400"
            }`}
          >
            {simAccount.equity - simAccount.balance >= 0 ? "+" : ""}
            ${(simAccount.equity - simAccount.balance).toFixed(2)}
          </span>
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Free Margin</span>
          <span className="text-base font-bold text-slate-300">${simAccount.freeMargin.toFixed(2)}</span>
        </div>
        <div className="p-3 sm:p-4">
          <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Win Rate</span>
          <span className="text-base font-bold text-amber-400">{simAccount.winRate}%</span>
          <span className="text-[10px] text-slate-500"> ({simAccount.totalTrades} closed)</span>
        </div>
        <div className="p-3 sm:p-4 flex items-center justify-between">
          <div>
            <span className="text-slate-500 block uppercase tracking-wider text-[10px] font-bold">Account Reset</span>
            <span className="text-[11px] text-slate-400">Virtual $10k</span>
          </div>
          <button
            onClick={resetSimulator}
            title="Reset Simulator Account to $10,000"
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Grid: Chart & Order Ticket */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Interactive Candlestick Canvas / SVG Chart (8 cols) */}
        <div className="lg:col-span-8 p-4 sm:p-6 border-b lg:border-b-0 lg:border-r border-slate-800/80 flex flex-col justify-between">
          {/* Chart Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-xl font-black text-white tracking-tight">{selectedPair}</span>
                <span className="ml-2 text-xs font-medium text-slate-400">Interbank ECN</span>
              </div>
              <div
                className={`px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 ${
                  currentPrice.change >= 0 ? "bg-emerald-500/10 text-emerald-400" : "bg-rose-500/10 text-rose-400"
                }`}
              >
                {currentPrice.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {currentPrice.change >= 0 ? "+" : ""}
                {currentPrice.change}%
              </div>
            </div>

            {/* Timeframe Bar */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
              {TIMEFRAMES.map((tf) => (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-2.5 py-1 rounded text-xs font-bold transition-all ${
                    selectedTimeframe === tf ? "bg-slate-800 text-amber-400 shadow-sm" : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Candlestick SVG Rendering */}
          <div className="relative w-full h-72 sm:h-80 bg-slate-900/50 rounded-xl border border-slate-800/60 p-3 flex flex-col justify-between overflow-hidden">
            {/* Price Level Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none p-4 opacity-15">
              <div className="border-b border-slate-400 w-full"></div>
              <div className="border-b border-slate-400 w-full"></div>
              <div className="border-b border-slate-400 w-full"></div>
              <div className="border-b border-slate-400 w-full"></div>
            </div>

            {/* Price Axis on Right */}
            <div className="absolute right-2 top-3 bottom-3 flex flex-col justify-between text-[10px] text-slate-500 font-mono pointer-events-none z-10 text-right">
              <span>{maxPrice.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}</span>
              <span>{(maxPrice - priceRange * 0.33).toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}</span>
              <span>{(maxPrice - priceRange * 0.66).toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}</span>
              <span>{minPrice.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}</span>
            </div>

            {/* Dynamic Current Price Marker Line */}
            <div
              className="absolute left-0 right-14 border-t border-dashed border-amber-400/80 z-10 transition-all duration-300 pointer-events-none"
              style={{
                top: `${Math.min(95, Math.max(5, ((maxPrice - currentPrice.bid) / priceRange) * 100))}%`,
              }}
            >
              <span className="absolute right-0 -top-3 px-1.5 py-0.5 bg-amber-500 text-slate-950 font-black text-[10px] rounded font-mono shadow">
                {currentPrice.bid.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}
              </span>
            </div>

            {/* SVG Candles */}
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 500 240">
              {candles.map((c, idx) => {
                const candleWidth = 14;
                const candleSpacing = 20;
                const x = 20 + idx * candleSpacing;

                const openY = 240 - ((c.open - minPrice) / priceRange) * 220 - 10;
                const closeY = 240 - ((c.close - minPrice) / priceRange) * 220 - 10;
                const highY = 240 - ((c.high - minPrice) / priceRange) * 220 - 10;
                const lowY = 240 - ((c.low - minPrice) / priceRange) * 220 - 10;

                const isGreen = c.close >= c.open;
                const top = Math.min(openY, closeY);
                const height = Math.max(3, Math.abs(openY - closeY));
                const color = isGreen ? "#10b981" : "#f43f5e";

                return (
                  <g key={idx} className="transition-all duration-150">
                    {/* Wick */}
                    <line x1={x + candleWidth / 2} y1={highY} x2={x + candleWidth / 2} y2={lowY} stroke={color} strokeWidth="1.5" />
                    {/* Body */}
                    <rect
                      x={x}
                      y={top}
                      width={candleWidth}
                      height={height}
                      fill={color}
                      rx="1"
                      className="opacity-90 hover:opacity-100"
                    />
                  </g>
                );
              })}
            </svg>

            {/* Watermark Branding */}
            <div className="absolute bottom-3 left-4 pointer-events-none opacity-20">
              <span className="text-xl font-black text-white tracking-wider">TWOSTARTRADER</span>
            </div>
          </div>

          {/* Quick Stats Below Chart */}
          <div className="grid grid-cols-3 gap-2 mt-4 text-xs bg-slate-900/40 p-2.5 rounded-xl border border-slate-800/60">
            <div>
              <span className="text-slate-500 block text-[10px]">24h High</span>
              <span className="font-mono text-slate-200 font-medium">{currentPrice.high}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">24h Low</span>
              <span className="font-mono text-slate-200 font-medium">{currentPrice.low}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Spread</span>
              <span className="font-mono text-amber-400 font-medium">
                {((currentPrice.ask - currentPrice.bid) * (isJpy ? 100 : isGold ? 10 : isCrypto ? 1 : 10000)).toFixed(1)} Pips
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Execution Order Ticket (4 cols) */}
        <div className="lg:col-span-4 p-4 sm:p-6 bg-slate-900/20 flex flex-col justify-between">
          <div>
            <h3 className="text-xs uppercase tracking-wider text-slate-400 font-bold mb-3 flex items-center justify-between">
              <span>Order Ticket</span>
              <span className="text-[10px] text-amber-400 font-normal">Instant Market Execution</span>
            </h3>

            {/* Buy / Sell Selector Buttons */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button
                type="button"
                onClick={() => setOrderType("SELL")}
                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                  orderType === "SELL"
                    ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 font-bold border-rose-400"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-bold">SELL (Short)</span>
                <span className="text-sm font-mono font-black mt-1">
                  {currentPrice.bid.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setOrderType("BUY")}
                className={`p-3 rounded-xl flex flex-col items-center justify-center transition-all ${
                  orderType === "BUY"
                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20 font-black border-emerald-400"
                    : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
                }`}
              >
                <span className="text-xs uppercase tracking-wider font-bold">BUY (Long)</span>
                <span className="text-sm font-mono font-black mt-1">
                  {currentPrice.ask.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 0 : 5)}
                </span>
              </button>
            </div>

            {/* Lot Sizing Stepper */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-400 font-medium">Position Size (Lots)</span>
                <span className="text-amber-400 font-mono font-bold">${(lotSize * pipValue).toFixed(2)}/pip</span>
              </div>
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
                <button
                  type="button"
                  onClick={() => setLotSize((l) => Math.max(0.01, parseFloat((l - 0.1).toFixed(2))))}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300"
                >
                  -0.1
                </button>
                <button
                  type="button"
                  onClick={() => setLotSize((l) => Math.max(0.01, parseFloat((l - 0.01).toFixed(2))))}
                  className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300"
                >
                  -0.01
                </button>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max="5.0"
                  value={lotSize}
                  onChange={(e) => setLotSize(Math.max(0.01, parseFloat(e.target.value) || 0.01))}
                  className="w-full text-center bg-transparent text-white font-mono font-bold text-sm focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setLotSize((l) => parseFloat((l + 0.01).toFixed(2)))}
                  className="px-2 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300"
                >
                  +0.01
                </button>
                <button
                  type="button"
                  onClick={() => setLotSize((l) => parseFloat((l + 0.1).toFixed(2)))}
                  className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold text-slate-300"
                >
                  +0.1
                </button>
              </div>
            </div>

            {/* Stop Loss & Take Profit Toggles */}
            <div className="space-y-3 mb-5">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                    <input
                      type="checkbox"
                      checked={useSL}
                      onChange={(e) => setUseSL(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-amber-500 focus:ring-0"
                    />
                    <span>Stop Loss (SL)</span>
                  </label>
                  <span className="text-slate-500 text-[11px] font-mono">{slPips} pips</span>
                </div>
                {useSL && (
                  <input
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={slPips}
                    onChange={(e) => setSlPips(parseInt(e.target.value))}
                    className="w-full accent-amber-500"
                  />
                )}
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 font-medium">
                    <input
                      type="checkbox"
                      checked={useTP}
                      onChange={(e) => setUseTP(e.target.checked)}
                      className="rounded border-slate-700 bg-slate-800 text-emerald-500 focus:ring-0"
                    />
                    <span>Take Profit (TP)</span>
                  </label>
                  <span className="text-slate-500 text-[11px] font-mono">{tpPips} pips</span>
                </div>
                {useTP && (
                  <input
                    type="range"
                    min="10"
                    max="200"
                    step="5"
                    value={tpPips}
                    onChange={(e) => setTpPips(parseInt(e.target.value))}
                    className="w-full accent-emerald-500"
                  />
                )}
              </div>
            </div>
          </div>

          {/* Submit Order Action Button */}
          <div>
            {feedback && (
              <div className="mb-3 p-2.5 rounded-lg bg-slate-800 border border-slate-700 text-xs font-semibold text-center text-amber-400 flex items-center justify-center gap-1.5 animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{feedback}</span>
              </div>
            )}

            <button
              type="button"
              disabled={executing}
              onClick={handleOrder}
              className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl transition-all ${
                orderType === "BUY"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-slate-950 hover:brightness-110 shadow-emerald-500/20"
                  : "bg-gradient-to-r from-rose-500 to-rose-600 text-white hover:brightness-110 shadow-rose-500/20"
              }`}
            >
              {executing ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <Play className="w-4 h-4 fill-current" />
              )}
              <span>
                {orderType} {lotSize} LOTS {selectedPair}
              </span>
            </button>
            <p className="text-[10px] text-center text-slate-500 mt-2">
              Virtual Margin: ~${estMargin} • Leverage: 1:100 • Zero Broker Slippage
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Active Positions & Trade History */}
      <div className="p-4 sm:p-6 border-t border-slate-800/80 bg-slate-900/40">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("positions")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "positions"
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Open Positions ({simPositions.length})
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === "history"
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              Closed History ({simHistory.length})
            </button>
          </div>

          {activeTab === "positions" && simPositions.length > 0 && (
            <button
              onClick={closeAllSimulatedPositions}
              className="px-3 py-1 rounded-lg text-xs font-semibold bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 transition-all"
            >
              Close All Positions
            </button>
          )}
        </div>

        {/* Tab 1: Open Positions */}
        {activeTab === "positions" && (
          <div>
            {simPositions.length === 0 ? (
              <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                <Shield className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">No open simulated positions right now.</p>
                <p className="text-[11px] text-slate-600 mt-0.5">Use the order ticket above to place a BUY or SELL trade.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-slate-500 uppercase border-b border-slate-800">
                    <tr>
                      <th className="pb-2">Pair</th>
                      <th className="pb-2">Direction</th>
                      <th className="pb-2">Lots</th>
                      <th className="pb-2">Entry</th>
                      <th className="pb-2">Current</th>
                      <th className="pb-2">Pips</th>
                      <th className="pb-2">Profit / Loss</th>
                      <th className="pb-2 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 font-mono">
                    {simPositions.map((pos) => (
                      <tr key={pos.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 font-bold text-white font-sans">{pos.pair}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              pos.type === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {pos.type}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-300">{pos.lotSize}</td>
                        <td className="py-2.5 text-slate-400">{pos.entryPrice}</td>
                        <td className="py-2.5 text-slate-200">{pos.currentPrice}</td>
                        <td className={`py-2.5 font-bold ${pos.pips >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {pos.pips >= 0 ? "+" : ""}
                          {pos.pips}
                        </td>
                        <td className={`py-2.5 font-bold ${pos.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {pos.pnl >= 0 ? "+" : ""}${pos.pnl.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-right font-sans">
                          <button
                            onClick={() => closeSimulatedPosition(pos.id)}
                            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-all text-[11px] font-semibold"
                          >
                            Close
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Closed History */}
        {activeTab === "history" && (
          <div>
            {simHistory.length === 0 ? (
              <div className="text-center py-8 bg-slate-900/30 rounded-xl border border-dashed border-slate-800">
                <Clock className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400 font-medium">No completed simulator trades yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="text-[10px] text-slate-500 uppercase border-b border-slate-800">
                    <tr>
                      <th className="pb-2">Pair</th>
                      <th className="pb-2">Type</th>
                      <th className="pb-2">Lots</th>
                      <th className="pb-2">Entry & Exit</th>
                      <th className="pb-2">Pips</th>
                      <th className="pb-2">Realized P&L</th>
                      <th className="pb-2 text-right">Outcome</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/50 font-mono">
                    {simHistory.map((trade) => (
                      <tr key={trade.id} className="hover:bg-slate-800/30 transition-colors">
                        <td className="py-2.5 font-bold text-white font-sans">{trade.pair}</td>
                        <td className="py-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              trade.type === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"
                            }`}
                          >
                            {trade.type}
                          </span>
                        </td>
                        <td className="py-2.5 text-slate-300">{trade.lotSize}</td>
                        <td className="py-2.5 text-slate-400">
                          {trade.entryPrice} → {trade.exitPrice}
                        </td>
                        <td className={`py-2.5 font-bold ${trade.pips >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {trade.pips >= 0 ? "+" : ""}
                          {trade.pips}
                        </td>
                        <td className={`py-2.5 font-bold ${trade.pnl >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                          {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                        </td>
                        <td className="py-2.5 text-right font-sans">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              trade.result === "PROFIT"
                                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                            }`}
                          >
                            {trade.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
