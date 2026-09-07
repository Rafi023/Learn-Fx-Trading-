import React, { useState } from "react";
import {
  TrendingUp,
  BookOpen,
  LayoutDashboard,
  Bot,
  Mail,
  Shield,
  Calculator,
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Award,
  Sparkles,
  FileText,
  Zap,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenCalculator: () => void;
  onOpenAIMentor: () => void;
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenCalculator,
  onOpenAIMentor,
  onOpenAuth,
}) => {
  const { user, profile, signOutUser } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAdmin = profile?.role === "admin" || user?.email === "khrafiullah2@gmail.com";

  const handleNav = (view: string, param?: string) => {
    onNavigate(view, param);
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav id="academy-navbar" className="bg-[#080d1a]/95 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-600 to-emerald-500 p-0.5 shadow-lg shadow-amber-500/20 transition group-hover:scale-105">
              <div className="w-full h-full bg-[#090e1c] rounded-[10px] flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-amber-400 group-hover:text-emerald-400 transition-colors" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg text-white tracking-tight">TWOSTARTRADER</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded">
                  PRO
                </span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold tracking-widest block uppercase -mt-0.5">
                Forex Academy
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-1.5">
            <button
              onClick={() => handleNav("home")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                currentView === "home"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav("courses")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                currentView === "courses"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Strategies</span>
            </button>

            {/* Trading Simulator Link */}
            <button
              onClick={() => handleNav("simulator")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                currentView === "simulator"
                  ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>FX Simulator</span>
            </button>

            {/* Leaderboard Link */}
            <button
              onClick={() => handleNav("leaderboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                currentView === "leaderboard"
                  ? "bg-slate-800 text-amber-300 border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Leaderboard</span>
            </button>

            <button
              onClick={() => handleNav("dashboard")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                currentView === "dashboard"
                  ? "bg-slate-800 text-white border border-slate-700"
                  : "text-slate-300 hover:text-white hover:bg-slate-850"
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
              <span>Student Desk</span>
            </button>

            <button
              onClick={onOpenAIMentor}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400" />
              <span>AI Mentor</span>
              <Sparkles className="w-3 h-3 text-amber-400" />
            </button>

            {isAdmin && (
              <button
                onClick={() => handleNav("admin")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  currentView === "admin"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-amber-400/80 hover:text-amber-300 hover:bg-slate-800"
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Hub</span>
              </button>
            )}
          </div>

          {/* Right Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {profile && (
              <div
                onClick={() => handleNav("leaderboard")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold font-mono cursor-pointer hover:bg-amber-500/20 transition-colors shadow-sm"
                title="Your TwoStarTrader XP Points"
              >
                <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{profile.points || 100} XP</span>
              </div>
            )}

            {/* Lot Calculator Action */}
            <button
              onClick={onOpenCalculator}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-700/80 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
              title="Position Size & Risk Calculator"
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Risk Calc</span>
            </button>

            {profile ? (
              /* User Profile Dropdown */
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition cursor-pointer"
                >
                  <img
                    src={profile.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.uid}`}
                    alt="avatar"
                    className="w-7 h-7 rounded-lg object-cover bg-slate-800"
                  />
                  <div className="text-left hidden lg:block">
                    <div className="text-xs font-bold text-slate-200 leading-tight truncate max-w-[100px]">
                      {profile.displayName || "Trader"}
                    </div>
                    <div className="text-[10px] text-emerald-400 font-mono capitalize leading-tight">
                      {profile.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0f172a] border border-slate-700/90 rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-slate-200 truncate">{profile.displayName}</p>
                      <p className="text-[10px] text-slate-400 font-mono truncate">{profile.email}</p>
                    </div>

                    <button
                      onClick={() => handleNav("dashboard")}
                      className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Student Dashboard</span>
                    </button>

                    <button
                      onClick={() => handleNav("profile")}
                      className="w-full px-4 py-2 text-left text-xs text-slate-300 hover:bg-slate-800 hover:text-white flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Profile & Settings</span>
                    </button>

                    {isAdmin && (
                      <button
                        onClick={() => handleNav("admin")}
                        className="w-full px-4 py-2 text-left text-xs text-amber-300 hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
                      >
                        <Shield className="w-3.5 h-3.5 text-amber-400" />
                        <span>Admin Dashboard</span>
                      </button>
                    )}

                    <div className="my-1 border-t border-slate-800"></div>

                    <button
                      onClick={() => {
                        signOutUser();
                        setDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-xs text-rose-400 hover:bg-rose-500/10 flex items-center gap-2 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Auth action buttons */
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenAuth("login")}
                  className="px-3.5 py-1.5 text-xs font-bold text-slate-300 hover:text-white rounded-xl transition cursor-pointer"
                >
                  Sign In
                </button>
                <button
                  onClick={() => onOpenAuth("register")}
                  className="px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold shadow-md shadow-emerald-500/10 transition cursor-pointer"
                >
                  Enroll Free
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenCalculator}
              className="p-2 text-slate-300 hover:text-emerald-400"
              title="Position Size Calculator"
            >
              <Calculator className="w-5 h-5 text-emerald-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0f1d] border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          <button
            onClick={() => handleNav("home")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => handleNav("courses")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Strategies & Courses</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </button>
          <button
            onClick={() => handleNav("simulator")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-amber-300 hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              FX Simulator (Sandbox)
            </span>
            <TrendingUp className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNav("leaderboard")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Leaderboard & Badges</span>
            <Award className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => handleNav("dashboard")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Student Dashboard</span>
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
          </button>
          <button
            onClick={() => {
              onOpenAIMentor();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-indigo-300 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>AI Trading Mentor</span>
            <Bot className="w-4 h-4 text-indigo-400" />
          </button>
          <button
            onClick={() => handleNav("contact")}
            className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-200 hover:bg-slate-800 flex items-center justify-between"
          >
            <span>Contact & Support</span>
            <Mail className="w-4 h-4 text-slate-400" />
          </button>

          {isAdmin && (
            <button
              onClick={() => handleNav("admin")}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-amber-300 hover:bg-slate-800 flex items-center justify-between"
            >
              <span>Admin Hub</span>
              <Shield className="w-4 h-4 text-amber-400" />
            </button>
          )}

          <div className="pt-3 border-t border-slate-800/80">
            {profile ? (
              <div className="space-y-2">
                <button
                  onClick={() => handleNav("profile")}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-slate-400" />
                  <span>My Profile ({profile.displayName})</span>
                </button>
                <button
                  onClick={() => {
                    signOutUser();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm font-semibold text-rose-400 hover:bg-rose-500/10 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("login");
                  }}
                  className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold"
                >
                  Sign In
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAuth("register");
                  }}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold"
                >
                  Enroll Free
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
