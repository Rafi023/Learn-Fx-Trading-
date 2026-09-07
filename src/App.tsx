import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { AcademyProvider } from "./context/AcademyContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { LiveRatesTicker } from "./components/LiveRatesTicker";
import { LotSizeCalculatorModal } from "./components/LotSizeCalculatorModal";
import { AIMentorModal } from "./components/AIMentorModal";
import { CertificateModal } from "./components/CertificateModal";
import { AuthModal } from "./components/AuthModal";

// Pages
import { HomePage } from "./pages/HomePage";
import { CoursesPage } from "./pages/CoursesPage";
import { CourseDetailPage } from "./pages/CourseDetailPage";
import { LessonViewPage } from "./pages/LessonViewPage";
import { QuizPage } from "./pages/QuizPage";
import { StudentDashboardPage } from "./pages/StudentDashboardPage";
import { PaymentsPage } from "./pages/PaymentsPage";
import { ContactPage } from "./pages/ContactPage";
import { ProfilePage } from "./pages/ProfilePage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { CertificateData } from "./types";

function AcademyAppContent() {
  const { user, profile } = useAuth();

  // Navigation state
  const [currentView, setCurrentView] = useState<string>("home");
  const [viewParam, setViewParam] = useState<string>("");

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [isAIMentorOpen, setIsAIMentorOpen] = useState(false);
  const [aiMentorTopic, setAIMentorTopic] = useState<string | undefined>();
  const [activeCertificate, setActiveCertificate] = useState<CertificateData | null>(null);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentView, viewParam]);

  const handleNavigate = (view: string, param: string = "") => {
    setCurrentView(view);
    setViewParam(param);
  };

  const handleOpenAuth = (mode: "login" | "register" = "login") => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleOpenAIMentor = (topic?: string) => {
    setAIMentorTopic(topic);
    setIsAIMentorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Real-Time Interbank Rates Ticker */}
      <LiveRatesTicker onOpenCalculator={() => setIsCalculatorOpen(true)} />

      {/* Main Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAIMentor={() => handleOpenAIMentor()}
        onOpenAuth={handleOpenAuth}
      />

      {/* View Switcher */}
      <main className="flex-1">
        {currentView === "home" && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenCalculator={() => setIsCalculatorOpen(true)}
            onOpenAIMentor={() => handleOpenAIMentor()}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === "courses" && (
          <CoursesPage
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === "course-detail" && (
          <CourseDetailPage
            courseId={viewParam}
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}

        {currentView === "lesson-view" && (
          <LessonViewPage
            param={viewParam}
            onNavigate={handleNavigate}
            onOpenAIMentor={(topic) => handleOpenAIMentor(topic)}
          />
        )}

        {currentView === "quiz" && (
          <QuizPage
            courseId={viewParam}
            onNavigate={handleNavigate}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
          />
        )}

        {currentView === "dashboard" && (
          <StudentDashboardPage
            onNavigate={handleNavigate}
            onOpenCertificate={(cert) => setActiveCertificate(cert)}
            onOpenAIMentor={() => handleOpenAIMentor()}
          />
        )}

        {currentView === "payments" && (
          <PaymentsPage
            courseId={viewParam}
            onNavigate={handleNavigate}
            onOpenAuth={handleOpenAuth}
          />
        )}

        {currentView === "contact" && (
          <ContactPage />
        )}

        {currentView === "profile" && (
          <ProfilePage onNavigate={handleNavigate} />
        )}

        {currentView === "admin" && (
          <AdminDashboardPage onNavigate={handleNavigate} />
        )}
      </main>

      {/* Institutional Academy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenCalculator={() => setIsCalculatorOpen(true)}
        onOpenAIMentor={() => handleOpenAIMentor()}
      />

      {/* Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        initialMode={authMode}
      />

      <LotSizeCalculatorModal
        isOpen={isCalculatorOpen}
        onClose={() => setIsCalculatorOpen(false)}
      />

      <AIMentorModal
        isOpen={isAIMentorOpen}
        onClose={() => setIsAIMentorOpen(false)}
        initialTopic={aiMentorTopic}
      />

      <CertificateModal
        isOpen={activeCertificate !== null}
        onClose={() => setActiveCertificate(null)}
        certificate={activeCertificate}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AcademyProvider>
        <AcademyAppContent />
      </AcademyProvider>
    </AuthProvider>
  );
}

