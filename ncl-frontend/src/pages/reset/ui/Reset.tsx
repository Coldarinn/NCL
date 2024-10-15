import { Link } from "react-router-dom"
import cls from "./Reset.module.scss"
import { InputField } from "@/shared/ui/Input"
import { Button } from "@/shared/ui/Button"
import { Field, FieldProps, Form, Formik, FormikHelpers } from "formik"
import { composeValidators, email, required } from "@/shared/utils/validators"

interface IReset {
  email: string
}

export const Reset = () => {
  const initialValues: IReset = { email: "" }

  const reset = (values: IReset, { setSubmitting }: FormikHelpers<IReset>) => {
    console.log("values: ", values)
    setSubmitting(false)
  }

  return (
    <div className={cls.wrapper}>
      <div className={cls.title}>Reset password</div>
      <div className={cls.body}>
        <Formik<IReset> initialValues={initialValues} onSubmit={reset}>
          {() => (
            <Form className={cls.form}>
              <Field name="email" validate={composeValidators(required, email)}>
                {({ field, meta }: FieldProps) => <InputField label="Email" placeholder="Enter email" field={field} meta={meta} />}
              </Field>
              <Button type="submit">Reset</Button>
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
