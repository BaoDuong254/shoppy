import type { SuccessResponse } from "@/types/utils.type";
import type { Product, ProductList, ProductListConfig } from "@/types/product.type";
import http from "@utils/http";

const URL = "products";
const productApi = {
  /**
   * Fetches a list of products based on the provided configuration.
   *
   * @remarks
   * This method sends a GET request to the products endpoint with optional query parameters for pagination, sorting, filtering, etc.
   * It returns a SuccessResponse containing a ProductList object with the products and pagination information.
   *
   * @param params - The configuration for listing products, including pagination, sorting, and filtering options
   * @returns A promise that resolves to a SuccessResponse containing a ProductList object
   */
  getProducts(params: ProductListConfig) {
    return http.get<SuccessResponse<ProductList>>(URL, {
      params,
    });
  },
  /**
   * Fetches the details of a specific product by its ID.
   *
   * @remarks
   * This method sends a GET request to the products endpoint with the product ID.
   * It returns a SuccessResponse containing the Product object with detailed information about the product.
   *
   * @param id - The ID of the product to fetch details for
   * @returns A promise that resolves to a SuccessResponse containing the Product object
   */
  getProductDetail(id: string) {
    return http.get<SuccessResponse<Product>>(`${URL}/${id}`);
  },
};

export default productApi;
