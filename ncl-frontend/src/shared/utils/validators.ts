export const required = (value: string | Array<unknown>) => (!value || value.length === 0 ? "Required field" : undefined)

export const email = (value?: string) =>
  value === "" || value === undefined || /^[а-яА-Яa-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[а-яА-Яa-zA-Z0-9-]{2,}(?:\.[а-яА-Яa-zA-Z0-9-]{2,})+$/.test(value)
    ? undefined
    : "Incorrect email"

export const minCountChar = (min: number) => (value: string) =>
  value?.length < min ? `The number of characters must be greater than ${min - 1}` : undefined

export const maxCountChar = (max: number) => (value: string) =>
  value?.length > max ? `The number of characters must be less than ${max + 1}` : undefined

export const confirmPassword = (password1: string) => (password2: string) => (password1 === password2 ? undefined : "Passwords must match")

export const composeValidators =
  (...validators: Array<(value: string, allValue: object) => undefined | string>) =>
  (value: string, allValue: object) =>
    validators.reduce<undefined | string>((error, validator) => error || validator(value, allValue), undefined)
