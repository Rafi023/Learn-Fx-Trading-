import React, { useState } from "react";
import {
  ExternalLink,
  Copy,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Coins,
  ShieldCheck,
  Check,
  Sparkles,
  Phone,
  Mail,
  HelpCircle,
} from "lucide-react";

interface StudentExnessOnboardingProps {
  variant?: "banner" | "card" | "modal";
  onDismiss?: () => void;
}

export const EXNESS_LINK = "https://one.exnessonelink.com/a/apwsjz8n8p";
export const SUPPORT_EMAIL = "khrafiullah2@gmail.com";
export const SUPPORT_PHONE_1 = "03110116709";
export const SUPPORT_PHONE_2 = "03188154587";
export const PAYMENT_PHONE = "03188154587";
export const PAYMENT_HOLDER_NAME = "RAFIULLAH";
export const BINANCE_ID = "73659173";
export const BRAND_SIGNATURE = "TwoStarTrader";

export const StudentExnessOnboarding: React.FC<StudentExnessOnboardingProps> = ({
  variant = "card",
  onDismiss,
}) => {
  const [copied, setCopied] = useState(false);
  const [hasCompleted, setHasCompleted] = useState<boolean>(() => {
    try {
      return localStorage.getItem("twostar_exness_account_created") === "true";
    } catch {
      return false;
    }
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(EXNESS_LINK);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggleCompleted = () => {
    const next = !hasCompleted;
    setHasCompleted(next);
    try {
      localStorage.setItem("twostar_exness_account_created", String(next));
    } catch {
      // ignore
    }
  };

  if (variant === "banner") {
    return (
      <div className="bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-amber-500/15 border-2 border-amber-500/40 rounded-2xl p-4 sm:p-5 text-slate-200 relative overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/25 text-amber-300 border border-amber-500/30">
                  Mandatory Step 1 For Enrolled Students
                </span>
                {hasCompleted && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <Check className="w-3 h-3" /> Account Ready
                  </span>
                )}
              </div>
              <h4 className="text-sm sm:text-base font-black text-white mt-1">
                Create Your Account &amp; Deposit Minimum $40 to Start Learning &amp; Earning
              </h4>
              <p className="text-xs text-slate-300 mt-0.5">
                First register on our official broker link:{" "}
                <span className="font-mono text-amber-300 select-all font-bold">{EXNESS_LINK}</span>. Then deposit minimum $40 to execute live setups with institutional guidance.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto shrink-0">
            <a
              href={EXNESS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition"
            >
              <span>Open Exness Account</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={handleCopy}
              className="px-3 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-semibold rounded-xl transition flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Link Copied" : "Copy Link"}</span>
            </button>

            <button
              type="button"
              onClick={handleToggleCompleted}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 border ${
                hasCompleted
                  ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-300"
                  : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{hasCompleted ? "Deposit Confirmed" : "Mark Deposited"}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Card Variant (default rich card)
  return (
    <div className="bg-gradient-to-br from-[#0c1322] via-[#0f172a] to-[#0c1322] border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center font-black text-xl shadow-lg">
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Official Student Onboarding Directive
              </span>
              <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                By TwoStarTrader
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              Required First Step for Every Enrolled Student
            </h3>
          </div>
        </div>

        {hasCompleted && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <CheckCircle2 className="w-4 h-4" />
            <span>Account &amp; $40 Deposit Completed</span>
          </div>
        )}
      </div>

      {/* Main Roadmap Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Step 1 */}
        <div className="bg-[#080d19] border border-amber-500/30 rounded-2xl p-5 space-y-3 relative group hover:border-amber-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center font-black text-xs">
              01
            </span>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Account Creation</span>
          </div>
          <h4 className="text-sm font-bold text-white">Create Account on Given Link</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            First, open your trading profile on our official institutional broker portal via the dedicated link below.
          </p>
          <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] font-mono text-amber-300 truncate">
            {EXNESS_LINK}
          </div>
        </div>

        {/* Step 2 */}
        <div className="bg-[#080d19] border border-emerald-500/30 rounded-2xl p-5 space-y-3 relative group hover:border-emerald-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-black text-xs">
              02
            </span>
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Capital Funding</span>
          </div>
          <h4 className="text-sm font-bold text-white">Deposit Minimum $40</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Fund your account with at least <strong>$40 USD</strong>. Supports EasyPaisa, JazzCash, Bank Cards, and Binance USDT instant deposit methods.
          </p>
          <div className="text-[11px] text-emerald-400 font-bold flex items-center gap-1.5 pt-1">
            <Coins className="w-3.5 h-3.5" />
            <span>Minimum Deposit: $40 USD</span>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-[#080d19] border border-indigo-500/30 rounded-2xl p-5 space-y-3 relative group hover:border-indigo-500/60 transition">
          <div className="flex items-center justify-between">
            <span className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-black text-xs">
              03
            </span>
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Execute &amp; Profit</span>
          </div>
          <h4 className="text-sm font-bold text-white">Start Learning &amp; Earning As Well</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Follow the curriculum lessons (ICT, CRT, SMC &amp; Price Action) and apply the exact setups in live market conditions to earn while you master trading!
          </p>
          <div className="text-[11px] text-indigo-300 font-bold flex items-center gap-1.5 pt-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Real Institutional Execution</span>
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="p-4 sm:p-5 bg-[#080d19] border border-slate-800 rounded-2xl flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-bold text-white">Direct Official Broker Link</span>
          </div>
          <p className="text-xs text-slate-400">
            Open in a new tab, complete your basic KYC verification, and deposit $40 to unlock 1-on-1 trade support.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={EXNESS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition"
          >
            <span>Create Exness Account</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            type="button"
            onClick={handleCopy}
            className="px-4 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? "Link Copied!" : "Copy Link"}</span>
          </button>

          <button
            type="button"
            onClick={handleToggleCompleted}
            className={`px-4 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 border ${
              hasCompleted
                ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{hasCompleted ? "Completed ($40 Deposited)" : "Mark as Completed"}</span>
          </button>
        </div>
      </div>

      {/* Support Section & Direct Contacts */}
      <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
        <div className="space-y-1">
          <div className="text-slate-400 flex items-center gap-2">
            <span className="font-bold text-slate-200">Need help setting up your account or deposit?</span>
            <span className="text-[10px] text-amber-400">Regard {BRAND_SIGNATURE}</span>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-300">
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="flex items-center gap-1.5 hover:text-emerald-400 transition"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>{SUPPORT_EMAIL}</span>
            </a>
            <a
              href={`tel:${SUPPORT_PHONE_1}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SUPPORT_PHONE_1}</span>
            </a>
            <a
              href={`tel:${SUPPORT_PHONE_2}`}
              className="flex items-center gap-1.5 hover:text-amber-400 transition"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{SUPPORT_PHONE_2}</span>
            </a>
            <a
              href={`https://wa.me/923110116709?text=Hello%20TwoStarTrader,%20I%20have%20enrolled%20in%20the%20Forex%20Academy%20and%20created%20my%20account.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-lg hover:bg-emerald-500/25 transition font-semibold"
            >
              WhatsApp Direct Chat
            </a>
          </div>
        </div>

        <div className="text-slate-500 text-[11px] shrink-0">
          Regard: <strong className="text-slate-300 font-bold">{BRAND_SIGNATURE}</strong>
        </div>
      </div>
    </div>
  );
};
