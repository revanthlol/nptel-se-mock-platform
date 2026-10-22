import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { HomeView } from './views/HomeView';
import { ExamSimulationView } from './views/ExamSimulationView';
import { ExamReviewView } from './views/ExamReviewView';
import { PracticeModeView } from './views/PracticeModeView';
import { QuestionBankView } from './views/QuestionBankView';
import { CheatSheetView } from './views/CheatSheetView';
import { Question, UserResponse, ExamSummary, AppMode } from './types/quiz';
import { calculateExamSummary } from './utils/scoring';
import { getBookmarks, getSavedTheme, saveTheme } from './utils/storage';

import mock1Raw from './data/mock1.json';
import mock2Raw from './data/mock2.json';
import allRaw from './data/all_questions.json';
import { Home, Sparkles, Layers, BookOpen } from 'lucide-react';

const mock1Questions = mock1Raw as Question[];
const mock2Questions = mock2Raw as Question[];
const allQuestions = allRaw as Question[];

const EXAM_DURATION_SECONDS = 90 * 60; // 90 minutes standard NPTEL exam

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentMode, setCurrentMode] = useState<AppMode>('home');
  const [activeMockNumber, setActiveMockNumber] = useState<1 | 2>(1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState<Record<string, UserResponse>>({});
  const [timerSeconds, setTimerSeconds] = useState(EXAM_DURATION_SECONDS);
  const [examSummary, setExamSummary] = useState<ExamSummary | null>(null);
  const [isExitModalOpen, setIsExitModalOpen] = useState(false);
  const [bookmarkedCount, setBookmarkedCount] = useState(0);

  const timerRef = useRef<number | null>(null);

  // Initialize theme
  useEffect(() => {
    const initialTheme = getSavedTheme();
    setTheme(initialTheme);
    if (initialTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setBookmarkedCount(getBookmarks().length);
  }, []);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    saveTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Timer logic for active exam
  useEffect(() => {
    if (currentMode === 'mock-exam') {
      timerRef.current = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentMode]);

  const activeQuestions = activeMockNumber === 1 ? mock1Questions : mock2Questions;

  const handleStartExam = (mockNum: 1 | 2) => {
    setActiveMockNumber(mockNum);
    setCurrentIndex(0);
    setResponses({});
    setTimerSeconds(EXAM_DURATION_SECONDS);
    setExamSummary(null);
    setCurrentMode('mock-exam');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateResponse = (
    questionId: string, 
    selectedKeys: string[], 
    isMarkedForReview: boolean
  ) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: {
        selectedKeys,
        isMarkedForReview,
        visited: true,
      }
    }));
  };

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    // Extract selected options map
    const responseMap: Record<string, string[]> = {};
    activeQuestions.forEach(q => {
      responseMap[q.id] = responses[q.id]?.selectedKeys || [];
    });

    const timeSpent = EXAM_DURATION_SECONDS - timerSeconds;
    const summary = calculateExamSummary(
      `Mock Exam ${activeMockNumber}`,
      activeQuestions,
      responseMap,
      timeSpent
    );

    setExamSummary(summary);
    setCurrentMode('mock-review');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your exam automatically.');
    handleSubmitExam();
  };

  const handleExitExamRequest = () => {
    setIsExitModalOpen(true);
  };

  const handleConfirmExitExam = () => {
    setIsExitModalOpen(false);
    if (timerRef.current) clearInterval(timerRef.current);
    setCurrentMode('home');
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors selection:bg-amber-100 dark:selection:bg-amber-900/40 pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          if (currentMode === 'mock-exam') {
            setIsExitModalOpen(true);
          } else {
            setCurrentMode(mode);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }}
        activeExamTitle={`Mock Exam ${activeMockNumber}`}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        timerSeconds={currentMode === 'mock-exam' ? timerSeconds : undefined}
        onExitExamRequest={handleExitExamRequest}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentMode === 'home' && (
          <HomeView
            onStartExam={handleStartExam}
            onNavigate={(mode) => {
              setCurrentMode(mode);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            bookmarkedCount={bookmarkedCount}
          />
        )}

        {currentMode === 'mock-exam' && (
          <ExamSimulationView
            examTitle={`Mock Exam ${activeMockNumber}`}
            questions={activeQuestions}
            responses={responses}
            currentIndex={currentIndex}
            onSelectIndex={setCurrentIndex}
            onUpdateResponse={handleUpdateResponse}
            onSubmitExam={handleSubmitExam}
          />
        )}

        {currentMode === 'mock-review' && examSummary && (
          <ExamReviewView
            summary={examSummary}
            onRetake={() => handleStartExam(activeMockNumber)}
            onTakeOtherMock={() => handleStartExam(activeMockNumber === 1 ? 2 : 1)}
            onNavigate={(mode) => {
              setCurrentMode(mode);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentMode === 'practice' && (
          <PracticeModeView
            allQuestions={allQuestions}
            mock1Questions={mock1Questions}
            mock2Questions={mock2Questions}
          />
        )}

        {currentMode === 'bank' && (
          <QuestionBankView questions={allQuestions} />
        )}

        {currentMode === 'cheatsheet' && (
          <CheatSheetView />
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Shown only when NOT in an active exam simulation) */}
      {currentMode !== 'mock-exam' && (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 warm-glass border-t border-warm-border dark:border-dark-border px-2 py-1.5 flex items-center justify-around text-[10px] font-semibold text-warm-muted dark:text-dark-muted">
          <button
            onClick={() => {
              setCurrentMode('home');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              currentMode === 'home' ? 'text-sage-700 dark:text-sage-300 font-bold' : ''
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => {
              setCurrentMode('practice');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              currentMode === 'practice' ? 'text-sage-700 dark:text-sage-300 font-bold' : ''
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Travel</span>
          </button>

          <button
            onClick={() => {
              setCurrentMode('bank');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              currentMode === 'bank' ? 'text-sage-700 dark:text-sage-300 font-bold' : ''
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>All 130</span>
          </button>

          <button
            onClick={() => {
              setCurrentMode('cheatsheet');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex flex-col items-center gap-1 p-1.5 rounded-lg transition-colors ${
              currentMode === 'cheatsheet' ? 'text-sage-700 dark:text-sage-300 font-bold' : ''
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Formulas</span>
          </button>
        </nav>
      )}

      {/* Exit Exam Modal */}
      {isExitModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm bg-warm-surface dark:bg-dark-surface rounded-2xl p-6 shadow-2xl border border-warm-border dark:border-dark-border space-y-4">
            <h3 className="font-heading text-base font-bold text-warm-charcoal dark:text-dark-text">
              Exit Mock Examination?
            </h3>
            <p className="text-xs text-warm-muted dark:text-dark-muted leading-relaxed">
              Your ongoing examination session and active timer will be aborted. Are you sure you want to exit to the home dashboard?
            </p>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                onClick={() => setIsExitModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-warm-border dark:border-dark-border text-warm-charcoal dark:text-dark-text font-semibold text-xs hover:bg-warm-surface-hover dark:hover:bg-dark-surface-hover transition-colors"
              >
                Stay in Exam
              </button>
              <button
                onClick={handleConfirmExitExam}
                className="flex-1 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-xs transition-colors"
              >
                Yes, Exit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default App;
