"use client";

import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { Suspense, useState } from "react";
import { queryClientDefaultOptions } from "shared";

import { LoadingScreen } from "@/components";
import { accessControlProvider, authProvider } from "@/providers";

interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const [queryClient] = useState(
    () => new QueryClient(queryClientDefaultOptions)
  );

  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Refine
            routerProvider={routerProvider}
            authProvider={authProvider}
            accessControlProvider={accessControlProvider}
            options={{
              syncWithLocation: true,
              warnWhenUnsavedChanges: true,
              disableTelemetry: true,
            }}
          >
            {children}
          </Refine>
        </Suspense>
        <Notifications position="top-right" />
      </MantineProvider>
    </QueryClientProvider>
  );
};
