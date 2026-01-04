import { COLORS } from "@/constants";

import { defaultStackScreenOptions, screenPresets } from "../navigation";

describe("navigation utilities", () => {
  describe("defaultStackScreenOptions", () => {
    it("should have correct header style", () => {
      expect(defaultStackScreenOptions.headerStyle).toEqual({
        backgroundColor: COLORS.black,
      });
    });

    it("should have white header tint color", () => {
      expect(defaultStackScreenOptions.headerTintColor).toBe("white");
    });

    it("should have correct header title style", () => {
      expect(defaultStackScreenOptions.headerTitleStyle).toEqual({
        fontFamily: "Template-Regular",
      });
    });

    it("should have correct content background color", () => {
      expect(defaultStackScreenOptions.contentStyle).toEqual({
        backgroundColor: COLORS.black,
      });
    });

    it("should be a valid navigation options object", () => {
      expect(defaultStackScreenOptions).toBeDefined();
      expect(typeof defaultStackScreenOptions).toBe("object");
    });
  });

  describe("screenPresets", () => {
    it("should have noHeader preset", () => {
      expect(screenPresets.noHeader).toBeDefined();
      expect(screenPresets.noHeader.headerShown).toBe(false);
    });

    it("should have modal preset with correct presentation", () => {
      expect(screenPresets.modal).toBeDefined();
      expect(screenPresets.modal.presentation).toBe("modal");
    });

    it("should have fullScreenModal preset with correct presentation", () => {
      expect(screenPresets.fullScreenModal).toBeDefined();
      expect(screenPresets.fullScreenModal.presentation).toBe(
        "fullScreenModal"
      );
    });

    it("should have transparentModal preset with correct presentation", () => {
      expect(screenPresets.transparentModal).toBeDefined();
      expect(screenPresets.transparentModal.presentation).toBe(
        "transparentModal"
      );
    });

    it("should have transparentHeader preset", () => {
      expect(screenPresets.transparentHeader).toBeDefined();
      expect(screenPresets.transparentHeader.headerTransparent).toBe(true);
      expect(screenPresets.transparentHeader.headerTitle).toBe("");
      expect(screenPresets.transparentHeader.headerStyle).toEqual({
        backgroundColor: "transparent",
      });
    });

    it("should have all expected presets", () => {
      const expectedPresets = [
        "noHeader",
        "modal",
        "fullScreenModal",
        "transparentModal",
        "transparentHeader",
      ];

      expectedPresets.forEach((preset) => {
        expect(screenPresets).toHaveProperty(preset);
      });
    });
  });

  describe("Preset validation", () => {
    it("should have preset types as readonly strings", () => {
      expect(typeof screenPresets.modal.presentation).toBe("string");
      expect(typeof screenPresets.fullScreenModal.presentation).toBe("string");
      expect(typeof screenPresets.transparentModal.presentation).toBe("string");
    });

    it("should have correct presentation values", () => {
      expect(screenPresets.modal.presentation).toBe("modal");
      expect(screenPresets.fullScreenModal.presentation).toBe(
        "fullScreenModal"
      );
      expect(screenPresets.transparentModal.presentation).toBe(
        "transparentModal"
      );
    });
  });

  describe("Type safety", () => {
    it("should export objects with correct types", () => {
      expect(typeof defaultStackScreenOptions).toBe("object");
      expect(typeof screenPresets).toBe("object");
    });

    it("should have immutable preset values", () => {
      // Verify presets are objects (can be spread into other configs)
      expect(Array.isArray(screenPresets.noHeader)).toBe(false);
      expect(typeof screenPresets.noHeader).toBe("object");
    });
  });

  describe("Edge cases", () => {
    it("should handle spreading defaultStackScreenOptions", () => {
      const customOptions = {
        ...defaultStackScreenOptions,
        headerTitle: "Custom Title",
      };

      expect(customOptions.headerTitle).toBe("Custom Title");
      expect(customOptions.headerTintColor).toBe("white");
      expect(customOptions.headerStyle).toEqual({
        backgroundColor: COLORS.black,
      });
    });

    it("should handle spreading screenPresets", () => {
      const customPreset = {
        ...screenPresets.noHeader,
        customProperty: true,
      };

      expect(customPreset.headerShown).toBe(false);
      expect(customPreset.customProperty).toBe(true);
    });

    it("should allow combining presets", () => {
      const combinedOptions = {
        ...defaultStackScreenOptions,
        ...screenPresets.modal,
      };

      expect(combinedOptions.presentation).toBe("modal");
      expect(combinedOptions.headerTintColor).toBe("white");
    });
  });

  describe("Integration", () => {
    it("should work with multiple preset combinations", () => {
      const modalOptions = {
        ...defaultStackScreenOptions,
        ...screenPresets.modal,
      };

      expect(modalOptions.presentation).toBe("modal");
      expect(modalOptions.headerTintColor).toBe("white");
    });

    it("should preserve colors from constants", () => {
      expect(
        (defaultStackScreenOptions.contentStyle as { backgroundColor: string })
          ?.backgroundColor
      ).toBe(COLORS.black);
      expect(
        (defaultStackScreenOptions.headerStyle as { backgroundColor: string })
          ?.backgroundColor
      ).toBe(COLORS.black);
    });
  });
});
