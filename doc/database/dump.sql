-- MySQL dump 10.14  Distrib 5.5.47-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: cronos
-- ------------------------------------------------------
-- Server version	5.5.47-MariaDB-1ubuntu0.14.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `cronos`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `cronos` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `cronos`;

--
-- Table structure for table `actor`
--

DROP TABLE IF EXISTS `actor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `actor` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `nationality` varchar(64) NOT NULL,
  `birth_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (1,'Nicole Kidman','Honolulu, Hawai, US','1967-07-20'),(2,'Leonardo DiCaprio','Hollywood, California, US','1974-11-11'),(3,'Tom Hardy','Longon, England','1977-08-15'),(4,'Domhall Gleeson','Dublin,Ireland','1983-05-12'),(5,'Will Poulter','London, England','1993-01-28');
/*!40000 ALTER TABLE `actor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `award`
--

DROP TABLE IF EXISTS `award`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `award` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
INSERT INTO `award` VALUES (1,'The Oscars','United  States'),(2,'Cannes Film Festival','France');
/*!40000 ALTER TABLE `award` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cast`
--

DROP TABLE IF EXISTS `cast`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cast` (
  `movie_id` mediumint(9) NOT NULL,
  `actor_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`movie_id`,`actor_id`),
  KEY `cast_actor` (`actor_id`),
  CONSTRAINT `cast_actor` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `cast_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cast`
--

LOCK TABLES `cast` WRITE;
/*!40000 ALTER TABLE `cast` DISABLE KEYS */;
/*!40000 ALTER TABLE `cast` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `directed`
--

DROP TABLE IF EXISTS `directed`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directed` (
  `movie_id` mediumint(9) NOT NULL,
  `director_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`movie_id`,`director_id`),
  KEY `directed_director` (`director_id`),
  CONSTRAINT `directed_director` FOREIGN KEY (`director_id`) REFERENCES `director` (`id`) ON DELETE CASCADE,
  CONSTRAINT `directed_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `directed`
--

LOCK TABLES `directed` WRITE;
/*!40000 ALTER TABLE `directed` DISABLE KEYS */;
/*!40000 ALTER TABLE `directed` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `director`
--

DROP TABLE IF EXISTS `director`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `director` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `nationality` varchar(64) NOT NULL,
  `birth_date` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (8,'Alejandro Gonzalez Inarritu','Cuidad de Mexico, Mexico','1963-08-15');
/*!40000 ALTER TABLE `director` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `film_studio`
--

DROP TABLE IF EXISTS `film_studio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `film_studio` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `country` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_studio`
--

LOCK TABLES `film_studio` WRITE;
/*!40000 ALTER TABLE `film_studio` DISABLE KEYS */;
INSERT INTO `film_studio` VALUES (1,'Warner Bros','United Kingdom'),(2,'Marvel Studios','United States'),(3,'20th Century Fox','United States');
/*!40000 ALTER TABLE `film_studio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `filmed_by`
--

DROP TABLE IF EXISTS `filmed_by`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `filmed_by` (
  `movie_id` mediumint(9) NOT NULL,
  `studio_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`movie_id`,`studio_id`),
  KEY `filmed_by_studio` (`studio_id`),
  CONSTRAINT `filmed_by_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  CONSTRAINT `filmed_by_studio` FOREIGN KEY (`studio_id`) REFERENCES `film_studio` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `filmed_by`
--

LOCK TABLES `filmed_by` WRITE;
/*!40000 ALTER TABLE `filmed_by` DISABLE KEYS */;
/*!40000 ALTER TABLE `filmed_by` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genre`
--

DROP TABLE IF EXISTS `genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `genre` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `genre` varchar(64) NOT NULL,
  `sub_genre` varchar(64) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Comedy','Romance'),(2,'Comedy','Super Natural'),(3,'Adventure','Drama'),(4,'Adventure','Thriller');
/*!40000 ALTER TABLE `genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie`
--

DROP TABLE IF EXISTS `movie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `year` date NOT NULL,
  `synopsis` text NOT NULL,
  `country` varchar(64) NOT NULL,
  `url` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
/*!40000 ALTER TABLE `movie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movie_genre`
--

DROP TABLE IF EXISTS `movie_genre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movie_genre` (
  `movie_id` mediumint(9) NOT NULL,
  `genre_id` mediumint(9) NOT NULL,
  PRIMARY KEY (`movie_id`,`genre_id`),
  KEY `genre_genre` (`genre_id`),
  CONSTRAINT `genre_genre` FOREIGN KEY (`genre_id`) REFERENCES `genre` (`id`) ON DELETE CASCADE,
  CONSTRAINT `genre_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie_genre`
--

LOCK TABLES `movie_genre` WRITE;
/*!40000 ALTER TABLE `movie_genre` DISABLE KEYS */;
/*!40000 ALTER TABLE `movie_genre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomination`
--

DROP TABLE IF EXISTS `nomination`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nomination` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `nc_id` mediumint(9) NOT NULL,
  `actor_id` mediumint(9) NOT NULL,
  `year` date NOT NULL,
  `won` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nom_nc_id` (`nc_id`),
  KEY `nom_actor_id` (`actor_id`),
  CONSTRAINT `nom_actor_id` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `nom_nc_id` FOREIGN KEY (`nc_id`) REFERENCES `nomination_category` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination`
--

LOCK TABLES `nomination` WRITE;
/*!40000 ALTER TABLE `nomination` DISABLE KEYS */;
INSERT INTO `nomination` VALUES (7,4,2,'2016-01-04',1);
/*!40000 ALTER TABLE `nomination` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nomination_category`
--

DROP TABLE IF EXISTS `nomination_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `nomination_category` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `award_id` mediumint(9) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nomination_category` (`award_id`),
  CONSTRAINT `nomination_category` FOREIGN KEY (`award_id`) REFERENCES `award` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination_category`
--

LOCK TABLES `nomination_category` WRITE;
/*!40000 ALTER TABLE `nomination_category` DISABLE KEYS */;
INSERT INTO `nomination_category` VALUES (1,1,'Best Picture'),(2,1,'Best Director'),(3,1,'Best Film Editing'),(4,1,'Best Actor in a Leading Role ');
/*!40000 ALTER TABLE `nomination_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `nomination_view`
--

DROP TABLE IF EXISTS `nomination_view`;
/*!50001 DROP VIEW IF EXISTS `nomination_view`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE TABLE `nomination_view` (
  `id` tinyint NOT NULL,
  `award_id` tinyint NOT NULL,
  `award_name` tinyint NOT NULL,
  `nc_id` tinyint NOT NULL,
  `category_name` tinyint NOT NULL,
  `actor_id` tinyint NOT NULL,
  `actor_name` tinyint NOT NULL,
  `actor_nationality` tinyint NOT NULL,
  `actor_birth_date` tinyint NOT NULL,
  `year` tinyint NOT NULL,
  `won` tinyint NOT NULL
) ENGINE=MyISAM */;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `rating`
--

