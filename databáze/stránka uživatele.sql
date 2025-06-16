-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 16. čen 2025, 22:19
-- Verze serveru: 10.4.32-MariaDB
-- Verze PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databáze: `web1`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `blog`
--

CREATE TABLE `blog` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL,
  `published` tinyint(1) NOT NULL DEFAULT 0,
  `imageUrl` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `blog`
--

INSERT INTO `blog` (`id`, `title`, `content`, `userId`, `createdAt`, `updatedAt`, `published`, `imageUrl`) VALUES
('cmbv1yuuk00011zit6bp1pwfl', 'Můj nový článek 1', '', 'cmbji3q69000707l7g4xld6ww', '2025-06-13 16:59:33.147', '2025-06-13 16:59:33.147', 1, '/uploads/images/image-1749850485001.png'),
('cmbv1zht500031zitkjoixpw4', 'Můj nový článek 2', '', 'cmbji3q69000707l7g4xld6ww', '2025-06-13 17:00:02.921', '2025-06-15 21:19:40.598', 1, '/uploads/images/image-1749850485001.png'),
('cmbvbsvdd00071zituv6q6u1j', 'Můj nový článek', '<p>sadsad</p>', 'cmbji3q69000707l7g4xld6ww', '2025-06-13 21:34:50.060', '2025-06-13 21:34:50.060', 1, '/uploads/images/image-1749850485001.png'),
('cmbvcsaol00091zityfmhp9gs', 'Článek o hovně', '<h1>Jak sadkasdasdasd sa</h1><h2>sadsadsadasdasdasdasdasdsa</h2><ul><li><p>sdasdsaaaaaaaaaa</p></li><li><p>saddddddddddddddddddddddd</p></li><li><p>asdasddddddddddddddddd</p></li></ul><p>sadd', 'cmbji3q69000707l7g4xld6ww', '2025-06-13 22:02:22.865', '2025-06-13 22:02:22.865', 1, '/uploads/images/image-1749852138919.png'),
('cmbz0hiro000155rni4xk50s0', 'Můj nový článek', '', 'cmbji3q69000707l7g4xld6ww', '2025-06-16 11:29:09.440', '2025-06-16 11:29:11.611', 1, 'mrdka');

-- --------------------------------------------------------

--
-- Struktura tabulky `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `name` varchar(191) NOT NULL,
  `hex` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `color`
--

INSERT INTO `color` (`id`, `name`, `hex`) VALUES
(1, 'primary', '#FFFFFF'),
(2, 'secondary', '#FFFFFF'),
(3, 'background', '#FFFFFF');

-- --------------------------------------------------------

--
-- Struktura tabulky `page`
--

CREATE TABLE `page` (
  `id` varchar(191) NOT NULL,
  `title` varchar(191) NOT NULL,
  `content` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `createdAt` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `updatedAt` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pagecontent`
--

