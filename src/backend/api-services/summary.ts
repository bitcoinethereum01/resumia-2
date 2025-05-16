/* eslint-disable @typescript-eslint/no-explicit-any */
import { TranscriptResponse } from "youtube-transcript";
import { openai } from "../config/openai"
import { CHUNK_MAX_LENGTH, messagesForChunk, messagesWithoutChunk } from "../config/summary"
import { splitTranscriptionIntoChunks } from "../helpers/summary.helpers";
import PQueue from 'p-queue';
import { GPT_MODEL } from "components/constants/openai";

const queue = new PQueue({
  interval: 60000,
  intervalCap: 60, 
});

interface GetSummaryResponse {
  finalSummary: any,
  cleanTranscription: string
}

export const getSummary = async (transcription: string | TranscriptResponse[], fromYoutube=false): Promise<GetSummaryResponse> => {
  try {
    const {chunks, cleanTranscription} = splitTranscriptionIntoChunks(transcription, CHUNK_MAX_LENGTH, fromYoutube)
    if(chunks.length > 1) {
      const tasks: any[] = []
      const responses: any[] = []
      for (let i = 0; i < chunks.length; i++) {
        let isFirst = false
        let isLast = false
        if(i === 0) isFirst = true
        if(i === chunks.length - 1) isLast = true
        const task = async () => {
          const response = await openai.createChatCompletion({
            model: GPT_MODEL,
            temperature: 0.3,
            messages: messagesForChunk(chunks[i], isFirst, isLast)
          })
          responses.push(response.data.choices[0].message?.content);
        }

        tasks.push(queue.add(task))
      }

      await Promise.all(tasks);
      const parsedSubtopics = responses.reduce( (arr, el) => {
        const summary = JSON.parse(el)
        return [...arr, ...summary.subtopics]
      },[])
      
      const finalSummary = {
        ...JSON.parse(responses[0]),
        ...JSON.parse(responses[responses.length-1]),
        subtopics: parsedSubtopics
      }
      return {
        finalSummary,
        cleanTranscription
      }
    }
    else {
      const response = await openai.createChatCompletion({
        model: GPT_MODEL,
        temperature: 0.4,
        messages: messagesWithoutChunk(chunks[0])
      })

      const rawSummary = response.data.choices[0].message?.content;

      const finalSummary = JSON.parse(rawSummary as string);

      return {
        finalSummary,
        cleanTranscription
      }
    }
  } catch (error) {
    console.log(error)
    throw new Error("Error in completion");
  }
}

