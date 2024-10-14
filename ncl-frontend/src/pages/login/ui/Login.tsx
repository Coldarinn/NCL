import { Link } from "react-router-dom"
import cls from "./Login.module.scss"
import { InputField } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { minCountChar, required } from "@/shared/utils/validators"

interface LoginValues {
  email: string
  password: string
}

export const Login = () => {
  const initialValues: LoginValues = { email: "", password: "" }

  const login = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    console.log("values: ", values)
    setSubmitting(false)
  }

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
        <Formik<LoginValues> validateOnMount initialValues={initialValues} onSubmit={login}>
          {() => (
            <Form className={cls.form}>
              <Field name="email" validate={required}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>

              <div className={cls.passwordField}>
                <Field name="password" validate={minCountChar(4)}>
                  {({ field, meta }: FieldProps) => (
                    <InputField type="password" label="Password" placeholder="Enter password" field={field} meta={meta} />
                  )}
                </Field>

                <Link to="/auth/reset" className={cls.passwordForgot}>
                  Forgot password?
                </Link>
              </div>

              <Button type="submit">Sign in</Button>
            </Form>
          )}
        </Formik>
        <div className={cls.signUp}>
          Dont have an account?
          <Link to="/auth/registration">Sign up now</Link>
        </div>
        {/* <div className={cls.anotherLogin}></div> */}
      </div>
    </div>
  )
}
