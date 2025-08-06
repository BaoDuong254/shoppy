import HttpStatusCode from "@constants/httpStatusCode";
import axios, { AxiosError } from "axios";
import userImage from "@assets/images/user.svg";
import type { ErrorResponse } from "@/types/utils.type";

/**
 * Checks if the provided error is an Axios error.
 *
 * @remarks
 * This function checks if the error is an instance of AxiosError.
 * It is useful for type narrowing in error handling.
 *
 * @param error - The error to check
 * @returns True if the error is an Axios error, false otherwise
 */
export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}

/**
 * Checks if the provided error is an Axios error with a specific status code.
 *
 * @remarks
 * This function checks if the error is an instance of AxiosError and has a specific status code.
 * It is useful for type narrowing in error handling.
 *
 * @param error - The error to check
 * @param statusCode - The HTTP status code to check against
 * @returns True if the error is an Axios error with the specified status code, false otherwise
 */
export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.UnprocessableEntity;
}

/**
 * Checks if the provided error is an Axios error with a specific status code.
 *
 * @remarks
 * This function checks if the error is an instance of AxiosError and has a specific status code.
 * It is useful for type narrowing in error handling.
 *
 * @param error - The error to check
 * @param statusCode - The HTTP status code to check against
 * @returns True if the error is an Axios error with the specified status code, false otherwise
 */
export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === HttpStatusCode.Unauthorized;
}

/**
 * Checks if the provided error is an Axios error with an expired token.
 *
 * @remarks
 * This function checks if the error is an instance of AxiosError and has a specific data structure indicating an expired token.
 * It is useful for type narrowing in error handling.
 *
 * @param error - The error to check
 * @returns True if the error is an Axios error with an expired token, false otherwise
 */
export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === "EXPIRED_TOKEN"
  );
}

/**
 * Sets the access token in local storage.
 *
 * @remarks
 * This function stores the access token in local storage under the key "access_token
 * It is used to persist the user's authentication state across sessions.
 *
 * @param accessToken - The access token to be stored
 */
export function formatCurrency(currency: number) {
  return new Intl.NumberFormat("de-DE").format(currency);
}

/**
 * Formats a number to a social media style string.
 *
 * @remarks
 * This function formats a number into a more readable string format commonly used in social media platforms.
 * It uses the `Intl.NumberFormat` API to convert large numbers into a compact format (e.g., "1.2K" for 1200).
 *
 * @param value - The number to format
 * @returns A formatted string representing the number in a social media style (e.g., "1.2K", "3.4M").
 */
export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  })
    .format(value)
    .replace(".", ",")
    .toLowerCase();
}

/**
 * Calculates the percentage of a sale based on the original and sale prices.
 *
 * @remarks
 * This function calculates the percentage of the discount applied to the original price.
 * It takes the original price and the sale price as inputs and returns a string representing the percentage of the discount.
 *
 * @param original - The original price before discount
 * @param sale - The sale price after discount
 * @returns A string representing the percentage of the discount applied to the original price.
 */
export const rateSale = (original: number, sale: number) => Math.round(((original - sale) / original) * 100) + "%";

/**
 * Removes special characters from a string.
 *
 * @remarks
 * This function takes a string and removes special characters from it.
 * It uses a regular expression to match and replace special characters with an empty string.
 *
 * @param str - The string to remove special characters from
 * @returns A new string with special characters removed
 */
const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, "");

/**
 * Generates a name and ID string.
 *
 * @remarks
 * This function takes an object with a name and an ID, removes special characters from the name,
 * and combines it with the ID in a specific format.
 *
 * @param param0 - An object containing a name and an id
 * @returns A string that combines the name and id in a specific format
 */
export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, "-") + `-i-${id}`;
};

/**
 * Extracts the ID from a name and ID string.
 *
 * @remarks
 * This function takes a name and ID string generated by `generateNameId` and extracts the ID part from it.
 * It splits the string by the "-i-" delimiter and returns the last part, which is the ID.
 *
 * @param nameId - The name and ID string to extract the ID from
 * @returns The extracted ID as a string
 */
export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split("-i-");
  return arr[arr.length - 1];
};

/**
 * Gets the URL for an avatar image.
 *
 * @remarks
 * This function takes an optional avatar name and returns the URL for the avatar image.
 * If no avatar name is provided, it returns a default user image URL.
 *
 * @param avatarName - The name of the avatar image file
 * @returns A URL to the avatar image, or a default user image if no name is provided
 */
export const getAvatarUrl = (avatarName?: string) => (avatarName ? avatarName : userImage);
