import React from 'react';
import { ShieldCheck, Moon, Sun, Printer, Sparkles, RefreshCw } from 'lucide-react';

interface NavbarProps {
  currentTab: 'dashboard' | 'analysis' | 'suggestions' | 'report';
  setCurrentTab: (tab: 'dashboard' | 'analysis' | 'suggestions' | 'report') => void;
  isDarkMode: boolean;
  setIsDarkMode: (val: boolean) => void;
  currency: string;
  setCurrency: (c: string) => void;
  userName: string;
  onReset: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  isDarkMode,
  setIsDarkMode,
  currency,
  setCurrency,
  userName,
  onReset,
}) => {
  return (
    <header className="no-print sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single Brand Text Element */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2 text-left group focus-visible:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
              FinPulse
            </span>
          </button>

          {userName && (
            <span className="hidden sm:inline-block text-xs text-slate-500 dark:text-slate-400 font-medium border-l border-slate-200 dark:border-slate-800 pl-3">
              {userName}&apos;s Audit
            </span>
          )}
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'dashboard'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            01. Financial Grid Form
          </button>
          <button
            onClick={() => setCurrentTab('analysis')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'analysis'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            02. Health Score & Charts
          </button>
          <button
            onClick={() => setCurrentTab('suggestions')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              currentTab === 'suggestions'
                ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            03. AI & ML Suggestions
          </button>
          <button
            onClick={() => setCurrentTab('report')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              currentTab === 'report'
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            04. Executive Report
          </button>
        </nav>

        {/* Zone 3: Actions & Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Currency Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-lg p-0.5 border border-slate-200 dark:border-slate-700">
            {['₹', '$', '€', '£'].map((curr) => (
              <button
                key={curr}
                onClick={() => setCurrency(curr)}
                className={`w-6 h-6 text-xs font-medium rounded transition-colors ${
                  currency === curr
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
                title={`Set currency to ${curr}`}
              >
                {curr}
              </button>
            ))}
          </div>

          {/* Theme Toggle Switch */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            aria-label="Toggle dark/light theme"
            className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors border border-slate-200 dark:border-slate-700"
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Quick PDF Action */}
          <button
            onClick={() => setCurrentTab('report')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors border border-slate-200 dark:border-slate-700 cursor-pointer"
            title="Open Executive PDF Report"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PDF Report</span>
          </button>

          {/* Reset button */}
          <button
            onClick={onReset}
            aria-label="Reset form"
            className="p-2 rounded-lg text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Reset to default"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile Nav strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs font-medium">
        <button
          onClick={() => setCurrentTab('dashboard')}
          className={`px-2 py-1 rounded ${currentTab === 'dashboard' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Form
        </button>
        <button
          onClick={() => setCurrentTab('analysis')}
          className={`px-2 py-1 rounded ${currentTab === 'analysis' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          Score & Charts
        </button>
        <button
          onClick={() => setCurrentTab('suggestions')}
          className={`px-2 py-1 rounded ${currentTab === 'suggestions' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          AI Tips
        </button>
        <button
          onClick={() => setCurrentTab('report')}
          className={`px-2 py-1 rounded ${currentTab === 'report' ? 'bg-emerald-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'}`}
        >
          PDF Report
        </button>
      </div>
    </header>
  );
};
