# 🗄️ Supabase Local Development Setup

Complete guide for setting up and using Supabase locally in this monorepo.

## 🎯 Overview

This monorepo uses a **local Supabase instance** at the root level, shared by both mobile and web applications. This ensures:

- ✅ Both apps access the same database
- ✅ Consistent development environment
- ✅ Easy database migrations
- ✅ Local testing without cloud dependencies

## 📋 Prerequisites

### Required Software

1. **Docker Desktop**
   - Download from [docker.com](https://www.docker.com/products/docker-desktop)
   - Must be running before starting Supabase

2. **Node.js** >= 18.0.0
   - Already required for the project

## 🚀 Initial Setup

### Step 1: Install Dependencies

```bash
# From project root
yarn install
```

This installs the Supabase CLI as a dev dependency.

### Step 2: Initialize Supabase

```bash
# From project root
yarn supabase:init
```

This creates the `supabase/` directory with:

- `config.toml` - Supabase configuration
- `seed.sql` - Database seed data (optional)
- `migrations/` - Database migrations directory

### Step 3: Start Supabase

```bash
# From project root
yarn supabase:start
```

**First time setup takes 2-5 minutes** as Docker downloads images.

You'll see output like:

```
Started supabase local development setup.

         API URL: http://localhost:54321
     GraphQL URL: http://localhost:54321/graphql/v1
          DB URL: postgresql://postgres:postgres@localhost:54322/postgres
      Studio URL: http://localhost:54323
    Inbucket URL: http://localhost:54324
      JWT secret: super-secret-jwt-token-with-at-least-32-characters-long
        anon key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
service_role key: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Save these values** - you'll need them for environment variables!

## 🔑 Environment Variables Setup

### Mobile App

Create `apps/mobile-app/.env.local`:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://localhost:54321
EXPO_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-start>
```

**Important for Android Emulator:**

If testing on Android emulator, use `10.0.2.2` instead of `localhost`:

```bash
EXPO_PUBLIC_SUPABASE_URL=http://10.0.2.2:54321
```

### Web App

Create `apps/web-app/.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-start>
```

## 🎮 Daily Development Workflow

### Start Development Session

```bash
# 1. Start Supabase (if not running)
yarn supabase:start

# 2. Start apps
yarn dev:apps
```

### Check Supabase Status

```bash
yarn supabase:status
```

### Stop Supabase

```bash
yarn supabase:stop
```

## 🗄️ Database Management

### Create a Migration

```bash
supabase migration new <migration-name>
```

Example:

```bash
supabase migration new create_users_table
```

This creates a file in `supabase/migrations/` with timestamp prefix.

### Edit Migration File

Edit the generated migration file in `supabase/migrations/`:

```sql
-- Create users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Apply Migrations

Migrations are automatically applied when you run `yarn supabase:start`.

To manually reset and apply all migrations:

```bash
yarn supabase:reset
```

**Warning**: This deletes all data and reapplies migrations!

### Seed Database

Add seed data to `supabase/seed.sql`:

```sql
-- Seed users
INSERT INTO users (email) VALUES
  ('user1@example.com'),
  ('user2@example.com');
```

Seed data runs automatically after migrations on `yarn supabase:start`.

## 🎨 Supabase Studio

Access the web-based management interface:

**http://localhost:54323**

Use it to:

- ✅ View and edit database tables
- ✅ Test SQL queries
- ✅ Manage authentication
- ✅ View storage buckets
- ✅ Test API endpoints
- ✅ View logs

## 🔧 Common Tasks

### Reset Database

```bash
yarn supabase:reset
```

This:

1. Stops Supabase
2. Deletes all data
3. Reapplies all migrations
4. Runs seed.sql
5. Restarts Supabase

### View Logs

```bash
supabase logs
```

### Generate TypeScript Types

```bash
supabase gen types typescript --local > packages/shared/src/types/supabase.ts
```

## 🐛 Troubleshooting

### Docker Not Running

**Error**: `Error: Cannot connect to the Docker daemon`

**Solution**: Start Docker Desktop

### Port Already in Use

**Error**: `Port 54321 is already in use`

**Solution**:

1. Check if Supabase is already running: `yarn supabase:status`
2. Stop other services using the port
3. Or change ports in `supabase/config.toml`

### Database Connection Failed

**Error**: Apps can't connect to Supabase

**Solutions**:

1. Verify Supabase is running: `yarn supabase:status`
2. Check environment variables match `supabase start` output
3. For Android emulator, use `10.0.2.2` instead of `localhost`
4. Restart Supabase: `yarn supabase:stop && yarn supabase:start`

### Migrations Not Applying

**Solution**:

```bash
yarn supabase:reset
```

## 📚 Additional Resources

- [Supabase Local Development Guide](https://supabase.com/docs/guides/local-development)
- [Supabase CLI Reference](https://supabase.com/docs/reference/cli)
- [Database Migrations Guide](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [Supabase TypeScript Types](https://supabase.com/docs/guides/api/generating-types)

## ✅ Verification Checklist

After setup, verify:

- [ ] Docker Desktop is running
- [ ] `yarn supabase:start` completes successfully
- [ ] Supabase Studio accessible at http://localhost:54323
- [ ] Environment variables set in both apps
- [ ] Mobile app can connect (check logs)
- [ ] Web app can connect (check browser console)
- [ ] Database migrations apply correctly

---

_For issues, check the [Troubleshooting](#-troubleshooting) section or Supabase documentation._
