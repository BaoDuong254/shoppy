import * as yup from "yup";
import i18next from "i18next";

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
    .required(() => i18next.t("validation:confirm_password_required"))
    .min(6, () => i18next.t("validation:password_length", { min: 6, max: 160 }))
    .max(160, () => i18next.t("validation:password_length", { min: 6, max: 160 }))
    .oneOf([yup.ref(refString)], () => i18next.t("validation:password_mismatch"));
};

export const schema = yup.object({
  email: yup
    .string()
    .required(() => i18next.t("validation:email_required"))
    .email(() => i18next.t("validation:email_invalid"))
    .min(5, () => i18next.t("validation:email_min", { min: 5 }))
    .max(160, () => i18next.t("validation:email_max", { max: 160 })),
  password: yup
    .string()
    .required(() => i18next.t("validation:password_required"))
    .min(6, () => i18next.t("validation:password_length", { min: 6, max: 160 }))
    .max(160, () => i18next.t("validation:password_length", { min: 6, max: 160 })),
  confirm_password: handleConfirmPasswordYup("password"),
  price_min: yup.string().test({
    name: "price-not-allowed",
    message: () => i18next.t("validation:price_invalid"),
    test: testPriceMinMax,
  }),
  price_max: yup.string().test({
    name: "price-not-allowed",
    message: () => i18next.t("validation:price_invalid"),
    test: testPriceMinMax,
  }),
  name: yup
    .string()
    .trim()
    .required(() => i18next.t("validation:name_required")),
});

export const userSchema = yup.object({
  name: yup.string().max(160, () => i18next.t("validation:max_length", { max: 160 })),
  phone: yup.string().max(20, () => i18next.t("validation:max_length", { max: 20 })),
  address: yup.string().max(160, () => i18next.t("validation:max_length", { max: 160 })),
  avatar: yup.string().max(1000, () => i18next.t("validation:max_length", { max: 1000 })),
  date_of_birth: yup.date().max(new Date(), () => i18next.t("validation:date_in_past")),
  password: schema.fields["password"],
  new_password: schema.fields["password"],
  confirm_password: handleConfirmPasswordYup("new_password"),
});

export type UserSchema = yup.InferType<typeof userSchema>;

export type Schema = yup.InferType<typeof schema>;
