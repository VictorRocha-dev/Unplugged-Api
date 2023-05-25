/*
  Warnings:

  - You are about to drop the `daysofweek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `daysOfWeekId` on the `habits` table. All the data in the column will be lost.
  - Added the required column `habits_days` to the `habits` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "daysofweek";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habits_description" TEXT NOT NULL,
    "habits_hours_start" DATETIME NOT NULL,
    "habits_hours_finish" DATETIME NOT NULL,
    "habits_days" TEXT NOT NULL,
    "iconsId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "habits_iconsId_fkey" FOREIGN KEY ("iconsId") REFERENCES "icons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habits" ("habits_description", "habits_hours_finish", "habits_hours_start", "iconsId", "id", "userId") SELECT "habits_description", "habits_hours_finish", "habits_hours_start", "iconsId", "id", "userId" FROM "habits";
DROP TABLE "habits";
ALTER TABLE "new_habits" RENAME TO "habits";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
