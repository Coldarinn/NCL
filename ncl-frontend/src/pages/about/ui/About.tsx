import { removeAccessToken } from "@/shared/api/tokenManager"
import { Link, useNavigate } from "@/shared/router"

import cls from "./About.module.scss"

export const About = () => {
  const navigate = useNavigate()

  const logout = () => {
    removeAccessToken()
    navigate("/auth/login")
  }

  return (
    <div className={cls.wrapper}>
      <Link to="/">Go to Home Page</Link>
      <button type="button" className={cls.button} onClick={logout}>
        logout
      </button>
    </div>
  )
}
