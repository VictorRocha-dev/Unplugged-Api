-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_comments" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "comments_text" TEXT NOT NULL,
    "comments_rating" INTEGER NOT NULL,
    "comments_likes" INTEGER NOT NULL DEFAULT 0,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contentsId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "comments_contentsId_fkey" FOREIGN KEY ("contentsId") REFERENCES "contents" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "comments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_comments" ("comments_likes", "comments_rating", "comments_text", "contentsId", "id", "userId") SELECT "comments_likes", "comments_rating", "comments_text", "contentsId", "id", "userId" FROM "comments";
DROP TABLE "comments";
ALTER TABLE "new_comments" RENAME TO "comments";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
