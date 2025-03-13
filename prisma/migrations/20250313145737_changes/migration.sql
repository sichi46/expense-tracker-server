/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,username]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `fullName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gender` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Category` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('male', 'female', 'other');

-- DropIndex
DROP INDEX "Category_userId_name_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "fullName" TEXT NOT NULL,
ADD COLUMN     "gender" "Gender" NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "profilePicture" TEXT,
ADD COLUMN     "username" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_userId_username_key" ON "Category"("userId", "username");
