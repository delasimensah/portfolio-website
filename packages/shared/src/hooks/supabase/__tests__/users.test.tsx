/**
 * "use client" directive is required for Next.js App Router compatibility.
 */
"use client";

import type { SupabaseClient } from "@supabase/supabase-js";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import React from "react";

import * as userServices from "../../../services/supabase/users";
import type { Database } from "../../../types/database";
import { useCreateUser, useUpdateUser, useUserById, useUsers } from "../users";

// Mock the services
jest.mock("../../../services/supabase/users");

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

// Create mock client helper
const createMockClient = () => ({});

describe("Supabase User Hooks", () => {
  let client: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    client = createMockClient();
    jest.clearAllMocks();
  });

  describe("useUserById", () => {
    it("should fetch user by ID", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        full_name: "Test User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      };

      (userServices.getUserById as jest.Mock).mockResolvedValue(mockUser);

      const { result } = renderHook(
        () =>
          useUserById({
            client: client as unknown as SupabaseClient<Database>,
            userId: "1",
          }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockUser);
      expect(userServices.getUserById).toHaveBeenCalledWith(
        client as unknown as SupabaseClient<Database>,
        "1"
      );
    });

    it("should not fetch when userId is empty", () => {
      const { result } = renderHook(
        () =>
          useUserById({
            client: client as unknown as SupabaseClient<Database>,
            userId: "",
          }),
        { wrapper: createWrapper() }
      );

      expect(result.current.isLoading).toBe(false);
      expect(result.current.isFetching).toBe(false);
    });
  });

  describe("useUsers", () => {
    it("should fetch all users", async () => {
      const mockUsers = [
        {
          id: "1",
          email: "test1@example.com",
          full_name: "User 1",
          avatar_url: null,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
        {
          id: "2",
          email: "test2@example.com",
          full_name: "User 2",
          avatar_url: null,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
      ];

      (userServices.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const { result } = renderHook(
        () =>
          useUsers({ client: client as unknown as SupabaseClient<Database> }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(result.current.data).toEqual(mockUsers);
      expect(userServices.getUsers).toHaveBeenCalledWith(
        client as unknown as SupabaseClient<Database>,
        undefined
      );
    });

    it("should pass pagination options", async () => {
      const mockUsers = [
        {
          id: "1",
          email: "test@example.com",
          full_name: "User",
          avatar_url: null,
          created_at: "2024-01-01",
          updated_at: "2024-01-01",
        },
      ];

      (userServices.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      const { result } = renderHook(
        () =>
          useUsers({
            client: client as unknown as SupabaseClient<Database>,
            options: { limit: 10, offset: 0 },
          }),
        { wrapper: createWrapper() }
      );

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(userServices.getUsers).toHaveBeenCalledWith(
        client as unknown as SupabaseClient<Database>,
        { limit: 10, offset: 0 }
      );
    });
  });

  describe("useUpdateUser", () => {
    it("should update user successfully", async () => {
      const mockUpdatedUser = {
        id: "1",
        email: "updated@example.com",
        full_name: "Updated User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-02",
      };

      (userServices.updateUser as jest.Mock).mockResolvedValue(mockUpdatedUser);

      const { result } = renderHook(
        () =>
          useUpdateUser({
            client: client as unknown as SupabaseClient<Database>,
            userId: "1",
          }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({ full_name: "Updated User" });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(userServices.updateUser).toHaveBeenCalledWith(
        client as unknown as SupabaseClient<Database>,
        "1",
        { full_name: "Updated User" }
      );
    });
  });

  describe("useCreateUser", () => {
    it("should create user successfully", async () => {
      const mockNewUser = {
        id: "1",
        email: "new@example.com",
        full_name: "New User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      };

      (userServices.createUser as jest.Mock).mockResolvedValue(mockNewUser);

      const { result } = renderHook(
        () =>
          useCreateUser({
            client: client as unknown as SupabaseClient<Database>,
          }),
        { wrapper: createWrapper() }
      );

      result.current.mutate({
        email: "new@example.com",
        full_name: "New User",
        avatar_url: null,
      });

      await waitFor(() => expect(result.current.isSuccess).toBe(true));

      expect(userServices.createUser).toHaveBeenCalledWith(
        client as unknown as SupabaseClient<Database>,
        {
          email: "new@example.com",
          full_name: "New User",
          avatar_url: null,
        }
      );
    });
  });
});
