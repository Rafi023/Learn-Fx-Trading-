import React, { useMemo } from "react";
import {
  Trophy,
  Award,
  Zap,
  Target,
  Medal,
  CheckCircle2,
  Lock,
  Flame,
  ArrowUpRight,
  TrendingUp,
  Sparkles,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { LeaderboardTrader } from "../types";

export const GamificationLeaderboard: React.FC = () => {
  const { badges, leaderboard, simAccount } = useAcademy();
  const { profile } = useAuth();

  const userPoints = profile?.points || 100;
  const userBadgesCount = (profile?.earnedBadges || []).length;
  const userProfit = simAccount.totalRealizedPnL;

  // Insert or rank current user in the leaderboard
  const combinedLeaderboard = useMemo(() => {
    const list: LeaderboardTrader[] = [...leaderboard];
    const userEntry: LeaderboardTrader = {
      rank: 99,
      uid: profile?.uid || "current-user",
      displayName: (profile?.displayName || "You (Trader)") + " ⭐️",
      avatarUrl: profile?.avatarUrl || "https://api.dicebear.com/7.x/bottts/svg?seed=user",
      points: userPoints,
      level:
        userPoints >= 4000
          ? "Institutional Operator"
          : userPoints >= 2500
          ? "SMC Architect"
          : userPoints >= 1000
          ? "Liquidity Scout"
          : "Pip Apprentice",
      badgesCount: userBadgesCount,
      quizAverage: Object.values(profile?.quizScores || {}).length > 0
        ? Math.round(
            (Object.values(profile?.quizScores || {}) as number[]).reduce((a: number, b: number) => a + b, 0) /
              (Object.values(profile?.quizScores || {}).length || 1)
          )
        : 85,
      simProfit: userProfit > 0 ? userProfit : 0,
      winRate: simAccount.winRate || 65,
      country: profile?.country || "Global",
    };

    // Replace if existing or insert and re-sort
    const filtered = list.filter((t) => t.uid !== userEntry.uid);
    filtered.push(userEntry);

    filtered.sort((a, b) => b.points - a.points);
    return filtered.map((item, idx) => ({
      ...item,
      rank: idx + 1,
    }));
  }, [leaderboard, profile, userPoints, userBadgesCount, userProfit, simAccount.winRate]);

  return (
    <div id="gamification-root" className="space-y-8">
      {/* Top Banner: User Progress & Level */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/40 rounded-2xl border border-amber-500/20 p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-inner">
              <Trophy className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {userPoints >= 3000 ? "Elite Trader Tier" : "Active Academy Scholar"}
                </span>
                <span className="flex items-center gap-1 text-xs text-emerald-400 font-semibold">
                  <Flame className="w-3.5 h-3.5 fill-emerald-400" /> +50 XP Streak Active
                </span>
              </div>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                Trader Achievement & XP Hub
              </h2>
              <p className="text-sm text-slate-400 max-w-xl">
                Earn verifiable milestone badges, unlock prestige titles, and climb the institutional leaderboard as you master ICT, CRT, and SMC.
              </p>
            </div>
          </div>

          {/* Quick Score Counter */}
          <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800">
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Total XP</span>
              <span className="text-2xl font-black text-amber-400 font-mono">{userPoints}</span>
            </div>
            <div className="text-center px-3 border-r border-slate-800">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Badges</span>
              <span className="text-2xl font-black text-emerald-400 font-mono">{userBadgesCount} / {badges.length}</span>
            </div>
            <div className="text-center px-3">
              <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Sim PnL</span>
              <span className={`text-2xl font-black font-mono ${userProfit >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                ${userProfit.toFixed(0)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Milestone Badges</span>
            </h3>
            <p className="text-xs text-slate-400">Accomplish key trading milestones to collect exclusive honors</p>
          </div>
          <span className="text-xs font-semibold text-amber-400">
            {userBadgesCount} of {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((badge) => {
            const isEarned = Boolean(badge.unlockedAt);
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                  isEarned
                    ? "bg-slate-900/90 border-amber-500/30 shadow-lg shadow-amber-500/5"
                    : "bg-slate-900/40 border-slate-800/80 opacity-70"
                }`}
              >
                {isEarned && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Unlocked</span>
                  </div>
                )}
                {!isEarned && (
                  <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-800 text-slate-500 text-[10px] font-bold">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </div>
                )}

                <div>
                  <div className="text-3xl mb-2">{badge.icon}</div>
                  <h4 className="text-sm font-bold text-white">{badge.title}</h4>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{badge.description}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-mono font-bold">+{badge.points} XP</span>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider">{badge.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Global Academy Leaderboard */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-400" />
              <span>TwoStarTrader Global Leaderboard</span>
            </h3>
            <p className="text-xs text-slate-400">Rankings updated dynamically across quiz mastery and simulator execution</p>
          </div>
          <div className="text-xs text-slate-400">
            Global Students Active: <span className="font-mono text-white font-bold">1,480+</span>
          </div>
        </div>

        <div className="bg-slate-900/60 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-4 font-bold">Rank</th>
                  <th className="py-3.5 px-4 font-bold">Trader</th>
                  <th className="py-3.5 px-4 font-bold">Level Title</th>
                  <th className="py-3.5 px-4 font-bold">Country</th>
                  <th className="py-3.5 px-4 font-bold">Badges</th>
                  <th className="py-3.5 px-4 font-bold">Win Rate</th>
                  <th className="py-3.5 px-4 font-bold">Sim PnL</th>
                  <th className="py-3.5 px-4 font-bold text-right">XP Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {combinedLeaderboard.map((trader) => {
                  const isCurrentUser = trader.uid === profile?.uid || trader.displayName.includes("⭐️");
                  return (
                    <tr
                      key={trader.uid}
                      className={`transition-colors ${
                        isCurrentUser
                          ? "bg-amber-500/10 hover:bg-amber-500/15 font-semibold"
                          : "hover:bg-slate-800/40"
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          {trader.rank === 1 && (
                            <span className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-xs shadow-md shadow-amber-400/30">
                              🥇
                            </span>
                          )}
                          {trader.rank === 2 && (
                            <span className="w-6 h-6 rounded-full bg-slate-300 text-slate-950 font-black flex items-center justify-center text-xs">
                              🥈
                            </span>
                          )}
                          {trader.rank === 3 && (
                            <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black flex items-center justify-center text-xs">
                              🥉
                            </span>
                          )}
                          {trader.rank > 3 && (
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-400 font-mono font-bold flex items-center justify-center text-xs">
                              #{trader.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={trader.avatarUrl}
                            alt={trader.displayName}
                            className="w-8 h-8 rounded-full border border-slate-700 object-cover"
                          />
                          <div>
                            <span className="font-bold text-white block">{trader.displayName}</span>
                            {isCurrentUser && (
                              <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                                Your Profile
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800 text-slate-300 border border-slate-700">
                          {trader.level}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-400 font-medium">{trader.country}</td>
                      <td className="py-3.5 px-4">
                        <span className="text-emerald-400 font-mono font-bold">🎖️ {trader.badgesCount}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-300">{trader.winRate}%</td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                        +${trader.simProfit.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <span className="font-black text-amber-400 font-mono text-sm">
                          {trader.points.toLocaleString()} XP
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
