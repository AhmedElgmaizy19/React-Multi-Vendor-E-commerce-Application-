import axios from "axios";
import Cookies from "js-cookie";
import { BaseURL } from "./axios";
import { getRefreshToken, isAccessTokenExpired, setAuthUser, logout } from "../utils/auth";

const axiosAuthInstance = axios.create({
    baseURL: BaseURL,
    timeout:5000,

    headers:{
        "Content-Type":'application/json',
        Accept: 'application/json'
        
    }
});

axiosAuthInstance.interceptors.request.use(async (req) => {
    let access_token = Cookies.get("access_token");
    const refresh_token = Cookies.get("refresh_token");

    if (!access_token || !refresh_token) {
        return req;
    }

    if (isAccessTokenExpired(access_token)) {
        try {
            const response = await getRefreshToken();
            access_token = response.access;
            setAuthUser(response.access, response.refresh);
        } catch (error) {
            console.error("Refresh token failed", error);
            await logout();
            window.location.href = "/login";
            return req;
        }
    }

    req.headers.Authorization = `Bearer ${access_token}`;
    return req;
});

axiosAuthInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            await logout();
            window.location.href = "/login";
        }
        return Promise.reject(error);
    }
);

export default axiosAuthInstance;


