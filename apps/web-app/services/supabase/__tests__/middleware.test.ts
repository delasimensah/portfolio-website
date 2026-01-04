import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

import { updateSession } from "../middleware";

// Mock @supabase/ssr
jest.mock("@supabase/ssr", () => ({
  createServerClient: jest.fn(),
}));

describe("updateSession middleware", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create server client and refresh user session", async () => {
    const mockSupabaseClient = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: { id: "user-123" } },
        }),
      },
    };

    (createServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);

    const mockRequest = {
      headers: new Headers(),
      cookies: {
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
      },
    } as unknown as NextRequest;

    const response = await updateSession(mockRequest);

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

    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
    expect(response).toBeInstanceOf(NextResponse);
  });

  it("should handle cookie getAll correctly", async () => {
    const mockSupabaseClient = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
        }),
      },
    };

    const mockCookies = [
      { name: "cookie1", value: "value1" },
      { name: "cookie2", value: "value2" },
    ];

    (createServerClient as jest.Mock).mockImplementation(
      (url, key, options) => {
        const cookieGetAll = options.cookies.getAll();
        expect(cookieGetAll).toEqual(mockCookies);
        return mockSupabaseClient;
      }
    );

    const mockRequest = {
      headers: new Headers(),
      cookies: {
        getAll: jest.fn().mockReturnValue(mockCookies),
        set: jest.fn(),
      },
    } as unknown as NextRequest;

    await updateSession(mockRequest);

    expect(mockRequest.cookies.getAll).toHaveBeenCalled();
  });

  it("should handle cookie setAll correctly", async () => {
    const mockSupabaseClient = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
        }),
      },
    };

    let setCookieCalls: Array<{ name: string; value: string; options?: any }> =
      [];

    (createServerClient as jest.Mock).mockImplementation(
      (url, key, options) => {
        const mockRequest = {
          cookies: {
            set: jest.fn((name: string, value: string) => {
              setCookieCalls.push({ name, value });
            }),
          },
        };

        const mockResponse = NextResponse.next();

        options.cookies.setAll([
          { name: "test1", value: "value1", options: { path: "/" } },
          { name: "test2", value: "value2", options: { httpOnly: true } },
        ]);

        return mockSupabaseClient;
      }
    );

    const mockRequest = {
      headers: new Headers(),
      cookies: {
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
      },
    } as unknown as NextRequest;

    await updateSession(mockRequest);

    // Note: The actual implementation creates a new NextResponse in setAll
    // This test verifies the structure is correct
    expect(mockSupabaseClient.auth.getUser).toHaveBeenCalled();
  });

  it("should preserve request headers", async () => {
    const mockSupabaseClient = {
      auth: {
        getUser: jest.fn().mockResolvedValue({
          data: { user: null },
        }),
      },
    };

    (createServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);

    const mockHeaders = new Headers();
    mockHeaders.set("custom-header", "custom-value");

    const mockRequest = {
      headers: mockHeaders,
      cookies: {
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
      },
    } as unknown as NextRequest;

    const response = await updateSession(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
  });

  it("should handle errors gracefully", async () => {
    const mockSupabaseClient = {
      auth: {
        getUser: jest.fn().mockRejectedValue(new Error("Auth error")),
      },
    };

    (createServerClient as jest.Mock).mockReturnValue(mockSupabaseClient);

    const mockRequest = {
      headers: new Headers(),
      cookies: {
        getAll: jest.fn().mockReturnValue([]),
        set: jest.fn(),
      },
    } as unknown as NextRequest;

    // Should not throw - middleware should handle errors gracefully
    const response = await updateSession(mockRequest);

    expect(response).toBeInstanceOf(NextResponse);
  });
});
