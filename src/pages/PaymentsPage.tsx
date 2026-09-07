import React, { useState } from "react";
import {
  ArrowLeft,
  CreditCard,
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Sparkles,
  QrCode,
  DollarSign,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";

interface PaymentsPageProps {
  courseId: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const PaymentsPage: React.FC<PaymentsPageProps> = ({
  courseId,
  onNavigate,
  onOpenAuth,
}) => {
  const { courses, enrollInCourse } = useAcademy();
  const { user, profile } = useAuth();

  const course = courses.find((c) => c.id === courseId) || courses[1]; // fallback to course 2
  const [paymentMethod, setPaymentMethod] = useState<"card" | "crypto" | "paypal">("card");

  // Card form state
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCvc, setCardCvc] = useState("888");
  const [billingName, setBillingName] = useState(profile?.displayName || "Marcus Vance");
  const [billingCountry, setBillingCountry] = useState("United Kingdom");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleProcessPayment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user && !profile) {
      onOpenAuth("register");
      return;
    }

    setIsProcessing(true);
    try {
      await enrollInCourse(
        course.id,
        paymentMethod === "card" ? "credit_card" : paymentMethod === "crypto" ? "crypto" : "paypal",
        course.price
      );
      setIsSuccess(true);
    } catch (err) {
      alert("Payment processing error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6 animate-fadeIn">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <div className="space-y-2">
          <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
            Enrollment Confirmed & Lifetime Access Activated
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Welcome to {course.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Your payment receipt has been issued and the course curriculum has been added to your Student Desk.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={() => onNavigate("lesson-view", `${course.id}:${course.lessons[0].id}`)}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 cursor-pointer"
          >
            Enter Classroom Now
          </button>
          <button
            onClick={() => onNavigate("dashboard")}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition cursor-pointer"
          >
            Go to Student Desk
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="payments-page" className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back button */}
      <button
        onClick={() => onNavigate("course-detail", course.id)}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Course Details</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Payment Method & Form */}
        <div className="lg:col-span-7 bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-xl font-black text-slate-100">Checkout & Tuition Enrollment</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure 256-Bit SSL Encrypted Institutional Transaction
            </p>
          </div>

          {/* Payment Method Selector */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setPaymentMethod("card")}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                paymentMethod === "card"
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <CreditCard className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs block">Credit Card</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("crypto")}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                paymentMethod === "crypto"
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <QrCode className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs block">USDT / Crypto</span>
            </button>

            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`p-3 rounded-2xl border text-center transition cursor-pointer ${
                paymentMethod === "paypal"
                  ? "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold"
                  : "bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700"
              }`}
            >
              <DollarSign className="w-5 h-5 mx-auto mb-1" />
              <span className="text-xs block">PayPal</span>
            </button>
          </div>

          <form onSubmit={handleProcessPayment} className="space-y-4">
            {paymentMethod === "card" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    required
                    value={billingName}
                    onChange={(e) => setBillingName(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Card Number</label>
                  <div className="relative">
                    <CreditCard className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Expiry Date</label>
                    <input
                      type="text"
                      required
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">Security CVC</label>
                    <input
                      type="text"
                      required
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      placeholder="CVC"
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Billing Country</label>
                  <input
                    type="text"
                    required
                    value={billingCountry}
                    onChange={(e) => setBillingCountry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {paymentMethod === "crypto" && (
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">USDT (TRC-20 Network)</span>
                  <span className="text-emerald-400 font-mono font-bold">${course.price}.00 USDT</span>
                </div>
                <div className="p-2.5 bg-slate-900 rounded-xl font-mono text-[11px] text-slate-300 break-all select-all border border-slate-800">
                  TLngTechFX99x8d7a6e5b4c3v210987654321
                </div>
                <p className="text-[11px] text-slate-400">
                  Send exactly ${course.price} USDT to the address above. Verification occurs automatically via blockchain confirmation.
                </p>
              </div>
            )}

            {paymentMethod === "paypal" && (
              <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800 text-center space-y-2">
                <p className="text-xs text-slate-300">
                  You will be connected to PayPal's one-click merchant checkout to confirm payment of{" "}
                  <strong className="text-white">${course.price}</strong>.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black rounded-xl text-sm transition shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              <Lock className="w-4 h-4" />
              <span>
                {isProcessing ? "Authorizing Tuition..." : `Complete Enrollment ($${course.price})`}
              </span>
            </button>
          </form>

          {/* Guarantees */}
          <div className="pt-4 border-t border-slate-800 grid grid-cols-2 gap-3 text-[11px] text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>14-Day Money Back Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-400 shrink-0" />
              <span>PCI-DSS Level 1 Secure</span>
            </div>
          </div>
        </div>

        {/* Right Col: Order Summary */}
        <div className="lg:col-span-5 bg-[#090e1c] border border-slate-700/80 rounded-3xl p-6 sm:p-8 space-y-5">
          <h3 className="text-base font-bold text-slate-100">Tuition Order Summary</h3>

          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
              {course.level} Program
            </span>
            <h4 className="text-sm font-bold text-slate-100 leading-snug">{course.title}</h4>
            <div className="text-xs text-slate-400">
              {course.lessons.length} Modules • Lifetime Academy Access • Verified Certificate
            </div>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Standard Academy Tuition:</span>
              <span className="font-mono line-through">${course.originalPrice || course.price + 100}</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>Early Admission Scholar Discount:</span>
              <span className="font-mono">
                -${(course.originalPrice || course.price + 100) - course.price}
              </span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Examination & Verification Fee:</span>
              <span className="font-mono text-emerald-400">INCLUDED ($0)</span>
            </div>
            <div className="pt-3 border-t border-slate-800 flex justify-between text-base font-black text-slate-100">
              <span>Total Due:</span>
              <span className="text-emerald-400 font-mono text-xl">${course.price}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
