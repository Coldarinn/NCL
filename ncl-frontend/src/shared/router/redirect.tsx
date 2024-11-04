import { redirect as reactRouterRedirect } from "react-router-dom"

import { AppRoutes } from "./types"

type RedirectPath<Path extends keyof AppRoutes> = {
  to: Path
  params?: AppRoutes[Path]
}

export function redirect<Path extends keyof AppRoutes>({ to, params }: RedirectPath<Path>) {
  const path = params ? Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value as string), to as string) : to

  return reactRouterRedirect(path)
}
