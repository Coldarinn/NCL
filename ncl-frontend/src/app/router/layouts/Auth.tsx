import { Outlet } from "react-router-dom"
import cls from "./Auth.module.scss"
import LoginImg from "@/shared/assets/images/login.png"
import LogoSvg from "@/shared/assets/icons/logo.svg"

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

        <Outlet />
      </div>
    </div>
  )
}
