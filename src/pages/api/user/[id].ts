import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../lib/prisma";
import { Prisma } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { CustomSession } from "components/types/auth.types";

async function validateManipulationObject(res: NextApiResponse, userId: string, userSessionId?: string,) : Promise<void> {
  try {
    const getUserDB = await prisma.user.findFirstOrThrow({
      where: {
        id: userId
      }
    })
    if(getUserDB.id !== userSessionId) res.status(401).end();
  }
  catch {
    res.status(501).end();
  }
}

export default async function handler (req: NextApiRequest, res: NextApiResponse) {
  const session : CustomSession | null  = await getServerSession(req, res, authOptions)
  if(!session) res.status(401).end();

  const id: string = req.query.id as string;
  if(!id) res.status(404).end();

  await validateManipulationObject( res, id, session?.user.id,);

  if(req.method === 'PATCH') {
    const userBody: Prisma.UserCreateInput = req.body;
    try {
      const userUpdated = await prisma.user.update({
        data: userBody,
        where: {id},
      })
      res.status(200).send(userUpdated);
    } catch (error: unknown) {
      console.log(error);
    }
  } 
  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUniqueOrThrow({
        where: {id},
        select: {
          fullName: true,
          email: true,
          image: true,
          name: true,
          id: true
        }
      })
      res.status(200).send(user);
    } catch (error: unknown) {
      console.log(error)
    }
  } else {
    res.status(501).send(null);
  }
}