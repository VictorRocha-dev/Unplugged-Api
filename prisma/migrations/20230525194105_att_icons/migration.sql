/*
  Warnings:

  - Added the required column `name` to the `icons` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image_url" TEXT NOT NULL
);
INSERT INTO "new_icons" ("id", "image_url") SELECT "id", "image_url" FROM "icons";
DROP TABLE "icons";
ALTER TABLE "new_icons" RENAME TO "icons";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
