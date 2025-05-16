import { NextApiRequest, NextApiResponse, PageConfig } from "next";
import { formidableConfig } from "components/backend/config/file";
import { getTranscription } from "components/backend/api-services/transcription";
import { prisma } from "../../../../../lib/prisma";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../../auth/[...nextauth]";
import { CustomSession } from "components/types/auth.types";
import { formidablePromise, validateFileToTranscript } from "components/backend/helpers/file.helpers";
import { getSummary } from "components/backend/api-services/summary";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'POST') {
    const session: CustomSession | null = await getServerSession(req, res, authOptions)
    /* if (!session) {
      res.status(401).json({ message: "You must be logged in." });
      return
    } */
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const { files }:any = await formidablePromise(req, {
        ...formidableConfig,
      });

      validateFileToTranscript(files);

      const responseTranscription = await getTranscription(files.file?.filepath);

      const summary = await prisma.summary.create({
        data: {
          creationDate: new Date(),
          userId: session?.user?.id,
          transcription: responseTranscription.data.toString()
        }
      })

      if(!summary?.transcription) res.status(501).send(null);

      const summaryObj = await getSummary(summary.transcription as string);

      const resume = await prisma.summary.update({
        data: {
          jsonSummary: summaryObj.finalSummary
        },
        where: {
          id: summary.id
        },
        select: {
          id: true,
          userId: true,
          creationDate: true,
          jsonSummary: true,
          videoLink: true
        }
      })

      res.status(200).send({summary: resume});
    } catch(error) {
      console.log(error);
      res.status(500).send(error)
    }
  } else {
    res.status(501).send(null)
  }
}

export const config: PageConfig = {
  api: {
      bodyParser: false,
  },
};
