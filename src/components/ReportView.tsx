import React, { useState } from 'react';
import { FullFinancialState, FinancialMetrics } from '../types/finance';
import { formatCurrency, formatFullCurrency, generateSmartSuggestions } from '../utils/financeCalculators';
import { downloadVectorPdfReport, downloadElementAsPdf } from '../utils/pdfGenerator';
import { Printer, ShieldCheck, Download, Calendar, User, ArrowLeft, Check, Sparkles, FileText } from 'lucide-react';

interface ReportViewProps {
  state: FullFinancialState;
  metrics: FinancialMetrics;
  onBack: () => void;
}

export const ReportView: React.FC<ReportViewProps> = ({ state, metrics, onBack }) => {
  const curr = state.profile.currency;
  const tips = generateSmartSuggestions(state, metrics);
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handleDownloadVectorPdf = async () => {
    setIsGenerating(true);
    setDownloadSuccess(false);
    try {
      await downloadVectorPdfReport(state, metrics, tips);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('PDF Generation Error:', err);
      // Fallback to element snapshot
      try {
        await downloadElementAsPdf(
          'printable-report-content',
          `FinPulse_Report_${(state.profile.name || 'User').replace(/\s+/g, '_')}.pdf`
        );
        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 4000);
      } catch (innerErr) {
        console.error('Fallback snapshot failed:', innerErr);
        window.print();
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadSnapshotPdf = async () => {
    setIsGenerating(true);
    try {
      await downloadElementAsPdf(
        'printable-report-content',
        `FinPulse_Snapshot_${(state.profile.name || 'User').replace(/\s+/g, '_')}.pdf`
      );
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Snapshot failed:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const statusBg =
    metrics.status === 'very_safe'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
      : metrics.status === 'medium'
      ? 'bg-amber-50 text-amber-800 border-amber-300'
      : 'bg-rose-50 text-rose-800 border-rose-300';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Print / Navigation Action Bar */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xs">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {downloadSuccess && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mr-2">
              <Check className="w-4 h-4" />
              <span>PDF Downloaded to Device!</span>
            </span>
          )}

          {/* Direct Instant PDF Download (Guaranteed to download actual .pdf file) */}
          <button
            onClick={handleDownloadVectorPdf}
            disabled={isGenerating}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-2 shadow-xs cursor-pointer disabled:opacity-70"
          >
            <Download className={`w-4 h-4 ${isGenerating ? 'animate-bounce' : ''}`} />
            <span>{isGenerating ? 'Generating PDF...' : 'Download Official PDF Report (.pdf)'}</span>
          </button>

          {/* Alternative Visual Snapshot PDF */}
          <button
            onClick={handleDownloadSnapshotPdf}
            disabled={isGenerating}
            className="hidden md:flex px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold rounded-lg transition-colors border border-slate-200 dark:border-slate-700 items-center gap-1.5 cursor-pointer disabled:opacity-70"
            title="Download visual layout as snapshot PDF"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Visual Snapshot PDF</span>
          </button>

          {/* Browser Print Backup */}
          <button
            onClick={() => window.print()}
            className="px-3 py-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Open browser print dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Actual Printable Document Container */}
      <div
        id="printable-report-content"
        className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-12 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none"
      >
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b-2 border-slate-900 dark:border-slate-700 pb-6 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold text-sm uppercase tracking-wider">
              <ShieldCheck className="w-5 h-5" />
              <span>FinPulse Financial Health Institute</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Executive Financial Audit Report
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Personal balance sheet diagnosis, liquidity buffer, loan safety, and wealth compounding roadmap.
            </p>
          </div>

          <div className="text-left sm:text-right space-y-1 text-xs">
            <div className="text-slate-500 dark:text-slate-400 flex items-center sm:justify-end gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              <span>Date: {today}</span>
            </div>
            <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center sm:justify-end gap-1.5">
              <User className="w-3.5 h-3.5" />
              <span>Prepared for: {state.profile.name || 'Anonymous Client'} ({state.profile.age} yrs)</span>
            </div>
          </div>
        </div>

        {/* Executive Score & Classification Banner */}
        <div className={`p-6 rounded-xl border ${statusBg} flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider block mb-1">
              Overall Financial Standing
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
              {metrics.statusLabel}
            </h2>
            <p className="text-xs mt-1 max-w-xl leading-relaxed">
              {metrics.statusDescription}
            </p>
          </div>

          <div className="text-center sm:text-right shrink-0">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
              Health Score
            </span>
            <span className="text-4xl sm:text-5xl font-extrabold font-mono text-slate-900 dark:text-white">
              {metrics.overallScore}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 block">/ 100</span>
          </div>
        </div>

        {/* 4 Key Executive Ratios */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
              Emergency Runway
            </span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {metrics.emergencyRunwayMonths.toFixed(1)} Months
            </span>
            <span className="text-[10px] text-slate-400 block">Target: &ge; 6.0 Months</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
              Debt-to-Income (DTI)
            </span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {metrics.debtToIncomeRatio.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 block">Target: &le; 30.0%</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
              Savings & SIP Rate
            </span>
            <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
              {metrics.savingsRate.toFixed(1)}%
            </span>
            <span className="text-[10px] text-slate-400 block">Target: &ge; 20.0%</span>
          </div>

          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-1">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block uppercase">
              Calculated Net Worth
            </span>
            <span className={`text-lg font-bold font-mono ${metrics.netWorth >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600'}`}>
              {formatCurrency(metrics.netWorth, curr)}
            </span>
            <span className="text-[10px] text-slate-400 block">Assets minus Debts</span>
          </div>
        </div>

        {/* Balance Sheet Statement */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
            Monthly Inflows & Outflows Ledger
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Income Side */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b border-slate-200 dark:border-slate-700 pb-1">
                Income Streams
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Take-Home Salary:</span>
                <span className="font-mono font-medium">{formatCurrency(state.income.monthlySalary, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Passive Income:</span>
                <span className="font-mono font-medium">{formatCurrency(state.income.passiveIncome, curr)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold">
                <span>Total Monthly Income:</span>
                <span className="font-mono text-emerald-600 dark:text-emerald-400">
                  {formatCurrency(metrics.totalMonthlyIncome, curr)}
                </span>
              </div>
            </div>

            {/* Expenses Side */}
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-slate-800 dark:text-slate-200 block border-b border-slate-200 dark:border-slate-700 pb-1">
                Monthly Expenses
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Housing / Rent / Loan EMI:</span>
                <span className="font-mono font-medium">{formatCurrency(state.expenses.housing, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Food, Utilities & Transport:</span>
                <span className="font-mono font-medium">
                  {formatCurrency(state.expenses.groceriesFood + state.expenses.utilitiesBills + state.expenses.transportFuel, curr)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Lifestyle & Discretionary:</span>
                <span className="font-mono font-medium">
                  {formatCurrency(state.expenses.lifestyleEntertainment + state.expenses.discretionaryOther + state.expenses.healthcare, curr)}
                </span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold">
                <span>Total Monthly Outflows:</span>
                <span className="font-mono text-rose-600 dark:text-rose-400">
                  {formatCurrency(metrics.totalMonthlyExpenses, curr)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Assets & Liabilities Summary Table */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
            Asset Inventory vs Debt Portfolio
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-emerald-700 dark:text-emerald-400 block border-b border-slate-200 dark:border-slate-700 pb-1">
                Total Assets ({formatCurrency(metrics.totalAssets, curr)})
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Emergency Cash Buffer:</span>
                <span className="font-mono">{formatCurrency(state.investments.emergencyFund, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Fixed Deposits & Bonds:</span>
                <span className="font-mono">{formatCurrency(state.investments.fixedDeposits, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Direct Stocks & Equity:</span>
                <span className="font-mono">{formatCurrency(state.investments.stocksLumpsum, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Gold & Other Tangibles:</span>
                <span className="font-mono">{formatCurrency(state.investments.goldValue + state.investments.otherAssetsValue, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Real Estate / Home Property:</span>
                <span className="font-mono">
                  {formatCurrency(
                    state.investments.realEstateLandValue +
                      (state.housing.housingType === 'own_with_loan' || state.housing.housingType === 'own_outright'
                        ? state.housing.homePropertyValue
                        : 0),
                    curr
                  )}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2">
              <span className="font-bold text-rose-700 dark:text-rose-400 block border-b border-slate-200 dark:border-slate-700 pb-1">
                Total Liabilities ({formatCurrency(metrics.totalLiabilities, curr)})
              </span>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Home Mortgage Principal:</span>
                <span className="font-mono">
                  {formatCurrency(state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanRemaining : 0, curr)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Personal & Car Loans:</span>
                <span className="font-mono">{formatCurrency(state.debts.personalLoans + state.debts.carLoans, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Credit Card Balances:</span>
                <span className="font-mono">{formatCurrency(state.debts.creditCardDues, curr)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Education & Other:</span>
                <span className="font-mono">{formatCurrency(state.debts.educationLoans + state.debts.otherDebts, curr)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Compounding SIP Projection */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            SIP Compounding Wealth Horizon
          </h3>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            By committing <strong className="font-mono">{formatCurrency(state.investments.sipMonthlyAmount, curr)}/month</strong> over{' '}
            <strong>{state.investments.sipTenureYears} years</strong> at an expected return of{' '}
            <strong>{state.investments.sipExpectedReturnPercent}%</strong>:
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-1 font-mono">
            <span>Principal Invested: <strong>{formatCurrency(metrics.sipInvestedTotal, curr)}</strong></span>
            <span>·</span>
            <span className="text-emerald-600 dark:text-emerald-400">Estimated Wealth Gain: <strong>+{formatCurrency(metrics.sipWealthGain, curr)}</strong></span>
            <span>·</span>
            <span className="text-indigo-600 dark:text-indigo-400">Projected Corpus: <strong>{formatCurrency(metrics.sipEstimatedFutureValue, curr)}</strong></span>
          </div>
        </div>

        {/* Priority Action Checklist */}
        <div className="space-y-3 print-break-inside-avoid">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider border-b border-slate-200 dark:border-slate-800 pb-2">
            Priority Action Checklist for Improvement
          </h3>
          <div className="space-y-2">
            {tips.slice(0, 4).map((tip, idx) => (
              <div
                key={idx}
                className="p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs space-y-1"
              >
                <div className="flex items-center justify-between font-semibold">
                  <span className="text-slate-900 dark:text-white">
                    {idx + 1}. {tip.title}
                  </span>
                  <span className="text-[11px] text-emerald-600 font-mono">{tip.impactScore}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                  {tip.actionStep}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Official Footer Disclaimer */}
        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Generated by FinPulse Smart Financial Health Analyzer</span>
          <span>Certified Algorithmic Heuristics · Confidential Personal Report</span>
        </div>

      </div>
    </div>
  );
};