CREATE TABLE `pagecontent` (
  `id` int(11) NOT NULL,
  `key` varchar(191) NOT NULL,
  `value` varchar(191) DEFAULT NULL,
  `updatedAt` datetime(3) NOT NULL,
  `updatedBy` varchar(191) NOT NULL,
  `headtext` varchar(191) NOT NULL,
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `pagecontent`
--

INSERT INTO `pagecontent` (`id`, `key`, `value`, `updatedAt`, `updatedBy`, `headtext`, `settings`) VALUES
(2, 'homepage_title', 'Moje nová stránka', '2025-06-16 15:13:54.429', 'system', 'Head text', '{\"color\":\"#ffffff\",\"fontSize\":\"text-6xl\"}'),
(3, 'podnadpis', 'Popis stránky 2', '2025-06-13 16:38:27.059', 'system', 'Pod nadpis', '{\"color\":\"#ffffff\",\"fontSize\":\"text-xl\"}'),
(4, 'o_nas_titulek', 'O nás titulek', '2025-06-18 23:10:35.000', '', 'O nás titulek', NULL),
(6, 'o_nas_text', 'Zde můžete napsat krátké představení o sobě nebo vaší firmě. Tento text by měl být výstižný a zajímavý, aby zaujal návštěvníky vašeho webu a představil jim, čím se zabýváte.\n\n', '2025-06-11 23:10:38.000', '', 'O nás text\n', NULL),
(7, 'nazev_stranky', 'Kuchařka', '2025-06-15 19:54:05.429', 'system', 'Název stránky', '{\"color\":\"#000000\",\"fontSize\":\"text-base\"}');

-- --------------------------------------------------------

--
-- Struktura tabulky `session`
--

CREATE TABLE `session` (
  `id` varchar(191) NOT NULL,
  `sessionToken` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `stranka`
--

CREATE TABLE `stranka` (
  `id` int(11) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `user`
--

CREATE TABLE `user` (
  `id` varchar(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `emailVerified` tinyint(1) DEFAULT NULL,
  `dic` varchar(191) DEFAULT NULL,
  `firma` varchar(191) DEFAULT NULL,
  `ico` int(11) DEFAULT NULL,
  `mesto` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `psc` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL,
  `ulice` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`, `emailVerified`, `dic`, `firma`, `ico`, `mesto`, `phone`, `psc`, `state`, `ulice`) VALUES
('cmbji3q69000707l7g4xld6ww', 'Jan Novák', '$2a$12$cA7WjSnLwuQeVPVLIXnvceg1XS8N5ceCriREQAVoQWNrW8x6T7NX2', 'zkouska@zkouska.cz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmbv2aoy900041zith5ni1izb', 'Petr Mára', '$2b$10$Igy4ZUvHXwkucTnBDvgU0uM.ns85YueSKzjq1CK2tvYJCv91yJhja', 'petr@mara.cz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmbv2b2r300051zitaa9lrahc', 'Alena Jablůňková', '$2b$10$6q.LfrE3TxPhZPWVGpV3HuZfpnSBtJHn7/zmHssZcbVdSra7bE4ZK', 'alena@jablunkova.cz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
('cmbzhl4j800008vwnsd7706i0', 'Jandsa Asad', '$2b$10$kHLDoA82tsaPVBObc5AGrOH34Chy7TMSNlU4Ug7kD3uvWZkpUbMGK', 'zajicek.matej7@seznam.cz', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL,
  `id` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `used` tinyint(1) NOT NULL,
  `userId` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('0b52a050-07fb-4be2-a7c7-f1203d56ddb7', '15c9c8538a749aac949ea82f003cfd80ec1fd25d7c3034f175e541d655400ed5', '2025-06-05 10:15:19.071', '20250605062104_add_userid_key_unique', NULL, NULL, '2025-06-05 10:15:19.059', 1),
('0ec1fec9-5fe2-4198-8e1c-36636176f72d', 'bf59beb7089a71a15ebfd3dcbfc6d20d983a7c6421bfa8f7e558ac41118491ea', '2025-06-05 10:15:19.058', '20250603063707_add_user_to_pagecontent', NULL, NULL, '2025-06-05 10:15:18.694', 1),
('1ddfd5cf-6ffd-44c4-b731-9e1311fb7a06', '320e8cba316d9ac614f6f5cc67464c2313440f1db658fb23073fbc3b24c09841', '2025-06-05 10:43:23.721', '20250605104323_mig', NULL, NULL, '2025-06-05 10:43:23.701', 1),
('3ff07133-6a38-4a54-93bc-17ae81fc205a', '38f50dc6cf7113b39bbc14e2a6bb9425ca4ac3c3889d1f964f20c876d1846de2', '2025-06-05 10:15:18.691', '20240604101908_new', NULL, NULL, '2025-06-05 10:15:18.669', 1),
('4466f004-c5e3-407c-9602-9ea87df05951', '3ff2974a94daafff396a8f0ff3eac627a6ca0692a600584e3f02b1b7765c654a', '2025-06-05 13:38:50.940', '20250605133850_setting', NULL, NULL, '2025-06-05 13:38:50.899', 1),
('64166c3e-f42b-4b0c-ad2b-e752820b8fc4', '138b75cc99cddcfe5c06f0006c5fae26b5f11dd636e3799e103a72e1bf125b82', '2025-06-05 10:15:18.631', '20240419181232_init', NULL, NULL, '2025-06-05 10:15:18.319', 1),
('a508005c-153a-459d-b927-6a78c96a4620', 'fd0f8b7dff318228ea628ff14a517c4a1cba96f129272f303c77277a64bb58b2', '2025-06-05 10:18:30.645', '20250605101830_remove_userid_from_pagecontent', NULL, NULL, '2025-06-05 10:18:30.580', 1),
('cab7a0a7-d327-4e0e-b11d-a3798e0b0e1e', 'a39dc4091dcf855c5b12ff969a5de60de84966d4153d2b8ef76b488b452420d5', '2025-06-05 10:15:18.665', '20240424104612_csfd', NULL, NULL, '2025-06-05 10:15:18.634', 1);

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Blog_userId_fkey` (`userId`);

--
-- Indexy pro tabulku `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexy pro tabulku `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Page_userId_fkey` (`userId`);

--
-- Indexy pro tabulku `pagecontent`
--
ALTER TABLE `pagecontent`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `PageContent_key_key` (`key`);

--
-- Indexy pro tabulku `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Session_sessionToken_key` (`sessionToken`),
  ADD KEY `Session_userId_fkey` (`userId`);

--
-- Indexy pro tabulku `stranka`
--
ALTER TABLE `stranka`
  ADD PRIMARY KEY (`id`),
  ADD KEY `Stranka_userId_fkey` (`userId`);

--
-- Indexy pro tabulku `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `User_email_key` (`email`);

--
-- Indexy pro tabulku `verificationtoken`
--
ALTER TABLE `verificationtoken`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `VerificationToken_token_key` (`token`);

--
-- Indexy pro tabulku `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pro tabulku `pagecontent`
--
ALTER TABLE `pagecontent`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pro tabulku `stranka`
--
ALTER TABLE `stranka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `verificationtoken`
--
ALTER TABLE `verificationtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Omezení pro exportované tabulky
--

--
-- Omezení pro tabulku `blog`
--
ALTER TABLE `blog`
  ADD CONSTRAINT `Blog_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Omezení pro tabulku `page`
--
ALTER TABLE `page`
  ADD CONSTRAINT `Page_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;

--
-- Omezení pro tabulku `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `Session_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Omezení pro tabulku `stranka`
--
ALTER TABLE `stranka`
  ADD CONSTRAINT `Stranka_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
