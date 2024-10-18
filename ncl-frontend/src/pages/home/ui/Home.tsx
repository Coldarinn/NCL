import cls from "./Home.module.scss"

import { Link } from "@/shared/router"

export const Home = () => {
  return (
    <div className={cls.wrapper}>
      <Link to="/auth/login">Go to Login Page</Link>
    </div>
  )
}
