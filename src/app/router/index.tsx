import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";

export const Router = () => {
  let router = createBrowserRouter(routes);

  return <RouterProvider router={router} fallbackElement={null} />;
};
