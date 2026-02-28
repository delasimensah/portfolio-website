# Google Maps setup (Android and iOS)

The list-view screen uses Google Maps on both Android and iOS. Follow these steps in order. All commands are run from **`apps/mobile-app`** unless stated otherwise. Use only the scripts defined in `apps/mobile-app/package.json`.

Where a step depends on Expo’s dashboard or CLI, this doc links to Expo’s official documentation instead of describing unverified UI paths. If what you see does not match, use the current Expo docs.

---

## Step 1: Get your Android SHA-1 fingerprint

Google requires your app’s SHA-1 when you restrict the Android API key. This project builds Android with EAS (`yarn build:android:dev`).

**Use Expo’s current documentation.** The Expo dashboard and EAS CLI change over time. We do not describe specific menu paths here because they have not been verified against the live product.

1. Open Expo’s **App credentials** doc (Android section):  
   [https://docs.expo.dev/app-signing/app-credentials/](https://docs.expo.dev/app-signing/app-credentials/)
2. From **`apps/mobile-app`**, run:
   ```bash
   eas credentials
   ```
   Select **Android** and the build profile you use (e.g. **development**). Follow the prompts and the current Expo doc to view or export your keystore and obtain the **SHA-1** certificate fingerprint (e.g. via the CLI output or by downloading the keystore and using `keytool` as described in the doc).
3. If the dashboard or CLI does not match what you see, follow the instructions in the Expo doc and any linked pages (e.g. managed credentials, download credentials) for the current workflow.
4. Write down the SHA-1; you will paste it into Google Cloud in Step 2 when restricting the Android API key.

---

## Step 2: Google Cloud – create API keys

1. Open [Google Cloud Console](https://console.cloud.google.com/apis/credentials) and create a project (or use an existing one).
2. Enable **Maps SDK for Android** and **Maps SDK for iOS** for that project.
3. Create the **Android API key**:
   - Click **Create credentials** → **API key**. Copy the key somewhere safe (you will add it to `.env.local`).
   - Click **Edit API key** (or open the key you just created). Under **Application restrictions** choose **Android apps**.
   - Click **Add an item**. Enter:
     - **Package name:** e.g. `com.crownlusso.app.dev` for development (must match `getUniqueIdentifier()` in `app.config.ts`).
     - **SHA-1 certificate fingerprint:** paste the SHA-1 you got in Step 1.
   - Save.
4. Create the **iOS API key**:
   - Click **Create credentials** → **API key**. Copy the key.
   - Click **Edit API key**. Under **Application restrictions** choose **iOS apps**.
   - Click **Add an item** and enter your app bundle ID (e.g. `com.crownlusso.app.dev`; same as `getUniqueIdentifier()` in `app.config.ts`).
   - Save.
5. Copy both keys; you will add them in Step 3 (`.env.local`).

---

## Step 3: Add keys to `.env.local` (local development)

1. Open **`apps/mobile-app/.env.local`** (create it if it does not exist; this file is gitignored).
2. Add or update these two lines (use your real key values):

   ```
   EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY=your_android_key_here
   EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY=your_ios_key_here
   ```

3. Save the file. Do not commit `.env.local`.

---

## Step 4: Confirm app config (already done in this project)

The project is already configured to read these env vars:

- **Android:** `app.config.ts` sets `android.config.googleMaps.apiKey` from `EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY`.
- **iOS:** `app.config.ts` sets `ios.config.googleMapsApiKey` from `EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY`.
- **Map component:** `ListViewScreen` uses `provider={PROVIDER_GOOGLE}` so both platforms use Google Maps.

No change needed here unless you rename the env vars; then update `app.config.ts` to match.

---

## Step 5: Build the Android app (first time or after changing the key)

1. In a terminal, go to the mobile app:

   ```bash
   cd apps/mobile-app
   ```

2. Ensure Step 3 is done (both keys in `.env.local`).
3. Create a new Android development build:

   ```bash
   yarn build:android:dev
   ```

4. Wait for the EAS build to finish. Install the APK on your device or emulator (link from EAS or build page).
5. Start the dev server:

   ```bash
   yarn dev
   ```

6. Open the app on the device/emulator (scan QR or launch the installed app). Open the Home tab, tap an area card, and confirm the list-view map loads.

---

## Step 6: Build the iOS app (first time or after changing the key)

1. In a terminal, go to the mobile app:

   ```bash
   cd apps/mobile-app
   ```

2. Ensure Step 3 is done (both keys in `.env.local`).
3. Create a new iOS development build. Use one of these (not both):

   - **Physical device:**

     ```bash
     yarn build:ios-device:dev
     ```

   - **Simulator:**

     ```bash
     yarn build:ios-simulator:dev
     ```

4. Wait for the EAS build to finish. Install the build on your device or simulator (link from EAS or build page).
5. Start the dev server (if not already running):

   ```bash
   yarn dev
   ```

6. Open the app, go to Home, tap an area card, and confirm the list-view map loads.

---

## Step 7: EAS Build (preview and production)

EAS Build does not read `.env.local`. You must add the keys in the Expo dashboard so cloud builds get them.

1. Open [Expo dashboard](https://expo.dev) and select the Crown Lusso project.
2. Go to **Project** → **Secrets** (or **Environment variables**).
3. Add two secrets (use the same key values as in Step 3):
   - **Name:** `EXPO_PUBLIC_GOOGLE_MAPS_ANDROID_API_KEY`  
     **Value:** your Android API key.
   - **Name:** `EXPO_PUBLIC_GOOGLE_MAPS_IOS_API_KEY`  
     **Value:** your iOS API key.
4. Save.

When you run a build from the project, use these scripts from **`apps/mobile-app`**:

- **Preview (internal testing)**  
  - Android: `yarn build:preview:android`  
  - iOS: `yarn build:preview:ios`
- **Production (store)**  
  - Android: `yarn build:production:android`  
  - iOS: `yarn build:production:ios`

After adding or changing a secret, run a new build; the previous binary does not pick up the change.

---

## Step 8: Run the app after the first build

After you have at least one development build installed (Android and/or iOS):

1. From the monorepo root you can start the mobile app with:

   ```bash
   yarn dev:mobile
   ```

2. Or from **`apps/mobile-app`**:

   ```bash
   yarn dev
   ```

   or:

   ```bash
   yarn dev:build
   ```

   Both start the dev server for the development client. Open the installed app on the device/emulator and use the list-view map as above.

**Note:** `yarn dev:go` starts Expo Go. The list-view map will not work in Expo Go; use a development build and `yarn dev` (or `yarn dev:build`) instead.

---

## Script reference (from `package.json`)

- `yarn dev` — Start dev server for development client (requires existing dev build).
- `yarn dev:build` — Same as `yarn dev`.
- `yarn dev:go` — Start with Expo Go (map will not work; dev build required for maps).
- `yarn build:android:dev` — Build Android development client.
- `yarn build:ios-device:dev` — Build iOS development client for physical device.
- `yarn build:ios-simulator:dev` — Build iOS development client for simulator.
- `yarn build:preview:android` — EAS preview build, Android.
- `yarn build:preview:ios` — EAS preview build, iOS.
- `yarn build:production:android` — EAS production build, Android.
- `yarn build:production:ios` — EAS production build, iOS.
