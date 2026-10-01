import {
  FullFinancialState,
  FinancialMetrics,
  ScorePillar,
  SuggestionTip,
  FinancialStatusType,
} from '../types/finance';

export const INITIAL_FINANCIAL_STATE: FullFinancialState = {
  profile: {
    name: '',
    age: 29,
    dependents: 1,
    currency: '₹',
  },
  income: {
    monthlySalary: 75000,
    passiveIncome: 5000,
  },
  expenses: {
    housing: 18000,
    groceriesFood: 12000,
    utilitiesBills: 4000,
    transportFuel: 5000,
    lifestyleEntertainment: 6000,
    healthcare: 3000,
    discretionaryOther: 4000,
  },
  housing: {
    housingType: 'rented',
    monthlyRent: 18000,
    homePropertyValue: 0,
    homeLoanRemaining: 0,
    homeLoanInterestRate: 8.5,
    homeLoanEmi: 0,
    isEmiComfortable: 'comfortable',
  },
  investments: {
    emergencyFund: 150000,
    fixedDeposits: 100000,
    stocksLumpsum: 120000,
    sipMonthlyAmount: 10000,
    sipTenureYears: 10,
    sipExpectedReturnPercent: 12,
    goldValue: 80000,
    realEstateLandValue: 0,
    otherAssetsValue: 0,
  },
  insurance: {
    hasTermInsurance: true,
    termInsuranceCover: 10000000, // 1 Crore
    parentsCovered: false,
    hasHealthInsurance: true,
    healthInsuranceCover: 1000000, // 10 Lakh
    hasLifeEndowment: false,
  },
  debts: {
    personalLoans: 0,
    carLoans: 0,
    creditCardDues: 0,
    educationLoans: 0,
    otherDebts: 0,
  },
};

export const DEMO_PRESETS: Record<string, { label: string; state: FullFinancialState }> = {
  safe: {
    label: 'Disciplined Investor (Very Safe 🟢)',
    state: {
      profile: { name: 'Aarav Patel', age: 32, dependents: 2, currency: '₹' },
      income: { monthlySalary: 140000, passiveIncome: 15000 },
      expenses: {
        housing: 28000,
        groceriesFood: 18000,
        utilitiesBills: 6000,
        transportFuel: 8000,
        lifestyleEntertainment: 10000,
        healthcare: 4000,
        discretionaryOther: 5000,
      },
      housing: {
        housingType: 'own_with_loan',
        monthlyRent: 0,
        homePropertyValue: 6500000,
        homeLoanRemaining: 2200000,
        homeLoanInterestRate: 8.35,
        homeLoanEmi: 22000,
        isEmiComfortable: 'comfortable',
      },
      investments: {
        emergencyFund: 600000,
        fixedDeposits: 350000,
        stocksLumpsum: 850000,
        sipMonthlyAmount: 35000,
        sipTenureYears: 15,
        sipExpectedReturnPercent: 12.5,
        goldValue: 400000,
        realEstateLandValue: 1200000,
        otherAssetsValue: 150000,
      },
      insurance: {
        hasTermInsurance: true,
        termInsuranceCover: 20000000,
        parentsCovered: true,
        hasHealthInsurance: true,
        healthInsuranceCover: 2500000,
        hasLifeEndowment: false,
      },
      debts: {
        personalLoans: 0,
        carLoans: 0,
        creditCardDues: 0,
        educationLoans: 0,
        otherDebts: 0,
      },
    },
  },
  medium: {
    label: 'Growing Aspirant (Medium / Balanced 🟡)',
    state: {
      profile: { name: 'Meera Sharma', age: 28, dependents: 1, currency: '₹' },
      income: { monthlySalary: 85000, passiveIncome: 0 },
      expenses: {
        housing: 22000,
        groceriesFood: 14000,
        utilitiesBills: 5000,
        transportFuel: 7000,
        lifestyleEntertainment: 12000,
        healthcare: 3000,
        discretionaryOther: 6000,
      },
      housing: {
        housingType: 'rented',
        monthlyRent: 22000,
        homePropertyValue: 0,
        homeLoanRemaining: 0,
        homeLoanInterestRate: 8.5,
        homeLoanEmi: 0,
        isEmiComfortable: 'manageable',
      },
      investments: {
        emergencyFund: 120000,
        fixedDeposits: 50000,
        stocksLumpsum: 80000,
        sipMonthlyAmount: 8000,
        sipTenureYears: 10,
        sipExpectedReturnPercent: 12,
        goldValue: 50000,
        realEstateLandValue: 0,
        otherAssetsValue: 0,
      },
      insurance: {
        hasTermInsurance: false,
        termInsuranceCover: 0,
        parentsCovered: false,
        hasHealthInsurance: true,
        healthInsuranceCover: 500000,
        hasLifeEndowment: true,
      },
      debts: {
        personalLoans: 120000,
        carLoans: 180000,
        creditCardDues: 25000,
        educationLoans: 0,
        otherDebts: 0,
      },
    },
  },
  danger: {
    label: 'Debt Stressed (High Risk / Non-Safe 🔴)',
    state: {
      profile: { name: 'Rahul Varma', age: 34, dependents: 3, currency: '₹' },
      income: { monthlySalary: 65000, passiveIncome: 0 },
      expenses: {
        housing: 28000,
        groceriesFood: 16000,
        utilitiesBills: 6000,
        transportFuel: 7000,
        lifestyleEntertainment: 9000,
        healthcare: 4000,
        discretionaryOther: 5000,
      },
      housing: {
        housingType: 'own_with_loan',
        monthlyRent: 0,
        homePropertyValue: 4000000,
        homeLoanRemaining: 3600000,
        homeLoanInterestRate: 9.5,
        homeLoanEmi: 32000,
        isEmiComfortable: 'stressful',
      },
      investments: {
        emergencyFund: 25000,
        fixedDeposits: 0,
        stocksLumpsum: 20000,
        sipMonthlyAmount: 2000,
        sipTenureYears: 5,
        sipExpectedReturnPercent: 11,
        goldValue: 30000,
        realEstateLandValue: 0,
        otherAssetsValue: 0,
      },
      insurance: {
        hasTermInsurance: false,
        termInsuranceCover: 0,
        parentsCovered: false,
        hasHealthInsurance: false,
        healthInsuranceCover: 0,
        hasLifeEndowment: false,
      },
      debts: {
        personalLoans: 350000,
        carLoans: 250000,
        creditCardDues: 120000,
        educationLoans: 80000,
        otherDebts: 50000,
      },
    },
  },
};

