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
2. **Vercel CLI** (optional): Install globally

```bash
npm install -g vercel
```

### **Step 1: Configure Vercel for Monorepo**

**Option A: Via Vercel Dashboard**

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your Git repository
3. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: `apps/web-app`
   - **Build Command**: `cd ../.. && yarn build --filter=@template/web-app`
   - **Output Directory**: `.next`
   - **Install Command**: `yarn install`

**Option B: Via Vercel CLI**

```bash
cd project-template
vercel
```

Follow the prompts to configure your project.

### **Step 2: Environment Variables**

**Set in Vercel Dashboard:**

1. Go to Project Settings → Environment Variables
2. Add all required variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Any other environment variables

**Or via CLI:**

```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### **Step 3: Deploy**

**Automatic Deployment:**

- Push to `main` branch → Production deployment
- Create PR → Preview deployment

**Manual Deployment:**

```bash
cd project-template
vercel --prod
```

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

Create at root if needed for custom configuration:

```json
{
  "buildCommand": "cd ../.. && yarn build --filter=@template/web-app",
  "outputDirectory": "apps/web-app/.next",
  "installCommand": "yarn install"
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
- Verify build command includes monorepo context
- Check environment variables are set

**"Module not found" errors:**

- Ensure `vercel.json` has correct build configuration
- Check that shared package is properly linked

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

```bash
# Deploy to Vercel
vercel                    # Preview deployment
vercel --prod            # Production deployment

# Environment variables
vercel env add VARIABLE_NAME

# Check deployment status
vercel ls
```

---

_This guide is maintained by the development team. Update when deployment processes change._
