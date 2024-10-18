import { RouteObject } from "react-router-dom"
import { Layout } from "./layouts/Default"
import { Auth } from "./layouts/Auth"
import { Login } from "@/pages/login"
import { Registration } from "@/pages/registration"
import { Reset } from "@/pages/reset"
import { Home } from "@/pages/home"
import { AppRoutes } from "@/shared/router"
import { NoMatch } from "@/pages/noMatch"

export const routes: RouteObject[] = [
  {
    path: "/" satisfies keyof AppRoutes,
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/auth" satisfies keyof AppRoutes,
    element: <Auth />,
    children: [
      {
        path: "/auth/login" satisfies keyof AppRoutes,
        element: <Login />,
      },
      {
        path: "/auth/registration" satisfies keyof AppRoutes,
        element: <Registration />,
      },
      {
        path: "/auth/reset" satisfies keyof AppRoutes,
        element: <Reset />,
      },
    ],
  },
  {
    path: "*",
    element: <NoMatch />,
  },
]
