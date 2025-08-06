import "../src/index.css";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "../src/contexts/app.context";
import type { Decorator } from "@storybook/react";
import type { ReactNode, FC } from "react";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

interface StoryProps {
  children?: ReactNode;
}

export const decorators: Decorator[] = [
  (Story: FC<StoryProps>) => (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <HelmetProvider>
            <ErrorBoundary>
              <Story />
            </ErrorBoundary>
          </HelmetProvider>
        </AppProvider>
      </QueryClientProvider>
    </BrowserRouter>
  ),
];
