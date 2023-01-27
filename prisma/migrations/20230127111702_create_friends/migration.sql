-- CreateTable
CREATE TABLE `friends` (
    `id` VARCHAR(191) NOT NULL,
    `accepted_at` DATETIME(3) NULL,
    `user_id` VARCHAR(191) NULL,
    `friend_id` VARCHAR(191) NULL,

    INDEX `friends_user_id_friend_id_idx`(`user_id`, `friend_id`),
    INDEX `friends_friend_id_idx`(`friend_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
