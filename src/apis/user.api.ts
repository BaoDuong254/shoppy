import type { User } from "@/types/user.type";
import type { SuccessResponse } from "@/types/utils.type";
import http from "@utils/http";

interface BodyUpdateProfile extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
  password?: string;
  newPassword?: string;
}

const userApi = {
  /**
   * Fetches the profile of the current user.
   *
   * @remarks
   * This method sends a GET request to the 'me' endpoint to retrieve the user's profile information.
   * It returns a SuccessResponse containing the User object with the user's details.
   *
   * @returns A promise that resolves to a SuccessResponse containing the User object
   */
  getProfile() {
    return http.get<SuccessResponse<User>>("me");
  },
  /**
   * Updates the profile of the current user.
   *
   * @remarks
   * This method sends a PUT request to the 'user' endpoint with the updated user information.
   * It returns a SuccessResponse containing the updated User object upon successful update.
   *
   * @param body - The body should contain the updated user information
   * @returns A promise that resolves to a SuccessResponse containing the updated User object
   */
  updateProfile(body: BodyUpdateProfile) {
    return http.put<SuccessResponse<User>>("user", body);
  },
  /**
   * Uploads an avatar for the current user.
   *
   * @remarks
   * This method sends a POST request to the 'user/upload-avatar' endpoint with the avatar file in FormData format.
   * It returns a SuccessResponse containing the URL of the uploaded avatar upon successful upload.
   *
   * @param body - The body should contain the FormData with the avatar file
   * @returns A promise that resolves to a SuccessResponse containing the URL of the uploaded avatar
   */
  uploadAvatar(body: FormData) {
    return http.post<SuccessResponse<string>>("user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userApi;