DROP TABLE IF EXISTS `rating`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rating` (
  `user_id` mediumint(9) NOT NULL,
  `movie_id` mediumint(9) NOT NULL,
  `play_count` int(11) NOT NULL DEFAULT '0',
  `rate` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`,`movie_id`),
  KEY `displays_movie` (`movie_id`),
  CONSTRAINT `displays_movie` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`) ON DELETE CASCADE,
  CONSTRAINT `displays_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rating`
--

LOCK TABLES `rating` WRITE;
/*!40000 ALTER TABLE `rating` DISABLE KEYS */;
/*!40000 ALTER TABLE `rating` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` mediumint(9) NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `password` varchar(64) NOT NULL,
  `email` varchar(64) NOT NULL,
  `admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'LuisRivas','LuisRivas','luis.rivas.0606@gmail.com',0),(2,'TestUser','qwerty12','qwerty12',0),(3,'LuisRivas2','2','1',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `cronos`
--

USE `cronos`;

--
-- Final view structure for view `nomination_view`
--

/*!50001 DROP TABLE IF EXISTS `nomination_view`*/;
/*!50001 DROP VIEW IF EXISTS `nomination_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `nomination_view` AS select `nom`.`id` AS `id`,`nc`.`award_id` AS `award_id`,`aw`.`name` AS `award_name`,`nom`.`nc_id` AS `nc_id`,`nc`.`name` AS `category_name`,`nom`.`actor_id` AS `actor_id`,`a`.`name` AS `actor_name`,`a`.`nationality` AS `actor_nationality`,`a`.`birth_date` AS `actor_birth_date`,`nom`.`year` AS `year`,`nom`.`won` AS `won` from (((`nomination` `nom` join `nomination_category` `nc` on((`nom`.`nc_id` = `nc`.`id`))) join `actor` `a` on((`nom`.`actor_id` = `a`.`id`))) join `award` `aw` on((`aw`.`id` = `nc`.`award_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-03-29 20:38:49
