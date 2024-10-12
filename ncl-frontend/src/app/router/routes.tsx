import { RouteObject } from "react-router-dom"
import { Home } from "../../pages/home"
import { Layout } from "./layouts/Default"
import { NoMatch } from "./NoMatch"
import { Auth } from "./layouts/Auth"
import { Login } from "../../pages/login"
import { Registration } from "../../pages/registration"

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
    ],
  },
]
