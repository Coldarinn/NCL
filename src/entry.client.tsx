import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  matchRoutes,
  RouterProvider,
} from "react-router-dom";

import { routes } from "./App.tsx";

hydrate();

async function hydrate() {
  let lazyMatches = matchRoutes(routes, window.location)?.filter(
    (m) => m.route.lazy
  );

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        let routeModule = await m.route.lazy!();
        Object.assign(m.route, { ...routeModule, lazy: undefined });
      })
    );
  }

  let router = createBrowserRouter(routes);

  ReactDOM.hydrateRoot(
    document.getElementById("app")!,
    <React.StrictMode>
      <RouterProvider router={router} fallbackElement={null} />
    </React.StrictMode>
  );
}
