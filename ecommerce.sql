-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 07, 2023 at 06:33 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`productid`, `name`, `description`, `price`) VALUES
('1111-aaaa', 'Ikea Chair', 'A wooden chair by IKEA', 250),
('2222-aaaa', 'Milton Keyboard', 'Stay hydrated', 50),
('3333-aaaa', 'ROG Laptop', 'Made for Gamers', 1799),
('4444-aaaa', 'Dell Laptop', 'Performance enhanced', 1199),
('5555-aaaa', 'Nike Air Max', 'Comfort walking', 179),
('6666-aaaa', 'Hollister Puffer Jacket', 'Feel warm', 89),
('7777-aaaa', 'Adidas Slippers', 'For your home', 19),
('8888-aaaa', 'Lamborghini Urus', 'For a bigger family', 115000),
('9999-aaaa', 'Google Nexus', 'Made by Google', 530);

-- --------------------------------------------------------

--
-- Table structure for table `seller`
--

CREATE TABLE `seller` (
  `sellerid` varchar(50) NOT NULL,
  `sellername` varchar(50) NOT NULL,
  `userid` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `productId` varchar(400) NOT NULL,
  `productName` varchar(800) NOT NULL,
  `rating` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `seller`
--

INSERT INTO `seller` (`sellerid`, `sellername`, `userid`, `username`, `productId`, `productName`, `rating`) VALUES
('s0000', 'AstonMartin', '', 'Anirudh', '7889-bhhhjb', 'Vantage', 5),
('s1111', 'Blue Star', '', 'ashih', '1111-aaaa', 'IKEA char', 4),
('s2222', 'Cozy Cabin', '', 'mihiw', '2222-aaaa', 'Milton Keyboard 005', 5),
('s3333', 'Pressbox', '', 'parsh', '3333-aaaa', 'ROG Laptop 009', 3),
('s4444', 'IBM', '', 'ashifh', '9999-aaaa', 'Google Nexus 020', 5),
('s5555', 'DellDealer', 'user-7777', 'manny', '4444-aaaa', 'Dell Laptop 001', 4),
('s6666', 'VroomVroom', '', 'jim', '8888-aaaa', 'Lamborghini Urus 001', 5),
('s7777', 'BirB', '', 'henton', '6666-aaaa', 'Hollister Puffer Jacket 025', 4),
('s8888', 'Stepz', 'user-8889', 'colton', '8888-aaaa', 'Nike Air Max 007', 5),
('s9999', 'Luxor', '', 'kris', '7777-aaaa', 'Adidas Slippers 014', 3);

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`userid`, `username`, `email`, `password`, `age`, `wishlist`) VALUES
('user-1000', 'sean', 'sean@xyz.com', 2147483647, 29, ''),
('user-1111', 'ashish', 'ashish@xyz.com', 2147483647, 28, ''),
('user-1555', 'connor', 'connor@xyz.com', 2147483647, 35, ''),
('user-2222', 'mihir', 'mihir@xyz.com', 2147483647, 24, ''),
('user-3138', 'adita', 'adita@xyz.com', 2147483647, 23, ''),
('user-3333', 'parth', 'parth@xyz.com', 2147483647, 25, ''),
('user-4444', 'aditya', 'aditya@xyz.com\r\n', 2147483647, 18, ''),
('user-5155', 'kim', 'kim@xyz.com', 2147483647, 31, ''),
('user-5255', 'candy', 'candy@xyz.com', 2147483647, 43, ''),
('user-5550', 'benton', 'benton@xyz.com', 2147483647, 23, ''),
('user-5552', 'lenton', 'lenton@xyz.com', 2147483647, 34, ''),
('user-5555', 'krutik', 'krutik@xyz.com', 2147483647, 33, ''),
('user-5558', 'naitik', 'naitik@xyz.com', 2147483647, 30, ''),
('user-6666', 'manvendra', 'manvendra@xyz.com', 2147483647, 39, ''),
('user-7634', 'AstonMartin', 'aston@gmail.com', 98978789, 34, ''),
('user-7770', 'robert', 'robert@xyz.com', 2147483647, 30, ''),
('user-7777', 'manny', 'manny@xyz.com', 2147483647, 39, ''),
('user-8888', 'jake', 'jake@xyz.com', 2147483647, 44, ''),
('user-8889', 'colton', 'colton@xyz.com', 2147483647, 48, ''),
('user-9998', 'tim', 'tim@xyz.com', 2147483647, 55, ''),
('user-9999', 'chris', 'chris@xyz.com', 2147483647, 53, '');

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
