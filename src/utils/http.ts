import HttpStatusCode from "@/constants/httpStatusCode";
import axios, { type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { clearAccessTokenFromLS, getAccessTokenFromLS, saveAccessTokenToLS } from "./auth";
import type { AuthResponse } from "@/types/auth.type";

class Http {
  instance: AxiosInstance;
  private accessToken: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });
    this.instance.interceptors.request.use((config) => {
      if (this.accessToken && config.headers) {
        config.headers.authorization = this.accessToken;
        return config;
      }
      return config;
    });
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          this.accessToken = (response.data as AuthResponse).data.access_token;
          saveAccessTokenToLS(this.accessToken);
        } else if (url === "/logout") {
          this.accessToken = "";
          clearAccessTokenFromLS();
        }
        return response;
      },
      function (error) {
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
