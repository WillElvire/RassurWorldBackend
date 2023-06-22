import { AxiosRequestConfig } from "./../../../../node_modules/axios/index.d";
import axios from "axios";

const configs: AxiosRequestConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiPost = (url: string, data: any) => {
  return axios.post(url, data,configs);
};

export const apiGet = (url: string) => {
  return axios.get(url,configs);
};

export const apiPut = (url: string, data: any) => {
  return axios.put(url, data,configs);
};

export const apiDelete = (url: string, data: any) => {
  return axios.delete(url,configs);
};
