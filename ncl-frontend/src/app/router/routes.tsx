import { RouteObject } from "react-router-dom"
import { Auth } from "./layouts/Auth"
import { Login } from "@/pages/login"
import { Registration } from "@/pages/registration"
import { Reset } from "@/pages/reset"
import { Home } from "@/pages/home"
import { redirect } from "@/shared/router"
import { NoMatch } from "@/pages/noMatch"
import { getAccessToken } from "@/shared/api"
import { Layout } from "./layouts/Default"

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    loader: () => {
      if (!getAccessToken()) {
        return redirect({ to: "/auth/login" })
      }
      return null
    },
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth",
    element: <Auth />,
    loader: () => {
      if (getAccessToken()) {
        return redirect({ to: "/" })
      }
      return null
    },
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
  {
    path: "*",
    element: <NoMatch />,
  },
]
