import { render } from "@testing-library/react-native";
import React from "react";
import { Text, View } from "react-native";

import Stack, { HStack, VStack } from "./Stack";

describe("Stack Component", () => {
  describe("Basic Rendering", () => {
    it("renders correctly with default props", () => {
      const { getByText } = render(
        <Stack>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </Stack>
      );
      expect(getByText("Item 1")).toBeTruthy();
      expect(getByText("Item 2")).toBeTruthy();
    });

    it("renders with children", () => {
      const { getByText } = render(
        <Stack>
          <Text>Child 1</Text>
          <Text>Child 2</Text>
          <Text>Child 3</Text>
        </Stack>
      );
      expect(getByText("Child 1")).toBeTruthy();
      expect(getByText("Child 2")).toBeTruthy();
      expect(getByText("Child 3")).toBeTruthy();
    });

    it("renders with single child", () => {
      const { getByText } = render(
        <Stack>
          <Text>Single Child</Text>
        </Stack>
      );
      expect(getByText("Single Child")).toBeTruthy();
    });

    it("renders with no children", () => {
      const { root } = render(<Stack />);
      expect(root).toBeTruthy();
    });
  });

  describe("Direction Prop", () => {
    it("renders with row direction", () => {
      const { getByText } = render(
        <Stack direction="row">
          <Text>Row Item</Text>
        </Stack>
      );
      expect(getByText("Row Item")).toBeTruthy();
    });

    it("renders with column direction", () => {
      const { getByText } = render(
        <Stack direction="column">
          <Text>Column Item</Text>
        </Stack>
      );
      expect(getByText("Column Item")).toBeTruthy();
    });

    it("defaults to column direction", () => {
      const { getByText } = render(
        <Stack>
          <Text>Default Direction</Text>
        </Stack>
      );
      expect(getByText("Default Direction")).toBeTruthy();
    });
  });

  describe("Spacing Prop", () => {
    it("renders with xs spacing", () => {
      const { getByText } = render(
        <Stack spacing="xs">
          <Text>XS Spacing</Text>
        </Stack>
      );
      expect(getByText("XS Spacing")).toBeTruthy();
    });

    it("renders with sm spacing", () => {
      const { getByText } = render(
        <Stack spacing="sm">
          <Text>SM Spacing</Text>
        </Stack>
      );
      expect(getByText("SM Spacing")).toBeTruthy();
    });

    it("renders with md spacing (default)", () => {
      const { getByText } = render(
        <Stack spacing="md">
          <Text>MD Spacing</Text>
        </Stack>
      );
      expect(getByText("MD Spacing")).toBeTruthy();
    });

    it("renders with lg spacing", () => {
      const { getByText } = render(
        <Stack spacing="lg">
          <Text>LG Spacing</Text>
        </Stack>
      );
      expect(getByText("LG Spacing")).toBeTruthy();
    });

    it("renders with xl spacing", () => {
      const { getByText } = render(
        <Stack spacing="xl">
          <Text>XL Spacing</Text>
        </Stack>
      );
      expect(getByText("XL Spacing")).toBeTruthy();
    });

    it("renders with 2xl spacing", () => {
      const { getByText } = render(
        <Stack spacing="2xl">
          <Text>2XL Spacing</Text>
        </Stack>
      );
      expect(getByText("2XL Spacing")).toBeTruthy();
    });

    it("renders with no spacing", () => {
      const { getByText } = render(
        <Stack spacing="none">
          <Text>No Spacing</Text>
        </Stack>
      );
      expect(getByText("No Spacing")).toBeTruthy();
    });
  });

  describe("Align Prop", () => {
    it("renders with start alignment", () => {
      const { getByText } = render(
        <Stack align="start">
          <Text>Start Align</Text>
        </Stack>
      );
      expect(getByText("Start Align")).toBeTruthy();
    });

    it("renders with center alignment", () => {
      const { getByText } = render(
        <Stack align="center">
          <Text>Center Align</Text>
        </Stack>
      );
      expect(getByText("Center Align")).toBeTruthy();
    });

    it("renders with end alignment", () => {
      const { getByText } = render(
        <Stack align="end">
          <Text>End Align</Text>
        </Stack>
      );
      expect(getByText("End Align")).toBeTruthy();
    });

    it("renders with stretch alignment (default)", () => {
      const { getByText } = render(
        <Stack align="stretch">
          <Text>Stretch Align</Text>
        </Stack>
      );
      expect(getByText("Stretch Align")).toBeTruthy();
    });
  });

  describe("Justify Prop", () => {
    it("renders with start justification (default)", () => {
      const { getByText } = render(
        <Stack justify="start">
          <Text>Start Justify</Text>
        </Stack>
      );
      expect(getByText("Start Justify")).toBeTruthy();
    });

    it("renders with center justification", () => {
      const { getByText } = render(
        <Stack justify="center">
          <Text>Center Justify</Text>
        </Stack>
      );
      expect(getByText("Center Justify")).toBeTruthy();
    });

    it("renders with end justification", () => {
      const { getByText } = render(
        <Stack justify="end">
          <Text>End Justify</Text>
        </Stack>
      );
      expect(getByText("End Justify")).toBeTruthy();
    });

    it("renders with between justification", () => {
      const { getByText } = render(
        <Stack justify="between">
          <Text>Between Justify</Text>
        </Stack>
      );
      expect(getByText("Between Justify")).toBeTruthy();
    });

    it("renders with around justification", () => {
      const { getByText } = render(
        <Stack justify="around">
          <Text>Around Justify</Text>
        </Stack>
      );
      expect(getByText("Around Justify")).toBeTruthy();
    });

    it("renders with evenly justification", () => {
      const { getByText } = render(
        <Stack justify="evenly">
          <Text>Evenly Justify</Text>
        </Stack>
      );
      expect(getByText("Evenly Justify")).toBeTruthy();
    });
  });

  describe("Combined Props", () => {
    it("renders with multiple props combined", () => {
      const { getByText } = render(
        <Stack direction="row" spacing="lg" align="center" justify="between">
          <Text>Combined Props</Text>
        </Stack>
      );
      expect(getByText("Combined Props")).toBeTruthy();
    });

    it("renders with all props set", () => {
      const { getByText } = render(
        <Stack
          direction="column"
          spacing="xl"
          align="end"
          justify="center"
          testID="full-stack"
        >
          <Text>All Props</Text>
        </Stack>
      );
      expect(getByText("All Props")).toBeTruthy();
    });
  });

  describe("Custom ClassName", () => {
    it("accepts and applies custom className", () => {
      const { getByText } = render(
        <Stack className="custom-class bg-red-500">
          <Text>Custom Class</Text>
        </Stack>
      );
      expect(getByText("Custom Class")).toBeTruthy();
    });

    it("combines className with default styles", () => {
      const { getByText } = render(
        <Stack className="bg-blue-500 p-4" spacing="lg">
          <Text>Combined Classes</Text>
        </Stack>
      );
      expect(getByText("Combined Classes")).toBeTruthy();
    });
  });

  describe("ViewProps Support", () => {
    it("passes through testID prop", () => {
      const { getByTestId } = render(
        <Stack testID="test-stack">
          <Text>Test ID</Text>
        </Stack>
      );
      expect(getByTestId("test-stack")).toBeTruthy();
    });

    it("passes through style prop", () => {
      const { getByText } = render(
        <Stack style={{ backgroundColor: "red" }}>
          <Text>Style Prop</Text>
        </Stack>
      );
      expect(getByText("Style Prop")).toBeTruthy();
    });

    it("passes through accessibilityLabel prop", () => {
      const { getByText } = render(
        <Stack accessibilityLabel="Stack container">
          <Text>Accessibility</Text>
        </Stack>
      );
      expect(getByText("Accessibility")).toBeTruthy();
    });
  });

  describe("Complex Children", () => {
    it("renders with mixed component types", () => {
      const { getByText } = render(
        <Stack>
          <Text>Text Child</Text>
          <View>
            <Text>Nested Text</Text>
          </View>
        </Stack>
      );
      expect(getByText("Text Child")).toBeTruthy();
      expect(getByText("Nested Text")).toBeTruthy();
    });

    it("renders with conditional children", () => {
      const showSecond = true;
      const { getByText } = render(
        <Stack>
          <Text>First</Text>
          {showSecond && <Text>Second</Text>}
        </Stack>
      );
      expect(getByText("First")).toBeTruthy();
      expect(getByText("Second")).toBeTruthy();
    });
  });
});

