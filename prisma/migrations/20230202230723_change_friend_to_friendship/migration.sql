/*
  Warnings:

  - You are about to drop the `_FriendToGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FriendToGroup" DROP CONSTRAINT "_FriendToGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_FriendToGroup" DROP CONSTRAINT "_FriendToGroup_B_fkey";

-- DropTable
DROP TABLE "_FriendToGroup";

-- CreateTable
CREATE TABLE "_FriendshipToGroup" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_FriendshipToGroup_AB_unique" ON "_FriendshipToGroup"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendshipToGroup_B_index" ON "_FriendshipToGroup"("B");

-- AddForeignKey
ALTER TABLE "_FriendshipToGroup" ADD CONSTRAINT "_FriendshipToGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "friends"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendshipToGroup" ADD CONSTRAINT "_FriendshipToGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
