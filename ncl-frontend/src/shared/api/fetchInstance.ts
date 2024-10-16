export const fetchInstance = async (endpoint: string, options: RequestInit = {}): Promise<Response> => {
  const url = `${process.env.BACKEND_URL}${endpoint}`

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || "Something went wrong")
  }

  return response
}
