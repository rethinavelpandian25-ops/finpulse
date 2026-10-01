import React from 'react';
import {
  FullFinancialState,
  HousingType,
  EmiComfortLevel,
} from '../types/finance';
import { formatCurrency } from '../utils/financeCalculators';
import {
  User,
  Wallet,
  Receipt,
  Home,
  Shield,
  CreditCard,
  Coins,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';

interface DashboardGridFormProps {
  state: FullFinancialState;
  onChange: (updated: FullFinancialState) => void;
  onGoToAnalysis: () => void;
}

export const DashboardGridForm: React.FC<DashboardGridFormProps> = ({
  state,
  onChange,
  onGoToAnalysis,
}) => {
  const curr = state.profile.currency;

  const updateProfile = (field: keyof typeof state.profile, value: any) => {
    onChange({
      ...state,
      profile: { ...state.profile, [field]: value },
    });
  };

  const updateIncome = (field: keyof typeof state.income, value: number) => {
    onChange({
      ...state,
      income: { ...state.income, [field]: isNaN(value) ? 0 : value },
    });
  };

  const updateExpense = (field: keyof typeof state.expenses, value: number) => {
    onChange({
      ...state,
      expenses: { ...state.expenses, [field]: isNaN(value) ? 0 : value },
    });
  };

  const updateHousing = (field: keyof typeof state.housing, value: any) => {
    onChange({
      ...state,
      housing: { ...state.housing, [field]: value },
    });
  };

  const updateInvestment = (field: keyof typeof state.investments, value: number) => {
    onChange({
      ...state,
      investments: { ...state.investments, [field]: isNaN(value) ? 0 : value },
    });
  };

  const updateInsurance = (field: keyof typeof state.insurance, value: any) => {
    onChange({
      ...state,
      insurance: { ...state.insurance, [field]: value },
    });
  };

  const updateDebt = (field: keyof typeof state.debts, value: number) => {
    onChange({
      ...state,
      debts: { ...state.debts, [field]: isNaN(value) ? 0 : value },
    });
  };

  // Quick total calculations for immediate visual feedback
  const totalMonthlyIncome = state.income.monthlySalary + (state.income.passiveIncome || 0);
  const totalMonthlyExpenses =
    state.expenses.housing +
    state.expenses.groceriesFood +
    state.expenses.utilitiesBills +
    state.expenses.transportFuel +
    state.expenses.lifestyleEntertainment +
    state.expenses.healthcare +
    state.expenses.discretionaryOther;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">
            <span>Audit Questionnaire</span>
            <span aria-hidden="true">·</span>
            <span>Interactive Financial Grid</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            {state.profile.name ? `${state.profile.name}'s Financial Profile` : 'Your Financial Profile'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Fill in your income, monthly outflows, loans, assets, and insurance to generate your comprehensive safety audit.
          </p>
        </div>

        {/* Live Mini Summary & Jump Button */}
        <div className="flex items-center gap-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3 rounded-xl">
          <div className="text-right">
            <span className="block text-xs text-slate-500 dark:text-slate-400 font-medium">Monthly Cashflow</span>
            <span className={`text-sm font-bold font-mono ${totalMonthlyIncome - totalMonthlyExpenses >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
              {formatCurrency(totalMonthlyIncome - totalMonthlyExpenses, curr)} / mo
            </span>
          </div>
          <button
            onClick={onGoToAnalysis}
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-xs rounded-lg transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
          >
            <span>View Safety Score</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Grid of Modern Input Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* 1. Profile & Core Demographics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">01. Personal Demographics</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Basic details for retirement and risk calculation</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={state.profile.name}
                onChange={(e) => updateProfile('name', e.target.value)}
                placeholder="Enter name"
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Age
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="18"
                  max="90"
                  value={state.profile.age}
                  onChange={(e) => updateProfile('age', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Dependents
              </label>
              <input
                type="number"
                min="0"
                max="10"
                value={state.profile.dependents}
                onChange={(e) => updateProfile('dependents', parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 2. Income & Cash Inflow */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">02. Monthly Income Streams</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Take-home salary and recurring passive cashflow</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Take-Home Salary
                </label>
                <span className="text-[11px] text-slate-400">Net after tax</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  step="1000"
                  value={state.income.monthlySalary}
                  onChange={(e) => updateIncome('monthlySalary', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Monthly Passive Income
                </label>
                <span className="text-[11px] text-slate-400">Rent, dividends, freelance</span>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  step="1000"
                  value={state.income.passiveIncome}
                  onChange={(e) => updateIncome('passiveIncome', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between pt-1">
            <span>Total Monthly Inflow:</span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              {formatCurrency(totalMonthlyIncome, curr)} / month
            </span>
          </div>
        </div>

        {/* 3. Monthly Expenses Breakdown (Grid Format) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <Receipt className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">03. Monthly Expenses by Category</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Categorize your regular monthly outflows accurately</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-slate-500 dark:text-slate-400">Total Monthly Outflows: </span>
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white">
                {formatCurrency(totalMonthlyExpenses, curr)}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Housing / Base Rent / EMI
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.housing}
                  onChange={(e) => updateExpense('housing', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Groceries & Food Supplies
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.groceriesFood}
                  onChange={(e) => updateExpense('groceriesFood', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Utilities & Bills (Power, WiFi, Gas)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.utilitiesBills}
                  onChange={(e) => updateExpense('utilitiesBills', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Transport & Fuel
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.transportFuel}
                  onChange={(e) => updateExpense('transportFuel', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Lifestyle, Dining & Subscriptions
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.lifestyleEntertainment}
                  onChange={(e) => updateExpense('lifestyleEntertainment', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Healthcare & Medicine
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.healthcare}
                  onChange={(e) => updateExpense('healthcare', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Discretionary & Miscellaneous
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.expenses.discretionaryOther}
                  onChange={(e) => updateExpense('discretionaryOther', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col justify-center">
              <span className="text-[11px] text-slate-500 dark:text-slate-400">Expense Burden Ratio:</span>
              <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                {totalMonthlyIncome > 0 ? ((totalMonthlyExpenses / totalMonthlyIncome) * 100).toFixed(0) : 0}% of income
              </span>
            </div>
          </div>
        </div>

        {/* 4. Housing & Home Loan Status (Deep Dive) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Home className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">04. Housing Status & Home Loan Affordability</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Analyze property values, mortgage burden, and salary comfort</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Housing Type
              </label>
              <select
                value={state.housing.housingType}
                onChange={(e) => updateHousing('housingType', e.target.value as HousingType)}
                className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                <option value="rented">Living on Rent</option>
                <option value="own_with_loan">Own Home (with Active Home Loan)</option>
                <option value="own_outright">Own Home (Fully Paid / Debt-free)</option>
                <option value="living_with_parents">Living with Family / Parents</option>
              </select>
            </div>

            {state.housing.housingType === 'rented' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Monthly Rent Paid
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                  <input
                    type="number"
                    value={state.housing.monthlyRent}
                    onChange={(e) => updateHousing('monthlyRent', parseFloat(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {(state.housing.housingType === 'own_with_loan' || state.housing.housingType === 'own_outright') && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Estimated Property Market Value
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                  <input
                    type="number"
                    step="50000"
                    value={state.housing.homePropertyValue}
                    onChange={(e) => updateHousing('homePropertyValue', parseFloat(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {state.housing.housingType === 'own_with_loan' && (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Home Loan Outstanding Balance
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                    <input
                      type="number"
                      step="50000"
                      value={state.housing.homeLoanRemaining}
                      onChange={(e) => updateHousing('homeLoanRemaining', parseFloat(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Monthly Home Loan EMI Paid
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                    <input
                      type="number"
                      step="1000"
                      value={state.housing.homeLoanEmi}
                      onChange={(e) => updateHousing('homeLoanEmi', parseFloat(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Home Loan Interest Rate (% APR)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.05"
                      value={state.housing.homeLoanInterestRate}
                      onChange={(e) => updateHousing('homeLoanInterestRate', parseFloat(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Is this EMI comfortable for salary?
                  </label>
                  <select
                    value={state.housing.isEmiComfortable}
                    onChange={(e) => updateHousing('isEmiComfortable', e.target.value as EmiComfortLevel)}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="comfortable">Comfortable (Easy to manage)</option>
                    <option value="manageable">Manageable (Tight occasionally)</option>
                    <option value="stressful">Stressful (Eating too much salary)</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 5. Emergency Fund & Cash Reserves */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-teal-50 dark:bg-teal-950 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">05. Emergency Fund (Cash)</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Liquid cash and savings for unpredictable emergencies</p>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Liquid Cash & Emergency Fund
              </label>
              <span className="text-[11px] text-slate-400">Savings account & liquid FDs</span>
            </div>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
              <input
                type="number"
                step="5000"
                value={state.investments.emergencyFund}
                onChange={(e) => updateInvestment('emergencyFund', parseFloat(e.target.value))}
                className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg border border-slate-200 dark:border-slate-700/60 text-xs">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
              <span>Current Cash Runway:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {totalMonthlyExpenses > 0
                  ? (state.investments.emergencyFund / totalMonthlyExpenses).toFixed(1)
                  : '0'}{' '}
                months
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Certified Rule: Maintain at least 6 months of living expenses in instant access cash.
            </p>
          </div>
        </div>

        {/* 6. Systematic Investments (SIP) & Compounding */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">06. SIP & Monthly Compounding</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Systematic investment plans in mutual funds & equity</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Monthly SIP Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  step="500"
                  value={state.investments.sipMonthlyAmount}
                  onChange={(e) => updateInvestment('sipMonthlyAmount', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                SIP Tenure (Years)
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="1"
                  max="40"
                  value={state.investments.sipTenureYears}
                  onChange={(e) => updateInvestment('sipTenureYears', parseInt(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">yrs</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Expected Annual Return %
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={state.investments.sipExpectedReturnPercent}
                  onChange={(e) => updateInvestment('sipExpectedReturnPercent', parseFloat(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
                <span className="absolute right-3 top-2.5 text-xs text-slate-400">%</span>
              </div>
            </div>
          </div>
        </div>

        {/* 7. Other Investments & Tangible Assets (FD, Stocks, Gold, Land) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Coins className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">07. Assets & Lumpsum Investments</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">FDs, stocks, physical gold, land, and other assets</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Fixed Deposits (FDs / Bonds)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.investments.fixedDeposits}
                  onChange={(e) => updateInvestment('fixedDeposits', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Direct Stocks & Mutual Fund Lumpsum
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.investments.stocksLumpsum}
                  onChange={(e) => updateInvestment('stocksLumpsum', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gold & Precious Metals Value
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.investments.goldValue}
                  onChange={(e) => updateInvestment('goldValue', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Other Real Estate / Land / Plots
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.investments.realEstateLandValue}
                  onChange={(e) => updateInvestment('realEstateLandValue', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 8. Insurance Plans & Risk Shield */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">08. Insurance Plans & Family Shield</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Term life, health insurance, and parent protection</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Term Insurance Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Do you have Pure Term Life Insurance?
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Protects dependents in event of untimely demise
                </span>
              </div>
              <input
                type="checkbox"
                checked={state.insurance.hasTermInsurance}
                onChange={(e) => updateInsurance('hasTermInsurance', e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            {state.insurance.hasTermInsurance && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Term Sum Assured (Cover Amount)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                  <input
                    type="number"
                    step="500000"
                    value={state.insurance.termInsuranceCover}
                    onChange={(e) => updateInsurance('termInsuranceCover', parseFloat(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Health Insurance Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Do you have Independent Health Insurance?
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Separate from corporate employee coverage
                </span>
              </div>
              <input
                type="checkbox"
                checked={state.insurance.hasHealthInsurance}
                onChange={(e) => updateInsurance('hasHealthInsurance', e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            {state.insurance.hasHealthInsurance && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Health Policy Sum Insured
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                  <input
                    type="number"
                    step="100000"
                    value={state.insurance.healthInsuranceCover}
                    onChange={(e) => updateInsurance('healthInsuranceCover', parseFloat(e.target.value))}
                    className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            )}

            {/* Parents Covered Toggle */}
            <div className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40">
              <div>
                <span className="block text-xs font-semibold text-slate-800 dark:text-slate-200">
                  Are your Parents medically insured or covered?
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Protects family savings against senior hospital bills
                </span>
              </div>
              <input
                type="checkbox"
                checked={state.insurance.parentsCovered}
                onChange={(e) => updateInsurance('parentsCovered', e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 9. Debts & Other Liabilities */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-2xs space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <CreditCard className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">09. Non-Mortgage Debts & Liabilities</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Personal loans, credit card balances, car loans, and education debt</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Credit Card Outstanding Balance
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.debts.creditCardDues}
                  onChange={(e) => updateDebt('creditCardDues', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Personal Loans Outstanding
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.debts.personalLoans}
                  onChange={(e) => updateDebt('personalLoans', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Car / Vehicle Loan Outstanding
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.debts.carLoans}
                  onChange={(e) => updateDebt('carLoans', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Education / Other Debts
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-mono">{curr}</span>
                <input
                  type="number"
                  value={state.debts.educationLoans}
                  onChange={(e) => updateDebt('educationLoans', parseFloat(e.target.value))}
                  className="w-full pl-7 pr-3 py-2 text-sm font-mono rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Action Footer Button */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <HelpCircle className="w-4 h-4" />
          <span>All data remains local in your browser and is evaluated against CFP benchmarks.</span>
        </div>

        <button
          onClick={onGoToAnalysis}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white font-semibold text-sm rounded-xl transition-all flex items-center gap-2 shadow-sm hover:shadow cursor-pointer"
        >
          <span>Calculate Safety Score & Visual Charts</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
