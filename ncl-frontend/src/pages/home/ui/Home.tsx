import { removeAccessToken } from "@/shared/api/tokenManager"
import cls from "./Home.module.scss"

import { Link, useNavigate } from "@/shared/router"

export const Home = () => {
  const navigate = useNavigate()

  const logout = () => {
    removeAccessToken()
    navigate("/auth/login")
  }

  return (
    <div className={cls.wrapper}>
      <Link to="/about">Go to About Page</Link>
      <button type="button" className={cls.button} onClick={logout}>
        logout
      </button>
    </div>
  )
}
