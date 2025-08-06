import * as yup from "yup";

/**
 * Validates that the price range is correct.
 *
 * @remarks
 * This function checks if both `price_min` and `price_max` are provided and ensures that `price_max` is greater than or equal to `price_min`.
 * If either `price_min` or `price_max` is empty, it allows the validation to pass as long as at least one of them is provided.
 *
 * @param this - The context of the test, which includes the parent object containing `price_min` and `price_max`.
 * @returns A boolean indicating whether the price range is valid.
 */
function testPriceMinMax(this: yup.TestContext<yup.AnyObject>) {
  const { price_min, price_max } = this.parent as { price_min: string; price_max: string };
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

/**
 * Creates a Yup validation schema for confirming passwords.
 *
 * @param refString - The reference string to compare against, typically the name of the password field.
 * @returns A Yup string schema that requires the field to match the specified password field.
 */
const handleConfirmPasswordYup = (refString: string) => {
  return yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .min(6, "Độ dài từ 6 - 160 ký tự")
    .max(160, "Độ dài từ 6 - 160 ký tự")
    .oneOf([yup.ref(refString)], "Nhập lại password không khớp");
};

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
  confirm_password: handleConfirmPasswordYup("password"),
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
  name: yup.string().trim().required("Tên sản phẩm là bắt buộc"),
});

export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ"),
  password: schema.fields["password"],
  new_password: schema.fields["password"],
  confirm_password: handleConfirmPasswordYup("new_password"),
});

export type UserSchema = yup.InferType<typeof userSchema>;

export type Schema = yup.InferType<typeof schema>;
