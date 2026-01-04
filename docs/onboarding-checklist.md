# ✅ Developer Onboarding Checklist

> **Purpose**: Step-by-step checklist for new developers to get up and running

## 🎯 Overview

This checklist ensures you have everything set up correctly before you start developing.

---

## 📋 Prerequisites

### **Required Tools**

- [ ] **Node.js** >= 18.0.0

  ```bash
  node --version
  ```

- [ ] **Yarn** >= 1.22.0

  ```bash
  yarn --version
  ```

- [ ] **Docker Desktop** installed and running
  - Download from [docker.com](https://www.docker.com/products/docker-desktop)
  - Must be running before starting Supabase

- [ ] **Git** installed and configured

  ```bash
  git --version
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

### **Required Accounts**

- [ ] **GitHub Account** with access to repository
- [ ] **Expo Account** (for mobile development)

### **IDE Setup**

- [ ] **VS Code** (recommended) or your preferred IDE
- [ ] Install **ESLint** extension
- [ ] Install **Prettier** extension
- [ ] Install **TypeScript** extension

---

## 🚀 Setup Steps

### **Step 1: Clone Repository**

```bash
git clone <repository-url>
cd project-template
```

### **Step 2: Install Dependencies**

```bash
yarn install
```

### **Step 3: Set Up Supabase (Local Development)**

```bash
# Initialize Supabase (first time only)
yarn supabase:init

# Start Supabase services
yarn supabase:start
```

**Save the connection details** displayed in the terminal:

- API URL (usually `http://localhost:54321`)
- anon key

**Supabase Studio**: Access at http://localhost:54323

### **Step 4: Set Up Environment Variables**

**Mobile App:**

```bash
cd apps/mobile-app
# Create .env.local with values from 'yarn supabase:start':
# EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
# EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-start>
```

**Note for Android Emulator**: Use `10.0.2.2` instead of `localhost`:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://10.0.2.2:54321
```

**Web App:**

```bash
cd apps/web-app
# Create .env.local with values from 'yarn supabase:start':
# NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
# NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-start>
```

### **Step 5: Verify Setup**

```bash
# From root directory
yarn type-check  # Should pass
yarn lint        # Should pass
```

### **Step 6: Start Development**

```bash
# Ensure Supabase is running
yarn supabase:status

# Start both apps
yarn dev:apps

# Or start individually
yarn dev:mobile
yarn dev:web
```

---

## ✅ Verification

- [ ] Docker Desktop is running
- [ ] Supabase is running: `yarn supabase:status`
- [ ] Supabase Studio accessible at http://localhost:54323
- [ ] Mobile app runs in Expo Go or simulator
- [ ] Web app runs at `http://localhost:3001`
- [ ] All tests pass: `yarn test`
- [ ] Linting passes: `yarn lint`
- [ ] Type checking passes: `yarn type-check`

---

## 📚 Next Steps

1. Read the [Supabase Local Setup Guide](./supabase-local-setup.md) for detailed Supabase instructions
2. Read the [Git and PR Guidelines](./git-and-pr-guidelines.md)
3. Review project structure in README
4. **Optional**: Connect to Expo project for builds (see [Deployment Guide](./deployment-guide.md))
5. Create your first feature branch
6. Start coding!

---

_If you encounter any issues, check the [Supabase Local Setup Guide](./supabase-local-setup.md) troubleshooting section or ask the team._
