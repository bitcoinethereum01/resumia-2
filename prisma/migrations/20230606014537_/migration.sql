-- AlterTable
ALTER TABLE "Summary" ALTER COLUMN "transcription" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isActive" BOOLEAN;
