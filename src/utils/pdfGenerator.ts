import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FullFinancialState, FinancialMetrics, SuggestionTip } from '../types/finance';
import { formatCurrency, formatFullCurrency } from './financeCalculators';

export async function downloadVectorPdfReport(
  state: FullFinancialState,
  metrics: FinancialMetrics,
  tips: SuggestionTip[]
): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const curr = state.profile.currency;
  const name = state.profile.name || 'Anonymous Client';
  const age = state.profile.age || 30;
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 14;
  const contentWidth = pageWidth - margin * 2;

  // --- PAGE 1: EXECUTIVE AUDIT & SCORE ---
  // Top Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 28, 'F');

  // Brand title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('FINPULSE FINANCIAL HEALTH INSTITUTE', margin, 12);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(148, 163, 184); // slate-400
  doc.text('Certified Algorithmic Balance Sheet & Risk Diagnosis', margin, 18);

  // Date and Client info on top right
  doc.setFontSize(8.5);
  doc.setTextColor(226, 232, 240);
  doc.text(`Date: ${today}`, pageWidth - margin, 12, { align: 'right' });
  doc.text(`Client: ${name} (${age} yrs)`, pageWidth - margin, 18, { align: 'right' });

  let y = 36;

  // Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(18);
  doc.text('Executive Financial Health Audit', margin, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text(
    'A comprehensive quantitative evaluation of emergency liquidity, debt capacity, insurance protection, and compounding rate.',
    margin,
    y
  );
  y += 8;

  // Status Box
  const isSafe = metrics.status === 'very_safe';
  const isMedium = metrics.status === 'medium';

  // Choose colors
  if (isSafe) {
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setDrawColor(16, 185, 129); // emerald-500
  } else if (isMedium) {
    doc.setFillColor(254, 243, 199); // amber-50
    doc.setDrawColor(245, 158, 11); // amber-500
  } else {
    doc.setFillColor(255, 241, 242); // rose-50
    doc.setDrawColor(239, 68, 68); // rose-500
  }

  doc.setLineWidth(0.6);
  doc.roundedRect(margin, y, contentWidth, 24, 2, 2, 'FD');

  // Inside status box
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  if (isSafe) doc.setTextColor(4, 120, 87);
  else if (isMedium) doc.setTextColor(180, 83, 9);
  else doc.setTextColor(185, 28, 28);

  doc.text(`FINANCIAL SAFETY STATUS: ${metrics.statusLabel.toUpperCase()}`, margin + 5, y + 8);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(51, 65, 85);
  const descLines = doc.splitTextToSize(metrics.statusDescription, contentWidth - 45);
  doc.text(descLines, margin + 5, y + 15);

  // Score badge on right side
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  if (isSafe) doc.setTextColor(16, 185, 129);
  else if (isMedium) doc.setTextColor(217, 119, 6);
  else doc.setTextColor(220, 38, 38);
  doc.text(`${metrics.overallScore}`, pageWidth - margin - 8, y + 13, { align: 'right' });

  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('SCORE / 100', pageWidth - margin - 8, y + 19, { align: 'right' });

  y += 30;

  // 4 Key Ratios Row
  const boxWidth = (contentWidth - 6) / 4;
  const ratioBoxes = [
    { label: 'EMERGENCY RUNWAY', val: `${metrics.emergencyRunwayMonths.toFixed(1)} mo`, sub: 'Target: >= 6 mo' },
    { label: 'DEBT-TO-INCOME (DTI)', val: `${metrics.debtToIncomeRatio.toFixed(1)}%`, sub: 'Target: <= 30%' },
    { label: 'SAVINGS & SIP RATE', val: `${metrics.savingsRate.toFixed(1)}%`, sub: 'Target: >= 20%' },
    { label: 'NET WORTH', val: formatCurrency(metrics.netWorth, curr), sub: 'Assets - Debts' },
  ];

  ratioBoxes.forEach((b, i) => {
    const bx = margin + i * (boxWidth + 2);
    doc.setFillColor(248, 250, 252); // slate-50
    doc.setDrawColor(226, 232, 240); // slate-200
    doc.setLineWidth(0.3);
    doc.roundedRect(bx, y, boxWidth, 18, 1.5, 1.5, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(100, 116, 139);
    doc.text(b.label, bx + 3, y + 5);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(b.val, bx + 3, y + 11);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(148, 163, 184);
    doc.text(b.sub, bx + 3, y + 15);
  });

  y += 24;

  // Section: Monthly Inflows vs Monthly Outflows Table
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Monthly Cashflow Statement', margin, y);
  y += 5;

  const colWidth = (contentWidth - 4) / 2;

  // Left column: Inflows
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, 48, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text('Monthly Inflows', margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text('Primary Take-Home Salary:', margin + 4, y + 14);
  doc.text(formatFullCurrency(state.income.monthlySalary, curr), margin + colWidth - 4, y + 14, { align: 'right' });

  doc.text('Passive Income (Rent, Dividends):', margin + 4, y + 22);
  doc.text(formatFullCurrency(state.income.passiveIncome, curr), margin + colWidth - 4, y + 22, { align: 'right' });

  doc.setDrawColor(226, 232, 240);
  doc.line(margin + 4, y + 32, margin + colWidth - 4, y + 32);

  doc.setFont('helvetica', 'bold');
  doc.text('Total Monthly Income:', margin + 4, y + 40);
  doc.setTextColor(4, 120, 87);
  doc.text(formatFullCurrency(metrics.totalMonthlyIncome, curr), margin + colWidth - 4, y + 40, { align: 'right' });

  // Right column: Outflows
  const rx = margin + colWidth + 4;
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rx, y, colWidth, 48, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(185, 28, 28);
  doc.text('Monthly Outflows (By Category)', rx + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  doc.text('Housing (Rent / Home EMI):', rx + 4, y + 13);
  doc.text(formatFullCurrency(state.expenses.housing, curr), rx + colWidth - 4, y + 13, { align: 'right' });

  doc.text('Groceries & Food Supplies:', rx + 4, y + 19);
  doc.text(formatFullCurrency(state.expenses.groceriesFood, curr), rx + colWidth - 4, y + 19, { align: 'right' });

  doc.text('Utilities, Bills & Transport:', rx + 4, y + 25);
  doc.text(
    formatFullCurrency(state.expenses.utilitiesBills + state.expenses.transportFuel, curr),
    rx + colWidth - 4,
    y + 25,
    { align: 'right' }
  );

  doc.text('Lifestyle, Dining & Health:', rx + 4, y + 31);
  doc.text(
    formatFullCurrency(state.expenses.lifestyleEntertainment + state.expenses.healthcare + state.expenses.discretionaryOther, curr),
    rx + colWidth - 4,
    y + 31,
    { align: 'right' }
  );

  doc.setDrawColor(226, 232, 240);
  doc.line(rx + 4, y + 36, rx + colWidth - 4, y + 36);

  doc.setFont('helvetica', 'bold');
  doc.text('Total Monthly Outflows:', rx + 4, y + 42);
  doc.setTextColor(185, 28, 28);
  doc.text(formatFullCurrency(metrics.totalMonthlyExpenses, curr), rx + colWidth - 4, y + 42, { align: 'right' });

  y += 54;

  // Housing & Home Loan Affordability Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Housing Status & Mortgage Affordability', margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const hTypeLabel =
    state.housing.housingType === 'rented'
      ? `Rented (Monthly Rent: ${formatFullCurrency(state.housing.monthlyRent, curr)})`
      : state.housing.housingType === 'own_with_loan'
      ? `Own Home with Active Loan (Property: ${formatCurrency(state.housing.homePropertyValue, curr)})`
      : state.housing.housingType === 'own_outright'
      ? `Own Home (Debt-free, Value: ${formatCurrency(state.housing.homePropertyValue, curr)})`
      : 'Living with Family / Parents';

  doc.text(`Housing Category: ${hTypeLabel}`, margin + 4, y + 7);

  if (state.housing.housingType === 'own_with_loan') {
    doc.text(
      `Loan Balance: ${formatCurrency(state.housing.homeLoanRemaining, curr)} @ ${state.housing.homeLoanInterestRate}% APR  |  Monthly EMI: ${formatFullCurrency(state.housing.homeLoanEmi, curr)}  |  Comfort Level: ${state.housing.isEmiComfortable.toUpperCase()}`,
      margin + 4,
      y + 14
    );
    const emiBurden =
      metrics.totalMonthlyIncome > 0
        ? ((state.housing.homeLoanEmi / metrics.totalMonthlyIncome) * 100).toFixed(1)
        : '0';
    doc.text(
      `Mortgage represents ${emiBurden}% of total take-home pay. ${
        parseFloat(emiBurden) > 35 ? 'Warning: High mortgage burden.' : 'Healthy and within standard debt thresholds.'
      }`,
      margin + 4,
      y + 20
    );
  } else {
    doc.text('Zero outstanding mortgage debt obligations.', margin + 4, y + 14);
  }

  y += 30;

  // Emergency Fund Milestone Track Block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Liquid Emergency Cash Buffer Audit', margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Liquid Emergency Reserve: ${formatFullCurrency(state.investments.emergencyFund, curr)}  (Runway: ${metrics.emergencyRunwayMonths.toFixed(1)} Months of basic living costs)`,
    margin + 4,
    y + 7
  );

  const emergencyRecommendation =
    metrics.emergencyRunwayMonths >= 6
      ? 'Status: Certified Safe (Insulated against job transition or temporary health disruption).'
      : `Status: Critical Deficit. Target 6-Month Emergency Buffer is ${formatCurrency(metrics.totalMonthlyExpenses * 6, curr)} (Current Shortfall: ${formatCurrency(Math.max(0, metrics.totalMonthlyExpenses * 6 - state.investments.emergencyFund), curr)}).`;

  doc.text(emergencyRecommendation, margin + 4, y + 14);

  // Footer for Page 1
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('FinPulse Financial Health Institute  ·  Page 1 of 2', margin, pageHeight - 8);
  doc.text('Confidential Personal Financial Document', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // --- PAGE 2: ASSETS, LIABILITIES, SIP & ACTION PLAN ---
  doc.addPage();

  // Top header mini
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 16, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.text('FINPULSE EXECUTIVE AUDIT REPORT', margin, 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(`Client: ${name}  ·  Asset Allocation & Action Roadmap`, pageWidth - margin, 10, { align: 'right' });

  y = 24;

  // Assets vs Liabilities Ledger
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Balance Sheet: Assets vs Liabilities Inventory', margin, y);
  y += 5;

  // Left: Assets
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, colWidth, 50, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(4, 120, 87);
  doc.text(`Total Assets: ${formatCurrency(metrics.totalAssets, curr)}`, margin + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text('Cash / Emergency Fund:', margin + 4, y + 13);
  doc.text(formatCurrency(state.investments.emergencyFund, curr), margin + colWidth - 4, y + 13, { align: 'right' });

  doc.text('Fixed Deposits / Bonds:', margin + 4, y + 19);
  doc.text(formatCurrency(state.investments.fixedDeposits, curr), margin + colWidth - 4, y + 19, { align: 'right' });

  doc.text('Stocks & Mutual Funds:', margin + 4, y + 25);
  doc.text(formatCurrency(state.investments.stocksLumpsum, curr), margin + colWidth - 4, y + 25, { align: 'right' });

  doc.text('Gold & Precious Metals:', margin + 4, y + 31);
  doc.text(formatCurrency(state.investments.goldValue, curr), margin + colWidth - 4, y + 31, { align: 'right' });

  const realEstateVal =
    state.investments.realEstateLandValue +
    (state.housing.housingType === 'own_with_loan' || state.housing.housingType === 'own_outright'
      ? state.housing.homePropertyValue
      : 0);
  doc.text('Real Estate / Land:', margin + 4, y + 37);
  doc.text(formatCurrency(realEstateVal, curr), margin + colWidth - 4, y + 37, { align: 'right' });

  doc.text('Other Tangible Assets:', margin + 4, y + 43);
  doc.text(formatCurrency(state.investments.otherAssetsValue, curr), margin + colWidth - 4, y + 43, { align: 'right' });

  // Right: Liabilities
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(rx, y, colWidth, 50, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(185, 28, 28);
  doc.text(`Total Liabilities: ${formatCurrency(metrics.totalLiabilities, curr)}`, rx + 4, y + 6);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  const homeMortgageVal = state.housing.housingType === 'own_with_loan' ? state.housing.homeLoanRemaining : 0;
  doc.text('Home Loan Outstanding:', rx + 4, y + 13);
  doc.text(formatCurrency(homeMortgageVal, curr), rx + colWidth - 4, y + 13, { align: 'right' });

  doc.text('Personal Loans:', rx + 4, y + 19);
  doc.text(formatCurrency(state.debts.personalLoans, curr), rx + colWidth - 4, y + 19, { align: 'right' });

  doc.text('Car / Vehicle Loan:', rx + 4, y + 25);
  doc.text(formatCurrency(state.debts.carLoans, curr), rx + colWidth - 4, y + 25, { align: 'right' });

  doc.text('Credit Card Balances:', rx + 4, y + 31);
  doc.text(formatCurrency(state.debts.creditCardDues, curr), rx + colWidth - 4, y + 31, { align: 'right' });

  doc.text('Education / Student Loans:', rx + 4, y + 37);
  doc.text(formatCurrency(state.debts.educationLoans, curr), rx + colWidth - 4, y + 37, { align: 'right' });

  doc.text('Other Debts:', rx + 4, y + 43);
  doc.text(formatCurrency(state.debts.otherDebts, curr), rx + colWidth - 4, y + 43, { align: 'right' });

  y += 56;

  // SIP Compounding Horizon
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Systematic Investment Plan (SIP) Compounding Projection', margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 24, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    `Monthly SIP Commitment: ${formatFullCurrency(state.investments.sipMonthlyAmount, curr)}  ·  Horizon: ${state.investments.sipTenureYears} Years  ·  Expected Return: ${state.investments.sipExpectedReturnPercent}% p.a.`,
    margin + 4,
    y + 7
  );

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.text(
    `Principal Invested: ${formatCurrency(metrics.sipInvestedTotal, curr)}   |   Wealth Created: +${formatCurrency(metrics.sipWealthGain, curr)}   |   Projected Terminal Value: ${formatCurrency(metrics.sipEstimatedFutureValue, curr)}`,
    margin + 4,
    y + 15
  );

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text('Tip: Applying a 10% annual Step-Up SIP multiplies your eventual terminal wealth nearly twofold.', margin + 4, y + 21);

  y += 30;

  // Family Risk Shield
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Family Risk & Insurance Shield', margin, y);
  y += 5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, y, contentWidth, 22, 1.5, 1.5, 'FD');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(51, 65, 85);

  const termText = state.insurance.hasTermInsurance
    ? `Term Insurance: Active (${formatCurrency(state.insurance.termInsuranceCover, curr)} Sum Assured)`
    : 'Term Insurance: NOT COVERED (Severe Vulnerability - Dependents exposed)';
  const healthText = state.insurance.hasHealthInsurance
    ? `Health Insurance: Active (${formatCurrency(state.insurance.healthInsuranceCover, curr)} Sum Insured)`
    : 'Health Insurance: NOT COVERED (Hospitalizations threaten savings)';
  const parentsText = state.insurance.parentsCovered ? 'Parents Covered: Yes' : 'Parents Covered: NO (Risk of medical outgo)';

  doc.text(`1. ${termText}`, margin + 4, y + 7);
  doc.text(`2. ${healthText}`, margin + 4, y + 13);
  doc.text(`3. ${parentsText}`, margin + 4, y + 19);

  y += 28;

  // Prioritized Action Roadmap Checklist
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(15, 23, 42);
  doc.text('Prioritized Action Steps for Financial Optimization', margin, y);
  y += 5;

  const topTips = tips.slice(0, 4);
  topTips.forEach((tip, idx) => {
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(226, 232, 240);
    doc.roundedRect(margin, y, contentWidth, 14, 1.2, 1.2, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${idx + 1}. ${tip.title} (${tip.priority.toUpperCase()} PRIORITY)`, margin + 4, y + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(71, 85, 105);
    const stepText = doc.splitTextToSize(tip.actionStep, contentWidth - 8);
    doc.text(stepText, margin + 4, y + 10);

    y += 16;
  });

  // Footer for Page 2
  doc.setFontSize(7.5);
  doc.setTextColor(148, 163, 184);
  doc.text('FinPulse Financial Health Institute  ·  Page 2 of 2', margin, pageHeight - 8);
  doc.text('Generated via Certified Algorithmic Engine', pageWidth - margin, pageHeight - 8, { align: 'right' });

  // Save / Trigger browser download
  const cleanName = name.replace(/[^a-zA-Z0-9]/g, '_');
  doc.save(`FinPulse_Financial_Report_${cleanName}.pdf`);
}

/**
 * Alternative Snapshot Download: Captures the actual DOM node as high-res canvas
 * and saves into PDF.
 */
export async function downloadElementAsPdf(elementId: string, filename: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error('Report element not found in DOM');
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jsPDF('p', 'mm', 'a4');
  const imgWidth = 210;
  const pageHeight = 295;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
  heightLeft -= pageHeight;

  while (heightLeft >= 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
  }

  pdf.save(filename);
}
