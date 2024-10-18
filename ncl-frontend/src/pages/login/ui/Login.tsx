import { Link } from "react-router-dom"
import cls from "./Login.module.scss"
import { InputField } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { composeValidators, email, minCountChar, required } from "@/shared/utils/validators"
import { fetchLogin, ILogin } from "../api"
import { useNavigate } from "@/shared/router"

export const Login = () => {
  const initialValues: ILogin = { email: "", password: "" }

  const navigate = useNavigate()

  const login = async (values: ILogin, { setSubmitting }: FormikHelpers<ILogin>) => {
    await fetchLogin(values)
      .then(() => navigate("/"))
      .finally(() => setSubmitting(false))
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Sign in</div>
      <div className={cls.body}>
        <Formik<ILogin> initialValues={initialValues} onSubmit={login}>
          {({ isSubmitting }) => (
            <Form className={cls.form}>
              <Field name="email" validate={composeValidators(required, email)}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>

              <div className={cls.passwordField}>
                <Field name="password" validate={minCountChar(4)}>
                  {({ field, meta }: FieldProps) => (
                    <InputField type="password" label="Password" placeholder="Enter password" field={field} meta={meta} />
                  )}
                </Field>

                {/* <Link to="/auth/reset" className={cls.passwordForgot}>
                  Forgot password?
                </Link> */}
              </div>

              <Button type="submit" isLoading={isSubmitting}>
                Sign in
              </Button>
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
