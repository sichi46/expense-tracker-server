/*
  Warnings:

  - You are about to drop the column `fullName` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `gender` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `profilePicture` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,name]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Category_userId_username_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "fullName",
DROP COLUMN "gender",
DROP COLUMN "password",
DROP COLUMN "profilePicture",
DROP COLUMN "username",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_name_key" ON "Category"("userId", "name");
