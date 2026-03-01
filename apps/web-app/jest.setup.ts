import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return React.createElement("a", { href }, children);
  };
});

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | null = null;
  readonly rootMargin: string = "";
  readonly thresholds: readonly number[] = [];

  constructor(public callback: IntersectionObserverCallback) {}
  disconnect() {}
  observe(target: Element) {
    const entry: Partial<IntersectionObserverEntry> = {
      target,
      isIntersecting: true,
      intersectionRatio: 1,
      time: Date.now(),
    };
    setTimeout(
      () => this.callback([entry as IntersectionObserverEntry], this),
      0
    );
  }
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
  unobserve() {}
}

Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  value: MockIntersectionObserver,
});

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

class MockResizeObserver implements ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = MockResizeObserver;
