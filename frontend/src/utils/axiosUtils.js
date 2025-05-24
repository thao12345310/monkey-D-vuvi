// utils/axiosHelper.js
import axios from "axios";
import config from "../config";
export const axiosRequest = async ({
    url,
    method = "GET",
    data = null,
    params = null,
    token = null,
    signal = null, // từ AbortController
    headers = {},
}) => {
    const finalHeaders = {
        "Content-Type": "application/json",
        ...headers,
    };

    if (token) {
        finalHeaders["Authorization"] = `Bearer ${token}`;
    }

    const fullUrl = url.startsWith("http") ? url : `${config.api.url}${url}`;

    const response = await axios({
        url: fullUrl,
        method,
        data,
        params,
        headers: finalHeaders,
        signal,
    });

    return response;
};
