import React, { useState } from 'react'
import { IoIosArrowUp } from 'react-icons/io'
import { IoIosArrowDown } from 'react-icons/io'
import { Summary } from 'components/types/summary.types'
import Timer from '../Timer'
import { useTranslation } from 'next-i18next'
interface ArticleProps {
  data: Summary
}

const Article = ({ data }: ArticleProps) => {

/*   const [audio, setAudio] = useState(null);
  const [loading, setLoading] = useState(false); */
  const [displayIndex, setDisplayIndex] = useState(false);
  const { t } = useTranslation('summary')
  const onClickIndex = () => {
    setDisplayIndex(!displayIndex);
  }

/*   const onSpeech = async () => {

    try {
      setLoading(true)
      const res = await axios.post('/api/audio', body)
      setAudio(res.data.file);
    } catch (error: any) {
      console.log(error.message)
    }
    finally {
      setLoading(false);
    }
  } */

  return (
    <main className='h-full border-x-[1px] border-b-[1px] border-x-border bg-opacity-60 px-8 pb-8 pt-4'>
      <header className='my-4 flex flex-col gap-1'>
        <h1 className='text-xl sm:text-3xl font-semibold'> {data.title} </h1>
      </header>
      <p className='text-base sm:text-lg font-light text-gray-200'> {data.introduction} </p>
      <div>
        <button onClick={onClickIndex} className='bg-gray-500 w-full px-4 py-3 mt-10 rounded-xl'>
          <div className='flex items-center font-medium'>
            {
              displayIndex ? <IoIosArrowUp className='text-xl' /> : <IoIosArrowDown className='text-xl' />
            }
            <h4 className='ml-4'>{t("indexSubtitle")}</h4>
          </div>
        </button>
        <ul className={`${displayIndex ? 'flex' : 'hidden'} p-4 text-xs sm:text-sm flex flex-col gap-5 mb-4`}>
          {
            data.subtopics?.map((sub, i) => (
              <div key={`${i}-${sub.subtopicTitle}`}>
                <a href={`#${i}-${sub.subtopicTitle}`} className='text-base'> {`${i + 1}. ${sub.subtopicTitle}`} </a>
              </div>
            ))
          }
        </ul>
      </div>
      <div className='flex flex-col gap-10 mt-10'>
        {
          data.subtopics?.map((sub, i) => (
            <div id={`${i}-${sub.subtopicTitle}`} key={i} className='flex flex-col gap-2'>
              <div className='flex gap-2 items-center'>
                <div className='flex items-center w-full'>
                  <h2 className='text-lg text-gray-300 sm:text-[22px] font-semibold mr-4'> {`${i + 1}. ${sub.subtopicTitle}`} </h2>
                  <Timer
                    timestampEnd={sub.timestampEnd}
                    timestampStart={sub.timestampStart} />
                </div>
              </div>
              <p className='text-base sm:text-lg font-light text-gray-200'> {sub.subtopicDetail} </p>
            </div>
          ))
        }
      </div>
      <div className='mt-10 flex flex-col gap-2'>
        <h2 className='text-lg sm:text-[22px] font-semibold'>{t("conclusionSubtitle")}</h2>
        <p className='leading-6 text-base font-light'> {data.conclusion} </p>
      </div>

    </main>
  )
}

export default Article