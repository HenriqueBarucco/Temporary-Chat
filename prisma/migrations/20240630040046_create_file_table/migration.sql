/*
  Warnings:

  - You are about to drop the column `file` on the `messages` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `messages` DROP COLUMN `file`,
    ADD COLUMN `fileId` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `files` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `messages` ADD CONSTRAINT `messages_fileId_fkey` FOREIGN KEY (`fileId`) REFERENCES `files`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
