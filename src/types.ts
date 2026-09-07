export type UserRole = "student" | "admin";
export type ExperienceLevel = "Beginner" | "Intermediate" | "Advanced" | "Professional";

export interface GamificationBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
  category: "Simulation" | "Knowledge" | "Strategy" | "Mastery";
  unlockedAt?: string;
}

export interface LeaderboardTrader {
  rank: number;
  uid: string;
  displayName: string;
  avatarUrl: string;
  points: number;
  level: string;
  badgesCount: number;
  quizAverage: number;
  simProfit: number;
  winRate: number;
  country: string;
}

export interface SimulatedPosition {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  lotSize: number;
  entryPrice: number;
  currentPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  pips: number;
  pnl: number;
  openTime: string;
}

export interface SimulatedHistoryTrade {
  id: string;
  pair: string;
  type: "BUY" | "SELL";
  lotSize: number;
  entryPrice: number;
  exitPrice: number;
  stopLoss?: number;
  takeProfit?: number;
  pips: number;
  pnl: number;
  openTime: string;
  closeTime: string;
  result: "PROFIT" | "LOSS" | "BREAKEVEN";
}

export interface SimulatorAccount {
  balance: number;
  equity: number;
  usedMargin: number;
  freeMargin: number;
  marginLevel: number;
  initialBalance: number;
}

export interface CandleStick {
  time: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
  bio?: string;
  experienceLevel?: ExperienceLevel;
  country?: string;
  phone?: string;
  createdAt: string;
  points: number;
  earnedBadges: string[];
  enrolledCourseIds: string[];
  unlockedCourseIds: string[]; // Paid and confirmed courses
  completedLessonIds: string[];
  completedCourseIds: string[];
  quizScores: Record<string, number>; // quizId -> score percentage (0-100)
  certificates: Record<string, CertificateData>; // courseId -> certificate details
  simBalance?: number;
  simPnL?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  passingScore: number; // e.g. 75
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  title: string;
  duration: string; // e.g. "18 mins"
  order: number;
  content: string; // Rich educational markdown / HTML description
  keyTakeaways: string[];
  chartExample?: {
    type: string;
    caption: string;
    indicators: string[];
  };
  resources?: { title: string; type: "PDF" | "Sheet" | "Calculator" | "Article"; url: string }[];
}

export type CourseLevel = "Beginner" | "Intermediate" | "Advanced" | "Mastery";
export type CourseCategory =
  | "ICT Strategy"
  | "CRT Strategy"
  | "Smart Money Concepts"
  | "Price Action"
  | "Wyckoff & Volume"
  | "Fundamentals"
  | "Risk & Psychology";

export interface Course {
  id: string;
  title: string;
  slug: string;
  level: CourseLevel;
  category: CourseCategory;
  duration: string; // e.g. "6 hours"
  price: number; // in USD (default $25 for paid academy courses)
  originalPrice?: number;
  rating: number; // e.g. 4.9
  reviewCount: number;
  studentsEnrolled: number;
  badge?: string; // e.g. "Bestseller", "ICT Core", "Institutional", "CRT Alpha"
  summary: string;
  description: string;
  learningOutcomes: string[];
  prerequisites: string[];
  instructor: {
    name: string;
    title: string;
    experience: string;
    avatar: string;
  };
  lessonsCount: number;
  lessons: Lesson[];
  finalQuiz: Quiz;
  createdAt: string;
  strategiesCovered?: string[];
}

export interface CertificateData {
  certificateId: string;
  userId: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  issuedAt: string;
  grade: string;
  score: number;
  instructorName: string;
  verificationHash: string;
}

export type PaymentMethod = "easypaisa" | "jazzcash" | "binance_crypto" | "credit_card" | "paypal";
export type PaymentStatus = "pending_verification" | "completed" | "rejected";

export interface PaymentTransaction {
  id: string;
  transactionId: string;
  userId: string;
  userEmail: string;
  studentName?: string;
  studentPhone?: string;
  courseId: string;
  courseTitle: string;
  amount: number; // e.g. 25
  currency: string;
  paymentMethod: PaymentMethod;
  referenceTid?: string; // Transaction ID / TID / Crypto TXID entered by student
  senderAccountOrWallet?: string;
  proofScreenshot?: string;
  status: PaymentStatus;
  createdAt: string;
  receiptNumber: string;
  adminConfirmedAt?: string;
  adminNotes?: string;
}

export interface TradeLog {
  id: string;
  userId: string;
  pair: string;
  direction: "BUY" | "SELL";
  entryPrice: number;
  exitPrice?: number;
  stopLoss: number;
  takeProfit: number;
  lotSize: number;
  pips?: number;
  pnl?: number;
  status: "OPEN" | "WON" | "LOST";
  strategy: string;
  notes: string;
  date: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: "Curriculum" | "Mentorship" | "Payment" | "Technical" | "Enterprise";
  status: "new" | "in_review" | "resolved";
  createdAt: string;
}

export interface ForexRate {
  pair: string;
  bid: number;
  ask: number;
  change24h: number;
  high: number;
  low: number;
  trend: "bullish" | "bearish" | "neutral";
  category: "Major" | "Commodity" | "Cross" | "Metal";
  spreadPips: number;
}

export interface EconomicEvent {
  time: string;
  currency: string;
  impact: "High" | "Medium" | "Low";
  event: string;
  actual: string;
  forecast: string;
  previous: string;
}
