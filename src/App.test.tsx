import { describe, expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import * as matchers from "@testing-library/jest-dom/matchers";
import "@testing-library/jest-dom/vitest";
import { logScreen, renderWithRouter } from "@utils/testUtils";
import path from "@constants/path";

expect.extend(matchers);

describe("App", () => {
  test("App render và chuyển trang", async () => {
    const { user } = renderWithRouter();

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
    renderWithRouter({
      route: badRoute,
    });
    await waitFor(() => {
      expect(screen.getByText(/Page Not Found/i)).toBeInTheDocument();
    });
  });

  test("Render trang register", async () => {
    renderWithRouter({
      route: path.register,
    });
    await waitFor(() => {
      expect(screen.getByText(/Bạn đã có tài khoản?/i)).toBeInTheDocument();
    });
    await logScreen();
  });
});
