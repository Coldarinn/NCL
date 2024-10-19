import { fileURLToPath } from "url"
import path from "path"
import fsp from "fs/promises"
import express from "express"
import dotenv from "dotenv"

dotenv.config()

let root = process.cwd()
let isProduction = process.env.NODE_ENV === "production"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
function resolve(p) {
  return path.resolve(__dirname, p)
}

async function createServer() {
  let app = express()
  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite

  if (isProduction) {
    app.use((await import("compression")).default())
    app.use(express.static(resolve("dist/client")))
  } else {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      appType: "custom",
      server: { middlewareMode: "ssr" },
    })

    app.use(vite.middlewares)
  }

  app.use("*", async (req, res) => {
    let url = req.originalUrl

    try {
      let template
      let render

      if (isProduction) {
        template = await fsp.readFile(resolve("dist/client/index.html"), "utf8")
        render = await import("./dist/server/entry.server.js").then((m) => m.render)
      } else {
        template = await fsp.readFile(resolve("index.html"), "utf8")
        template = await vite.transformIndexHtml(url, template)
        render = await vite.ssrLoadModule("src/app/entry.server.tsx").then((m) => m.render)
      }

      try {
        let appHtml = await render(req, res)
        let html = template.replace("<!--app-html-->", appHtml)
        res.setHeader("Content-Type", "text/html")

        return res.status(200).end(html)
      } catch (e) {
        if (e instanceof Response && e.status >= 300 && e.status <= 399) {
          return res.redirect(e.status, e.headers.get("Location"))
        }
        throw e
      }
    } catch (error) {
      if (!isProduction) {
        vite.ssrFixStacktrace(error)
      }
      console.log(error.stack)
      res.status(500).end(error.stack)
    }
  })

  return app
}

createServer().then((app) => app.listen(process.env.PORT, () => console.log(`HTTP server is running at http://localhost:${process.env.PORT}`)))