export function formatCurrency(amount: number, currency: string = '₹'): string {
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);

  let formatted = '';
  if (currency === '₹') {
    if (absAmount >= 10000000) {
      formatted = `${(absAmount / 10000000).toFixed(2)} Cr`;
    } else if (absAmount >= 100000) {
      formatted = `${(absAmount / 100000).toFixed(2)} L`;
    } else if (absAmount >= 1000) {
      formatted = `${(absAmount / 1000).toFixed(1)}k`;
    } else {
      formatted = Math.round(absAmount).toLocaleString('en-IN');
    }
  } else {
    if (absAmount >= 1000000) {
      formatted = `${(absAmount / 1000000).toFixed(2)}M`;
    } else if (absAmount >= 1000) {
      formatted = `${(absAmount / 1000).toFixed(1)}k`;
    } else {
      formatted = Math.round(absAmount).toLocaleString('en-US');
    }
  }

  return `${isNegative ? '-' : ''}${currency}${formatted}`;
}

export function formatFullCurrency(amount: number, currency: string = '₹'): string {
  const isNegative = amount < 0;
  const abs = Math.round(Math.abs(amount));
  const locale = currency === '₹' ? 'en-IN' : 'en-US';
  return `${isNegative ? '-' : ''}${currency}${abs.toLocaleString(locale)}`;
}

export function calculateSipFutureValue(
  monthlyInvestment: number,
  years: number,
  annualRatePercent: number
): { invested: number; estimatedValue: number; wealthGain: number } {
  if (monthlyInvestment <= 0 || years <= 0) {
    return { invested: 0, estimatedValue: 0, wealthGain: 0 };
  }

  const months = years * 12;
  const monthlyRate = annualRatePercent / 12 / 100;
  const invested = monthlyInvestment * months;

  if (monthlyRate === 0) {
    return { invested, estimatedValue: invested, wealthGain: 0 };
  }

  // Future value of SIP formula: P * [((1+r)^n - 1) / r] * (1+r)
  const compoundMultiplier = ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
  const estimatedValue = Math.round(monthlyInvestment * compoundMultiplier);
  const wealthGain = Math.max(0, estimatedValue - invested);

  return { invested, estimatedValue, wealthGain };
}

