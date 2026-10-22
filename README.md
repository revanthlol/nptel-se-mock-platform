# NPTEL Software Engineering Mock Exam & Preparation Platform

An Apple-inspired, mobile-first preparation platform built for the **NPTEL Software Engineering (IIT Kharagpur)** certification examination.

Deployed URL: Available on Vercel.

---

## 🌟 Key Features

1. **Two Full 50-Question Mock Papers (100 Marks Each)**
   - **Mock Paper 1**: 50 curated questions covering the entire syllabus from Assignment 0 to Assignment 12 (Process models, Agile, Estimation, DFD, UML Class & Sequence diagrams, Testing).
   - **Mock Paper 2**: 50 complementary, disjoint questions focusing on advanced topics (CRC cards, use case extend/include, Condition coverage, Cyclomatic complexity, Mutation testing).
   - Built-in **90-minute examination countdown timer** matching official NPTEL exam conditions.
   - Interactive **Question Palette** with live status tracking (Answered, Marked for Review, Unanswered).

2. **Strict NPTEL MSQ Partial-Credit Grading Engine**
   - **Single Choice (MCQ)**: +2.0 marks for the correct answer, 0 for wrong/unattempted.
   - **Multiple Choice (MSQ)**:
     - **Strict Wrong-Option Penalty**: If *even one* incorrect option is chosen, the entire question yields **0 marks**.
     - **Partial Credit**: If all chosen options are correct without any incorrect option, proportional marks are awarded:
       $$\text{Marks} = \frac{\text{Correct Options Selected}}{\text{Total Correct Options}} \times 2.0$$
     - Transparent breakdown and explanation provided for every question on the post-exam review scorecard.

3. **Travel & Commute Practice Mode (Mobile-First)**
   - Specifically built for revising on your smartphone while commuting to the exam center on bus/metro/train.
   - Flashcard-style instant feedback: pick your options and tap **Check Answer** to immediately see if you're right, receive your partial score, and read the IIT Kharagpur detailed solution.
   - **Reveal Solution** button for rapid skim-reading.
   - Tap-to-zoom for all high-resolution diagrams (UML class diagrams, sequence diagrams, and use-case interactions).

4. **Complete Assignment Question Bank (130 Questions)**
   - Browse and search through all 13 assignments (Assignment 0 through Assignment 12).
   - Real-time search filter for topics and keywords (e.g., `COCOMO`, `Cyclomatic`, `CRC`, `Mutation`, `MC/DC`, `Equivalence`).
   - One-tap Bookmark / Star system saved to local storage so you can review tricky questions right before entering the exam hall.

5. **High-Yield Software Engineering Formula & Concept Sheet**
   - Quick reference for the morning of the exam:
     - Cyclomatic Complexity formulas: $V(G) = E - N + 2P = P + 1 = \text{Regions} + 1$
     - MC/DC minimal test cases rule ($N + 1$ for $N$ conditions)
     - Cohesion hierarchy (Functional $\rightarrow$ Sequential $\rightarrow$ Communicational $\rightarrow$ Procedural $\rightarrow$ Temporal $\rightarrow$ Logical $\rightarrow$ Coincidental)
     - Coupling hierarchy (Data $\rightarrow$ Stamp $\rightarrow$ Control $\rightarrow$ External $\rightarrow$ Common $\rightarrow$ Content)
     - UML relationships (Aggregation hollow diamond vs. Composition filled diamond; Include vs. Extend)
     - COCOMO effort formulas (Organic vs. Semidetached vs. Embedded)

---

## 🎨 Design Philosophy

- **Soft, Comfort-to-the-Eye Palette**: Built using subtle warm stone, cream cards, and soothing sage/emerald accents without eye-straining neon glows or harsh contrasts.
- **Dark Mode**: Fully supported with gentle zinc/slate tones for low-light morning travel.
- **Apple Ergonomics**: Restrained spring animations, instant press feedback, minimum 48px touch targets, and a mobile bottom dock.

---

## 🛠️ Technology Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS with custom Apple design tokens
- **Icons**: Lucide React
- **Deployment**: Vercel & GitHub CLI (`gh`)

---

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
