import axios from "axios";
import { VIDEO_MAX_DURATION, VIDEO_MIN_DURATION } from "components/constants";
import { TFunction } from "next-i18next";
import { toSeconds, parse } from "iso8601-duration";

export function formatSecondsToTime(seconds: number, t: TFunction): string {
  seconds = Math.round(seconds);
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds - hours * 3600) / 60);
  const remainingSeconds = seconds - hours * 3600 - minutes * 60;
  const  time: string[] = [];
  if (hours > 0) {
    time.push(`${hours} ${t('Hour')}${hours > 1 ? 's' : ''}`);
  }
  if (minutes > 0) {
    time.push(`${minutes} ${t('Minute')}${minutes > 1 ? 's' : ''}`);
  }
  if (remainingSeconds > 0) {
    time.push(`${remainingSeconds} ${t('Second')}${remainingSeconds > 1 ? 's' : ''}`);
  }
  return time.join(', ');
}

interface ValidateSourceVideo {
  duration: number,
  source: File | undefined,
  formData: FormData | undefined
  message: string
}

export const validateSourceVideo = async (videoFile: File, t: TFunction): Promise<ValidateSourceVideo> => {
  let response: ValidateSourceVideo = {
    duration: 0,
    source: undefined,
    formData: undefined,
    message: ''
  };

  if (videoFile) {
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.src = URL.createObjectURL(videoFile);
    await new Promise<void>((resolve) => {
      video.onloadedmetadata = function () {
        URL.revokeObjectURL(video.src);
        if (video.duration>= VIDEO_MIN_DURATION && video.duration <= VIDEO_MAX_DURATION) {
          const formData = new FormData();
          formData.append('file', videoFile)
          response = {
            duration: video.duration,
            source: videoFile,
            formData: formData,
            message: t('LoadedSourceSuccessMessage')
          }
        }
        else {
          response = {
            duration: 0,
            source: undefined,
            formData: undefined,
            message: `${t('DurationWarningMessage')} ${formatSecondsToTime(video.duration, t)}`
          }
        }
        resolve();
      }
    });
  }

  return response;
}

export const validateYoutubeURL = (url: string) => {
  // eslint-disable-next-line no-useless-escape
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match;
}

export const getYoutubeID = (match: RegExpMatchArray) => {
  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return null
  }
}

export const getYoutubeVideoDuration = async (youtubeURL: string) => {
  const YT_API_KEY = process.env.YT_API_KEY || 'AIzaSyBE0PEmbgxVf4l7qVONZGgHmbnLINXv_8U';
  const match = validateYoutubeURL(youtubeURL) as RegExpMatchArray;
  const youtubeVideoID = getYoutubeID(match) as string;
  const YOUTUBE_API = `https://www.googleapis.com/youtube/v3/videos?id=${youtubeVideoID}&part=contentDetails&key=${YT_API_KEY}`
  const { data } = await axios.get(YOUTUBE_API);
  const durationISO8601 = data.items[0].contentDetails.duration;
  const videoSecondsDuration = toSeconds(parse(durationISO8601));
  return videoSecondsDuration;
}