import { prisma } from "../../../../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]";
import { CustomSession } from "components/types/auth.types";
import { FeedbackType } from "@prisma/client";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session: CustomSession | null = await getServerSession(req, res, authOptions)
  if(!session) res.status(401).end();

  if(req.method === "POST"){
    const data = req.body;
    const type: FeedbackType = data?.type;
    try {
      await prisma.feedback.create({
        data: {
          summaryId: data.summaryId,
          userId: session?.user.id as string,
          description: data.description,
          type: type
        }
      })
      res.status(201).end()
    } catch (error) {
      res.status(500).end()
    }
  } else {
    res.status(501).end()
  }
}