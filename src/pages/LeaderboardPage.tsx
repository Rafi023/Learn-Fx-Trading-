import React from "react";
import { GamificationLeaderboard } from "../components/GamificationLeaderboard";
import { Award, Zap, BookOpen, Play } from "lucide-react";

interface LeaderboardPageProps {
  onNavigate: (view: string, param?: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ onNavigate }) => {
  return (
    <div id="leaderboard-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fadeIn">
      {/* Top Banner Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
            Academy Honors & Rankings
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Hall of Fame & Gamification
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate("simulator")}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:brightness-110 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Trading Simulator</span>
          </button>
          <button
            onClick={() => onNavigate("courses")}
            className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-bold flex items-center gap-2 transition-all"
          >
            <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
            <span>Courses & Quizzes</span>
          </button>
        </div>
      </div>

      {/* Gamification and Leaderboard Component */}
      <GamificationLeaderboard />
    </div>
  );
};
