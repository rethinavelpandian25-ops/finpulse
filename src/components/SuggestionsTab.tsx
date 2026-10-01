import React, { useState } from 'react';
import {
  FullFinancialState,
  FinancialMetrics,
  SuggestionTip,
  AiDetailedAnalysis,
} from '../types/finance';
import { generateSmartSuggestions, formatCurrency } from '../utils/financeCalculators';
import {
  Sparkles,
  Shield,
  CreditCard,
  Receipt,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Calendar,
  Flame,
  Lightbulb,
  ArrowRight,
  Bot,
} from 'lucide-react';

interface SuggestionsTabProps {
  state: FullFinancialState;
  metrics: FinancialMetrics;
}

export const SuggestionsTab: React.FC<SuggestionsTabProps> = ({ state, metrics }) => {
  const [filter, setFilter] = useState<'all' | 'safety' | 'insurance' | 'debt' | 'expense' | 'investing'>('all');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<AiDetailedAnalysis | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  const tips = generateSmartSuggestions(state, metrics);
  const filteredTips = filter === 'all' ? tips : tips.filter((t) => t.category === filter);

  // Trigger Gemini AI deep analysis
  const runAiAnalysis = async () => {
    setIsAiLoading(true);
    setAiError(null);
    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: state.profile,
          income: state.income,
          expenses: state.expenses,
          assets: state.investments,
          liabilities: {
            homeLoan: state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanRemaining : 0,
            homeLoanInterestRate: state.housing.homeLoanInterestRate,
            otherDebts: metrics.totalLiabilities,
            totalLiabilities: metrics.totalLiabilities,
          },
          metrics: {
            score: metrics.overallScore,
            status: metrics.statusLabel,
            emergencyRunwayMonths: metrics.emergencyRunwayMonths,
            debtToIncomeRatio: metrics.debtToIncomeRatio,
            savingsRate: metrics.savingsRate,
            netWorth: metrics.netWorth,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to generate AI analysis (${response.status})`);
      }

      const data = await response.json();
      setAiAnalysis(data);
    } catch (err: any) {
      console.error(err);
      setAiError(err.message || 'Unable to contact AI analysis service.');
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span>Algorithmic & AI Engine</span>
            <span aria-hidden="true">·</span>
            <span>Personalized Strategy</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Smart Financial Guidance & Strategy
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Certified CFP rules detect vulnerabilities in your balance sheet and generate prioritized action steps.
          </p>
        </div>

        {/* AI Analysis Trigger Button */}
        <button
          onClick={runAiAnalysis}
          disabled={isAiLoading}
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all disabled:opacity-70 cursor-pointer"
        >
          <Sparkles className={`w-4 h-4 ${isAiLoading ? 'animate-spin' : ''}`} />
          <span>{isAiLoading ? 'Generating AI Audit...' : 'Run Deep Gemini AI Audit'}</span>
        </button>
      </div>

      {/* AI Deep Analysis Section (When Triggered) */}
      {isAiLoading && (
        <div className="p-8 rounded-2xl border border-emerald-200 dark:border-emerald-800/80 bg-emerald-50/50 dark:bg-emerald-950/20 text-center space-y-3">
          <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center animate-pulse">
            <Bot className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Gemini CFP Advisor is Auditing Your Data...
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
            Analyzing debt avalanche schedules, term life insurance adequacy, expense leakage, and SIP compounding horizons.
          </p>
        </div>
      )}

      {aiError && (
        <div className="p-4 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{aiError} Displaying certified algorithmic heuristics below.</span>
        </div>
      )}

      {aiAnalysis && (
        <div className="bg-white dark:bg-slate-900 border-2 border-emerald-500/30 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Gemini AI Personalized Financial Audit
                </h2>
                <span className="text-xs text-slate-400">Customized for {state.profile.name || 'User'} ({state.profile.age} yrs)</span>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-md border border-emerald-200 dark:border-emerald-800">
              Live AI Verified
            </span>
          </div>

          {/* Verdict Banner */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
            <strong className="text-emerald-600 dark:text-emerald-400 font-bold block mb-1">
              Executive Diagnosis:
            </strong>
            {aiAnalysis.safetyVerdict}
          </div>

          {/* Strengths & Blindspots */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/80 space-y-2">
              <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Key Financial Strengths
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {aiAnalysis.strengths?.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/80 space-y-2">
              <span className="text-xs font-bold text-rose-700 dark:text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                Critical Blindspots & Risks
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                {aiAnalysis.vulnerabilities?.map((vuln, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500 font-bold">!</span>
                    <span>{vuln}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 90-Day Step-by-Step Action Roadmap */}
          {aiAnalysis.actionPlan90Days && aiAnalysis.actionPlan90Days.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>90-Day Execution Roadmap</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {aiAnalysis.actionPlan90Days.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 block font-mono">
                      {item.timeframe} (Step {item.step})
                    </span>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      {item.action}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Deep Recommendations Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-rose-500" />
                Debt Strategy
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {aiAnalysis.debtFreedomStrategy}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-blue-500" />
                Insurance Shield
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {aiAnalysis.insuranceAdvice}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
                SIP Compounding
              </span>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {aiAnalysis.wealthCompoundingTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Heuristic & ML Categorized Suggestions Grid */}
      <div className="space-y-4">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'all'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Actionable Tips ({tips.length})
          </button>
          <button
            onClick={() => setFilter('safety')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'safety'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Emergency Liquidity
          </button>
          <button
            onClick={() => setFilter('insurance')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'insurance'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Insurance & Shield
          </button>
          <button
            onClick={() => setFilter('debt')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'debt'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Debt Avalanche
          </button>
          <button
            onClick={() => setFilter('expense')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'expense'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Expense Trimming
          </button>
          <button
            onClick={() => setFilter('investing')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
              filter === 'investing'
                ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            SIP Compounding
          </button>
        </div>

        {/* Tip Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTips.map((tip) => {
            const isCritical = tip.priority === 'critical';
            const isHigh = tip.priority === 'high';

            const borderColor = isCritical
              ? 'border-rose-300 dark:border-rose-900/60'
              : isHigh
              ? 'border-amber-300 dark:border-amber-900/60'
              : 'border-slate-200 dark:border-slate-800';

            const tagColor = isCritical
              ? 'text-rose-600 dark:text-rose-400 font-bold'
              : isHigh
              ? 'text-amber-600 dark:text-amber-400 font-bold'
              : 'text-emerald-600 dark:text-emerald-400 font-bold';

            return (
              <div
                key={tip.id}
                className={`bg-white dark:bg-slate-900 border ${borderColor} rounded-2xl p-5 shadow-2xs space-y-3 transition-all hover:shadow-xs`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 text-[11px]">
                      <span className={tagColor}>{tip.priority.toUpperCase()} PRIORITY</span>
                      <span className="text-slate-400">·</span>
                      <span className="text-slate-500 font-medium capitalize">{tip.category}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {tip.title}
                    </h3>
                  </div>

                  <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded shrink-0">
                    {tip.impactScore}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {tip.summary}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 space-y-1">
                  <span className="font-semibold text-emerald-700 dark:text-emerald-400 block text-[11px] uppercase tracking-wider">
                    Recommended Action Step:
                  </span>
                  <p className="leading-relaxed">
                    {tip.actionStep}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
