/*
  Warnings:

  - You are about to drop the column `UserId` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tasks" DROP CONSTRAINT "Tasks_UserId_fkey";

-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "UserId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Tasks" ADD CONSTRAINT "Tasks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
