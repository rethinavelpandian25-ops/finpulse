import React, { useState } from 'react';
import { FullFinancialState, FinancialMetrics } from '../types/finance';
import { formatCurrency, formatFullCurrency } from '../utils/financeCalculators';
import {
  PieChart,
  TrendingUp,
  Scale,
  Shield,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

interface FinancialChartsProps {
  state: FullFinancialState;
  metrics: FinancialMetrics;
}

export const FinancialCharts: React.FC<FinancialChartsProps> = ({ state, metrics }) => {
  const curr = state.profile.currency;
  const [activeChartTab, setActiveChartTab] = useState<'expenses' | 'budget5020' | 'sip' | 'networth'>('expenses');

  // Expense breakdown data
  const expenseItems = [
    { label: 'Housing / EMI', value: state.expenses.housing, color: '#6366f1' },
    { label: 'Groceries & Food', value: state.expenses.groceriesFood, color: '#10b981' },
    { label: 'Utilities & Bills', value: state.expenses.utilitiesBills, color: '#06b6d4' },
    { label: 'Transport & Fuel', value: state.expenses.transportFuel, color: '#f59e0b' },
    { label: 'Lifestyle & Subs', value: state.expenses.lifestyleEntertainment, color: '#ec4899' },
    { label: 'Healthcare', value: state.expenses.healthcare, color: '#ef4444' },
    { label: 'Discretionary', value: state.expenses.discretionaryOther, color: '#8b5cf6' },
  ].filter((item) => item.value > 0);

  const totalExpenseVal = Math.max(1, metrics.totalMonthlyExpenses);

  // Asset breakdown items
  const homeAssetValue =
    state.housing.housingType === 'own_outright' || state.housing.housingType === 'own_with_loan'
      ? state.housing.homePropertyValue
      : 0;

  const assetItems = [
    { label: 'Emergency Fund', value: state.investments.emergencyFund, color: '#10b981' },
    { label: 'Fixed Deposits', value: state.investments.fixedDeposits, color: '#06b6d4' },
    { label: 'Stocks & Equities', value: state.investments.stocksLumpsum, color: '#6366f1' },
    { label: 'Gold & Metals', value: state.investments.goldValue, color: '#f59e0b' },
    { label: 'Real Estate / Land', value: state.investments.realEstateLandValue + homeAssetValue, color: '#8b5cf6' },
    { label: 'Other Assets', value: state.investments.otherAssetsValue, color: '#64748b' },
  ].filter((item) => item.value > 0);

  // 50-30-20 calculations
  const needsPercent = Math.min(100, Math.round(metrics.needsRatio));
  const wantsPercent = Math.min(100, Math.round(metrics.wantsRatio));
  const savingsPercent = Math.min(100, Math.round(metrics.savingsRate));

  return (
    <div className="space-y-6">
      {/* Chart Selector Tabs */}
      <div className="flex items-center justify-between flex-wrap gap-3 border-b border-slate-200 dark:border-slate-800 pb-3">
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveChartTab('expenses')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeChartTab === 'expenses'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            <span>Monthly Outflows</span>
          </button>

          <button
            onClick={() => setActiveChartTab('budget5020')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeChartTab === 'budget5020'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5" />
            <span>50 / 30 / 20 Rule</span>
          </button>

          <button
            onClick={() => setActiveChartTab('sip')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeChartTab === 'sip'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>SIP Wealth Growth</span>
          </button>

          <button
            onClick={() => setActiveChartTab('networth')}
            className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
              activeChartTab === 'networth'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-2xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Net Worth & Balance Sheet</span>
          </button>
        </div>

        <span className="text-xs text-slate-400 hidden sm:inline">
          Live Interactive Analytics
        </span>
      </div>

      {/* Tab 1: Expense Outflow Distribution */}
      {activeChartTab === 'expenses' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <PieChart className="w-4 h-4 text-indigo-500" />
                <span>Monthly Spending Distribution</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Visual proportion of each outflow category against total expenses ({formatFullCurrency(metrics.totalMonthlyExpenses, curr)})
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Monthly Outflow</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {formatCurrency(metrics.totalMonthlyExpenses, curr)}
              </span>
            </div>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="w-full h-5 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800 mb-6 p-0.5 border border-slate-200 dark:border-slate-700">
            {expenseItems.map((item, idx) => {
              const widthPct = (item.value / totalExpenseVal) * 100;
              return (
                <div
                  key={idx}
                  style={{ width: `${widthPct}%`, backgroundColor: item.color }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-90 relative group"
                  title={`${item.label}: ${formatCurrency(item.value, curr)} (${widthPct.toFixed(1)}%)`}
                />
              );
            })}
          </div>

          {/* Category Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {expenseItems.map((item, idx) => {
              const pct = (item.value / totalExpenseVal) * 100;
              return (
                <div
                  key={idx}
                  className="p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 truncate">
                      {item.label}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between pt-1">
                    <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                      {formatCurrency(item.value, curr)}
                    </span>
                    <span className="text-[11px] font-mono font-medium text-slate-400">
                      {pct.toFixed(0)}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: 50/30/20 Rule Benchmark */}
      {activeChartTab === 'budget5020' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-emerald-500" />
                <span>The 50 / 30 / 20 Financial Balance Rule</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Benchmark your lifestyle against the golden rule of personal wealth creation
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Total Monthly Income: <span className="font-mono text-slate-900 dark:text-white">{formatCurrency(metrics.totalMonthlyIncome, curr)}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Needs */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                  Needs (Essentials)
                </span>
                <span className="text-xs text-slate-400">Target: ≤ 50%</span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {needsPercent}%
                </span>
                <span className={`text-xs font-semibold ${needsPercent <= 50 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {needsPercent <= 50 ? 'Optimal' : `${needsPercent - 50}% over`}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${needsPercent <= 50 ? 'bg-indigo-500' : 'bg-rose-500'} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, needsPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Includes rent/EMI, groceries, power, wifi, basic transport, and health essentials.
              </p>
            </div>

            {/* Wants */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-wider">
                  Wants (Discretionary)
                </span>
                <span className="text-xs text-slate-400">Target: ≤ 30%</span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {wantsPercent}%
                </span>
                <span className={`text-xs font-semibold ${wantsPercent <= 30 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {wantsPercent <= 30 ? 'Controlled' : `${wantsPercent - 30}% over`}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${wantsPercent <= 30 ? 'bg-pink-500' : 'bg-rose-500'} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, wantsPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Dining out, streaming subscriptions, leisure travel, shopping, and gadgets.
              </p>
            </div>

            {/* Savings & Investments */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Savings & SIP
                </span>
                <span className="text-xs text-slate-400">Target: ≥ 20%</span>
              </div>
              <div className="flex items-baseline justify-between font-mono">
                <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
                  {savingsPercent}%
                </span>
                <span className={`text-xs font-semibold ${savingsPercent >= 20 ? 'text-emerald-500' : 'text-rose-500'}`}>
                  {savingsPercent >= 20 ? 'Disciplined' : 'Needs boost'}
                </span>
              </div>
              <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${savingsPercent >= 20 ? 'bg-emerald-500' : 'bg-rose-500'} rounded-full transition-all duration-500`}
                  style={{ width: `${Math.min(100, savingsPercent)}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                Monthly SIPs, emergency cash reserves, debt principal prepayment, and retirement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: SIP Compounding Wealth Projections */}
      {activeChartTab === 'sip' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span>SIP Compounding Calculator & Horizon</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Simulating {formatCurrency(state.investments.sipMonthlyAmount, curr)} / month over {state.investments.sipTenureYears} years @ {state.investments.sipExpectedReturnPercent}% expected annual return
              </p>
            </div>
            <div className="px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs font-semibold text-emerald-700 dark:text-emerald-300">
              Wealth Multiplier: {metrics.sipInvestedTotal > 0 ? (metrics.sipEstimatedFutureValue / metrics.sipInvestedTotal).toFixed(2) : 0}x
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">Total Principal Invested</span>
              <span className="text-2xl font-bold font-mono text-slate-800 dark:text-slate-200">
                {formatCurrency(metrics.sipInvestedTotal, curr)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-1">Out of pocket savings</span>
            </div>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
              <span className="text-xs text-emerald-700 dark:text-emerald-300 block mb-1 font-semibold">Estimated Wealth Gain</span>
              <span className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
                +{formatCurrency(metrics.sipWealthGain, curr)}
              </span>
              <span className="text-[11px] text-emerald-600/80 dark:text-emerald-400/80 block mt-1">Compound market returns</span>
            </div>

            <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
              <span className="text-xs text-indigo-700 dark:text-indigo-300 block mb-1 font-semibold">Terminal Corpus</span>
              <span className="text-2xl font-extrabold font-mono text-indigo-600 dark:text-indigo-400">
                {formatCurrency(metrics.sipEstimatedFutureValue, curr)}
              </span>
              <span className="text-[11px] text-indigo-600/80 dark:text-indigo-400/80 block mt-1">Projected at year {state.investments.sipTenureYears}</span>
            </div>
          </div>

          {/* Visual Compounding Proportion */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                Principal ({metrics.sipEstimatedFutureValue > 0 ? ((metrics.sipInvestedTotal / metrics.sipEstimatedFutureValue) * 100).toFixed(0) : 0}%)
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Compound Interest ({metrics.sipEstimatedFutureValue > 0 ? ((metrics.sipWealthGain / metrics.sipEstimatedFutureValue) * 100).toFixed(0) : 0}%)
              </span>
            </div>
            <div className="w-full h-4 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div
                className="h-full bg-slate-400 dark:bg-slate-500 transition-all duration-700"
                style={{
                  width: `${metrics.sipEstimatedFutureValue > 0 ? (metrics.sipInvestedTotal / metrics.sipEstimatedFutureValue) * 100 : 50}%`,
                }}
              />
              <div
                className="h-full bg-emerald-500 transition-all duration-700"
                style={{
                  width: `${metrics.sipEstimatedFutureValue > 0 ? (metrics.sipWealthGain / metrics.sipEstimatedFutureValue) * 100 : 50}%`,
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Net Worth & Balance Sheet */}
      {activeChartTab === 'networth' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-purple-500" />
                <span>Net Worth & Balance Sheet Composition</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Assets minus Total Liabilities (Home loan, cards, personal debt)
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-400 block">Calculated Net Worth</span>
              <span className={`text-xl font-extrabold font-mono ${metrics.netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                {formatCurrency(metrics.netWorth, curr)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Assets Column */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Total Assets
                </span>
                <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">
                  {formatCurrency(metrics.totalAssets, curr)}
                </span>
              </div>
              <div className="space-y-2">
                {assetItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                      {item.label}
                    </span>
                    <span className="font-mono font-medium text-slate-900 dark:text-white">
                      {formatCurrency(item.value, curr)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Liabilities Column */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2">
                <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">
                  Total Liabilities & Debts
                </span>
                <span className="font-mono text-sm font-bold text-rose-600 dark:text-rose-400">
                  {formatCurrency(metrics.totalLiabilities, curr)}
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Home Mortgage Remaining</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {formatCurrency(state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanRemaining : 0, curr)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Personal & Car Loans</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {formatCurrency(state.debts.personalLoans + state.debts.carLoans, curr)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Credit Card Balances</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {formatCurrency(state.debts.creditCardDues, curr)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Education & Other</span>
                  <span className="font-mono font-medium text-slate-900 dark:text-white">
                    {formatCurrency(state.debts.educationLoans + state.debts.otherDebts, curr)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Emergency Runway Milestone Timeline Indicator */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-teal-500" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Liquid Emergency Runway Milestone Track
            </h3>
          </div>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Current Buffer: <strong className="font-mono text-slate-900 dark:text-white">{metrics.emergencyRunwayMonths.toFixed(1)} months</strong>
          </span>
        </div>

        <div className="relative pt-2 pb-6">
          <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
            {/* 0-3 months (Danger zone) */}
            <div className="w-1/4 h-full bg-rose-400/80" title="0-3 Months (High Risk)" />
            {/* 3-6 months (Buffer zone) */}
            <div className="w-1/4 h-full bg-amber-400/80" title="3-6 Months (Moderate)" />
            {/* 6-12 months (Safe zone) */}
            <div className="w-1/2 h-full bg-emerald-500/80" title="6-12+ Months (Very Safe)" />
          </div>

          {/* Marker for current runway */}
          <div
            className="absolute top-0 -translate-x-1/2 flex flex-col items-center pointer-events-none transition-all duration-700"
            style={{
              left: `${Math.min(100, Math.max(4, (metrics.emergencyRunwayMonths / 12) * 100))}%`,
            }}
          >
            <div className="w-3.5 h-3.5 bg-slate-900 dark:bg-white rounded-full border-2 border-emerald-500 shadow-sm" />
            <span className="text-[10px] font-bold font-mono text-slate-900 dark:text-white mt-1">
              You ({metrics.emergencyRunwayMonths.toFixed(1)}m)
            </span>
          </div>

          <div className="flex justify-between text-[11px] font-medium text-slate-400 mt-4">
            <span>0m (Vulnerable)</span>
            <span>3m (Survival)</span>
            <span>6m (Certified Safe)</span>
            <span>12m+ (Financial Fortress)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
