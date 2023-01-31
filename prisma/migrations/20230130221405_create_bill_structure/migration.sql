-- CreateTable
CREATE TABLE `bills` (
    `id` VARCHAR(191) NOT NULL,
    `owner_id` VARCHAR(191) NOT NULL,

    INDEX `bills_owner_id_idx`(`owner_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bill_users` (
    `id` VARCHAR(191) NOT NULL,
    `value` INTEGER NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `bill_id` VARCHAR(191) NOT NULL,

    INDEX `bill_users_bill_id_idx`(`bill_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
