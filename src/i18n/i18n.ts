import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HOME_EN from "@locales/en/home.json";
import PRODUCT_EN from "@locales/en/product.json";
import CART_EN from "@locales/en/cart.json";
import PROFILE_EN from "@locales/en/profile.json";
import LOGIN_REGISTER_EN from "@locales/en/login_register.json";
import HOME_VI from "@locales/vi/home.json";
import PRODUCT_VI from "@locales/vi/product.json";
import CART_VI from "@locales/vi/cart.json";
import PROFILE_VI from "@locales/vi/profile.json";
import LOGIN_REGISTER_VI from "@locales/vi/login_register.json";
import { getLanguageFromLS } from "@utils/auth";

export const locales = {
  en: "English",
  vi: "Tiếng Việt",
} as const;

export const resources = {
  en: {
    home: HOME_EN,
    product: PRODUCT_EN,
    cart: CART_EN,
    profile: PROFILE_EN,
    "login-register": LOGIN_REGISTER_EN,
  },
  vi: {
    home: HOME_VI,
    product: PRODUCT_VI,
    cart: CART_VI,
    profile: PROFILE_VI,
    "login-register": LOGIN_REGISTER_VI,
  },
} as const;

export const defaultNS = "product";

i18n.use(initReactI18next).init({
  resources,
  lng: getLanguageFromLS(),
  ns: ["home", "product", "cart", "profile", "login-register"],
  fallbackLng: "vi",
  defaultNS,
  interpolation: {
    escapeValue: false,
  },
});
