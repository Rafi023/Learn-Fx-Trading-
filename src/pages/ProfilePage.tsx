import React, { useState } from "react";
import {
  User,
  Mail,
  Shield,
  Award,
  BookOpen,
  Save,
  CheckCircle2,
  Sparkles,
  RefreshCw,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { ExperienceLevel } from "../types";

export const ProfilePage: React.FC<{ onNavigate: (view: string, param?: string) => void }> = ({
  onNavigate,
}) => {
  const { profile, updateProfileData, signOutUser, signInDemo } = useAuth();

  const [displayName, setDisplayName] = useState(profile?.displayName || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    profile?.experienceLevel || "Beginner"
  );
  const [avatarSeed, setAvatarSeed] = useState(profile?.uid || "trader");
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateProfileData({
        displayName,
        bio,
        experienceLevel,
        avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    } catch (err) {
      alert("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const cycleAvatar = () => {
    const seeds = ["alpha", "delta", "pipmaster", "smc", "london", "liquidity", "bull", "sniper"];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + "_" + Date.now();
    setAvatarSeed(randomSeed);
  };

  return (
    <div id="profile-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-800 pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-100">Student Profile & Settings</h1>
        <p className="text-xs text-slate-400 mt-1">Manage your identity, trading experience, and security credentials.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Role Summary */}
        <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 text-center space-y-4">
          <div className="relative inline-block mx-auto">
            <img
              src={`https://api.dicebear.com/7.x/bottts/svg?seed=${avatarSeed}`}
              alt="avatar"
              className="w-24 h-24 rounded-2xl bg-slate-900 border-2 border-slate-700 mx-auto object-cover"
            />
            <button
              type="button"
              onClick={cycleAvatar}
              className="absolute -bottom-2 -right-2 p-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full transition shadow cursor-pointer"
              title="Generate new avatar"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-100">{profile?.displayName || "Trader"}</h2>
            <p className="text-xs text-slate-400 font-mono truncate">{profile?.email}</p>
          </div>

          <div className="pt-2 flex flex-wrap justify-center gap-2">
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              {profile?.role === "admin" ? "Academy Administrator" : "Verified Student"}
            </span>
            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
              {profile?.experienceLevel}
            </span>
          </div>

          {/* Quick Demo Switcher */}
          <div className="pt-4 border-t border-slate-800 space-y-2 text-left">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Quick Role Switch (Demo)
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => signInDemo("student")}
                className="py-1.5 text-center text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 rounded-lg border border-slate-800 transition"
              >
                Student
              </button>
              <button
                type="button"
                onClick={() => signInDemo("admin")}
                className="py-1.5 text-center text-xs bg-slate-900 hover:bg-slate-800 text-indigo-300 rounded-lg border border-slate-800 transition"
              >
                Admin Hub
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Edit Profile Form */}
        <div className="md:col-span-2 bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-4">
            {savedSuccess && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Profile preferences updated successfully.</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                value={profile?.email || ""}
                className="w-full px-3 py-2 bg-slate-900/60 border border-slate-800/80 rounded-xl text-slate-400 text-xs sm:text-sm cursor-not-allowed"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Managed by Firebase Authentication.</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Forex Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value as ExperienceLevel)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
              >
                <option value="Beginner">Beginner (Foundations & Pips)</option>
                <option value="Intermediate">Intermediate (Technical Analysis & Swing)</option>
                <option value="Advanced">Advanced (Smart Money Concepts & Order Flow)</option>
                <option value="Professional">Professional (Funded Desk Trader)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Trader Biography / Focus</label>
              <textarea
                rows={3}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="Describe your primary trading sessions, favorite currency pairs, or goals..."
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center gap-2 cursor-pointer shadow-lg shadow-emerald-500/20"
              >
                <Save className="w-4 h-4" />
                <span>{isSaving ? "Saving..." : "Save Preferences"}</span>
              </button>

              <button
                type="button"
                onClick={() => signOutUser()}
                className="px-4 py-2.5 text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1.5 transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
