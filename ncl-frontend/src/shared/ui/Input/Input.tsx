import { FC, InputHTMLAttributes, ReactNode, useRef, useState } from "react"
import cls from "./Input.module.scss"

import EyeIcon from "@/shared/assets/icons/eye.svg"
import classNames from "classnames"
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  rightAddons?: ReactNode
  error?: ReactNode
  withError?: boolean
}

export const Input: FC<InputProps> = ({ label, rightAddons, error, withError, className, ...props }) => {
  const rightAddonsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const isPassword = props.type === "password"
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)

  let isCalled = false
  useIsomorphicLayoutEffect(() => {
    if (!isCalled && rightAddonsRef.current && inputRef.current) {
      isCalled = true

      const addonsWidth = rightAddonsRef.current.offsetWidth
      inputRef.current.style.paddingRight = `${parseFloat(window.getComputedStyle(inputRef.current).paddingRight) + addonsWidth + 4}px`
    }
  }, [])

  return (
    <div className={classNames(cls.wrapper, className)}>
      <label className={cls.label}>{label}</label>
      <div className={cls.inputContainer}>
        <input className={cls.input} ref={inputRef} {...props} type={isPassword ? (isPasswordHidden ? "password" : "text") : props.type || "text"} />
        {(rightAddons || isPassword) && (
          <div className={cls.rightAddons} ref={rightAddonsRef}>
            {rightAddons}
            {isPassword && (
              <button className={cls.passwordButton} type="button" onClick={() => setIsPasswordHidden(!isPasswordHidden)} disabled={props.disabled}>
                <EyeIcon className={classNames(cls.passwordIcon, { [cls.hidden]: isPasswordHidden })} />
              </button>
            )}
          </div>
        )}
      </div>
      {(error || withError) && <div className={cls.error}>{error}</div>}
    </div>
  )
}
