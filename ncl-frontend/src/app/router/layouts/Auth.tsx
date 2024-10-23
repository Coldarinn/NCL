import cls from "./Auth.module.scss"

import { Outlet } from "react-router-dom"
import LoginImg from "@/shared/assets/images/login.png"
import LogoSvg from "@/shared/assets/icons/logo.svg"
import { Alerts, addAlert as addAlertAction } from "@/shared/alerts"
import { useAction } from "@reatom/npm-react"

export const Auth = () => {
  const addAlert = useAction(addAlertAction)
  const handleShowAlert = () => {
    addAlert({ message: "Это успешное сообщение!", type: "success", timeout: 5000 })
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.left}>
        <img src={LoginImg} />
      </div>
      <div className={cls.right}>
        <div className={cls.title}>
          <LogoSvg />
          <span>NCL</span>
        </div>

        <button onClick={handleShowAlert}>Показать алерт</button>
        <Alerts />

        <Outlet />
      </div>
    </div>
  )
}
