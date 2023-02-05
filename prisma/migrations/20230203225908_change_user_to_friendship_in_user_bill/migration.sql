/*
  Warnings:

  - You are about to drop the column `user_id` on the `bill_users` table. All the data in the column will be lost.
  - Added the required column `friendship_id` to the `bill_users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bill_users" DROP COLUMN "user_id",
ADD COLUMN     "friendship_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "bill_users" ADD CONSTRAINT "bill_users_friendship_id_fkey" FOREIGN KEY ("friendship_id") REFERENCES "friends"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
