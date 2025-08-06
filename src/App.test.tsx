import { describe, expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as matchers from "@testing-library/jest-dom/matchers";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom/vitest";

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

    // debug the current state of the document
    screen.debug(document.body.parentElement as HTMLElement, 99999999);
  });
});
