/*
  Warnings:

  - You are about to drop the `comments ` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "comments ";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments_text" TEXT NOT NULL,
    "comments_rating" INTEGER NOT NULL,
    "comments_likes" INTEGER NOT NULL DEFAULT 0,
    "contentsId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "comments_contentsId_fkey" FOREIGN KEY ("contentsId") REFERENCES "contents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_binaural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "binaural_name" TEXT NOT NULL,
    "binaural_sound" TEXT NOT NULL,
    "binaural_img" TEXT NOT NULL,
    "binaural_duration" INTEGER NOT NULL,
    "isFavorited" BOOLEAN NOT NULL DEFAULT false,
    "binauralCategoryId" INTEGER NOT NULL,
    CONSTRAINT "binaural_binauralCategoryId_fkey" FOREIGN KEY ("binauralCategoryId") REFERENCES "binauralCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_binaural" ("binauralCategoryId", "binaural_duration", "binaural_img", "binaural_name", "binaural_sound", "id") SELECT "binauralCategoryId", "binaural_duration", "binaural_img", "binaural_name", "binaural_sound", "id" FROM "binaural";
DROP TABLE "binaural";
ALTER TABLE "new_binaural" RENAME TO "binaural";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
