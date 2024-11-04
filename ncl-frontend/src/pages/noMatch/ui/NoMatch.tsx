import { Link } from "react-router-dom"

import cls from "./NoMatch.module.scss"

export const NoMatch = () => {
  return (
    <div className={cls.wrapper}>
      <h2>Nothing to see here!</h2>
      <p>
        <Link to="/">Go to the home page</Link>
      </p>
    </div>
  )
}
