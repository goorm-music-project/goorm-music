import axios from "axios";
import { getCookie } from "../cookieUtils";
import { getPublicAccessToken } from "../getPublicAccessToken";

const appAxios = axios.create({
  baseURL: "",
  withCredentials: true,
});

appAxios.interceptors.request.use(
  async (config) => {
    let token = getCookie("public_access_token");
    if (!token) {
      token = await getPublicAccessToken();
    }

    if (config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export default appAxios;
