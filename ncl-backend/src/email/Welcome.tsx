import { Body, Button, Container, Head, Html, Preview, Text, render } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import * as React from "react"

type WelcomeProps = {
  verifyLink: string
}

const Welcome = ({ verifyLink }: WelcomeProps) => {
  const previewText = "Welcome to NCL"

  return (
    <Html lang="ru">
      <Tailwind
        // @ts-expect-error eslint-disable @typescript-eslint/ban-ts-comment
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
              Welcome to NCL!
            </Text>

            <Button
              className="lg:w-[280px] block w-[350px] mx-auto text-center bg-[#394cd8] text-white font-medium text-[15px] py-[14px] rounded-lg"
              href={verifyLink}
            >
              VERIFY ACCOUNT
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

Welcome.PreviewProps = {
  verifyLink: "http://localhost:8080/api/auth/verify/xxxxxxxxxxxxxxxxxxxxxxxxx",
} as WelcomeProps

export default Welcome

export const generateWelcomeForEmail = (verifyLink: string) =>
  render(<Welcome verifyLink={verifyLink} />, {
    pretty: true,
  })
