import React, { useState } from "react";
import { X, Calculator, ShieldCheck, HelpCircle, ArrowRight } from "lucide-react";

interface LotSizeCalculatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPair?: string;
}

export const LotSizeCalculatorModal: React.FC<LotSizeCalculatorModalProps> = ({
  isOpen,
  onClose,
  initialPair = "EUR/USD",
}) => {
  const [balance, setBalance] = useState<number>(10000);
  const [riskPercent, setRiskPercent] = useState<number>(1.0);
  const [stopLossPips, setStopLossPips] = useState<number>(25);
  const [pair, setPair] = useState<string>(initialPair);

  if (!isOpen) return null;

  // Pip value assumptions (per standard lot)
  const isJpyPair = pair.includes("JPY");
  const isGold = pair.includes("XAU");
  
  // Approximate standard lot pip values in USD
  let pipValuePerStandardLot = 10.0;
  if (isJpyPair) pipValuePerStandardLot = 6.52; // roughly based on USD/JPY ~ 153.40
  if (isGold) pipValuePerStandardLot = 10.0; // 0.10 move on 100 oz

  const dollarRisk = (balance * riskPercent) / 100;
  const standardLots = stopLossPips > 0 && pipValuePerStandardLot > 0
    ? Number((dollarRisk / (stopLossPips * pipValuePerStandardLot)).toFixed(2))
    : 0;
  const miniLots = Number((standardLots * 10).toFixed(2));
  const microLots = Number((standardLots * 100).toFixed(1));
  const totalUnits = Math.round(standardLots * 100000);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div 
        id="lot-size-calculator-dialog" 
        className="bg-[#0f172a] border border-slate-700/80 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Institutional Position Calculator</h2>
              <p className="text-xs text-slate-400">Strict Capital & Lot Size Architecture</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          {/* Account Balance */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <label htmlFor="calc-balance">Account Equity / Balance ($ USD)</label>
              <span className="text-emerald-400 font-mono font-bold">${balance.toLocaleString()}</span>
            </div>
            <input
              id="calc-balance"
              type="number"
              min="100"
              step="500"
              value={balance}
              onChange={(e) => setBalance(Math.max(1, Number(e.target.value)))}
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 font-mono focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Risk Percentage */}
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1.5">
              <label>Risk Per Trade (%)</label>
              <span className="text-amber-400 font-mono font-bold">{riskPercent}% (${dollarRisk.toFixed(2)})</span>
            </div>
            <div className="grid grid-cols-4 gap-2 mb-2">
              {[0.5, 1.0, 1.5, 2.0].map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRiskPercent(r)}
                  className={`py-1.5 text-xs font-semibold rounded-lg border transition ${
                    riskPercent === r
                      ? "bg-amber-500/20 border-amber-500/60 text-amber-300"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  {r}% Risk
                </button>
              ))}
            </div>
            <input
              type="range"
              min="0.25"
              max="5.0"
              step="0.25"
              value={riskPercent}
              onChange={(e) => setRiskPercent(Number(e.target.value))}
              className="w-full accent-amber-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
            />
          </div>

          {/* Currency Pair & Stop Loss */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="calc-pair" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Currency Pair
              </label>
              <select
                id="calc-pair"
                value={pair}
                onChange={(e) => setPair(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm font-semibold focus:border-emerald-500 focus:outline-none"
              >
                <option value="EUR/USD">EUR/USD (Major)</option>
                <option value="GBP/USD">GBP/USD (Major)</option>
                <option value="USD/JPY">USD/JPY (Major)</option>
                <option value="USD/CAD">USD/CAD (Major)</option>
                <option value="AUD/USD">AUD/USD (Commodity)</option>
                <option value="USD/CHF">USD/CHF (Major)</option>
                <option value="XAU/USD">XAU/USD (Gold)</option>
                <option value="GBP/JPY">GBP/JPY (Cross)</option>
              </select>
            </div>

            <div>
              <label htmlFor="calc-sl" className="block text-xs font-semibold text-slate-300 mb-1.5">
                Stop Loss (Pips)
              </label>
              <input
                id="calc-sl"
                type="number"
                min="1"
                max="500"
                value={stopLossPips}
                onChange={(e) => setStopLossPips(Math.max(1, Number(e.target.value)))}
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm font-mono focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Results Card */}
          <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">Recommended Standard Lots</span>
              <span className="text-2xl font-black font-mono text-emerald-400">
                {standardLots} <span className="text-sm font-normal text-emerald-200">Lots</span>
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-emerald-900/40 text-center">
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Mini Lots</div>
                <div className="text-sm font-bold font-mono text-slate-100">{miniLots}</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Micro Lots</div>
                <div className="text-sm font-bold font-mono text-slate-100">{microLots}</div>
              </div>
              <div className="bg-slate-900/60 p-2 rounded-lg border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Total Units</div>
                <div className="text-sm font-bold font-mono text-slate-100">{totalUnits.toLocaleString()}</div>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>
                If Stop Loss of {stopLossPips} pips hits, total loss will be exactly <strong>${dollarRisk.toFixed(2)}</strong>.
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800/80 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl transition cursor-pointer"
          >
            Close Calculator
          </button>
        </div>
      </div>
    </div>
  );
};
