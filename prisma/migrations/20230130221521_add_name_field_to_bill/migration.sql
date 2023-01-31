/*
  Warnings:

  - Added the required column `name` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bills` ADD COLUMN `name` VARCHAR(191) NOT NULL;
