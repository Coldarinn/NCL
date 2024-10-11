import { RouteObject } from "react-router-dom";
import { Home } from "../../pages/home";
import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";

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
];
