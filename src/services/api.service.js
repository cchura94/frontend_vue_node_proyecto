import axios from "axios";

export const BASE_URL = "http://35.175.175.56:3000";
export const BASE_URL_API = `${BASE_URL}/api`;

export default function Api(){

    const token = localStorage.getItem("access_token");

    const api = axios.create({
        baseURL: BASE_URL_API,
        headers: {
            // 'Content-Type': 'application/json',
            'Authorization': 'Bearer '+token
        }
    });

    // interceptores
    api.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            // error de auth (401)
            if(error.response?.status === 401){
                console.log("INTERCEPTOR ERROR 401");
                localStorage.removeItem("access_token")
                location.href = "/auth/login"
            }
            // error de permisos (403)

            // error 500
            return Promise.reject(error);
        }
    );

    return api;
}