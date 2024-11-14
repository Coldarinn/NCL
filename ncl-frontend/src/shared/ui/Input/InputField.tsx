import { type FieldProps } from "formik"
import { ComponentProps } from "react"

import { Input } from "./Input"

type Props = Pick<FieldProps, "field" | "meta"> & ComponentProps<typeof Input>

export const InputField = ({ meta, field, ...props }: Props) => {
  return <Input error={meta.touched ? meta.error : undefined} {...field} {...props} />
}
