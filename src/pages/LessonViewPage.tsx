import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Award,
  Bot,
  Clock,
  Sparkles,
  FileText,
  Save,
  Check,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";

interface LessonViewPageProps {
  param: string; // "courseId:lessonId"
  onNavigate: (view: string, param?: string) => void;
  onOpenAIMentor: (topic?: string) => void;
}

export const LessonViewPage: React.FC<LessonViewPageProps> = ({
  param,
  onNavigate,
  onOpenAIMentor,
}) => {
  const { courses, markLessonComplete } = useAcademy();
  const { isLessonCompleted, profile } = useAuth();

  const [courseId, lessonId] = param.split(":");
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const activeLesson =
    course.lessons.find((l) => l.id === lessonId) || course.lessons[0];

  const currentIndex = course.lessons.findIndex((l) => l.id === activeLesson.id);
  const prevLesson = currentIndex > 0 ? course.lessons[currentIndex - 1] : null;
  const nextLesson =
    currentIndex < course.lessons.length - 1 ? course.lessons[currentIndex + 1] : null;

  const isCompleted = isLessonCompleted(activeLesson.id);
  const [personalNotes, setPersonalNotes] = useState<string>(() => {
    try {
      return localStorage.getItem(`notes_${activeLesson.id}`) || "";
    } catch {
      return "";
    }
  });
  const [savedNotesMessage, setSavedNotesMessage] = useState(false);

  const handleSaveNotes = () => {
    try {
      localStorage.setItem(`notes_${activeLesson.id}`, personalNotes);
      setSavedNotesMessage(true);
      setTimeout(() => setSavedNotesMessage(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCompleteAndNext = async () => {
    await markLessonComplete(course.id, activeLesson.id);
    if (nextLesson) {
      onNavigate("lesson-view", `${course.id}:${nextLesson.id}`);
    } else {
      // Prompt to take exam
      onNavigate("quiz", course.id);
    }
  };

  return (
    <div id="lesson-view-page" className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col">
      {/* Top Classroom Bar */}
      <div className="bg-[#0b1120] border-b border-slate-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-16 z-30">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate("course-detail", course.id)}
            className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Course</span>
          </button>
          <div className="h-4 w-px bg-slate-800 hidden sm:block"></div>
          <div>
            <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
              {course.title}
            </span>
            <h1 className="text-xs sm:text-sm font-bold text-slate-200 truncate max-w-xs sm:max-w-md">
              {activeLesson.title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onOpenAIMentor(`Clarify the concepts in "${activeLesson.title}" from course ${course.title}`)}
            className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/30 text-indigo-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
          >
            <Bot className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Ask AI Mentor</span>
          </button>

          <button
            onClick={handleCompleteAndNext}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
          >
            {isCompleted ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{nextLesson ? "Complete & Next" : "Complete & Final Exam"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Lesson Navigation Sidebar */}
        <div className="order-2 lg:order-1 lg:col-span-1 space-y-4">
          <div className="bg-[#0e1628] border border-slate-800 rounded-2xl p-4 sticky top-36">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>Course Syllabus</span>
            </h3>

            <div className="space-y-1.5">
              {course.lessons.map((les, i) => {
                const isActive = les.id === activeLesson.id;
                const done = isLessonCompleted(les.id);

                return (
                  <button
                    key={les.id}
                    onClick={() => onNavigate("lesson-view", `${course.id}:${les.id}`)}
                    className={`w-full text-left p-2.5 rounded-xl text-xs transition flex items-center gap-2.5 cursor-pointer ${
                      isActive
                        ? "bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold"
                        : "text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-transparent"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] shrink-0 font-bold ${
                        done
                          ? "bg-emerald-500 text-slate-950"
                          : isActive
                          ? "bg-emerald-600/40 text-emerald-300"
                          : "bg-slate-800 text-slate-400"
                      }`}
                    >
                      {done ? <Check className="w-3 h-3 stroke-[3]" /> : i + 1}
                    </div>
                    <span className="truncate flex-1">{les.title}</span>
                  </button>
                );
              })}

              {/* Final Exam Entry */}
              <div className="pt-2 border-t border-slate-800/80 mt-2">
                <button
                  onClick={() => onNavigate("quiz", course.id)}
                  className="w-full text-left p-2.5 rounded-xl text-xs bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 font-bold transition flex items-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="truncate">Final Certification Exam</span>
                </button>
              </div>
            </div>

            {/* Student Trade Notes Scratchpad */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-2">
                <span className="flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Module Scratchpad</span>
                </span>
                <button
                  onClick={handleSaveNotes}
                  className="text-[10px] text-emerald-400 hover:underline flex items-center gap-1"
                >
                  <Save className="w-3 h-3" />
                  <span>{savedNotesMessage ? "Saved!" : "Save"}</span>
                </button>
              </div>
              <textarea
                value={personalNotes}
                onChange={(e) => setPersonalNotes(e.target.value)}
                placeholder="Log personal observations, pip calculations, or key levels..."
                rows={4}
                className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:border-indigo-500 focus:outline-none resize-none font-mono"
              />
            </div>
          </div>
        </div>

        {/* Center Lesson Educational Reader */}
        <div className="order-1 lg:order-2 lg:col-span-3 space-y-6">
          <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-10 space-y-8">
            {/* Header info */}
            <div className="border-b border-slate-800 pb-6">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="text-emerald-400 font-mono font-bold">
                  Lesson {currentIndex + 1} of {course.lessons.length}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {activeLesson.duration}
                </span>
                {isCompleted && (
                  <span className="ml-auto inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    <CheckCircle2 className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-100 tracking-tight">
                {activeLesson.title}
              </h1>
            </div>

            {/* Lesson Content Body */}
            <div className="prose prose-invert prose-emerald max-w-none space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {activeLesson.content.split("\n\n").map((paragraph, pIdx) => {
                if (paragraph.startsWith("### ")) {
                  return (
                    <h3 key={pIdx} className="text-lg sm:text-xl font-bold text-emerald-400 mt-6 mb-2">
                      {paragraph.replace("### ", "")}
                    </h3>
                  );
                }
                if (paragraph.startsWith("* ") || paragraph.startsWith("- ")) {
                  const items = paragraph.split("\n");
                  return (
                    <ul key={pIdx} className="space-y-1.5 my-3 pl-4 list-disc text-slate-300">
                      {items.map((it, itIdx) => (
                        <li key={itIdx}>{it.replace(/^(\*|-)\s+/, "")}</li>
                      ))}
                    </ul>
                  );
                }
                if (paragraph.startsWith("---")) {
                  return <hr key={pIdx} className="border-slate-800 my-6" />;
                }
                return <p key={pIdx} className="leading-relaxed">{paragraph}</p>;
              })}
            </div>

            {/* Key Institutional Takeaways Checklist */}
            <div className="p-6 bg-[#090e1c] border border-emerald-500/30 rounded-2xl space-y-3">
              <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Executive Summary & Key Takeaways</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {activeLesson.keyTakeaways.map((takeaway, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 flex items-start gap-2.5 text-xs text-slate-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{takeaway}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Navigation */}
            <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
              {prevLesson ? (
                <button
                  onClick={() => onNavigate("lesson-view", `${course.id}:${prevLesson.id}`)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 border border-slate-700 text-slate-300 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous: {prevLesson.title.split(":")[0]}</span>
                </button>
              ) : (
                <div></div>
              )}

              <button
                onClick={handleCompleteAndNext}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                <span>{nextLesson ? "Mark Complete & Next Lesson" : "Take Final Certification Exam"}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
