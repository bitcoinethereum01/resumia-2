import { NextApiRequest, NextApiResponse } from "next";
import fs from 'fs'
import path from "path";
/* const VOICE_ID = '21m00Tcm4TlvDq8ikWAM' */

/* async function validateManipulationObject(userSessionId: string, userId: string, res: NextApiResponse): Promise<void> {
  try {
    const getUserDB = await prisma.user.findFirstOrThrow({
      where: {
        id: userId
      }
    })
    if (getUserDB.id !== userSessionId) res.status(401).end();
  }
  catch {
    res.status(501).end();
  }
} */

export default async function handler(req: NextApiRequest, res: NextApiResponse) {


  if (req.method === 'POST') {
    try {
      const { message } = req.body
      const response = await fetch(
        `https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM`,
        {
          method: "POST",
          headers: {
            accept: "audio/mpeg",
            "Content-Type": "application/json",
            "xi-api-key": "37b980355c26b69ff9d0cc60e3eac153",
          },
          body: JSON.stringify({
            text: message,
            voice_settings: {
              stability: 0,
              similarity_boost: 0,
            },
          }),
        }
      );

      if (!response) res.status(404).end();

      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const file = Math.random().toString(36).substring(7);

      fs.writeFile(path.join("public", "audio", `${file}.mp3`), buffer, () => {
        return
      });

      res.status(200).send(JSON.stringify({ file: `${file}.mp3` }));
    }
    catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message })
      }
    }
  }
}