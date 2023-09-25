-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "color" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_habit" ("color", "completed", "createdAt", "description", "id", "name", "updatedAt", "userId") SELECT "color", "completed", "createdAt", "description", "id", "name", "updatedAt", "userId" FROM "habit";
DROP TABLE "habit";
ALTER TABLE "new_habit" RENAME TO "habit";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
