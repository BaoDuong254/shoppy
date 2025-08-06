import path from "@constants/path";
import { access_token_1s } from "@msw/auth.msw";
import { waitFor } from "@testing-library/react";
import { setAccessTokenToLS } from "@utils/auth";
import { renderWithRouter } from "@utils/testUtils";
import { describe, expect, it } from "vitest";

describe("Profile", () => {
  it("Hiển thị trang profile", async () => {
    setAccessTokenToLS(access_token_1s);
    const { container } = renderWithRouter({
      route: path.profile,
    });
    await waitFor(() => {
      expect((container.querySelector('form input[placeholder="Tên"]') as HTMLInputElement).value).toBe("8");
    });
    // await logScreen()
  });
});
