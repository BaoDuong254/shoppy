import HttpStatusCode from "@constants/httpStatusCode";
import config from "src/constants/config";
import { http, HttpResponse } from "msw";

export const access_token_1s =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODlkZmFhYTcyYjRhZGQ5YWQzMmMyMyIsImVtYWlsIjoiZDMwMDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNlQwNjoxMDoyOC4xNjVaIiwiaWF0IjoxNzU0NDYwNjI4LCJleHAiOjE3NTQ0NjA2Mjl9.CZiUlIYHopWvpYp_9LzigvvVK931uWvAaz2-vGc7YdE";

export const refresh_token_1000days =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODlkZmFhYTcyYjRhZGQ5YWQzMmMyMyIsImVtYWlsIjoiZDMwMDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNlQwNjoxMDoyOC4xNjVaIiwiaWF0IjoxNzU0NDYwNjI4LCJleHAiOjE4NDA4NjA2Mjh9.TuvUfqXfFuizD_epddO4REkun5etZwlpB_AIB14FMEc";

const loginRes = {
  message: "Đăng nhập thành công",
  data: {
    access_token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODlkZmFhYTcyYjRhZGQ5YWQzMmMyMyIsImVtYWlsIjoiZDMwMDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNlQwNjowMzo0MS4wNjhaIiwiaWF0IjoxNzU0NDYwMjIxLCJleHAiOjE3NTUwNjUwMjF9.-mTXnaWCJwhSmXgOaYAleCEq2uKLu10wFn-S7HdigjE",
    expires: 604800,
    refresh_token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODlkZmFhYTcyYjRhZGQ5YWQzMmMyMyIsImVtYWlsIjoiZDMwMDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNlQwNjowMzo0MS4wNjhaIiwiaWF0IjoxNzU0NDYwMjIxLCJleHAiOjE3NjMxMDAyMjF9.Fb1EbMrnN8B8hzb_Wp0fuC2sm_v7v6jGn9EgDURrSOw",
    expires_refresh_token: 8640000,
    user: {
      _id: "6889dfaaa72b4add9ad32c23",
      roles: ["User"],
      email: "d3007@gmail.com",
      createdAt: "2025-07-30T09:02:34.647Z",
      updatedAt: "2025-08-05T07:55:54.367Z",
      __v: 0,
      address: "Ben Tre City",
      avatar: "https://api-ecom.duthanhduoc.com/images/839676bf-5124-454b-b3a0-6aa0e9656367.jpg",
      date_of_birth: "1990-01-02T17:00:00.000Z",
      name: "8",
      phone: "11111",
    },
  },
};

const refreshTokenRes = {
  message: "Refresh Token thành công",
  data: {
    access_token:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODlkZmFhYTcyYjRhZGQ5YWQzMmMyMyIsImVtYWlsIjoiZDMwMDdAZ21haWwuY29tIiwicm9sZXMiOlsiVXNlciJdLCJjcmVhdGVkX2F0IjoiMjAyNS0wOC0wNlQwNjoxMzo1Mi44MjBaIiwiaWF0IjoxNzU0NDYwODMyLCJleHAiOjE3NTUwNjU2MzJ9.rYz4-eUwt6w9WL46_8QxXOdJXJ_cRP4Z96l_28qM_hY",
  },
};

const loginRequest = http.post(`${config.baseUrl}login`, () => {
  return HttpResponse.json(loginRes, {
    status: HttpStatusCode.Ok,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

const refreshToken = http.post(`${config.baseUrl}refresh-access-token`, () => {
  return HttpResponse.json(refreshTokenRes, {
    status: HttpStatusCode.Ok,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

const authRequests = [loginRequest, refreshToken];

export default authRequests;
