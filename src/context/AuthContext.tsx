import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  signInWithPopup,
  sendPasswordResetEmail,
  updateProfile as updateFirebaseProfile,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { auth, db, googleProvider } from "../lib/firebase";
import { UserProfile, ExperienceLevel, UserRole, CertificateData } from "../types";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  clearError: () => void;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  signUpWithEmail: (email: string, pass: string, name: string, level?: ExperienceLevel) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signInDemo: (role: UserRole) => Promise<void>;
  signOutUser: () => Promise<void>;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  resetUserPassword: (email: string) => Promise<void>;
  isEnrolled: (courseId: string) => boolean;
  hasCourseAccess: (courseId: string) => boolean;
  isLessonCompleted: (lessonId: string) => boolean;
  isCourseCompleted: (courseId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_PROFILE_KEY = "linguatech_user_profile";

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Helper to persist profile state locally and in Firestore
  const persistProfile = async (prof: UserProfile) => {
    setProfile(prof);
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(prof));
    } catch {
      // ignore storage quota error
    }

    try {
      const userRef = doc(db, "users", prof.uid);
      await setDoc(userRef, prof, { merge: true });
    } catch (err) {
      console.warn("Firestore user sync warning (using local persistence):", err);
    }
  };

  // Sync profile from Firestore or initialize default
  const fetchOrCreateProfile = async (firebaseUser: User, extraName?: string, level?: ExperienceLevel): Promise<UserProfile> => {
    const defaultProfile: UserProfile = {
      uid: firebaseUser.uid,
      email: firebaseUser.email || "student@twostartrader.com",
      displayName: firebaseUser.displayName || extraName || "Trader " + firebaseUser.uid.slice(0, 5),
      role: firebaseUser.email === "khrafiullah2@gmail.com" ? "admin" : "student",
      avatarUrl: firebaseUser.photoURL || `https://api.dicebear.com/7.x/bottts/svg?seed=${firebaseUser.uid}`,
      bio: "Dedicated TwoStarTrader student mastering ICT, CRT, SMC, and institutional risk management.",
      experienceLevel: level || "Intermediate",
      country: "Global",
      createdAt: new Date().toISOString(),
      points: 100,
      earnedBadges: [],
      enrolledCourseIds: [],
      unlockedCourseIds: [], // Requires $25 confirmation
      completedLessonIds: [],
      completedCourseIds: [],
      quizScores: {},
      certificates: {},
      simBalance: 10000,
      simPnL: 0,
    };

    try {
      const docRef = doc(db, "users", firebaseUser.uid);
      const snapshot = await getDoc(docRef);

      if (snapshot.exists()) {
        const data = snapshot.data() as UserProfile;
        const merged: UserProfile = {
          ...defaultProfile,
          ...data,
          // Preserve role if admin email
          role: firebaseUser.email === "khrafiullah2@gmail.com" ? "admin" : (data.role || "student"),
        };
        await persistProfile(merged);
        return merged;
      } else {
        await persistProfile(defaultProfile);
        return defaultProfile;
      }
    } catch (err) {
      console.warn("Firestore fetch error, utilizing initial default profile:", err);
      await persistProfile(defaultProfile);
      return defaultProfile;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          await fetchOrCreateProfile(firebaseUser);
        } catch (err: any) {
          console.error("Profile initialization error:", err);
        }
      } else {
        // If not a demo user stored locally, clear profile
        if (profile?.uid.startsWith("demo-")) {
          // keep demo user
        } else {
          setProfile(null);
          localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, pass: string) => {
    try {
      setError(null);
      setLoading(true);
      const cred = await signInWithEmailAndPassword(auth, email, pass);
      await fetchOrCreateProfile(cred.user);
    } catch (err: any) {
      const msg = err?.code ? err.code.replace("auth/", "").replace(/-/g, " ") : err.message;
      setError(msg || "Failed to sign in. Please verify your credentials.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (email: string, pass: string, name: string, level?: ExperienceLevel) => {
    try {
      setError(null);
      setLoading(true);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      await updateFirebaseProfile(cred.user, { displayName: name });
      await fetchOrCreateProfile(cred.user, name, level);
    } catch (err: any) {
      const msg = err?.code ? err.code.replace("auth/", "").replace(/-/g, " ") : err.message;
      setError(msg || "Registration failed. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      setError(null);
      setLoading(true);
      const res = await signInWithPopup(auth, googleProvider);
      await fetchOrCreateProfile(res.user);
    } catch (err: any) {
      console.error("Google sign in error:", err);
      setError(err?.message || "Google sign-in was interrupted.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signInDemo = async (role: UserRole) => {
    setLoading(true);
    setError(null);
    const demoId = role === "admin" ? "demo-admin-id" : "demo-student-id";
    const demoName = role === "admin" ? "Chief Instructor (Admin)" : "Alex Morgan (Student)";
    const demoEmail = role === "admin" ? "khrafiullah2@gmail.com" : "student.alex@linguatech.academy";

    const demoProfile: UserProfile = {
      uid: demoId,
      email: demoEmail,
      displayName: demoName,
      role: role,
      avatarUrl: role === "admin" 
        ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
        : "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
      bio: role === "admin" 
        ? "Head of Curriculum & Algorithmic Trading at TwoStarTrader Academy." 
        : "Passionate FX trader mastering ICT, CRT, Smart Money Concepts and multi-timeframe liquidity sweeps.",
      experienceLevel: role === "admin" ? "Professional" : "Intermediate",
      country: "Pakistan",
      createdAt: new Date().toISOString(),
      points: role === "admin" ? 5400 : 1450,
      earnedBadges: role === "admin" 
        ? ["first-profitable-trade", "advanced-ta-master", "ict-liquidity-hunter", "crt-specialist", "smc-architect", "risk-guardian", "century-club", "twostar-elite"]
        : ["first-profitable-trade", "advanced-ta-master", "ict-liquidity-hunter"],
      enrolledCourseIds: ["course-ict-301", "course-crt-202", "course-smc-302", "course-pa-102"],
      unlockedCourseIds: ["course-ict-301", "course-crt-202", "course-smc-302"], // Unlocked after $25 confirmation
      completedLessonIds: ["les-ict-1", "les-ict-2", "les-crt-1"],
      completedCourseIds: [],
      quizScores: {
        "quiz-ict-301": 95,
        "quiz-crt-202": 85,
      },
      certificates: {},
      simBalance: 11450,
      simPnL: 1450,
    };

    // Fake mock user representation
    const mockUser: any = {
      uid: demoId,
      email: demoEmail,
      displayName: demoName,
      photoURL: demoProfile.avatarUrl,
      emailVerified: true,
    };

    setUser(mockUser);
    await persistProfile(demoProfile);
    setLoading(false);
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch {
      // ignore
    }
    setUser(null);
    setProfile(null);
    localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;
    const updated = { ...profile, ...updates };
    await persistProfile(updated);
  };

  const resetUserPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err: any) {
      setError(err?.message || "Failed to send password reset email.");
      throw err;
    }
  };

  const isEnrolled = (courseId: string) => {
    if (profile?.role === "admin") return true; // Admins have full access to all courses
    return Boolean(profile?.enrolledCourseIds?.includes(courseId));
  };

  const hasCourseAccess = (courseId: string) => {
    if (profile?.role === "admin") return true;
    if (profile?.unlockedCourseIds?.includes(courseId) || profile?.unlockedCourseIds?.includes("all-courses")) {
      return true;
    }
    return false;
  };

  const isLessonCompleted = (lessonId: string) => {
    return Boolean(profile?.completedLessonIds?.includes(lessonId));
  };

  const isCourseCompleted = (courseId: string) => {
    return Boolean(profile?.completedCourseIds?.includes(courseId));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        clearError,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signInDemo,
        signOutUser,
        updateUserProfile,
        resetUserPassword,
        isEnrolled,
        hasCourseAccess,
        isLessonCompleted,
        isCourseCompleted,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
