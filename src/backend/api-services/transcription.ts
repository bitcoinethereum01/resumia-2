import { createReadStream } from "node:fs";
import { openai } from "../config/openai";

export const getTranscription = async (filePath: string) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const file:any = createReadStream(filePath);
    const response = await openai.createTranscription(
      file,
      "whisper-1",
      undefined,
      'vtt',
      0.3,
      'en',
      {
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      }
    )
    return response
  } catch (error) {
    console.log(error);
    throw new Error("Error in whisper transcription service");
  }
}