import { SummaryListResponse } from 'components/types/summary.types'
import React from 'react'
import SummaryItem from './SummaryItem'
import styles from './styles/styles.module.css'
import { useTranslation } from 'next-i18next'


interface SummaryListProps {
  summarys: SummaryListResponse[]
}

const SummaryList = ({ summarys }: SummaryListProps) => {
  const { t } = useTranslation('summary')
  return (
    <div>
      <main className='mt-10 h-mobile px-5 lg:mt-0 lg:h-sm'>
        <header className='border-b-2 pb-1'>
          <h2 className='text-lg font-medium'>{t('mySummaries')}</h2>
        </header>
        <div className={`${styles.scrollbar} flex flex-col gap-4 my-4 overflow-y-auto pr-2 max-h-[90%]`}>
          {
            summarys.map((summary, i) => {
              if (summary?.jsonSummary) {
                return <SummaryItem key={i} summary={summary} />
              }
            })
          }
        </div>
      </main>
    </div>
  )
}

export default SummaryList
