import React from "react";
import { TrendingUp, TrendingDown, Clock, ShieldAlert } from "lucide-react";
import { useAcademy } from "../context/AcademyContext";

interface LiveRatesTickerProps {
  onSelectPair?: (pair: string) => void;
}

export const LiveRatesTicker: React.FC<LiveRatesTickerProps> = ({ onSelectPair }) => {
  const { rates } = useAcademy();

  if (!rates || rates.length === 0) {
    return null;
  }

  return (
    <div id="live-forex-ticker" className="bg-[#070b12] border-b border-slate-800/80 text-xs py-2 px-4 overflow-hidden relative select-none">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Market status badge */}
        <div className="flex items-center gap-2 shrink-0 border-r border-slate-800 pr-3 hidden sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-semibold text-emerald-400 tracking-wider text-[11px] uppercase">FX Interbank</span>
          <span className="text-slate-500 text-[10px] hidden md:inline">24/5 Live Feed</span>
        </div>

        {/* Marquee ticker */}
        <div className="overflow-x-auto no-scrollbar flex items-center gap-6 scroll-smooth py-0.5 whitespace-nowrap">
          {rates.map((rate) => {
            const isBullish = rate.change24h >= 0;
            return (
              <button
                key={rate.pair}
                onClick={() => onSelectPair?.(rate.pair)}
                className="inline-flex items-center gap-2 group hover:bg-slate-800/50 px-2 py-0.5 rounded transition cursor-pointer"
                title={`Click to analyze ${rate.pair} in Lot Calculator`}
              >
                <span className="font-bold text-slate-200 group-hover:text-amber-400 transition-colors">
                  {rate.pair}
                </span>
                <span className="font-mono text-slate-300 font-medium">
                  {rate.bid.toFixed(rate.pair.includes("JPY") || rate.pair.includes("XAU") ? 2 : 4)}
                </span>
                <span
                  className={`inline-flex items-center font-mono font-semibold text-[11px] ${
                    isBullish ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {isBullish ? (
                    <TrendingUp className="w-3 h-3 mr-0.5" />
                  ) : (
                    <TrendingDown className="w-3 h-3 mr-0.5" />
                  )}
                  {isBullish ? "+" : ""}
                  {rate.change24h.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono hidden lg:inline">
                  Sprd: {rate.spreadPips}p
                </span>
              </button>
            );
          })}
        </div>

        {/* London/NY session indicator */}
        <div className="flex items-center gap-2 shrink-0 border-l border-slate-800 pl-3 hidden xl:flex text-slate-400 text-[11px]">
          <Clock className="w-3 h-3 text-amber-400" />
          <span>Active Session: <strong className="text-slate-200">London / NY Overlap</strong></span>
        </div>
      </div>
    </div>
  );
};
