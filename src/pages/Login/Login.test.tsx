import path from "@constants/path";
import * as matchers from "@testing-library/jest-dom/matchers";
import { screen, waitFor } from "@testing-library/react";
import { logScreen, renderWithRouter } from "@utils/testUtils";
import { describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

describe("Login", () => {
  it("Hiển thị lỗi required khi không nhập gì", async () => {
    const { user } = renderWithRouter({
      route: path.login,
    });

    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Nhập email")).toBeInTheDocument();
    });

    const submitButton = document.querySelector('form button[type="submit"]') as Element;
    user.click(submitButton);
    expect(await screen.findByText("Email là bắt buộc")).toBeTruthy();
    expect(await screen.findByText("Password là bắt buộc")).toBeTruthy();

    await logScreen();
  });
});
