import HttpStatusCode from "@constants/httpStatusCode";
import { access_token_1s } from "./auth.msw";
import config from "@constants/config";
import { http, HttpResponse } from "msw";

const meRes = {
  message: "Lấy người dùng thành công",
  data: {
    _id: "6889dfaaa72b4add9ad32c23",
    roles: ["User"],
    email: "d3007@gmail.com",
    createdAt: "2025-07-30T09:02:34.647Z",
    updatedAt: "2025-08-05T07:55:54.367Z",
    address: "Ben Tre City",
    avatar: "https://api-ecom.duthanhduoc.com/images/839676bf-5124-454b-b3a0-6aa0e9656367.jpg",
    date_of_birth: "1990-01-02T17:00:00.000Z",
    name: "8",
    phone: "11111",
  },
};

const meRequest = http.get(`${config.baseUrl}me`, (info) => {
  const access_token = info.request.headers.get("authorization");
  if (access_token === access_token_1s) {
    return HttpResponse.json(
      {
        message: "Lỗi",
        data: {
          message: "Token hết hạn",
          name: "EXPIRED_TOKEN",
        },
      },
      {
        status: HttpStatusCode.Unauthorized,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
  return HttpResponse.json(meRes, {
    status: HttpStatusCode.Ok,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
});

const userRequests = [meRequest];

export default userRequests;
