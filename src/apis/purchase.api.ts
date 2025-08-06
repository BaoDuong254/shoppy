import type { Purchase, PurchaseListStatus } from "@/types/purchase.type";
import type { SuccessResponse } from "@/types/utils.type";
import http from "@utils/http";

const URL = "purchases";

const purchaseApi = {
  /**
   * Adds a product to the cart.
   *
   * @remarks
   * This method sends a POST request to the add-to-cart endpoint with the product ID and buy count.
   * It returns a SuccessResponse containing the Purchase object upon successful addition.
   *
   * @param body - The body should contain product_id and buy_count for adding to cart
   * @returns A promise that resolves to a SuccessResponse containing the Purchase object
   */
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body);
  },
  /**
   * Fetches all purchases based on the provided status.
   *
   * @remarks
   * This method sends a GET request to the purchases endpoint with the status as a query parameter.
   * It returns a SuccessResponse containing an array of Purchase objects.
   *
   * @param params - The parameters should include the status of purchases to fetch
   * @returns A promise that resolves to a SuccessResponse containing an array of Purchase objects
   */
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<SuccessResponse<Purchase[]>>(`${URL}`, {
      params,
    });
  },
  /**
   * Buys products in the cart.
   *
   * @remarks
   * This method sends a POST request to the buy-products endpoint with an array of product IDs and their respective buy counts.
   * It returns a SuccessResponse containing an array of Purchase objects upon successful purchase.
   *
   * @param body - The body should contain an array of product_id and buy_count for each product to be purchased
   * @returns A promise that resolves to a SuccessResponse containing an array of Purchase objects
   */
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body);
  },
  /**
   * Updates the purchase details in the cart.
   *
   * @remarks
   * This method sends a PUT request to the update-purchase endpoint with the product ID and buy count.
   * It returns a SuccessResponse containing the updated Purchase object upon successful update.
   *
   * @param body - The body should contain product_id and buy_count for updating the purchase
   * @returns A promise that resolves to a SuccessResponse containing the updated Purchase object
   */
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body);
  },
  /**
   * Deletes purchases based on the provided purchase IDs.
   *
   * @remarks
   * This method sends a DELETE request to the purchases endpoint with an array of purchase IDs.
   * It returns a SuccessResponse containing the count of deleted purchases upon successful deletion.
   *
   * @param purchaseIds - An array of purchase IDs to be deleted
   * @returns A promise that resolves to a SuccessResponse containing the count of deleted purchases
   */
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds,
    });
  },
};

export default purchaseApi;
