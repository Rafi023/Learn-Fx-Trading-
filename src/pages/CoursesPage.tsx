import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  BookOpen,
  Star,
  Clock,
  Award,
  ChevronRight,
  CheckCircle2,
  Lock,
  Sparkles,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { Course } from "../types";

import { CoursePaymentModal } from "../components/CoursePaymentModal";

interface CoursesPageProps {
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (mode?: "login" | "register") => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate, onOpenAuth }) => {
  const { courses, hasCourseAccess, getCoursePaymentStatus } = useAcademy();
  const { user, profile, isEnrolled } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"popularity" | "rating" | "price_asc">("popularity");
  const [payingCourse, setPayingCourse] = useState<Course | null>(null);

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        const matchesSearch =
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesLevel = selectedLevel === "All" || c.level === selectedLevel;
        const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;

        return matchesSearch && matchesLevel && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === "popularity") return b.studentsEnrolled - a.studentsEnrolled;
        if (sortBy === "rating") return b.rating - a.rating;
        if (sortBy === "price_asc") return a.price - b.price;
        return 0;
      });
  }, [courses, searchQuery, selectedLevel, selectedCategory, sortBy]);

  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Institutional"];
  const categories = ["All", "ICT Strategy", "CRT Strategy", "Smart Money Concepts", "Price Action"];

  return (
    <div id="courses-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0d1424] via-[#101b33] to-[#0d1424] border border-slate-800 rounded-3xl p-8 sm:p-10 relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Institutional Curriculum</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight">
            Forex Trading Mastery Programs
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            All courses include structured lesson modules, high-resolution interactive candlestick diagrams, practical math exercises, final certification examinations, and AI mentor support.
          </p>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, SMC, pips, order blocks, candlesticks, instructor..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 text-xs sm:text-sm focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Sort selector */}
          <div className="flex items-center gap-2 shrink-0">
            <label className="text-xs font-semibold text-slate-400">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-slate-200 text-xs font-semibold focus:border-emerald-500 focus:outline-none"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price_asc">Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold mr-2">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Level:</span>
          </div>
          {levels.map((lvl) => (
            <button
              key={lvl}
              onClick={() => setSelectedLevel(lvl)}
              className={`px-3 py-1 rounded-lg font-medium transition cursor-pointer ${
                selectedLevel === lvl
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800"
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course) => {
          const enrolled = isEnrolled(course.id);
          const completed = profile?.completedCourseIds?.includes(course.id);
          const cert = profile?.certificates?.[course.id];

          return (
            <div
              key={course.id}
              className="bg-[#0e1628] border border-slate-800 hover:border-slate-700 rounded-3xl p-6 flex flex-col justify-between transition-all hover:shadow-xl hover:shadow-indigo-500/5 group"
            >
              <div className="space-y-4">
                {/* Top header */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                      {course.level}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {course.category}
                    </span>
                  </div>

                  {course.badge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {course.badge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h2 className="text-xl font-bold text-slate-100 group-hover:text-emerald-300 transition-colors leading-tight">
                    {course.title}
                  </h2>
                  <p className="text-xs text-slate-400 mt-2 line-clamp-3 leading-relaxed">
                    {course.description}
                  </p>
                </div>

                {/* Key Outcomes */}
                <div className="space-y-1.5 pt-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                    Core Learning Competencies:
                  </span>
                  {course.learningOutcomes.slice(0, 3).map((outcome, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{outcome}</span>
                    </div>
                  ))}
                </div>

                {/* Instructor & Meta */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2.5">
                    <img
                      src={course.instructor.avatar}
                      alt={course.instructor.name}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <div className="font-bold text-slate-200">{course.instructor.name}</div>
                      <div className="text-[10px] text-slate-500">{course.instructor.title}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 font-bold justify-end">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{course.rating}</span>
                      <span className="text-slate-500 font-normal">({course.reviewCount})</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{course.studentsEnrolled.toLocaleString()} enrolled</div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <div>
                  {course.price === 0 ? (
                    <span className="text-xl font-black text-emerald-400">FREE</span>
                  ) : (
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-black font-mono text-slate-100">${course.price}</span>
                      {course.originalPrice && (
                        <span className="text-xs text-slate-500 line-through font-mono">
                          ${course.originalPrice}
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onNavigate("course-detail", course.id)}
                    className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    Syllabus
                  </button>

                  {completed ? (
                    <button
                      onClick={() => onNavigate("course-detail", course.id)}
                      className="px-4 py-2 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4 text-emerald-400" />
                      <span>Graduated</span>
                    </button>
                  ) : hasCourseAccess(course.id) ? (
                    <button
                      onClick={() => onNavigate("lesson-view", `${course.id}:${course.lessons[0]?.id || "les-1"}`)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition cursor-pointer shadow-md shadow-emerald-600/20"
                    >
                      <span>Classroom</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : getCoursePaymentStatus(course.id) === "pending_verification" ? (
                    <button
                      onClick={() => setPayingCourse(course)}
                      className="px-3.5 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                      <span>Pending Review</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        if (!user && !profile) {
                          onOpenAuth("register");
                        } else {
                          setPayingCourse(course);
                        }
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 rounded-xl text-xs font-black shadow-lg shadow-amber-500/20 transition cursor-pointer flex items-center gap-1.5"
                    >
                      <Lock className="w-3 h-3" />
                      <span>Pay Payment ($25)</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Payment Checkout Modal */}
      {payingCourse && (
        <CoursePaymentModal
          course={payingCourse}
          isOpen={payingCourse !== null}
          onClose={() => setPayingCourse(null)}
          onSuccess={() => setPayingCourse(null)}
        />
      )}

      {filteredCourses.length === 0 && (
        <div className="text-center py-16 bg-[#0e1628] border border-slate-800 rounded-3xl space-y-3">
          <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No courses match your criteria</h3>
          <p className="text-xs text-slate-500">Try adjusting your keyword search or level filter.</p>
          <button
            onClick={() => { setSearchQuery(""); setSelectedLevel("All"); setSelectedCategory("All"); }}
            className="text-xs text-emerald-400 font-bold hover:underline"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
