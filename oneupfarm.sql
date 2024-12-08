-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 05, 2024 at 07:46 PM
-- Server version: 8.0.30
-- PHP Version: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oneupfarm`
--

-- --------------------------------------------------------

--
-- Table structure for table `avatars`
--
DROP DATABASE IF EXISTS oneupfarm;
CREATE DATABASE oneupfarm;
USE oneupfarm;
CREATE TABLE `avatars` (
  `avatarId` int NOT NULL,
  `userId` int NOT NULL,
  `exp` int NOT NULL,
  `gold` int NOT NULL,
  `level` int NOT NULL,
  `health` int NOT NULL,
  `maxHealth` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plants`
--

CREATE TABLE `plants` (
  `plantId` int NOT NULL,
  `urlPicture` varchar(255) NOT NULL,
  `harvestDay` int NOT NULL,
  `plantName` varchar(255) NOT NULL,
  `difficulty` enum('mudah','sedang','susah') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `plants`
--

INSERT INTO `plants` (`plantId`, `urlPicture`, `harvestDay`, `plantName`, `difficulty`) VALUES
(1, 'tomat.jpg', 30, 'Tumbuhan Tomat', 'susah'),
(2, 'tomat.jpg', 30, 'Tumbuhan Tomat', 'susah');

-- --------------------------------------------------------

--
-- Table structure for table `todo_lists`
--

CREATE TABLE `todo_lists` (
  `todoId` int NOT NULL,
  `userPlantId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `isOverdue` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `todo_tasks`
--

CREATE TABLE `todo_tasks` (
  `todoTaskId` int NOT NULL,
  `todoId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `isComplete` enum('true','false') NOT NULL,
  `gold` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('F','M') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `name`, `email`, `password`, `gender`) VALUES
(4, 'Aldy Jhonatan hutasoit', 'Aldyjhonatanhutasoit.1', 'password123', 'F'),
(8, 'SudahSaatnya Tidur', 'Tidur123@gmail.com', '$2a$10$cxToxt6HMqvQkK3RhxPWm.2S.jIhXKV.wZaoxBU.ESQ5xisczGk86', 'M'),
(9, 'SudahSaatnya Tidur', 'Tidur12333@gmail.com', '$2a$10$o88HF278ihqy85N.qpveS.HjHqK2ppIGv2SODHr4nyb9iU/AEb5BW', 'M');

-- --------------------------------------------------------

--
-- Table structure for table `user_plants`
--

CREATE TABLE `user_plants` (
  `userPlantId` int NOT NULL,
  `userId` int NOT NULL,
  `plantId` int NOT NULL,
  `PlantDate` date NOT NULL,
  `harvestDate` date NOT NULL,
  `Method_plant` enum('pot','polybag') NOT NULL,
  `Location_Plant` enum('tanah','hidroponik') NOT NULL,
  `IsComplate` enum('true','false') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user_plants`
--

INSERT INTO `user_plants` (`userPlantId`, `userId`, `plantId`, `PlantDate`, `harvestDate`, `Method_plant`, `Location_Plant`, `IsComplate`) VALUES
(5, 4, 1, '2024-11-11', '2024-11-21', 'pot', 'tanah', 'true'),
(7, 8, 2, '2024-11-01', '2024-12-01', 'pot', 'tanah', 'true'),
(8, 8, 2, '2024-11-01', '2024-12-01', 'pot', 'tanah', 'true');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `avatars`
--
ALTER TABLE `avatars`
  ADD PRIMARY KEY (`avatarId`),
  ADD KEY `fk_userIdavatars` (`userId`);

--
-- Indexes for table `plants`
--
ALTER TABLE `plants`
  ADD PRIMARY KEY (`plantId`);

--
-- Indexes for table `todo_lists`
--
ALTER TABLE `todo_lists`
  ADD PRIMARY KEY (`todoId`),
  ADD KEY `fk_userplantId` (`userPlantId`);

--
-- Indexes for table `todo_tasks`
--
ALTER TABLE `todo_tasks`
  ADD PRIMARY KEY (`todoTaskId`),
  ADD KEY `fk_todoId` (`todoId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `user_plants`
--
ALTER TABLE `user_plants`
  ADD PRIMARY KEY (`userPlantId`),
  ADD KEY `fk_userId` (`userId`),
  ADD KEY `fk_plantid` (`plantId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `avatars`
--
ALTER TABLE `avatars`
  MODIFY `avatarId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plants`
--
ALTER TABLE `plants`
  MODIFY `plantId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `todo_lists`
--
ALTER TABLE `todo_lists`
  MODIFY `todoId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `todo_tasks`
--
ALTER TABLE `todo_tasks`
  MODIFY `todoTaskId` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `user_plants`
--
ALTER TABLE `user_plants`
  MODIFY `userPlantId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `avatars`
--
ALTER TABLE `avatars`
  ADD CONSTRAINT `fk_userIdavatars` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `todo_lists`
--
ALTER TABLE `todo_lists`
  ADD CONSTRAINT `fk_userplantId` FOREIGN KEY (`userPlantId`) REFERENCES `user_plants` (`userPlantId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `todo_tasks`
--
ALTER TABLE `todo_tasks`
  ADD CONSTRAINT `fk_todoId` FOREIGN KEY (`todoId`) REFERENCES `todo_lists` (`todoId`) ON DELETE RESTRICT ON UPDATE RESTRICT;

--
-- Constraints for table `user_plants`
--
ALTER TABLE `user_plants`
  ADD CONSTRAINT `fk_plantid` FOREIGN KEY (`plantId`) REFERENCES `plants` (`plantId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
