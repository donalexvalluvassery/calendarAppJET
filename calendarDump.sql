-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: calendar
-- ------------------------------------------------------
-- Server version	8.0.22

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

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts` (
  `username` varchar(45) NOT NULL,
  `firstname` varchar(45) NOT NULL,
  `lastname` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES ('','','','',''),('akshaypkumar','Akshay','Kumar','password','akshaypk@gmail.com'),('ashishp','Ashish','P','password','ashishp@mec.com'),('donalex','don','alex','password','don@mec.com'),('francisaldrick','Francis','Aldrick','password','francisaldrickscv@gmail.com'),('leonjoe','Leon','Joe','password','leonjoek@gmail.com'),('nithins','Nithin','Suresh','password','nithinssuresh@gmail.com'),('tester1','tester','one','password','testerone@abc.com'),('thomasjoseph','Thomas','Joseph','password','thomasj@gmail.com'),('usereight','user','seven','password','userseven@abc.com'),('usereleven','user','eleven','password','usereleven@abc.com'),('userfive','user','five','password','userfive@abc.com'),('userfour','user','four','password','userfour@abc.com'),('usernine','user','seven','password','userseven@abc.com'),('userone','user','one','password','userone@abc.com'),('userseven','user','seven','password','userseven@abc.com'),('usersix','user','six','password','usersix@abc.com'),('userten','user','ten','password','userten@abc.com'),('userthree','user','three','password','userthree@abc.com'),('usertwo','user','two','password','usertwo@abc.com');
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `meeting`
--

DROP TABLE IF EXISTS `meeting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `meeting` (
  `id` varchar(45) NOT NULL,
  `time` timestamp NOT NULL,
  `meetingName` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `meeting`
--

LOCK TABLES `meeting` WRITE;
/*!40000 ALTER TABLE `meeting` DISABLE KEYS */;
INSERT INTO `meeting` VALUES ('124fim9','2020-11-30 16:00:00','meeting three'),('1294un','2020-12-07 14:20:00','Weekly discussion'),('192rjif','2020-12-09 15:40:00','Sales and marketing'),('219481','2020-12-01 14:10:00','Framwork discussion'),('21h9a2','2022-12-03 12:00:00','Marketing Discussion Weekly'),('21h9f','2021-12-07 12:00:00','Zoom Integration Final '),('21h9fq','2020-12-04 12:00:00','Weekly Discussion'),('22318','2019-12-03 12:10:00','Meeting on 2018'),('22341','2019-12-03 12:10:00','Meeting on 2019'),('224124','2018-12-03 12:10:00','Meeting on 2017'),('291491','2020-05-13 12:05:00','Meeting Month May'),('914189','2022-09-18 14:10:00','Meeting on 2022'),('914781','2021-12-09 14:00:00','Meeting on 2021'),('91djs','2020-12-09 16:00:00','Story discussion'),('91fus9','2020-12-24 18:00:00','Performance Analysis'),('91h9d','2021-12-03 12:00:00','Group Discussion 01'),('a19rd','2020-12-09 00:00:00','Meeting Test'),('aif2r','2020-12-01 21:00:00','Meeting time test'),('an29fjni','2020-12-19 14:15:00','Design Finalization'),('as20m0s','2020-12-07 16:00:00','Design discussion'),('as912hf','2020-12-09 19:00:00','Design Finalization'),('as9n2n','2020-12-22 15:05:00','Monthly Discussion'),('asc14rvg','2020-12-01 16:00:00','meeting 11'),('asd912n','2020-12-07 14:30:00','Zoom Integration'),('cfasif214','2020-12-01 16:00:00','Meeting Dec 1'),('coq90cn','2020-12-01 16:00:00','meeting test six'),('d12fn','2018-12-06 14:10:00','Meeting on 2018'),('d192r12','2020-12-04 16:00:00','Monthly Meeting'),('d1riijf1','2020-11-30 16:00:00','meeting 2'),('d91r1ff','2020-11-29 16:00:00','meeting 0123'),('d9s31','2020-11-30 16:00:00','meeting 0123'),('d9sd14','2020-11-29 16:00:00','meeting 0123'),('ds234','2019-12-18 00:00:00','Group discussion 9 '),('dsa921r','2020-12-07 14:10:00','Framework Design'),('dsavb2134','2020-11-30 16:00:00','meeting 1'),('dsv112','2020-11-29 16:00:00','meeting seven'),('dsv123f','2020-11-30 16:00:00','meeting five'),('dsv1qwf1','2020-11-30 16:00:00','meeting six'),('dsv234','2019-12-12 00:00:00','Concluding Design'),('dvs921f','2020-12-02 17:00:00','Meeting final test'),('hs91dh','2020-12-09 17:00:00','Final Framework decision'),('i9d81d','2019-12-06 13:00:00','Framework Discussion'),('isdjfni','2020-11-29 16:00:00','aisfn'),('meetid124','2020-12-03 11:30:00','Meeting test final'),('mef20f','2020-11-30 17:00:00','meeting 4'),('opfjemoil','2020-11-26 16:00:00','adkbqf'),('q2f','2020-11-30 16:00:00','awfs'),('sadf43341rt','2021-11-10 00:00:00','Group Discussion'),('sadfo1234','2021-12-14 00:00:00','Group Discuission 4'),('sdhi21r','2020-12-02 16:00:00','meeting 9'),('sf9124','2020-12-09 00:00:00','erfm1'),('sodf9124','2020-12-01 23:59:00','meeting test'),('wqef9iu','2020-11-29 16:00:00','adnkvf');
/*!40000 ALTER TABLE `meeting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `participants`
--

DROP TABLE IF EXISTS `participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `participants` (
  `id` varchar(45) DEFAULT NULL,
  `username` varchar(45) DEFAULT NULL,
  `host` tinyint(1) DEFAULT NULL,
  KEY `id` (`id`),
  KEY `username` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `participants`
--

LOCK TABLES `participants` WRITE;
/*!40000 ALTER TABLE `participants` DISABLE KEYS */;
INSERT INTO `participants` VALUES ('cfasif214',NULL,0),('cfasif214',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('meetid124',NULL,0),('asd912n','francisaldrick',0),('21h9a2','akshaypkumar',0),('21h9f','akshaypkumar',0),('i9d81d','donalex',0),('i9d81d','akshaypkumar',0),('i9d81d','francisaldrick',0),('91djs','donalex',0),('91djs','akshaypkumar',0),('91djs','francisaldrick',0),('an29fjni','akshaypkumar',0),('hs91dh','akshaypkumar',1),('hs91dh','donalex',0),('hs91dh','francisaldrick',0),('a19rd','akshaypkumar',0),('a19rd','thomasjoseph',0),('dsa921r','thomasjoseph',1),('dsa921r','donalex',0),('dsa921r','francisaldrick',0),('22318','leonjoe',1),('22318','nithins',0),('22341','leonjoe',1),('22341','nithins',0),('224124','leonjoe',1),('224124','nithins',0),('914781','leonjoe',1),('914781','nithins',0),('914189','leonjoe',1),('914189','nithins',0),('219481','leonjoe',1),('219481','nithins',0),('d192r12','leonjoe',1),('d192r12','nithins',0),('1294un','leonjoe',1),('192rjif','nithins',1),('192rjif','leonjoe',0),('91fus9','nithins',1),('91fus9','leonjoe',0),('as912hf','nithins',1),('as912hf','leonjoe',0),('as912hf','ashishp',0),('219481','ashishp',0),('291491','leonjoe',1),('291491','ashishp',0);
/*!40000 ALTER TABLE `participants` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-11 10:13:30
