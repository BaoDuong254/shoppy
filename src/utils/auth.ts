import type { User } from "@/types/user.type";

export const LocalStorageEventTarget = new EventTarget();

/**
 * Sets the access token in local storage.
 *
 * @remarks
 * This function stores the access token in local storage under the key "access_token".
 * It is used for authenticating API requests.
 *
 * @param access_token - Access token for authentication
 */
export const setAccessTokenToLS = (access_token: string) => {
  localStorage.setItem("access_token", access_token);
};

/**
 * Sets the refresh token in local storage.
 *
 * @remarks
 * This function stores the refresh token in local storage under the key "refresh_token".
 * It is used to obtain a new access token when the current one expires.
 *
 * @param refresh_token - Refresh token for renewing access tokens
 */
export const setRefreshTokenToLS = (refresh_token: string) => {
  localStorage.setItem("refresh_token", refresh_token);
};

/**
 * Sets the language preference in local storage.
 *
 * @remarks
 * This function stores the user's language preference in local storage under the key "language".
 * It is used to determine the language for displaying content in the application.
 *
 * @param language - Language code, either "en" for English or "vi" for Vietnamese
 */
export const setLanguageToLS = (language: "en" | "vi") => {
  localStorage.setItem("language", language);
};

/**
 * Clears all authentication-related data from local storage.
 *
 * @remarks
 * This function removes the access token, refresh token, language preference, and user profile
 * from local storage. It also dispatches a custom event to notify other parts of the application
 * that the local storage has been cleared.
 */
export const clearLS = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("profile");
  const clearLSEvent = new Event("clearLS");
  LocalStorageEventTarget.dispatchEvent(clearLSEvent);
};

/**
 * Retrieves the access token from local storage.
 *
 * @remarks
 * This function retrieves the access token stored in local storage under the key "access_token".
 * If no access token is found, it returns an empty string.
 */
export const getAccessTokenFromLS = () => localStorage.getItem("access_token") || "";

/**
 * Retrieves the refresh token from local storage.
 *
 * @remarks
 * This function retrieves the refresh token stored in local storage under the key "refresh_token".
 * If no refresh token is found, it returns an empty string.
 */
export const getRefreshTokenFromLS = () => localStorage.getItem("refresh_token") || "";

/**
 * Retrieves the language preference from local storage.
 *
 * @remarks
 * This function retrieves the user's language preference stored in local storage under the key "language".
 * If no language preference is found, it defaults to "vi" (Vietnamese).
 */
export const getLanguageFromLS = () => {
  const language = localStorage.getItem("language");
  return language ? (language as "en" | "vi") : "vi";
};

/**
 * Retrieves the user profile from local storage.
 *
 * @remarks
 * This function retrieves the user profile stored in local storage under the key "profile".
 * If no profile is found, it returns null.
 *
 * @returns The user profile or null if not found
 */
export const getProfileFromLS = () => {
  const result = localStorage.getItem("profile");
  return result ? JSON.parse(result) : null;
};

/**
 * Sets the user profile in local storage.
 *
 * @remarks
 * This function stores the user profile in local storage under the key "profile".
 * It is used to persist user information across sessions.
 *
 * @param profile - User profile object to be stored
 */
export const setProfileToLS = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile));
};
