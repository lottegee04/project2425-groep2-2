/*
  Warnings:

  - You are about to drop the column `taskHistoryId` on the `Task` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Task" DROP CONSTRAINT "Task_taskHistoryId_fkey";

-- DropIndex
DROP INDEX "Task_taskHistoryId_key";

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "taskHistoryId";

-- CreateTable
CREATE TABLE "_TaskToTaskHistory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_TaskToTaskHistory_AB_unique" ON "_TaskToTaskHistory"("A", "B");

-- CreateIndex
CREATE INDEX "_TaskToTaskHistory_B_index" ON "_TaskToTaskHistory"("B");

-- AddForeignKey
ALTER TABLE "_TaskToTaskHistory" ADD CONSTRAINT "_TaskToTaskHistory_A_fkey" FOREIGN KEY ("A") REFERENCES "Task"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TaskToTaskHistory" ADD CONSTRAINT "_TaskToTaskHistory_B_fkey" FOREIGN KEY ("B") REFERENCES "TaskHistory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
