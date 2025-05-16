import React, { useState, useRef, useEffect} from 'react'
import styles from './styles/profile.module.css'
import { FaUserEdit } from 'react-icons/fa';
import Input from './Input';
import { Form, FormikErrors, FormikTouched } from 'formik';
import { User } from 'next-auth';
import { CurrentUser } from 'components/types/user.types';
import avatarDefault from '../../assets/avatar.webp'
import { useAppSelector } from 'components/store/hooks/hooks';
import {  toast } from 'react-hot-toast'
import { useTranslation } from 'next-i18next';

const MAX_FILE_SIZE = 2097152;

interface ProfileProps {
  values: CurrentUser
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  errors: FormikErrors<User>
  touched: FormikTouched<User>
  setFieldTouched: (field: string, isTouched?: boolean | undefined) => void
  setFieldValue: (field: string, value: unknown) => void
  cleanImg: boolean
  setCleanImg: React.Dispatch<boolean>
}

const Profile = ({ handleChange, setFieldValue, values, cleanImg, setCleanImg}: ProfileProps) => {

  const [edit, setEdit] = useState(false);
  const { user } = useAppSelector(state => state.users.currentUser)
  const inputImgRef = useRef<HTMLInputElement>(null);
  const [fileUrl, setFileUrl] = useState('');
  const { t } = useTranslation('profile')

  useEffect(() => {
    if(cleanImg){
      if (inputImgRef.current) inputImgRef.current.value = '';
      setFieldValue('file', undefined);
      setCleanImg(false)
    } 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cleanImg])
  

  const onActivateEdit = () => {
    setEdit(edit ? false : true);
    setFieldValue('name', user.name);
    setFieldValue('fullName', user.fullName);
    setFieldValue('file', undefined);
    if (inputImgRef.current) inputImgRef.current.value = '';
  }

  const handleProfileImage = (event: React.ChangeEvent<HTMLInputElement>) => {

    const file = event.target.files?.[0];

    if (file && file.size > MAX_FILE_SIZE) {
      toast.error(t('ImageUploadSizeWarningMessage'))
    } else {
      const image = new Image();
      const reader = new FileReader();
      reader.onload = (e) => {
        image.src = e.target?.result as string;
        image.onload = () => {
          const width = image.width;
          const height = image.height;

          if ((width >= 400 && width <= 1280) && (height >= 400 && height <= 900)) {
            toast.success(t('ImageUploadSuccessMessage'))
            setFieldValue('file', file);

            const url = e.target?.result as string;
            setFileUrl(url);
          } else {
            toast.error(t('ImageUploadErrorMessage'))
            if (inputImgRef.current) inputImgRef.current.value = '';
            setFieldValue('file', undefined);
          }
        };
      };
      if (file instanceof Blob) reader.readAsDataURL(file);
    }
  }

  return (
    <Form>
      <div className='flex border border-gray-500 bg-myblack-600 rounded-sm overflow-auto'>
        <div className={`${styles.profile_item}`}>
          <div className={`${styles.profile_text} flex justify-between items-center p-6`}>
            <div className='flex flex-col gap-1'>
              <label className={`${edit ? 'block' : 'hidden'} text-sm font-medium text-red-300`}>{t('NameLabel')}</label>
              <input
                id='fullName'
                className={`bg-transparent outline-none rounded-sm ${edit && 'border-b border-gray-400 p-2'}`}
                disabled={!edit}
                type='text'
                value={`${edit ? values.fullName : user.fullName ?? "Agrega un nombre de usuario"}`}
                onChange={handleChange} />
            </div>
            <FaUserEdit onClick={onActivateEdit} className='text-2xl cursor-pointer' />
          </div>

          <img
            src={fileUrl ? fileUrl : user.image ?? avatarDefault.src}
            alt='Resumia profile image'
            className={`${styles.profile_img}`} />
        </div>
        <div className='flex flex-col justify-between'>
          <div className='p-6 flex flex-col gap-4 w-full'>
            <Input
              type='text'
              id='name'
              edit={edit}
              editValue={values.name ?? ''}
              value={user.name ?? ''}
              label={t('UserLabel')}
              handleChange={handleChange} ></Input>

            <Input
              id='email'
              type='email'
              edit={false}
              editValue={values.email ?? ''}
              value={user.email ?? ''}
              label={t('EmailLabel')}
              handleChange={handleChange}></Input>
          </div>
          {edit && <button className='bg-red-400 hover:bg-red-500 p-2 mx-6 my-2 rounded-sm font-medium' type='submit'>EDITAR</button>}
        </div>
      </div>
      <div className={`py-4 ${edit ? 'visible' : 'invisible'}`}>
        <input
          className='cursor-pointer'
          ref={inputImgRef}
          id="file"
          type="file"
          accept='.png, .jpg'
          onChange={handleProfileImage}
        />
      </div>
    </Form>
  )
}

export default Profile