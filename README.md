# FinPulse - Smart Financial Health Analyzer

A comprehensive, production-grade financial health checking and advisory web application built with React, TypeScript, Tailwind CSS, Express, and Google Gemini AI.

---

## How to Deploy on Render for Free (Step-by-Step)

The repository already includes `render.yaml` pre-configured for Render's free tier. You can deploy it in under 3 minutes using either of these two methods:

### Method 1: Automatic Blueprint Deployment (Recommended)

1. **Push your code to GitHub or GitLab**:
   - Create a new repository on GitHub (e.g. `finpulse`).
   - Push this codebase to your repository:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin https://github.com/<your-username>/finpulse.git
     git push -u origin main
     ```

2. **Connect to Render**:
   - Go to [render.com](https://render.com) and sign in (or create a free account).
   - Click **New +** in the top right and select **Blueprint**.
   - Connect your GitHub account and select your `finpulse` repository.
   - Render will automatically read `render.yaml`.

3. **Configure Environment Variables (Optional)**:
   - In the Render dashboard under **Environment**, you can add your `GEMINI_API_KEY`:
     - **Key**: `GEMINI_API_KEY`
     - **Value**: Your Google AI Studio API key
     *(Note: If you do not add a key, the app still works completely with built-in CFP rule-based heuristic calculations!)*

4. **Click "Apply"**:
   - Render will build and deploy your app. Once finished, your live URL will be active (e.g., `https://finpulse-financial-health.onrender.com`).

---

### Method 2: Manual Web Service Deployment

If you prefer to configure manually without Blueprint:

1. On the Render Dashboard, click **New +** -> **Web Service**.
2. Connect your Git repository.
3. Configure the following settings:
   - **Name**: `finpulse`
   - **Environment / Runtime**: `Node`
   - **Branch**: `main`
   - **Region**: Select any region closest to you (e.g., Oregon, Frankfurt, Singapore)
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Plan Type**: `Free`
4. In **Environment Variables**, add:
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
   - `GEMINI_API_KEY` = *(your Gemini API key)*
5. Click **Deploy Web Service**.

---

## Local Development

```bash
# Install dependencies
npm install

# Run the development server (runs on port 3000)
npm run dev

# Build for production
npm run build

# Start production server
npm start
```
