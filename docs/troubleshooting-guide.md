# 🔧 Troubleshooting Guide

> **Purpose**: Central hub for common issues and quick fixes

## 🎯 Overview

This guide helps you quickly resolve common issues. Each section provides quick fixes and links to detailed documentation.

---

## 🚨 Quick Fixes by Issue

### **"Module not found" Errors**

**Symptoms:** Import errors, missing packages, can't find modules

**Quick Fix:**

```bash
cd project-template
rm -rf node_modules apps/*/node_modules packages/*/node_modules
yarn install
```

**Common Causes:**

- Dependencies not installed
- Package mismatch
- Workspace issues

---

### **TypeScript Errors**

**Symptoms:** Red squiggles in IDE, type errors, build fails

**Quick Fix:**

```bash
# Check types
yarn type-check

# If errors, usually means:
yarn install  # Reinstall dependencies
```

**Common Causes:**

- Missing dependencies
- Stale type definitions
- Incorrect imports

**Detailed Help:**

- [Type Organization Guide](./type-organization-guide.md)
- [Import Patterns Guide](./import-patterns-guide.md)

---

### **Linting Errors**

**Symptoms:** ESLint warnings/errors, CI fails on lint

**Quick Fix:**

```bash
# Check linting
yarn lint

# Auto-fix issues
yarn lint:fix

# Format code
yarn format
```

**Common Causes:**

- Import ordering issues
- Missing dependencies
- Formatting issues

---

### **Environment Variables Not Working**

**Symptoms:** "Missing API URL", "Missing Supabase URL", app can't connect

**Quick Fix:**

**Mobile:**

```bash
cd apps/mobile-app
# Check file exists
ls -la .env.local

# Verify variables
cat .env.local

# Variables should have EXPO_PUBLIC_ prefix
grep "EXPO_PUBLIC_" .env.local

# Restart dev server
yarn dev --clear
```

**Web:**

```bash
cd apps/web-app
# Check file exists
ls -la .env.local

# Verify variables
cat .env.local

# Variables should have NEXT_PUBLIC_ prefix
grep "NEXT_PUBLIC_" .env.local

# Restart dev server
rm -rf .next
yarn dev
```

**Detailed Help:**

- [Onboarding Checklist - Environment Setup](./onboarding-checklist.md)
- [Supabase Local Setup](./supabase-local-setup.md)

---

### **Port Already in Use**

**Symptoms:** Can't start dev server, port conflict errors

**Quick Fix:**

**Web App (Port 3001):**

```bash
# Kill process on port 3001
lsof -ti:3001 | xargs kill -9

# Or use different port
cd apps/web-app
# Edit package.json dev script: "dev": "next dev -p 3002"
```

**Supabase (Port 54321):**

```bash
# Check if Supabase is running
yarn supabase:status

# Stop Supabase
yarn supabase:stop
```

**Mobile (Expo):**

```bash
# Expo manages ports automatically
# If stuck, restart dev server
yarn dev --clear
```

---

### **Build Fails**

**Symptoms:** Build errors, can't create production builds

**Quick Fix:**

**Mobile:**

```bash
# Clear cache and rebuild
cd apps/mobile-app
rm -rf .expo
yarn dev --clear
```

**Web:**

```bash
# Clear Next.js cache
cd apps/web-app
rm -rf .next
yarn build

# If still fails
yarn lint
yarn type-check
```

---

### **Tests Fail**

**Symptoms:** `yarn test` fails, CI fails on tests

**Quick Fix:**

```bash
# Run tests with watch
yarn test

# Run specific package tests
cd apps/mobile-app && yarn test
cd apps/web-app && yarn test

# Check coverage
yarn test:coverage
```

**Common Causes:**

- Missing mocks
- Environment setup issues
- Async timing issues

**Detailed Help:**

- [Testing Strategy](./testing-strategy.md)

---

### **Git/PR Issues**

**Symptoms:** Can't push, PR validation fails, branch conflicts

**Quick Fix:**

```bash
# Pull latest changes
git checkout main
git pull origin main

# Create new branch
git checkout -b feature/your-feature

# If branch conflicts
git checkout main
git pull origin main
git checkout your-branch
git rebase main
```

**Detailed Help:**

- [Git & PR Guidelines](./git-and-pr-guidelines.md)

---

## 🔍 Platform-Specific Issues

### **Mobile App Issues**

#### **Image Loading Issues**

**Symptom:** Images don't load, errors with Image component

**Quick Fix:**

```typescript
// ✅ CORRECT: Use expo-image
import { Image } from "expo-image";

// ❌ WRONG: Never use react-native Image
import { Image } from "react-native";
```

#### **Navigation Issues**

**Symptom:** Navigation not working, wrong routes

**Quick Fix:**

```typescript
// Same route group - use short path
router.push("/forgot-password");

// Different route groups - use full path
router.push("/(main-app)/(tabs)/dashboard");
```

#### **Expo Router Issues**

**Symptom:** Routes not working, can't navigate

**Quick Fix:**

```bash
# Clear Expo cache
cd apps/mobile-app
rm -rf .expo
yarn dev --clear
```

### **Web App Issues**

#### **Next.js Build Issues**

**Symptom:** Build fails, server/client component errors

**Quick Fix:**

```bash
cd apps/web-app
rm -rf .next
yarn build
```

**Common Causes:**

- Server/client component confusion
- Dynamic import issues
- Environment variable issues

---

## 🔗 Shared Package Issues

### **Import from shared Fails**

**Symptoms:** Can't import from shared, "Module not found"

**Quick Fix:**

```bash
# Reinstall dependencies
cd project-template
yarn install

# Check workspace setup
yarn workspaces info
```

**Common Causes:**

- Workspace not recognized
- Dependencies not installed
- TypeScript config issues

**Detailed Help:**

- [Shared Package README](../packages/shared/README.md)

---

## 🆘 Still Stuck?

### **Get More Help**

1. **Check Documentation**
   - Search relevant platform docs
   - Check README troubleshooting sections

2. **Check GitHub Issues**
   - Search for similar issues
   - Check closed issues for solutions

3. **Ask Team**
   - Slack/chat channel
   - Code review requests

4. **Debug Logs**
   - Check terminal output
   - Check browser console (web)
   - Check Metro logs (mobile)

---

## 📚 Related Documentation

- [Onboarding Checklist](./onboarding-checklist.md) - Setup verification
- [Git & PR Guidelines](./git-and-pr-guidelines.md) - Workflow issues
- [Supabase Local Setup](./supabase-local-setup.md) - Supabase issues

---

_Last Updated: December 2024_
