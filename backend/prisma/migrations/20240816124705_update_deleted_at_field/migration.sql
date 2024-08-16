/*
  Warnings:

  - You are about to drop the column `delated_at` on the `Tasks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Tasks" DROP COLUMN "delated_at",
ADD COLUMN     "deleted_at" TIMESTAMP(3);
