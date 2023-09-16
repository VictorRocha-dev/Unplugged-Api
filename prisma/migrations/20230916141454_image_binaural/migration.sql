/*
  Warnings:

  - Added the required column `images` to the `binauralCategory` table without a default value. This is not possible if the table is not empty.
  - Added the required column `images` to the `meditationcategory` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_binauralCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "images" TEXT NOT NULL
);
INSERT INTO "new_binauralCategory" ("id", "name") SELECT "id", "name" FROM "binauralCategory";
DROP TABLE "binauralCategory";
ALTER TABLE "new_binauralCategory" RENAME TO "binauralCategory";
CREATE TABLE "new_meditationcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "images" TEXT NOT NULL
);
INSERT INTO "new_meditationcategory" ("id", "name") SELECT "id", "name" FROM "meditationcategory";
DROP TABLE "meditationcategory";
ALTER TABLE "new_meditationcategory" RENAME TO "meditationcategory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
