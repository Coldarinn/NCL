import { Body, Button, Container, Head, Html, Img, Link, Preview, Section, Text, render } from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"
import * as React from "react"

type ResetPasswordProps = {
  username: string
  password: string
  description: React.ReactElement
  baseUrl: string
}

const ResetPassword = ({ username, password, description, baseUrl }: ResetPasswordProps) => {
  const previewText = `Сброс пароля NCL ${username}`

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

        <Body className="bg-[#050505] my-auto mx-auto font-sans text-[#ffffff] font-sans p-[20px]">
          <Container className="lg:px-[24px] lg:py-[24px] md:px-[16px] w-full max-w-[1100px] bg-[#141414] py-[72px] px-4 rounded-2xl border border-solid border-[#1A1A1A]">
            <Text className="lg:text-[24px] lg:leading-[31px] md:text-[20px] md:leading-[24px] lg:mb-[24px] text-4xl md:text-xl mb-9 mt-0 text-center">
              Добрый день, {username}!
            </Text>

            <Text className="lg:text-[16px] lg:leading-[20px] lg:mb-[24px] max-w-[723px] mx-auto text-2xl mb-9 mt-0 text-center">{description}</Text>

            <Section className="lg:max-w-[580px] lg:mb-[24px] md:max-w-none md:mb-[24px] max-w-[962px] mx-auto bg-[#1F1F1F] rounded-3xl p-6 mb-9 mt-0">
              <Text className="lg:text-[16px] lg:leading-[20px] md:text-[14px] md:leading-[18px] lg:mb-[16px] text-[#959596] text-lg mb-6 mt-0 text-center">
                ВАШ НОВЫЙ ПАРОЛЬ:
              </Text>

              <Text className="lg:text-[24px] lg:leading-[31px] text-4xl text-center text-[#FF8A25] m-0">{password}</Text>
            </Section>

            <Button
              className="lg:w-[280px] lg:mb-[72px] md:mb-[140px] block w-[350px] mx-auto text-center mb-72 bg-[#c2681f] text-white font-medium text-[15px] py-[14px] rounded-lg"
              href={baseUrl}
            >
              ПЕРЕЙТИ В КАБИНЕТ АГЕНТА
            </Button>

            <Button className="lg:max-w-[60px] block w-fit mx-auto text-center" href={baseUrl}>
              <Img className="max-w-full object-cover" src={`${__URL__}/logo.png`} />
            </Button>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

const __URL__ = "https://s3.timeweb.com/36e40123-agent-public/email"

ResetPassword.PreviewProps = {
  username: "Максим",
  password: "da7sa&s*ad",
  baseUrl: "http://localhost:3000/",
  description: (
    <>
      Приглашаем вас присоединиться к{" "}
      <Link href={"http://localhost:3000/"} className="text-[#FF8A25] no-underline">
        Личном Кабинете Агента
      </Link>
    </>
  ),
} as ResetPasswordProps

export default ResetPassword

export const generateResetPasswordForEmail = (username: string, password: string, baseUrl: string) =>
  render(
    <ResetPassword
      username={username}
      password={password}
      baseUrl={baseUrl}
      description={
        <>
          Вы получили это письмо, так как отправляли заявку на сброс пароля в{" "}
          <Link href={baseUrl} className="text-[#FF8A25] no-underline">
            Личном Кабинете Агента
          </Link>
        </>
      }
    />,
    {
      pretty: true,
    }
  )
export const generateWelcomHTMLForEmail = (username: string, password: string, baseUrl: string) =>
  render(
    <ResetPassword
      username={username}
      password={password}
      baseUrl={baseUrl}
      description={
        <>
          Приглашаем вас присоединиться к{" "}
          <Link href={baseUrl} className="text-[#FF8A25] no-underline">
            Личном Кабинете Агента
          </Link>
        </>
      }
    />,
    {
      pretty: true,
    }
  )
