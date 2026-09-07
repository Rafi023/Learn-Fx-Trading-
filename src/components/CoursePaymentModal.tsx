import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CreditCard,
  Smartphone,
  Coins,
  CheckCircle2,
  Copy,
  AlertCircle,
  FileText,
  Clock,
  Sparkles,
  ArrowRight,
  Upload,
  ExternalLink,
  Phone,
  Mail,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { Course, PaymentMethod } from "../types";
import {
  EXNESS_LINK,
  SUPPORT_EMAIL,
  SUPPORT_PHONE_1,
  SUPPORT_PHONE_2,
  PAYMENT_PHONE,
  PAYMENT_HOLDER_NAME,
  BINANCE_ID,
  BRAND_SIGNATURE,
} from "./StudentExnessOnboarding";

interface CoursePaymentModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const CoursePaymentModal: React.FC<CoursePaymentModalProps> = ({
  course,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { submitTuitionPayment, confirmPayment } = useAcademy();
  const { user, profile } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>("easypaisa");
  const [studentName, setStudentName] = useState(profile?.displayName || "");
  const [studentPhone, setStudentPhone] = useState(profile?.phone || "");
  const [senderAccount, setSenderAccount] = useState("");
  const [referenceTid, setReferenceTid] = useState("");
  const [proofFileName, setProofFileName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submittedTxnId, setSubmittedTxnId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referenceTid.trim()) {
      setErrorMsg("Please provide your Transaction ID (TID / TxID) from your payment receipt.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);

    try {
      const txn = await submitTuitionPayment({
        courseId: course.id,
        courseTitle: course.title,
        amount: 25, // Fixed $25 fee
        paymentMethod: selectedMethod,
        referenceTid: referenceTid.trim(),
        senderAccountOrWallet: senderAccount.trim() || undefined,
        studentName: studentName.trim() || profile?.displayName || "Student",
        studentPhone: studentPhone.trim() || undefined,
      });

      setSubmittedTxnId(txn.transactionId);
    } catch (err: any) {
      setErrorMsg(err?.message || "Failed to submit payment verification request.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInstantDemoApproval = async () => {
    if (!submittedTxnId) return;
    setSubmitting(true);
    try {
      await confirmPayment(submittedTxnId);
      if (onSuccess) onSuccess();
      onClose();
    } catch (err: any) {
      setErrorMsg("Failed to approve payment: " + err?.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-sm overflow-y-auto animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden my-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-amber-950/40 to-slate-900 p-6 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-bold">
              $25
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                  All-Inclusive Full Academy Pass
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  Not per Strategy
                </span>
              </div>
              <h3 className="text-lg font-bold text-white line-clamp-1 mt-1">TwoStarTrader Forex Academy Access</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Explicit Pricing Clarification Banner */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/15 via-emerald-500/15 to-indigo-500/15 border border-amber-500/30 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>$25 Covers the Entire Course &amp; All Strategies</span>
              </span>
              <span className="text-xs font-mono font-bold text-white bg-slate-950/80 px-2.5 py-1 rounded-lg border border-slate-800">
                $25 USD (Rs. 7,000 PKR / 25 USDT)
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed">
              This one-time <strong>$25 fee covers the WHOLE course</strong> including <strong>ICT, CRT, SMC, and Interbank Price Action</strong>, plus the interactive Trading Simulator and AI Mentor. <strong>You will NEVER be charged per strategy</strong>.
            </p>
          </div>

          {!submittedTxnId ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Prominent Official Payment Credentials Card */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-amber-500/10 via-slate-900 to-emerald-500/10 border-2 border-amber-500/30 shadow-xl space-y-3.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <span className="text-amber-400 font-black text-base">★</span>
                    <div>
                      <h4 className="text-xs font-black uppercase tracking-wider text-white">
                        Official Payment Recipient Details
                      </h4>
                      <p className="text-[11px] text-slate-400">
                        Send $25 USD (Rs. 7,000 PKR / 25 USDT) using any method below
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold self-start sm:self-auto">
                    <span>Fee: $25 (Full Academy)</span>
                  </div>
                </div>

                {/* 3 Quick Overview Cards for EasyPaisa, JazzCash, Binance */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {/* EasyPaisa Box */}
                  <div
                    onClick={() => setSelectedMethod("easypaisa")}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      selectedMethod === "easypaisa"
                        ? "bg-emerald-950/40 border-emerald-500 ring-1 ring-emerald-500/50"
                        : "bg-slate-950/80 border-slate-800 hover:border-emerald-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> EasyPaisa
                      </span>
                      <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded font-semibold">PKR</span>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Holder Name:</div>
                    <div className="text-xs font-bold text-white mb-1.5 tracking-wide">{PAYMENT_HOLDER_NAME}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">EasyPaisa Number:</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-mono font-bold text-emerald-300 text-xs">{PAYMENT_PHONE}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(PAYMENT_PHONE, "ep_top");
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-emerald-500/20 text-slate-300 hover:text-white transition"
                        title="Copy EasyPaisa Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* JazzCash Box */}
                  <div
                    onClick={() => setSelectedMethod("jazzcash")}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      selectedMethod === "jazzcash"
                        ? "bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/50"
                        : "bg-slate-950/80 border-slate-800 hover:border-amber-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-amber-400 flex items-center gap-1.5">
                        <Smartphone className="w-3.5 h-3.5" /> JazzCash
                      </span>
                      <span className="text-[10px] text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded font-semibold">PKR</span>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Holder Name:</div>
                    <div className="text-xs font-bold text-white mb-1.5 tracking-wide">{PAYMENT_HOLDER_NAME}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">JazzCash Number:</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-mono font-bold text-amber-300 text-xs">{PAYMENT_PHONE}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(PAYMENT_PHONE, "jc_top");
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-amber-500/20 text-slate-300 hover:text-white transition"
                        title="Copy JazzCash Number"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Binance ID Box */}
                  <div
                    onClick={() => setSelectedMethod("binance_crypto")}
                    className={`cursor-pointer p-3 rounded-xl border transition-all ${
                      selectedMethod === "binance_crypto"
                        ? "bg-yellow-950/40 border-yellow-500 ring-1 ring-yellow-500/50"
                        : "bg-slate-950/80 border-slate-800 hover:border-yellow-500/40"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-yellow-400 flex items-center gap-1.5">
                        <Coins className="w-3.5 h-3.5" /> Binance ID
                      </span>
                      <span className="text-[10px] text-yellow-400 bg-yellow-500/10 px-1.5 py-0.5 rounded font-semibold">USDT</span>
                    </div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Holder Name:</div>
                    <div className="text-xs font-bold text-white mb-1.5 tracking-wide">{PAYMENT_HOLDER_NAME}</div>
                    <div className="text-[10px] text-slate-400 uppercase font-semibold">Binance ID:</div>
                    <div className="flex items-center justify-between mt-0.5">
                      <span className="font-mono font-bold text-yellow-300 text-xs">{BINANCE_ID}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          copyToClipboard(BINANCE_ID, "b_top");
                        }}
                        className="p-1 rounded bg-slate-800 hover:bg-yellow-500/20 text-slate-300 hover:text-white transition"
                        title="Copy Binance ID"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {copied && (
                  <div className="text-[11px] text-emerald-400 font-medium text-center bg-emerald-500/10 py-1 rounded-lg border border-emerald-500/20">
                    Copied to clipboard successfully!
                  </div>
                )}
              </div>

              {/* Payment Method Selector Tabs */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Choose Submission Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMethod("easypaisa")}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedMethod === "easypaisa"
                        ? "bg-emerald-500/10 border-emerald-500 text-white shadow-lg shadow-emerald-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-sm text-emerald-400">EasyPaisa</span>
                      <Smartphone className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">03188154587</span>
                    <span className="text-[11px] text-slate-500">{PAYMENT_HOLDER_NAME}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod("jazzcash")}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedMethod === "jazzcash"
                        ? "bg-amber-500/10 border-amber-500 text-white shadow-lg shadow-amber-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-sm text-amber-400">JazzCash</span>
                      <Smartphone className="w-4 h-4 text-amber-400" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">03188154587</span>
                    <span className="text-[11px] text-slate-500">{PAYMENT_HOLDER_NAME}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedMethod("binance_crypto")}
                    className={`p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      selectedMethod === "binance_crypto"
                        ? "bg-yellow-500/10 border-yellow-500 text-white shadow-lg shadow-yellow-500/10"
                        : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-2">
                      <span className="font-bold text-sm text-yellow-400">Binance Pay</span>
                      <Coins className="w-4 h-4 text-yellow-400" />
                    </div>
                    <span className="text-xs text-slate-300 font-medium">ID: {BINANCE_ID}</span>
                    <span className="text-[11px] text-slate-500">{PAYMENT_HOLDER_NAME}</span>
                  </button>
                </div>
              </div>

              {/* Account Details Box for Selected Method */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Selected Payment Details
                  </span>
                  <span className="text-xs text-amber-400 font-medium">Exact Fee: $25 (Rs. 7,000)</span>
                </div>

                {selectedMethod === "easypaisa" && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Account Holder Name:</span>
                      <span className="font-bold text-white text-sm">{PAYMENT_HOLDER_NAME}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">EasyPaisa Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-emerald-400 text-sm">{PAYMENT_PHONE}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(PAYMENT_PHONE, "ep_no_detail")}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Copy EasyPaisa Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      Instructions: Open EasyPaisa App &gt; Send Money &gt; Transfer Rs. 7,000 to <strong className="text-emerald-400">{PAYMENT_PHONE}</strong> (Title: <strong className="text-white">{PAYMENT_HOLDER_NAME}</strong>) &gt; Note down the 11-digit TID and enter below.
                    </p>
                  </div>
                )}

                {selectedMethod === "jazzcash" && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Account Holder Name:</span>
                      <span className="font-bold text-white text-sm">{PAYMENT_HOLDER_NAME}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">JazzCash Number:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-amber-400 text-sm">{PAYMENT_PHONE}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(PAYMENT_PHONE, "jc_no_detail")}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Copy JazzCash Number"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-[11px] text-slate-400 pt-1 leading-relaxed">
                      Instructions: Open JazzCash App &gt; Money Transfer &gt; Transfer Rs. 7,000 to <strong className="text-amber-400">{PAYMENT_PHONE}</strong> (Title: <strong className="text-white">{PAYMENT_HOLDER_NAME}</strong>) &gt; Note down the TID from SMS.
                    </p>
                  </div>
                )}

                {selectedMethod === "binance_crypto" && (
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Account Holder Name:</span>
                      <span className="font-bold text-white text-sm">{PAYMENT_HOLDER_NAME}</span>
                    </div>
                    <div className="flex items-center justify-between bg-slate-900/60 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-slate-400 font-semibold">Binance ID:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-yellow-400 text-sm">{BINANCE_ID}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(BINANCE_ID, "b_id_detail")}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Copy Binance ID"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Currency &amp; Amount:</span>
                      <span className="font-bold text-yellow-400">25 USDT (Binance Pay or TRC-20)</span>
                    </div>
                    <div className="flex flex-col gap-1 pt-1">
                      <span className="text-slate-400">USDT Deposit Address (TRC20 Alternative):</span>
                      <div className="flex items-center justify-between bg-slate-900 p-2 rounded border border-slate-800">
                        <span className="font-mono text-[11px] text-amber-300 truncate mr-2">
                          TXg8zVbH1Y6WbM2xQwP9sV5RtL4jK9zX8b
                        </span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard("TXg8zVbH1Y6WbM2xQwP9sV5RtL4jK9zX8b", "b_addr")}
                          className="p-1 rounded bg-slate-800 text-slate-300 hover:text-white"
                          title="Copy TRC20 Address"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Fields: TID & Sender Details */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      Student Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Ali Khan"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-300 block mb-1">
                      WhatsApp / Phone Number
                    </label>
                    <input
                      type="text"
                      value={studentPhone}
                      onChange={(e) => setStudentPhone(e.target.value)}
                      placeholder="e.g. 03110116709"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Sender Account / Number / Wallet
                  </label>
                  <input
                    type="text"
                    value={senderAccount}
                    onChange={(e) => setSenderAccount(e.target.value)}
                    placeholder="Your EasyPaisa / JazzCash number or Binance Nickname"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-amber-400 block mb-1 flex items-center justify-between">
                    <span>Transaction ID / Reference (TID / TxID) *</span>
                    <span className="text-[10px] text-slate-400 font-normal">Found on receipt SMS or App</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={referenceTid}
                    onChange={(e) => setReferenceTid(e.target.value)}
                    placeholder="e.g. TID: 83920194821 or Crypto TxID"
                    className="w-full bg-slate-950 border border-amber-500/50 rounded-xl px-3.5 py-2.5 text-xs font-mono font-bold text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* File proof upload mock */}
                <div>
                  <label className="text-xs font-semibold text-slate-300 block mb-1">
                    Payment Receipt Slip / Screenshot (Optional)
                  </label>
                  <div className="border border-dashed border-slate-800 rounded-xl p-3 bg-slate-950 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <Upload className="w-4 h-4 text-slate-500" />
                      <span>{proofFileName || "Upload receipt slip image or PDF"}</span>
                    </div>
                    <label className="cursor-pointer px-3 py-1 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 rounded-lg transition-colors">
                      Browse
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            setProofFileName(e.target.files[0].name);
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-400 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl font-black text-sm bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {submitting ? "Verifying Submission..." : "Submit $25 Payment to Unlock Entire Academy"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* Confirmation Pending State with Required Exness Onboarding */
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Payment Submitted Successfully
                </span>
                <h4 className="text-xl font-black text-white mt-3">Full Course Pass Queued for Activation</h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 leading-relaxed">
                  Your $25 payment covers the <strong>entire curriculum and all strategies</strong>. Your submission ID is:
                </p>
                <div className="inline-block mt-2 font-mono font-bold text-sm text-amber-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                  {submittedTxnId}
                </div>
              </div>

              {/* Mandatory Student Step: Exness Account & $40 Deposit */}
              <div className="bg-gradient-to-br from-[#0c1424] to-[#0a101d] border-2 border-amber-500/40 rounded-2xl p-5 text-left space-y-3 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Next Mandatory Step for Enrolled Students</span>
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full">
                    Step 1
                  </span>
                </div>
                <h5 className="text-sm font-bold text-white">
                  Create Your Broker Account &amp; Deposit Minimum $40
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  First, create your trading account on our official partner link:{" "}
                  <strong className="text-amber-300 font-mono select-all">{EXNESS_LINK}</strong>. After this, deposit a minimum amount of <strong>$40 USD</strong> to start learning and earning real returns alongside your studies!
                </p>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <a
                    href={EXNESS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center gap-1.5 transition"
                  >
                    <span>Open Exness Account Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/923110116709?text=Hello%20TwoStarTrader,%20I%20have%20submitted%20my%20$25%20fee%20(TID:%20${referenceTid})%20and%20need%20onboarding%20guidance.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500/30 text-xs font-bold rounded-xl transition flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-emerald-400" />
                    <span>WhatsApp Support ({SUPPORT_PHONE_1})</span>
                  </a>
                </div>
              </div>

              {/* Instant Verification for Preview & Evaluation */}
              <div className="pt-2 border-t border-slate-800/80 max-w-md mx-auto space-y-3">
                <button
                  type="button"
                  onClick={handleInstantDemoApproval}
                  disabled={submitting}
                  className="w-full py-3 rounded-xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Activate Academy Pass Now (Instant Unlock)</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  Close and Return to Academy
                </button>
              </div>
            </div>
          )}

          {/* Academic Support Contact Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-400">
            <div className="flex flex-wrap items-center gap-2">
              <span>Support: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-emerald-400 hover:underline">{SUPPORT_EMAIL}</a></span>
              <span>•</span>
              <span>Phone: <a href={`tel:${SUPPORT_PHONE_1}`} className="text-amber-400 hover:underline">{SUPPORT_PHONE_1}</a>, <a href={`tel:${SUPPORT_PHONE_2}`} className="text-amber-400 hover:underline">{SUPPORT_PHONE_2}</a></span>
            </div>
            <div>
              Regard: <strong className="text-white font-bold">{BRAND_SIGNATURE}</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

