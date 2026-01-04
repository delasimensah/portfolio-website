import { accessControlProvider } from "../accessControlProvider";
import { authProvider } from "../authProvider";

jest.mock("../authProvider", () => ({
  authProvider: {
    getPermissions: jest.fn(),
  },
}));

describe("accessControlProvider", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("can", () => {
    it("should return false when user is not authenticated", async () => {
      (authProvider.getPermissions as jest.Mock).mockResolvedValue(null);

      const result = await accessControlProvider.can({
        resource: "home",
        action: "list",
      });

      expect(result).toEqual({ can: false, reason: "Not authenticated" });
    });

    it("should return true for authenticated user with permissions", async () => {
      (authProvider.getPermissions as jest.Mock).mockResolvedValue({
        role: "user",
      });

      const result = await accessControlProvider.can({
        resource: "home",
        action: "list",
      });

      // Foundation only - allows everything by default
      expect(result).toEqual({ can: true });
    });

    it("should handle different resources", async () => {
      (authProvider.getPermissions as jest.Mock).mockResolvedValue({
        role: "user",
      });

      const trackResult = await accessControlProvider.can({
        resource: "tracks",
        action: "create",
      });

      const playlistResult = await accessControlProvider.can({
        resource: "playlists",
        action: "list",
      });

      // Foundation only - allows everything by default
      expect(trackResult).toEqual({ can: true });
      expect(playlistResult).toEqual({ can: true });
    });

    it("should handle different actions", async () => {
      (authProvider.getPermissions as jest.Mock).mockResolvedValue({
        role: "user",
      });

      const createResult = await accessControlProvider.can({
        resource: "tracks",
        action: "create",
      });

      const editResult = await accessControlProvider.can({
        resource: "tracks",
        action: "edit",
      });

      const deleteResult = await accessControlProvider.can({
        resource: "tracks",
        action: "delete",
      });

      // Foundation only - allows all actions by default
      expect(createResult).toEqual({ can: true });
      expect(editResult).toEqual({ can: true });
      expect(deleteResult).toEqual({ can: true });
    });

    it("should work with different permission structures", async () => {
      (authProvider.getPermissions as jest.Mock).mockResolvedValue({
        role: "admin",
        permissions: ["read", "write"],
      });

      const result = await accessControlProvider.can({
        resource: "admin",
        action: "list",
      });

      // Foundation only - allows everything by default
      expect(result).toEqual({ can: true });
    });
  });
});
