import React from 'react'
import { GiCloudUpload } from 'react-icons/gi'
import { useTranslation } from 'next-i18next'
interface DropFileProps {
  onFileDrop: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileName: string | undefined
  disabled: boolean,
}

const DropFile = ({ fileName, onFileDrop, disabled }: DropFileProps) => {
  const { t } = useTranslation('home')
  return (
    <div className={`${disabled ? 'pointer-events-none opacity-50': ''}  flex w-full flex-col relative hover:opacity-[.6] ease-in-out duration-300 justify-center items-center border-dashed rounded-lg border h-[300px] p-4 mb-4 text-sm sml:text-base`}>
      <GiCloudUpload className='text-[100px]' />
      {
        fileName ?
          <p className='text-center text-red-300 font-medium '> {fileName} </p> :
          <div className='flex flex-col items-center'>
            <p className='text-center'>{t('DropFileMessage')}</p>
            {/* <p className='text-center text-orange-400 font-medium text-sm'>{t('DropFileWarning_1')}</p> */}
            <p className='text-center text-orange-400 font-medium text-sm'>{t('DropFileWarning_2')}</p>
          </div>
      }
      <input
        id='load-summary'
        className='absolute opacity-0  w-full h-full cursor-pointer'
        type="file"
        accept='.mp4, .mp3, .avi'
        onChange={onFileDrop}
        />
    </div>
  )
}

export default DropFile