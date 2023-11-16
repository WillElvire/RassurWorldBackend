import { AxiosRequestConfig } from "./../../../../node_modules/axios/index.d";
import axios from "axios";

export const configs: AxiosRequestConfig  = {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${process.env.BIZAO_ACCESS_TOKEN}`,
    "country-code" : "ci",
    "lang" : "fr",
    "channel" : "web"
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
