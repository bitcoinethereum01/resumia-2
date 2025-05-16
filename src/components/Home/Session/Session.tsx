import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import Switcher from "./Switcher";
import style from './styles/session.module.css'
import { useTranslation } from 'next-i18next';

const Session = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { t } = useTranslation('login')
  return (
    <section className="w-full h-full flex items-center md:block">
      <div className="flex w-full px-5 md:w-auto flex-col items-center justify-center md:px-6 md:py-4 mx-auto h-full">
        <h2 className='font-extrabold text-2xl mx-2 my-4 text-red-400'>ResumIA</h2>
        <div
          className={`${style.session_container} ${style.inner}  ${!isLogin && style.flipped} ${!isLogin ? `md:${style.height700} ${style.height625}` : style.height550
            }`}
        >
          <div className={`${style.session_container__content} ${style.front} gap-3`}>
            <p className={`${style.session_p}`}>{t('LoginTitle')}</p>
            <SigninForm/>
            <Switcher setIsLogin={setIsLogin} isLogin={false} />
          </div>
          <div className={`${style.session_container__content} ${style.back} gap-3`}>
            <p className={`${style.session_p}`}>{t('SignupTitle')}</p>
            <SignupForm />
            <Switcher setIsLogin={setIsLogin} isLogin={true} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Session;
