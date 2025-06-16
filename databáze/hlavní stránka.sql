-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Pon 16. čen 2025, 22:20
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
-- Databáze: `projekt`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `newsletter`
--

CREATE TABLE `newsletter` (
  `id` int(11) NOT NULL,
  `email` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktura tabulky `pages`
--

CREATE TABLE `pages` (
  `id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `userEmail` varchar(191) DEFAULT NULL,
  `name` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `pages`
--

INSERT INTO `pages` (`id`, `status`, `userEmail`, `name`) VALUES
(1, 0, 'zajicek.matej7@seznam.cz', 'web1');

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
  `name` varchar(191) NOT NULL,
  `idtemplate` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `stranka`
--

INSERT INTO `stranka` (`id`, `userId`, `name`, `idtemplate`) VALUES
(25, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(26, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(27, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(28, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(29, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(30, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(31, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(32, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(33, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(34, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(35, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(36, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(37, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(38, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(39, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(40, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(41, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(42, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(43, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(44, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(45, 'cmby2ghrm0001bkunior56rm1', 'Makam', 1),
(46, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(47, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(48, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(49, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(50, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(51, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(52, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1),
(53, 'cmby2ghrm0001bkunior56rm1', 'Firemní stránka', 1);

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
  `firma` varchar(191) DEFAULT NULL,
  `phone` varchar(191) DEFAULT NULL,
  `ico` int(11) DEFAULT NULL,
  `dic` varchar(191) DEFAULT NULL,
  `ulice` varchar(191) DEFAULT NULL,
  `mesto` varchar(191) DEFAULT NULL,
  `psc` varchar(191) DEFAULT NULL,
  `state` varchar(191) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `user`
--

INSERT INTO `user` (`id`, `name`, `password`, `email`, `emailVerified`, `firma`, `phone`, `ico`, `dic`, `ulice`, `mesto`, `psc`, `state`) VALUES
('cmby2ghrm0001bkunior56rm1', 'Jandsa Asad', '$2b$10$X/H5sQBkq.7WHhNLmZA3bugTmNd255lOEEMc.e4UsfdU3zVYFzR46', 'zajicek.matej7@seznam.cz', 1, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabulky `verificationtoken`
--

CREATE TABLE `verificationtoken` (
  `id` int(11) NOT NULL,
  `type` varchar(191) NOT NULL,
  `userId` varchar(191) NOT NULL,
  `used` tinyint(1) NOT NULL,
  `token` varchar(191) NOT NULL,
  `expires` datetime(3) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Vypisuji data pro tabulku `verificationtoken`
--

INSERT INTO `verificationtoken` (`id`, `type`, `userId`, `used`, `token`, `expires`) VALUES
(7, 'emailverification', 'cmby2ghrm0001bkunior56rm1', 0, '1c8ce39f0e328862fa04e1cf46e45a78431d048b235877f65a0a661411df5ed0', '2025-06-15 20:36:36.060');

--
-- Indexy pro exportované tabulky
--

--
-- Indexy pro tabulku `newsletter`
--
ALTER TABLE `newsletter`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `newsLetter_email_key` (`email`);

--
-- Indexy pro tabulku `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT pro tabulky
--

--
-- AUTO_INCREMENT pro tabulku `newsletter`
--
ALTER TABLE `newsletter`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pro tabulku `pages`
--
ALTER TABLE `pages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pro tabulku `stranka`
--
ALTER TABLE `stranka`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

--
-- AUTO_INCREMENT pro tabulku `verificationtoken`
--
ALTER TABLE `verificationtoken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Omezení pro exportované tabulky
--

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
