import { Link as ReactRouterLink, LinkProps as ReactRouterLinkProps } from "react-router-dom"
import { AppRoutes } from "./types"

type CustomLinkProps<Path extends keyof AppRoutes> = Omit<ReactRouterLinkProps, "to"> & {
  to: Path
  params?: AppRoutes[Path]
}

export function Link<Path extends keyof AppRoutes>({ to, params, ...rest }: CustomLinkProps<Path>) {
  const path = params ? Object.entries(params).reduce((acc, [key, value]) => acc.replace(`:${key}`, value as string), to as string) : to

  return <ReactRouterLink to={path} {...rest} />
}
