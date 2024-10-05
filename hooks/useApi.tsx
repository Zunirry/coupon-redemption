import axios from "axios";
import { useCallback, useState } from "react";

export const baseURL = process.env.NEXT_PUBLIC_API_URL as string;

export const config = () => {
  return {
    headers: {
      "Content-Type": "application/json",
    },
  };
};

export const api = <T,>(method: string, url: string, obj = {}): Promise<T> => {
  switch (method) {
    case "GET":
      return axios.get<T>(`${baseURL}${url}`, config()).then((res) => res.data);
    case "POST":
      return axios
        .post<T>(`${baseURL}${url}`, obj, config())
        .then((res) => res.data);
    case "PUT":
      return axios
        .put<T>(`${baseURL}${url}`, obj, config())
        .then((res) => res.data);
    case "PATCH":
      return axios
        .patch<T>(`${baseURL}${url}`, obj, config())
        .then((res) => res.data);
    case "DELETE":
      return axios
        .delete<T>(`${baseURL}${url}`, config())
        .then((res) => res.data);
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
};

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface ApiHookParams {
  method: Method;
  url: string;
}

export const useApi = <T,>({ method, url }: ApiHookParams) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = useCallback(
    async (body: object = {}) => {
      setIsLoading(true);
      try {
        const result = await api<T>(method, url, body);
        setData(result);
        setError(null);
        return result;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(error.message);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  return { data, isLoading, error, execute };
};
