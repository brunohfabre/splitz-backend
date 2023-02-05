/*
  Warnings:

  - You are about to drop the column `friendship_id` on the `bill_users` table. All the data in the column will be lost.
  - Added the required column `userId` to the `bill_users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `bill_users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "bill_users" DROP CONSTRAINT "bill_users_friendship_id_fkey";

-- AlterTable
ALTER TABLE "bill_users" DROP COLUMN "friendship_id",
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bill_users" ADD CONSTRAINT "bill_users_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
