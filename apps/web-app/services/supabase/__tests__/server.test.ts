import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { createClient } from "../server";

// Mock next/headers
jest.mock("next/headers", () => ({
  cookies: jest.fn(),
}));

// Mock @supabase/ssr
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

describe("Supabase Server Client", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create server client with correct configuration", async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    };

    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
    (createServerClient as jest.Mock).mockReturnValue({});

    await createClient();

    expect(cookies).toHaveBeenCalled();
    expect(createServerClient).toHaveBeenCalledWith(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          getAll: expect.any(Function),
          setAll: expect.any(Function),
        },
      }
    );
  });

  it("should handle cookie getAll correctly", async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([
        { name: "cookie1", value: "value1" },
        { name: "cookie2", value: "value2" },
      ]),
      set: jest.fn(),
    };

    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
    (createServerClient as jest.Mock).mockImplementation(
      (url, key, options) => {
        // Call getAll to test it
        const cookieGetAll = options.cookies.getAll();
        expect(cookieGetAll).toEqual([
          { name: "cookie1", value: "value1" },
          { name: "cookie2", value: "value2" },
        ]);
        return {};
      }
    );

    await createClient();
  });

  it("should handle cookie setAll correctly", async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn(),
    };

    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
    (createServerClient as jest.Mock).mockImplementation(
      (url, key, options) => {
        // Call setAll to test it
        const cookiesToSet = [{ name: "test", value: "value", options: {} }];
        options.cookies.setAll(cookiesToSet);
        expect(mockCookieStore.set).toHaveBeenCalledWith("test", "value", {});
        return {};
      }
    );

    await createClient();
  });

  it("should handle setAll errors gracefully", async () => {
    const mockCookieStore = {
      getAll: jest.fn().mockReturnValue([]),
      set: jest.fn().mockImplementation(() => {
        throw new Error("Cannot set cookie in Server Component");
      }),
    };

    (cookies as jest.Mock).mockResolvedValue(mockCookieStore);
    (createServerClient as jest.Mock).mockImplementation(
      (url, key, options) => {
        // Call setAll - should not throw
        const cookiesToSet = [{ name: "test", value: "value", options: {} }];
        expect(() => options.cookies.setAll(cookiesToSet)).not.toThrow();
        return {};
      }
    );

    await createClient();
  });
});
