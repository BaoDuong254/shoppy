import path from "@constants/path";
import * as matchers from "@testing-library/jest-dom/matchers";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { logScreen, renderWithRouter } from "@utils/testUtils";
import { beforeAll, describe, expect, it } from "vitest";
import "@testing-library/jest-dom/vitest";

expect.extend(matchers);

describe("Login", () => {
  let emailInput: HTMLInputElement;
  let passwordInput: HTMLInputElement;
  let submitButton: HTMLButtonElement;

  beforeAll(async () => {
    renderWithRouter({
      route: path.login,
    });
    await waitFor(() => {
      expect(screen.queryByPlaceholderText("Nhập email")).toBeInTheDocument();
      expect(screen.queryByPlaceholderText("Nhập mật khẩu")).toBeInTheDocument();
    });
    emailInput = document.querySelector('form input[type="email"]') as HTMLInputElement;
    passwordInput = document.querySelector('form input[type="password"]') as HTMLInputElement;
    submitButton = document.querySelector('form button[type="submit"]') as HTMLButtonElement;
  });

  it("Hiển thị lỗi required khi không nhập gì", async () => {
    const submitButton = document.querySelector('form button[type="submit"]') as Element;
    fireEvent.submit(submitButton);
    await waitFor(async () => {
      expect(screen.queryByText("Email là bắt buộc")).toBeTruthy();
      expect(screen.queryByText("Mật khẩu là bắt buộc")).toBeTruthy();
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
    await waitFor(() => {
      expect(screen.queryByText("Email không đúng định dạng")).toBeTruthy();
      expect(screen.queryByText("Độ dài từ 6 - 160 ký tự")).toBeTruthy();
    });
  });

  it("Không nên hiển thị lỗi khi nhập lại value đúng", async () => {
    fireEvent.change(emailInput, {
      target: {
        value: "d3007@gmail.com",
      },
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "123123",
      },
    });

    await waitFor(() => {
      expect(screen.queryByText("Email không đúng định dạng")).toBeFalsy();
      expect(screen.queryByText("Độ dài từ 6 - 160 ký tự")).toBeFalsy();
    });
    fireEvent.submit(submitButton);
    await logScreen();
    await waitFor(() => {
      expect(document.querySelector("title")?.textContent).toBe("Trang chủ | Shoppy");
    });
  });
});
