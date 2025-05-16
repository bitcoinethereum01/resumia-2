import LoadingBar from 'components/components/UploadVideo/LoadingBar';
import { redirectLogin } from 'components/utils/pages';
import { GetServerSidePropsContext } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import dynamic from 'next/dynamic';

const LoginHome = dynamic(
  () => import('components/components/Home/LoginHome'),
  {
    loading: () => <div className='h-[500px] absolute top-1/2 left-[calc(50%-50px)]'> <LoadingBar /> </div>
  }
);

const LoginPage = () => {
  return (
    <LoginHome />
  )
}

export default LoginPage

export async function getServerSideProps({ locale, defaultLocale, query}: GetServerSidePropsContext) {
  const { callbackUrl } = query
  if(callbackUrl) {
    const callback = new URL(callbackUrl as string);  
    const locale = callback?.searchParams?.get?.("locale")
    if(locale) {
      const newSearchParams = new URLSearchParams(query as Record<string, string>)
      callback?.searchParams?.delete?.("locale")
      newSearchParams.set("callbackUrl", callback.toString())
      return redirectLogin(locale, defaultLocale, `?${newSearchParams.toString()}`);
    }
  }

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['login'])),
    },
  }
}