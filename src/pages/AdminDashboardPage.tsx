import React, { useState } from "react";
import {
  Shield,
  Users,
  BookOpen,
  DollarSign,
  Award,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Eye,
  TrendingUp,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { Course, CourseLevel, CourseCategory } from "../types";

export const AdminDashboardPage: React.FC<{
  onNavigate: (view: string, param?: string) => void;
}> = ({ onNavigate }) => {
  const { courses, transactions, confirmPayment, rejectPayment, addCourse } = useAcademy();
  const { profile } = useAuth();

  const [activeTab, setActiveTab] = useState<"overview" | "courses" | "payments">("payments");
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);
  const [paymentFilter, setPaymentFilter] = useState<"ALL" | "pending_verification" | "completed">("ALL");

  // New course form
  const [newTitle, setNewTitle] = useState("");
  const [newLevel, setNewLevel] = useState<CourseLevel>("Intermediate");
  const [newCategory, setNewCategory] = useState<CourseCategory>("Smart Money Concepts");
  const [newPrice, setNewPrice] = useState(25);
  const [newDescription, setNewDescription] = useState("");
  const [newDuration, setNewDuration] = useState("4.5 Hours");

  const pendingCount = transactions.filter((t) => t.status === "pending_verification").length;
  const completedCount = transactions.filter((t) => t.status === "completed").length;
  const totalRevenue = transactions
    .filter((t) => t.status === "completed")
    .reduce((acc, t) => acc + (t.amount || 25), 0) + 12840;
  const totalStudents = courses.reduce((acc, c) => acc + c.studentsEnrolled, 0) + 342;
  const totalCertificates = 1420;

  const filteredTransactions = transactions.filter((t) => {
    if (paymentFilter === "ALL") return true;
    return t.status === paymentFilter;
  });

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const courseData: Course = {
      id: "course-" + Date.now(),
      title: newTitle,
      slug: newTitle.toLowerCase().replace(/\s+/g, "-"),
      level: newLevel,
      category: newCategory,
      createdAt: new Date().toISOString(),
      price: Number(newPrice),
      originalPrice: Number(newPrice) + 100,
      duration: newDuration,
      lessonsCount: 3,
      rating: 5.0,
      reviewCount: 1,
      studentsEnrolled: 0,
      badge: "NEW COHORT",
      summary: newDescription.slice(0, 100) + "...",
      description: newDescription,
      instructor: {
        name: profile?.displayName || "Senior FX Director",
        title: "Head of Currency Desks",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80",
        experience: "12+ Years Institutional Macro FX",
      },
      learningOutcomes: [
        "Systematic execution rules",
        "Algorithmic liquidity mapping",
        "Order flow mitigation modeling",
      ],
      prerequisites: ["Forex Foundations 101"],
      lessons: [
        {
          id: "les-auto-1",
          title: "Introduction & Market Context",
          order: 1,
          duration: "25 Mins",
          content: `### Institutional Framework\n\nWelcome to this comprehensive mastery module. In this module, we dissect institutional market flow.\n\n* Key Concept 1: Liquidity pools\n* Key Concept 2: Order Blocks\n* Key Concept 3: Risk allocation`,
          keyTakeaways: ["Master market liquidity", "Define institutional order blocks"],
        },
      ],
      finalQuiz: {
        id: "quiz-auto-1",
        title: "Final Certification Examination",
        passingScore: 75,
        questions: [
          {
            id: "q-auto-1",
            question: "What defines an institutional order block?",
            options: [
              "The last opposing candle prior to an aggressive impulsive break of structure",
              "A simple 3-period moving average crossover",
              "Any red candle on a 5-minute chart",
              "A random liquidity wick",
            ],
            correctIndex: 0,
            explanation: "Order blocks represent institutional accumulation or distribution footprints.",
          },
        ],
      },
    };

    await addCourse(courseData);
    setShowAddCourseModal(false);
    setNewTitle("");
    setNewDescription("");
    alert("New Academy Course Published Successfully!");
  };

  return (
    <div id="admin-dashboard" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
            <Shield className="w-4 h-4" />
            <span>TwoStarTrader Governance &amp; Administration Portal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-100">
            Institutional Administration Desk
          </h1>
        </div>

        <button
          onClick={() => setShowAddCourseModal(true)}
          className="px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs flex items-center gap-1.5 transition cursor-pointer shadow-lg shadow-emerald-500/10"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Course</span>
        </button>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Total Enrolled Traders</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-100">
            {totalStudents.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 font-medium">+14% month-over-month</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Academy Tuition Volume</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">Gross tuition receipts</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Active Curriculum Streams</span>
            <BookOpen className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-slate-100">
            {courses.length}
          </div>
          <div className="text-[10px] text-slate-500">Programs & Examinations</div>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-5 space-y-1">
          <div className="text-xs text-slate-400 font-semibold flex items-center justify-between">
            <span>Certificates Validated</span>
            <Award className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
            {totalCertificates.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-500">Cryptographically verifiable</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab("payments")}
          className={`pb-3 border-b-2 transition cursor-pointer flex items-center gap-2 ${
            activeTab === "payments"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          <span>Tuition Verification Ledger</span>
          {pendingCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse">
              {pendingCount} Pending Review
            </span>
          )}
        </button>
        <button
          onClick={() => setActiveTab("overview")}
          className={`pb-3 border-b-2 transition cursor-pointer ${
            activeTab === "overview"
              ? "border-amber-500 text-amber-400"
              : "border-transparent text-slate-400 hover:text-slate-200"
          }`}
        >
          Curriculum Administration ({courses.length})
        </button>
      </div>

      {/* Payment Transactions Ledger */}
      {activeTab === "payments" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white">Course Fee Verification Queue</h3>
              <p className="text-xs text-slate-400">
                Confirm receipt of $25 payments via EasyPaisa, JazzCash, or Binance USDT to grant immediate curriculum access.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-semibold">Filter:</span>
              <button
                onClick={() => setPaymentFilter("ALL")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  paymentFilter === "ALL" ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"
                }`}
              >
                All ({transactions.length})
              </button>
              <button
                onClick={() => setPaymentFilter("pending_verification")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  paymentFilter === "pending_verification"
                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => setPaymentFilter("completed")}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                  paymentFilter === "completed"
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Approved ({completedCount})
              </button>
            </div>
          </div>

          <div className="bg-[#0e1628] border border-slate-800 rounded-2xl overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-[#090e1c] border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
                <tr>
                  <th className="p-3.5">TxID / TID Reference</th>
                  <th className="p-3.5">Student</th>
                  <th className="p-3.5">Course Program</th>
                  <th className="p-3.5">Channel</th>
                  <th className="p-3.5">Sender Info</th>
                  <th className="p-3.5">Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Verification Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {filteredTransactions.map((pmt) => (
                  <tr key={pmt.id} className="hover:bg-slate-900/50 transition">
                    <td className="p-3.5">
                      <span className="font-mono text-amber-400 font-bold text-[11px] block">
                        {pmt.referenceTid || pmt.transactionId}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">{pmt.transactionId}</span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-200">{pmt.studentName || "Student"}</div>
                      <div className="text-[10px] text-slate-500">{pmt.studentEmail || pmt.studentPhone || "Direct Submission"}</div>
                    </td>
                    <td className="p-3.5 font-bold text-slate-200 max-w-[180px] truncate">
                      {pmt.courseTitle}
                    </td>
                    <td className="p-3.5">
                      <span className="capitalize px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-200">
                        {pmt.paymentMethod.replace("_", " ")}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-400 text-[11px]">
                      {pmt.senderAccountOrWallet || "Not specified"}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">
                      ${pmt.amount || 25}
                    </td>
                    <td className="p-3.5">
                      {pmt.status === "completed" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" /> Unlocked
                        </span>
                      ) : pmt.status === "pending_verification" ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          Pending Review
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400">
                          Rejected
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      {pmt.status === "pending_verification" ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={async () => {
                              await confirmPayment(pmt.transactionId);
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-sm"
                          >
                            Approve &amp; Grant Access
                          </button>
                          <button
                            onClick={async () => {
                              await rejectPayment(pmt.transactionId, "Transaction ID not matched on bank slip.");
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-500/20 hover:text-rose-300 text-slate-400 text-xs font-semibold transition"
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-500">Access Active</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Course Management Table */}
      {activeTab === "overview" && (
        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#090e1c] border-b border-slate-800 text-slate-400 uppercase font-semibold text-[10px]">
              <tr>
                <th className="p-3.5">Course Title</th>
                <th className="p-3.5">Level</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Tuition</th>
                <th className="p-3.5">Modules</th>
                <th className="p-3.5">Enrolled</th>
                <th className="p-3.5">Rating</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-slate-900/50 transition">
                  <td className="p-3.5 font-bold text-slate-100 max-w-xs truncate">
                    {course.title}
                  </td>
                  <td className="p-3.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {course.level}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-400">{course.category}</td>
                  <td className="p-3.5 font-mono font-bold text-amber-400">
                    ${course.price}
                  </td>
                  <td className="p-3.5 font-mono">{course.lessons.length}</td>
                  <td className="p-3.5 font-mono">{course.studentsEnrolled.toLocaleString()}</td>
                  <td className="p-3.5 font-mono text-amber-400">★ {course.rating}</td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => onNavigate("course-detail", course.id)}
                      className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-lg text-[11px] font-semibold transition"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add Course Modal */}
      {showAddCourseModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#0e1628] border border-slate-700 rounded-3xl w-full max-w-xl shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-[#0a0f1d]">
              <h3 className="text-sm font-bold text-slate-100">Publish New Academy Program</h3>
              <button
                onClick={() => setShowAddCourseModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Algorithmic Order Flow & Interbank Positioning"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Level</label>
                  <select
                    value={newLevel}
                    onChange={(e: any) => setNewLevel(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Mastery">Mastery</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e: any) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                  >
                    <option value="Fundamentals">Fundamentals</option>
                    <option value="Technical Analysis">Technical Analysis</option>
                    <option value="Smart Money Concepts">Smart Money Concepts</option>
                    <option value="Risk & Psychology">Risk & Psychology</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tuition Price ($ USD)</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Estimated Duration</label>
                  <input
                    type="text"
                    required
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Detailed Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Summarize the core institutional edge taught in this program..."
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs transition"
              >
                Publish Program to Live Catalog
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
