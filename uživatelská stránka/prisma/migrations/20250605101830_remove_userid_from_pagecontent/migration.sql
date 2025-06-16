/*
  Warnings:

  - The primary key for the `pagecontent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `pagecontent` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `pagecontent` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - A unique constraint covering the columns `[key]` on the table `PageContent` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `pagecontent` DROP FOREIGN KEY `PageContent_userId_fkey`;

-- DropIndex
DROP INDEX `PageContent_userId_key_key` ON `pagecontent`;

-- AlterTable
ALTER TABLE `pagecontent` DROP PRIMARY KEY,
    DROP COLUMN `userId`,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- CreateIndex
CREATE UNIQUE INDEX `PageContent_key_key` ON `PageContent`(`key`);
