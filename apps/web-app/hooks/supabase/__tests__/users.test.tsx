import { renderHook } from "@testing-library/react";
import {
  useCreateUser as useCreateUserShared,
  useUpdateUser as useUpdateUserShared,
  useUserById as useUserByIdShared,
  useUsers as useUsersShared,
} from "shared";

import { supabase } from "@/services";

import { useCreateUser, useUpdateUser, useUser, useUsersList } from "../users";

// Mock shared hooks
jest.mock("shared", () => ({
  useUserById: jest.fn(),
  useUsers: jest.fn(),
  useUpdateUser: jest.fn(),
  useCreateUser: jest.fn(),
}));

// Mock services
jest.mock("@/services", () => ({
  supabase: {},
}));

describe("User Hooks (Wrapper Hooks)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("useUser", () => {
    it("should call shared useUserById with supabase client", () => {
      const mockResult = { data: { id: "1", email: "test@test.com" } };
      (useUserByIdShared as jest.Mock).mockReturnValue(mockResult);

      const { result } = renderHook(() => useUser("user-123"));

      expect(useUserByIdShared).toHaveBeenCalledWith({
        client: supabase,
        userId: "user-123",
      });
      expect(result.current).toEqual(mockResult);
    });
  });

  describe("useUsersList", () => {
    it("should call shared useUsers with supabase client and default options", () => {
      const mockResult = { data: [] };
      (useUsersShared as jest.Mock).mockReturnValue(mockResult);

      const { result } = renderHook(() => useUsersList());

      expect(useUsersShared).toHaveBeenCalledWith({
        client: supabase,
        options: undefined,
      });
      expect(result.current).toEqual(mockResult);
    });

    it("should call shared useUsers with custom options", () => {
      const mockResult = { data: [] };
      (useUsersShared as jest.Mock).mockReturnValue(mockResult);
      const options = { limit: 10, offset: 0, enabled: true };

      const { result } = renderHook(() => useUsersList(options));

      expect(useUsersShared).toHaveBeenCalledWith({
        client: supabase,
        options,
      });
      expect(result.current).toEqual(mockResult);
    });
  });

  describe("useUpdateUser", () => {
    it("should call shared useUpdateUser with supabase client", () => {
      const mockResult = { mutate: jest.fn() };
      (useUpdateUserShared as jest.Mock).mockReturnValue(mockResult);

      const { result } = renderHook(() => useUpdateUser("user-123"));

      expect(useUpdateUserShared).toHaveBeenCalledWith({
        client: supabase,
        userId: "user-123",
      });
      expect(result.current).toEqual(mockResult);
    });
  });

  describe("useCreateUser", () => {
    it("should call shared useCreateUser with supabase client", () => {
      const mockResult = { mutate: jest.fn() };
      (useCreateUserShared as jest.Mock).mockReturnValue(mockResult);

      const { result } = renderHook(() => useCreateUser());

      expect(useCreateUserShared).toHaveBeenCalledWith({
        client: supabase,
      });
      expect(result.current).toEqual(mockResult);
    });
  });
});
