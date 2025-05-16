import { useState, useEffect } from 'react'
import style from './styles/session.module.css'
import { BsGithub } from "react-icons/bs";
import { Formik, Form } from "formik";
import { FcGoogle } from 'react-icons/fc'
import Warning from './Warning';
import Input from './Input';
import { signIn } from 'next-auth/react';
import { loginSchema } from 'components/schemas/schema';
import { Credentials } from 'components/types/user.types';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';


const INITIAL_CREDENTIALS: Credentials = {
  email: "",
  password: "",
}

/* const RememberMe = () => {
  <>
    <div className="flex items-start">
      <div className="flex items-center h-5">
        <input
          id="remember"
          aria-describedby="remember"
          type="checkbox"
          className="w-4 h-4 border rounded focus:ring-3  bg-gray-700 border-gray-600 " 
        />
      </div>
      <div className="ml-3 text-sm">
        <label id="remember" className="text-gray-300">
          Remember me
        </label>
      </div>
    </div>
    <a
      href="#id"
      className="text-sm font-medium hover:text-red-400 hover:underline text-red-400"
    >
      Forgot password?
    </a>
  </>
} */

const SigninForm = () => {
  const [message, setMessage] = useState('');
  const { t } = useTranslation('login')
  const router = useRouter()
  const signInWithGoogle = () => { signIn('google', {redirect: true, callbackUrl: `/?locale=${router.locale ?? router.defaultLocale}`}); }
  const signInWithGithub = () => { signIn('github', {redirect: true, callbackUrl: `/?locale=${router.locale ?? router.defaultLocale}`}); }

  const handleSubmit = async (
    values: Credentials,
  ) => {
    signIn('credentials', {
      ...values,
      redirect: true,
      callbackUrl: `/?locale=${router.locale ?? router.defaultLocale}`,
    })
  };

  useEffect(() => {
    console.log({router})
    const { error } = router.query;
    if(error) {
      const defaultMessage = t("LoginErrors.Default")
      const errorMessage = t(`LoginErrors.${error}`, {defaultValue: defaultMessage})
      // toast.error(errorMessage)
      console.log({defaultMessage})
      setMessage(errorMessage)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if(message) {
      toast.error(message)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message])

  return (
    <Formik
      initialValues={INITIAL_CREDENTIALS}
      onSubmit={handleSubmit}
      validationSchema={loginSchema}
    >
      {({ values, handleChange, errors, touched, setFieldTouched, isValid, dirty}) => (
        <Form className="space-y-4 md:space-y-6">
          <div className="relative">
            {errors.email && touched.email ? (
              <Warning> {errors.email} </Warning>
            ) : null}
            <Input
              type={"email"}
              name="email"
              label={t('EmailLabel')}
              pHolder={t('EmailPlaceholder')}
              value={values.email}
              onChange={handleChange}
              setFieldTouched={setFieldTouched}
              mandatory
            />
          </div>
          <div className="relative">
            {errors.password && touched.password ? (
              <Warning> {errors.password} </Warning>
            ) : null}
            <Input
              type={"password"}
              name="password"
              label={t('PasswordLabel')}
              pHolder={t('PasswordPlaceholder')}
              value={values.password}
              onChange={handleChange}
              setFieldTouched={setFieldTouched}
              mandatory
            />
          </div>
          {/* {message ? <p ref={msgRef} className='text-red-400 text-sm text-center'> {message} </p> : null} */}
          <div className="flex flex-col gap-2 pt-4 justify-center">
            <button type="submit" className={`${style.session_button} `} disabled={!(isValid && dirty)}>
              {t('SignIn')}
            </button>
            <span className="bg-gray-600 font-medium text-white flex justify-center items-center text-sm py-2.5 rounded-sm gap-2 hover:bg-gray-700 cursor-pointer">
              <BsGithub />
              <button type='button' onClick={signInWithGithub}>{t('GithubButton')}</button>
            </span>
            {/* <span className="bg-gray-100 font-medium text-gray-600 flex justify-center items-center text-sm py-2.5 rounded-sm gap-2 hover:bg-white cursor-pointer">
              <FcGoogle />
              <button type='button' onClick={signInWithGoogle}>{t('GooogleButton')}</button>
            </span> */}
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SigninForm;
