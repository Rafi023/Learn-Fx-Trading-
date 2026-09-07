import React, { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Award,
  RotateCcw,
  Sparkles,
  HelpCircle,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import { useAcademy } from "../context/AcademyContext";
import { useAuth } from "../context/AuthContext";
import { CertificateData } from "../types";

interface QuizPageProps {
  courseId: string;
  onNavigate: (view: string, param?: string) => void;
  onOpenCertificate: (cert: CertificateData) => void;
}

export const QuizPage: React.FC<QuizPageProps> = ({
  courseId,
  onNavigate,
  onOpenCertificate,
}) => {
  const { courses, submitQuizScore } = useAcademy();
  const { profile } = useAuth();

  const course = courses.find((c) => c.id === courseId) || courses[0];
  const quiz = course.finalQuiz;

  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [scorePercent, setScorePercent] = useState<number>(0);
  const [passedExam, setPassedExam] = useState<boolean>(false);
  const [issuedCert, setIssuedCert] = useState<CertificateData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionIdx]: optionIdx }));
  };

  const handleSubmitQuiz = async () => {
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      if (!confirm("You have unanswered questions. Are you sure you want to submit?")) {
        return;
      }
    }

    setIsSubmitting(true);
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const calculatedPercent = Math.round((correctCount / quiz.questions.length) * 100);
    setScorePercent(calculatedPercent);

    try {
      const result = await submitQuizScore(course.id, quiz.id, calculatedPercent);
      setPassedExam(result.passed);
      if (result.cert) {
        setIssuedCert(result.cert);
      }
    } catch (err) {
      console.warn("Quiz submission error:", err);
    } finally {
      setSubmitted(true);
      setIsSubmitting(false);
    }
  };

  const handleRetake = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setPassedExam(false);
    setIssuedCert(null);
  };

  return (
    <div id="quiz-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => onNavigate("course-detail", course.id)}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Exit Exam & Return to Course</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Course:</span>
          <span className="text-xs font-bold text-slate-200">{course.title}</span>
        </div>
      </div>

      {/* Exam Banner */}
      <div className="bg-[#0e1628] border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Award className="w-5 h-5" />
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-100">
                {quiz.title}
              </h1>
            </div>
            <p className="text-xs text-slate-400 pl-9">
              {quiz.questions.length} Scenario Questions • Minimum Passing Grade:{" "}
              <strong className="text-amber-400">{quiz.passingScore}%</strong>
            </p>
          </div>

          {!submitted && (
            <div className="text-right pl-9 sm:pl-0">
              <span className="text-xs text-slate-400 block">Questions Completed</span>
              <span className="text-lg font-black font-mono text-emerald-400">
                {Object.keys(selectedAnswers).length} / {quiz.questions.length}
              </span>
            </div>
          )}
        </div>

        {/* Results Banner if Submitted */}
        {submitted && (
          <div
            className={`mt-6 p-6 rounded-2xl border flex flex-col sm:flex-row items-center justify-between gap-6 animate-fadeIn ${
              passedExam
                ? "bg-emerald-950/30 border-emerald-500/40 text-emerald-300"
                : "bg-rose-950/30 border-rose-500/40 text-rose-300"
            }`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-2xl font-mono shrink-0 ${
                  passedExam ? "bg-emerald-500 text-slate-950" : "bg-rose-500 text-white"
                }`}
              >
                {scorePercent}%
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white">
                  {passedExam
                    ? "Congratulations! You Passed the Certification Exam"
                    : "Exam Incomplete — Minimum 75% Required"}
                </h3>
                <p className="text-xs text-slate-300 mt-0.5">
                  {passedExam
                    ? "Your institutional competence has been validated. Your official certificate has been issued."
                    : "Review the question rationales below, reinforce your study notes, and retake the exam."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              {passedExam && (
                <button
                  onClick={() => {
                    const certToView = issuedCert || profile?.certificates?.[course.id];
                    if (certToView) onOpenCertificate(certToView);
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/20"
                >
                  <Award className="w-4 h-4" />
                  <span>View Official Certificate</span>
                </button>
              )}
              <button
                onClick={handleRetake}
                className="w-full sm:w-auto px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-bold rounded-xl text-xs transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Exam</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {quiz.questions.map((q, qIdx) => {
          const selectedOpt = selectedAnswers[qIdx];
          const isCorrect = selectedOpt === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`bg-[#0e1628] border rounded-2xl p-6 transition space-y-4 ${
                submitted
                  ? isCorrect
                    ? "border-emerald-500/40"
                    : "border-rose-500/40"
                  : "border-slate-800"
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-mono font-bold text-slate-300 shrink-0">
                    Q{qIdx + 1}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
                    {q.question}
                  </h3>
                </div>

                {submitted && (
                  <div className="shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 text-xs font-bold px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
                        <CheckCircle2 className="w-4 h-4" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-400 text-xs font-bold px-2 py-1 bg-rose-500/10 border border-rose-500/20 rounded-lg">
                        <XCircle className="w-4 h-4" />
                        Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2.5 pt-1 pl-10">
                {q.options.map((option, optIdx) => {
                  const isSelected = selectedOpt === optIdx;
                  let optStyle =
                    "bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700";

                  if (submitted) {
                    if (optIdx === q.correctIndex) {
                      optStyle = "bg-emerald-500/20 border-emerald-500/60 text-emerald-200 font-bold";
                    } else if (isSelected && !isCorrect) {
                      optStyle = "bg-rose-500/20 border-rose-500/60 text-rose-300 line-through";
                    } else {
                      optStyle = "bg-slate-950/40 border-slate-850 text-slate-500 opacity-60";
                    }
                  } else if (isSelected) {
                    optStyle = "bg-emerald-600/20 border-emerald-500 text-emerald-300 font-bold shadow-sm";
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition flex items-center justify-between gap-3 cursor-pointer ${optStyle}`}
                    >
                      <span>{option}</span>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-emerald-400 bg-emerald-400" : "border-slate-700"
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950"></div>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation note when submitted */}
              {submitted && (
                <div className="mt-3 p-3 bg-[#090e1c] border border-slate-800 rounded-xl text-xs text-slate-300 ml-10 flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-amber-300">Curriculum Rationale: </strong>
                    <span>{q.explanation}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!submitted && (
        <div className="flex justify-end pt-4">
          <button
            onClick={handleSubmitQuiz}
            disabled={isSubmitting}
            className="px-8 py-3.5 bg-gradient-to-r from-emerald-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white font-black rounded-xl text-sm transition shadow-xl shadow-emerald-500/20 flex items-center gap-2 cursor-pointer"
          >
            <span>Submit Certification Exam</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
