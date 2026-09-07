import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import confetti from "canvas-confetti";
import { db } from "../lib/firebase";
import { INITIAL_COURSES } from "../lib/initialCourses";
import { ALL_BADGES } from "../lib/badges";
import { INITIAL_LEADERBOARD } from "../lib/mockLeaderboard";
import {
  Course,
  CertificateData,
  TradeLog,
  ContactInquiry,
  PaymentTransaction,
  PaymentMethod,
  PaymentStatus,
  ForexRate,
  EconomicEvent,
  SimulatedPosition,
  SimulatedHistoryTrade,
  GamificationBadge,
  LeaderboardTrader,
} from "../types";
import { useAuth } from "./AuthContext";

export interface SimulatorAccountStats {
  balance: number;
  equity: number;
  usedMargin: number;
  freeMargin: number;
  marginLevel: number;
  totalRealizedPnL: number;
  winRate: number;
  totalTrades: number;
  winningTrades: number;
}

interface AcademyContextType {
  courses: Course[];
  loadingCourses: boolean;
  activeCourse: Course | null;
  setActiveCourse: (course: Course | null) => void;
  rates: ForexRate[];
  economicCalendar: EconomicEvent[];
  tradeLogs: TradeLog[];
  contactInquiries: ContactInquiry[];
  transactions: PaymentTransaction[];
  
  // Paid access & payments
  submitTuitionPayment: (data: {
    courseId: string;
    courseTitle: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceTid: string;
    senderAccountOrWallet?: string;
    studentName?: string;
    studentPhone?: string;
  }) => Promise<PaymentTransaction>;
  confirmPayment: (transactionId: string) => Promise<void>;
  rejectPayment: (transactionId: string, reason?: string) => Promise<void>;
  hasCourseAccess: (courseId: string) => boolean;
  getCoursePaymentStatus: (courseId: string) => PaymentStatus | null;
  enrollInCourse: (courseId: string, paymentMethod?: PaymentMethod, customAmount?: number) => Promise<PaymentTransaction>;
  
  // Learning & Progress
  markLessonComplete: (courseId: string, lessonId: string) => Promise<void>;
  submitQuizScore: (courseId: string, quizId: string, score: number) => Promise<{ passed: boolean; cert?: CertificateData }>;
  getCertificate: (courseId: string) => CertificateData | null;
  
