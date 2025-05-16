import React from 'react'
import { Tabs } from '../summary/[id]'
import Article from 'components/components/Summary/Article/Article'
import { Summary } from 'components/types/summary.types'
import Error from 'next/error'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext } from 'next'
import { getSummaryData } from 'components/backend/api-services/test'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import LoadingBar from 'components/components/UploadVideo/LoadingBar'
import { AsideContainer } from 'components/components/Summary/ShareButtons/AsideContainer'
import { Feedback } from '@prisma/client'
import { FeedbackButtons } from 'components/components/Summary/ShareButtons/FeedbackButtons'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

const DocuPDF = dynamic(
  () => import('components/components/Summary/PDF/DocuPDF'),
  {
    loading: () => <div className='h-[500px] absolute top-1/2 left-[calc(50%-50px)]'> <LoadingBar /> </div>
  }
);

const Timeline = dynamic(
  () => import('components/components/Summary/Timeline/Timeline'),
  {
    loading: () => <div className='h-[500px] absolute  top-1/2 left-[calc(50%-50px)]'> <LoadingBar /> </div>
  }
);

interface SummaryProps {
  summary: {
    id: string
    userId: string
    videoLink?: string
    jsonSummary?: Summary
    feedbacks?: Array<Feedback>
  }
}

const SharePage = ({ summary }: SummaryProps) => {
  const { t } = useTranslation('summary')

  if (!(summary && summary.jsonSummary)) return <Error statusCode={404} />
  const { jsonSummary, id } = summary

  const selectedFeedbackType = summary?.feedbacks?.[0]?.type

  return (
    <div className='bg-myblack-300 text-gray-100 flex flex-col justify-center items-center relative  gap-5 sm:gap-10'>
      <Head>
        <title>{jsonSummary?.title}</title>
        <meta property="description" content={jsonSummary?.introduction} />
        <link rel="canonical" href={`/summary/${summary.id}`} />

        <meta property="og:title" content={jsonSummary?.title} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`/summary/${summary.id}`} />
        <meta property="og:description" content={jsonSummary?.introduction} />
        <meta property="og:image" content="/images/image_banner.jpg" />

        <meta name="twitter:card" content="/images/image_banner.jpg" />
        <meta property="twitter:domain" content="localhost" />
        <meta property="twitter:url" content={`/summary/${summary.id}`} />
        <meta name="twitter:title" content={jsonSummary?.title} />
        <meta name="twitter:description" content={jsonSummary?.introduction} />
        <meta name="twitter:image" content="/images/image_banner.jpg" />
      </Head>
      <div className='bg-myblack-500 bg-opacity-60 backdrop-blur-lg z-30 flex items-center justify-center fixed top-0 left-0 w-full h-10'>
        <Link href={'/'} className='font-extrabold absolute px-2 left-0 text-xl cursor-pointer text-red-400'>ResumIA</Link>
        <h2 className='font-medium text-sm text-gray-300'>{t("Share.PageTitle")}</h2>
      </div>
      <div className='bg-myblack-300 text-gray-100 flex flex-col sm:flex-row justify-center relative py-10 pt-14 px-7 gap-5 sm:gap-10 sm:px-14'/* className='w-full px-1 sm:w-[70%] sm:px-0 mt-14' */>
        <Tabs tabs={[
          { header: t('article') , component: <Article data={jsonSummary} /> },
          { header: t('timeline') , component: <Timeline data={jsonSummary} /> },
          { header: t('pdf') , component: <DocuPDF data={jsonSummary} /> }
        ]}/>
        <AsideContainer>
          <FeedbackButtons selectedFeedbackType={selectedFeedbackType} summaryId={id}/>
        </AsideContainer>
      </div>
    </div>
  )
}

export default SharePage

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const { id } = context.query
  const { locale } = context

  const { summary } = await getSummaryData(id, null);

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'summary'])),
      summary
    }
  }
}