-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 07, 2023 at 06:52 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ecommerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `productid` varchar(50) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(500) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productid`, `name`, `description`, `price`) VALUES
('1111-aaaa', 'Ikea Chair 001', 'A wooden chair by IKEA', 250),
('2222-aaaa', 'Milton Keyboard 005', 'Stay hydrated', 50);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `sellerid` varchar(50) NOT NULL,
  `sellername` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `productIds` varchar(400) NOT NULL,
  `productNames` varchar(800) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`sellerid`, `sellername`, `userid`, `username`, `productIds`, `productNames`, `rating`) VALUES
('s1111', 'Blue Star', '', 'ashih', '[]', '[IKEA chir 001]', 4),
('s2222', 'Cozy Cabin', '', 'mihiw', '[]', '[Miltn Keyboard 005]', 5),
('s3333', 'Pressbox', '', 'parsh', '[]', '[]', 3),
('s4444', 'IBM', '', 'ashifh', '', '[Google Nexus]', 5),
('s5555', 'Kirkland', '', 'parith', '[]', 'Bottled Water', 3);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `userid` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `wishlist` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `email`, `password`, `age`, `wishlist`) VALUES
('user-1111', 'ashish', 'ashish@xyz.com', 2147483647, 28, '[]'),
('user-2222', 'mihir', 'mihir@xyz.com', 2147483647, 24, '[]'),
('user-3333', 'parth', 'parth@xyz.com', 2147483647, 25, '[]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`productid`);

--
-- Indexes for table `seller`
--
ALTER TABLE `seller`
  ADD PRIMARY KEY (`sellerid`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`userid`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
