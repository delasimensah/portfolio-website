import "react-native-url-polyfill/auto";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabasePublishableKey =
  Constants.expoConfig?.extra?.supabasePublishableKey;

if (!supabaseUrl || !supabasePublishableKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check your .env.local file and app.config.ts"
  );
}

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
