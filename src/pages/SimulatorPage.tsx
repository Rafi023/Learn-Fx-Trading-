import React from "react";
import { ForexSimulator } from "../components/ForexSimulator";
import { Zap, Shield, Award, Sparkles, BookOpen } from "lucide-react";

interface SimulatorPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const SimulatorPage: React.FC<SimulatorPageProps> = ({ onNavigate }) => {
  return (
    <div id="simulator-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/30 p-6 rounded-2xl border border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Paper Execution
            </span>
            <span className="text-xs text-slate-400">Zero Financial Risk</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Institutional Forex Simulator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Execute orders with realistic ECN pip spreads and live tick fluctuations. Practice ICT Judas Swings, Candle Range Theory (CRT) wick purges, and Smart Money Order Blocks in real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("leaderboard")}
            className="px-4 py-2.5 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold flex items-center gap-2 transition-all shadow-sm"
          >
            <Award className="w-4 h-4 text-amber-400" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={() => onNavigate("courses")}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-4 h-4 text-indigo-400" />
            <span>Review Strategies</span>
          </button>
        </div>
      </div>

      {/* Simulator Component */}
      <ForexSimulator />

      {/* Strategy Execution Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <span className="font-bold text-amber-400 uppercase tracking-wider text-[10px] block">
            ICT Liquidity Protocol
          </span>
          <h4 className="font-bold text-white text-sm">Target Asian Session Extremes</h4>
          <p className="text-slate-400 leading-relaxed">
            Wait for the London Open (02:00-05:00 EST) to sweep Asian session highs/lows into a Fair Value Gap before placing market orders.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <span className="font-bold text-emerald-400 uppercase tracking-wider text-[10px] block">
            Candle Range Theory (CRT)
          </span>
          <h4 className="font-bold text-white text-sm">Wick Purge & Internal Close</h4>
          <p className="text-slate-400 leading-relaxed">
            When a high-timeframe candle wick exceeds previous range but closes inside the body, enter on M5 pullback targeting equilibrium (50%).
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5">
          <span className="font-bold text-indigo-400 uppercase tracking-wider text-[10px] block">
            Institutional Risk Rules
          </span>
          <h4 className="font-bold text-white text-sm">1% Risk Per Execution</h4>
          <p className="text-slate-400 leading-relaxed">
            Keep lot sizing calibrated to 1% to 2% max portfolio risk. Never exceed 1:100 leverage exposure without stop loss enforcement.
          </p>
        </div>
      </div>
    </div>
  );
};
