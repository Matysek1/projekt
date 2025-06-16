/*
  Warnings:

  - Added the required column `updatedBy` to the `PageContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagecontent` ADD COLUMN `updatedBy` VARCHAR(191) NOT NULL;
