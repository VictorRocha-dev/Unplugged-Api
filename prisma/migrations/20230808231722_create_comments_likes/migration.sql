/*
  Warnings:

  - You are about to drop the column `comments_likes` on the `comments` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "CommentLike" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "commentId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "CommentLike_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "comments" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "CommentLike_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments_text" TEXT NOT NULL,
    "comments_rating" INTEGER NOT NULL,
    "contentsId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "comments_contentsId_fkey" FOREIGN KEY ("contentsId") REFERENCES "contents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comments_rating", "comments_text", "contentsId", "id", "userId") SELECT "comments_rating", "comments_text", "contentsId", "id", "userId" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
