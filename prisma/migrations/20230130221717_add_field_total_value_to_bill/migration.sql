/*
  Warnings:

  - Added the required column `total_value` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `bills` ADD COLUMN `total_value` INTEGER NOT NULL;
