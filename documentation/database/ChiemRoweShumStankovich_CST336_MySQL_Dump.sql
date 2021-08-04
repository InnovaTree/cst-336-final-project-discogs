-- ------------------------------------------------------------------
-- NAMES: Larry Chiem, Ian Rowe, Raymond Shum, Nicholas Stankovich
-- COURSE: CST 336
-- INSTRUCTOR: Dr. Miguel Lara
-- ASSIGNMNET: Final Project
-- DESCRIPTION: This is a dump of our project's MySQL database hosted
-- on Heroku. It contains both our CREATE TABLE and INSERT TABLE 
-- statements containing data up until 2021-08-04. 
-- ------------------------------------------------------------------


CREATE DATABASE  IF NOT EXISTS `finalproject` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `finalproject`;
-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: [REMOVED]    Database: [REMOVED]
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `album` (
  `albumid` int NOT NULL,
  `title` varchar(250) NOT NULL,
  `image` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`albumid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` (`albumid`, `title`, `image`) VALUES (11157,'Test 2','https://img.discogs.com/FQ1rf-NmAG1JxGnUWPmEOVakrfk=/fit-in/600x594/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-11157-1447504081-4407.jpeg.jpg'),(26673,'Acid Test Ltd','https://img.discogs.com/quylxUayjJtVtzgJd7ywqFilrrQ=/fit-in/600x591/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-26673-1124191124.jpg.jpg'),(56073,'Edge Test','https://img.discogs.com/PVlodTUU5iKVY31_74amVcMbysk=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-56073-1399726560-6163.jpeg.jpg'),(75745,'Test. Don\'t Test','https://img.discogs.com/Y-PmxfwDwHao00odeet-5h5L-cw=/fit-in/600x589/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-75745-1579444145-4993.jpeg.jpg'),(99613,'Test 3','https://img.discogs.com/kRhS4_ng6ZzkSnOHgUu3Nhz30ZU=/fit-in/340x331/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-99613-1117922643.jpg.jpg'),(1201256,'Test. Don\'t Test','https://img.discogs.com/UVDzJaQOkWgRh9jmaSv2VhhllXk=/fit-in/459x470/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1201256-1200327257.jpeg.jpg'),(1635587,'Test','https://img.discogs.com/kHD7mPJsWL7P6nyK-dYrN_d72g0=/fit-in/582x582/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-1635587-1367855780-1500.jpeg.jpg'),(2006073,'Test...Test...','https://img.discogs.com/l1v92xIlDJHCgY9zH_DNVgd2wqY=/fit-in/224x225/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-2006073-1343811747-2378.jpeg.jpg'),(3674828,'Test. Don\'t Test','https://img.discogs.com/It4m5_I3CnrUMXs9sdhOQUa_yIc=/fit-in/600x520/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3674828-1401883536-8769.jpeg.jpg'),(3817318,'Dance, Dance, Dance','https://img.discogs.com/D5UsQoeKWHDbmryDm5X2QFLQYQ0=/fit-in/600x596/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-3817318-1345573743-5823.jpeg.jpg'),(5203051,'Starbomb','https://img.discogs.com/n5mJlQ0rDwlAoPvDKqUSPn9JT_I=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-5203051-1387347389-2747.jpeg.jpg'),(6094944,'Test. Don\'t Test','https://img.discogs.com/VNhDBea-Qh4CQsnEZRU-b_4TDUg=/fit-in/280x280/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6094944-1410935637-6544.jpeg.jpg'),(6456632,'Player Select','https://img.discogs.com/t4eODXxTEQUqBrCOvNGibsfbm6Y=/fit-in/200x200/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-6456632-1419708935-2462.jpeg.jpg'),(8932058,'Hempire','https://img.discogs.com/A8flQST9YY2foPKdFnYap_grNUE=/fit-in/450x450/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8932058-1471764409-8070.jpeg.jpg'),(8985683,'Test, Test','https://img.discogs.com/lnydgs7exLYAsf1z6UwEjZp-NJg=/fit-in/280x280/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8985683-1472782007-1349.jpeg.jpg'),(9775175,'Packs','https://img.discogs.com/SAESsTKJE9asMz_62LKAfs_ba3k=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9775175-1486154663-6299.jpeg.jpg'),(9908886,'Test.','https://img.discogs.com/FkxuEXSk9-tGBgTsEAraFfGMfDw=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-9908886-1488362236-4518.jpeg.jpg'),(10951127,'Cuphead - Original Soundtrack','https://img.discogs.com/RvRwiDAauHszajVcBXut6lYLfdY=/fit-in/368x368/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-10951127-1518618539-9661.jpeg.jpg'),(13526140,'The Tryforce','https://img.discogs.com/WSZrK38P6cHak4KrKUgwuKNVfJI=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13526140-1555868645-8591.jpeg.jpg'),(13705581,'Test Test EP','https://img.discogs.com/IhMFGTlgmtHLGQwONErqHcwjkyU=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-13705581-1559408735-4039.jpeg.jpg'),(14380460,'We The Kings','https://img.discogs.com/UWecnbB6Iirn9TBXkKrWEMiJWkg=/fit-in/600x600/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-14380460-1573369026-7995.jpeg.jpg');
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `collection`
--

DROP TABLE IF EXISTS `collection`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `collection` (
  `collectionid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `albumid` int NOT NULL,
  PRIMARY KEY (`collectionid`),
  KEY `userid` (`userid`),
  KEY `albumid` (`albumid`),
  CONSTRAINT `collection_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `collection_ibfk_2` FOREIGN KEY (`albumid`) REFERENCES `album` (`albumid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `collection`
--

LOCK TABLES `collection` WRITE;
/*!40000 ALTER TABLE `collection` DISABLE KEYS */;
INSERT INTO `collection` (`collectionid`, `userid`, `albumid`) VALUES (1,1,1635587),(2,1,56073),(3,2,1635587),(4,2,56073),(5,2,99613),(6,2,11157),(7,2,26673),(8,2,2006073),(9,3,5203051),(10,3,6456632),(11,3,13526140),(12,5,2006073),(13,5,75745),(14,4,8985683),(15,4,1201256),(16,6,3817318),(17,6,9775175),(18,6,8932058),(21,7,8985683),(22,8,8985683),(23,8,2006073),(24,9,8985683),(25,9,2006073),(26,9,6094944),(27,9,9908886),(28,9,13705581),(29,10,8985683),(30,8,3674828),(31,11,8985683),(32,12,8985683),(33,12,2006073),(34,12,6094944),(35,12,9908886),(36,13,8985683),(37,13,2006073),(38,13,6094944),(39,13,9908886);
/*!40000 ALTER TABLE `collection` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `review`
--

DROP TABLE IF EXISTS `review`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `review` (
  `reviewid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `albumid` int NOT NULL,
  `reviewtext` text NOT NULL,
  PRIMARY KEY (`reviewid`),
  KEY `userid` (`userid`),
  KEY `albumid` (`albumid`),
  CONSTRAINT `review_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `review_ibfk_2` FOREIGN KEY (`albumid`) REFERENCES `album` (`albumid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `review`
--

LOCK TABLES `review` WRITE;
/*!40000 ALTER TABLE `review` DISABLE KEYS */;
INSERT INTO `review` (`reviewid`, `userid`, `albumid`, `reviewtext`) VALUES (1,1,1635587,'test'),(2,1,56073,'test221'),(3,2,1635587,'This album is not bad?'),(4,2,56073,'This album exists.'),(5,2,99613,'What am I doing?'),(6,2,11157,'Another review.'),(7,2,26673,'Where am I?'),(8,2,2006073,'test!'),(9,1,14380460,'This is an album.'),(11,5,2006073,'test2'),(13,5,75745,'test!'),(14,4,8985683,'test'),(15,4,1201256,'test2'),(16,7,8985683,'test2'),(24,9,13705581,'test'),(25,9,9908886,'test'),(26,9,6094944,'test'),(27,9,2006073,'test'),(28,9,8985683,'test'),(30,10,8985683,'test'),(32,11,8985683,'TEST'),(35,12,8985683,'test!'),(36,12,2006073,'test'),(37,12,6094944,'test'),(38,12,9908886,'test'),(39,8,2006073,'test!'),(41,8,3674828,'test!'),(42,13,8985683,'test!!');
/*!40000 ALTER TABLE `review` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL AUTO_INCREMENT,
  `fname` varchar(100) DEFAULT NULL,
  `lname` varchar(100) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `username` varchar(15) NOT NULL,
  `password` varchar(72) NOT NULL,
  PRIMARY KEY (`userid`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`userid`, `fname`, `lname`, `email`, `username`, `password`) VALUES (1,'guest','guest','guest@guest.com','guest','$2b$10$0dj0UNld55052usAY9SWhO/p2mjVWCuxdAhe5wxgmXar.Bk31b6lK'),(2,'Raymond','Shum','fake@email.com','rshum','$2b$10$Gj69S7WwLXCL90j326fCceaOxH73UzYdEzmPFxYSIuznMLZvlciIG'),(3,'Nicholas','Stankovich','DracoDeVis@gmail.com','DracoDeVis','$2b$10$Rnns/cGJI2b64orr/ilbFu2j8W8I.OCcRxCvjTpj32xNK8ipBzb.W'),(4,'test3','test3','test3@test.com','test3','$2b$10$.SnCpR5kFk6KFahQirFh4OUHbE3PxXeSl.q5DswFo0ZAXf6cLkVVq'),(5,'guest2','guest2','guest2@guest2.com','guest22','$2b$10$COEyyXOSPskcWtjh9q5vseJ56TeS953Mzg0mFXYsVcZ0yrvhEIR0u'),(6,'Larry','Chiem','larrychiem@gmail.com','LarryChiem','$2b$10$YGmicOJcPZuOXEyWRVNJ4uACvnpFIA22DR7sn63L8eNU.j6oDF43a'),(7,'test10','test10','test10@test10.com','test10','$2b$10$iczBx1Kbi8/jHzJOeAuX1OqNBQpUZlith8Ke8A55s/lE8fFivLphu'),(8,'test33','test33','test33@test33.com','test33','$2b$10$9pltGwsHDD9GPmU0B6QetONhIKAulH/WaFewH6/xQq4zJUG/FQHva'),(9,'test44','test44','test44@test44.com','test44','$2b$10$aPhM5Up/hyYeNuBqrKpun.jnAYO37HtbGia2MoKPoOmGtJg4PtOd6'),(10,'test55','test55','test55@test55.com','test55','$2b$10$bOuA1YEi8QswyTuoSToBy.ZUKae3qc9Izn8lNZMXOaczslGm0q1jW'),(11,'test77','test77','test77@test77.com','test77','$2b$10$UIosb3DymdNT5JHyvEjO7O8sDyQyouFTEQQAd3X1Fi3ti4wdnXNIm'),(12,'test88','test88','test88@test88.com','test88','$2b$10$HzzDsPL0Fjauy2LWgz9uK.mKU1nPJ287F2gy5zPZcLDbS1MO52H/e'),(13,'test99','test99','test99@gmail.com','test99','$2b$10$qGLNmX7BYHimbiftTudcvuam9WU6IFOQ0GAW85Xju2bVAKcf0QQPS');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlistid` int NOT NULL AUTO_INCREMENT,
  `userid` int NOT NULL,
  `albumid` int NOT NULL,
  PRIMARY KEY (`wishlistid`),
  KEY `userid` (`userid`),
  KEY `albumid` (`albumid`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`albumid`) REFERENCES `album` (`albumid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` (`wishlistid`, `userid`, `albumid`) VALUES (1,1,1635587),(2,1,56073),(3,2,1635587),(4,2,56073),(5,2,99613),(6,2,2006073),(7,1,14380460),(8,5,2006073),(9,5,75745),(10,4,8985683),(11,3,10951127),(12,6,3817318),(13,6,9775175),(14,6,8932058),(17,8,2006073),(18,9,8985683),(19,9,2006073),(20,9,6094944),(21,9,9908886),(22,9,13705581),(23,10,8985683),(24,8,3674828),(25,11,8985683),(26,12,8985683),(27,12,2006073),(28,12,6094944),(29,12,13705581),(30,13,8985683),(31,13,2006073),(32,13,6094944),(33,13,9908886),(34,13,13705581);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-08-04 10:15:57
