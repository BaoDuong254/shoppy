import type { RegisterOptions, UseFormGetValues } from "react-hook-form";
import * as yup from "yup";

interface FormData {
  email: string;
  password: string;
  confirm_password: string;
}

type Rules = {
  [key in "email" | "password" | "confirm_password"]?: RegisterOptions<FormData, key>;
};

function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string };
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getRules = (getValues?: UseFormGetValues<any>): Rules => ({
  email: {
    required: {
      value: true,
      message: "Email là bắt buộc",
    },
    pattern: {
      value: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gim,
      message: "Email không hợp lệ",
    },
    maxLength: {
      value: 160,
      message: "Email không được quá 160 ký tự",
    },
    minLength: {
      value: 5,
      message: "Email không được ít hơn 5 ký tự",
    },
  },
  password: {
    required: {
      value: true,
      message: "Password là bắt buộc",
    },
    minLength: {
      value: 6,
      message: "Password không được ít hơn 6 ký tự",
    },
    maxLength: {
      value: 160,
      message: "Password không được quá 160 ký tự",
    },
  },
  confirm_password: {
    required: {
      value: true,
      message: "Nhập lại password là bắt buộc",
    },
    minLength: {
      value: 6,
      message: "Nhập lại password không được ít hơn 6 ký tự",
    },
    maxLength: {
      value: 160,
      message: "Nhập lại password không được quá 160 ký tự",
    },
    validate:
      typeof getValues === "function"
        ? (value) => value === getValues("password") || "Nhập lại password không khớp"
        : undefined,
  },
});

export const schema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(5, "Email không được ít hơn 5 ký tự")
    .max(160, "Email không được quá 160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Password không được ít hơn 6 ký tự")
    .max(160, "Password không được quá 160 ký tự"),
  confirm_password: yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Nhập lại password không được ít hơn 6 ký tự")
    .max(160, "Nhập lại password không được quá 160 ký tự")
    .oneOf([yup.ref("password")], "Nhập lại password không khớp"),
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
});

export type Schema = yup.InferType<typeof schema>;
