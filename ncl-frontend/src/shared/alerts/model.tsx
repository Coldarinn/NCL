import { atom, action } from "@reatom/core"
import { IAlert } from "./types"
import { v4 as uuid } from "uuid"

export const alertsAtom = atom<IAlert[]>([], "alertsAtom")

export const addAlert = action((ctx, data: Omit<IAlert, "id">) => {
  const alert = {
    id: uuid(),
    ...data,
  }

  setTimeout(() => {
    removeAlert(ctx, alert.id)
  }, alert.timeout)

  alertsAtom(ctx, (prevAlerts) => [...prevAlerts, alert])
}, "addAlert")

export const removeAlert = action((ctx, id: IAlert["id"]) => {
  alertsAtom(ctx, (prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
}, "removeAlert")
