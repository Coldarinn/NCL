import { ACCESS_TOKEN, endpoints, httpClient } from "@/shared/api"

import { IRegistration } from "./types"

interface RegistrationResponse {
  [ACCESS_TOKEN]: string
}

export const fetchRegistration = async (body: IRegistration) => {
  return await httpClient[endpoints.registration.method]<RegistrationResponse, IRegistration>(endpoints.registration.endpoint, body)
}
