-- CreateTable
CREATE TABLE `Film` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `popis` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `datum_pridani` DATETIME(3) NULL,
    `owner_of_film` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comment` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NULL,
    `datum_pridani` DATETIME(3) NULL,
    `owner_of_comment` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
