import { useEffect, useState } from "react"
import { alertsAtom, removeAlert as removeAlertAction } from "./model"
import styles from "./Alerts.module.scss"
import { IAlert } from "./types"
import { useAction, useAtom } from "@reatom/npm-react"
import classNames from "classnames"

export const Alerts = () => {
  const [alerts] = useAtom(alertsAtom)

  return (
    <div className={styles.wrapper}>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
    </div>
  )
}

const percentsStep = 2
const AlertItem = ({ alert }: { alert: IAlert }) => {
  const [progress, setProgress] = useState(100)

  const removeAlert = useAction(removeAlertAction)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setProgress((prev) => Math.max(prev - percentsStep, 0))
      },
      ((alert.timeout || 5000) * percentsStep) / 100
    )

    return () => clearInterval(interval)
  }, [alert.timeout])

  return (
    <div className={classNames(styles.alert, styles[alert.type])}>
      <span>{alert.message}</span>
      <button onClick={() => removeAlert(alert.id)} className={styles.closeButton}>
        x
      </button>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  )
}
