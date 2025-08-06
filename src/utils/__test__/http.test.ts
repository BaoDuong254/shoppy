import HttpStatusCode from "@constants/httpStatusCode";
import { access_token_1s, refresh_token_1000days } from "@msw/auth.msw";
import { setAccessTokenToLS, setRefreshTokenToLS } from "@utils/auth";
import { Http } from "@utils/http";
import { beforeEach, describe, expect, it } from "vitest";

describe("http axios", () => {
  let http = new Http().instance;

  beforeEach(() => {
    localStorage.clear();
    http = new Http().instance;
  });

  it("Gọi API", async () => {
    const res = await http.get("products");
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it("Auth Request", async () => {
    await http.post("login", {
      email: "d3007@gmail.com",
      password: "123123",
    });
    const res = await http.get("me");
    expect(res.status).toBe(HttpStatusCode.Ok);
  });

  it("Refresh Token", async () => {
    setAccessTokenToLS(access_token_1s);
    setRefreshTokenToLS(refresh_token_1000days);

    const httpNew = new Http().instance;
    const res = await httpNew.get("me");

    expect(res.status).toBe(HttpStatusCode.Ok);
  });
});
