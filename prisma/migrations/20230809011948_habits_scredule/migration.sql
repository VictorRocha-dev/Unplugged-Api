-- CreateTable
CREATE TABLE "HabitSchedule" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "habitId" INTEGER NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    CONSTRAINT "HabitSchedule_habitId_fkey" FOREIGN KEY ("habitId") REFERENCES "Habit" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
