import { useAction, useAtom } from "@reatom/npm-react"
import classNames from "classnames"
import { useEffect, useState } from "react"

import CrossIcon from "@/shared/assets/icons/cross.svg"

import styles from "./Alerts.module.scss"
import { alertsAtom, Assss, removeAlertAction } from "./model"
import { IAlert } from "./types"

export const Alerts = () => {
  const [alerts] = useAtom(alertsAtom)

  return (
    <div className={styles.wrapper}>
      {alerts.map((alert) => (
        <AlertItem key={alert.id} alert={alert} />
      ))}
      <Assss />
    </div>
  )
}

const percentsStep = 2
const AlertItem = ({ alert }: { alert: IAlert }) => {
  const [progress, setProgress] = useState(100)
  const [isPaused, setIsPaused] = useState(false)

  const removeAlert = useAction(removeAlertAction)

  useEffect(() => {
    if (progress === 0) {
      removeAlert(alert.id)
      return
    }

    const interval = setInterval(
      () => {
        if (!isPaused) {
          setProgress((prev) => Math.max(prev - percentsStep, 0))
        }
      },
      ((alert.timeout || 5000) * percentsStep) / 100
    )

    return () => clearInterval(interval)
  }, [isPaused, progress, alert.timeout, removeAlert, alert.id])

  return (
    <div
      className={classNames(styles.alert, styles[alert.type])}
      onMouseOver={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <span>{alert.message}</span>
      <button onClick={() => removeAlert(alert.id)} className={styles.closeButton}>
        <CrossIcon />
      </button>
      <div className={styles.progressBar} style={{ width: `${progress}%` }} />
    </div>
  )
}
