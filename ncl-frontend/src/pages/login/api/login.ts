import { endpoints, httpClient } from "@/shared/api"
import { ILogin } from "./types"
import { ACCESS_TOKEN } from "@/shared/api"

interface LoginResponse {
  [ACCESS_TOKEN]: string
}

export const fetchLogin = async (body: ILogin) => {
  return await httpClient.post<LoginResponse, ILogin>(endpoints.login.endpoint, body)
}
