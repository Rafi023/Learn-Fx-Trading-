import React, { useState } from "react";
import { X, Mail, Lock, User, Sparkles, Shield, AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ExperienceLevel } from "../types";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const {
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInDemo,
    resetUserPassword,
    error,
    clearError,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>("Beginner");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetSuccess, setResetSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsSubmitting(true);

    try {
      if (mode === "login") {
        await signInWithEmail(email, password);
        onClose();
      } else if (mode === "register") {
        await signUpWithEmail(email, password, displayName, experienceLevel);
        onClose();
      } else if (mode === "forgot") {
        await resetUserPassword(email);
        setResetSuccess(true);
      }
    } catch (err) {
      // error is handled in context
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoLogin = async (role: "student" | "admin") => {
    clearError();
    setIsSubmitting(true);
    try {
      await signInDemo(role);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fadeIn">
      <div 
        id="auth-modal" 
        className="bg-[#0e1628] border border-slate-700/80 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-[#0a0f1d]">
          <div>
            <h2 className="text-base font-bold text-slate-100">
              {mode === "login" && "Student & Trader Sign In"}
              {mode === "register" && "Create Academy Account"}
              {mode === "forgot" && "Reset Password"}
            </h2>
            <p className="text-xs text-slate-400">Linguatech Trading Academy Portal</p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="bg-gradient-to-r from-indigo-950/40 via-emerald-950/30 to-indigo-950/40 border-b border-slate-800/80 p-3">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Instant 1-Click Evaluation Accounts
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("student")}
              disabled={isSubmitting}
              className="py-1.5 px-3 bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <span>Demo Student</span>
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("admin")}
              disabled={isSubmitting}
              className="py-1.5 px-3 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 rounded-lg text-indigo-300 text-xs font-semibold transition flex items-center justify-center gap-1 cursor-pointer"
            >
              <Shield className="w-3 h-3" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Form Area */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/30 rounded-xl text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {resetSuccess ? (
            <div className="text-center py-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-100">Recovery Instructions Dispatched</h3>
              <p className="text-xs text-slate-400">
                If an account exists for <strong>{email}</strong>, you will receive password reset instructions.
              </p>
              <button
                type="button"
                onClick={() => { setMode("login"); setResetSuccess(false); }}
                className="mt-2 text-xs text-indigo-400 font-semibold hover:underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      placeholder="e.g. Marcus Vance"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="trader@example.com"
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                  />
                </div>
              </div>

              {mode !== "forgot" && (
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    {mode === "login" && (
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-[11px] text-indigo-400 hover:underline"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-100 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {mode === "register" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Current FX Experience</label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-sm focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="Beginner">Beginner (0-6 months, learning basics)</option>
                    <option value="Intermediate">Intermediate (6-24 months, technical analysis)</option>
                    <option value="Advanced">Advanced (2+ years, Smart Money / Order Flow)</option>
                    <option value="Professional">Professional / Prop Firm Funded</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>
                  {mode === "login" && "Sign In to Terminal"}
                  {mode === "register" && "Create Student Profile"}
                  {mode === "forgot" && "Send Reset Link"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Google Sign In option */}
              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-800"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-[#0e1628] px-2 text-slate-500 font-semibold">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => signInWithGoogle()}
                disabled={isSubmitting}
                className="w-full py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Sign in with Google</span>
              </button>
            </form>
          )}

          {/* Switch mode links */}
          <div className="mt-5 text-center text-xs text-slate-400">
            {mode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => { clearError(); setMode("register"); }}
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  Register now
                </button>
              </p>
            ) : (
              <p>
                Already registered?{" "}
                <button
                  onClick={() => { clearError(); setMode("login"); }}
                  className="text-indigo-400 font-semibold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
