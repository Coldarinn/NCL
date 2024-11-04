import { useNavigate as useReactRouterNavigate } from "react-router-dom"

import { AppRoutes } from "./types"

export function useNavigate() {
  const navigate = useReactRouterNavigate()

  return <Path extends keyof AppRoutes>(path: Path, params?: AppRoutes[Path]) => {
    const fullPath = params ? Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value as string), path as string) : path

    navigate(fullPath)
  }
}
