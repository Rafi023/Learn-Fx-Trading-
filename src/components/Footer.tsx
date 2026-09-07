import React from "react";
import { TrendingUp, ShieldAlert, Mail, MapPin, Globe, CheckCircle2, Award, Phone, ExternalLink } from "lucide-react";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE_1,
  SUPPORT_PHONE_2,
  BRAND_SIGNATURE,
  EXNESS_LINK,
} from "./StudentExnessOnboarding";

interface FooterProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenCalculator: () => void;
  onOpenAIMentor: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenCalculator,
  onOpenAIMentor,
}) => {
  return (
    <footer id="academy-footer" className="bg-[#050811] border-t border-slate-800 text-slate-400 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-indigo-600 p-0.5">
                <div className="w-full h-full bg-[#090e1c] rounded-[6px] flex items-center justify-center font-black text-amber-400">
                  ★
                </div>
              </div>
              <span className="font-black text-slate-100 tracking-wider text-base">
                TWOSTARTRADER FOREX ACADEMY
              </span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs max-w-sm">
              The premier institutional academy for serious foreign exchange traders. Master ICT, CRT, SMC, and interbank Price Action strategies. One-time $25 fee covers the whole course with complete access.
            </p>
            <div className="flex items-center gap-4 text-slate-400 pt-1">
              <div className="flex items-center gap-1.5 text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>$25 All-Inclusive Pass</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px]">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Institutional Certification</span>
              </div>
            </div>
          </div>

          {/* Col 2: Curriculum */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Curriculum Strategies</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("courses")}
                  className="hover:text-emerald-400 transition"
                >
                  ICT Institutional Strategy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("courses")}
                  className="hover:text-emerald-400 transition"
                >
                  CRT (Candle Range Theory)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("courses")}
                  className="hover:text-emerald-400 transition"
                >
                  Smart Money Concepts (SMC)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("courses")}
                  className="hover:text-emerald-400 transition"
                >
                  Interbank Price Action &amp; Risk
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Trader Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Trader Tools</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={EXNESS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1.5 font-bold"
                >
                  <span>Exness Account ($40 Deposit)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenCalculator}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Position Size Calculator
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAIMentor}
                  className="hover:text-indigo-400 transition text-left flex items-center gap-1"
                >
                  <span>TwoStarTrader AI Mentor</span>
                  <span className="text-[9px] px-1 bg-indigo-500/20 text-indigo-300 rounded">Gemini 3.8</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("dashboard")}
                  className="hover:text-emerald-400 transition text-left"
                >
                  Interactive Trade Simulator
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Support & Contacts */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-xs">Direct Support</h4>
            <ul className="space-y-2 text-slate-400">
              <li className="flex items-start gap-2">
                <Mail className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-slate-300 hover:text-emerald-400 break-all transition"
                >
                  {SUPPORT_EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-400 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <a href={`tel:${SUPPORT_PHONE_1}`} className="text-slate-300 hover:text-amber-400 block transition">
                    {SUPPORT_PHONE_1}
                  </a>
                  <a href={`tel:${SUPPORT_PHONE_2}`} className="text-slate-300 hover:text-amber-400 block transition">
                    {SUPPORT_PHONE_2}
                  </a>
                </div>
              </li>
              <li className="pt-1 text-[11px] text-slate-400">
                Regard: <strong className="text-amber-300 font-bold">{BRAND_SIGNATURE}</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Risk Disclaimer */}
        <div className="p-4 bg-[#080d19] border border-slate-800 rounded-2xl space-y-2 text-[11px] leading-relaxed text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span className="uppercase tracking-wider">Regulatory Risk Disclosure &amp; Educational Notice</span>
          </div>
          <p>
            Trading foreign exchange (Forex) and contracts for difference (CFDs) on margin carries a high level of capital risk and may not be suitable for all investors. The high degree of leverage can work against you as well as for you. Before deciding to trade foreign exchange you should carefully consider your investment objectives, level of experience, and risk appetite. All materials, interactive simulators, AI mentor evaluations, and course content provided by TwoStarTrader Forex Academy are strictly for educational purposes. Enrolled students are guided to trade with strict risk management.
          </p>
        </div>

        {/* Bottom copyright */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <p>© {new Date().getFullYear()} TwoStarTrader Forex Academy. All rights reserved. Regard "TwoStarTrader".</p>
          <div className="flex items-center gap-6">
            <button onClick={() => onNavigate("contact")} className="hover:text-slate-200">
              Academic Support
            </button>
            <button onClick={() => onNavigate("courses")} className="hover:text-slate-200">
              Full $25 Curriculum
            </button>
            <span className="text-slate-600">v3.0 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
