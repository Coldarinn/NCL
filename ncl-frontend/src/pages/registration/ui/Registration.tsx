import cls from "./Registration.module.scss"

import { InputField } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { composeValidators, confirmPassword, email, minCountChar, required } from "@/shared/utils/validators"
import { fetchRegistration, IRegistration } from "../api"
import { Link, useNavigate } from "@/shared/router"
import { saveAccessToken } from "@/shared/api/tokenManager"

type TRegistration = IRegistration & {
  confirmPassword: string
}

export const Registration = () => {
  const initialValues: TRegistration = { email: "", password: "", confirmPassword: "" }

  const navigate = useNavigate()

  const registration = async (values: TRegistration, { setSubmitting }: FormikHelpers<TRegistration>) => {
    await fetchRegistration({ email: values.email, password: values.password })
      .then((response) => {
        if (response.data) {
          saveAccessToken(response.data?.accessToken)
          navigate("/")
        }
      })
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Sign up</div>
      <div className={cls.body}>
        <Formik<TRegistration> initialValues={initialValues} onSubmit={registration}>
          {({ values, isSubmitting }) => (
            <Form className={cls.form}>
              <Field name="email" validate={composeValidators(required, email)}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>

              <Field name="password" validate={minCountChar(6)}>
                {({ field, meta }: FieldProps) => (
                  <InputField type="password" label="Password" placeholder="Enter password" field={field} meta={meta} />
                )}
              </Field>

              <Field name="confirmPassword" validate={composeValidators(required, confirmPassword(values.password))}>
                {({ field, meta }: FieldProps) => (
                  <InputField type="password" label="Confirm password" placeholder="Confirm password" field={field} meta={meta} />
                )}
              </Field>

              <Button type="submit" isLoading={isSubmitting}>
                Sign up
              </Button>
            </Form>
          )}
        </Formik>
        <div className={cls.signIn}>
          Do you have an account?
          <Link to="/auth/login">Sign in</Link>
        </div>
      </div>
    </div>
  )
}
