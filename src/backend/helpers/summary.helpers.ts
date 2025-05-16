import { TranscriptResponse } from "youtube-transcript";

export function cleanNewLines(text: string) :string {
  return text.split('\n\n')
  .map( el => el.replace('\n', ' '))
  .join('\n').trim();
}

export function splitTranscriptionIntoChunks(transcription: string | TranscriptResponse[], maxLines: number, fromYoutube: boolean) : {chunks: string[], cleanTranscription: string} {
  const cleanTranscription = fromYoutube 
  ? transformYoutubeTranscriptionToVTT(transcription as TranscriptResponse[]) 
  : cleanNewLines(transcription as string);

  const transcriptionLines = cleanTranscription.split('\n');
  const linesForChunk = Math.ceil( transcriptionLines.length / maxLines )
  const linesChunks = [];
  
  for (let i = linesForChunk; i > 0; i--) {
    linesChunks.push(transcriptionLines.splice(0, Math.ceil(transcriptionLines.length / i)));
  }

  const chunks = linesChunks.map( el => el.join('\n'))

  return {
    chunks,
    cleanTranscription
  }
}

function convertToVtt(obj: TranscriptResponse) {
  const start = new Date(obj.offset).toISOString().substring(11, 23);
  const end = new Date(obj.offset + obj.duration).toISOString().substring(11, 23);
  const text = obj.text.trim().replace(/\n/g, '\n\n');

  return `${start} --> ${end} ${text}\n`;
}

export function transformYoutubeTranscriptionToVTT(ytTranscription: TranscriptResponse[] ) {
  const cleanTranscription = ytTranscription.map( transcription => convertToVtt(transcription)).join('')
  return cleanTranscription
}