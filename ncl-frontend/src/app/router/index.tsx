import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { routes } from "./routes"

export const Router = () => {
  const router = createBrowserRouter(routes)

  return <RouterProvider router={router} fallbackElement={null} />
}
