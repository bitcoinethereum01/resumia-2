import { prisma } from "../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CustomSession } from "components/types/auth.types";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: CustomSession | null = await getServerSession(req, res, authOptions)
  if(!session) res.status(401).end();

  if (req.method === 'GET') {
    const userId = session?.user?.id;
    try {
      const summaries = await prisma.summary.findMany({
        where: {
          userId
        },
        select: {
          id: true,
          userId: true,
          creationDate: true,
          jsonSummary: true,
          videoLink: true,
        }
      })
      res.status(200).send(summaries);
    } catch (error) {
      console.log({error});
      res.status(500).send({error});
    }
  } else {
    res.status(501).end()
  }
}