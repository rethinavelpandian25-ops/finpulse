export type HousingType = 'own_outright' | 'own_with_loan' | 'rented' | 'living_with_parents';

export type EmiComfortLevel = 'comfortable' | 'manageable' | 'stressful';

export type FinancialStatusType = 'very_safe' | 'medium' | 'non_safe';

export interface UserProfile {
  name: string;
  age: number;
  dependents: number;
  currency: string; // '$' | '₹' | '€' | '£'
}

export interface IncomeData {
  monthlySalary: number; // take-home
  passiveIncome: number; // rent, dividends, freelancing, side income
}

export interface ExpenseData {
  housing: number; // rent or home EMI
  groceriesFood: number;
  utilitiesBills: number;
  transportFuel: number;
  lifestyleEntertainment: number;
  healthcare: number;
  discretionaryOther: number;
}

export interface HousingDetails {
  housingType: HousingType;
  monthlyRent: number;
  homePropertyValue: number;
  homeLoanRemaining: number;
  homeLoanInterestRate: number; // e.g. 8.5%
  homeLoanEmi: number;
  isEmiComfortable: EmiComfortLevel;
}

export interface InvestmentData {
  emergencyFund: number;
  fixedDeposits: number;
  stocksLumpsum: number;
  sipMonthlyAmount: number;
  sipTenureYears: number;
  sipExpectedReturnPercent: number; // e.g. 12%
  goldValue: number;
  realEstateLandValue: number; // other land or properties
  otherAssetsValue: number;
}

export interface InsuranceData {
  hasTermInsurance: boolean;
  termInsuranceCover: number;
  parentsCovered: boolean;
  hasHealthInsurance: boolean;
  healthInsuranceCover: number;
  hasLifeEndowment: boolean;
}

export interface DebtData {
  personalLoans: number;
  carLoans: number;
  creditCardDues: number;
  educationLoans: number;
  otherDebts: number;
}

export interface FullFinancialState {
  profile: UserProfile;
  income: IncomeData;
  expenses: ExpenseData;
  housing: HousingDetails;
  investments: InvestmentData;
  insurance: InsuranceData;
  debts: DebtData;
}

export interface ScorePillar {
  name: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'danger';
  feedback: string;
}

export interface FinancialMetrics {
  totalMonthlyIncome: number;
  totalMonthlyExpenses: number;
  monthlyNetCashflow: number;
  emergencyRunwayMonths: number;
  debtToIncomeRatio: number; // EMIs / Income (%)
  savingsRate: number; // (Investments + SIP + Surplus) / Income (%)
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
  sipInvestedTotal: number;
  sipEstimatedFutureValue: number;
  sipWealthGain: number;
  needsRatio: number; // % of income
  wantsRatio: number; // % of income
  savingsRatio: number; // % of income
  overallScore: number; // 0 to 100
  status: FinancialStatusType;
  statusLabel: string;
  statusColor: string; // Tailwind color token
  statusDescription: string;
  pillars: {
    emergency: ScorePillar;
    debt: ScorePillar;
    savings: ScorePillar;
    insurance: ScorePillar;
    wealth: ScorePillar;
  };
}

export interface SuggestionTip {
  id: string;
  category: 'safety' | 'insurance' | 'debt' | 'expense' | 'investing';
  priority: 'critical' | 'high' | 'medium' | 'info';
  title: string;
  summary: string;
  actionStep: string;
  impactScore: string;
}

export interface AiDetailedAnalysis {
  safetyVerdict: string;
  strengths: string[];
  vulnerabilities: string[];
  actionPlan90Days: Array<{
    step: number;
    timeframe: string;
    action: string;
  }>;
  debtFreedomStrategy: string;
  insuranceAdvice: string;
  wealthCompoundingTip: string;
}
