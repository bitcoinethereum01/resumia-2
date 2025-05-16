
export interface Summary {
  title: string
  introduction: string
  subtopics: Subtitle[]
  conclusion: string,
}
export const RESUME_JSON_FORMAT = `{
  "title": "titulo del texto",
  "introduction": "texto de introduccion",
  "subtopics":[{
  "timestampStart":"00:00.000",
  "timestampEnd":"00:00.000",
  "subtopicTitle":"Nombre del subtitulo",
  "subtopicDetail":"detalle del subtitulo"
  }],
  "conclusion": "texto del resumen o conclusión"
  }
  `
  

export interface Subtitle {
  subtopicTitle: string
  subtopicDetail: string
  timestampStart: string
  timestampEnd: string
}
export interface SummaryListResponse {
  id: string
  userId?: string
  creationDate?: string
  jsonSummary?: Summary
  videoLink?: string
}
export interface SummaryResponse {
  summary: SummaryListResponse
}
/* export interface SummaryResponse {
  summary: {
    id: string
  }
} */
export interface DeleteSummaryResponse {
  id: string
  userId: string
}
/* export interface SummaryData {
  summary: SummaryResponse
  result: {
    id: string
  }
} */

export const STATUS_TYPES = Object.freeze({
  SUCCEEDED: 'succeeded',
  IDLE: 'idle',
  LOADING: 'loading',
  REJECTED: 'rejected',
})