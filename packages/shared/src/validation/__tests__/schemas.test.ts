import {
  emailSchema,
  emailVerificationSchema,
  passwordResetSchema,
  passwordSchema,
  passwordUpdateSchema,
  signInSchema,
  signUpSchema,
} from "../schemas";

describe("Validation Schemas", () => {
  describe("emailSchema", () => {
    it("should validate correct email", () => {
      expect(() => emailSchema.parse("test@example.com")).not.toThrow();
    });

    it("should reject invalid email", () => {
      expect(() => emailSchema.parse("invalid")).toThrow();
      expect(() => emailSchema.parse("@example.com")).toThrow();
    });
  });

  describe("passwordSchema", () => {
    it("should validate password with min length", () => {
      expect(() => passwordSchema.parse("password123")).not.toThrow();
    });

    it("should reject password shorter than 6 characters", () => {
      expect(() => passwordSchema.parse("short")).toThrow();
    });
  });

  describe("signUpSchema", () => {
    it("should validate correct sign up data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
        confirmPassword: "password123",
      };
      expect(() => signUpSchema.parse(validData)).not.toThrow();
    });

    it("should reject when passwords do not match", () => {
      const invalidData = {
        email: "test@example.com",
        password: "password123",
        confirmPassword: "different",
      };
      expect(() => signUpSchema.parse(invalidData)).toThrow();
    });

    it("should reject invalid email", () => {
      const invalidData = {
        email: "invalid",
        password: "password123",
        confirmPassword: "password123",
      };
      expect(() => signUpSchema.parse(invalidData)).toThrow();
    });
  });

  describe("signInSchema", () => {
    it("should validate correct sign in data", () => {
      const validData = {
        email: "test@example.com",
        password: "password123",
      };
      expect(() => signInSchema.parse(validData)).not.toThrow();
    });

    it("should reject empty password", () => {
      const invalidData = {
        email: "test@example.com",
        password: "",
      };
      expect(() => signInSchema.parse(invalidData)).toThrow();
    });
  });

  describe("passwordResetSchema", () => {
    it("should validate correct email", () => {
      expect(() =>
        passwordResetSchema.parse({ email: "test@example.com" })
      ).not.toThrow();
    });

    it("should reject invalid email", () => {
      expect(() => passwordResetSchema.parse({ email: "invalid" })).toThrow();
    });
  });

  describe("passwordUpdateSchema", () => {
    it("should validate when passwords match", () => {
      const validData = {
        password: "newpassword123",
        confirmPassword: "newpassword123",
      };
      expect(() => passwordUpdateSchema.parse(validData)).not.toThrow();
    });

    it("should reject when passwords do not match", () => {
      const invalidData = {
        password: "newpassword123",
        confirmPassword: "different",
      };
      expect(() => passwordUpdateSchema.parse(invalidData)).toThrow();
    });
  });

  describe("emailVerificationSchema", () => {
    it("should validate correct verification data", () => {
      const validData = {
        email: "test@example.com",
        token: "123456",
      };
      expect(() => emailVerificationSchema.parse(validData)).not.toThrow();
    });

    it("should reject empty token", () => {
      const invalidData = {
        email: "test@example.com",
        token: "",
      };
      expect(() => emailVerificationSchema.parse(invalidData)).toThrow();
    });
  });
});
