import React, { useState } from "react";
import {
  TrendingUp,
  Award,
  ShieldCheck,
  Bot,
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Users,
  Zap,
  Star,
  DollarSign,
  ChevronRight,
  PlayCircle,
  HelpCircle,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { Course } from "../types";

interface HomePageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenCalculator: () => void;
  onOpenAIMentor: () => void;
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenCalculator,
  onOpenAIMentor,
  onOpenAuth,
}) => {
  const { courses } = useAcademy();
  const { profile, isEnrolled } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes TwoStarTrader Forex Academy different from typical retail courses?",
      a: "We do not teach retail indicator lag (like 3-EMA crossovers or basic trendlines). Our curriculum focuses on institutional liquidity manipulation, ICT (Inner Circle Trader concepts like Judas Swings and Silver Bullets), SMC (Smart Money Concepts), CRT (Candle Range Theory), and pure Price Action which actually work in the real market."
    },
    {
      q: "How does tuition and payment work?",
      a: "Full academy access is available for a one-time tuition fee of just $25 USD. We support local and international payment methods including EasyPaisa, JazzCash (Pakistan), and Binance Crypto (USDT). Once you submit your transaction reference ID, your account is verified and courses are immediately unlocked."
    },
    {
      q: "How does the TwoStarTrader AI Trading Mentor work?",
      a: "Our AI Mentor is integrated via a secure server-side architecture with Google's Gemini models. It acts as an institutional trading copilot that answers technical queries, critiques your chart setups, validates invalidation levels, and breaks down complex macroeconomic central bank releases."
    },
    {
      q: "Does TwoStarTrader include an interactive simulator and gamification?",
      a: "Yes! Students can practice on our real-time Forex Trading Simulator with live price tick feeds, real-time P&L tracking, and leverage execution. You also earn XP points and unlock milestone badges on the student leaderboard as you complete lessons, quizzes, and profitable simulation trades."
    }
  ];

  return (
    <div id="home-page" className="space-y-16 sm:space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow backdrop */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-gradient-to-r from-emerald-500/10 via-indigo-500/15 to-amber-500/10 blur-3xl -z-10 rounded-full pointer-events-none"></div>

        <div className="text-center max-w-4xl mx-auto space-y-6">
          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-700/80 text-xs font-semibold text-slate-300 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Institutional Currency Curriculum & Live Market Desk</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-100 tracking-tight leading-[1.1]">
            Master Institutional <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-indigo-400">
              Foreign Exchange Trading
            </span>
          </h1>

          {/* Subtext */}
          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Move beyond retail traps. Decode order flow liquidity, master Smart Money Concepts (SMC), engineer mathematical risk architecture, and earn accredited trader certificates.
          </p>

          {/* Primary CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onNavigate("courses")}
              className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Explore Curriculum</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onOpenAIMentor}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-900/90 hover:bg-slate-850 text-slate-200 border border-slate-700 rounded-xl text-sm font-bold transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <Bot className="w-4 h-4 text-indigo-400" />
              <span>Ask AI Trading Mentor</span>
            </button>

            <button
              onClick={onOpenCalculator}
              className="w-full sm:w-auto px-5 py-3.5 bg-slate-900/60 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-xl text-sm font-semibold transition flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Position Calculator</span>
            </button>
          </div>

          {/* Trust Metrics Bar */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left border-t border-slate-800/80 max-w-3xl mx-auto">
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
              <div className="text-xl sm:text-2xl font-black font-mono text-emerald-400">21,000+</div>
              <div className="text-xs text-slate-400 font-medium">Students Enrolled</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
              <div className="text-xl sm:text-2xl font-black font-mono text-indigo-400">4.94 / 5.0</div>
              <div className="text-xs text-slate-400 font-medium">Academy Rating</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
              <div className="text-xl sm:text-2xl font-black font-mono text-amber-400">94.2%</div>
              <div className="text-xs text-slate-400 font-medium">Funded Prop Pass Rate</div>
            </div>
            <div className="p-3 bg-slate-900/40 rounded-xl border border-slate-800/50">
              <div className="text-xl sm:text-2xl font-black font-mono text-slate-200">100%</div>
              <div className="text-xs text-slate-400 font-medium">Verified Certificates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Courses Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
              Curriculum Roadmap
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
              Institutional Training Programs
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Structured step-by-step from currency basics to algorithmic Smart Money Concepts.
            </p>
          </div>
          <button
            onClick={() => onNavigate("courses")}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 self-start md:self-auto cursor-pointer"
          >
            <span>View All Courses & Syllabi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {courses.map((course) => {
            const enrolled = isEnrolled(course.id);
            const isCompleted = profile?.completedCourseIds?.includes(course.id);

            return (
              <div
                key={course.id}
                className="bg-[#0e1628] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/5 group"
              >
                <div>
                  {/* Badge & Level */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {course.level}
                    </span>
                    {course.badge && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {course.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-300 transition-colors line-clamp-2 leading-snug">
                    {course.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {course.summary}
                  </p>

                  {/* Highlights */}
                  <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Duration:</span>
                      <span className="font-semibold">{course.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Lessons:</span>
                      <span className="font-semibold">{course.lessonsCount} Master Lessons</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Rating:</span>
                      <span className="font-semibold text-amber-400 flex items-center gap-1">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {course.rating}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Pricing & Action */}
                <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    {course.price === 0 ? (
                      <div className="text-base font-black text-emerald-400">FREE</div>
                    ) : (
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-lg font-black text-slate-100 font-mono">${course.price}</span>
                        {course.originalPrice && (
                          <span className="text-xs text-slate-500 line-through font-mono">
                            ${course.originalPrice}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => onNavigate("course-detail", course.id)}
                    className="px-3.5 py-1.5 text-xs font-bold rounded-xl transition cursor-pointer flex items-center gap-1 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white"
                  >
                    {isCompleted ? (
                      <span>Completed</span>
                    ) : enrolled ? (
                      <span>Continue</span>
                    ) : (
                      <span>View Course</span>
                    )}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* The 4 Institutional Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-[#0e1628] to-[#090f1d] border border-slate-800 rounded-3xl p-8 sm:p-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              The TwoStarTrader Edge
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
              Why Institutional Traders Outperform Retail
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2">
              Retail trading is engineered around lagging indicators. TwoStarTrader trains you in the actual structural mechanics that dictate price movement: ICT, CRT, SMC, and Price Action.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Smart Money Order Flow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spot where institutional stops are hunted, decode Order Blocks, Fair Value Gaps, and trade alongside Tier-1 liquidity providers.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Strict Risk Architecture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Fixed 1% capital preservation, 2-loss daily circuit breakers, and asymmetric 1:3+ Risk-to-Reward expectancy modeling.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Gemini AI Market Copilot</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Server-side AI mentor available 24/7 to review your setups, explain macroeconomic catalysts, and calculate position formulas.
              </p>
            </div>

            <div className="p-5 bg-slate-900/60 rounded-2xl border border-slate-800">
              <div className="w-10 h-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400 mb-4">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-100 mb-1">Verifiable Certification</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Pass rigorous quizzes to earn cryptographic certificates of competence suitable for prop firm evaluations and professional desks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-1">
            Graduation Wall
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            Real Traders. Institutional Results.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-[#0e1628] border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "Before TwoStarTrader, I blew three $50k prop firm challenges relying on lagging indicators. The ICT Silver Bullet and SMC Order Block masterclasses changed everything. I am now fully funded with an FTMO $200,000 account."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80"
                alt="student"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Liam Henderson</h4>
                <p className="text-[10px] text-emerald-400 font-semibold">$200K Funded Prop Trader (UK)</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0e1628] border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The AI Mentor is unlike anything I've seen. Being able to type my London session trade idea and get a sharp institutional breakdown of where the liquidity was resting saved me from two huge fakeouts this week."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&auto=format&fit=crop&q=80"
                alt="student"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Sarah Al-Qasimi</h4>
                <p className="text-[10px] text-indigo-400 font-semibold">Macro Currency Analyst (Dubai)</p>
              </div>
            </div>
          </div>

          <div className="p-6 bg-[#0e1628] border border-slate-800 rounded-2xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
              "The quizzes are genuinely challenging and the Certificate generation is instant. When you pass the exam at 80%+, you know you actually understand the mathematics of pips and drawdown recovery."
            </p>
            <div className="flex items-center gap-3 pt-2 border-t border-slate-800">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80"
                alt="student"
                className="w-10 h-10 rounded-full object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-200">Mateo Silva</h4>
                <p className="text-[10px] text-emerald-400 font-semibold">Full-Time FX Trader (Singapore)</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-1">
            Common Inquiries
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-100">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-[#0e1628] border border-slate-800 rounded-xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 hover:bg-slate-850 transition cursor-pointer"
                >
                  <span className="text-sm font-bold text-slate-200">{faq.q}</span>
                  <span className="text-slate-400 text-lg font-bold">{isOpen ? "−" : "+"}</span>
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs text-slate-400 leading-relaxed border-t border-slate-800/80">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950/40 via-indigo-950/50 to-slate-900 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Begin Your Institutional FX Journey Today
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Enroll in our free starter curriculum, practice in the live interbank trade journal, and consult with our AI trading mentor.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={() => onNavigate("courses")}
                className="px-8 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-sm transition shadow-xl cursor-pointer"
              >
                Explore Courses Now
              </button>
              <button
                onClick={() => onOpenAuth("register")}
                className="px-8 py-3.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 font-bold rounded-xl text-sm transition cursor-pointer"
              >
                Create Student Account
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
