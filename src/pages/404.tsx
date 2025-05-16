import { GetStaticPropsContext } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Link from "next/link"
import { useTranslation } from "next-i18next"

export default function Custom404() {
  const { t } = useTranslation('common');
  return <div className="flex flex-col place-content-center place-items-center gap-10 h-full">
    <h1 className="font-black text-9xl">404</h1>
    <h2 className="font-semibold text-4xl text-center">{t("404.Title")}</h2>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/" className="btnPrimary justify-center font-medium text-xl">{t("404.PrimaryButton")}</Link>
      <Link href="/" className="btnSecondary justify-center font-medium text-xl">{t("404.SecondaryButton")}</Link>
    </div>
  </div>
  
}
export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  }
}