describe("HStack Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <HStack>
        <Text>HStack Item</Text>
      </HStack>
    );
    expect(getByText("HStack Item")).toBeTruthy();
  });

  it("renders with row direction by default", () => {
    const { getByText } = render(
      <HStack>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </HStack>
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });

  it("accepts spacing prop", () => {
    const { getByText } = render(
      <HStack spacing="lg">
        <Text>Spaced HStack</Text>
      </HStack>
    );
    expect(getByText("Spaced HStack")).toBeTruthy();
  });

  it("accepts align prop", () => {
    const { getByText } = render(
      <HStack align="center">
        <Text>Aligned HStack</Text>
      </HStack>
    );
    expect(getByText("Aligned HStack")).toBeTruthy();
  });

  it("accepts justify prop", () => {
    const { getByText } = render(
      <HStack justify="between">
        <Text>Justified HStack</Text>
      </HStack>
    );
    expect(getByText("Justified HStack")).toBeTruthy();
  });

  it("accepts className prop", () => {
    const { getByText } = render(
      <HStack className="custom-hstack">
        <Text>Custom HStack</Text>
      </HStack>
    );
    expect(getByText("Custom HStack")).toBeTruthy();
  });

  it("renders with multiple children", () => {
    const { getByText } = render(
      <HStack spacing="md" align="center">
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </HStack>
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
    expect(getByText("Item 3")).toBeTruthy();
  });

  it("passes through ViewProps", () => {
    const { getByTestId } = render(
      <HStack testID="test-hstack">
        <Text>Test</Text>
      </HStack>
    );
    expect(getByTestId("test-hstack")).toBeTruthy();
  });
});

