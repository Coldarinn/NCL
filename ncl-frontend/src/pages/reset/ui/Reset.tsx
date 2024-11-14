import { Field, type FieldProps, Form, Formik, type FormikHelpers } from "formik"
import { Link } from "react-router-dom"

import { useNavigate } from "@/shared/router"
import { Button } from "@/shared/ui/Button"
import { InputField } from "@/shared/ui/Input"
import { composeValidators, email, required } from "@/shared/utils/validators"

import cls from "./Reset.module.scss"
import { fetchReset } from "../api"

interface IReset {
  email: string
}

export const Reset = () => {
  const initialValues: IReset = { email: "" }

  const navigate = useNavigate()

  const reset = async (values: IReset, { setSubmitting }: FormikHelpers<IReset>) => {
    await fetchReset(values)
      .then((response) => {
        if (response.data) {
          navigate("/auth/login")
        }
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Reset password</div>
      <div className={cls.body}>
        <Formik<IReset> initialValues={initialValues} onSubmit={reset}>
          {({ isSubmitting }) => (
            <Form className={cls.form}>
              <Field name="email" validate={composeValidators(required, email)}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>
              <Button type="submit" isLoading={isSubmitting}>
                Reset
              </Button>
            </Form>
          )}
        </Formik>
        <Link className={cls.goBack} to="/auth/login">
          Go back
        </Link>
      </div>
    </div>
  )
}
