import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import App from "./App";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";
import { logScreen } from "@utils/testUtils";

expect.extend(matchers);

describe("App", () => {
  test("App render và chuyển trang", async () => {
    render(<App />, {
      wrapper: BrowserRouter,
    });
    const user = userEvent.setup();

    // Verify navigation to home page
    await waitFor(() => {
      expect(document.querySelector("title")?.textContent).toBe("Trang chủ | Shoppy");
    });

    // Verify navigation to login page
    await user.click(screen.getByText(/Đăng nhập/i));
    await waitFor(() => {
      expect(screen.queryByText("Bạn chưa có tài khoản?")).toBeInTheDocument();
      expect(document.querySelector("title")?.textContent).toBe("Đăng nhập | Shoppy");
    });
  });

  test("Test trang not found", async () => {
    const badRoute = "/some/bad/route";
    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
    await logScreen();
  });
});
