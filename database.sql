-- --------------------------------------------------------
-- Host:                  127.0.0.1
-- Server Version:        10.4.27-MariaDB - mariadb.org binary distribution
-- Server OS:             Win64
-- HeidiSQL Version:      12.6.0.6765
-- --------------------------------------------------------

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;


--
-- Dumping structure for table `room_data`
--

CREATE TABLE `room_data` (
  `ID` int(11) NOT NULL,
  `roomID` varchar(13) COLLATE utf8_general_ci NOT NULL,
  `privateRoom` tinyint(1) NOT NULL,
  `inviteCode` varchar(13) COLLATE utf8_general_ci NOT NULL,
  `roomStatus` int(11) NOT NULL,
  `playerCount` int(11) NOT NULL,
  `roundTime` bigint(20) DEFAULT NULL,
  `currentPlayer` varchar(20) COLLATE utf8_general_ci DEFAULT NULL,
  `lastThrow` text COLLATE utf8_general_ci DEFAULT NULL,
  `leaderBoard` text COLLATE utf8_general_ci DEFAULT NULL,
  `data` text COLLATE utf8_general_ci NOT NULL,
  `pawnData` text COLLATE utf8_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;


ALTER TABLE `room_data`
  ADD PRIMARY KEY (`ID`);


ALTER TABLE `room_data`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
