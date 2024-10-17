import { endpoints, httpClient } from "@/shared/api"
import { ILogin } from "./types"

export const fetchLogin = async (body: ILogin) => {
  const response = await httpClient.post(endpoints.login.endpoint, body)
  console.log("response: ", response)
}
