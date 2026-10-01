import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, TrendingUp, AlertTriangle, Sparkles, UserCheck } from 'lucide-react';
import { DEMO_PRESETS } from '../utils/financeCalculators';
import { FullFinancialState } from '../types/finance';

interface LandingHeroProps {
  initialName: string;
  onContinue: (name: string) => void;
  onLoadPreset: (presetKey: string, state: FullFinancialState) => void;
}

export const LandingHero: React.FC<LandingHeroProps> = ({
  initialName,
  onContinue,
  onLoadPreset,
}) => {
  const [name, setName] = useState(initialName || '');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to begin your financial assessment.');
      return;
    }
    setError('');
    onContinue(name.trim());
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-12 overflow-hidden">
      {/* Decorative subtle background mesh */}
      <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center opacity-30 dark:opacity-20">
        <div className="w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-emerald-500/20 via-teal-500/10 to-indigo-500/20 blur-3xl" />
      </div>

      <div className="max-w-3xl w-full text-center space-y-8">
        {/* Editorial Pill-Free Subtitle & Category */}
        <div className="flex items-center justify-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
          <span>Personal Financial Diagnosis</span>
          <span aria-hidden="true">·</span>
          <span>Certified Algorithmic Heuristics</span>
          <span aria-hidden="true">·</span>
          <span>AI Advisory Engine</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white text-balance leading-tight">
          How resilient is your{' '}
          <span className="text-emerald-600 dark:text-emerald-400 underline decoration-emerald-300 dark:decoration-emerald-700 underline-offset-8">
            Financial Health
          </span>
          ?
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Uncover whether you are in a <strong className="text-emerald-600 dark:text-emerald-400 font-semibold">Safest Position</strong>,{' '}
          <strong className="text-amber-500 dark:text-amber-400 font-semibold">Medium Position</strong>, or{' '}
          <strong className="text-rose-500 dark:text-rose-400 font-semibold">High Risk Position</strong>. 
          Audits your emergency runway, debt burden, home loans, SIP growth, and family insurance shields in real time.
        </p>

        {/* Name Input Card - The landing page requirement */}
        <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm transition-all">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="text-left space-y-1.5">
              <label htmlFor="user-name" className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                What should we call you?
              </label>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Enter your name or preferred moniker to customize your financial audit.
              </p>
            </div>

            <div className="relative">
              <input
                id="user-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="e.g. John Doe or Priya"
                className="w-full px-4 py-3 text-base rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-xs text-rose-500 text-left font-medium">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow active:scale-[0.99] cursor-pointer"
            >
              <span>Continue to Financial Audit</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Previews */}
          <div className="mt-6 pt-5 border-t border-slate-100 dark:border-slate-800 text-left">
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2.5 flex items-center gap-1.5">
              <UserCheck className="w-3.5 h-3.5" />
              <span>Or explore sample scenario profiles:</span>
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => onLoadPreset('safe', DEMO_PRESETS.safe.state)}
                className="px-2.5 py-2 text-xs font-medium text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-left transition-colors"
              >
                🟢 Disciplined (Safe)
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('medium', DEMO_PRESETS.medium.state)}
                className="px-2.5 py-2 text-xs font-medium text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/50 hover:bg-amber-100 dark:hover:bg-amber-900/60 border border-amber-200 dark:border-amber-800 rounded-lg text-left transition-colors"
              >
                🟡 Growing (Medium)
              </button>
              <button
                type="button"
                onClick={() => onLoadPreset('danger', DEMO_PRESETS.danger.state)}
                className="px-2.5 py-2 text-xs font-medium text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 dark:hover:bg-rose-900/60 border border-rose-200 dark:border-rose-800 rounded-lg text-left transition-colors"
              >
                🔴 Stressed (High Risk)
              </button>
            </div>
          </div>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 max-w-4xl mx-auto text-left">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              5-Pillar Health Score
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Real-time scoring algorithm evaluating liquidity runway, debt burden, insurance shield, and wealth compounding.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
              <TrendingUp className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Visual Grid & Charts
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Bento-style responsive form grids with 50/30/20 budget analysis and compounding SIP asset growth timelines.
            </p>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs">
            <div className="w-8 h-8 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-3">
              <Sparkles className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1">
              Smart AI & ML Insights
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tailored suggestions on debt avalanche strategies, term protection gaps, and 1-click professional PDF audit export.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
