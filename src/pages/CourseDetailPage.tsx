import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Star,
  Users,
  ShieldCheck,
  PlayCircle,
  HelpCircle,
  ChevronRight,
  Lock,
  Smartphone,
  Coins,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { CertificateData } from "../types";
import { CoursePaymentModal } from "../components/CoursePaymentModal";
import {
  PAYMENT_PHONE,
  PAYMENT_HOLDER_NAME,
  BINANCE_ID,
} from "../components/StudentExnessOnboarding";

interface CourseDetailPageProps {
  courseId: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenAuth: (mode?: "login" | "register") => void;
  onOpenCertificate: (cert: CertificateData) => void;
}

export const CourseDetailPage: React.FC<CourseDetailPageProps> = ({
  courseId,
  onNavigate,
  onOpenAuth,
  onOpenCertificate,
}) => {
  const { courses, hasCourseAccess, getCoursePaymentStatus, getCertificate } = useAcademy();
  const { user, profile, isLessonCompleted, isCourseCompleted } = useAuth();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const course = courses.find((c) => c.id === courseId) || courses[0];
  if (!course) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center text-slate-300">
        Course not found.
      </div>
    );
  }

  const accessGranted = hasCourseAccess(course.id);
  const paymentStatus = getCoursePaymentStatus(course.id);
  const completed = isCourseCompleted(course.id);
  const cert = getCertificate(course.id);

  const completedCount = course.lessons.filter((l) => isLessonCompleted(l.id)).length;
  const progressPercent = Math.round((completedCount / course.lessons.length) * 100);

  return (
    <div id="course-detail-page" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back button */}
      <button
        onClick={() => onNavigate("courses")}
        className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Curriculum Directory</span>
      </button>

      {/* Hero Banner */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-10 relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                {course.level} Level
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
                {course.category}
              </span>
              {course.badge && (
                <span className="text-xs font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1 rounded-full">
                  {course.badge}
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-slate-100 tracking-tight leading-snug">
              {course.title}
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {course.description}
            </p>

            {/* Metrics */}
            <div className="flex flex-wrap items-center gap-6 pt-2 text-xs text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-1.5 font-medium">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="text-slate-200 font-bold">{course.rating}</span>
                <span>({course.reviewCount.toLocaleString()} reviews)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" />
                <span>{course.studentsEnrolled.toLocaleString()} Students Enrolled</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-400" />
                <span>{course.duration} Total Duration</span>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div className="bg-[#090e1c] border border-slate-700/80 rounded-2xl p-6 space-y-5 shadow-xl">
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Tuition & Access</div>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl font-black text-amber-400 font-mono">$25</span>
                <span className="text-xs text-slate-400 font-normal">USD One-Time Fee</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                Supports EasyPaisa, JazzCash (Pakistan) and Binance Crypto (USDT).
              </p>
            </div>

            {/* Supported Payment Badges with Recipient Information */}
            <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Accepted Payment Methods
                </span>
                <span className="text-[10px] text-amber-400 font-mono font-bold">Holder: {PAYMENT_HOLDER_NAME}</span>
              </div>
              <div className="grid grid-cols-1 gap-1.5 text-[11px]">
                <div className="px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-400" /> EasyPaisa
                  </span>
                  <span className="font-mono font-bold">{PAYMENT_PHONE}</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Smartphone className="w-3.5 h-3.5 text-amber-400" /> JazzCash
                  </span>
                  <span className="font-mono font-bold">{PAYMENT_PHONE}</span>
                </div>
                <div className="px-2.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-bold">
                    <Coins className="w-3.5 h-3.5 text-yellow-400" /> Binance ID
                  </span>
                  <span className="font-mono font-bold">{BINANCE_ID}</span>
                </div>
              </div>
            </div>

            {accessGranted && (
              <div className="space-y-2 p-3 bg-slate-900 rounded-xl border border-slate-800">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Your Progress</span>
                  <span className="text-emerald-400 font-mono">{progressPercent}%</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <div className="text-[10px] text-slate-400 text-right">
                  {completedCount} of {course.lessons.length} lessons completed
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-2.5">
              {accessGranted ? (
                <>
                  <button
                    onClick={() => {
                      const firstUncompleted =
                        course.lessons.find((l) => !isLessonCompleted(l.id)) || course.lessons[0];
                      onNavigate("lesson-view", `${course.id}:${firstUncompleted.id}`);
                    }}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
                  >
                    <PlayCircle className="w-4 h-4" />
                    <span>Enter Interactive Lessons</span>
                  </button>

                  <button
                    onClick={() => onNavigate("quiz", course.id)}
                    className="w-full py-2.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Award className="w-4 h-4 text-amber-400" />
                    <span>Take Certification Exam</span>
                  </button>

                  {cert && (
                    <button
                      onClick={() => onOpenCertificate(cert)}
                      className="w-full py-2 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs transition flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Award className="w-4 h-4" />
                      <span>View Official Certificate</span>
                    </button>
                  )}
                </>
              ) : paymentStatus === "pending_verification" ? (
                <button
                  onClick={() => setIsPaymentModalOpen(true)}
                  className="w-full py-3.5 bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Payment Pending Review (Check Status)</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    if (!user && !profile) {
                      onOpenAuth("register");
                    } else {
                      setIsPaymentModalOpen(true);
                    }
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-sm transition shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Lock className="w-4 h-4" />
                  <span>Pay Payment ($25)</span>
                </button>
              )}
            </div>

            {/* Guarantees */}
            <div className="pt-3 border-t border-slate-800/80 space-y-2 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Full Lifetime Curriculum Access</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Verified Cryptographic Certificate</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
                <span>Self-Paced Flexible Modules</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Details: What you'll learn & Prerequisites */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Target Learning Outcomes</span>
          </h3>
          <ul className="space-y-2.5">
            {course.learningOutcomes.map((outcome, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0"></span>
                <span>{outcome}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-6 space-y-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-indigo-400" />
            <span>Course Prerequisites</span>
          </h3>
          <ul className="space-y-2.5">
            {course.prerequisites.map((req, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0"></span>
                <span>{req}</span>
              </li>
            ))}
          </ul>

          <div className="pt-4 border-t border-slate-800">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              Lead Instructor
            </div>
            <div className="flex items-center gap-3">
              <img
                src={course.instructor.avatar}
                alt={course.instructor.name}
                className="w-12 h-12 rounded-xl object-cover border border-slate-700"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-100">{course.instructor.name}</h4>
                <p className="text-xs text-emerald-400">{course.instructor.title}</p>
                <p className="text-[10px] text-slate-400 mt-0.5">{course.instructor.experience}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Syllabus Lesson List */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-xl font-bold text-slate-100">Course Syllabus & Curriculum</h3>
            <p className="text-xs text-slate-400">
              {course.lessons.length} Modules • Complete all lessons to unlock the Final Certification Exam
            </p>
          </div>
        </div>

        <div className="space-y-3">
          {course.lessons.map((lesson, index) => {
            const isDone = isLessonCompleted(lesson.id);

            return (
              <div
                key={lesson.id}
                className="bg-[#090e1c] border border-slate-800 hover:border-slate-700 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4 transition"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                      isDone
                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {isDone ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-slate-200">{lesson.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {lesson.duration}
                      </span>
                      <span>•</span>
                      <span>{lesson.keyTakeaways.length} Key Competencies</span>
                    </div>
                  </div>
                </div>

                <div>
                  {accessGranted ? (
                    <button
                      onClick={() => onNavigate("lesson-view", `${course.id}:${lesson.id}`)}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1"
                    >
                      <span>{isDone ? "Review" : "Study"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  ) : (
                    <div className="p-2 text-slate-600">
                      <Lock className="w-4 h-4" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Final Quiz Card */}
          <div className="bg-gradient-to-r from-indigo-950/30 to-amber-950/20 border border-indigo-500/30 rounded-xl p-4 sm:p-5 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs shrink-0">
                <Award className="w-4 h-4" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm sm:text-base font-bold text-amber-300">
                    Final Exam: {course.finalQuiz.title}
                  </h4>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                    Passing: {course.finalQuiz.passingScore}%
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  {course.finalQuiz.questions.length} Rigorous Multiple Choice Questions • Instant Certificate on Passing
                </p>
              </div>
            </div>

            <div>
              {accessGranted ? (
                <button
                  onClick={() => onNavigate("quiz", course.id)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer flex items-center gap-1.5"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Start Exam</span>
                </button>
              ) : (
                <div className="p-2 text-slate-600">
                  <Lock className="w-4 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Course Payment Modal */}
      <CoursePaymentModal
        course={course}
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        onSuccess={() => setIsPaymentModalOpen(false)}
      />
    </div>
  );
};