  // Gamification
  badges: GamificationBadge[];
  awardPoints: (amount: number, reason?: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
  leaderboard: LeaderboardTrader[];
  
  // Trading Simulator
  simPositions: SimulatedPosition[];
  simHistory: SimulatedHistoryTrade[];
  simAccount: SimulatorAccountStats;
  currentTickPrices: Record<string, { bid: number; ask: number; high: number; low: number; change: number }>;
  placeSimulatedOrder: (
    pair: string,
    type: "BUY" | "SELL",
    lotSize: number,
    stopLoss?: number,
    takeProfit?: number
  ) => Promise<SimulatedPosition>;
  closeSimulatedPosition: (positionId: string) => Promise<SimulatedHistoryTrade>;
  closeAllSimulatedPositions: () => Promise<void>;
  resetSimulator: () => void;
  
  // Utility & Admin
  addTradeLog: (trade: Omit<TradeLog, "id" | "userId" | "date">) => Promise<TradeLog>;
  deleteTradeLog: (tradeId: string) => Promise<void>;
  submitContactMessage: (inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">) => Promise<string>;
  resolveContactInquiry: (inquiryId: string) => Promise<void>;
  addNewCourse: (course: Course) => Promise<void>;
  updateCoursePrice: (courseId: string, newPrice: number) => Promise<void>;
  triggerConfetti: () => void;
}

const AcademyContext = createContext<AcademyContextType | undefined>(undefined);

const LOCAL_STORAGE_COURSES_KEY = "twostar_courses_v2";
const LOCAL_STORAGE_TRADES_KEY = "twostar_trade_logs_v2";
const LOCAL_STORAGE_INQUIRIES_KEY = "twostar_contact_inquiries_v2";
const LOCAL_STORAGE_TXNS_KEY = "twostar_transactions_v2";
const LOCAL_STORAGE_SIM_POSITIONS_KEY = "twostar_sim_positions_v2";
const LOCAL_STORAGE_SIM_HISTORY_KEY = "twostar_sim_history_v2";
const LOCAL_STORAGE_SIM_BALANCE_KEY = "twostar_sim_balance_v2";

export const AcademyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, profile, updateUserProfile } = useAuth();

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_COURSES_KEY);
      return cached ? JSON.parse(cached) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [loadingCourses, setLoadingCourses] = useState(false);
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);

  // Live market data
  const [rates, setRates] = useState<ForexRate[]>([]);
  const [economicCalendar, setEconomicCalendar] = useState<EconomicEvent[]>([]);

  // Simulator state
  const [simBalance, setSimBalance] = useState<number>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_SIM_BALANCE_KEY);
      return cached ? parseFloat(cached) : 10000;
    } catch {
      return 10000;
    }
  });

  const [simPositions, setSimPositions] = useState<SimulatedPosition[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_SIM_POSITIONS_KEY);
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });

  const [simHistory, setSimHistory] = useState<SimulatedHistoryTrade[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_SIM_HISTORY_KEY);
      return cached ? JSON.parse(cached) : [
        {
          id: "sim-hist-1",
          pair: "EUR/USD",
          type: "BUY",
          lotSize: 0.5,
          entryPrice: 1.08250,
          exitPrice: 1.08650,
          stopLoss: 1.08050,
          takeProfit: 1.08650,
          pips: 40.0,
          pnl: 200.0,
          openTime: new Date(Date.now() - 86400000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          closeTime: new Date(Date.now() - 82000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          result: "PROFIT",
        },
        {
          id: "sim-hist-2",
          pair: "XAU/USD",
          type: "BUY",
          lotSize: 0.2,
          entryPrice: 2885.00,
          exitPrice: 2905.00,
          stopLoss: 2875.00,
          takeProfit: 2905.00,
          pips: 200.0,
          pnl: 400.0,
          openTime: new Date(Date.now() - 43200000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          closeTime: new Date(Date.now() - 40000000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          result: "PROFIT",
        }
      ];
    } catch {
      return [];
    }
  });

  // Base live ticks for simulator pairs
  const [currentTickPrices, setCurrentTickPrices] = useState<
    Record<string, { bid: number; ask: number; high: number; low: number; change: number }>
  >({
    "EUR/USD": { bid: 1.08450, ask: 1.08462, high: 1.08820, low: 1.08150, change: 0.35 },
    "GBP/USD": { bid: 1.29340, ask: 1.29355, high: 1.29850, low: 1.28900, change: 0.22 },
    "USD/JPY": { bid: 153.420, ask: 153.435, high: 154.100, low: 152.950, change: -0.45 },
    "XAU/USD": { bid: 2912.40, ask: 2912.75, high: 2928.00, low: 2895.50, change: 1.15 },
    "BTC/USD": { bid: 94250.0, ask: 94265.0, high: 95500.0, low: 93100.0, change: 2.45 },
  });

  // Gamification leaderboard
  const [leaderboard] = useState<LeaderboardTrader[]>(INITIAL_LEADERBOARD);

  // Journal trade logs
  const [tradeLogs, setTradeLogs] = useState<TradeLog[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_TRADES_KEY);
      return cached ? JSON.parse(cached) : [
        {
          id: "trade-1",
          userId: "demo-student-id",
          pair: "EUR/USD",
          direction: "BUY",
          entryPrice: 1.0825,
          exitPrice: 1.0875,
          stopLoss: 1.0805,
          takeProfit: 1.0875,
          lotSize: 0.5,
          pips: 50,
          pnl: 250,
          status: "WON",
          strategy: "London Session Judas Swing (ICT)",
          notes: "Price swept the Asian session low into a 4H Bullish FVG. Entered on 15M MSS with 1:2.5 RR.",
          date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
        },
        {
          id: "trade-2",
          userId: "demo-student-id",
          pair: "GBP/JPY",
          direction: "SELL",
          entryPrice: 199.80,
          exitPrice: 199.20,
          stopLoss: 200.10,
          takeProfit: 199.20,
          lotSize: 0.2,
          pips: 60,
          pnl: 120,
          status: "WON",
          strategy: "Candle Range Theory (CRT) Wick Purge",
          notes: "Daily range high swept by M15 candle wick with internal close. Targeted 50% equilibrium.",
          date: new Date(Date.now() - 86400000 * 1).toLocaleDateString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [contactInquiries, setContactInquiries] = useState<ContactInquiry[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_INQUIRIES_KEY);
      return cached ? JSON.parse(cached) : [
        {
          id: "TKT-841920",
          name: "Hamza Malik",
          email: "malik.fx@gmail.com",
          subject: "Verification of EasyPaisa $25 Tuition Fee",
          message: "Submitted Rs. 7,000 via EasyPaisa TID: 83920194821. Requesting access to ICT and SMC strategies.",
          inquiryType: "Payment",
          status: "new",
          createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
        }
      ];
    } catch {
      return [];
    }
  });

  const [transactions, setTransactions] = useState<PaymentTransaction[]>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_TXNS_KEY);
      return cached ? JSON.parse(cached) : [
        {
          id: "TXN-DEMO-COMPLETED",
          transactionId: "TXN-849201-921",
          userId: "demo-student-id",
          userEmail: "student.alex@twostartrader.com",
          studentName: "Alex Morgan",
          courseId: "course-ict-301",
          courseTitle: "ICT Institutional Masterclass: Judas Swings, FVGs & Killzones",
          amount: 25,
          currency: "USD",
          paymentMethod: "easypaisa",
          referenceTid: "EP-84920419284",
          senderAccountOrWallet: "0345-9876543",
          status: "completed",
          createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          receiptNumber: "INV-2025-0081",
          adminConfirmedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          adminNotes: "EasyPaisa transaction verified against bank record. Full access activated.",
        },
        {
          id: "TXN-DEMO-PENDING",
          transactionId: "TXN-918230-104",
          userId: "demo-student-id",
          userEmail: "student.alex@twostartrader.com",
          studentName: "Alex Morgan",
          courseId: "course-pa-102",
          courseTitle: "Pure Price Action & Market Geometry",
          amount: 25,
          currency: "USD",
          paymentMethod: "binance_crypto",
          referenceTid: "0x8f2a9c148e4209bca7140e7194",
          senderAccountOrWallet: "Binance USDT (TRC20)",
          status: "pending_verification",
          createdAt: new Date(Date.now() - 3600000 * 3).toISOString(),
          receiptNumber: "INV-2025-0104",
          adminNotes: "Awaiting blockchain confirmation on TRC20 network.",
        }
      ];
    } catch {
      return [];
    }
  });

  // Confetti helper
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#10b981", "#3b82f6", "#f59e0b", "#6366f1"],
      });
    } catch {
      // ignore
    }
  };

  // Live Rates & Simulator Engine Loop (ticks every 1.5s)
  useEffect(() => {
    const tickInterval = setInterval(() => {
      setCurrentTickPrices((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((pair) => {
          const current = next[pair];
          const isJpy = pair.includes("JPY");
          const isGold = pair.includes("XAU");
          const isCrypto = pair.includes("BTC");

          let pipStep = 0.00005;
          if (isJpy) pipStep = 0.005;
          if (isGold) pipStep = 0.15;
          if (isCrypto) pipStep = 6.0;

          // Random walk with drift
          const delta = (Math.random() - 0.49) * pipStep * 2;
          const newBid = Math.max(0.0001, current.bid + delta);
          const spread = current.ask - current.bid;
          const newAsk = newBid + spread;

          next[pair] = {
            ...current,
            bid: parseFloat(newBid.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 1 : 5)),
            ask: parseFloat(newAsk.toFixed(isJpy ? 3 : isGold ? 2 : isCrypto ? 1 : 5)),
            high: Math.max(current.high, newAsk),
            low: Math.min(current.low, newBid),
          };
        });
        return next;
      });
    }, 1500);

    return () => clearInterval(tickInterval);
  }, []);

  // Update open positions floating P&L on price ticks
  useEffect(() => {
    if (simPositions.length === 0) return;

    setSimPositions((prevPositions) => {
      let updated = false;
      const nextPositions = prevPositions.map((pos) => {
        const quote = currentTickPrices[pos.pair];
        if (!quote) return pos;

        const isJpy = pos.pair.includes("JPY");
        const isGold = pos.pair.includes("XAU");
        const isCrypto = pos.pair.includes("BTC");

        let pipMultiplier = 10000;
        let pipValuePerLot = 10;

        if (isJpy) {
          pipMultiplier = 100;
          pipValuePerLot = 6.5;
        } else if (isGold) {
          pipMultiplier = 10;
          pipValuePerLot = 10;
        } else if (isCrypto) {
          pipMultiplier = 1;
          pipValuePerLot = 1;
        }

        const currentPrice = pos.type === "BUY" ? quote.bid : quote.ask;
        const rawDiff = pos.type === "BUY" ? currentPrice - pos.entryPrice : pos.entryPrice - currentPrice;
        const pips = parseFloat((rawDiff * pipMultiplier).toFixed(1));
        const pnl = parseFloat((pips * pipValuePerLot * pos.lotSize).toFixed(2));

        if (pnl !== pos.pnl || currentPrice !== pos.currentPrice) {
          updated = true;
          return {
            ...pos,
            currentPrice,
            pips,
            pnl,
          };
        }
        return pos;
      });

      if (updated) {
        localStorage.setItem(LOCAL_STORAGE_SIM_POSITIONS_KEY, JSON.stringify(nextPositions));
        return nextPositions;
      }
      return prevPositions;
    });
  }, [currentTickPrices]);

  // Derived simulator stats
  const simAccount: SimulatorAccountStats = useMemo(() => {
    const unrealizedPnL = simPositions.reduce((sum, p) => sum + p.pnl, 0);
    const equity = parseFloat((simBalance + unrealizedPnL).toFixed(2));
    const usedMargin = simPositions.reduce((sum, p) => sum + p.lotSize * 1000, 0);
    const freeMargin = Math.max(0, equity - usedMargin);
    const marginLevel = usedMargin > 0 ? parseFloat(((equity / usedMargin) * 100).toFixed(1)) : 1000;

    const totalTrades = simHistory.length;
    const winningTrades = simHistory.filter((t) => t.pnl > 0).length;
    const winRate = totalTrades > 0 ? Math.round((winningTrades / totalTrades) * 100) : 0;
    const totalRealizedPnL = parseFloat(simHistory.reduce((sum, t) => sum + t.pnl, 0).toFixed(2));

    return {
      balance: simBalance,
      equity,
      usedMargin,
      freeMargin,
      marginLevel,
      totalRealizedPnL,
      winRate,
      totalTrades,
      winningTrades,
    };
  }, [simBalance, simPositions, simHistory]);

  // Sync courses with Firestore (or seed)
  useEffect(() => {
    const loadCoursesFromFirestore = async () => {
      setLoadingCourses(true);
      try {
        const colRef = collection(db, "courses");
        const snap = await getDocs(colRef);
        if (!snap.empty) {
          const loaded: Course[] = snap.docs.map((d) => d.data() as Course);
          setCourses(loaded);
          localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(loaded));
        } else {
          for (const c of INITIAL_COURSES) {
            try {
              await setDoc(doc(db, "courses", c.id), c);
            } catch (seedErr) {
              console.warn("Could not seed course to firestore:", seedErr);
            }
          }
        }
      } catch (err) {
        console.warn("Firestore courses fallback to local cache:", err);
      } finally {
        setLoadingCourses(false);
      }
    };

    loadCoursesFromFirestore();
  }, []);

  // Fetch live Forex rates API
  const fetchRates = async () => {
    try {
      const res = await fetch("/api/forex/rates");
      if (res.ok) {
        const data = await res.json();
        setRates(data.rates || []);
        if (data.economicCalendar) {
          setEconomicCalendar(data.economicCalendar);
        }
      }
    } catch (err) {
      console.warn("Live rates fetch error:", err);
    }
  };

  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 8000);
    return () => clearInterval(interval);
  }, []);

  // Gamification helpers
  const awardPoints = async (amount: number, reason?: string) => {
    const currentPoints = profile?.points || 100;
    const nextPoints = currentPoints + amount;
    await updateUserProfile({ points: nextPoints });
  };

  const awardBadge = async (badgeId: string) => {
    const currentBadges = profile?.earnedBadges || [];
    if (!currentBadges.includes(badgeId)) {
      const nextBadges = [...currentBadges, badgeId];
      const badgeObj = ALL_BADGES.find((b) => b.id === badgeId);
      const bonusPoints = badgeObj?.points || 150;
      await updateUserProfile({
        earnedBadges: nextBadges,
        points: (profile?.points || 100) + bonusPoints,
      });
      triggerConfetti();
    }
  };

  const badges: GamificationBadge[] = useMemo(() => {
    const earned = profile?.earnedBadges || [];
    return ALL_BADGES.map((b) => ({
      ...b,
      unlockedAt: earned.includes(b.id) ? "Earned" : undefined,
    }));
  }, [profile?.earnedBadges]);

  // Tuition & Course Access Helpers
  const hasCourseAccess = (courseId: string): boolean => {
    if (profile?.role === "admin") return true;
    if (profile?.unlockedCourseIds?.includes(courseId) || profile?.unlockedCourseIds?.includes("all-courses")) {
      return true;
    }
    // $25 covers the WHOLE academy: if student has ANY completed payment, unlock all courses
    const anyCompletedTxn = transactions.find(
      (t) => t.userId === (user?.uid || profile?.uid) && t.status === "completed"
    );
    if (anyCompletedTxn) return true;

    // Check if there is a completed payment for this course
    const txn = transactions.find(
      (t) => t.courseId === courseId && t.userId === (user?.uid || profile?.uid) && t.status === "completed"
    );
    return Boolean(txn);
  };

  const getCoursePaymentStatus = (courseId: string): PaymentStatus | null => {
    const txn = transactions.find(
      (t) => t.courseId === courseId && t.userId === (user?.uid || profile?.uid)
    );
    return txn ? txn.status : null;
  };

  const submitTuitionPayment = async (data: {
    courseId: string;
    courseTitle: string;
    amount: number;
    paymentMethod: PaymentMethod;
    referenceTid: string;
    senderAccountOrWallet?: string;
    studentName?: string;
    studentPhone?: string;
  }): Promise<PaymentTransaction> => {
    const txnId = "TXN-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-4);
    const receiptNumber = "INV-TST-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    const newTxn: PaymentTransaction = {
      id: "txn_" + Date.now(),
      transactionId: txnId,
      userId: user?.uid || profile?.uid || "guest-student",
      userEmail: user?.email || profile?.email || "student@twostartrader.com",
      studentName: data.studentName || profile?.displayName || "Student Trader",
      studentPhone: data.studentPhone || profile?.phone,
      courseId: data.courseId,
      courseTitle: data.courseTitle,
      amount: data.amount,
      currency: "USD",
      paymentMethod: data.paymentMethod,
      referenceTid: data.referenceTid,
      senderAccountOrWallet: data.senderAccountOrWallet,
      status: "pending_verification",
      createdAt: new Date().toISOString(),
      receiptNumber,
      adminNotes: "Submitted by student. Awaiting payment receipt confirmation.",
    };

    const updated = [newTxn, ...transactions];
    setTransactions(updated);
    localStorage.setItem(LOCAL_STORAGE_TXNS_KEY, JSON.stringify(updated));

    // Award +50 points for completing submission
    await awardPoints(50, "Submitted course tuition verification");

    try {
      await setDoc(doc(db, "payments", newTxn.transactionId), newTxn);
    } catch (err) {
      console.warn("Firestore payment save fallback:", err);
    }

    return newTxn;
  };

  const confirmPayment = async (transactionId: string): Promise<void> => {
    const targetTxn = transactions.find((t) => t.transactionId === transactionId || t.id === transactionId);
    if (!targetTxn) return;

    const updatedTxns = transactions.map((t) =>
      t.transactionId === transactionId || t.id === transactionId
        ? {
            ...t,
            status: "completed" as PaymentStatus,
            adminConfirmedAt: new Date().toISOString(),
            adminNotes: "Payment confirmed by TwoStarTrader Academy Admin. Access granted.",
          }
        : t
    );

    setTransactions(updatedTxns);
    localStorage.setItem(LOCAL_STORAGE_TXNS_KEY, JSON.stringify(updatedTxns));

    // Unlock all courses and strategies in profile since $25 fee covers the whole academy
    if (profile) {
      const currentUnlocked = profile.unlockedCourseIds || [];
      const currentEnrolled = profile.enrolledCourseIds || [];
      const allCourseIds = courses.map((c) => c.id);

      const nextUnlocked = Array.from(new Set([...currentUnlocked, targetTxn.courseId, "all-courses", ...allCourseIds]));
      const nextEnrolled = Array.from(new Set([...currentEnrolled, targetTxn.courseId, ...allCourseIds]));

      await updateUserProfile({
        unlockedCourseIds: nextUnlocked,
        enrolledCourseIds: nextEnrolled,
        points: (profile.points || 100) + 200,
      });
    }

    triggerConfetti();

    try {
      await updateDoc(doc(db, "payments", targetTxn.transactionId), {
        status: "completed",
        adminConfirmedAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Firestore payment update fallback:", err);
    }
  };

  const rejectPayment = async (transactionId: string, reason?: string): Promise<void> => {
    const updatedTxns = transactions.map((t) =>
      t.transactionId === transactionId || t.id === transactionId
        ? {
            ...t,
            status: "rejected" as PaymentStatus,
            adminNotes: reason || "Transaction could not be verified. Please contact support with valid proof.",
          }
        : t
    );

    setTransactions(updatedTxns);
    localStorage.setItem(LOCAL_STORAGE_TXNS_KEY, JSON.stringify(updatedTxns));

    try {
      await updateDoc(doc(db, "payments", transactionId), {
        status: "rejected",
        adminNotes: reason || "Transaction rejected.",
      });
    } catch (err) {
      console.warn("Firestore payment rejection warn:", err);
    }
  };

  const enrollInCourse = async (
    courseId: string,
    paymentMethod: PaymentMethod = "credit_card",
    customAmount?: number
  ): Promise<PaymentTransaction> => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Course not found");

    const amount = customAmount !== undefined ? customAmount : course.price;
    const txnId = "TXN-" + Math.random().toString(36).substring(2, 8).toUpperCase() + "-" + Date.now().toString().slice(-4);
    const receiptNumber = "INV-TST-" + new Date().getFullYear() + "-" + Math.floor(1000 + Math.random() * 9000);

    const newTxn: PaymentTransaction = {
      id: "txn_" + Date.now(),
      transactionId: txnId,
      userId: user?.uid || profile?.uid || "guest-user",
      userEmail: user?.email || profile?.email || "student@twostartrader.com",
      studentName: profile?.displayName || "Student Trader",
      courseId: course.id,
      courseTitle: course.title,
      amount,
      currency: "USD",
      paymentMethod,
      status: "completed",
      createdAt: new Date().toISOString(),
      receiptNumber,
      adminConfirmedAt: new Date().toISOString(),
    };

    const updatedTxns = [newTxn, ...transactions];
    setTransactions(updatedTxns);
    localStorage.setItem(LOCAL_STORAGE_TXNS_KEY, JSON.stringify(updatedTxns));

    if (profile) {
      const currentEnrolled = profile.enrolledCourseIds || [];
      const currentUnlocked = profile.unlockedCourseIds || [];
      const allCourseIds = courses.map((c) => c.id);
      const nextEnrolled = Array.from(new Set([...currentEnrolled, courseId, ...allCourseIds]));
      const nextUnlocked = Array.from(new Set([...currentUnlocked, courseId, "all-courses", ...allCourseIds]));
      await updateUserProfile({
        enrolledCourseIds: nextEnrolled,
        unlockedCourseIds: nextUnlocked,
        points: (profile.points || 100) + 150,
      });
    }

    triggerConfetti();
    return newTxn;
  };

  // Lesson & Quiz completions
  const markLessonComplete = async (courseId: string, lessonId: string) => {
    if (!profile) return;
    const completedLessons = profile.completedLessonIds || [];
    if (!completedLessons.includes(lessonId)) {
      const updated = [...completedLessons, lessonId];
      const newPoints = (profile.points || 100) + 50; // +50 XP per lesson!
      await updateUserProfile({ completedLessonIds: updated, points: newPoints });

      // Check if course is complete
      const course = courses.find((c) => c.id === courseId);
      if (course) {
        const allLessonsDone = course.lessons.every((l) => updated.includes(l.id));
        if (allLessonsDone) {
          if (course.category === "ICT Strategy") await awardBadge("ict-liquidity-hunter");
          if (course.category === "CRT Strategy") await awardBadge("crt-specialist");
          if (course.category === "Smart Money Concepts") await awardBadge("smc-architect");
        }
      }
    }
  };

  const submitQuizScore = async (
    courseId: string,
    quizId: string,
    score: number
  ): Promise<{ passed: boolean; cert?: CertificateData }> => {
    const course = courses.find((c) => c.id === courseId);
    if (!course) throw new Error("Course not found");

    const passed = score >= (course.finalQuiz?.passingScore || 75);

    if (profile) {
      const currentScores = { ...(profile.quizScores || {}), [quizId]: score };
      let updatedCerts = { ...(profile.certificates || {}) };
      let updatedCompletedCourses = [...(profile.completedCourseIds || [])];

      let generatedCert: CertificateData | undefined;

      if (passed) {
        if (!updatedCompletedCourses.includes(courseId)) {
          updatedCompletedCourses.push(courseId);
        }

        const certId = "CERT-TST-" + courseId.replace("course-", "").toUpperCase() + "-" + Math.floor(10000 + Math.random() * 90000);
        const hash = "0x" + Math.random().toString(16).substring(2, 10) + Math.random().toString(16).substring(2, 10);

        generatedCert = {
          certificateId: certId,
          userId: profile.uid,
          studentName: profile.displayName || "Certified TwoStar Trader",
          courseId: course.id,
          courseTitle: course.title,
          issuedAt: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
          grade: score >= 90 ? "High Distinction" : score >= 80 ? "Distinction" : "Pass",
          score,
          instructorName: course.instructor.name,
          verificationHash: hash,
        };

        updatedCerts[courseId] = generatedCert;
        triggerConfetti();

        // Award badge for score >= 90
        if (score >= 90) {
          await awardBadge("advanced-ta-master");
        }

        // Check if all courses completed
        if (updatedCompletedCourses.length >= 4) {
          await awardBadge("twostar-elite");
        }

        try {
          await setDoc(doc(db, "certificates", certId), generatedCert);
        } catch (err) {
          console.warn("Firestore cert save fallback:", err);
        }
      }

      await updateUserProfile({
        quizScores: currentScores,
        completedCourseIds: updatedCompletedCourses,
        certificates: updatedCerts,
        points: (profile.points || 100) + (passed ? 200 : 50),
      });

      return { passed, cert: generatedCert };
    }

    return { passed };
  };

  const getCertificate = (courseId: string): CertificateData | null => {
    return profile?.certificates?.[courseId] || null;
  };

  // Trading Simulator Functions
  const placeSimulatedOrder = async (
    pair: string,
    type: "BUY" | "SELL",
    lotSize: number,
    stopLoss?: number,
    takeProfit?: number
  ): Promise<SimulatedPosition> => {
    const quote = currentTickPrices[pair] || { bid: 1.0850, ask: 1.0852 };
    const entryPrice = type === "BUY" ? quote.ask : quote.bid;

    const newPos: SimulatedPosition = {
      id: "pos-" + Date.now() + "-" + Math.floor(Math.random() * 1000),
      pair,
      type,
      lotSize,
      entryPrice,
      currentPrice: entryPrice,
      stopLoss,
      takeProfit,
      pips: 0,
      pnl: 0,
      openTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    const nextPositions = [newPos, ...simPositions];
    setSimPositions(nextPositions);
    localStorage.setItem(LOCAL_STORAGE_SIM_POSITIONS_KEY, JSON.stringify(nextPositions));

    // Award +25 XP points for opening a simulated order
    await awardPoints(25, "Executed simulated trade order");

    return newPos;
  };

  const closeSimulatedPosition = async (positionId: string): Promise<SimulatedHistoryTrade> => {
    const pos = simPositions.find((p) => p.id === positionId);
    if (!pos) throw new Error("Position not found");

    const closeTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const result: "PROFIT" | "LOSS" | "BREAKEVEN" =
      pos.pnl > 0 ? "PROFIT" : pos.pnl < 0 ? "LOSS" : "BREAKEVEN";

    const closedTrade: SimulatedHistoryTrade = {
      id: "hist-" + Date.now(),
      pair: pos.pair,
      type: pos.type,
      lotSize: pos.lotSize,
      entryPrice: pos.entryPrice,
      exitPrice: pos.currentPrice,
      stopLoss: pos.stopLoss,
      takeProfit: pos.takeProfit,
      pips: pos.pips,
      pnl: pos.pnl,
      openTime: pos.openTime,
      closeTime,
      result,
    };

    const nextPositions = simPositions.filter((p) => p.id !== positionId);
    const nextHistory = [closedTrade, ...simHistory];
    const newBalance = parseFloat((simBalance + pos.pnl).toFixed(2));

    setSimPositions(nextPositions);
    setSimHistory(nextHistory);
    setSimBalance(newBalance);

    localStorage.setItem(LOCAL_STORAGE_SIM_POSITIONS_KEY, JSON.stringify(nextPositions));
    localStorage.setItem(LOCAL_STORAGE_SIM_HISTORY_KEY, JSON.stringify(nextHistory));
    localStorage.setItem(LOCAL_STORAGE_SIM_BALANCE_KEY, newBalance.toString());

    // Check gamification milestones:
    if (pos.pnl > 0) {
      await awardBadge("first-profitable-trade");
      await awardPoints(50, "Profitable trade closed");
      triggerConfetti();
    }

    // Check if cumulative pips >= 100
    const totalPips = nextHistory.reduce((sum, h) => sum + (h.pips > 0 ? h.pips : 0), 0);
    if (totalPips >= 100) {
      await awardBadge("century-club");
    }

    // Update profile sim balance
    if (profile) {
      await updateUserProfile({
        simBalance: newBalance,
        simPnL: parseFloat((profile.simPnL || 0) + pos.pnl).toFixed(2) as any,
      });
    }

    return closedTrade;
  };

  const closeAllSimulatedPositions = async (): Promise<void> => {
    if (simPositions.length === 0) return;
    const positionsToClose = [...simPositions];
    for (const p of positionsToClose) {
      await closeSimulatedPosition(p.id);
    }
  };

  const resetSimulator = () => {
    setSimPositions([]);
    setSimHistory([]);
    setSimBalance(10000);
    localStorage.setItem(LOCAL_STORAGE_SIM_POSITIONS_KEY, JSON.stringify([]));
    localStorage.setItem(LOCAL_STORAGE_SIM_HISTORY_KEY, JSON.stringify([]));
    localStorage.setItem(LOCAL_STORAGE_SIM_BALANCE_KEY, "10000");
  };

  // Trade logs (manual journal)
  const addTradeLog = async (trade: Omit<TradeLog, "id" | "userId" | "date">): Promise<TradeLog> => {
    const newLog: TradeLog = {
      ...trade,
      id: "trade-" + Date.now(),
      userId: user?.uid || profile?.uid || "guest",
      date: new Date().toLocaleDateString(),
    };

    const updated = [newLog, ...tradeLogs];
    setTradeLogs(updated);
    localStorage.setItem(LOCAL_STORAGE_TRADES_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, "trade_journal", newLog.id), newLog);
    } catch (err) {
      console.warn("Firestore trade log save warn:", err);
    }

    return newLog;
  };

  const deleteTradeLog = async (tradeId: string) => {
    const updated = tradeLogs.filter((t) => t.id !== tradeId);
    setTradeLogs(updated);
    localStorage.setItem(LOCAL_STORAGE_TRADES_KEY, JSON.stringify(updated));
  };

  // Contact messages
  const submitContactMessage = async (
    inquiry: Omit<ContactInquiry, "id" | "createdAt" | "status">
  ): Promise<string> => {
    let ticketId = "TKT-" + Math.floor(100000 + Math.random() * 900000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(inquiry),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.ticketId) ticketId = data.ticketId;
      }
    } catch (apiErr) {
      console.warn("Server contact API warn:", apiErr);
    }

    const newInquiry: ContactInquiry = {
      ...inquiry,
      id: ticketId,
      status: "new",
      createdAt: new Date().toISOString(),
    };

    const updated = [newInquiry, ...contactInquiries];
    setContactInquiries(updated);
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, "contact_messages", ticketId), newInquiry);
    } catch (err) {
      console.warn("Firestore contact sync fallback:", err);
    }

    return ticketId;
  };

  const resolveContactInquiry = async (inquiryId: string) => {
    const updated = contactInquiries.map((q) =>
      q.id === inquiryId ? { ...q, status: "resolved" as const } : q
    );
    setContactInquiries(updated);
    localStorage.setItem(LOCAL_STORAGE_INQUIRIES_KEY, JSON.stringify(updated));

    try {
      await updateDoc(doc(db, "contact_messages", inquiryId), { status: "resolved" });
    } catch (err) {
      console.warn("Firestore inquiry resolve warn:", err);
    }
  };

  // Admin courses
  const addNewCourse = async (course: Course) => {
    const updated = [...courses, course];
    setCourses(updated);
    localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(updated));

    try {
      await setDoc(doc(db, "courses", course.id), course);
    } catch (err) {
      console.warn("Firestore new course save warn:", err);
    }
  };

  const updateCoursePrice = async (courseId: string, newPrice: number) => {
    const updated = courses.map((c) => (c.id === courseId ? { ...c, price: newPrice } : c));
    setCourses(updated);
    localStorage.setItem(LOCAL_STORAGE_COURSES_KEY, JSON.stringify(updated));

    try {
      await updateDoc(doc(db, "courses", courseId), { price: newPrice });
    } catch (err) {
      console.warn("Firestore update course price warn:", err);
    }
  };

  return (
    <AcademyContext.Provider
      value={{
        courses,
        loadingCourses,
        activeCourse,
        setActiveCourse,
        rates,
        economicCalendar,
        tradeLogs,
        contactInquiries,
        transactions,
        submitTuitionPayment,
        confirmPayment,
        rejectPayment,
        hasCourseAccess,
        getCoursePaymentStatus,
        enrollInCourse,
        markLessonComplete,
        submitQuizScore,
        getCertificate,
        badges,
        awardPoints,
        awardBadge,
        leaderboard,
        simPositions,
        simHistory,
        simAccount,
        currentTickPrices,
        placeSimulatedOrder,
        closeSimulatedPosition,
        closeAllSimulatedPositions,
        resetSimulator,
        addTradeLog,
        deleteTradeLog,
        submitContactMessage,
        resolveContactInquiry,
        addNewCourse,
        updateCoursePrice,
        triggerConfetti,
      }}
    >
      {children}
    </AcademyContext.Provider>
  );
};

export const useAcademy = () => {
  const context = useContext(AcademyContext);
  if (!context) {
    throw new Error("useAcademy must be used within an AcademyProvider");
  }
  return context;
};
