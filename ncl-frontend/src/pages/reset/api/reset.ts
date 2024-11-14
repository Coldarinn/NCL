import { endpoints, httpClient } from "@/shared/api"

import { IReset } from "./types"

export const fetchReset = async (body: IReset) => {
  return await httpClient[endpoints.reset.method](endpoints.reset.endpoint, body)
}
