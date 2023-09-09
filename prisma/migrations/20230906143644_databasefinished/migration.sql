-- CreateTable
CREATE TABLE "users" (
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

-- CreateTable
CREATE TABLE "binaural_favorites" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "binauralId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "binaural_favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "binaural_favorites_binauralId_fkey" FOREIGN KEY ("binauralId") REFERENCES "binaural" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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

-- CreateTable
CREATE TABLE "modules" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "module_name" TEXT NOT NULL,
    "module_description" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "contents" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "contents_name" TEXT NOT NULL,
    "contents_type" TEXT NOT NULL DEFAULT 'video',
    "contents_video_url" TEXT,
    "contents_article" TEXT,
    "modulesId" INTEGER NOT NULL,
    CONSTRAINT "contents_modulesId_fkey" FOREIGN KEY ("modulesId") REFERENCES "modules" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "comments" (
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

-- CreateTable
CREATE TABLE "habit" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "habit_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "habit_schedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habitId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    CONSTRAINT "habit_schedule_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "habit_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habitId" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "completed" BOOLEAN NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "habit_log_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "binaural_favorites_userId_binauralId_key" ON "binaural_favorites"("userId", "binauralId");
