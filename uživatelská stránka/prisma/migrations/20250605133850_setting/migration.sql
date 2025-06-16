/*
  Warnings:

  - You are about to drop the column `settings` on the `page` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `page` DROP COLUMN `settings`;

-- AlterTable
ALTER TABLE `pagecontent` ADD COLUMN `settings` JSON NULL,
    MODIFY `value` VARCHAR(191) NULL;
