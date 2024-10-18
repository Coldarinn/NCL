import { endpoints, httpClient } from "@/shared/api"
import { ILogin } from "./types"
import { ACCESS_TOKEN } from "@/shared/api"
import Cookies from "js-cookie"

interface LoginResponse {
  [ACCESS_TOKEN]: string
}

export const fetchLogin = async (body: ILogin) => {
  const response = await httpClient.post<LoginResponse, ILogin>(endpoints.login.endpoint, body)
  if (response.data) {
    Cookies.set(ACCESS_TOKEN, response.data?.accessToken, { domain: import.meta.env.VITE_DOMAIN, sameSite: "strict" })
  }
}
