import React from 'react'
import { Subtitle } from 'components/types/summary.types'

interface TimelineItemProps {
  subtitle: Subtitle
}

const TimelineItem = ({ subtitle }: TimelineItemProps) => {
  return (
    <div className='timeline-item text-gray-800'>
      <div className='timeline-item-content rounded-sm flex flex-col gap-1'>
        <h2 className='text-lg font-semibold'>
          {subtitle.subtopicTitle}
        </h2>
        <p className='font-semibold text-red-400 text-sm'> {subtitle.timestampStart} - {subtitle.timestampEnd} </p>
        <p className='text-sm text-gray-600 leading-6 font-medium'> {subtitle.subtopicDetail} </p>
        <div className='circle bg-white border-[3px] border-red-300 '></div>
      </div>
    </div>
  )
}

export default TimelineItem