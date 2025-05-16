import { prisma } from "../../../../lib/prisma";
import { CustomSession } from "components/types/auth.types";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const session: CustomSession | null = await getServerSession(req, res, authOptions)
  const id: string = req.query.id as string;
  if(!id) res.status(404).end();
  if(req.method === 'GET') {
    try {
      const userId = session?.user?.id ?? "";
      const response = await prisma.summary.findUnique({
        where: {
          id
        },
        select: {
          id: true,
          userId: true,
          creationDate: true,
          jsonSummary: true,
          videoLink: false,
          feedbacks: {
            where: {
              userId: userId
            },
            select: {
              type: true
            }
          }
        }
      })
      if(!response) res.status(404).end();
      res.status(200).send(response)
    } catch (error) {
      res.status(500).end()
    }
  } 
  if (req.method === 'DELETE') {
    try {
      const response = await prisma.summary.delete({
        where: {id},
        select: {
          id: true,
          userId: true,
        }
      })
      if(!response) res.status(404).end();
      res.status(200).send(response);

    } catch (error) {
      res.status(500).end()
    }
  }
  else {
    res.status(501).end();
  }
}
