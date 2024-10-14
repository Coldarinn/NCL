import { Link } from "react-router-dom"
import cls from "./Login.module.scss"
import { Input } from "@/shared/ui/Input"

export const Login = () => {
  return (
    <div className={cls.wrapper}>
      <div className={cls.header}>
        <div className={cls.title}>Sign in</div>
        <div className={cls.subtitle}>
          <div>If you don’t have an account register</div>
          <div>
            You can <Link to="/auth/register">Register here!</Link>
          </div>
        </div>
      </div>
      <div className={cls.body}>
        <form className={cls.form} onSubmit={(e) => e.preventDefault()}>
          <Input label="Login" placeholder="Email or phone number" />
          <Input type="password" label="Password" placeholder="Enter password" />

          <button type="submit">sign in</button>
        </form>
        <div className={cls.anotherLogin}></div>
      </div>
    </div>
  )
}
