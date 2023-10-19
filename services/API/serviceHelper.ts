import axios, { Axios, AxiosRequestConfig } from "axios";
import { BASE_URI } from "./config";

interface APIResponse<T> {
  statusCode: number;
  message: string;
  result: T;
  timestamp: Date;
}

export const apiHelper = () => {
  const client: Axios = axios.create({
    baseURL: BASE_URI,
  });

  const _get = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    try {
      const response = await client.get<APIResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const _post = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    //console.log(BASE_URI);
    try {
      const response = await client.post<APIResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const _put = async <T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    try {
      const response = await client.put<APIResponse<T>>(url, data, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };
  const _delete = async <T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<APIResponse<T>> => {
    try {
      const response = await client.delete<APIResponse<T>>(url, config);
      return response.data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const Get = <T>(url: string, config?: AxiosRequestConfig) =>
    _get<T>(url, config);
  const Post = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    _post<T>(url, data, config);
  const Put = <T>(url: string, data?: any, config?: AxiosRequestConfig) =>
    _put<T>(url, data, config);
  const Delete = <T>(url: string, config?: AxiosRequestConfig) =>
    _delete<T>(url, config);

  return {
    Get,
    Post,
    Put,
    Delete,
  };
};
