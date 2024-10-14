import { FieldProps } from "formik"
import { Input } from "./Input"
import { ComponentProps } from "react"

type Props = Pick<FieldProps, "field" | "meta"> & ComponentProps<typeof Input>

export const InputField = ({ meta, field, form, ...props }: Props) => {
  return <Input error={meta.touched ? meta.error : undefined} {...field} {...props} />
}
