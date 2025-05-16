import { ChatCompletionRequestMessage } from "openai";

export const CHUNK_MAX_LENGTH = 533;

export const RESUME_OUTPUT_FORMAT = `Título: Titulo del tema 
Subtitulo 1: Nombre del subtitulo 1 
Detalle del subtitulo 1: 
Subtitulo 2: Nombre del subtitulo 2 
Detalle del subtitulo 2:`

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

export const RESUME_CHUNK_JSON_FORMAT = `{
"subtopics":[{
"timestampStart":"00:00.000",
"timestampEnd":"00:00.000",
"subtopicTitle":"Nombre del subtitulo",
"subtopicDetail":"detalle del subtitulo"
}]}
`

export const RESUME_FIRST_CHUNK_JSON_FORMAT = `{
"title":"titulo del texto",
"introduction":"texto de introduccion",
"subtopics":[{
"timestampStart":"00:00.000",
"timestampEnd":"00:00.000",
"subtopicTitle":"Nombre del subtitulo",
"subtopicDetail":"detalle del subtitulo"
}]}
`
export const RESUME_LAST_CHUNK_JSON_FORMAT = `{
  "conclusion":"texto del resumen o conclusion"
"subtopics":[{
"timestampStart":"00:00.000",
"timestampEnd":"00:00.000",
"subtopicTitle":"Nombre del subtitulo",
"subtopicDetail":"detalle del subtitulo"
}]}
`

export const RESUME_OF_RESUME_JSON_FORMAT = `{
"title": "titulo del texto",
"introduction": "texto de introduccion",
"conclusion": "texto del resumen o conclusión"
}
`

export const messagesWithoutChunk = (transcription: string): ChatCompletionRequestMessage[] => {
  return [
    {
      "role": "system", "content": `Actua como un profesional realizando articulos a partir de diferentes textos. Los resumenes se escribirán en ingles y con el siguiente formato:
${RESUME_JSON_FORMAT}
`},
    {
      "role": "user", "content": `Transcripción : 
${transcription}
JSON:
`}
  ]
}

export const messagesForChunk = (transcription: string, isFirst=false, isLast=false): ChatCompletionRequestMessage[]  => {
  let format = RESUME_CHUNK_JSON_FORMAT
  if(isFirst) format = RESUME_FIRST_CHUNK_JSON_FORMAT
  if(isLast) format = RESUME_LAST_CHUNK_JSON_FORMAT
  return [
    {
      "role": "system", "content": `Genera un resumen en ingles de los subtemas tratados para un artículo a partir de la transcripción en formato VTT. El resultado se escribirá con el siguiente formato JSON:
${format}
`},
    {
      "role": "user", "content": `Transcripción : 
${transcription}
JSON:
`}
  ]

}