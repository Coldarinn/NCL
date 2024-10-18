import { Link } from "@/shared/router"
import cls from "./Home.module.scss"

export const Home = () => {
  return (
    <div className={cls.wrapper}>
      <Link to="/auth/login">Go to Login Page</Link>
    </div>
  )
}
