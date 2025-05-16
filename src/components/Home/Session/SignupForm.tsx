import style from './styles/session.module.css'
import { Formik, Form } from "formik";
import { FormikHelpers } from "formik/dist/types";
import Input from "./Input";
import { signupSchema } from "components/schemas/schema";
import Warning from "./Warning";
import { useAppDispatch, useAppSelector } from 'components/store/hooks/hooks';
import { createUser } from 'components/store/slices/user.slice';
import { User } from 'components/types/user.types';
import { useTranslation } from 'next-i18next';
import { SpinLoader } from 'components/components/Loader/spin-loader';

interface SignupFormik extends User {
  confirmPassword: string;
  password: "",
}

const SIGNUP: SignupFormik = {
  id: '',
  name: '',
  fullName: "",
  password: "",
  confirmPassword: "",
  email: ""
};

const SignupForm = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation('login')

  const status = useAppSelector( state => state.users.status);
  const loading = status === 'loading'

  const handleSubmit = (
    values: SignupFormik,
    actions: FormikHelpers<SignupFormik>
  ) => {
    const { email, name, password, fullName } = values;
    dispatch(createUser({
      email,
      fullName,
      password,
      name
    }))
    actions.resetForm();
  };

  return (
    <div className="w-full">
      <Formik
        initialValues={SIGNUP}
        onSubmit={handleSubmit}
        validationSchema={signupSchema}
      >
        {({ values, handleChange, errors, touched, setFieldTouched, isValid, dirty}) => (
          <Form className="flex flex-col gap-4">
            <div className="relative">
              <Input
                type={"text"}
                name="fullName"
                label={t('NameLabel')}
                pHolder={t('NamePlaceholder')}
                value={values.fullName ?? ''}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
                mandatory
              />
              {errors.fullName && touched.fullName ? (
                <Warning> {errors.fullName} </Warning>
              ) : null}
            </div>
            <div className="relative">
              <Input
                type={"text"}
                name="name"
                label={t('UsernameLabel')}
                pHolder={t('UsernamePlaceholder')}
                value={values.name ?? ''}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
              />
              {errors.name && touched.name ? (
                <Warning> {errors.name} </Warning>
              ) : null}
            </div>
            <div className="relative">
              <Input
                type={"email"}
                name="email"
                label={t('createEmailLabel')}
                pHolder={t('createEmailPlaceholder')}
                value={values.email ?? ''}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
                mandatory
              />
              {errors.email && touched.email ? (
                <Warning> {errors.email} </Warning>
              ) : null}
            </div>
            <div className="relative">
              <Input
                type={"password"}
                name="password"
                label={t('createPasswordLabel')}
                pHolder={t('createPasswordPlaceholder')}
                value={values.password}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
                mandatory
              />
              {errors.password && touched.password ? (
                <Warning> {errors.password} </Warning>
              ) : null}
            </div>
            <div className="relative">
              <Input
                type={"password"}
                name="confirmPassword"
                label={t('ConfirmPasswordLabel')}
                pHolder={t('ConfirmPasswordPlaceholder')}
                value={values.confirmPassword}
                onChange={handleChange}
                setFieldTouched={setFieldTouched}
                mandatory
              />
              {errors.confirmPassword && touched.confirmPassword ? (
                <Warning> {errors.confirmPassword} </Warning>
              ) : null}
            </div>
            <div className="mt-4">
              <button className={`${style.session_button} flex justify-center`} type="submit"
              disabled={!(dirty && isValid) || loading}>
                {loading && <SpinLoader/>}
                {!loading && t('create')}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignupForm;
