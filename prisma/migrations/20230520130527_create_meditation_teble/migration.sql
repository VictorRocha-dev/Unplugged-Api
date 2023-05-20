-- CreateTable
CREATE TABLE "meditation" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "meditation_name" TEXT NOT NULL,
    "meditation_sound" TEXT NOT NULL,
    "meditation_img" TEXT NOT NULL,
    "meditation_duration" INTEGER NOT NULL,
    "meditationCategoryId" INTEGER NOT NULL,
    CONSTRAINT "meditation_meditationCategoryId_fkey" FOREIGN KEY ("meditationCategoryId") REFERENCES "meditationcategory" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "meditationcategory" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);
