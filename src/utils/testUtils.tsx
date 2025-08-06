import { screen, waitFor, type waitForOptions } from "@testing-library/dom";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { expect } from "vitest";
import App from "../App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider, getInitialAppContext } from "@contexts/app.context";

/**
 * Delays the execution for a specified time.
 *
 * @remarks
 * This function returns a promise that resolves after the specified time.
 * It can be used to simulate waiting for asynchronous operations in tests.
 *
 * @param time - Time in milliseconds to wait before resolving the promise
 */
export const delay = (time: number) =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });

/**
 * Logs the current state of the screen for debugging purposes.
 *
 * @remarks
 * This function captures the current state of the screen and logs it to the console.
 * It can be useful for debugging tests by providing a snapshot of the DOM at a specific point in time.
 *
 * @param body - The HTML element to log, defaults to the body of the document.
 * @param options - Options for the waitFor function, such as timeout.
 * @returns A promise that resolves after the specified timeout.
 */
export const logScreen = async (
  body: HTMLElement = document.body.parentElement as HTMLElement,
  options?: waitForOptions
) => {
  const { timeout = 1000 } = options || {};
  await waitFor(
    async () => {
      expect(await delay(timeout - 100)).toBe(true);
    },
    {
      ...options,
      timeout,
    }
  );
  screen.debug(body, 99999999);
};

/**
 * Creates a wrapper component for rendering with React Router and React Query.
 *
 * @remarks
 * This function creates a provider that wraps the application with React Router and React Query.
 * It is used to set up the context for testing components that rely on these libraries.
 *
 * @returns A React component that provides the necessary context for testing
 */
const createWrapper = () => {
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

  const Provider = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
  return Provider;
};

const Provider = createWrapper();

/**
 * Renders the App component with React Router and the provided route.
 *
 * @remarks
 * This function sets up the initial context for the application and renders it with the specified route.
 * It uses React Router's BrowserRouter to handle routing and provides a user event setup for testing interactions.
 *
 * @param route - The initial route to render, defaults to "/"
 * @returns An object containing the user event setup and the rendered component
 */
export const renderWithRouter = ({ route = "/" } = {}) => {
  const defaultValueAppContext = getInitialAppContext();
  window.history.pushState({}, "Test page", route);
  return {
    user: userEvent.setup(),
    ...render(
      <Provider>
        <AppProvider defaultValue={defaultValueAppContext}>
          <App />
        </AppProvider>
      </Provider>,
      {
        wrapper: BrowserRouter,
      }
    ),
  };
};
