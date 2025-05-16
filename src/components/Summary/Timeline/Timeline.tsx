import React from 'react'
import TimelineItem from './TimelineItem'
import { Summary } from 'components/types/summary.types'
import { useTranslation } from 'next-i18next'

interface TimelineProps {
  data: Summary
}
const Timeline = ({data}: TimelineProps) => {
  const { t } = useTranslation('summary')
  return (
    <div className='p-5 flex flex-col justify-between'>
      <div className='flex items-center justify-center'>
        <h1 className='bg-gray-100 rounded-sm text-xl md:text-2xl px-2 font-medium text-center text-gray-800 inline'>{data.title}</h1>
      </div>
      <div className='timeline-container after:bg-red-300'>
        {data.subtopics?.map((sub, i) => (
          <TimelineItem key={i} subtitle={sub} ></TimelineItem>
        ))}
      </div>
      <h3 className='text-lg font-medium my-2'>
        <span className='inline-block px-2 py-1 bg-gray-400 rounded-sm text-red'>{t('conclusionSubtitle')}</span>
      </h3>
      <p className='leading-6'> {data.conclusion} </p>
    </div>
  )
}

export default Timeline