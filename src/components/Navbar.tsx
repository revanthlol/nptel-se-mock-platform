import React from 'react';
import { 
  GraduationCap, 
  Sun, 
  Moon, 
  Timer, 
  BookOpen, 
  Sparkles, 
  Layers, 
  Home
} from 'lucide-react';
import { AppMode } from '../types/quiz';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  activeExamTitle?: string;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  timerSeconds?: number;
  onExitExamRequest?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  activeExamTitle,
  theme,
  onToggleTheme,
  timerSeconds,
  onExitExamRequest,
}) => {
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const isExamActive = currentMode === 'mock-exam';

  return (
    <header className="sticky top-0 z-40 w-full warm-glass border-b border-warm-border dark:border-dark-border transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Brand */}
        <div 
          onClick={() => {
            if (isExamActive && onExitExamRequest) {
              onExitExamRequest();
            } else {
              onSelectMode('home');
            }
          }}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-sage-600 dark:bg-sage-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
            <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm sm:text-base tracking-tight text-warm-charcoal dark:text-dark-text">
                NPTEL SE
              </span>
              <span className="text-[11px] text-warm-muted dark:text-dark-muted font-normal">
                • IIT Kharagpur
              </span>
            </div>
            <p className="text-[10px] text-warm-muted dark:text-dark-muted hidden sm:block">
              Software Engineering Prep
            </p>
          </div>
        </div>

        {/* Center: Live Timer if in exam, or Nav Pills if outside exam */}
        {isExamActive ? (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-warm-surface dark:bg-dark-surface border border-warm-border dark:border-dark-border text-sage-700 dark:text-sage-300 text-xs sm:text-sm font-semibold tracking-wide">
              <Timer className="w-4 h-4 animate-pulse text-sage-600 dark:text-sage-400" />
              <span className="tabular-nums font-mono">{timerSeconds !== undefined ? formatTime(timerSeconds) : '--:--'}</span>
            </div>
            <span className="text-xs font-medium text-warm-muted dark:text-dark-muted hidden md:inline">
              {activeExamTitle}
            </span>
          </div>
        ) : (
          <nav className="hidden md:flex items-center gap-1 bg-warm-surface/80 dark:bg-dark-surface/80 p-1 rounded-xl border border-warm-border dark:border-dark-border text-xs font-medium">
            <button
              onClick={() => onSelectMode('home')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'home'
                  ? 'bg-warm-canvas dark:bg-dark-canvas text-warm-charcoal dark:text-dark-text shadow-2xs font-semibold'
                  : 'text-warm-muted dark:text-dark-muted hover:text-warm-charcoal dark:hover:text-dark-text'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Home className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('practice')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'practice'
                  ? 'bg-warm-canvas dark:bg-dark-canvas text-warm-charcoal dark:text-dark-text shadow-2xs font-semibold'
                  : 'text-warm-muted dark:text-dark-muted hover:text-warm-charcoal dark:hover:text-dark-text'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                <span>Travel Practice</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('bank')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'bank'
                  ? 'bg-warm-canvas dark:bg-dark-canvas text-warm-charcoal dark:text-dark-text shadow-2xs font-semibold'
                  : 'text-warm-muted dark:text-dark-muted hover:text-warm-charcoal dark:hover:text-dark-text'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                <span>All 130 Qs</span>
              </div>
            </button>

            <button
              onClick={() => onSelectMode('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                currentMode === 'cheatsheet'
                  ? 'bg-warm-canvas dark:bg-dark-canvas text-warm-charcoal dark:text-dark-text shadow-2xs font-semibold'
                  : 'text-warm-muted dark:text-dark-muted hover:text-warm-charcoal dark:hover:text-dark-text'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-sage-600 dark:text-sage-400" />
                <span>Quick Formulas</span>
              </div>
            </button>
          </nav>
        )}

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {isExamActive && (
            <button
              onClick={onExitExamRequest}
              className="text-xs px-2.5 py-1.5 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/80 dark:bg-red-950/30 text-red-700 dark:text-red-300 hover:bg-red-100 transition-colors font-medium"
            >
              Exit Exam
            </button>
          )}

          {/* Theme switch */}
          <button
            onClick={onToggleTheme}
            className="p-2 rounded-xl text-warm-muted dark:text-dark-muted hover:bg-warm-surface dark:hover:bg-dark-surface transition-colors spring-press"
            aria-label="Toggle dark mode"
            title="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-warm-charcoal" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
