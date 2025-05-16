import { prisma } from "../../../lib/prisma"
import { CustomSession } from "components/types/auth.types"

export const getSummaryData = async (id: string | string[] | undefined, session: CustomSession | null) => {
  const userId = session?.user?.id ?? "";
  const summary = await prisma.summary.findUnique({
    where: {
      id: id as string
    },
    select: {
      id: true,
      userId: true,
      jsonSummary: true,
      videoLink: true,
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

  return {
    summary
  }
}