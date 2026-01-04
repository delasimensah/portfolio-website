// Mock dependencies BEFORE any imports
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));
jest.mock("@supabase/supabase-js");
jest.mock("expo-constants");

import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import Constants from "expo-constants";

const mockAsyncStorage = AsyncStorage as jest.Mocked<typeof AsyncStorage>;
const mockCreateClient = createClient as jest.MockedFunction<
  typeof createClient
>;
const mockConstants = Constants as jest.Mocked<typeof Constants>;

describe("Supabase Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Mock expo-constants
    mockConstants.expoConfig = {
      name: "test-app",
      slug: "test-app",
      extra: {
        supabaseUrl: "https://mock-supabase.com",
        supabaseAnonKey: "mock-anon-key",
      },
    } as any;
  });

  it("should create Supabase client with correct configuration", () => {
    // Import the client to trigger the module initialization
    require("../client");

    expect(mockCreateClient).toHaveBeenCalledWith(
      "https://mock-supabase.com",
      "mock-anon-key",
      {
        auth: {
          storage: mockAsyncStorage,
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );
  });

  it("should throw error when supabaseUrl is missing", () => {
    // Reset module cache to ensure fresh import
    jest.resetModules();

    mockConstants.expoConfig = {
      name: "test",
      slug: "test",
      extra: {
        supabaseAnonKey: "mock-anon-key",
      },
    } as any;

    expect(() => {
      require("../client");
    }).toThrow(
      "Missing Supabase environment variables. Please check your .env file and app.config.ts"
    );
  });

  it("should throw error when supabaseAnonKey is missing", () => {
    // Reset module cache to ensure fresh import
    jest.resetModules();

    mockConstants.expoConfig = {
      name: "test",
      slug: "test",
      extra: {
        supabaseUrl: "https://mock-supabase.com",
      },
    } as any;

    expect(() => {
      require("../client");
    }).toThrow(
      "Missing Supabase environment variables. Please check your .env file and app.config.ts"
    );
  });

  it("should throw error when both supabaseUrl and supabaseAnonKey are missing", () => {
    // Reset module cache to ensure fresh import
    jest.resetModules();

    mockConstants.expoConfig = {
      name: "test",
      slug: "test",
      extra: {},
    } as any;

    expect(() => {
      require("../client");
    }).toThrow(
      "Missing Supabase environment variables. Please check your .env file and app.config.ts"
    );
  });

  it("should throw error when expoConfig is undefined", () => {
    // Reset module cache to ensure fresh import
    jest.resetModules();

    mockConstants.expoConfig = undefined as any;

    expect(() => {
      require("../client");
    }).toThrow(
      "Missing Supabase environment variables. Please check your .env file and app.config.ts"
    );
  });

  it("should throw error when extra is undefined", () => {
    // Reset module cache to ensure fresh import
    jest.resetModules();

    mockConstants.expoConfig = { name: "test", slug: "test" } as any;

    expect(() => {
      require("../client");
    }).toThrow(
      "Missing Supabase environment variables. Please check your .env file and app.config.ts"
    );
  });
});
