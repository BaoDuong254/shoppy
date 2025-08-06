import type { AuthResponse } from "@/types/auth.type";
import http from "@utils/http";

export const URL_LOGIN = "login";
export const URL_REGISTER = "register";
export const URL_LOGOUT = "logout";
export const URL_REFRESH_TOKEN = "refresh-access-token";

const authApi = {
  /**
   * Registers a new user account.
   *
   * @remarks
   * This method sends a POST request to the registration endpoint with the user's email and password.
   * It returns an AuthResponse containing a message and data upon successful registration.
   *
   * @param body - The body should contain email and password for registration
   * @returns A promise that resolves to an AuthResponse containing the message and data
   */
  registerAccount(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_REGISTER, body);
  },
  /**
   * Logs in a user with their email and password.
   *
   * @remarks
   * This method sends a POST request to the login endpoint with the user's credentials.
   * It returns an AuthResponse containing a message and data upon successful login.
   *
   * @param body - The body should contain email and password for login
   * @returns A promise that resolves to an AuthResponse containing the message and data
   */
  login(body: { email: string; password: string }) {
    return http.post<AuthResponse>(URL_LOGIN, body);
  },
  /**
   * Logs out the current user.
   *
   * @remarks
   * This method sends a POST request to the logout endpoint.
   * It does not require any body and returns a promise that resolves to the response of the logout operation.
   *
   * @returns A promise that resolves to the response of the logout operation
   */
  logout() {
    return http.post(URL_LOGOUT);
  },
};

export default authApi;
