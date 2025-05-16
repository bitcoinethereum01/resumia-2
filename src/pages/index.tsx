import UploadVideo from "components/components/UploadVideo/UploadVideo";
import { redirectLogin } from "components/utils/pages";
import { GetServerSidePropsContext } from "next";
import { getToken } from "next-auth/jwt";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function Home() {
  return (
    <UploadVideo/>
  )
}

export async function getServerSideProps({ req, locale, defaultLocale }: GetServerSidePropsContext) {
  /* const session = await getToken({req})
  if(!session) {
    return redirectLogin(locale ?? defaultLocale, defaultLocale)
  } */
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'login', 'home'])),
    },
  }
}