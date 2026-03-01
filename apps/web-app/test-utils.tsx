import { MantineProvider } from "@mantine/core";
import React from "react";
import {
  render as rtlRender,
  RenderOptions,
  RenderResult,
} from "@testing-library/react";

function AllTheProviders({ children }: { children: React.ReactNode }) {
  return <MantineProvider>{children}</MantineProvider>;
}

function render(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, "wrapper">
): RenderResult {
  return rtlRender(ui, {
    wrapper: AllTheProviders,
    ...options,
  });
}

export * from "@testing-library/react";
export { render };
