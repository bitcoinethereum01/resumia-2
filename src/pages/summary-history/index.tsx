import React, { useEffect } from 'react'
import { getSummarys } from 'components/store/slices/summary.slice';
import { useAppDispatch, useAppSelector } from 'components/store/hooks/hooks';
import SummaryList from 'components/components/Summary/History/SummaryList';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPropsContext } from 'next';

const SummaryListPage = () => {

  const dispatch = useAppDispatch();
  const summarys = useAppSelector(state => state.summarys.list);

  useEffect(()=>{
    dispatch(getSummarys());
  },[dispatch])

  return (
    <SummaryList summarys={summarys}/>
  )
}

export default SummaryListPage;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common', 'summary'])),
    },
  }
}