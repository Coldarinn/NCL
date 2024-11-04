import { endpoints, httpClient, ACCESS_TOKEN } from "@/shared/api"

import { ILogin } from "./types"

interface LoginResponse {
  [ACCESS_TOKEN]: string
}

export const fetchLogin = async (body: ILogin) => {
  return await httpClient[endpoints.login.method]<LoginResponse, ILogin>(endpoints.login.endpoint, body)
}
