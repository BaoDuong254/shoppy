import type { Category } from "@/types/category.type";
import type { SuccessResponse } from "@/types/utils.type";
import http from "@utils/http";

const URL = "categories";

const categoryApi = {
  /**
   * Fetches all categories.
   *
   * @remarks
   * This method sends a GET request to the categories endpoint.
   * It returns a SuccessResponse containing an array of Category objects.
   *
   * @returns A promise that resolves to a SuccessResponse containing an array of Category objects
   */
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL);
  },
};

export default categoryApi;
