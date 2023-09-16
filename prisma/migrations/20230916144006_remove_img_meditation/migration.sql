/*
  Warnings:

  - You are about to drop the column `images` on the `meditationcategory` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_meditationcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
INSERT INTO "new_meditationcategory" ("id", "name") SELECT "id", "name" FROM "meditationcategory";
DROP TABLE "meditationcategory";
ALTER TABLE "new_meditationcategory" RENAME TO "meditationcategory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
