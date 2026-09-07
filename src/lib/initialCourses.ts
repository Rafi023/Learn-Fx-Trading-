import { Course } from "../types";

export const INITIAL_COURSES: Course[] = [
  {
    id: "course-ict-301",
    title: "ICT Institutional Masterclass: Judas Swings, FVGs & Killzones",
    slug: "ict-institutional-masterclass",
    level: "Advanced",
    category: "ICT Strategy",
    duration: "8.5 Hours",
    price: 25,
    originalPrice: 199,
    rating: 4.99,
    reviewCount: 2140,
    studentsEnrolled: 11450,
    badge: "ICT Core",
    summary: "Master the algorithmic price delivery engine: London/NY Killzones, Judas Swings, Fair Value Gaps (FVG), AMD Power of 3, and the Silver Bullet setup.",
    description: "The Inner Circle Trader (ICT) methodology strips away traditional lagging indicators and exposes how central bank algorithmic market makers deliver price. In this comprehensive masterclass, you will learn the exact sequence institutional algorithms use: Asian session liquidity pooling, the London Judas Swing manipulation, Fair Value Gap (FVG) rebalancing, Optimal Trade Entry (OTE), and precision execution during the New York Silver Bullet window.",
    learningOutcomes: [
      "Identify the true algorithmic purpose of the Asian Session range and how London engineers the Judas Swing",
      "Map Fair Value Gaps (FVG), Volume Imbalances, and the Consequent Encroachment (50% level)",
      "Trade the Power of 3 (AMD: Accumulation, Manipulation, Distribution) across Daily and Intraday profiles",
      "Execute the ICT Optimal Trade Entry (OTE 62%-79% Fibonacci discount/premium sweep)",
      "Deploy the ICT Silver Bullet strategy (10:00 AM - 11:00 AM NY time) with 1:3+ Risk-to-Reward"
    ],
    prerequisites: ["Basic understanding of currency quotes and candlestick charts"],
    instructor: {
      name: "Tariq Vance (TwoStar Senior Mentor)",
      title: "Algorithmic Currency Specialist",
      experience: "Ex-Tier 1 Interbank Desk Trader, 10+ Years ICT Practitioner",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-01",
    strategiesCovered: ["Judas Swing", "Fair Value Gap (FVG)", "Power of 3 (AMD)", "Silver Bullet", "Killzones"],
    lessons: [
      {
        id: "les-ict-1",
        title: "1. The Judas Swing & Institutional Session Killzones",
        duration: "45 mins",
        order: 1,
        content: `### 1. The Algorithmic Delivery Model
Price in the interbank currency market is not driven by random retail buyers and sellers. It is dictated by an algorithm designed to seek liquidity and rebalance inefficient price delivery.

---

### 2. The 3 Core ICT Killzones (New York Local Time)
* **Asian Session Range (8:00 PM - 00:00 AM NY)**: Low volatility consolidation that establishes equal highs and equal lows. The algorithm leaves stop orders resting on both sides.
* **London Open Killzone (2:00 AM - 5:00 AM NY)**: The most explosive liquidity engineering window. Between 2:00 AM and 3:30 AM, the algorithm creates the **Judas Swing**—an aggressive false breakout against the true daily bias to trigger stop-losses and accumulate institutional inventory.
* **New York Open Killzone (7:00 AM - 10:00 AM NY)**: High-impact continuation or major retracement window following US macroeconomic releases (CPI, NFP, PPI).

---

### 3. Deconstructing the Judas Swing
1. **The Trap**: If the higher-timeframe daily bias is **Bullish**, the market maker algorithm drives price **DOWN** at London Open, sweeping below the Asian Session Low.
2. **The Liquidity Trigger**: Retail traders enter breakout shorts, and earlier buyers get stopped out. This flood of sell-stops provides the exact liquidity the smart money needs to buy at wholesale discount.
3. **The Displacement**: Immediately following the sweep, price prints an aggressive multi-candle green displacement back above the Asian low, creating an FVG. This confirms the Judas Swing is complete.`,
        keyTakeaways: [
          "Asian range highs and lows are liquidity pools primed for exploitation",
          "The Judas Swing is an intentional false breakout engineered at the London Open (2:00-3:30 AM NY)",
          "Never buy a breakout above Asian highs without waiting for the liquidity sweep"
        ]
      },
      {
        id: "les-ict-2",
        title: "2. Fair Value Gaps (FVG) & Inefficiency Rebalancing",
        duration: "50 mins",
        order: 2,
        content: `### 1. What is a Fair Value Gap (FVG)?
A Fair Value Gap is a 3-candle sequence where price expands so violently in one direction that orders on the other side are left unfilled. It represents a vacuum of market efficiency.

* **Bullish FVG**:
  * Candle 1: High creates the lower boundary.
  * Candle 2: Large expansion green candle.
  * Candle 3: Low creates the upper boundary.
  * *The Gap*: The space between Candle 1 High and Candle 3 Low has zero downward transaction volume.
* **Bearish FVG**:
  * Candle 1: Low creates the upper boundary.
  * Candle 2: Heavy sell displacement red candle.
  * Candle 3: High creates the lower boundary.

---

### 2. Consequent Encroachment (CE 50%)
The algorithmic midpoint of any Fair Value Gap is known as **Consequent Encroachment (CE)**. 
* Price frequently taps exactly the 50% CE level of the FVG before reversing violently in the direction of the displacement.
* If a candle body **closes decisively beyond the CE (50%)**, the FVG is considered invalid or weak.`,
        keyTakeaways: [
          "FVGs represent single-sided order flow that price returns to rebalance",
          "Consequent Encroachment (CE) is the critical 50% midpoint of the gap",
          "Always enter on the tap of an FVG aligned with higher timeframe market bias"
        ]
      },
      {
        id: "les-ict-3",
        title: "3. Power of 3 (AMD): Accumulation, Manipulation & Distribution",
        duration: "40 mins",
        order: 3,
        content: `### 1. The Anatomy of Every Daily Candle
Every daily candlestick (OHLC - Open, High, Low, Close) follows the **Power of 3 (AMD)** cycle:
1. **Accumulation (Open)**: In the Asian session, price consolidates near the session open price, building order book liquidity on both sides.
2. **Manipulation (High/Low of the Day)**: During London Open, price runs aggressively in the opposite direction of the true trend to create the wick of the day.
3. **Distribution (Trend)**: The real expansion occurs into the New York session, moving hundreds of pips toward target liquidity pools before closing near the opposite extreme.

---

### 2. The Midnight Open Filter
Institutional traders anchor their intraday bias to the **New York Midnight Open (00:00 NY Time)**:
* For **Long Setups**: Look to buy **BELOW** the Midnight Open after the manipulation phase sweeps sell-side liquidity.
* For **Short Setups**: Look to sell **ABOVE** the Midnight Open after the manipulation phase sweeps buy-side liquidity.`,
        keyTakeaways: [
          "AMD governs all timeframes: Accumulation -> Manipulation -> Distribution",
          "The London wick creates the extreme high or low of the day 70%+ of the time",
          "Buy below NY Midnight Open for longs; sell above for shorts"
        ]
      },
      {
        id: "les-ict-4",
        title: "4. The ICT Silver Bullet & Optimal Trade Entry (OTE)",
        duration: "55 mins",
        order: 4,
        content: `### 1. The 10:00 AM - 11:00 AM NY Silver Bullet
The Silver Bullet is an institutional setup that repeats every single trading day like clockwork:
* **Time Window**: 10:00 AM to 11:00 AM New York time.
* **Condition 1**: A key liquidity pool (Previous Session High/Low or Daily High/Low) has been purged.
* **Condition 2**: A clear Market Structure Shift (MSS) occurs with energetic displacement on the 1-Minute or 5-Minute chart.
* **Condition 3**: The displacement leaves a fresh Fair Value Gap (FVG).
* **Execution**: Place a limit order at the FVG. Stop Loss is set safely beyond the swing pivot. Take Profit is targeted at opposing liquidity or a fixed 1:2 to 1:3 R:R.

---

### 2. Optimal Trade Entry (OTE 62% - 79%)
When price pulls back into a dealing range:
* Anchor your Fibonacci from the swing low to the swing high.
* The institutional sweet spot is the **0.62 to 0.79 level**, centered around the **0.705 sweet spot**.
* When the 0.705 OTE aligns with an unmitigated Order Block or FVG, win rate exceeds 75%.`,
        keyTakeaways: [
          "Silver Bullet window (10:00-11:00 AM NY) offers pristine intraday scalp setups",
          "Look for liquidity sweep + Market Structure Shift + FVG entry",
          "OTE (62% - 79% Fib) marks algorithmic wholesale pricing"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-ict-301",
      title: "ICT Algorithmic Trading Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-ict-1",
          question: "What is the primary algorithmic purpose of the London Judas Swing?",
          options: [
            "To test internet connection speeds of European brokers",
            "To create a false breakout against true daily bias, triggering retail stops to accumulate institutional positions",
            "To signal the close of all worldwide currency markets",
            "To ensure moving averages cross over"
          ],
          correctIndex: 1,
          explanation: "The Judas Swing is an intentional institutional liquidity sweep designed to induce retail traders into wrong-way breakout positions."
        },
        {
          id: "q-ict-2",
          question: "What is 'Consequent Encroachment' (CE) in Fair Value Gap analysis?",
          options: [
            "The exact 50% midpoint of the Fair Value Gap range",
            "The high of Candle 3",
            "The volume of trading contracts",
            "The 200-day moving average"
          ],
          correctIndex: 0,
          explanation: "Consequent Encroachment represents the 50% algorithmic midpoint of an FVG that price respects as dynamic support or resistance."
        },
        {
          id: "q-ict-3",
          question: "In the Power of 3 (AMD) framework for a Bullish day, where does institutional smart money look to accumulate Longs?",
          options: [
            "At the very highest price of the New York afternoon",
            "Below the NY Midnight Open price during the London manipulation phase",
            "Only on Friday evenings",
            "Whenever the RSI is above 80"
          ],
          correctIndex: 1,
          explanation: "In a bullish daily candle, smart money buys below the open during the London manipulation wick to secure wholesale prices."
        },
        {
          id: "q-ict-4",
          question: "What specific 1-hour window defines the ICT Silver Bullet intraday model?",
          options: [
            "10:00 AM - 11:00 AM New York Local Time",
            "04:00 PM - 05:00 PM London Time",
            "08:00 PM - 09:00 PM Tokyo Time",
            "12:00 AM - 01:00 AM Sydney Time"
          ],
          correctIndex: 0,
          explanation: "The ICT Silver Bullet window executes between 10:00 AM and 11:00 AM New York time following the morning macroeconomic volatility."
        }
      ]
    }
  },
  {
    id: "course-crt-202",
    title: "CRT (Candle Range Theory) & Wick Liquidity Architecture",
    slug: "candle-range-theory-crt",
    level: "Intermediate",
    category: "CRT Strategy",
    duration: "6.0 Hours",
    price: 25,
    originalPrice: 179,
    rating: 4.97,
    reviewCount: 1680,
    studentsEnrolled: 8920,
    badge: "CRT Alpha",
    summary: "Decode how price respects and expands higher timeframe candle ranges, wick purges, open-high-low-close manipulations, and true breakout validation.",
    description: "Candle Range Theory (CRT) is one of the most powerful and objective trading models used by elite private prop traders. CRT proves that markets do not move randomly; they expand from one candle range to the next. Learn how to map high-timeframe (Daily & 4-Hour) mother candle ranges, trade the manipulation of the open, identify wick purges, and execute high-precision scalps inside HTF dealing ranges.",
    learningOutcomes: [
      "Master the fundamental laws of Candle Range Theory (CRT) across Daily, 4H, and 1H ranges",
      "Differentiate between a genuine range expansion and a wick liquidity sweep",
      "Identify the CRT Turtle Soup setup when price pierces a candle high/low and closes back inside",
      "Trade the CRT Open-Manipulation-Target sequence on the 5-Minute and 15-Minute execution charts",
      "Calculate high-probability Take Profit targets based on next-range expansion boundaries"
    ],
    prerequisites: ["Familiarity with candlestick charts and basic market structure"],
    instructor: {
      name: "Zane Sterling",
      title: "CRT Specialist & Funded Desk Trader",
      experience: "7-Figure Prop Firm Funded Trader, Head of CRT Analysis at TwoStarTrader",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-10",
    strategiesCovered: ["CRT Dealing Ranges", "Wick Purges", "Open Manipulation", "Range Expansion Targets"],
    lessons: [
      {
        id: "les-crt-1",
        title: "1. The Foundations of Candle Range Theory (CRT)",
        duration: "40 mins",
        order: 1,
        content: `### 1. What is Candle Range Theory?
Every single candle on your chart has an **Upper Wick (High)**, a **Lower Wick (Low)**, and a **Body (Open & Close)**. 
* Under CRT, every higher-timeframe candle (Daily, 4-Hour, 1-Hour) defines an active **Dealing Range**.
* Price can only do one of two things relative to a prior candle:
  1. **Respect the Range & Reverse**: Sweep the high/low of the prior candle and close back inside the range.
  2. **Expand the Range**: Decisively close beyond the high/low of the prior candle, initiating a new directional expansion.

---

### 2. High Timeframe Mother Ranges
The secret to CRT is anchoring your analysis to the **Daily (D1) or 4-Hour (4H)** candle.
* Mark the **High** and **Low** of yesterday's Daily candle.
* Mark the **50% Equilibrium** of that candle's total range.
* You now have the exact institutional roadmap: when price visits the Daily High, it is hunting liquidity; if it rejects, it will target the Daily 50% and the Daily Low.`,
        keyTakeaways: [
          "Every HTF candle High and Low is an active institutional dealing range",
          "50% of the HTF candle marks equilibrium between buyers and sellers",
          "Never enter mid-range; always execute at the extremes (High or Low)"
        ]
      },
      {
        id: "les-crt-2",
        title: "2. Wick Purges vs. Body Closes: Validating True Breakouts",
        duration: "45 mins",
        order: 2,
        content: `### 1. The Wick Tells the Story
Retail traders see price poke 5 pips above a major 4-Hour high and scream 'Breakout!'. They buy the top and immediately get crushed.
* **The Wick Purge (Liquidity Sweep)**: Price pierces the prior candle's high with an upper wick, but the candle **body closes back BELOW the high**. This proves institutional absorption: sellers stepped in and rejected the expansion.
* **The Body Close (Expansion)**: The candle **body closes cleanly above the prior high**. This confirms smart money is willing to accept higher prices, validating trend continuation.

---

### 2. The CRT Turtle Soup Setup
1. Identify a key HTF candle range (e.g. Previous Day High).
2. Wait for current session price to pierce the High.
3. Drop down to the 5-Minute or 15-Minute chart.
4. When a lower timeframe candle sweeps the high and closes with a bearish rejection body, enter Short immediately with Stop Loss just above the wick extreme. Target: The opposite extreme of the range (Previous Day Low).`,
        keyTakeaways: [
          "Wicks = Rejection & Liquidity Sweeps; Bodies = Institutional Acceptance",
          "A wick beyond an HTF high followed by an internal close is a high-probability reversal signal",
          "Target the opposite end of the candle range for 1:3 to 1:6 Risk-to-Reward"
        ]
      },
      {
        id: "les-crt-3",
        title: "3. The CRT Open-Manipulation Sequence",
        duration: "35 mins",
        order: 3,
        content: `### 1. The Cycle of the New Candle
When a new 4-Hour or Daily candle opens, the institutional algorithm follows a strict sequence:
1. **The Open**: Price starts at zero momentum.
2. **The Manipulation (Judas Phase)**: The algorithm pushes price in the opposite direction of the expected candle close. For a green candle, it drops first to establish the lower wick.
3. **The Expansion (Body Phase)**: The algorithm accelerates aggressively toward the opposite liquidity target.
4. **The Close**: Price settles near the extreme high or low.

### 2. Practical Execution Rule
If your daily directional bias is Bullish:
* Never buy when price is actively pushing new highs.
* Wait for the candle to open, watch it dip **below the open** into discount, sweep a lower liquidity wick, and enter as price reclaims the open level!`,
        keyTakeaways: [
          "New candles almost always test against the true direction to form their initial wick",
          "Enter on the reclaim of the candle open after the manipulation dip",
          "Align CRT candle open levels with New York and London session clocks"
        ]
      },
      {
        id: "les-crt-4",
        title: "4. Multi-Timeframe CRT Scalping & Target Mapping",
        duration: "50 mins",
        order: 4,
        content: `### 1. The CRT Russian Doll Concept
Just like Russian nesting dolls, every Daily candle contains six 4-Hour candles; every 4-Hour candle contains sixteen 15-Minute candles.
* The structure on the 15-Minute chart will mimic the exact behavior of the 4-Hour chart.
* When the 4-Hour candle is in its expansion phase, every 15-Minute retracement to a prior 15-Minute CRT low is a buying opportunity.

---

### 2. Objective Range Targets
With CRT, you never have to guess where to exit:
* Target 1: The 50% Equilibrium of the HTF candle.
* Target 2: The opposing Wick extreme of the HTF candle.
* Target 3: The unmitigated candle range from 2 days prior.`,
        keyTakeaways: [
          "Lower timeframe CRT ranges nest directly inside higher timeframe ranges",
          "Use the 50% equilibrium for conservative profit taking",
          "Let runner positions target the opposing range extreme"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-crt-202",
      title: "CRT (Candle Range Theory) Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-crt-1",
          question: "Under Candle Range Theory, what does a wick piercing a prior candle's high followed by a body close BELOW that high signify?",
          options: [
            "A strong breakout confirmation indicating you should immediately buy",
            "A liquidity sweep / wick purge showing sellers rejected the higher price and absorbed liquidity",
            "A technical glitch in the charting software",
            "An immediate market holiday"
          ],
          correctIndex: 1,
          explanation: "In CRT, wicks indicate price rejection. Piercing a high but closing back inside proves the breakout was a liquidity sweep."
        },
        {
          id: "q-crt-2",
          question: "Where does institutional smart money seek entries when trading the CRT candle open sequence for an expected Bullish candle?",
          options: [
            "At the very highest tip of the upper wick",
            "Below the candle Open price during the downward manipulation phase",
            "Only 5 minutes before the weekend market close",
            "Whenever volume is zero"
          ],
          correctIndex: 1,
          explanation: "Smart money buys below the open during the initial downward manipulation phase that forms the lower wick."
        },
        {
          id: "q-crt-3",
          question: "What is the primary objective target when entering a CRT reversal setup at the Previous Day High?",
          options: [
            "The Previous Day Low (opposing range extreme) and the 50% equilibrium",
            "An arbitrary 5-pip profit",
            "The moon",
            "The closing price of the Sydney session"
          ],
          correctIndex: 0,
          explanation: "When price rejects a range high, CRT states that price will travel to rebalance toward the 50% equilibrium and the opposing range low."
        }
      ]
    }
  },
  {
    id: "course-smc-302",
    title: "SMC (Smart Money Concepts): True Structure, Inducement & Mitigation",
    slug: "smart-money-concepts-inducement",
    level: "Advanced",
    category: "Smart Money Concepts",
    duration: "7.5 Hours",
    price: 25,
    originalPrice: 249,
    rating: 4.98,
    reviewCount: 2890,
    studentsEnrolled: 14320,
    badge: "Institutional",
    summary: "Stop falling for retail traps. Master true swing structure vs internal structure, Inducement (IDM), valid vs fake Order Blocks, and Breaker mitigation.",
    description: "Most traders learning Smart Money Concepts fail because they label every single swing high and low as a structural break (BOS). In this course, you will learn the authentic institutional definition of Market Structure: why a high is NOT valid until price sweeps Inducement (IDM), how to identify genuine institutional Order Blocks versus retail liquidity traps, and how to execute with 1:5+ Risk-to-Reward on breaker blocks.",
    learningOutcomes: [
      "Distinguish between True Major Structure and Internal Retail Noise",
      "Identify Inducement (IDM)—the first internal pullback smart money uses to trap early traders",
      "Filter out 80% of fake Order Blocks by requiring structural displacement and FVG confirmation",
      "Master the Breaker Block: flipping failed Order Blocks into explosive mitigation launchpads",
      "Execute the complete top-down SMC checklist with mathematical precision"
    ],
    prerequisites: ["Forex Foundations or basic technical analysis experience"],
    instructor: {
      name: "Marcus Vance",
      title: "Senior Macro Currency Strategist",
      experience: "14+ Years Institutional FX Trading (London/Zurich)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-15",
    strategiesCovered: ["Inducement (IDM)", "True Market Structure", "Order Blocks", "Breaker Blocks", "Mitigation"],
    lessons: [
      {
        id: "les-smc-1",
        title: "1. True Market Structure & The Inducement (IDM) Trap",
        duration: "45 mins",
        order: 1,
        content: `### 1. Why 90% of SMC Traders Get Stopped Out
The biggest flaw in retail SMC education is labeling every minor pivot as a Break of Structure (BOS). 
* In a genuine Bullish trend, a Higher High is **NOT CONFIRMED** when price breaks the previous high!
* A Higher High is only confirmed when price retraces and **SWEEPS THE INDUCEMENT (IDM)**!

---

### 2. What is Inducement (IDM)?
Inducement is the **first valid internal pullback** created during an impulsive leg.
* Why does it exist? Early retail buyers see price rallying and jump in with stop-losses resting just beneath the first shallow pullback.
* The algorithm drops price sharply to purge this internal low (the Inducement).
* Only AFTER Inducement is swept does the algorithm tap an unmitigated Order Block and launch the real continuation move.`,
        keyTakeaways: [
          "Never mark a Higher High until price sweeps Inducement (IDM)",
          "Inducement is the first internal pullback that lures early retail traders",
          "Sweeping IDM transfers retail liquidity to institutional order books"
        ]
      },
      {
        id: "les-smc-2",
        title: "2. Validating High-Probability Order Blocks",
        duration: "50 mins",
        order: 2,
        content: `### 1. Anatomy of a Real Institutional Order Block
Not every red candle before a green move is an Order Block. An institutional Order Block must satisfy **THREE NON-NEGOTIABLE CONDITIONS**:
1. **Liquidity Sweep**: The candidate candle MUST have swept the high or low of a preceding candle (Turtle Soup).
2. **Aggressive Displacement**: The subsequent candles must explode with heavy volume, creating a valid Fair Value Gap (FVG).
3. **Structural Break**: The move must break significant market structure (BOS or CHOCH).

If an Order Block does not have an accompanying FVG or did not sweep liquidity, it is a **Trap Order Block** engineered by algorithms to fail.`,
        keyTakeaways: [
          "A valid Order Block MUST sweep prior liquidity and create an FVG",
          "Trap Order Blocks lack imbalances and fail on the first retest",
          "Place Stop Loss strictly behind the extreme of the valid Order Block"
        ]
      },
      {
        id: "les-smc-3",
        title: "3. Breaker Blocks & Mitigation Mechanics",
        duration: "40 mins",
        order: 3,
        content: `### 1. What is a Breaker Block?
When an Order Block fails to hold price and gets violated with aggressive displacement, it does NOT disappear—it transforms into a **Breaker Block**.
* An Order Block that swept liquidity before getting decisively broken becomes a magnet for price retests.
* Trapped institutional traders who were on the wrong side of the failed block will mitigate (exit at breakeven), causing price to bounce aggressively in the opposite direction.

### 2. Bullish vs. Bearish Breakers
* **Bullish Breaker**: A bearish order block that failed and was violently broken to the upside. When price retests this zone from above, it acts as formidable support.
* **Bearish Breaker**: A bullish order block that failed and was violently broken downward. When retested from below, it acts as formidable resistance.`,
        keyTakeaways: [
          "Failed Order Blocks that swept liquidity become Breaker Blocks",
          "Breaker Blocks offer high-probability mitigation entries on retest",
          "Look for clean displacement through the block to validate the flip"
        ]
      },
      {
        id: "les-smc-4",
        title: "4. Top-Down Institutional Execution Blueprint",
        duration: "45 mins",
        order: 4,
        content: `### 1. The 4-Step Institutional Checklist
1. **Higher Timeframe Bias (Daily / 4H)**: Determine whether price is expanding from an HTF discount into premium or sweeping key external liquidity.
2. **Identify the Point of Interest (POI)**: Locate the unmitigated Order Block or FVG aligned with the HTF bias.
3. **Wait for Inducement Sweep (15M)**: Ensure price has swept internal liquidity (IDM) before entering.
4. **Lower Timeframe Confirmation (1M - 5M)**: Look for a Change of Character (CHOCH) with displacement inside your POI for a razor-tight stop loss (3-7 pips).`,
        keyTakeaways: [
          "Always align lower timeframe execution with higher timeframe POIs",
          "Require 15M Inducement sweep + 1M/5M CHOCH for entry confirmation",
          "Enjoy 1:5 to 1:10 Risk-to-Reward when targeting HTF structural extremes"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-smc-302",
      title: "Smart Money Concepts & Inducement Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-smc-1",
          question: "What is Inducement (IDM) in institutional market structure?",
          options: [
            "A bonus paid by forex brokers to open new accounts",
            "The first internal pullback whose liquidity must be swept before a genuine swing high or low is confirmed",
            "A technical indicator invented in 1920",
            "A moving average crossover"
          ],
          correctIndex: 1,
          explanation: "Inducement represents the initial internal liquidity pool created to trap early retail traders before smart money drives the real move."
        },
        {
          id: "q-smc-2",
          question: "What essential element separates a genuine institutional Order Block from a retail trap block?",
          options: [
            "It must be purple on the chart",
            "It must have swept prior liquidity, generated violent displacement, and left a Fair Value Gap (FVG)",
            "It must have occurred on a Tuesday",
            "It must be exactly 10 pips wide"
          ],
          correctIndex: 1,
          explanation: "A valid Order Block requires evidence of institutional footprints: sweeping liquidity and leaving an imbalance (FVG) in its wake."
        },
        {
          id: "q-smc-3",
          question: "What happens when an Order Block that previously swept liquidity gets decisively broken by price?",
          options: [
            "It is deleted forever from technical analysis",
            "It converts into a Breaker Block, offering high-probability mitigation entries on retest",
            "The market immediately halts trading",
            "It guarantees that price will consolidate for 1 month"
          ],
          correctIndex: 1,
          explanation: "Violated Order Blocks that swept liquidity flip into Breaker Blocks as trapped institutional volume mitigates at breakeven."
        }
      ]
    }
  },
  {
    id: "course-pa-102",
    title: "Pure Price Action & Market Geometry (Real-Market Mastery)",
    slug: "pure-price-action-geometry",
    level: "Intermediate",
    category: "Price Action",
    duration: "6.5 Hours",
    price: 25,
    originalPrice: 169,
    rating: 4.96,
    reviewCount: 1920,
    studentsEnrolled: 9840,
    badge: "Price Action Core",
    summary: "Strip away all indicators. Read pure candlestick velocity, horizontal polarity flips, dynamic trend channels, and institutional exhaustion patterns.",
    description: "Real currency trading does not require complex indicator spaghetti. Pure Price Action teaches you how to read raw candlesticks and market geometry just like bank floor traders did for decades. Learn the horizontal polarity flip (S/R role reversal), the mathematics of dynamic trend channels, candlestick momentum combustion, and top-down multi-timeframe confluence.",
    learningOutcomes: [
      "Trade horizontal support & resistance zones using the Polarity Principle (Role Reversals)",
      "Construct dynamic trend channels and identify exhaustion overshoots",
      "Read single and multi-candlestick momentum: Exhaustion Pin Bars, Absorption Engulfing, and Inside Bar squeezes",
      "Spot and execute the classic False Breakout Trap at key psychological price round numbers (1.1000, 1.3000)",
      "Execute multi-timeframe top-down trend alignment with zero lagging indicators"
    ],
    prerequisites: ["Basic understanding of currency pairs and trading terminals"],
    instructor: {
      name: "Elena Rostova",
      title: "Lead Technical Chartist & Prop Desk Trader",
      experience: "Ex-Bank of America Currency Desk, 11 Years Prop Firm Mentor",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-18",
    strategiesCovered: ["Polarity Flip", "Trend Channels", "Candlestick Exhaustion", "False Breakout Traps"],
    lessons: [
      {
        id: "les-pa-1",
        title: "1. The Polarity Principle: True Support & Resistance Flips",
        duration: "40 mins",
        order: 1,
        content: `### 1. Why Support Becomes Resistance
The Polarity Principle is rooted in trader psychology and institutional order matching:
* When a major Support zone is decisively shattered, traders who bought at support are trapped in painful floating losses.
* When price eventually retraces back to that level, these trapped traders rush to close their positions at breakeven (**selling** to exit longs).
* Concurrently, breakout traders who missed the initial drop jump in with fresh short positions.
* The confluence of breakeven sellers + new trend sellers creates an impenetrable ceiling of resistance.

---

### 2. Zones of Value vs. Single Lines
Never draw 1-pixel lines on your charts. Always draw **Zones of Value** encompassing the body closes and wick tips of the defining swing pivots.`,
        keyTakeaways: [
          "Broken support reliably flips to future resistance (and vice versa) due to trapped breakeven order flow",
          "Draw zones of value encompassing both candlestick bodies and extreme wicks",
          "Higher timeframe (Daily/4H) polarity levels command 10x the liquidity of lower timeframes"
        ]
      },
      {
        id: "les-pa-2",
        title: "2. Candlestick Combustion: Reading Real Velocity & Exhaustion",
        duration: "45 mins",
        order: 2,
        content: `### 1. Velocity vs. Deceleration
A trend does not reverse spontaneously; it signals its exhaustion through candlestick velocity:
* **Impulse Phase**: Long full-bodied candles with tiny wicks indicating dominant one-sided control.
* **Deceleration Phase**: Candle bodies shrink by 50% or more, and wicks start appearing on both sides.
* **Exhaustion Phase**: A giant explosive candle appears into a major key zone (often news-driven), but leaves an enormous rejection wick.

### 2. High-Probability Reversal Signatures
1. **The Absorption Pin Bar**: A long wick piercing a major level with a tiny body closing near the opposite extreme.
2. **The Engulfing Shift**: A decisive single candle whose body completely swallows the previous 2-3 candles, proving immediate regime change.`,
        keyTakeaways: [
          "Candlestick body sizes indicate real institutional momentum; wicks indicate price rejection",
          "Look for shrinkage in candle bodies as price approaches key higher timeframe zones",
          "Enter only after the confirmation candle closes decisively"
        ]
      },
      {
        id: "les-pa-3",
        title: "3. Dynamic Trend Channels & Overshoot Traps",
        duration: "35 mins",
        order: 3,
        content: `### 1. Constructing Objective Trend Channels
* Connect two or more swing highs and parallel the angle against swing lows.
* A healthy trend moves predictably within the channel boundaries.

### 2. The Channel Overshoot Climax
* When price suddenly bursts aggressively **OUT of the top** of a rising bull channel, retail traders believe the trend is speeding up.
* In institutional reality, this is an **Exhaustion Climax**—smart money is dumping their final long inventory into retail FOMO.
* When price rapidly drops back inside the channel, it triggers a catastrophic collapse to the opposite channel boundary.`,
        keyTakeaways: [
          "Channel overshoots represent buying/selling climaxes, not trend accelerations",
          "When price fails to reach a channel boundary, it signals impending structural breakout",
          "Combine channel tests with psychological round numbers (e.g. 1.2500, 1.3000)"
        ]
      },
      {
        id: "les-pa-4",
        title: "4. The 3-Step Top-Down Confluence System",
        duration: "40 mins",
        order: 4,
        content: `### 1. Daily -> 1-Hour -> 15-Minute Alignment
1. **Daily Chart**: Identify the dominant market trend and the major Polarity Zones.
2. **1-Hour Chart**: Locate the immediate dealing range and chart patterns (Flags, Double Tops, S/R retests).
3. **15-Minute Chart**: Trigger your entry with candlestick exhaustion and tight risk.

### 2. The Power of Psychological Round Numbers
Banks and sovereign funds enter orders at large round numbers (e.g. EUR/USD at 1.0800, 1.0900, 1.1000). Always factor institutional quarter-levels (00, 20, 50, 80) into your price action confluence!`,
        keyTakeaways: [
          "Never trade against the prevailing Daily price action bias",
          "Quarter levels (00, 20, 50, 80) act as natural algorithmic magnets",
          "Top-down confluence dramatically reduces false signals and whipsaws"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-pa-102",
      title: "Pure Price Action Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-pa-1",
          question: "What is the psychological driver behind the Polarity Principle (Support turning into Resistance)?",
          options: [
            "Trapped buyers looking to exit at breakeven create a flood of sell orders when price retests the broken support level",
            "The currency printing presses run out of paper",
            "Traders randomly flip coins at the end of each session",
            "Brokers turn off liquidity"
          ],
          correctIndex: 0,
          explanation: "When support breaks, trapped long holders look to exit at breakeven on the first bounce, generating strong selling pressure."
        },
        {
          id: "q-pa-2",
          question: "When price accelerates aggressively OUT of the top boundary of an ascending bull channel, what does it frequently signal?",
          options: [
            "A buying climax / exhaustion overshoot followed by a sharp mean reversion drop",
            "An infinite bull run that will never stop",
            "The end of global currency trading",
            "A guaranteed 100% winning buy order"
          ],
          correctIndex: 0,
          explanation: "Channel overshoots represent retail FOMO buying climaxes where institutions distribute inventory before an aggressive reversal."
        },
        {
          id: "q-pa-3",
          question: "Why do institutional market participants pay special attention to 'Round Numbers' (e.g. 1.1000, 1.0800)?",
          options: [
            "Because large commercial banks and algorithmic option barriers cluster hedging orders at whole psychological benchmarks",
            "Because computers cannot calculate decimal points",
            "It is required by United Nations regulations",
            "Only retail traders care about round numbers"
          ],
          correctIndex: 0,
          explanation: "Round numbers (and institutional quarters 00, 20, 50, 80) act as major psychological clusters for corporate and sovereign FX orders."
        }
      ]
    }
  },
  {
    id: "course-wyckoff-303",
    title: "Wyckoff Institutional Method & Volume Spread Analysis",
    slug: "wyckoff-method-volume-spread",
    level: "Advanced",
    category: "Wyckoff & Volume",
    duration: "7.0 Hours",
    price: 25,
    originalPrice: 199,
    rating: 4.95,
    reviewCount: 1450,
    studentsEnrolled: 7640,
    badge: "Wyckoff Alpha",
    summary: "Decode the Composite Operator's footprint: Accumulation, Distribution, Springs, Upthrusts (UTAD), and Volume Spread Analysis (VSA).",
    description: "Developed by Richard D. Wyckoff and refined for modern algorithmic foreign exchange, this methodology tracks the accumulation and distribution phases of 'The Composite Operator' (institutional smart money). Learn the exact anatomy of Phase A through Phase E, how to identify Springs and Upthrusts (UTAD), and how Volume Spread Analysis reveals the true intentions of smart money.",
    learningOutcomes: [
      "Identify the 4 market phases: Accumulation, Markup, Distribution, and Markdown",
      "Trade the Wyckoff Spring (Phase C)—the ultimate shakeout before explosive upward markups",
      "Identify the Upthrust After Distribution (UTAD) to enter high-probability macro short positions",
      "Apply Volume Spread Analysis (VSA) to spot No Demand / No Supply test bars",
      "Synthesize Wyckoff schematics with modern interbank liquidity pools"
    ],
    prerequisites: ["Technical analysis fundamentals and market structure knowledge"],
    instructor: {
      name: "David K. Campbell",
      title: "Trading Psychologist & Quantitative Risk Director",
      experience: "Ex-Hedge Fund Risk Manager, Author of 'The Disciplined Edge'",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-22",
    strategiesCovered: ["Wyckoff Accumulation", "Wyckoff Distribution", "Spring Setup", "UTAD", "Volume Spread Analysis"],
    lessons: [
      {
        id: "les-wyckoff-1",
        title: "1. The Composite Operator & The 4 Market Phases",
        duration: "45 mins",
        order: 1,
        content: `### 1. Who is the Composite Operator?
Richard Wyckoff taught that traders should view all market price fluctuations as if they were orchestrated by a single master entity: **The Composite Operator**.
* The Composite Operator carefully plans, executes, and concludes campaigns in four distinct phases:
  1. **Accumulation**: Silently purchasing large quantities of currency at wholesale prices within a defined trading range.
  2. **Markup**: Driving price aggressively upward once retail supply is exhausted.
  3. **Distribution**: Transferring the acquired inventory back to retail buyers at high, premium prices.
  4. **Markdown**: Driving price lower once all institutional long inventory has been sold.`,
        keyTakeaways: [
          "Markets alternate between Accumulation (building inventory) and Distribution (liquidating inventory)",
          "Institutions cannot buy in rising markets; they must accumulate quietly inside consolidation ranges",
          "Never trade in the middle of a range before the shakeout phase occurs"
        ]
      },
      {
        id: "les-wyckoff-2",
        title: "2. The Wyckoff Spring: The Ultimate Phase C Shakeout",
        duration: "50 mins",
        order: 2,
        content: `### 1. Anatomy of the Spring
A **Spring** occurs in Phase C of the Wyckoff Accumulation schematic. It is the final, decisive test of available supply before the markup begins:
* Price deliberately breaks below the well-established trading range support low.
* This triggers stop-loss sell orders from breakout traders and long holders.
* If little or no heavy selling volume appears on the breakdown, it proves that sellers have been completely exhausted.
* Price snaps back aggressively inside the trading range, proving the breakdown was a trap.

---

### 2. Trading the Spring Retest
* Do not chase the initial snap-back.
* Wait for the **Test of the Spring**—a low-volume, shallow retest of the broken level.
* Enter Long with a tight stop below the Spring low. Target: The top of the trading range and the eventual markup expansion.`,
        keyTakeaways: [
          "The Spring is the final institutional purge of sell-side liquidity before the markup",
          "A valid Spring quickly snaps back inside the trading range on high relative volume",
          "Enter on the shallow low-volume retest for asymmetric Risk-to-Reward"
        ]
      },
      {
        id: "les-wyckoff-3",
        title: "3. Upthrust After Distribution (UTAD): The Macro Top",
        duration: "40 mins",
        order: 3,
        content: `### 1. What is an Upthrust (UTAD)?
The Upthrust After Distribution (UTAD) is the exact inverse of a Spring:
* It occurs at the top of a prolonged distribution trading range.
* Price pushes aggressively above the established resistance high, creating the illusion of a massive bullish breakout.
* Retail traders FOMO buy the top.
* The Composite Operator uses this flood of retail buy orders to unload their remaining long inventory.
* Price fails to maintain momentum and plunges back inside the range, confirming the top is in.`,
        keyTakeaways: [
          "UTAD is an institutional distribution trap designed to absorb retail breakout buying",
          "Failure to hold above range highs signals an impending Markdown phase",
          "Target the bottom of the distribution range and lower structural liquidity"
        ]
      },
      {
        id: "les-wyckoff-4",
        title: "4. Volume Spread Analysis (VSA): No Demand & No Supply Bars",
        duration: "40 mins",
        order: 4,
        content: `### 1. Volume Spread Analysis Essentials
VSA studies the relationship between the price spread (range of the candle), the close, and the accompanying volume:
* **No Supply Bar**: A narrow-spread down candle on very low volume. This proves sellers are absent. When this occurs at a key support zone, an upward rally is imminent.
* **No Demand Bar**: A narrow-spread up candle on very low volume. This proves buyers have dried up. When this occurs at resistance, a downward drop is imminent.`,
        keyTakeaways: [
          "Low volume on a test proves lack of counter-trend opposition",
          "No Supply at support = High-probability Buy; No Demand at resistance = High-probability Sell",
          "Combine Wyckoff phase recognition with VSA test bars for surgical entries"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-wyckoff-303",
      title: "Wyckoff Institutional Method Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-wyckoff-1",
          question: "In the Wyckoff Accumulation schematic, what is a 'Spring'?",
          options: [
            "A sudden jump in currency values caused by changing calendar seasons",
            "A decisive breakdown below the range support that purges sell stops before quickly reclaiming the range",
            "A moving average oscillator indicator",
            "An error on the trading broker server"
          ],
          correctIndex: 1,
          explanation: "A Spring is the signature Phase C shakeout where smart money dips price below range support to absorb remaining liquidity before initiating the markup."
        },
        {
          id: "q-wyckoff-2",
          question: "What does an Upthrust After Distribution (UTAD) signify?",
          options: [
            "An aggressive false breakout above range resistance where smart money liquidates their final inventory into retail FOMO",
            "A guaranteed 1,000 pip rally",
            "A central bank emergency rate hike",
            "The market is closed for holidays"
          ],
          correctIndex: 0,
          explanation: "The UTAD is the climax of distribution where price pushes above resistance to lure retail buyers, allowing institutions to execute massive short positions."
        },
        {
          id: "q-wyckoff-3",
          question: "According to Volume Spread Analysis (VSA), what does a 'No Supply' test bar indicate at a key support level?",
          options: [
            "That sellers have completely dried up and upward price expansion is primed to occur",
            "That the broker has run out of currency contracts",
            "That price will crash to zero",
            "That trading should be avoided for 1 year"
          ],
          correctIndex: 0,
          explanation: "A No Supply bar has a narrow range and low volume, proving there is no selling pressure left to prevent the market from rallying."
        }
      ]
    }
  },
  {
    id: "course-risk-401",
    title: "Forex Foundations, Risk Architecture & Prop Firm Mastery",
    slug: "forex-foundations-risk-mastery",
    level: "Beginner",
    category: "Risk & Psychology",
    duration: "5.5 Hours",
    price: 25,
    originalPrice: 149,
    rating: 4.98,
    reviewCount: 3120,
    studentsEnrolled: 18950,
    badge: "Prop Firm Ready",
    summary: "The mathematical backbone of profitable trading: pip arithmetic, lot sizing, 1-2% capital protection, drawdown survival, and passing funded account challenges.",
    description: "90% of Forex traders fail not because of strategy, but because of reckless position sizing and emotional dysregulation. This essential masterclass teaches you the non-negotiable risk models used by hedge funds and funded prop traders. Learn how to calculate pip value across all pairs, manage maximum daily drawdowns (e.g. 5% FTMO limit), and operate with mechanical emotional discipline.",
    learningOutcomes: [
      "Calculate exact pip values, pipettes, and lot sizes for Micro, Mini, and Standard accounts",
      "Deploy the institutional 1-2% risk model with strict daily maximum loss circuit breakers",
      "Understand the brutal asymmetric mathematics of drawdown recovery (why a 50% loss requires 100% gain to break even)",
      "Master funded prop firm challenge guidelines: managing daily drawdown and consistency rules",
      "Eliminate revenge trading, FOMO, and emotional bias through systematic trading checklists"
    ],
    prerequisites: ["No prior trading experience needed; basic arithmetic skills"],
    instructor: {
      name: "Marcus Vance",
      title: "Senior Macro Currency Strategist",
      experience: "14+ Years Institutional FX Trading (London/Zurich)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
    },
    lessonsCount: 4,
    createdAt: "2025-02-25",
    strategiesCovered: ["Pip Mathematics", "Position Sizing", "Drawdown Protection", "Prop Firm Challenge Rules"],
    lessons: [
      {
        id: "les-risk-1",
        title: "1. Currency Mechanics, Pips & Dynamic Lot Sizing",
        duration: "35 mins",
        order: 1,
        content: `### 1. What is a Pip in Real Money?
A Pip (Percentage in Point) is 0.0001 in major pairs (e.g. EUR/USD) and 0.01 in JPY pairs (e.g. USD/JPY).
* On a **Standard Lot (1.00)**: 1 Pip $\\approx$ **$10.00**
* On a **Mini Lot (0.10)**: 1 Pip $\\approx$ **$1.00**
* On a **Micro Lot (0.01)**: 1 Pip $\\approx$ **$0.10**

---

### 2. The Universal Position Sizing Formula
Never trade a fixed 1.0 or 0.5 lot size on every trade! Your position size must dynamically adapt to your Stop Loss distance:
$$\\text{Position Size (Lots)} = \\frac{\\text{Account Equity} \\times \\text{Risk \\%}}{\\text{Stop Loss Distance (Pips)} \\times \\text{Pip Value per Lot}}$$

*Example:* You have a $10,000 account and wish to risk 1% ($100). Your stop loss on EUR/USD is 25 pips ($10/pip for a standard lot):
$$\\text{Lot Size} = \\frac{\\$100}{25 \\times \\$10} = 0.40 \\text{ Lots}$$`,
        keyTakeaways: [
          "Standard Lot = $10/pip; Mini Lot = $1/pip; Micro Lot = $0.10/pip",
          "Always dynamically calculate lot size based on stop loss distance",
          "Never risk more than 1% to 2% of total account equity on any single idea"
        ]
      },
      {
        id: "les-risk-2",
        title: "2. The Asymmetric Mathematics of Drawdown",
        duration: "30 mins",
        order: 2,
        content: `### 1. The Drawdown Trap
Drawdown recovery is brutally non-linear. As your equity decreases, the percentage gain needed to recover grows exponentially:
* **10% Loss**: Requires an **11.1% gain** to break even.
* **20% Loss**: Requires a **25.0% gain** to break even.
* **30% Loss**: Requires a **42.8% gain** to break even.
* **50% Loss**: Requires a **100.0% gain** to break even!
* **80% Loss**: Requires a **400.0% gain** (statistically terminal for 99.9% of traders).

---

### 2. The Max Daily Loss Circuit Breaker
Professional desks implement an automated **Circuit Breaker**:
* If you lose **3% in a single day**, all trading terminals are forcibly locked until the next session.
* This single rule prevents revenge trading and account blowing.`,
        keyTakeaways: [
          "Losing 50% of your capital requires doubling your remaining money (100% gain) just to break even",
          "Implement a non-negotiable Max Daily Loss limit (e.g. 2-3%) to prevent psychological tilt",
          "Your #1 job as a trader is risk management and capital preservation"
        ]
      },
      {
        id: "les-risk-3",
        title: "3. Asymmetric Risk-to-Reward: How 40% Win Rate Generates Wealth",
        duration: "35 mins",
        order: 3,
        content: `### 1. The Myth of the 90% Win Rate
Beginners believe trading is about winning every trade. Professional traders focus on **Mathematical Expectancy**:
$$\\text{Expectancy} = (\\text{Win Rate} \\times \\text{Avg Win}) - (\\text{Loss Rate} \\times \\text{Avg Loss})$$

### 2. Over 100 Trades at 1:3 Risk-to-Reward:
* Risking $100 per trade:
* 40 Wins $\\times$ $300 = **+$12,000**
* 60 Losses $\\times$ $100 = **-$6,000**
* **Net Profit = +$6,000** (a 60% account gain despite losing 6 out of every 10 trades!)`,
        keyTakeaways: [
          "You can be wrong more often than you are right and still generate substantial profits",
          "Target minimum 1:2 to 1:3 Risk-to-Reward setups",
          "Cut losses quickly without hesitation and let winning trades reach algorithmic targets"
        ]
      },
      {
        id: "les-risk-4",
        title: "4. The Funded Prop Firm Challenge Passing Protocol",
        duration: "45 mins",
        order: 4,
        content: `### 1. Understanding Prop Firm Rules
Most prop firms (FTMO, FundedNext, Alpha Capital) require:
* **8% to 10% Profit Target** (Phase 1)
* **5% Maximum Daily Drawdown**
* **10% Maximum Overall Drawdown**

### 2. The Systematic Passing Model
* Never risk more than **0.5% to 0.75% per trade** during a challenge.
* At 0.5% risk, you would need to lose 10 trades in a single day to hit the 5% daily limit.
* Target 1:3 setups: winning just 6 trades at 1:3 achieves the +9% profit target while protecting the drawdown buffer.`,
        keyTakeaways: [
          "Risk 0.5% per trade on prop firm evaluations to create a safe drawdown cushion",
          "Respect maximum daily drawdown rules strictly to avoid account disqualification",
          "Prioritize consistency and capital preservation over hasty target rushing"
        ]
      }
    ],
    finalQuiz: {
      id: "quiz-risk-401",
      title: "Risk Architecture & Prop Firm Certification Exam",
      passingScore: 75,
      questions: [
        {
          id: "q-risk-1",
          question: "If a trading account suffers a 50% drawdown, what percentage gain is required just to return to the original breakeven equity?",
          options: ["50% Gain", "100% Gain", "25% Gain", "75% Gain"],
          correctIndex: 1,
          explanation: "Drawdown math is non-linear. If a $10,000 account drops to $5,000, you must make $5,000 on your remaining $5,000, which is a 100% gain."
        },
        {
          id: "q-risk-2",
          question: "On a $50,000 prop firm challenge account risking 0.5% ($250) with a 20-pip stop loss on EUR/USD ($10/pip per standard lot), what is the calculated lot size?",
          options: ["0.25 Lots", "1.25 Lots", "2.50 Lots", "5.00 Lots"],
          correctIndex: 1,
          explanation: "Risk Amount ($250) / (20 pips * $10/pip) = $250 / $200 = 1.25 Standard Lots."
        },
        {
          id: "q-risk-3",
          question: "Why is a trader with a 40% win rate and a 1:3 Risk-to-Reward ratio highly profitable over 100 trades?",
          options: [
            "Because 40 wins at +3 units (+120 units) minus 60 losses at -1 unit (-60 units) equals a net gain of +60 units",
            "Because the broker refunds all trading losses",
            "Because win rate does not matter at all",
            "It is mathematically impossible to be profitable at 40% win rate"
          ],
          correctIndex: 0,
          explanation: "Asymmetric risk-to-reward ensures that small losses are easily overwhelmed by larger winning trades, producing positive mathematical expectancy."
        }
      ]
    }
  }
];
