import React, { useState } from "react";
import {
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Building,
  Phone,
  ExternalLink,
  Sparkles,
  Coins,
} from "lucide-react";
import {
  SUPPORT_EMAIL,
  SUPPORT_PHONE_1,
  SUPPORT_PHONE_2,
  BRAND_SIGNATURE,
  EXNESS_LINK,
} from "../components/StudentExnessOnboarding";
import { useAcademy } from "../context/AcademyContext";

export const ContactPage: React.FC = () => {
  const { submitContactMessage } = useAcademy();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState("Admissions & Tuition Inquiry");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      let mappedType: "Curriculum" | "Mentorship" | "Payment" | "Technical" | "Enterprise" = "Curriculum";
      if (category.toLowerCase().includes("tuition") || category.toLowerCase().includes("payment")) {
        mappedType = "Payment";
      } else if (category.toLowerCase().includes("mentor")) {
        mappedType = "Mentorship";
      } else if (category.toLowerCase().includes("tech")) {
        mappedType = "Technical";
      }

      await submitContactMessage({
        name,
        email,
        subject: category,
        message,
        inquiryType: mappedType,
      });

      setIsSubmitted(true);
      setName("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      setErrorMessage(err?.message || "Failed to dispatch message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="contact-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
          <Building className="w-3.5 h-3.5" />
          <span>Official Support &amp; Admissions</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-100 tracking-tight">
          Academy Support &amp; Direct Contacts
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Reach out directly to Rafiullah &amp; the TwoStarTrader desk for course enrollment, tuition assistance, and Exness account onboarding support.
        </p>
      </div>

      {/* Direct Contact Cards by TwoStarTrader */}
      <div className="bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-indigo-500/10 border-2 border-amber-500/30 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-black text-lg">★</span>
              <h2 className="text-lg sm:text-xl font-black text-white">Direct Academic Contacts</h2>
            </div>
            <p className="text-xs text-slate-300">
              Personalized guidance for all students enrolled in TwoStarTrader Forex Academy.
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs font-bold text-slate-400">Official Sign-off:</span>
            <div className="text-sm font-black text-amber-400">Regard "{BRAND_SIGNATURE}"</div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Email */}
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-emerald-500/40 transition">
            <div className="flex items-center gap-2 text-emerald-400">
              <Mail className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Official Email</span>
            </div>
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="text-sm font-mono font-bold text-white hover:text-emerald-400 break-all transition block"
            >
              {SUPPORT_EMAIL}
            </a>
            <p className="text-[11px] text-slate-400">Direct inbox monitored 7 days a week.</p>
          </div>

          {/* Phone 1 */}
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-amber-500/40 transition">
            <div className="flex items-center gap-2 text-amber-400">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Phone / WhatsApp 1</span>
            </div>
            <a
              href={`tel:${SUPPORT_PHONE_1}`}
              className="text-base font-mono font-bold text-white hover:text-amber-400 transition block"
            >
              {SUPPORT_PHONE_1}
            </a>
            <a
              href={`https://wa.me/923110116709?text=Hello%20TwoStarTrader,%20I%20need%20assistance%20with%20the%20Forex%20Academy.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-bold hover:underline"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Phone 2 */}
          <div className="bg-[#080d19] border border-slate-800 rounded-2xl p-5 space-y-2 hover:border-indigo-500/40 transition">
            <div className="flex items-center gap-2 text-indigo-400">
              <Phone className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Phone / WhatsApp 2</span>
            </div>
            <a
              href={`tel:${SUPPORT_PHONE_2}`}
              className="text-base font-mono font-bold text-white hover:text-indigo-400 transition block"
            >
              {SUPPORT_PHONE_2}
            </a>
            <a
              href={`https://wa.me/923188154587?text=Hello%20TwoStarTrader,%20I%20need%20assistance%20with%20the%20Forex%20Academy.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-[11px] text-indigo-400 font-bold hover:underline"
            >
              <span>Chat on WhatsApp</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Pricing Guarantee Banner */}
        <div className="p-4 bg-emerald-950/25 border border-emerald-500/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              $25
            </div>
            <div>
              <div className="text-xs font-black text-white">Full Academy Access Guarantee</div>
              <p className="text-[11px] text-slate-300">
                The <strong>$25 course fee</strong> covers the WHOLE course with ALL strategies (ICT, CRT, SMC &amp; Price Action). Not charged per strategy.
              </p>
            </div>
          </div>

          <a
            href={EXNESS_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl flex items-center gap-1.5 transition shrink-0"
          >
            <span>Exness Partner Link</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Contact Form */}
        <div className="lg:col-span-7 bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Send an Official Message</h2>
            <p className="text-xs text-slate-400">Inquiries are reviewed directly by Rafiullah and academic support.</p>
          </div>

          {isSubmitted ? (
            <div className="p-6 bg-emerald-950/30 border border-emerald-500/40 rounded-2xl text-center space-y-3 animate-fadeIn">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Dispatch Received by Academic Desk</h3>
              <p className="text-xs text-slate-300">
                We will reply directly to your verified email or WhatsApp within a few hours. Regard "TwoStarTrader".
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-2 text-xs text-emerald-400 font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Khan"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@domain.com"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Department</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Course Enrollment & $25 Full Academy Fee">Course Enrollment &amp; $25 Full Academy Fee</option>
                  <option value="Exness Onboarding & $40 Deposit Guidance">Exness Onboarding &amp; $40 Deposit Guidance</option>
                  <option value="Curriculum & SMC/ICT Technical Queries">Curriculum &amp; SMC/ICT Technical Queries</option>
                  <option value="Certificate Verification Desk">Certificate Verification Desk</option>
                  <option value="General Support">General Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message Details</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide details about your query or enrollment status..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Dispatching..." : "Transmit Dispatch to TwoStarTrader"}</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Col: Session Hours & Exness Guide */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Enrolled Student Protocol</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-300">
              <div className="p-3.5 bg-amber-500/10 rounded-xl border border-amber-500/30 space-y-1.5">
                <div className="font-bold text-amber-300 flex items-center gap-1.5">
                  <span>1. Broker Registration Link</span>
                </div>
                <p className="text-slate-300 font-mono text-[11px] break-all select-all">
                  {EXNESS_LINK}
                </p>
                <p className="text-[11px] text-slate-400">
                  Must use this link for official academy tracking &amp; live trade signals.
                </p>
              </div>

              <div className="p-3.5 bg-emerald-500/10 rounded-xl border border-emerald-500/30 space-y-1.5">
                <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5" />
                  <span>2. Minimum Deposit: $40</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Deposit minimum $40 into your live trading account to begin active practical execution alongside course studies.
                </p>
              </div>

              <div className="p-3.5 bg-indigo-500/10 rounded-xl border border-indigo-500/30 space-y-1.5">
                <div className="font-bold text-indigo-300">
                  <span>3. Start Learning &amp; Earning</span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  Master ICT, CRT, SMC &amp; Price Action and apply them directly in market sessions.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 space-y-3">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Operational Session Support</span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300 p-2 bg-slate-900/60 rounded-lg">
                <span>London Session Support:</span>
                <span className="font-mono text-emerald-400 font-bold">08:00 – 17:00 GMT</span>
              </div>
              <div className="flex justify-between text-slate-300 p-2 bg-slate-900/60 rounded-lg">
                <span>New York Session Support:</span>
                <span className="font-mono text-indigo-400 font-bold">13:00 – 22:00 GMT</span>
              </div>
              <div className="flex justify-between text-slate-300 p-2 bg-slate-900/60 rounded-lg">
                <span>AI Trading Mentor (Gemini):</span>
                <span className="font-mono text-amber-400 font-bold">24/7 Real-Time Cloud</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
