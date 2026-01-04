import { createBrowserClient } from "@supabase/ssr";

import { supabase } from "../client";

// Mock @supabase/ssr
jest.mock("@supabase/ssr", () => ({
  createBrowserClient: jest.fn(),
}));

describe("Supabase Client (Browser)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create browser client with correct configuration", () => {
    // Import the client to trigger the module initialization
    require("../client");

    expect(createBrowserClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: false,
        },
      }
    );
  });

  it("should export supabase singleton instance", () => {
    const mockClient = {};
    (createBrowserClient as jest.Mock).mockReturnValue(mockClient);

    // Re-import to get fresh instance
    jest.resetModules();
    const { supabase: clientInstance } = require("../client");

    expect(clientInstance).toBeDefined();
  });
});
