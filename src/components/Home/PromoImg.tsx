import React from "react";
import { useTranslation } from 'next-i18next'

const PromoImg = () => {
  const { t } = useTranslation('login')
  return (
    <div className="flex flex-col relative w-full min-h-[500px] h-screen lg:h-auto  justify-center lg:w-1/2 bg-red-300 ">
      <div className="flex flex-col h-1/2 lg:h-auto px-10 py-5 lg:px-20 gap-4">
        <h2 className="sml:text-3xl text-2xl font-bold md:text-4xl lg:text-5xl text-white ">
          {t('PromoTitle')}
        </h2>
        <p className="sml:text-xl font-medium text-base text-gray-100">
          {t('PromoBody')}
        </p>
      </div>
    </div>
  );
};

export default PromoImg;
