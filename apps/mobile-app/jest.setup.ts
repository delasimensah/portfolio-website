// Import Expo Router testing types
import "./expo-router-testing";

// Ensure NODE_ENV is set to 'test' for Jest
(process.env as any).NODE_ENV = "test";

// Mock AsyncStorage for Jest tests - use the official mock
jest.mock("@react-native-async-storage/async-storage", () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

// Mock expo-constants to provide environment variables
// Note: Individual tests can override this by mocking expo-constants themselves
jest.mock("expo-constants", () => ({
  default: {
    expoConfig: {
      extra: {
        supabaseUrl: "https://test.supabase.co",
        supabaseAnonKey: "test-anon-key",
        apiUrl: "http://localhost:3000/api",
      },
    },
  },
}));
