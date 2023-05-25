-- CreateTable
CREATE TABLE "habits" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habits_description" TEXT NOT NULL,
    "habits_hours_start" DATETIME NOT NULL,
    "habits_hours_finish" DATETIME NOT NULL,
    "iconsId" INTEGER NOT NULL,
    "daysOfWeekId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "habits_iconsId_fkey" FOREIGN KEY ("iconsId") REFERENCES "icons" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habits_daysOfWeekId_fkey" FOREIGN KEY ("daysOfWeekId") REFERENCES "daysofweek" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "habits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "daysofweek" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "monday" BOOLEAN NOT NULL DEFAULT false,
    "tuesday" BOOLEAN NOT NULL DEFAULT false,
    "wednesday" BOOLEAN NOT NULL DEFAULT false,
    "thursday" BOOLEAN NOT NULL DEFAULT false,
    "friday" BOOLEAN NOT NULL DEFAULT false,
    "saturday" BOOLEAN NOT NULL DEFAULT false,
    "sunday" BOOLEAN NOT NULL DEFAULT false
);

-- CreateTable
CREATE TABLE "icons" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_url" TEXT NOT NULL
);
