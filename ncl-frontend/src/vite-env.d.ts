/// <reference types="vite-plugin-svgr/client" />
/// <reference types="vite/client" />

declare module "*.svg" {
  const content: React.FC<React.ComponentProps<"svg">>
  export = content
}
