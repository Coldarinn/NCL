export const endpoints = {
  login: {
    endpoint: "/auth/login",
    method: "POST",
  },
  refresh: {
    endpoint: "/auth/refresh",
    method: "POST",
  },
} as const
