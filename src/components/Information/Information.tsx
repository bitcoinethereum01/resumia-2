import React from 'react'
import { GiStarShuriken } from 'react-icons/gi'
import { PRIVACY_POLICY } from 'components/constants'
import { Button } from '../UploadVideo/UploadVideo'
import { BsFillPatchCheckFill } from 'react-icons/bs'
import styles from './styles/info.module.css'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

interface PolicieItemProps {
  name: string
  content: string
}
const PolicieItem = ({ name, content }: PolicieItemProps) => (
  <li>
    <div className='pl-5 relative'>
      <div className='flex items-center gap-2'>
        <GiStarShuriken className='absolute left-0 text-red-500'></GiStarShuriken>
        <h3 className='font-medium sm:font-bold text-gray-600'> {name} </h3>
      </div>
      <p className='text-sm sm:text-base text-gray-400 font-normal tracking-wide mt-2'> {content} </p>
    </div>
  </li>
)

const Information = () => {
  const router = useRouter();
  const { t } = useTranslation('privacy-policy')

  const date = new Date(2025, 4, 14);

  const formatedDate = date.toLocaleDateString(router.locale, {
    year: 'numeric', month: 'long', day: 'numeric'
  })

  return (
    <div className='h-screen relative w-screen'>
      <div className='bg-myblack-300 h-1/3'>
      </div>
      <div className='bg-gray-200 h-2/3'>
      </div>
      <div className={`${styles.container} flex flex-col justify-between sm:justify-around border bg-white pt-5 pb-2 sm:py-5 px-2 sm:px-10 sm:gap-5 rounded-md`}>
        <header className='self-center text-center'>
          <h2 className='text-lg font-medium sm:font-bold text-gray-700'>{t('Title')}</h2>
          <h3 className='text-xs font-medium text-gray-400'>{t('Updated')} {formatedDate}</h3>
        </header>
        <main className={`overflow-y-auto h-[75%] ${styles.scrollbar}`}>
          <ul className='flex flex-col gap-5 px-2'>
            {
              PRIVACY_POLICY(t).sections.map((po, index) => (
                <PolicieItem key={index} name={po.section} content={po.content} />
              ))
            }
          </ul>
        </main>
        <Button text={t('Ok')} onClick={() => router.back()} width='w-full' bgColor='bg-red-400' hvColor='hover:bg-red-300'>
          <BsFillPatchCheckFill className='text-white'></BsFillPatchCheckFill>
        </Button>
      </div>
    </div>
  )
}

export default Information