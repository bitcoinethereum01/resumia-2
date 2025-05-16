import { CustomSession } from "components/types/auth.types";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { YoutubeTranscript } from "youtube-transcript";
import { getSummary } from "components/backend/api-services/summary";
import { prisma } from "../../../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const session: CustomSession | null = await getServerSession(req, res, authOptions)
      if (!session) {
        res.status(401).json({ message: "You must be logged in." });
        return
      }

      const body = req?.body;
      const link = body?.link;

      const transcription = link && await YoutubeTranscript.fetchTranscript(link, {
        lang:'en',
        country: 'en'
      })
      const { finalSummary, cleanTranscription } = await getSummary(transcription, true);

      const summary = await prisma.summary.create({
        data: {
          creationDate: new Date(),
          userId: session.user.id,
          transcription: cleanTranscription,
          jsonSummary: finalSummary
        },
        select: {
          id: true,
          userId: true,
          creationDate: true,
          jsonSummary: true,
          videoLink: true
        }
      })

      res.status(200).send({ summary })
    } catch (error: unknown) {
      res.status(400).send({
        error
      });
    }
  }
}