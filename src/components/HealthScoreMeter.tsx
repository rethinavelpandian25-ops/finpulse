import React, { useEffect } from 'react';
import { FinancialMetrics } from '../types/finance';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  AlertCircle,
  AlertTriangle,
  Award,
  ArrowUpRight,
} from 'lucide-react';

interface HealthScoreMeterProps {
  metrics: FinancialMetrics;
  userName: string;
}

export const HealthScoreMeter: React.FC<HealthScoreMeterProps> = ({
  metrics,
  userName,
}) => {
  const { overallScore, status, statusLabel, statusDescription, pillars } = metrics;

  // Trigger celebration confetti if in Safest Position
  useEffect(() => {
    if (status === 'very_safe' && overallScore >= 80) {
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#10b981', '#059669', '#34d399', '#6ee7b7'],
        });
      } catch {
        // Safe fallback if blocked
      }
    }
  }, [status, overallScore]);

  // Gauge calculations for 180-degree semi-circle
  // angle goes from -90 deg (score 0) to +90 deg (score 100)
  const angle = -90 + (overallScore / 100) * 180;

  // Status visual styles
  const isSafe = status === 'very_safe';
  const isMedium = status === 'medium';
  const isDanger = status === 'non_safe';

  const badgeColor = isSafe
    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
    : isMedium
    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border-amber-300 dark:border-amber-800'
    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400 border-rose-300 dark:border-rose-800';

  const glowColor = isSafe
    ? 'from-emerald-500/20'
    : isMedium
    ? 'from-amber-500/20'
    : 'from-rose-500/20';

  const indicatorDot = isSafe
    ? 'bg-emerald-500'
    : isMedium
    ? 'bg-amber-500'
    : 'bg-rose-500';

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden transition-all duration-300">
      {/* Background radial glow */}
      <div
        className={`absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b ${glowColor} to-transparent rounded-full blur-3xl pointer-events-none opacity-50 dark:opacity-30`}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Gauge & Overall Score (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center text-center">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
            <span className={`w-2 h-2 rounded-full ${indicatorDot} animate-pulse`} />
            <span className="text-slate-500 dark:text-slate-400">Composite Health Index</span>
          </div>

          {/* Semi-Circle SVG Gauge */}
          <div className="relative w-64 h-36 flex items-end justify-center my-2">
            <svg viewBox="0 0 200 115" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="scoreGaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ef4444" />
                  <stop offset="45%" stopColor="#f59e0b" />
                  <stop offset="80%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>

              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
                strokeLinecap="round"
                className="text-slate-100 dark:text-slate-800"
              />

              {/* Colored Gauge Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#scoreGaugeGrad)"
                strokeWidth="14"
                strokeLinecap="round"
                strokeDasharray="251.2"
                strokeDashoffset={251.2 - (251.2 * overallScore) / 100}
                className="transition-all duration-1000 ease-out"
              />

              {/* Needle */}
              <g
                transform={`rotate(${angle} 100 100)`}
                className="transition-transform duration-1000 ease-out"
              >
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke={isSafe ? '#059669' : isMedium ? '#d97706' : '#dc2626'}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
                <circle
                  cx="100"
                  cy="100"
                  r="7"
                  fill="#0f172a"
                  stroke="white"
                  strokeWidth="2"
                  className="dark:fill-white dark:stroke-slate-900"
                />
              </g>
            </svg>

            {/* Score Number Display */}
            <div className="absolute bottom-0 flex flex-col items-center">
              <span className="text-4xl sm:text-5xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
                {overallScore}
              </span>
              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
                out of 100
              </span>
            </div>
          </div>

          {/* Status Label Banner */}
          <div className={`mt-4 px-4 py-1.5 rounded-full border text-xs font-bold tracking-wide transition-all ${badgeColor}`}>
            {statusLabel}
          </div>

          {/* Status Description */}
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-3 max-w-sm leading-relaxed">
            {statusDescription}
          </p>

          {/* Quick Safe/Medium/Risk Scale Reference */}
          <div className="w-full max-w-xs grid grid-cols-3 gap-1 mt-5 text-[10px] font-semibold text-center pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="text-rose-500 flex flex-col items-center">
              <span>0 - 49</span>
              <span className="font-normal text-slate-400">High Risk</span>
            </div>
            <div className="text-amber-500 flex flex-col items-center">
              <span>50 - 77</span>
              <span className="font-normal text-slate-400">Medium</span>
            </div>
            <div className="text-emerald-500 flex flex-col items-center">
              <span>78 - 100</span>
              <span className="font-normal text-slate-400">Safest</span>
            </div>
          </div>
        </div>

        {/* Right Column: 5 Pillar Diagnostic Breakdown (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              5-Pillar Structural Breakdown
            </h3>
            <span className="text-xs text-slate-400">Audited for {userName || 'User'}</span>
          </div>

          <div className="space-y-3">
            {Object.entries(pillars).map(([key, pillar]) => {
              const pct = (pillar.score / pillar.maxScore) * 100;
              const pillarColor =
                pillar.status === 'good'
                  ? 'bg-emerald-500'
                  : pillar.status === 'warning'
                  ? 'bg-amber-500'
                  : 'bg-rose-500';

              const pillarText =
                pillar.status === 'good'
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : pillar.status === 'warning'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-rose-600 dark:text-rose-400';

              const Icon =
                pillar.status === 'good'
                  ? ShieldCheck
                  : pillar.status === 'warning'
                  ? AlertTriangle
                  : AlertCircle;

              return (
                <div
                  key={key}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800/80 transition-all hover:bg-slate-100/60 dark:hover:bg-slate-800/80"
                >
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800 dark:text-slate-200">
                      <Icon className={`w-3.5 h-3.5 ${pillarText}`} />
                      <span>{pillar.name}</span>
                    </div>
                    <div className="font-mono">
                      <span className={`font-bold ${pillarText}`}>{pillar.score}</span>
                      <span className="text-slate-400"> / {pillar.maxScore}</span>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden mb-1.5">
                    <div
                      className={`h-full ${pillarColor} transition-all duration-700 rounded-full`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal">
                    {pillar.feedback}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
