import { RouteObject } from "react-router-dom"
import { Layout } from "./layouts/Default"
import { Auth } from "./layouts/Auth"
import { NoMatch } from "./NoMatch"
import { Login } from "@/pages/login"
import { Registration } from "@/pages/registration"
import { Reset } from "@/pages/reset"
import { Home } from "@/pages/home"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NoMatch />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    children: [
      {
        path: "/auth/login",
        element: <Login />,
      },
      {
        path: "/auth/registration",
        element: <Registration />,
      },
      {
        path: "/auth/reset",
        element: <Reset />,
      },
    ],
  },
]
