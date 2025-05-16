import Link from "next/link";
import React from "react";
import { useTranslation } from 'next-i18next';

interface Props {
  setIsLogin?: React.Dispatch<boolean>
  isLogin: boolean
}

const Switcher = ({ setIsLogin, isLogin }: Props) => {
  const { t } = useTranslation(['login', 'common'])
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex justify-center">
        <p className="inline text-sm font-light text-gray-400">
          {!isLogin ? t('SignUpSwitcherMessage'): t('SignInSwitcherMessage') } 
        </p>
        <button type="button"
          onClick={() => setIsLogin?.(isLogin)}
          className="ml-1 inline text-sm font-medium hover:underline text-red-400"
        >
          {!isLogin? t('SignUp') : t('SignIn')}
        </button>
      </div>
      <div className="flex gap-2">
        <Link className="text-white text-xs underline" href={'/privacy-policy'}>{t('PrivacyPolicy')}</Link>
        {/* <Link className="text-white text-xs underline" href={'/privacy-policy'}>{t('TermsOfUse', {ns: 'common'})}</Link> */}
      </div>
    </div>
  );
};

export default Switcher;
