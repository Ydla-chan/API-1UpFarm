-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: oneupfarm
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `oneupfarm`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `oneupfarm` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `oneupfarm`;

--
-- Table structure for table `avatars`
--

DROP TABLE IF EXISTS `avatars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatars` (
  `avatarId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `exp` int NOT NULL,
  `gold` int NOT NULL,
  `level` int NOT NULL,
  `health` int NOT NULL,
  `maxHealth` int NOT NULL,
  PRIMARY KEY (`avatarId`),
  KEY `fk_userIdavatars` (`userId`),
  CONSTRAINT `fk_userIdavatars` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatars`
--

LOCK TABLES `avatars` WRITE;
/*!40000 ALTER TABLE `avatars` DISABLE KEYS */;
/*!40000 ALTER TABLE `avatars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `badges`
--

DROP TABLE IF EXISTS `badges`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `badges` (
  `badgeId` int NOT NULL AUTO_INCREMENT,
  `type` enum('easy','medium','hard') NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`badgeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `badges`
--

LOCK TABLES `badges` WRITE;
/*!40000 ALTER TABLE `badges` DISABLE KEYS */;
/*!40000 ALTER TABLE `badges` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plants`
--

DROP TABLE IF EXISTS `plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plants` (
  `plantId` int NOT NULL AUTO_INCREMENT,
  `urlPicture` varchar(255) NOT NULL,
  `harvestDay` int NOT NULL,
  `plantName` varchar(255) NOT NULL,
  `difficulty` enum('mudah','sedang','susah') NOT NULL,
  PRIMARY KEY (`plantId`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plants`
--

LOCK TABLES `plants` WRITE;
/*!40000 ALTER TABLE `plants` DISABLE KEYS */;
INSERT INTO `plants` VALUES (4,'/static/plants/tomat.png',28,'Tomat','sedang'),(5,'/static/plants/selada.png',20,'Selada','mudah'),(6,'/static/plants/bawang.png',40,'Bawang','susah');
/*!40000 ALTER TABLE `plants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_lists`
--

DROP TABLE IF EXISTS `todo_lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_lists` (
  `todoId` int NOT NULL AUTO_INCREMENT,
  `userPlantId` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `isOverdue` enum('true','false') NOT NULL,
  PRIMARY KEY (`todoId`),
  KEY `fk_userplantId` (`userPlantId`),
  CONSTRAINT `fk_userplantId` FOREIGN KEY (`userPlantId`) REFERENCES `user_plants` (`userPlantId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_lists`
--

LOCK TABLES `todo_lists` WRITE;
/*!40000 ALTER TABLE `todo_lists` DISABLE KEYS */;
/*!40000 ALTER TABLE `todo_lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `todo_tasks`
--

DROP TABLE IF EXISTS `todo_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `todo_tasks` (
  `todoTaskId` int NOT NULL AUTO_INCREMENT,
  `todoId` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `isComplete` enum('true','false') NOT NULL,
  `gold` varchar(255) NOT NULL,
  `task` varchar(255) NOT NULL,
  PRIMARY KEY (`todoTaskId`),
  KEY `fk_todoId` (`todoId`),
  CONSTRAINT `fk_todoId` FOREIGN KEY (`todoId`) REFERENCES `todo_lists` (`todoId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `todo_tasks`
--

LOCK TABLES `todo_tasks` WRITE;
/*!40000 ALTER TABLE `todo_tasks` DISABLE KEYS */;
/*!40000 ALTER TABLE `todo_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_plants`
--

DROP TABLE IF EXISTS `user_plants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_plants` (
  `userPlantId` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `plantId` int NOT NULL,
  `PlantDate` date NOT NULL,
  `harvestDate` date NOT NULL,
  `Method_plant` enum('pot','polybag') NOT NULL,
  `Location_Plant` enum('tanah','hidroponik') NOT NULL,
  `IsComplate` enum('true','false') NOT NULL,
  PRIMARY KEY (`userPlantId`),
  KEY `fk_userId` (`userId`),
  KEY `fk_plantid` (`plantId`),
  CONSTRAINT `fk_plantid` FOREIGN KEY (`plantId`) REFERENCES `plants` (`plantId`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_userId` FOREIGN KEY (`userId`) REFERENCES `users` (`userid`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_plants`
--

LOCK TABLES `user_plants` WRITE;
/*!40000 ALTER TABLE `user_plants` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_plants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `gender` enum('F','M') NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `email_2` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (4,'Aldy Jhonatan hutasoit','Aldyjhonatanhutasoit.1','password123','F'),(8,'SudahSaatnya Tidur','Tidur123@gmail.com','$2a$10$cxToxt6HMqvQkK3RhxPWm.2S.jIhXKV.wZaoxBU.ESQ5xisczGk86','M'),(9,'SudahSaatnya Tidur','Tidur12333@gmail.com','$2a$10$o88HF278ihqy85N.qpveS.HjHqK2ppIGv2SODHr4nyb9iU/AEb5BW','M');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-11 19:47:29
