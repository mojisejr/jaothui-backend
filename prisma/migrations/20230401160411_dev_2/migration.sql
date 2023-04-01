/*
  Warnings:

  - You are about to drop the column `pointEared` on the `DailyTask` table. All the data in the column will be lost.
  - Added the required column `completed` to the `DailyTask` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DailyTask" (
    "taskId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "questId" INTEGER NOT NULL,
    "pointEarned" INTEGER,
    "completed" BOOLEAN NOT NULL,
    "completed_date" DATETIME,
    CONSTRAINT "DailyTask_questId_fkey" FOREIGN KEY ("questId") REFERENCES "Quest" ("questId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DailyTask_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DailyTask" ("completed_date", "questId", "taskId", "userId") SELECT "completed_date", "questId", "taskId", "userId" FROM "DailyTask";
DROP TABLE "DailyTask";
ALTER TABLE "new_DailyTask" RENAME TO "DailyTask";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
