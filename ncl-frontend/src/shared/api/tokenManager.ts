import Cookies from "js-cookie"

export const ACCESS_TOKEN = "accessToken"
export const REFRESH_TOKEN = "refreshToken"

export const getAccessToken = (cookieHeader?: string | null) => {
  if (cookieHeader) {
    const cookies = new Map(cookieHeader.split("; ").map((c) => c.split("=") as [string, string]))

    return cookies.get(ACCESS_TOKEN) || null
  }

  return Cookies.get(ACCESS_TOKEN) || null
}

export const saveAccessToken = (accessToken: string) => {
  Cookies.set(ACCESS_TOKEN, accessToken, { domain: import.meta.env.VITE_DOMAIN, sameSite: "strict" })
}

export const removeFromStorage = () => {
  Cookies.remove(ACCESS_TOKEN)
}
