-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "img_user" TEXT,
    "street" TEXT,
    "number" INTEGER,
    "city" TEXT,
    "state" TEXT,
    "zip_code" TEXT,
    "reference" TEXT
);
INSERT INTO "new_users" ("city", "email", "id", "img_user", "name", "nickname", "number", "password", "reference", "state", "street", "zip_code") SELECT "city", "email", "id", "img_user", "name", "nickname", "number", "password", "reference", "state", "street", "zip_code" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
