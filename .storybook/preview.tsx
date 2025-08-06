import "../src/index.css";
import { HelmetProvider } from "react-helmet-async";
import ErrorBoundary from "../src/components/ErrorBoundary";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "../src/contexts/app.context";
import type { Decorator } from "@storybook/react";
import type { ReactNode, FC } from "react";
import { withRouter } from "storybook-addon-remix-react-router";

export const parameters = {
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
  withRouter,
  (Story: FC<StoryProps>) => (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HelmetProvider>
          <ErrorBoundary>
            <Story />
          </ErrorBoundary>
        </HelmetProvider>
      </AppProvider>
    </QueryClientProvider>
  ),
];
