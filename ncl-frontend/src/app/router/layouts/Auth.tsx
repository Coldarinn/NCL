import { Outlet } from "react-router-dom"

import { Alerts } from "@/shared/alerts"
import LogoSvg from "@/shared/assets/icons/logo.svg"
import LoginImg from "@/shared/assets/images/login.png"

import cls from "./Auth.module.scss"

export const Auth = () => {
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

        <Alerts />

        <Outlet />
      </div>
    </div>
  )
}
