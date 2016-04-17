-- MySQL dump 10.16  Distrib 10.1.13-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: cronos
-- ------------------------------------------------------
-- Server version	10.1.13-MariaDB

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `actor`
--

LOCK TABLES `actor` WRITE;
/*!40000 ALTER TABLE `actor` DISABLE KEYS */;
INSERT INTO `actor` VALUES (1,'Nicole Kidman','Honolulu, Hawai, US','1967-07-20'),(2,'Leonardo DiCaprio','Hollywood, California, US','1974-11-11'),(3,'Tom Hardy','Longon, England','1977-08-15'),(4,'Domhall Gleeson','Dublin,Ireland','1983-05-12'),(5,'Will Poulter','London, England','1993-01-28'),(6,'Jennifer Lawrence','Louisville, Kentucky, US','1990-08-15'),(7,'Eddie Redmayne','England','1982-01-06'),(8,'Felicity Jones','England','1983-10-17'),(9,'Charlie Cox','England','1982-12-15'),(10,'Halle Berry','Cleveland, Ohio, United States','1966-08-14'),(11,'Jim Broadbent','England','1949-05-24'),(12,'Tom Hanks','Los Angeles, California, United States','1956-07-09'),(13,'Billy Bob Thornton','Arkansas, United States','1955-08-05'),(14,'Heath Ledger','Australia','1979-04-04'),(15,'Christian Bale','United Kingdom','1974-01-30'),(16,'Michael Caine','United Kingdom','1933-03-14'),(17,'Alejandro Jodorowsky','Iquique, Chile','1942-02-07'),(18,'Brontis Jodorowsky','Iquique, Chile','1962-02-07'),(19,'Jose Legarreta','Mexico','2000-01-01'),(20,'Jodie Foster','Los Angeles, California, United States','1962-11-19'),(21,'Anthony Hopkins','United Kingdom','1937-12-31'),(22,'Scott Glenn','Pennsylvania, United States','1941-01-26'),(23,'Robin Wright','Dallas, Texas,United States','1966-04-08'),(24,'Gary Sinise','Illinoise, United States','1955-03-17');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `award`
--

LOCK TABLES `award` WRITE;
/*!40000 ALTER TABLE `award` DISABLE KEYS */;
INSERT INTO `award` VALUES (1,'The Oscars','United  States'),(2,'Cannes Film Festival','France'),(3,'UK Film Festival','United Kingdom'),(4,'Golden Globe','United States'),(5,'BAFTA','United Kingdom');
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
INSERT INTO `cast` VALUES (1,2),(1,3),(1,4),(1,5),(2,7),(2,8),(2,9),(3,10),(3,11),(3,12),(4,10),(4,13),(4,14),(5,14),(5,15),(5,16),(6,17),(6,18),(6,19),(7,20),(7,21),(7,22),(8,12),(8,23),(8,24);
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
INSERT INTO `directed` VALUES (1,8),(2,10),(3,11),(3,12),(3,13),(4,14),(5,15),(6,16),(7,17),(8,18);
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `director`
--

LOCK TABLES `director` WRITE;
/*!40000 ALTER TABLE `director` DISABLE KEYS */;
INSERT INTO `director` VALUES (8,'Alejandro Gonzalez Inarritu','Mexico City, Mexico','1963-08-15'),(9,'Clinton Eastwood Jr.','San Francisco, California, US','1930-05-31'),(10,'James Marsh','United Kingdom','1963-04-30'),(11,'Lana Wachowski','Chicago, Illinois, United States','1965-06-21'),(12,'Tom Tykwer','West Germany','1965-05-23'),(13,'Andy Wachowski','Chicago, Illinois, United States','1965-06-21'),(14,'Marc Forster','West Germany','1969-11-30'),(15,'Christopher Nolan','London, Englang','1970-07-30'),(16,'Alejandro Jodorowsky','Iquique, Chile','1942-02-07'),(17,'Jonathan Demme','New York, United States','1944-02-22'),(18,'Robert Lee Zemeckis','Chicago, Illinois, United States','1952-05-14');
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `film_studio`
--

