/*
  Warnings:

  - You are about to alter the column `total_value` on the `bills` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `bills` MODIFY `total_value` DOUBLE NOT NULL;