export function computeFinancialMetrics(state: FullFinancialState): FinancialMetrics {
  const totalMonthlyIncome = Math.max(0, state.income.monthlySalary + (state.income.passiveIncome || 0));

  // Determine effective housing expense (either rent or home loan EMI or user-input housing)
  let effectiveHousingExpense = state.expenses.housing;
  if (state.housing.housingType === 'rented') {
    effectiveHousingExpense = Math.max(effectiveHousingExpense, state.housing.monthlyRent);
  } else if (state.housing.housingType === 'own_with_loan') {
    effectiveHousingExpense = Math.max(effectiveHousingExpense, state.housing.homeLoanEmi);
  }

  const totalMonthlyExpenses =
    effectiveHousingExpense +
    state.expenses.groceriesFood +
    state.expenses.utilitiesBills +
    state.expenses.transportFuel +
    state.expenses.lifestyleEntertainment +
    state.expenses.healthcare +
    state.expenses.discretionaryOther;

  const monthlyNetCashflow = totalMonthlyIncome - totalMonthlyExpenses;

  // Emergency runway
  const emergencyRunwayMonths =
    totalMonthlyExpenses > 0 ? state.investments.emergencyFund / totalMonthlyExpenses : 0;

  // Debts and EMIs
  const otherDebtsTotal =
    state.debts.personalLoans +
    state.debts.carLoans +
    state.debts.creditCardDues +
    state.debts.educationLoans +
    state.debts.otherDebts;

  const totalLiabilities =
    (state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanRemaining : 0) +
    otherDebtsTotal;

  // Approximate monthly debt payment (home loan EMI + rough 3% monthly service on other debts)
  const monthlyDebtService =
    (state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanEmi : 0) +
    otherDebtsTotal * 0.03;

  const debtToIncomeRatio =
    totalMonthlyIncome > 0 ? (monthlyDebtService / totalMonthlyIncome) * 100 : 0;

  // Savings rate
  const monthlyInvestments = state.investments.sipMonthlyAmount;
  const monthlySurplus = Math.max(0, monthlyNetCashflow - monthlyInvestments);
  const totalMonthlySavedOrInvested = monthlyInvestments + monthlySurplus;
  const savingsRate =
    totalMonthlyIncome > 0 ? (totalMonthlySavedOrInvested / totalMonthlyIncome) * 100 : 0;

  // SIP calculations
  const sipResult = calculateSipFutureValue(
    state.investments.sipMonthlyAmount,
    state.investments.sipTenureYears,
    state.investments.sipExpectedReturnPercent
  );

  // Total Assets
  const homeAssetValue =
    state.housing.housingType === 'own_outright' || state.housing.housingType === 'own_with_loan'
      ? state.housing.homePropertyValue
      : 0;

  const totalAssets =
    state.investments.emergencyFund +
    state.investments.fixedDeposits +
    state.investments.stocksLumpsum +
    state.investments.goldValue +
    state.investments.realEstateLandValue +
    state.investments.otherAssetsValue +
    homeAssetValue;

  const netWorth = totalAssets - totalLiabilities;

  // 50/30/20 budget analysis
  const needsExpenses =
    effectiveHousingExpense +
    state.expenses.groceriesFood +
    state.expenses.utilitiesBills +
    state.expenses.transportFuel +
    state.expenses.healthcare;
  const wantsExpenses =
    state.expenses.lifestyleEntertainment + state.expenses.discretionaryOther;

  const needsRatio = totalMonthlyIncome > 0 ? (needsExpenses / totalMonthlyIncome) * 100 : 0;
  const wantsRatio = totalMonthlyIncome > 0 ? (wantsExpenses / totalMonthlyIncome) * 100 : 0;
  const savingsRatio = Math.max(0, 100 - needsRatio - wantsRatio);

  // ---- 5-PILLAR FINANCIAL HEALTH SCORING (0 to 100) ----

  // 1. Emergency Buffer (Max 25 pts)
  let emergencyScore = 0;
  let emergencyStatus: 'good' | 'warning' | 'danger' = 'danger';
  let emergencyFeedback = '';
  if (emergencyRunwayMonths >= 6) {
    emergencyScore = 25;
    emergencyStatus = 'good';
    emergencyFeedback = `Excellent runway of ${emergencyRunwayMonths.toFixed(1)} months. You are well insulated from sudden income disruptions.`;
  } else if (emergencyRunwayMonths >= 3) {
    emergencyScore = 16;
    emergencyStatus = 'warning';
    emergencyFeedback = `Moderate buffer of ${emergencyRunwayMonths.toFixed(1)} months. Aim to reach 6 full months of basic living costs.`;
  } else if (emergencyRunwayMonths >= 1) {
    emergencyScore = 8;
    emergencyStatus = 'danger';
    emergencyFeedback = `Vulnerable: Only ${emergencyRunwayMonths.toFixed(1)} months of emergency cash. High vulnerability to emergencies.`;
  } else {
    emergencyScore = 0;
    emergencyStatus = 'danger';
    emergencyFeedback = 'Critical Risk: Almost zero liquid emergency buffer. Any shock could force high-interest debt.';
  }

  // 2. Debt & EMI Safety (Max 25 pts)
  let debtScore = 0;
  let debtStatus: 'good' | 'warning' | 'danger' = 'danger';
  let debtFeedback = '';
  if (debtToIncomeRatio <= 20) {
    debtScore = 25;
    debtStatus = 'good';
    debtFeedback = `Comfortable debt load (${debtToIncomeRatio.toFixed(0)}% of income). Zero to minimal loan stress.`;
  } else if (debtToIncomeRatio <= 35) {
    debtScore = 18;
    debtStatus = 'good';
    debtFeedback = `Healthy debt ratio (${debtToIncomeRatio.toFixed(0)}%). Keep EMI commitments under check.`;
  } else if (debtToIncomeRatio <= 50) {
    debtScore = 10;
    debtStatus = 'warning';
    debtFeedback = `Stretched debt burden (${debtToIncomeRatio.toFixed(0)}%). Consider prepayment strategies to free up monthly cashflow.`;
  } else {
    debtScore = 2;
    debtStatus = 'danger';
    debtFeedback = `Dangerously high debt burden (${debtToIncomeRatio.toFixed(0)}% of income). Over half your income goes to EMIs.`;
  }

  // Adjust debt score if home loan is declared stressful
  if (state.housing.housingType === 'own_with_loan' && state.housing.isEmiComfortable === 'stressful') {
    debtScore = Math.max(0, debtScore - 5);
  }

  // 3. Savings & Compounding (Max 20 pts)
  let savingsScore = 0;
  let savingsStatus: 'good' | 'warning' | 'danger' = 'danger';
  let savingsFeedback = '';
  if (savingsRate >= 30) {
    savingsScore = 20;
    savingsStatus = 'good';
    savingsFeedback = `Outstanding savings rate of ${savingsRate.toFixed(0)}%. You are compounding wealth at an elite pace.`;
  } else if (savingsRate >= 20) {
    savingsScore = 15;
    savingsStatus = 'good';
    savingsFeedback = `Healthy savings rate of ${savingsRate.toFixed(0)}%. Aligns well with the 50-30-20 principle.`;
  } else if (savingsRate >= 10) {
    savingsScore = 9;
    savingsStatus = 'warning';
    savingsFeedback = `Moderate savings (${savingsRate.toFixed(0)}%). Increase monthly SIP and automate investments on salary day.`;
  } else {
    savingsScore = 3;
    savingsStatus = 'danger';
    savingsFeedback = `Low savings (${savingsRate.toFixed(0)}%). High expenses leave almost zero surplus for future security.`;
  }

  // 4. Insurance & Risk Shield (Max 15 pts)
  let insuranceScore = 0;
  let insuranceStatus: 'good' | 'warning' | 'danger' = 'danger';
  let insuranceFeedback = '';
  const annualIncome = totalMonthlyIncome * 12;
  const idealTermCover = annualIncome * 10;

  if (state.insurance.hasTermInsurance && state.insurance.termInsuranceCover >= idealTermCover) {
    insuranceScore += 7;
  } else if (state.insurance.hasTermInsurance) {
    insuranceScore += 4;
  }

  if (state.insurance.hasHealthInsurance && state.insurance.healthInsuranceCover >= 500000) {
    insuranceScore += 5;
  } else if (state.insurance.hasHealthInsurance) {
    insuranceScore += 3;
  }

  if (state.insurance.parentsCovered) {
    insuranceScore += 3;
  }

  if (insuranceScore >= 12) {
    insuranceStatus = 'good';
    insuranceFeedback = 'Comprehensive risk fortress. Life, health, and family medical exposures are insulated.';
  } else if (insuranceScore >= 7) {
    insuranceStatus = 'warning';
    insuranceFeedback = 'Partial insurance shield. Protect parents and ensure term cover is at least 10x annual salary.';
  } else {
    insuranceStatus = 'danger';
    insuranceFeedback = 'Severe Risk Shield Deficit: Missing term or health insurance leaves your balance sheet exposed to catastrophic wipeouts.';
  }

  // 5. Net Worth & Asset Health (Max 15 pts)
  let wealthScore = 0;
  let wealthStatus: 'good' | 'warning' | 'danger' = 'danger';
  let wealthFeedback = '';

  if (netWorth > 0) {
    const netWorthMultiple = annualIncome > 0 ? netWorth / annualIncome : 0;
    if (netWorthMultiple >= 3) {
      wealthScore = 15;
      wealthStatus = 'good';
      wealthFeedback = `Strong positive net worth (${netWorthMultiple.toFixed(1)}x annual earnings). Solid foundation of compounding assets.`;
    } else if (netWorthMultiple >= 1) {
      wealthScore = 11;
      wealthStatus = 'good';
      wealthFeedback = `Positive balance sheet (${netWorthMultiple.toFixed(1)}x annual income). Keep growing your equity base.`;
    } else {
      wealthScore = 7;
      wealthStatus = 'warning';
      wealthFeedback = 'Modest net worth. Debt-to-asset balance requires continued expansion of productive investments.';
    }
  } else {
    wealthScore = 2;
    wealthStatus = 'danger';
    wealthFeedback = 'Negative Net Worth: Total liabilities exceed tangible assets. Immediate debt restructuring recommended.';
  }

  const overallScore = Math.min(
    100,
    Math.max(5, emergencyScore + debtScore + savingsScore + insuranceScore + wealthScore)
  );

  let status: FinancialStatusType = 'medium';
  let statusLabel = 'Moderate / Balanced Position';
  let statusColor = 'text-amber-500';
  let statusDescription =
    'Your financial foundation is operational, but key vulnerabilities exist in emergency liquidity, insurance coverage, or high debt servicing.';

  if (overallScore >= 78) {
    status = 'very_safe';
    statusLabel = 'Very Safest Position 🟢';
    statusColor = 'text-emerald-500';
    statusDescription =
      'Outstanding financial health! You possess a robust emergency runway, controlled debts, consistent compounding through SIPs, and disciplined risk shields.';
  } else if (overallScore < 50) {
    status = 'non_safe';
    statusLabel = 'High Risk / Non-Safe Position 🔴';
    statusColor = 'text-rose-500';
    statusDescription =
      'Immediate attention required: Thin cash reserves, excessive debt commitments, or unshielded liabilities put your financial security at high risk of sudden crisis.';
  }

  const pillars = {
    emergency: {
      name: 'Emergency Liquidity',
      score: emergencyScore,
      maxScore: 25,
      status: emergencyStatus,
      feedback: emergencyFeedback,
    },
    debt: {
      name: 'Debt & EMI Load',
      score: debtScore,
      maxScore: 25,
      status: debtStatus,
      feedback: debtFeedback,
    },
    savings: {
      name: 'Savings & SIP Compounding',
      score: savingsScore,
      maxScore: 20,
      status: savingsStatus,
      feedback: savingsFeedback,
    },
    insurance: {
      name: 'Risk & Insurance Shield',
      score: insuranceScore,
      maxScore: 15,
      status: insuranceStatus,
      feedback: insuranceFeedback,
    },
    wealth: {
      name: 'Net Worth & Assets',
      score: wealthScore,
      maxScore: 15,
      status: wealthStatus,
      feedback: wealthFeedback,
    },
  };

  return {
    totalMonthlyIncome,
    totalMonthlyExpenses,
    monthlyNetCashflow,
    emergencyRunwayMonths,
    debtToIncomeRatio,
    savingsRate,
    totalAssets,
    totalLiabilities,
    netWorth,
    sipInvestedTotal: sipResult.invested,
    sipEstimatedFutureValue: sipResult.estimatedValue,
    sipWealthGain: sipResult.wealthGain,
    needsRatio,
    wantsRatio,
    savingsRatio,
    overallScore,
    status,
    statusLabel,
    statusColor,
    statusDescription,
    pillars,
  };
}

