import Information from 'components/components/Information/Information'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

const InformationPage = () => {
  return (
    <div>
      <Information></Information>
    </div>
  )
}

export default InformationPage

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['privacy-policy'])),
    },
  }
}