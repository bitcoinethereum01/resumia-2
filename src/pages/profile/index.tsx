import Profile from 'components/components/Profile/Profile'
import { Formik, FormikHelpers } from 'formik'
import React, {useState} from 'react'
import { updateUser } from 'components/store/slices/user.slice'
import { useAppDispatch, useAppSelector } from 'components/store/hooks/hooks'
import { CurrentUser, SessionType } from 'components/types/user.types'
import { useSession } from 'next-auth/react'
import toast from 'react-hot-toast'
import { uploadFile } from 'components/firebase/config'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'

const INITIAL_VALUES: CurrentUser = {
  id: '',
  name: '',
  email: '',
  image: '',
  fullName: ''
}

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.users.currentUser)
  const user = useSession() as SessionType;
  const [cleanImg, setCleanImg] = useState(false)
  const { t } = useTranslation('profile')

  const handleSubmit = async (values: CurrentUser, actions: FormikHelpers<CurrentUser> ) => {
    const { name, fullName, file } = values;

    if (currentUser.user.fullName === values.fullName &&
      currentUser.user.name === values.name &&
      file === undefined) return
    else {
      file ? await uploadFile(file) : currentUser.user.image
      toast.promise(dispatch(updateUser({
        userId: user.data?.user.id,
        user: {
          name,
          fullName,
        }
      })), {
        loading: <>{t('UpdateLoadingMessage')}</>,
        success: <>{t('UpdateSuccessMessage')}</>,
        error: <>{t('UpdateErrorMessage')}</>,
      })
      setCleanImg(true);
      actions.setFieldValue('file', undefined);
    }
  };

  return (
    <div className='mt-10 h-mobile px-5 lg:mt-0 lg:h-sm'>
      <div className='w-full h-full select-none'>
        <header className='border-b-2 pb-1'>
          <h2 className='text-lg font-medium'>{t('ProfilePageTitle')}</h2>
        </header>
        <div className='flex justify-center items-center h-full'>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={handleSubmit}>
            {
              ({ ...formik }) => (
                <Profile
                  values={formik.values}
                  handleChange={formik.handleChange}
                  setFieldTouched={formik.setFieldTouched}
                  setFieldValue={formik.setFieldValue}
                  touched={formik.touched}
                  errors={formik.errors}
                  cleanImg={cleanImg}
                  setCleanImg={setCleanImg}
                />
              )
            }
          </Formik>
        </div>
      </div>


    </div>
  )
}

export default ProfilePage

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'profile'])),
    },
  }
}