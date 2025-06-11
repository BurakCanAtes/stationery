import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

import axiosInstance from "./axios";
import { IAuthResponse } from "../types/responses/user.type";
import { ISignUpRequest } from "../types/requests/user.type";
import { IGetCategoriesResponse } from "../types/responses/category.type";

/**
 * Fetches data from a given URL using axios and handles any errors.
 *
 * @template T
 * @param {string} url - The API endpoint to fetch data from.
 * @param {AxiosRequestConfig} [options={}] - Optional axios request configuration.
 * @returns {Promise<T>} - The data retrieved from the API.
 * @throws Will throw an error if the request fails.
 */
export const fetchData = async <T>(
  url: string,
  options: AxiosRequestConfig = {}
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, options);
    return response.data;
  } catch (error) {
    console.error("Error retrieving data:", error);
    throw new Error("Could not get data");
  }
};

/**
 * Sends a POST request to a given URL using axios and handles errors.
 *
 * @template T
 * @param {string} url - The API endpoint to post data to.
 * @param {Record<string, any>} options - The data to be sent in the POST request.
 * @param {AxiosRequestConfig<any>} [config] - The axios request config to be sent in the POST request.
 * @returns {Promise<T>} - The response data.
 * @throws Will throw an error if the request fails.
 */
export const postData = async <T>(
  url: string,
  options: Record<string, any>,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(
      url,
      options,
      config
    );
    return response.data;
  } catch (error) {
    console.error("Error posting data:", error);
    if (axios.isAxiosError(error)) {
      throw error;
    } else {
      throw new Error("Unknown error while request");
    }
  }
};

/**
 * Registers a new user using the provided information.
 *
 * @param {ISignUpRequest} user - The user's registration information.
 * @returns {Promise<IAuthResponse>} - The response after registration.
 */
export const signUp = async (user: ISignUpRequest): Promise<IAuthResponse> => {
  return postData<IAuthResponse>("/auth/register", {
    ...user,
  });
};

/**
 * Fetches all categories from the API.
 *
 * @returns {Promise<IGetCategoriesResponse>} - The response containing the category data.
 */
export const getCategories = async (): Promise<IGetCategoriesResponse> => {
  return await fetchData<IGetCategoriesResponse>("/categories");
};