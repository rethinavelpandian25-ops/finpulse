import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// AI Financial Advice Endpoint
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { profile, income, expenses, assets, liabilities, metrics } = req.body;

    if (!profile || !income || !expenses) {
      return res.status(400).json({ error: 'Missing required financial data' });
    }

    if (!ai) {
      return res.status(200).json({
        fallback: true,
        summary: "AI deep analysis operates alongside rule-based ML recommendations. When GEMINI_API_KEY is active in environment secrets, live AI personalized critique is dynamically generated.",
        recommendations: [
          {
            category: "Emergency Reserve",
            priority: metrics?.emergencyRunwayMonths < 6 ? "High" : "Low",
            title: "Build 6-12 Months Liquidity Fortress",
            advice: `Your current emergency buffer is ${metrics?.emergencyRunwayMonths?.toFixed(1) || 0} months. Maintain at least 6 months of expenses in a liquid high-yield savings or sweep-in FD account before speculative investing.`
          },
          {
            category: "Risk Protection",
            priority: !profile?.hasTermInsurance ? "Critical" : "Medium",
            title: "Term Life & Comprehensive Health Cover",
            advice: "Protect dependents with pure term life insurance equal to 10-15x of annual income. Ensure separate health cover for self and senior parents to prevent medical bills from wiping out investments."
          },
          {
            category: "Debt Management",
            priority: metrics?.debtToIncomeRatio > 35 ? "High" : "Low",
            title: "Accelerate High-Cost Debt Elimination",
            advice: "Keep total EMIs below 30% of take-home pay. For home loans, prepaying even 1 extra EMI per year can reduce 20-year interest outgo by up to 25%."
          },
          {
            category: "Wealth Compounding",
            priority: "Medium",
            title: "Systematic SIP Disciplined Growth",
            advice: "Automate equity index SIPs on salary day. Increase your SIP contribution by 10% annually (Step-Up SIP) to beat inflation and achieve financial independence early."
          }
        ]
      });
    }

    const prompt = `
You are a senior Certified Financial Planner (CFP) analyzing an individual's personal balance sheet.
Provide an empathetic, mathematically sound, practical financial health evaluation and strategic roadmap.

Financial Profile:
- Name: ${profile.name || 'User'}
- Age: ${profile.age} years
- Monthly Take-Home Salary: ${income.monthlySalary}
- Monthly Passive Income: ${income.passiveIncome || 0}
- Total Monthly Income: ${income.totalMonthlyIncome}
- Total Monthly Expenses: ${expenses.totalMonthlyExpenses}
- Monthly Housing/Rent/Home Loan EMI: ${expenses.housing}
- Emergency Cash Fund: ${assets.emergencyFund} (Runway: ${metrics?.emergencyRunwayMonths?.toFixed(1) || 0} months)
- Housing Situation: ${profile.housingType} (Home Price: ${assets.homePropertyValue || 0}, Home Loan Remaining: ${liabilities.homeLoan || 0}, Home Loan Interest Rate: ${liabilities.homeLoanInterestRate || 0}%, EMI Comfortable: ${profile.isEmiComfortable})
- Investments: Fixed Deposits: ${assets.fixedDeposits}, Stocks/Mutual Funds: ${assets.stocksLumpsum}, Monthly SIP: ${assets.sipMonthlyAmount} (Tenure: ${assets.sipTenureYears} yrs @ ${assets.sipExpectedReturnPercent}% expected return)
- Other Assets: Gold: ${assets.gold}, Real Estate/Land: ${assets.realEstateLand}, Other: ${assets.otherAssets}
- Liabilities: Credit Card/Personal/Car/Other: ${liabilities.otherDebts} (Total Liabilities: ${liabilities.totalLiabilities})
- Calculated Net Worth: ${metrics?.netWorth}
- Insurance: Has Term Insurance: ${profile.hasTermInsurance ? `Yes (${profile.termInsuranceCover})` : 'No'}, Parents Covered: ${profile.parentsCovered ? 'Yes' : 'No'}, Has Health Insurance: ${profile.hasHealthInsurance ? 'Yes' : 'No'}
- Financial Safety Health Score: ${metrics?.score}/100 (${metrics?.status})
- Savings Rate: ${metrics?.savingsRate?.toFixed(1)}%
- Debt-to-Income / EMI Ratio: ${metrics?.debtToIncomeRatio?.toFixed(1)}%

Please respond with a concise, high-impact JSON structure:
{
  "safetyVerdict": "A 2-3 sentence punchy executive diagnosis of their financial health, risk level, and primary bottleneck.",
  "strengths": ["Top strength 1", "Top strength 2"],
  "vulnerabilities": ["Critical blindspot 1", "Critical blindspot 2"],
  "actionPlan90Days": [
    {
      "step": 1,
      "timeframe": "Month 1",
      "action": "Clear, specific immediate tactical action"
    },
    {
      "step": 2,
      "timeframe": "Month 2",
      "action": "Intermediate restructuring step"
    },
    {
      "step": 3,
      "timeframe": "Month 3",
      "action": "Optimization and compounding step"
    }
  ],
  "debtFreedomStrategy": "Specific recommendation on managing home loan / debt (e.g. avalanche/snowball, prepayment multiplier)",
  "insuranceAdvice": "Direct advice regarding term plan cover size, health policy, and parent protection",
  "wealthCompoundingTip": "Insight on SIP step-up and asset allocation between equity, debt, and tangible assets"
}
`;

    // Call Gemini with LOW thinking for rapid 1-2s response time
    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.LOW,
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI analysis timed out')), 25000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);
    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    return res.status(200).json(parsed);
  } catch (error: any) {
    console.warn('Gemini Analysis note (applying instant CFP strategy fallback):', error?.message || error);
    // Provide intelligent fallback roadmap based on request body
    const { profile, metrics, assets, liabilities } = req.body || {};
    const name = profile?.name || 'User';
    const runway = metrics?.emergencyRunwayMonths || 0;
    const score = metrics?.score || 50;

    return res.status(200).json({
      fallback: true,
      safetyVerdict: `${name} is currently in a ${metrics?.status || 'Moderate'} financial position (${score}/100). The most immediate opportunity is reinforcing liquid cash buffers (${runway.toFixed(1)} months current) and eliminating any non-mortgage liabilities.`,
      strengths: [
        metrics?.savingsRate >= 20 ? "Solid monthly savings rate above 20%" : "Active income generation",
        metrics?.debtToIncomeRatio <= 35 ? "Controlled debt-to-income servicing ratio" : "Awareness of current financial obligations",
        assets?.sipMonthlyAmount > 0 ? "Commitment to disciplined SIP compounding" : "Positive capital foundation"
      ],
      vulnerabilities: [
        runway < 6 ? `Emergency runway (${runway.toFixed(1)} months) is below the recommended 6-month safety threshold.` : "Asset diversification between liquid and physical assets",
        !profile?.hasTermInsurance ? "Dependents exposed without pure term life insurance coverage." : "Ensure term coverage is at least 10x-12x annual income.",
        liabilities?.totalLiabilities > 0 ? "High monthly debt payments consume cash that could compound in equity." : "Inflation risk on cash holdings"
      ],
      actionPlan90Days: [
        {
          step: 1,
          timeframe: "Month 1 (Immediate)",
          action: runway < 6 
            ? "Automate transfer of 15% salary into high-yield sweep FD until 6 months of living expenses are locked in." 
            : "Review existing subscriptions and cancel unused lifestyle memberships to free up monthly cash."
        },
        {
          step: 2,
          timeframe: "Month 2 (Protection)",
          action: !profile?.hasTermInsurance
            ? "Secure a pure term life insurance cover equal to 12x annual salary and separate health cover for parents."
            : "Allocate tax-saving instruments and rebalance equity index mutual funds."
        },
        {
          step: 3,
          timeframe: "Month 3 (Compounding)",
          action: "Enable an annual 10% Step-Up mandate on your SIP to outpace inflation and compound your net worth."
        }
      ],
      debtFreedomStrategy: "Execute the Debt Avalanche method: Pay minimums on all loans while directing every spare dollar to the highest APR loan (credit cards/personal loans first, then extra principal on home loan).",
      insuranceAdvice: "Prioritize pure term insurance (avoid endowment/ULIP policies) with a sum assured of 10-15x annual income. Ensure senior parents have standalone health insurance or a reserved medical fund.",
      wealthCompoundingTip: "Invest consistently through automated salary-day SIPs in low-cost index funds. Prepaying just 1 extra home loan EMI per year can shave 5+ years off a 20-year mortgage."
    });
  }
});

// Dev or Production Static Handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Financial Health App running at http://0.0.0.0:${port}`);
  });
}

startServer();