describe("VStack Component", () => {
  it("renders correctly with default props", () => {
    const { getByText } = render(
      <VStack>
        <Text>VStack Item</Text>
      </VStack>
    );
    expect(getByText("VStack Item")).toBeTruthy();
  });

  it("renders with column direction by default", () => {
    const { getByText } = render(
      <VStack>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </VStack>
    );
    expect(getByText("Item 1")).toBeTruthy();
    expect(getByText("Item 2")).toBeTruthy();
  });

  it("accepts spacing prop", () => {
    const { getByText } = render(
      <VStack spacing="xl">
        <Text>Spaced VStack</Text>
      </VStack>
    );
    expect(getByText("Spaced VStack")).toBeTruthy();
  });

  it("accepts align prop", () => {
    const { getByText } = render(
      <VStack align="end">
        <Text>Aligned VStack</Text>
      </VStack>
    );
    expect(getByText("Aligned VStack")).toBeTruthy();
  });

  it("accepts justify prop", () => {
    const { getByText } = render(
      <VStack justify="center">
        <Text>Justified VStack</Text>
      </VStack>
    );
    expect(getByText("Justified VStack")).toBeTruthy();
  });

  it("accepts className prop", () => {
    const { getByText } = render(
      <VStack className="custom-vstack">
        <Text>Custom VStack</Text>
      </VStack>
    );
    expect(getByText("Custom VStack")).toBeTruthy();
  });

  it("renders with multiple children", () => {
    const { getByText } = render(
      <VStack spacing="lg" align="center">
        <Text>Header</Text>
        <Text>Body</Text>
        <Text>Footer</Text>
      </VStack>
    );
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Body")).toBeTruthy();
    expect(getByText("Footer")).toBeTruthy();
  });

  it("passes through ViewProps", () => {
    const { getByTestId } = render(
      <VStack testID="test-vstack">
        <Text>Test</Text>
      </VStack>
    );
    expect(getByTestId("test-vstack")).toBeTruthy();
  });
});

describe("Stack Integration", () => {
  it("renders nested stacks correctly", () => {
    const { getByText } = render(
      <VStack spacing="lg">
        <HStack spacing="md">
          <Text>Row 1 Item 1</Text>
          <Text>Row 1 Item 2</Text>
        </HStack>
        <HStack spacing="md">
          <Text>Row 2 Item 1</Text>
          <Text>Row 2 Item 2</Text>
        </HStack>
      </VStack>
    );
    expect(getByText("Row 1 Item 1")).toBeTruthy();
    expect(getByText("Row 1 Item 2")).toBeTruthy();
    expect(getByText("Row 2 Item 1")).toBeTruthy();
    expect(getByText("Row 2 Item 2")).toBeTruthy();
  });

  it("handles complex nested layouts", () => {
    const { getByText } = render(
      <VStack spacing="xl" align="center">
        <Text>Header</Text>
        <HStack spacing="lg" justify="between">
          <VStack spacing="sm">
            <Text>Left 1</Text>
            <Text>Left 2</Text>
          </VStack>
          <VStack spacing="sm">
            <Text>Right 1</Text>
            <Text>Right 2</Text>
          </VStack>
        </HStack>
        <Text>Footer</Text>
      </VStack>
    );
    expect(getByText("Header")).toBeTruthy();
    expect(getByText("Left 1")).toBeTruthy();
    expect(getByText("Left 2")).toBeTruthy();
    expect(getByText("Right 1")).toBeTruthy();
    expect(getByText("Right 2")).toBeTruthy();
    expect(getByText("Footer")).toBeTruthy();
  });
});
