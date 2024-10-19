export const endpoints = {
  login: {
    endpoint: "/auth/login",
    method: "POST",
  },
  registration: {
    endpoint: "/auth/registration",
    method: "POST",
  },
  refresh: {
    endpoint: "/auth/refresh",
    method: "POST",
  },
  reset: {
    endpoint: "/auth/reset",
    method: "POST",
  },
} as const
