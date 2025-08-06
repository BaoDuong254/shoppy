import path from "@constants/path";
import * as matchers from "@testing-library/jest-dom/matchers";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { logScreen, renderWithRouter } from "@utils/testUtils";
import { beforeAll, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

describe("Login", () => {
  beforeAll(async () => {
    renderWithRouter({
      route: path.login,
    });
    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Nhập email")).toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Nhập mật khẩu")).toBeInTheDocument();
    });
  });

  it("Hiển thị lỗi required khi không nhập gì", async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element;
    fireEvent.submit(submitButton);
    await waitFor(async () => {
      expect(await screen.findByText("Email là bắt buộc")).toBeTruthy();
      expect(await screen.findByText("Password là bắt buộc")).toBeTruthy();
    });
  });

  it("Hiển thị lỗi khi nhập sai input", async () => {
    const emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    const passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
    const submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;

    fireEvent.change(emailInput, {
      target: {
        value: "testgmail",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "123",
      },
    });

    fireEvent.submit(submitButton);

    expect(await screen.findByText("Email không đúng định dạng")).toBeTruthy();
    expect(await screen.findByText("Password không được ít hơn 6 ký tự")).toBeTruthy();
    await logScreen();
  });
});
