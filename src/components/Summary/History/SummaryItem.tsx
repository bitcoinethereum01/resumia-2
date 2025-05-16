import { SummaryListResponse } from 'components/types/summary.types'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
import { SlOptionsVertical } from 'react-icons/sl'
import { useAppDispatch } from 'components/store/hooks/hooks'
import { deleteSummary } from 'components/store/slices/summary.slice'
import { AiTwotoneDelete } from 'react-icons/ai'
import { useOnClickOutside } from 'components/hooks/hooks'
import { useTranslation } from 'next-i18next'
interface SummaryItemProps {
  summary: SummaryListResponse
}

const SummaryItem = ({ summary }: SummaryItemProps) => {
  const dispatch = useAppDispatch();
  const [displayOptions, setDisplayOptions] = useState(false);
  const optionsRef = useRef(null);
  const { t } = useTranslation('common')

  const onDeleteSumary = (id: string) => {
    dispatch(deleteSummary(id))
  }

  useOnClickOutside(optionsRef, () => setDisplayOptions(false));

  return (
    <div className='rounded-sm flex justify-between items-center bg-gray-100 bg-opacity-50'>
      <Link href={`/summary/${summary.id}`} className='w-full' >
        <p className='p-3' >{summary.jsonSummary?.title}</p>
      </Link>
      <div className='flex items-center gap-2 p-3'>
        <div ref={optionsRef} onClick={() => setDisplayOptions(true)} className='relative rounded-full cursor-pointer p-2 hover:bg-red-400 flex justify-center items-center'>
          <SlOptionsVertical className='text-white' />
          {
            displayOptions &&
            <div className='absolute -top-2 right-10 text-sm p-2 rounded-md border border-border bg-myblack-600'>
              <div className='w-28 flex justify-around items-center rounded-sm hover:bg-myblack-500 px-2 py-1 cursor-pointer'>
                <button onClick={() => onDeleteSumary(summary.id)}>{t('delete')}</button>
                <AiTwotoneDelete className='text-base'></AiTwotoneDelete>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default SummaryItem