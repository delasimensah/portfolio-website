import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Template App",
  slug: "template-app",
  version: "1.0.0",
  orientation: "portrait",
  scheme: "template",
  userInterfaceStyle: "automatic",
  ios: {
    ...config.ios,
    bundleIdentifier: "com.template.app",
    supportsTablet: true,
  },
  android: {
    ...config.android,
    package: "com.template.app",
    adaptiveIcon: {
      // foregroundImage: "./assets/icons/icon.png",
      backgroundColor: "#ffffff",
    },
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {},
    // Supabase configuration (from .env.local)
    supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
    supabasePublishableKey: process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    // Add EAS project ID after running 'eas build:configure'
    // eas: {
    //   projectId: "your-project-id",
    // },
  },
});
