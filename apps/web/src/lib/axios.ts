import axios, { AxiosInstance } from "axios";
import { getCookie } from "cookies-next";

export const api = axios.create({
  baseURL: "http://localhost:3333",
  withCredentials: true,
});
