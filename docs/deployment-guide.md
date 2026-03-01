# 🚀 Deployment Guide

> **Complete guide to building and deploying mobile and web applications**

## 🎯 Overview

This guide covers:

- **Mobile App**: EAS Build setup, development builds, preview builds, production builds, app store submission
- **Web App**: Vercel deployment configuration and deployment process

---

## 📱 Mobile App Deployment

### **Prerequisites**

1. **Expo Account**: Sign up at [expo.dev](https://expo.dev)
2. **EAS CLI**: Install globally

```bash
npm install -g eas-cli
```

3. **Login to EAS**:

```bash
eas login
```

### **Step 1: Connect Project to Expo**

**First time setup:**

```bash
cd apps/mobile-app

# Initialize EAS in your project
eas build:configure

# This will:
# - Create eas.json if it doesn't exist
# - Link your project to an Expo project
# - Set up build profiles
```

**If project is already linked:**

```bash
# Check current project
eas project:info

# Link to existing project
eas project:init
```

**Reference**: [Expo EAS Build Documentation](https://docs.expo.dev/build/introduction/)

---

### **Step 2: Configure app.config.ts**

Update `app.config.ts` with your project details:

```typescript
// apps/mobile-app/app.config.ts
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Your App Name",
  slug: "your-app-slug",
  version: "1.0.0",
  ios: {
    bundleIdentifier: "com.yourcompany.yourapp",
  },
  android: {
    package: "com.yourcompany.yourapp",
  },
  extra: {
    eas: {
      projectId: "your-project-id", // From eas project:info
    },
  },
});
```

---

### **Step 3: Development Builds**

**When to use**: When you need custom native modules or want to test with a development client.

**Build for Android:**

```bash
yarn build:dev:android
```

**Build for iOS:**

```bash
yarn build:dev:ios
```

**Build for iOS Simulator:**

```bash
yarn build:dev:ios-simulator
```

**After build completes:**

1. Download the build from the EAS Dashboard or terminal link
2. Install on device/simulator
3. Run `yarn dev:build` to start development server
4. Open the development build app and connect to dev server

**Reference**: [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)

---

### **Step 4: Preview Builds**

**When to use**: For testing on real devices before production, sharing with testers.

**Build for both platforms:**

```bash
yarn build:preview
```

**Build for specific platform:**

```bash
yarn build:preview:android
yarn build:preview:ios
```

**After build completes:**

- Download from EAS Dashboard
- Install on device
- Test the app

**Reference**: [EAS Build Preview Builds](https://docs.expo.dev/build/building-on-ci/)

---

### **Step 5: Production Builds**

**When to use**: For app store submission.

**Build for both platforms:**

```bash
yarn build:production
```

**Build for specific platform:**

```bash
yarn build:production:android
yarn build:production:ios
```

**Important Notes:**

- Production builds require proper credentials (keystore for Android, certificates for iOS)
- First time: EAS will guide you through credential setup
- Subsequent builds: EAS manages credentials automatically

**Reference**: [EAS Build Production Builds](https://docs.expo.dev/build/building-on-ci/)

---

### **Step 6: App Store Submission**

**Android (Google Play Store):**

```bash
# Build and submit in one command
eas build --platform android --profile production --auto-submit

# Or submit existing build
yarn submit:android
```

**iOS (App Store):**

```bash
# Build and submit in one command
eas build --platform ios --profile production --auto-submit

# Or submit existing build
yarn submit:ios
```

**Prerequisites for Submission:**

- **Android**: Google Play Console account, app listing created
- **iOS**: Apple Developer account, App Store Connect app created

**Reference**:

- [EAS Submit Android](https://docs.expo.dev/submit/android/)
- [EAS Submit iOS](https://docs.expo.dev/submit/ios/)

---

## 🌐 Web App Deployment

### **Prerequisites**

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Vercel CLI** installed globally and authenticated

```bash
npm install -g vercel
vercel login
```

`vercel login` opens your browser — authenticate with your GitHub account.

---

### **Step 1: Add vercel.json to the monorepo root**

Before running any Vercel commands, create `vercel.json` at the repo root (not inside `apps/web-app`). This tells Vercel to use Yarn, run Turborepo, and find the Next.js output in the right place.

```json
{
  "buildCommand": "yarn turbo run build --filter=@your-app-package-name",
  "outputDirectory": "apps/your-app-folder/.next",
  "installCommand": "yarn install",
  "framework": "nextjs"
}
```

Replace `@your-app-package-name` with the `name` field from your app's `package.json`, and `your-app-folder` with the folder name under `apps/`.

---

### **Step 2: Run the Vercel CLI from the monorepo root**

Always run `vercel` from the repo root, not from inside `apps/web-app`. Vercel needs access to the root `package.json` to resolve Yarn workspaces correctly.

```bash
cd /path/to/your-monorepo-root
vercel
```

The CLI will ask a series of questions. Answer them as follows:

- **Set up and deploy?** → `Y`
- **Which scope?** → select your personal Vercel account
- **Link to existing project?** → `N` (first time), `Y` (if re-linking)
- **What's your project's name?** → type a name or press Enter to accept the default
- **In which directory is your code located?** → `./`
- **Want to modify these settings?** → `N`

Vercel will then run a preview deployment. Check the output URL to confirm the build succeeded.

---

### **Step 4: Add environment variables**

Add each required env var via the CLI. You will be prompted to paste the value and select which environments to apply it to — choose all three (Production, Preview, Development).

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

Add any other server-side secrets your app requires (e.g. `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `STRIPE_SECRET_KEY`).

**Important:** Any env var used in an API route must also be declared in `turbo.json` under the `build` task's `env` array, otherwise Turborepo will strip it during the build. See the troubleshooting section for details.

---

### **Step 5: Deploy to production**

```bash
vercel --prod
```

This runs the full production build and deploys to your production URL.

---

### **Step 6: Enable Analytics and Speed Insights (optional but recommended)**

Vercel provides two free monitoring tools you should enable on every web app:

- **Web Analytics** — tracks page views and visitor counts
- **Speed Insights** — tracks Core Web Vitals (load time, responsiveness, layout shift)

**Enable in the Vercel dashboard:**

1. Go to your project on [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click the **Analytics** tab → click **Enable**
3. Click the **Speed Insights** tab → click **Enable**

**Install the packages (from `apps/web-app`):**

```bash
yarn add @vercel/analytics @vercel/speed-insights
```

**Add to `app/layout.tsx`:**

```tsx
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Inside the <body> tag, before the closing </body>:
<Analytics />
<SpeedInsights />
```

Deploy again for the changes to take effect. Data will appear in the Vercel dashboard after real users visit the site.

---

### **Subsequent deploys**

Every push to `main` on GitHub triggers an automatic production deployment. Pull requests get their own preview URL automatically.

For manual production deploys from the CLI:

```bash
vercel --prod
```

---

### **Via Vercel Dashboard (alternative)**

If you prefer the dashboard over the CLI:

1. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository
2. Set these fields before deploying:
   - **Root Directory**: `apps/web-app` (or your app folder)
   - **Framework Preset**: Next.js
   - **Build Command**: `yarn turbo run build --filter=@your-app-package-name`
   - **Output Directory**: `.next`
   - **Install Command**: `yarn install`
3. Add environment variables under the Environment Variables section before clicking Deploy

**Reference**: [Vercel Monorepo Guide](https://vercel.com/docs/monorepos)

---

## 🔧 Configuration Files

### **eas.json** (Mobile)

Located at `apps/mobile-app/eas.json`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {
      "autoIncrement": true
    }
  }
}
```

### **vercel.json** (Web)

Required at the monorepo root. Update `--filter` and `outputDirectory` to match your app's package name:

```json
{
  "buildCommand": "yarn turbo run build --filter=@template/web-app",
  "outputDirectory": "apps/web-app/.next",
  "installCommand": "yarn install",
  "framework": "nextjs"
}
```

---

## 📋 Build Scripts Reference

### **Mobile App Scripts**

```bash
# Development (Expo Go)
yarn dev              # Start with Expo Go
yarn dev:go          # Same as above

# Development (Dev Client)
yarn dev:build       # Start with development build

# Development Builds
yarn build:dev:android
yarn build:dev:ios
yarn build:dev:ios-simulator

# Preview Builds
yarn build:preview
yarn build:preview:android
yarn build:preview:ios

# Production Builds
yarn build:production
yarn build:production:android
yarn build:production:ios

# App Store Submission
yarn submit:android
yarn submit:ios
```

### **Web App Scripts**

```bash
# Development
yarn dev              # Start Next.js dev server

# Build
yarn build            # Production build

# Deploy
vercel                # Deploy to Vercel
vercel --prod         # Deploy to production
```

---

## 🔑 Credentials Management

### **Mobile App Credentials**

**First Time Setup:**

EAS will prompt you to set up credentials:

```bash
eas credentials
```

**Android:**

- Keystore (auto-generated by EAS)
- Google Play Service Account (for submission)

**iOS:**

- Distribution Certificate
- Provisioning Profile
- App Store Connect API Key (for submission)

**Reference**: [EAS Credentials](https://docs.expo.dev/app-signing/managed-credentials/)

---

## 🐛 Troubleshooting

### **Mobile Build Issues**

**"Missing credentials" error:**

```bash
# Set up credentials
eas credentials
```

**"Project not linked" error:**

```bash
# Link project
eas project:init
```

**Build fails with native module error:**

- Ensure all native dependencies are in `package.json`
- Run `npx expo prebuild` if needed
- Check `eas.json` build profiles

### **Web Deployment Issues**

**"Build failed" on Vercel:**

- Check Root Directory is set to `apps/web-app`
- Verify build command uses `yarn turbo run build --filter=@template/web-app`
- Check environment variables are set

**"Module not found" errors:**

- Ensure `vercel.json` has correct build configuration
- Check that shared package is properly linked

**"Missing API key" or env var undefined at build time:**

Turborepo strips any env var not explicitly declared in `turbo.json`. Add every server-side env var your app uses to the `build` task's `env` array:

```json
"build": {
  "dependsOn": ["^build"],
  "outputs": ["..."],
  "env": ["SUPABASE_SERVICE_ROLE_KEY", "RESEND_API_KEY", "STRIPE_SECRET_KEY"]
}
```

`NEXT_PUBLIC_*` variables are handled automatically and do not need to be listed.

**SDK clients throwing at build time (Resend, Supabase admin, Stripe, etc.):**

Do not instantiate SDK clients at module level. Turbopack evaluates module-level code during the build when env vars are not yet available.

```typescript
// Wrong — throws at build time
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) { ... }

// Correct — only runs at request time
export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  ...
}
```

---

## 📚 Official Documentation

- [Expo EAS Build](https://docs.expo.dev/build/introduction/)
- [Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [EAS Submit](https://docs.expo.dev/submit/introduction/)
- [Vercel Monorepos](https://vercel.com/docs/monorepos)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

## 🎯 Quick Reference

### **Mobile App - EAS Commands**

```bash
# Connect to Expo project (first time)
cd apps/mobile-app
eas build:configure

# Check project info
eas project:info

# Development builds
eas build --platform android --profile development
eas build --platform ios --profile development
eas build --platform ios --profile ios-simulator

# Preview builds
eas build --platform all --profile preview

# Production builds
eas build --platform all --profile production

# Submit to app stores
eas submit --platform android
eas submit --platform ios

# Manage credentials
eas credentials
```

### **Web App - Vercel Commands**

Run all commands from the monorepo root.

```bash
# First-time setup
npm install -g vercel
vercel login
vercel                         # Links project + preview deploy (answer prompts — see Step 3)

# Production deploy
vercel --prod

# Environment variables (repeat for each var)
vercel env add VARIABLE_NAME   # Prompts for value, then select all 3 environments

# Inspect deployments
vercel ls
vercel inspect [deployment-url]
```

---

_This guide is maintained by the development team. Update when deployment processes change._