export function generateSmartSuggestions(
  state: FullFinancialState,
  metrics: FinancialMetrics
): SuggestionTip[] {
  const tips: SuggestionTip[] = [];
  const curr = state.profile.currency;
  const annualIncome = metrics.totalMonthlyIncome * 12;
  const idealTermCover = annualIncome * 12;

  // 1. Emergency Fund Rule
  if (metrics.emergencyRunwayMonths < 3) {
    const targetBuffer = metrics.totalMonthlyExpenses * 6;
    const shortfall = Math.max(0, targetBuffer - state.investments.emergencyFund);
    tips.push({
      id: 'emergency-deficit',
      category: 'safety',
      priority: 'critical',
      title: 'Build Critical 6-Month Emergency Shield',
      summary: `Your cash runway is only ${metrics.emergencyRunwayMonths.toFixed(1)} months. A medical emergency or job layoff could force high-interest borrowing.`,
      actionStep: `Redirect ${formatCurrency(Math.min(15000, metrics.totalMonthlyIncome * 0.15), curr)}/month into a high-yield sweep FD until you reach ${formatCurrency(targetBuffer, curr)} (Shortfall: ${formatCurrency(shortfall, curr)}).`,
      impactScore: '+15 Health Score Points',
    });
  } else if (metrics.emergencyRunwayMonths < 6) {
    tips.push({
      id: 'emergency-topup',
      category: 'safety',
      priority: 'medium',
      title: 'Extend Emergency Buffer from 3 to 6 Months',
      summary: 'You have a preliminary safety net, but expanding to a 6-month buffer provides total peace of mind in unpredictable economic cycles.',
      actionStep: 'Deposit annual bonuses or tax refunds into liquid debt funds or auto-sweep bank balances.',
      impactScore: '+8 Health Score Points',
    });
  }

  // 2. Term Insurance Gap
  if (!state.insurance.hasTermInsurance) {
    tips.push({
      id: 'term-insurance-missing',
      category: 'insurance',
      priority: 'critical',
      title: 'Obtain Pure Term Life Insurance Immediately',
      summary: `Without a term policy, your dependents are financially unprotected. A sudden catastrophe would leave them burdened with living expenses and loans.`,
      actionStep: `Purchase a pure term insurance cover of at least ${formatCurrency(idealTermCover, curr)} (10x-15x annual salary). For age ${state.profile.age}, this typically costs under ${formatCurrency(1200, curr)}/month. Avoid costly ULIP/Endowment plans.`,
      impactScore: '+10 Health Score Points',
    });
  } else if (state.insurance.termInsuranceCover < idealTermCover) {
    tips.push({
      id: 'term-insurance-underinsured',
      category: 'insurance',
      priority: 'high',
      title: 'Increase Term Life Sum Assured',
      summary: `Your current cover of ${formatCurrency(state.insurance.termInsuranceCover, curr)} is below the recommended 12x annual income (${formatCurrency(idealTermCover, curr)}).`,
      actionStep: 'Add an additional term plan or increase coverage rider to match your expanding family liabilities.',
      impactScore: '+5 Health Score Points',
    });
  }

  // 3. Health Insurance & Parents Protection
  if (!state.insurance.hasHealthInsurance) {
    tips.push({
      id: 'health-insurance-zero',
      category: 'insurance',
      priority: 'critical',
      title: 'Acquire Comprehensive Health Insurance Cover',
      summary: 'A single hospitalization can instantly evaporate years of stock and mutual fund compounding.',
      actionStep: `Secure an independent base health policy of ${formatCurrency(1000000, curr)} + a 50L super top-up policy. Do not depend solely on corporate employer cover.`,
      impactScore: '+7 Health Score Points',
    });
  }

  if (!state.insurance.parentsCovered) {
    tips.push({
      id: 'parents-health-gap',
      category: 'insurance',
      priority: 'high',
      title: 'Protect Parents with Senior Health Care or Dedicated Medical Pool',
      summary: 'Elderly medical procedures carry high inflation. Without dedicated protection, healthcare bills directly hit your monthly cash flow.',
      actionStep: 'Establish a separate senior citizen health policy or ring-fence a dedicated liquid medical emergency fund of 5-8 Lakh.',
      impactScore: '+5 Health Score Points',
    });
  }

  // 4. Debt Elimination Strategy
  const highInterestDebt = state.debts.creditCardDues + state.debts.personalLoans;
  if (highInterestDebt > 0) {
    tips.push({
      id: 'debt-avalanche',
      category: 'debt',
      priority: 'critical',
      title: 'Execute Debt Avalanche: Wipe Out High-Interest Loans',
      summary: `You have ${formatCurrency(highInterestDebt, curr)} in credit card or personal loans costing 16%–42% annual interest. This guarantees wealth destruction.`,
      actionStep: 'Pause non-essential subscriptions and utilize the Avalanche Method: pay minimums on everything else while aggressively funneling every surplus rupee to the highest APR loan.',
      impactScore: '+14 Health Score Points',
    });
  }

  // Home loan prepayment optimization
  if (state.housing.housingType === 'own_with_loan') {
    if (state.housing.isEmiComfortable === 'stressful' || metrics.debtToIncomeRatio > 40) {
      tips.push({
        id: 'home-loan-restructure',
        category: 'debt',
        priority: 'high',
        title: 'Lighten Home Loan EMI Stress',
        summary: `Your home loan EMI of ${formatCurrency(state.housing.homeLoanEmi, curr)} is straining your monthly cashflow (${metrics.debtToIncomeRatio.toFixed(0)}% DTI).`,
        actionStep: 'Consider extending the loan tenure temporarily to reduce the mandatory monthly EMI burden, or negotiate a lower interest rate with your lender via balance transfer.',
        impactScore: '+8 Health Score Points',
      });
    } else {
      tips.push({
        id: 'home-loan-smart-prepay',
        category: 'debt',
        priority: 'info',
        title: 'Smart Home Loan Prepayment Multiplier',
        summary: 'Making just 1 extra EMI payment per year or increasing your EMI by 5% annually can shave 5-7 years off a 20-year home loan, saving millions in compound interest.',
        actionStep: 'Direct annual bonus or tax refund towards loan principal reduction once your emergency fund is intact.',
        impactScore: '+6 Health Score Points',
      });
    }
  }

  // 5. Smart Expense Control
  if (metrics.wantsRatio > 35) {
    tips.push({
      id: 'expense-trim',
      category: 'expense',
      priority: 'high',
      title: 'Rebalance Lifestyle & Discretionary Outflows',
      summary: `Discretionary lifestyle spending is at ${metrics.wantsRatio.toFixed(0)}% of income (ideal benchmark is ≤ 30%). Small recurring leaks stall long-term compounding.`,
      actionStep: 'Audit app subscriptions, gym memberships, and frequent food deliveries. Implementing the 48-hour rule for non-essential purchases over $50/₹2000 saves an average of 15% monthly.',
      impactScore: '+6 Health Score Points',
    });
  }

  // 6. Systematic Wealth Compounding (SIP)
  if (state.investments.sipMonthlyAmount < metrics.totalMonthlyIncome * 0.15) {
    const recommendedSip = Math.round(metrics.totalMonthlyIncome * 0.2);
    tips.push({
      id: 'sip-boost',
      category: 'investing',
      priority: 'medium',
      title: 'Automate Step-Up SIP (Wealth Accelerator)',
      summary: `Your current monthly SIP of ${formatCurrency(state.investments.sipMonthlyAmount, curr)} is below the recommended 20% savings threshold (${formatCurrency(recommendedSip, curr)}).`,
      actionStep: 'Set up an automated ECS mandate on salary day. Enable a 10% annual Step-Up SIP into broad market index funds to outpace lifestyle inflation.',
      impactScore: '+12 Health Score Points',
    });
  } else {
    tips.push({
      id: 'sip-stepup-mastery',
      category: 'investing',
      priority: 'info',
      title: 'Power of 10% Annual Step-Up SIP',
      summary: `At ${formatCurrency(state.investments.sipMonthlyAmount, curr)}/month over ${state.investments.sipTenureYears} years, you are projected to amass ${formatCurrency(metrics.sipEstimatedFutureValue, curr)}!`,
      actionStep: 'Increasing this SIP by just 10% each year as your salary grows will nearly double your eventual terminal wealth corpus.',
      impactScore: '+5 Health Score Points',
    });
  }

  return tips;
}
