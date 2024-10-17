import { endpoints } from "./endpoints"
import { ACCESS_TOKEN, getAccessToken, removeFromStorage, saveAccessToken } from "./tokenManager"

export const fetchInstance = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const url = `${import.meta.env.VITE_BACKEND_URL}/api${endpoint}`

  const token = getAccessToken()

  let response = await fetch(url, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData: { message: string; statusCode: number } = await response.json()

    if (errorData.statusCode === 401 && errorData.message !== "Invalid password") {
      const refreshResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api${endpoints.refresh.endpoint}`, {
        method: endpoints.refresh.method,
        credentials: "include",
      })

      if (refreshResponse.ok) {
        const { accessToken }: { [ACCESS_TOKEN]: string } = await refreshResponse.json()
        saveAccessToken(accessToken)

        response = await fetch(url, {
          ...options,
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
            ...options.headers,
          },
        })
      } else {
        removeFromStorage()

        const refreshErrorData = await response.json()
        throw new Error(refreshErrorData.message || "Anauthorized")
      }
    } else {
      throw new Error(errorData.message || "Something went wrong")
    }
  }

  return response
}
