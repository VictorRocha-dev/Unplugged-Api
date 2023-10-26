-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_contents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contents_name" TEXT NOT NULL,
    "contents_type" TEXT NOT NULL DEFAULT 'video',
    "contets_duration" INTEGER NOT NULL,
    "contents_video_url" TEXT,
    "contents_article" TEXT,
    "contents_likes" INTEGER NOT NULL DEFAULT 0,
    "modulesId" INTEGER NOT NULL,
    CONSTRAINT "contents_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_contents" ("contents_article", "contents_name", "contents_type", "contents_video_url", "contets_duration", "id", "modulesId") SELECT "contents_article", "contents_name", "contents_type", "contents_video_url", "contets_duration", "id", "modulesId" FROM "contents";
DROP TABLE "contents";
ALTER TABLE "new_contents" RENAME TO "contents";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