LOCK TABLES `film_studio` WRITE;
/*!40000 ALTER TABLE `film_studio` DISABLE KEYS */;
INSERT INTO `film_studio` VALUES (1,'Warner Bros','United Kingdom'),(2,'Marvel Studios','United States'),(3,'20th Century Fox','United States'),(4,'Walt Disney Pictures','United States'),(5,'Universal Studios Inc','United States'),(6,'Lions Gates Film','California, United States'),(7,'DC Entertainment','United States'),(8,'Orion Picture Corporation','United States'),(9,'Paramount Pictures Corporation','United States');
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
INSERT INTO `filmed_by` VALUES (1,3),(2,5),(3,1),(4,6),(5,7),(7,8),(8,9);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genre`
--

LOCK TABLES `genre` WRITE;
/*!40000 ALTER TABLE `genre` DISABLE KEYS */;
INSERT INTO `genre` VALUES (1,'Comedy','Romance'),(2,'Comedy','Super Natural'),(3,'Adventure','Drama'),(4,'Adventure','Thriller'),(5,'Comedy','Western'),(6,'Biography','Drama'),(7,'Classic','Drama'),(8,'Sci-Fi','Drama'),(9,'Drama','Romance'),(10,'Action','Drama'),(11,'Drama','Western'),(12,'Crime','Thriller');
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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movie`
--

LOCK TABLES `movie` WRITE;
/*!40000 ALTER TABLE `movie` DISABLE KEYS */;
INSERT INTO `movie` VALUES (1,'The Revenant','2016-01-21','A frontiersman on a fur trading expedition in the 1820s fights for survival after being mauled by a bear and left for dead by members of his own hunting team. ','United States','https://www.youtube.com/watch?v=LoebZZ8K5N0'),(2,'The Theory Of Everything','2014-09-07','The Theory of Everything is the story of the most brilliant and celebrated physicist of our time, Stephen Hawking, and Jane Wilde the arts student he fell in love with whilst studying at Cambridge in the 1960s. Little was expected from Stephen Hawking, a bright but shiftless student of cosmology, given just two years to live following the diagnosis of a fatal illness at 21 years of age.','United Kingdowm','https://www.youtube.com/watch?v=Salz7uGp72c'),(3,'Cloud Atlas','2012-10-26','The story is a time-shifting weave of six interlinking narratives, with diverse settings from the savagery of a Pacific Island in the 1850s to a dystopian Korea of the near future. Action, mystery and romance weave dramatically through the story as one soul is shaped from a killer into a hero, and a single act of kindness ripples across centuries to inspire a revolution.','United States','https://www.youtube.com/watch?v=hWnAqFyaQ5s'),(4,'Monster Ball','2011-11-11','After a family tragedy, a racist prison guard reexamines his attitudes while falling in love with the African American wife of the last prisoner he executed. ','United States','https://www.youtube.com/watch?v=Y-94HNhLJBs'),(5,'The Dark Knight','2008-07-11','When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice. ','United States','https://www.youtube.com/watch?v=EXeTwQWrcwY'),(6,'El Topo','1970-01-01','A mysterious black-clad gunfighter wanders a mystical Western landscape encountering multiple bizarre characters. ','Mexico','https://www.youtube.com/watch?v=6Uqb4Jy0GTg'),(7,'The Silence of theLambs','1991-02-14','A young F.B.I. cadet must confide in an incarcerated and manipulative killer to receive his help on catching another serial killer who skins his victims. ','United States','https://www.youtube.com/watch?v=lQKs169Sl0I'),(8,'Forrest Gump','1994-06-23','Forrest Gump, while not intelligent, has accidentally been present at many historic moments, but his true love, Jenny Curran, eludes him. ','United States','https://www.youtube.com/watch?v=bLvqoHBptjg');
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
INSERT INTO `movie_genre` VALUES (1,3),(2,6),(3,8),(4,9),(5,10),(6,11),(7,12),(8,9);
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
  `movie_id` mediumint(9) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `nom_nc_id` (`nc_id`),
  KEY `nom_actor_id` (`actor_id`),
  KEY `movie_id` (`movie_id`),
  CONSTRAINT `nom_actor_id` FOREIGN KEY (`actor_id`) REFERENCES `actor` (`id`) ON DELETE CASCADE,
  CONSTRAINT `nom_nc_id` FOREIGN KEY (`nc_id`) REFERENCES `nomination_category` (`id`) ON DELETE CASCADE,
  CONSTRAINT `nomination_ibfk_1` FOREIGN KEY (`movie_id`) REFERENCES `movie` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination`
--

LOCK TABLES `nomination` WRITE;
/*!40000 ALTER TABLE `nomination` DISABLE KEYS */;
INSERT INTO `nomination` VALUES (7,4,2,'2016-01-09',1,1),(9,4,3,'2016-01-09',1,1),(10,4,7,'2014-01-01',1,2),(11,7,10,'2002-01-01',1,4),(12,6,14,'2009-01-01',1,5),(13,8,14,'2009-01-01',1,5),(15,10,21,'1992-01-01',1,7),(16,11,20,'1992-01-01',1,7),(18,4,12,'1995-03-07',1,8),(19,4,21,'1992-03-30',1,7);
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
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nomination_category`
--

