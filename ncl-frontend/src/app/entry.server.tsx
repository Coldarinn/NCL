import { createCtx } from "@reatom/core"
import { reatomContext } from "@reatom/npm-react"
import type * as express from "express"
import * as React from "react"
import ReactDOMServer from "react-dom/server"
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from "react-router-dom/server"

import { routes } from "./router/routes"

export const ctx = createCtx()

export async function render(request: express.Request, response: express.Response) {
  const { query, dataRoutes } = createStaticHandler(routes)
  const remixRequest = createFetchRequest(request, response)
  const context = await query(remixRequest)

  if (context instanceof Response) {
    throw context
  }

  const router = createStaticRouter(dataRoutes, context)
  return ReactDOMServer.renderToString(
    <React.StrictMode>
      <reatomContext.Provider value={ctx}>
        <StaticRouterProvider router={router} context={context} nonce="the-nonce" />
      </reatomContext.Provider>
    </React.StrictMode>
  )
}

export function createFetchRequest(req: express.Request, res: express.Response): Request {
  const origin = `${req.protocol}://${req.get("host")}`
  const url = new URL(req.originalUrl || req.url, origin)

  const controller = new AbortController()
  res.on("close", () => controller.abort())

  const headers = new Headers()

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value)
        }
      } else {
        headers.set(key, values)
      }
    }
  }

  const init: RequestInit = {
    method: req.method,
    headers,
    signal: controller.signal,
  }

  if (req.method !== "GET" && req.method !== "HEAD") {
    init.body = req.body
  }

  return new Request(url.href, init)
}
