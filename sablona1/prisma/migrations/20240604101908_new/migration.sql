-- AlterTable
ALTER TABLE `comment` ADD COLUMN `film_id` VARCHAR(191) NULL,
    ADD COLUMN `hodnoceni` INTEGER NULL;

-- AlterTable
ALTER TABLE `film` ADD COLUMN `reziser` VARCHAR(191) NULL,
    ADD COLUMN `zanr` VARCHAR(191) NULL;
