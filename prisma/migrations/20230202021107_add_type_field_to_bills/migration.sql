/*
  Warnings:

  - Added the required column `type` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BillType" AS ENUM ('INCOME', 'OUTCOME');

-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "type" "BillType" NOT NULL;
