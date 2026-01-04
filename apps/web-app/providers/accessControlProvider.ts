import type { AccessControlProvider } from "@refinedev/core";

import { authProvider } from "./authProvider";

/**
 * Generic Access Control Provider for Refine
 *
 * Controls what resources and actions users can access.
 * Customize the can() method based on your permission system.
 */
export const accessControlProvider: AccessControlProvider = {
  can: async ({ resource, action }) => {
    const permissions = await authProvider.getPermissions!({});

    if (!permissions) {
      return { can: false, reason: "Not authenticated" };
    }

    // Foundation only - add restrictions as you build features
    //
    // Example for role-based access:
    // if (resource === "admin-dashboard") {
    //   return {
    //     can: permissions.role === "admin",
    //     reason: permissions.role !== "admin" ? "Admin access required" : undefined,
    //   };
    // }
    //
    // Example for action-based access:
    // if (resource === "users" && action === "delete") {
    //   return {
    //     can: permissions.role === "admin",
    //     reason: permissions.role !== "admin" ? "Admin access required" : undefined,
    //   };
    // }

    // Allow everything by default for now
    // Customize based on your needs
    return { can: true };
  },
};
