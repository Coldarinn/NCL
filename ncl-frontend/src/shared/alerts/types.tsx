export interface IAlert {
  id: string
  message: string
  type: "success" | "error" | "info" | "warning"
  timeout?: number
}
