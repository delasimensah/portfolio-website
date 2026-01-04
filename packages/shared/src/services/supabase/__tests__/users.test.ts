import type { SupabaseClient } from "@supabase/supabase-js";

import type { Database } from "../../../types/database";
import { createUser, getUserById, getUsers, updateUser } from "../users";

const createMockClient = () => ({
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  insert: jest.fn().mockReturnThis(),
  update: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn(),
  limit: jest.fn().mockReturnThis(),
  range: jest.fn().mockReturnThis(),
});

describe("Supabase User Services", () => {
  let client: ReturnType<typeof createMockClient>;

  beforeEach(() => {
    client = createMockClient();
    jest.clearAllMocks();
  });

  describe("getUserById", () => {
    it("should fetch user by ID successfully", async () => {
      const mockUser = {
        id: "1",
        email: "test@example.com",
        full_name: "Test User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      };

      client.single.mockResolvedValue({
        data: mockUser,
        error: null,
      });

      const result = await getUserById(
        client as unknown as SupabaseClient<Database>,
        "1"
      );

      expect(result).toEqual(mockUser);
      expect(client.from).toHaveBeenCalledWith("users");
      expect(client.select).toHaveBeenCalledWith("*");
      expect(client.eq).toHaveBeenCalledWith("id", "1");
      expect(client.single).toHaveBeenCalledTimes(1);
    });

    it("should throw error on failure", async () => {
      client.single.mockResolvedValue({
        data: null,
        error: { message: "User not found" },
      });

      await expect(
        getUserById(client as unknown as SupabaseClient<Database>, "1")
      ).rejects.toThrow("Failed to fetch user: User not found");
    });
  });

  describe("getUsers", () => {
    it("should fetch all users successfully", async () => {
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

      // Mock the query chain
      const mockQuery = {
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockReturnThis(),
      };
      client.select.mockReturnValue(mockQuery);
      mockQuery.limit.mockResolvedValue({
        data: mockUsers,
        error: null,
      });

      const result = await getUsers(
        client as unknown as SupabaseClient<Database>
      );

      expect(result).toEqual(mockUsers);
      expect(client.from).toHaveBeenCalledWith("users");
    });

    it("should handle pagination options", async () => {
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

      const mockQuery = {
        limit: jest.fn().mockReturnThis(),
        range: jest.fn().mockResolvedValue({
          data: mockUsers,
          error: null,
        }),
      };
      client.select.mockReturnValue(mockQuery);

      await getUsers(client as unknown as SupabaseClient<Database>, {
        limit: 10,
        offset: 0,
      });

      expect(mockQuery.limit).toHaveBeenCalledWith(10);
      expect(mockQuery.range).toHaveBeenCalledWith(0, 9);
    });
  });

  describe("updateUser", () => {
    it("should update user successfully", async () => {
      const mockUpdatedUser = {
        id: "1",
        email: "updated@example.com",
        full_name: "Updated User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-02",
      };

      client.single.mockResolvedValue({
        data: mockUpdatedUser,
        error: null,
      });

      const result = await updateUser(
        client as unknown as SupabaseClient<Database>,
        "1",
        { full_name: "Updated User" }
      );

      expect(result).toEqual(mockUpdatedUser);
      expect(client.from).toHaveBeenCalledWith("users");
      expect(client.update).toHaveBeenCalledWith({ full_name: "Updated User" });
      expect(client.eq).toHaveBeenCalledWith("id", "1");
    });
  });

  describe("createUser", () => {
    it("should create user successfully", async () => {
      const mockNewUser = {
        id: "1",
        email: "new@example.com",
        full_name: "New User",
        avatar_url: null,
        created_at: "2024-01-01",
        updated_at: "2024-01-01",
      };

      client.single.mockResolvedValue({
        data: mockNewUser,
        error: null,
      });

      const result = await createUser(
        client as unknown as SupabaseClient<Database>,
        {
          email: "new@example.com",
          full_name: "New User",
          avatar_url: null,
        }
      );

      expect(result).toEqual(mockNewUser);
      expect(client.from).toHaveBeenCalledWith("users");
      expect(client.insert).toHaveBeenCalledWith({
        email: "new@example.com",
        full_name: "New User",
        avatar_url: null,
      });
    });
  });
});
