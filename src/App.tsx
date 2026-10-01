/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { LandingHero } from './components/LandingHero';
import { DashboardGridForm } from './components/DashboardGridForm';
import { HealthScoreMeter } from './components/HealthScoreMeter';
import { FinancialCharts } from './components/FinancialCharts';
import { SuggestionsTab } from './components/SuggestionsTab';
import { ReportView } from './components/ReportView';
import {
  INITIAL_FINANCIAL_STATE,
  computeFinancialMetrics,
} from './utils/financeCalculators';
import { FullFinancialState } from './types/finance';
import { ArrowLeft, Sparkles, Printer, ChevronRight, Download } from 'lucide-react';

export default function App() {
  const [financialState, setFinancialState] = useState<FullFinancialState>(() => {
    try {
      const saved = localStorage.getItem('finpulse_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return INITIAL_FINANCIAL_STATE;
  });

  const [currentTab, setCurrentTab] = useState<'dashboard' | 'analysis' | 'suggestions' | 'report'>('dashboard');
  const [showLanding, setShowLanding] = useState<boolean>(() => !financialState.profile.name);

  // Dark/Light theme management
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      const savedTheme = localStorage.getItem('finpulse_theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    } catch {
      return false;
    }
  });

  // Apply dark mode class to html element
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('finpulse_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('finpulse_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist financial state changes
  useEffect(() => {
    try {
      localStorage.setItem('finpulse_state', JSON.stringify(financialState));
    } catch {
      // safe ignore
    }
  }, [financialState]);

  // Calculated metrics
  const metrics = computeFinancialMetrics(financialState);

  const handleLandingContinue = (name: string) => {
    setFinancialState((prev) => ({
      ...prev,
      profile: { ...prev.profile, name },
    }));
    setShowLanding(false);
    setCurrentTab('dashboard');
  };

  const handleLoadPreset = (key: string, presetState: FullFinancialState) => {
    setFinancialState(presetState);
    setShowLanding(false);
    setCurrentTab('analysis');
  };

  const handleCurrencyChange = (newCurrency: string) => {
    setFinancialState((prev) => ({
      ...prev,
      profile: { ...prev.profile, currency: newCurrency },
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset all financial data back to defaults?')) {
      setFinancialState(INITIAL_FINANCIAL_STATE);
      setShowLanding(true);
      setCurrentTab('dashboard');
      localStorage.removeItem('finpulse_state');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          setShowLanding(false);
          setCurrentTab(tab);
        }}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        currency={financialState.profile.currency}
        setCurrency={handleCurrencyChange}
        userName={financialState.profile.name}
        onReset={handleReset}
      />

      {/* Main Content Viewport */}
      <main className="flex-1">
        {showLanding ? (
          <LandingHero
            initialName={financialState.profile.name}
            onContinue={handleLandingContinue}
            onLoadPreset={handleLoadPreset}
          />
        ) : currentTab === 'dashboard' ? (
          <DashboardGridForm
            state={financialState}
            onChange={setFinancialState}
            onGoToAnalysis={() => setCurrentTab('analysis')}
          />
        ) : currentTab === 'analysis' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
            {/* Header & Quick Navigation Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
                  <span>Audit Results</span>
                  <span aria-hidden="true">·</span>
                  <span>Safety Meter & Analytics</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Financial Position & Diagnostic Summary
                </h1>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setCurrentTab('dashboard')}
                  className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Edit Questionnaire</span>
                </button>
                <button
                  onClick={() => setCurrentTab('suggestions')}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-lg flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>View Smart AI Tips</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Health Score Meter (Semi-circle speedometer with animations & 5 pillars) */}
            <HealthScoreMeter
              metrics={metrics}
              userName={financialState.profile.name}
            />

            {/* Interactive Charts (Expenses, 50/30/20, SIP Compounding, Net Worth) */}
            <FinancialCharts
              state={financialState}
              metrics={metrics}
            />

            {/* Next Steps Prompt Card */}
            <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-indigo-500/10 border border-emerald-500/20 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="space-y-1 text-center sm:text-left">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Ready to optimize your position?
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Review personalized debt elimination schedules, insurance gap shields, and download your executive PDF audit.
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <button
                  onClick={() => setCurrentTab('suggestions')}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                  <span>AI Suggestions</span>
                </button>
                <button
                  onClick={() => setCurrentTab('report')}
                  className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Report</span>
                </button>
              </div>
            </div>
          </div>
        ) : currentTab === 'suggestions' ? (
          <SuggestionsTab
            state={financialState}
            metrics={metrics}
          />
        ) : (
          <ReportView
            state={financialState}
            metrics={metrics}
            onBack={() => setCurrentTab('analysis')}
          />
        )}
      </main>

      {/* Subtle Anti-Slop Footer */}
      <footer className="no-print border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800 dark:text-slate-200">FinPulse</span>
            <span aria-hidden="true">·</span>
            <span>Financial Health Diagnostic Engine</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowLanding(true);
                setCurrentTab('dashboard');
              }}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Start New Audit
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setCurrentTab('report')}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Export PDF
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
