import { TFunction } from "next-i18next";

export const VIDEO_MIN_DURATION = 50; //5min
export const VIDEO_MAX_DURATION = 720; //15min
export const VIDEO_MAX_SIZE = 25000000;
export const YOUTUBE_URI = 'youtube.com/watch?v=';
export const YT_VIDEO_MIN_DURATION = 50; //5min
export const YT_VIDEO_MAX_DURATION = 1800; //30min

export const PRIVACY_POLICY = (t: TFunction) => {
  return {
    "introduction": "Su privacidad es importante para nosotros. Es política de la Universidad respetar su privacidad con respecto a cualquier información que podamos recopilar de usted a través de nuestra aplicación, Resumia.",
    "sections": [
      {
        "section": t('SECTION_1'),
        "content": t('CONTENT_1')
      },
      {
        "section": t('SECTION_2'),
        "content": t('CONTENT_2')
      },
      {
        "section": t('SECTION_3'),
        "content": t('CONTENT_3')
      },
      {
        "section": t('SECTION_4'),
        "content": t('CONTENT_4')
      },
      {
        "section": t('SECTION_5'),
        "content": t('CONTENT_5')
      },
      {
        "section": t('SECTION_6'),
        "content": t('CONTENT_6')
      },
      {
        "section": t('SECTION_7'),
        "content": t('CONTENT_7')
      },
    ]
  }
}
