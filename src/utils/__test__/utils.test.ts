/* eslint-disable @typescript-eslint/no-explicit-any */
import HttpStatusCode from "@constants/httpStatusCode";
import { isAxiosError, isAxiosUnprocessableEntityError } from "@utils/utils";
import { AxiosError } from "axios";
import { describe, it, expect } from "vitest";

describe("isAxiosError", () => {
  it("isAxiosError trả về boolean", () => {
    expect(isAxiosError(new Error())).toBe(false);
    expect(isAxiosError(new AxiosError())).toBe(true);
  });
});

describe("isAxiosUnprocessableEntityError", () => {
  it("isAxiosUnprocessableEntityError trả về boolean", () => {
    expect(isAxiosUnprocessableEntityError(new Error())).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.InternalServerError,
          data: null,
        } as any)
      )
    ).toBe(false);
    expect(
      isAxiosUnprocessableEntityError(
        new AxiosError(undefined, undefined, undefined, undefined, {
          status: HttpStatusCode.UnprocessableEntity,
          data: null,
        } as any)
      )
    ).toBe(true);
  });
});
