import React, { useState } from 'react'
import { Summary } from 'components/types/summary.types'
import Head from 'next/head'
import ShareButtons from 'components/components/Summary/ShareButtons/ShareButtons'
import { GetServerSidePropsContext } from 'next'
import Error from 'next/error'
import dynamic from 'next/dynamic'
import LoadingBar from 'components/components/UploadVideo/LoadingBar'
import { useTranslation } from 'next-i18next'
import Article from 'components/components/Summary/Article/Article'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getSummaryData } from 'components/backend/api-services/test'
import { AsideContainer } from 'components/components/Summary/ShareButtons/AsideContainer'
import { FeedbackButtons } from 'components/components/Summary/ShareButtons/FeedbackButtons'
import { CustomSession } from 'components/types/auth.types'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]'
import { FeedbackType } from '@prisma/client'
import { redirectLogin } from 'components/utils/pages'
import { notFoundPage } from 'components/constants/pages'

interface SummaryProps {
  summary: {
    id: string
    userId: string
    videoLink?: string
    jsonSummary?: Summary
    feedbacks?: Array<{type: FeedbackType}>
  }
}

interface Tab {
  header: string
  component: JSX.Element
}
interface SummaryPageProps {
  tabs: Tab[]
}

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

export const Tabs = ({ tabs }: SummaryPageProps) => {
  const [activeTab, setActiveTab] = useState(0);
  /* const [isLiked, setIsLiked] = useState(false); */

  return (
    <div className='order-2 sm:order-none w-full'>
      <div className="tab-headers relative">
        {
          tabs.map((tab, i) => (
            <div key={i} className={`tab-header ${activeTab === i && 'tab-active text-red-300 before:bg-red-300'}`} onClick={() => setActiveTab(i)}>
              {
                tab.header
              }
            </div>
          ))
        }
{/*         <span
          onMouseEnter={() => setIsLiked(true)}
          onMouseLeave={() => setIsLiked(false)}
          className='absolute right-4 -bottom-10 cursor-pointer z-20'>
          {
            isLiked ?
              <BsFillHeartFill className='text-red-400 text-2xl' /> :
              <BsHeart className='text-white-400 text-2xl' />
          }
        </span> */}
      </div>
      <div className='w-full relative pb-2'> {tabs[activeTab].component} </div>
    </div>
  );
}
const SummaryPage = ({ summary }: SummaryProps) => {
  const { t } = useTranslation('summary')

  if (!(summary && summary.jsonSummary)) return (
    <Error statusCode={404}>
    </Error>
  );
  const { jsonSummary, id } = summary 
  
  const selectedFeedbackType = summary?.feedbacks?.[0]?.type

  return (
    <div className='bg-myblack-300 text-gray-100 flex flex-col sm:flex-row justify-center relative py-10 px-7 sm:pr-0 gap-5 sm:gap-10'>
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
      <Tabs tabs={[
        { header: t('article'), component: <Article data={jsonSummary} /> },
        { header: t('timeline'), component: <Timeline data={jsonSummary}/> },
        { header: t('pdf'), component: <DocuPDF data={jsonSummary} /> }
      ]}/>
      <AsideContainer>
        <ShareButtons/>
        <FeedbackButtons selectedFeedbackType={selectedFeedbackType} summaryId={id}/>
      </AsideContainer>
    </div>
  )
}
export default SummaryPage

export const getServerSideProps = async ({ locale, defaultLocale, req, res, query }: GetServerSidePropsContext) => {
  const session: CustomSession | null = await getServerSession(req, res, authOptions)
  /* if(!session) {
    return redirectLogin(locale ?? defaultLocale, defaultLocale)
  } */
  const { id } = query
  const { summary } = await getSummaryData(id, session);

  if (!(summary?.jsonSummary)) return notFoundPage;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common','summary'])),
      summary
    }
  };
}
