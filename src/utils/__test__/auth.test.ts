import {
  clearLS,
  getAccessTokenFromLS,
  getRefreshTokenFromLS,
  setAccessTokenToLS,
  setRefreshTokenToLS,
} from "@utils/auth";
import { beforeEach, describe, expect, it } from "vitest";

const access_token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJhZDZlMWFmYzJlMWExZjk2YjI4MyIsImVtYWlsIjoiYnVja0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTI4VDA2OjM2OjM2LjI0OFoiLCJpYXQiOjE2OTA1MjYxOTYsImV4cCI6MTY5MDYxMjU5Nn0.xahazbRXEkKOEbSZ7iH68mSGxvGn-wtRszDLzUO-QJA";

const refresh_token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YWJhZDZlMWFmYzJlMWExZjk2YjI4MyIsImVtYWlsIjoiYnVja0BnbWFpbC5jb20iLCJyb2xlcyI6WyJVc2VyIl0sImNyZWF0ZWRfYXQiOiIyMDIzLTA3LTI4VDA2OjM2OjM2LjI0OFoiLCJpYXQiOjE2OTA1MjYxOTYsImV4cCI6MTcwNDM1MDE5Nn0.rO5OKQYYbXboroZR0lm2Rq8V7U9LutCcNeHxKtqfIu4";

beforeEach(() => {
  localStorage.clear();
});

describe("access_token", () => {
  it("access_token được set vào localStorage", () => {
    setAccessTokenToLS(access_token);
    expect(getAccessTokenFromLS()).toBe(access_token);
  });
});

describe("refresh_token", () => {
  it("refresh_token được set vào localStorage", () => {
    setRefreshTokenToLS(refresh_token);
    expect(getRefreshTokenFromLS()).toEqual(refresh_token);
  });
});

describe("clearLS", () => {
  it("Xóa hết access_token, refresh_token, profile", () => {
    setRefreshTokenToLS(refresh_token);
    setAccessTokenToLS(access_token);
    clearLS();
    expect(getAccessTokenFromLS()).toBe("");
    expect(getRefreshTokenFromLS()).toBe("");
  });
});