LOCK TABLES `nomination_category` WRITE;
/*!40000 ALTER TABLE `nomination_category` DISABLE KEYS */;
INSERT INTO `nomination_category` VALUES (1,1,'Best Picture'),(2,1,'Best Director'),(3,1,'Best Film Editing'),(4,1,'Best Actor in a Leading Role'),(5,1,'Update Later'),(6,1,'Best Actor in a Supporting Role'),(7,1,'Best Actress in a Leading Role'),(8,4,'Best Actor in a Leading Role'),(9,5,'Best Actor in a Supporting Role'),(10,5,'Best Actor in a Leading Role'),(11,5,'Best Actress in a Leading Role'),(12,4,'Best Actress in a Leading Role');
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
  `won` tinyint NOT NULL,
  `movie_id` tinyint NOT NULL,
  `movie` tinyint NOT NULL
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
INSERT INTO `rating` VALUES (1,1,12,0),(1,2,5,0),(1,3,1,0),(1,4,10,5),(1,5,2,0),(1,6,1,0),(1,7,1,0),(3,1,2,0),(3,2,4,0),(3,4,8,4);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'LuisRivas','LuisRivas','luis.rivas.0606@gmail.com',1),(2,'TestUser','qwerty12','qwerty12',1),(3,'LuisRivas2','LuisRivas2','1',0),(4,'TestUser','TestUser','TestUser',0),(5,'LuisRivas3','LuisRivas3','hohoho',1),(6,'LuisRivas4','LuisRivas4','eee',1),(7,'LuisRivas5','LuisRivas5','eee',0),(8,'LuisRivas6','LuisRivas6','luis.rivas.0606@gmail.com',0),(9,'Rosa Irene','Apepe34','dory_1719@hotmail.com',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `nomination_view`
--

/*!50001 DROP TABLE IF EXISTS `nomination_view`*/;
/*!50001 DROP VIEW IF EXISTS `nomination_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `nomination_view` AS select `nom`.`id` AS `id`,`nc`.`award_id` AS `award_id`,`aw`.`name` AS `award_name`,`nom`.`nc_id` AS `nc_id`,`nc`.`name` AS `category_name`,`nom`.`actor_id` AS `actor_id`,`a`.`name` AS `actor_name`,`a`.`nationality` AS `actor_nationality`,`a`.`birth_date` AS `actor_birth_date`,`nom`.`year` AS `year`,`nom`.`won` AS `won`,`mov`.`id` AS `movie_id`,`mov`.`name` AS `movie` from ((((`nomination` `nom` join `nomination_category` `nc` on((`nom`.`nc_id` = `nc`.`id`))) join `actor` `a` on((`nom`.`actor_id` = `a`.`id`))) join `award` `aw` on((`aw`.`id` = `nc`.`award_id`))) join `movie` `mov` on((`nom`.`movie_id` = `mov`.`id`))) */;
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

-- Dump completed on 2016-04-09 14:35:11
