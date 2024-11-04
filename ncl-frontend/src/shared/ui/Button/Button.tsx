import classNames from "classnames"
import { ButtonHTMLAttributes, FC } from "react"

import cls from "./Button.module.scss"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button: FC<ButtonProps> = ({ isLoading = false, disabled = false, children, className, ...props }) => {
  const isDisabled = isLoading || disabled

  return (
    <button
      className={classNames(cls.button, className, {
        [cls.loading]: isLoading,
        [cls.disabled]: isDisabled,
      })}
      disabled={isDisabled}
      {...props}
    >
      {children}
      {isLoading && (
        <div className={cls.loaderWrapper}>
          <div className={cls.loader} />
        </div>
      )}
    </button>
  )
}
