import { createCtx } from "@reatom/core"
import { reatomContext } from "@reatom/npm-react"
import React from "react"
import ReactDOM from "react-dom/client"
import { matchRoutes } from "react-router-dom"

import { Router } from "./router"
import { routes } from "./router/routes"

const ctx = createCtx()

hydrate()

async function hydrate() {
  const lazyMatches = matchRoutes(routes, window.location)?.filter((m) => m.route.lazy)

  if (lazyMatches && lazyMatches?.length > 0) {
    await Promise.all(
      lazyMatches.map(async (m) => {
        const routeModule = await m.route.lazy!()
        Object.assign(m.route, { ...routeModule, lazy: undefined })
      })
    )
  }

  ReactDOM.hydrateRoot(
    document.getElementById("app")!,
    <React.StrictMode>
      <reatomContext.Provider value={ctx}>
        <Router />
      </reatomContext.Provider>
    </React.StrictMode>
  )
}

// comment for check ci 3
