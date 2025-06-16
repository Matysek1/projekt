/*
  Warnings:

  - Added the required column `headtext` to the `PageContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `pagecontent` ADD COLUMN `headtext` VARCHAR(191) NOT NULL;
