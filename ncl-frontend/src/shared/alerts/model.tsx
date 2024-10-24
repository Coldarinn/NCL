import { atom, action } from "@reatom/core"
import { IAlert } from "./types"
import { v4 as uuid } from "uuid"

export const alertsAtom = atom<IAlert[]>([], "alertsAtom")

export const addAlertAction = action((ctx, data: Omit<IAlert, "id">) => {
  const alert = {
    id: uuid(),
    ...data,
  }
  alertsAtom(ctx, (prevAlerts) => [...prevAlerts, alert])
}, "addAlertAction")

export const removeAlertAction = action((ctx, id: IAlert["id"]) => {
  alertsAtom(ctx, (prevAlerts) => prevAlerts.filter((alert) => alert.id !== id))
}, "removeAlertAction")
