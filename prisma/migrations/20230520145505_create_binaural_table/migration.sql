-- CreateTable
CREATE TABLE "binaural" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "binaural_name" TEXT NOT NULL,
    "binaural_sound" TEXT NOT NULL,
    "binaural_img" TEXT NOT NULL,
    "binaural_duration" INTEGER NOT NULL,
    "binauralCategoryId" INTEGER NOT NULL,
    CONSTRAINT "binaural_binauralCategoryId_fkey" FOREIGN KEY ("binauralCategoryId") REFERENCES "binauralCategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "binauralCategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
