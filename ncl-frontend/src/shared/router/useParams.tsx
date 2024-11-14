import { useParams as useReactRouterParams } from "react-router-dom"

import { AppRoutes } from "./types"

export function useParams<Path extends keyof AppRoutes>(_path: Path): AppRoutes[Path] {
  const params = useReactRouterParams() as AppRoutes[Path]
  return params
}
