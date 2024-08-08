-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "technologies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "studied" BOOLEAN NOT NULL DEFAULT false,
    "deadline" DATETIME,
    "createadAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "idUser" TEXT NOT NULL,
    CONSTRAINT "technologies_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
