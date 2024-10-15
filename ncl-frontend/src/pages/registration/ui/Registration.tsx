import { Link } from "react-router-dom"
import cls from "./Registration.module.scss"
import { InputField } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { composeValidators, email, minCountChar, required } from "@/shared/utils/validators"

interface IRegistration {
  email: string
  password: string
  confirmPassword: string
}

export const Registration = () => {
  const initialValues: IRegistration = { email: "", password: "", confirmPassword: "" }

  const registration = (values: IRegistration, { setSubmitting }: FormikHelpers<IRegistration>) => {
    console.log("values: ", values)
    setSubmitting(false)
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Sign up</div>
      <div className={cls.body}>
        <Formik<IRegistration> initialValues={initialValues} onSubmit={registration}>
          {() => (
            <Form className={cls.form}>
              <Field name="email" validate={composeValidators(required, email)}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>

              <Field name="password" validate={minCountChar(4)}>
                {({ field, meta }: FieldProps) => (
                  <InputField type="password" label="Password" placeholder="Enter password" field={field} meta={meta} />
                )}
              </Field>

              <Field name="confirmPassword" validate={minCountChar(4)}>
                {({ field, meta }: FieldProps) => (
                  <InputField type="password" label="Confirm password" placeholder="Confirm password" field={field} meta={meta} />
                )}
              </Field>

              <Button type="submit">Sign up</Button>
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
