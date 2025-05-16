import { useState } from 'react'
import { useAppDispatch, useAppSelector } from 'components/store/hooks/hooks'
import LoadingBar from './LoadingBar'
import DropFile from './DropFile'
import { STATUS_TYPES } from 'components/types/summary.types'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { AiOutlineClear } from 'react-icons/ai'
import { BiPlayCircle } from 'react-icons/bi'
import { VIDEO_MAX_SIZE, YT_VIDEO_MAX_DURATION, YT_VIDEO_MIN_DURATION } from 'components/constants'
import { getYoutubeVideoDuration, validateSourceVideo, validateYoutubeURL } from 'components/utils'
import { createSummary, createSummaryFromYoutube } from 'components/store/slices/summary.slice'
import { useTranslation } from 'next-i18next'


interface ButtonProps {
  onClick: () => void,
  children: JSX.Element
  text: string
  width: string
  bgColor: string
  hvColor: string
}
export const Button = ({ onClick, children, text, ...props }: ButtonProps) => {
  return (
    <div onClick={onClick} className={`flex ${props.width} items-center justify-center select-none ${props.bgColor} ${props.hvColor} rounded-sm focus:ring-0 cursor-pointer`}>
      <button type='button' className='block text-white focus:outline-none font-medium text-sm px-3 py-2.5 text-center'>
        {text}
      </button>
      {children}
    </div>
  )
}

const UploadVideo = () => {

  const [file, setFile] = useState<File | undefined>(undefined);
  const [formData, setFormData] = useState<FormData | undefined>(undefined);
  const [youtubeURL, setYoutubeURL] = useState('');
  const dispatch = useAppDispatch();
  const currentSummary = useAppSelector(state => state.summarys)
  const router = useRouter();
  const { t } = useTranslation('home')

  const onFileDrop = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e?.target?.files?.[0]) return;

    const videoFile = e?.target?.files?.[0];

    if (videoFile.size >= VIDEO_MAX_SIZE) {
      toast.error(t('FileSizeValidationMessage'));
      return;
    }

    const { source, formData, message } = await validateSourceVideo(videoFile, t);
    setFile(source);
    setFormData(formData);
    source ? toast.success(message) : toast.error(message);
  };

  const onCleanData = () => {
    setFile(undefined);
    setFormData(undefined);
    setYoutubeURL('');
    const inputEl = document.getElementById('load-summary') as HTMLInputElement;
    inputEl.value = '';
  }

  const generateSummary = async () => {
    if (formData) {
      const { summary } = await dispatch(createSummary(formData)).unwrap();
      router.push(`/summary/${summary.id}`)
    }
    else if (youtubeURL && !validateYoutubeURL(youtubeURL)) {
      toast.error(t('YoutubeValidLinkMessage'));
    }
    else if (youtubeURL && validateYoutubeURL(youtubeURL)) {
      const videoSecondsDuration = await getYoutubeVideoDuration(youtubeURL);
      if (videoSecondsDuration <= YT_VIDEO_MAX_DURATION && videoSecondsDuration >= YT_VIDEO_MIN_DURATION) {
        const { summary } = await dispatch(createSummaryFromYoutube(youtubeURL)).unwrap();
        router.push(`/summary/${summary.id}`)
      }
      else {
        toast.error('El contenido no cumple con los requisitos de duración');
      }
    }
    else {
      toast.error(t('YoutubeLinkEmptyValidation'));
    }
  }

  return (
    <div className='flex items-center justify-center h-sm w-full'>
      <div className='w-full flex justify-center gap-2 xl:w-[90%]'>
        {
          (currentSummary.status === STATUS_TYPES.LOADING) ? <LoadingBar message={t('LoadingSummaryMessage') ?? ""} /> :
            <div className='flex w-full justify-center gap-10'>
              <div className=' w-4/5 md:w-3/5'>
                {/* <div className='mb-4'>
                  <input
                    value={youtubeURL}
                    disabled={formData ? true : false}
                    onChange={e => setYoutubeURL(e.target.value)}
                    className='disabled:opacity-80 disabled:bg-white w-full rounded-sm p-2 outline-none text-gray-600 text-sm sml:text-base' type="text" placeholder={t('YoutubePlaceholder') ?? ""} />
                </div> */}
                <DropFile fileName={file?.name} onFileDrop={onFileDrop} disabled={youtubeURL ? true : false} />
                <div className='flex flex-col sml:flex-row gap-3 w-full'>
                  <div className={`w-full sml:w-[60%] ${formData || youtubeURL ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <Button onClick={generateSummary} text={t('SubmitVideo')} width='w-full' bgColor='bg-red-400' hvColor='hover:bg-red-500'>
                      <BiPlayCircle className='text-lg' />
                    </Button>
                  </div>
                  <div className={`w-full sml:w-[40%] ${formData || youtubeURL ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <Button onClick={onCleanData} text={t('CleanData')} width='w-full' bgColor='bg-gray-400' hvColor='hover:bg-gray-500'>
                      <div className='p-1'>
                        <AiOutlineClear className='text-lg' />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
              {/* <SourceInfo/> */}
            </div>
        }
      </div>
    </div>
  )
}

export default UploadVideo