import React, { useState } from "react";
import {
  BookOpen,
  Award,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Plus,
  Trash2,
  PlayCircle,
  Clock,
  Sparkles,
  User,
  ShieldCheck,
  Eye,
  DollarSign,
  PieChart,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { CertificateData, TradeLog } from "../types";
import { ForexSimulator } from "../components/ForexSimulator";
import { GamificationLeaderboard } from "../components/GamificationLeaderboard";

interface StudentDashboardPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenCertificate: (cert: CertificateData) => void;
  onOpenAIMentor: () => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({
  onNavigate,
  onOpenCertificate,
  onOpenAIMentor,
}) => {
  const { courses, tradeLogs, addTradeLog, deleteTradeLog, simPositions } = useAcademy();
  const { profile, isLessonCompleted, isCourseCompleted } = useAuth();

  const [activeTab, setActiveTab] = useState<"courses" | "simulator" | "gamification" | "journal" | "certificates">("courses");
  const [showNewTradeModal, setShowNewTradeModal] = useState(false);

  // New trade form state
  const [newPair, setNewPair] = useState("EUR/USD");
  const [newDirection, setNewDirection] = useState<"BUY" | "SELL">("BUY");
  const [newEntry, setNewEntry] = useState<number>(1.0850);
  const [newExit, setNewExit] = useState<number>(1.0890);
  const [newSL, setNewSL] = useState<number>(1.0825);
  const [newTP, setNewTP] = useState<number>(1.0890);
  const [newLots, setNewLots] = useState<number>(0.5);
  const [newStrategy, setNewStrategy] = useState("Order Block Mitigation (SMC)");
  const [newNotes, setNewNotes] = useState("");
  const [newStatus, setNewStatus] = useState<"WON" | "LOST" | "OPEN">("WON");

  const enrolledCourses = courses.filter((c) =>
    profile?.enrolledCourseIds?.includes(c.id) || profile?.role === "admin"
  );

  // Journal analytics
  const wonTrades = tradeLogs.filter((t) => t.status === "WON");
  const lostTrades = tradeLogs.filter((t) => t.status === "LOST");
  const winRate = tradeLogs.length > 0
    ? Math.round((wonTrades.length / (wonTrades.length + lostTrades.length || 1)) * 100)
    : 0;
  const netPnL = tradeLogs.reduce((acc, t) => acc + (t.pnl || 0), 0);

  const certificatesList: CertificateData[] = Object.values(profile?.certificates || {});

  const handleCreateTrade = async (e: React.FormEvent) => {
    e.preventDefault();
    const pipsCalc = Math.abs(Number(((newExit - newEntry) * 10000).toFixed(1)));
    const calculatedPnl =
      newStatus === "WON"
        ? Math.round(pipsCalc * (newLots * 10))
        : newStatus === "LOST"
        ? -Math.round(pipsCalc * (newLots * 10))
        : 0;

    await addTradeLog({
      pair: newPair,
      direction: newDirection,
      entryPrice: Number(newEntry),
      exitPrice: Number(newExit),
      stopLoss: Number(newSL),
      takeProfit: Number(newTP),
      lotSize: Number(newLots),
      pips: pipsCalc,
      pnl: calculatedPnl,
      status: newStatus,
      strategy: newStrategy,
      notes: newNotes,
    });

    setShowNewTradeModal(false);
    setNewNotes("");
  };

  return (
    <div id="student-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Student Welcome Header */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <img
            src={profile?.avatarUrl || `https://api.dicebear.com/7.x/bottts/svg?seed=${profile?.uid || "demo"}`}
            alt="avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-700 bg-slate-800 shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-100">
                {profile?.displayName || "Trader Workspace"}
              </h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 capitalize">
                {profile?.experienceLevel || "Intermediate"} Trader
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              {profile?.bio || "Tracking institutional liquidity and executing systematic risk architecture."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => onNavigate("profile")}
            className="flex-1 md:flex-initial px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition"
          >
            Edit Profile
          </button>
          <button
            onClick={onOpenAIMentor}
            className="flex-1 md:flex-initial px-4 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Consult AI Mentor</span>
          </button>
        </div>
      </div>

      {/* Analytics KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Enrolled Programs</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100">
            {enrolledCourses.length}
          </div>
          <div className="text-[10px] text-slate-500">Active Curriculum Streams</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>TwoStar XP Points</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-black font-mono text-amber-400">
            {profile?.points || 100}
          </div>
          <div className="text-[10px] text-slate-500">Tier: {(profile?.points || 100) >= 1000 ? "Diamond" : (profile?.points || 100) >= 500 ? "Gold" : "Silver"}</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Simulator Balance</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ${(profile?.simulatorBalance || 10000).toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">{simPositions.length} Open Positions</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 space-y-1">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Completed Lessons</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-black font-mono text-slate-100">
            {profile?.completedLessonIds?.length || 0}
          </div>
          <div className="text-[10px] text-slate-500">Mastery modules passed</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 space-y-1 col-span-2 lg:col-span-1">
          <div className="text-xs font-semibold text-slate-400 flex items-center justify-between">
            <span>Badges & Certs</span>
            <Award className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-black font-mono text-indigo-400">
            {(profile?.earnedBadges?.length || 1)} Badges
          </div>
          <div className="text-[10px] text-slate-500">{certificatesList.length} Diplomas Verified</div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex flex-wrap border-b border-slate-800 gap-2 sm:gap-6 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab("courses")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "courses"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>My Courses ({enrolledCourses.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("simulator")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "simulator"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Trading Simulator</span>
          {simPositions.length > 0 && (
            <span className="px-1.5 py-0.2 text-[10px] rounded-full bg-emerald-500/20 text-emerald-300">
              {simPositions.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("gamification")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "gamification"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Award className="w-4 h-4 text-amber-400" />
          <span>XP & Leaderboard</span>
        </button>

        <button
          onClick={() => setActiveTab("journal")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "journal"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Trade Journal ({tradeLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("certificates")}
          className={`pb-3 border-b-2 transition flex items-center gap-2 cursor-pointer ${
            activeTab === "certificates"
              ? "border-emerald-500 text-emerald-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <Award className="w-4 h-4" />
          <span>Certificates ({certificatesList.length})</span>
        </button>
      </div>

      {/* Tab 1: My Courses */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {enrolledCourses.map((course) => {
              const completedCount = course.lessons.filter((l) => isLessonCompleted(l.id)).length;
              const progress = Math.round((completedCount / course.lessons.length) * 100);
              const isDone = isCourseCompleted(course.id);
              const cert = profile?.certificates?.[course.id];

              return (
                <div
                  key={course.id}
                  className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {course.level}
                      </span>
                      {isDone && (
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Graduated
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-100">{course.title}</h3>

                    {/* Progress Bar */}
                    <div className="space-y-1.5 pt-2">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-400">Curriculum Progress</span>
                        <span className="text-emerald-400 font-mono">{progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full bg-emerald-500 transition-all duration-500"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                      <div className="text-[10px] text-slate-500 text-right">
                        {completedCount} of {course.lessons.length} lessons completed
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-800 flex items-center justify-between gap-3">
                    <button
                      onClick={() => {
                        const firstUncompleted =
                          course.lessons.find((l) => !isLessonCompleted(l.id)) || course.lessons[0];
                        onNavigate("lesson-view", `${course.id}:${firstUncompleted.id}`);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <PlayCircle className="w-4 h-4" />
                      <span>{progress === 0 ? "Start Course" : "Resume Lessons"}</span>
                    </button>

                    <button
                      onClick={() => onNavigate("quiz", course.id)}
                      className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition cursor-pointer"
                    >
                      Exam
                    </button>

                    {cert && (
                      <button
                        onClick={() => onOpenCertificate(cert)}
                        className="px-3.5 py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                      >
                        <Award className="w-3.5 h-3.5" />
                        <span>Certificate</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {enrolledCourses.length === 0 && (
            <div className="text-center py-12 bg-[#0e1628] border border-slate-800 rounded-3xl space-y-3">
              <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">You are not yet enrolled in any programs</h3>
              <p className="text-xs text-slate-500">Explore our professional ICT, CRT, SMC and Price Action curriculum ($25 full course access).</p>
              <button
                onClick={() => onNavigate("courses")}
                className="px-5 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20"
              >
                Browse Curriculum & Enroll
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Forex Simulator */}
      {activeTab === "simulator" && (
        <div className="space-y-6">
          <ForexSimulator />
        </div>
      )}

      {/* Tab: Gamification & Leaderboard */}
      {activeTab === "gamification" && (
        <div className="space-y-6">
          <GamificationLeaderboard />
        </div>
      )}

      {/* Tab: Trade Journal */}
      {activeTab === "journal" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-100">Interbank Practice Trade Journal</h3>
              <p className="text-xs text-slate-400">
                Log and analyze your setups, R:R discipline, and emotional composure notes.
              </p>
            </div>
            <button
              onClick={() => setShowNewTradeModal(true)}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-md shadow-emerald-500/10"
            >
              <Plus className="w-4 h-4" />
              <span>Log New Trade</span>
            </button>
          </div>

          {/* Trade Table */}
          <div className="bg-[#0e1628] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#090e1c] border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">Date</th>
                  <th className="p-3.5">Pair</th>
                  <th className="p-3.5">Type</th>
                  <th className="p-3.5">Entry / Exit</th>
                  <th className="p-3.5">Lots</th>
                  <th className="p-3.5">Pips</th>
                  <th className="p-3.5">PnL ($)</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5">Strategy & Notes</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {tradeLogs.map((trade) => {
                  const isWon = trade.status === "WON";
                  return (
                    <tr key={trade.id} className="hover:bg-slate-900/50 transition">
                      <td className="p-3.5 font-mono text-slate-400">{trade.date}</td>
                      <td className="p-3.5 font-bold text-slate-100">{trade.pair}</td>
                      <td className="p-3.5">
                        <span
                          className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                            trade.direction === "BUY"
                              ? "bg-emerald-500/20 text-emerald-300"
                              : "bg-rose-500/20 text-rose-300"
                          }`}
                        >
                          {trade.direction}
                        </span>
                      </td>
                      <td className="p-3.5 font-mono">
                        {trade.entryPrice} → {trade.exitPrice || "-"}
                      </td>
                      <td className="p-3.5 font-mono">{trade.lotSize}</td>
                      <td className="p-3.5 font-mono font-semibold">
                        {trade.pips ? `${trade.pips}p` : "-"}
                      </td>
                      <td className="p-3.5 font-mono font-bold">
                        <span className={isWon ? "text-emerald-400" : "text-rose-400"}>
                          {trade.pnl ? (trade.pnl > 0 ? `+$${trade.pnl}` : `-$${Math.abs(trade.pnl)}`) : "$0"}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            trade.status === "WON"
                              ? "bg-emerald-500/20 text-emerald-400"
                              : trade.status === "LOST"
                              ? "bg-rose-500/20 text-rose-400"
                              : "bg-amber-500/20 text-amber-400"
                          }`}
                        >
                          {trade.status}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-xs truncate" title={trade.notes}>
                        <span className="font-semibold text-slate-200">{trade.strategy}: </span>
                        <span className="text-slate-400">{trade.notes}</span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => deleteTradeLog(trade.id)}
                          className="text-slate-500 hover:text-rose-400 p-1 rounded transition cursor-pointer"
                          title="Delete trade"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Certificates */}
      {activeTab === "certificates" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificatesList.map((cert) => (
              <div
                key={cert.certificateId}
                className="bg-[#0e1628] border border-amber-500/30 rounded-3xl p-6 flex flex-col justify-between space-y-4 hover:border-amber-500/60 transition"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Award className="w-4 h-4" />
                      <span>Certified Competence</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">{cert.issuedAt}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-100">{cert.courseTitle}</h3>

                  <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Student:</span>
                      <span className="font-bold text-slate-200">{cert.studentName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Score & Grade:</span>
                      <span className="font-bold text-emerald-400">{cert.score}% ({cert.grade})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Verification Hash:</span>
                      <span className="font-mono text-[10px] text-slate-400 truncate max-w-[150px]">{cert.verificationHash}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => onOpenCertificate(cert)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View & Print Official Certificate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {certificatesList.length === 0 && (
            <div className="text-center py-12 bg-[#0e1628] border border-slate-800 rounded-3xl space-y-3">
              <Award className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-slate-300">No certificates earned yet</h3>
              <p className="text-xs text-slate-500">
                Complete all course modules and achieve a 75%+ score on the final exam to earn your certificate.
              </p>
            </div>
          )}
        </div>
      )}

      {/* New Trade Dialog Modal */}
      {showNewTradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e1628] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
              <h3 className="text-sm font-bold text-slate-100">Log Practice Trade</h3>
              <button
                onClick={() => setShowNewTradeModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateTrade} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Pair</label>
                  <select
                    value={newPair}
                    onChange={(e) => setNewPair(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="EUR/USD">EUR/USD</option>
                    <option value="GBP/USD">GBP/USD</option>
                    <option value="USD/JPY">USD/JPY</option>
                    <option value="USD/CAD">USD/CAD</option>
                    <option value="AUD/USD">AUD/USD</option>
                    <option value="XAU/USD">XAU/USD (Gold)</option>
                    <option value="GBP/JPY">GBP/JPY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setNewDirection("BUY")}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        newDirection === "BUY"
                          ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      BUY
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewDirection("SELL")}
                      className={`py-1.5 text-xs font-bold rounded-lg border transition ${
                        newDirection === "SELL"
                          ? "bg-rose-500/20 border-rose-500 text-rose-300"
                          : "bg-slate-900 border-slate-800 text-slate-400"
                      }`}
                    >
                      SELL
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Entry Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newEntry}
                    onChange={(e) => setNewEntry(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Exit Price</label>
                  <input
                    type="number"
                    step="0.0001"
                    required
                    value={newExit}
                    onChange={(e) => setNewExit(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Lot Size</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newLots}
                    onChange={(e) => setNewLots(Number(e.target.value))}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Outcome</label>
                  <select
                    value={newStatus}
                    onChange={(e: any) => setNewStatus(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs"
                  >
                    <option value="WON">Take Profit Hit (WON)</option>
                    <option value="LOST">Stop Loss Hit (LOST)</option>
                    <option value="OPEN">Open Position</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Strategy Framework</label>
                  <input
                    type="text"
                    value={newStrategy}
                    onChange={(e) => setNewStrategy(e.target.value)}
                    placeholder="e.g. London Sweep, Order Block"
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Trade Execution Notes</label>
                <textarea
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="Rationale for entry, emotional state, confluence factors..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs transition"
              >
                Save Trade Entry
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
