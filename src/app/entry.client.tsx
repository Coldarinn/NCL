import React from "react";
import ReactDOM from "react-dom/client";
import { matchRoutes } from "react-router-dom";

import { routes } from "./router/routes";
import { Router } from "./router";

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

  ReactDOM.hydrateRoot(
    document.getElementById("app")!,
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  );
}
