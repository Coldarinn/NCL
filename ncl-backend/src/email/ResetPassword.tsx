import { Body, Button, Container, Head, Html, Preview, Section, Text, render } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import * as React from "react"

type ResetPasswordProps = {
  username: string
  password: string
  description: React.ReactNode
  frontendUrl: string
}

const ResetPassword = ({ username, password, description, frontendUrl }: ResetPasswordProps) => {
  const previewText = `Password reset NCL${username || ""}`

  // @ts-expect-error eslint-disable @typescript-eslint/ban-ts-comment
  return (
    <Html lang="ru">
      <Tailwind
        config={{
          theme: {
            screens: {
              lg: { max: "1150px" },
              md: { max: "600px" },
            },
          },
        }}
      >
        <Head />
        <Preview>{previewText}</Preview>

        <Body className="bg-[#ffffff] my-auto mx-auto font-sans text-[#000000] font-sans p-[20px]">
          <Container className="lg:px-[24px] lg:py-[24px] md:px-[16px] w-full max-w-[1100px] bg-[#f2f2f2] py-[72px] px-4 rounded-2xl border border-solid border-[#e5e5e5]">
            <Text className="lg:text-[24px] lg:leading-[31px] md:text-[20px] md:leading-[24px] lg:mb-[24px] text-4xl md:text-xl mb-9 mt-0 text-center">
              Good day{username ? `, ${username}` : ""}!
            </Text>

            <Text className="lg:text-[16px] lg:leading-[20px] lg:mb-[24px] w-full text-2xl mb-9 mt-0 text-center">{description}</Text>

            <Section className="lg:max-w-[580px] lg:mb-[24px] md:max-w-none md:mb-[24px] max-w-[962px] mx-auto bg-[#ffffff] rounded-3xl p-6 mb-9 mt-0">
              <Text className="lg:text-[16px] lg:leading-[20px] md:text-[14px] md:leading-[18px] lg:mb-[16px] text-[#808080] text-lg mb-6 mt-0 text-center">
                YOUR NEW PASSWORD:
              </Text>

              <Text className="lg:text-[24px] lg:leading-[31px] text-4xl text-center text-[#0c21c1] m-0">{password}</Text>
            </Section>

            <Button
              className="lg:w-[280px] lg:mb-[72px] md:mb-[140px] block w-[350px] mx-auto text-center mb-72 bg-[#394cd8] text-white font-medium text-[15px] py-[14px] rounded-lg"
              href={frontendUrl}
            >
              GO TO NCL
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

ResetPassword.PreviewProps = {
  username: "Kirill",
  password: "e5eaa935c0c7",
  frontendUrl: "http://localhost:3000/auth/login",
  description: "This message came to you because you reset your password",
} as ResetPasswordProps

export default ResetPassword

export const generateResetPasswordForEmail = (username: string, password: string, frontendUrl: string) =>
  render(
    <ResetPassword
      username={username}
      password={password}
      frontendUrl={frontendUrl}
      description="This message came to you because you reset your password"
    />,
    {
      pretty: true,
    }
  )
