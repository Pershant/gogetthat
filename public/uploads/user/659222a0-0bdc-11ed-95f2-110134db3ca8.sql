-- phpMyAdmin SQL Dump
-- version 4.6.6deb5ubuntu0.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 22, 2022 at 06:44 PM
-- Server version: 5.7.38-0ubuntu0.18.04.1
-- PHP Version: 7.2.24-0ubuntu0.18.04.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gogetthat`
--

-- --------------------------------------------------------

--
-- Table structure for table `add_to_compare`
--

CREATE TABLE `add_to_compare` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `add_to_compare`
--

INSERT INTO `add_to_compare` (`id`, `user_id`, `product_id`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(2, 3, 670, 1657885803, 1657885803, '2022-07-15 11:50:02', '2022-07-15 11:50:02');

-- --------------------------------------------------------

--
-- Table structure for table `adminDetail`
--

CREATE TABLE `adminDetail` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support_email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `support_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `adminDetail`
--

INSERT INTO `adminDetail` (`id`, `userId`, `name`, `image`, `support_email`, `support_address`, `phone`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'Admnin', 'ae5da050-082f-11ed-a654-33a81852f512.jpg', '', '', '923842341', 1591223653, 1658323640, '2020-06-03 22:34:13', '2022-07-20 13:27:20');

-- --------------------------------------------------------

--
-- Table structure for table `bank`
--

CREATE TABLE `bank` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isDeleted` int(1) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `bsb` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `bank_details`
--

CREATE TABLE `bank_details` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `accountNumber` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `ifsc` varchar(255) NOT NULL,
  `branch` varchar(255) NOT NULL,
  `bankName` varchar(255) NOT NULL,
  `bsb` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bank_details`
--

INSERT INTO `bank_details` (`id`, `userId`, `accountNumber`, `name`, `ifsc`, `branch`, `bankName`, `bsb`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 42, '41414141414141', 'Seller', '00PNB', 'Mohali', 'PNB', '1324657890', 1588163219, 1609825401, '2021-12-14 08:07:23', '2021-12-22 10:08:29');

-- --------------------------------------------------------

--
-- Table structure for table `banner`
--

CREATE TABLE `banner` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '1' COMMENT '0=>no, 1=>yes',
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `link` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `banner`
--

INSERT INTO `banner` (`id`, `status`, `title`, `link`, `image`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(3, 1, 'banner', 'www.link.com', 'ef858490-cd2d-11ec-99c9-0f68b6eea42a.jpg', 1651821234, 1651835772, '2022-05-06 07:13:53', '2022-05-06 11:16:11'),
(4, 1, 'Gucci', 'https://www.gucci.com/us/en/ca/men/shoes-for-men-c-men-shoes', 'fabbfd20-cd29-11ec-99c9-0f68b6eea42a.jpg', 1651821425, 1651834073, '2022-05-06 07:17:05', '2022-05-06 10:47:52'),
(8, 1, 'new banner', 'https://www.adidas.com', '3ed8a2d0-cd2d-11ec-99c9-0f68b6eea42a.jpeg', 1651835475, 1651838373, '2022-05-06 11:11:15', '2022-05-06 11:59:32'),
(9, 1, 'puma', 'https://www.puma.com', 'dcd016d0-cd2d-11ec-99c9-0f68b6eea42a.jpg', 1651835740, 1651838229, '2022-05-06 11:15:40', '2022-05-06 11:57:09');

-- --------------------------------------------------------

--
-- Table structure for table `blog`
--

CREATE TABLE `blog` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `blog_category_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog`
--

INSERT INTO `blog` (`id`, `name`, `blog_category_id`, `image`, `description`, `updatedAt`, `createdAt`) VALUES
(2, 'Description of a product', 105, 'dc44b550-ac34-11ec-bb94-cfdeecfd095d.jpeg', 'ghjkghjkghjk', '2022-05-17 13:08:34', '2021-12-10 11:22:36'),
(3, 'Description of a product', 105, 'fd96057a-ffaf-4b28-a935-f9d5964d36c3.jpeg', 'assfA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:46', '2021-12-10 11:23:50'),
(4, 'Description of a product', 100, 'cf1fe1db-f652-4f31-a532-194a37412e92.jpeg', 'A dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:40', '2021-12-10 12:23:16'),
(5, 'Description of a product', 103, 'fd96057a-ffaf-4b28-a935-f9d5964d36c3.jpeg', 'A dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:37', '2021-12-10 13:14:10'),
(6, 'Description of a product', 102, 'cf1fe1db-f652-4f31-a532-194a37412e92.jpeg', 'A dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:31', '2021-12-10 13:48:08'),
(7, 'Description of a product', 100, 'fd96057a-ffaf-4b28-a935-f9d5964d36c3.jpeg', 'A dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:27', '2021-12-10 13:50:15'),
(8, 'Description of a product', 103, 'cf1fe1db-f652-4f31-a532-194a37412e92.jpeg', 'A dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:22', '2021-12-10 13:51:15'),
(9, 'Description of a product', 105, 'fd96057a-ffaf-4b28-a935-f9d5964d36c3.jpeg', 'aA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:15', '2021-12-10 13:52:26'),
(10, 'Description of a product', 100, 'cf1fe1db-f652-4f31-a532-194a37412e92.jpeg', 'wA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:12', '2021-12-14 11:51:50'),
(11, 'Description of a product', 105, 'fd96057a-ffaf-4b28-a935-f9d5964d36c3.jpeg', 'testingA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:09', '2021-12-15 10:24:34'),
(12, 'last blog', 104, 'cf1fe1db-f652-4f31-a532-194a37412e92.jpeg', 'fhddfgdfsfa gdsrdsA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:04', '2022-02-20 16:12:20'),
(13, 'new blog', 103, '34a3eee0-d5ad-11ec-9eaf-6bad2005efe8.png', 'fhddfgdfsfa gdsrdsA dummy text generator gives web designers the content they need. Then, they can use the typefaces and layout they prefer, thus obtaining the best mock-up of their work. It would be best to be impossible to understand and read because people might get distracted by the text itself and its nonsense rather than analyzing how the typefaces integrate into the design instead.', '2022-05-17 10:46:01', '2022-05-17 06:47:23'),
(14, 'creative blog', 102, '33fd8f30-d5cd-11ec-877f-9765bd47ccd3.png', 'egsdfgsdfgsdgf', '2022-05-17 10:45:58', '2022-05-17 10:36:25'),
(15, 'jhfj', 100, '3f7e3de0-d5ce-11ec-b22b-4774542d31f6.jpeg', 'gcjgvvj', '2022-05-17 10:43:54', '2022-05-17 10:43:54'),
(16, 'vbnmvbmn', 106, 'd756d9f0-d66f-11ec-8359-a70cd45fd456.jpg', 'ghjfgjhfghj', '2022-05-18 06:00:38', '2022-05-18 06:00:38');

-- --------------------------------------------------------

--
-- Table structure for table `blog_category`
--

CREATE TABLE `blog_category` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>active',
  `parentId` int(11) DEFAULT NULL,
  `hierarchyLevel` smallint(6) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_category_id` int(11) NOT NULL COMMENT 'id from shopCategory table',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_category`
--

INSERT INTO `blog_category` (`id`, `status`, `parentId`, `hierarchyLevel`, `name`, `image`, `discount`, `description`, `shop_category_id`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(100, 1, NULL, 1, 'men', '7bda91e0-d5c8-11ec-b5a9-9970f3c7062a.jpg', 0, 'new blog category', 0, 1652781759, 1652781794, '2022-05-17 10:02:38', '2022-05-17 10:03:13'),
(101, 1, NULL, 1, 'women', 'a8316e30-d5c8-11ec-a352-79551e05c10c.jpeg', 0, 'women blog', 0, 1652781833, 1652781833, '2022-05-17 10:03:53', '2022-05-17 10:03:53'),
(102, 1, NULL, 1, 'Baby', 'bda55fb0-d5c8-11ec-a352-79551e05c10c.jpeg', 0, 'baby blog', 0, 1652781869, 1652781869, '2022-05-17 10:04:29', '2022-05-17 10:04:29'),
(103, 1, NULL, 1, 'Lifestyle', 'd39781e0-d5c8-11ec-a352-79551e05c10c.jpg', 0, 'lifestyle blog', 0, 1652781906, 1652781906, '2022-05-17 10:05:06', '2022-05-17 10:05:06'),
(104, 1, NULL, 1, 'Creative', 'e43f9370-d5c8-11ec-a352-79551e05c10c.jpg', 0, 'creative blog', 0, 1652781934, 1652781934, '2022-05-17 10:05:34', '2022-05-17 10:05:34'),
(105, 1, NULL, 1, 'Fashion', 'fcaacbf0-d5c8-11ec-a352-79551e05c10c.jpg', 0, 'Fashion Blog', 0, 1652781975, 1658470092, '2022-05-17 10:06:15', '2022-07-22 06:08:11'),
(106, 1, NULL, 1, 'new', '052aa270-d5e5-11ec-adf9-c5e9755bd67e.jpg', 0, 'vdvxzcvcv', 0, 1652794015, 1658470093, '2022-05-17 13:26:55', '2022-07-22 06:08:12');

-- --------------------------------------------------------

--
-- Table structure for table `blog_comment`
--

CREATE TABLE `blog_comment` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `comment` text NOT NULL,
  `email` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `blog_comment`
--

INSERT INTO `blog_comment` (`id`, `blog_id`, `name`, `comment`, `email`, `subject`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(10, 2, 'hero', ' fghj', 'pershant@yopmail.com', 'fgjhfgj', 1652876433, 1652876433, '2022-05-18 12:20:33', '2022-05-18 18:13:57'),
(11, 2, 'hero', ' fghj', 'pershant@yopmail.com', 'fgjhfgj', 1652876436, 1652876436, '2022-05-18 12:20:35', '2022-05-18 18:14:00'),
(12, 2, 'ghjk', ' hgjkghjk', 'admin@tiktik.com', 'ghjkghjk', 1652876494, 1652876494, '2022-05-18 12:21:33', '2022-05-18 18:14:02'),
(13, 3, 'ghjk', ' hgjkghjk', 'admin@tiktik.com', 'ghjkghjk', 1652876497, 1652876497, '2022-05-18 12:21:37', '2022-05-18 18:14:04'),
(14, 3, 'hyundai', ' comment', 'admin@admin.com', 'subject', 1652876598, 1652876598, '2022-05-18 12:23:18', '2022-05-18 18:14:06'),
(15, 1, 'hyundai', ' sad', 'admin@admin.com', 'asdasd', 1652876702, 1652876702, '2022-05-18 12:25:01', '2022-05-18 18:14:13'),
(16, 16, 'hyundai', ' cccccccc', 'huduma.panel@gmail.com', 'ssssssssss', 1652876937, 1652876937, '2022-05-18 12:28:56', '2022-05-18 12:28:56'),
(17, 16, 'hyundai', 'ssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss', 'huduma.panel@gmail.com', 'ssssssssss', 1652876947, 1652876947, '2022-05-18 12:29:07', '2022-05-18 12:29:07'),
(18, 16, 'pershant', ' zzzzzzzz zzzzzzzzzzzz zzzzzzzzzzzzzzzzzz zzzzzzzzzzzz', 'admin@gmail.com', 'dsasdsd', 1652876986, 1652876986, '2022-05-18 12:29:46', '2022-05-18 12:29:46'),
(19, 16, 'pershant', ' zzzzzzzz zzzzzzzzzzzz zzzzzzzzzzzzzzzzzz zzzzzzzzzzzz zzzzzz zzzzzzzzz zzzzzzzzzzz zzzzzzzzz', 'admin@gmail.com', 'dsasdsd', 1652876995, 1652876995, '2022-05-18 12:29:55', '2022-05-18 12:29:55'),
(20, 2, 'ghjk', ' ghjkghjk', 'admin@gmail.com', 'jgkhjk', 1652878641, 1652878641, '2022-05-18 12:57:20', '2022-05-18 12:57:20');

-- --------------------------------------------------------

--
-- Table structure for table `brand`
--

CREATE TABLE `brand` (
  `id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `brandName` varchar(255) NOT NULL,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `brand`
--

INSERT INTO `brand` (`id`, `image`, `brandName`, `updatedAt`, `createdAt`) VALUES
(5, 'c6d600a0-68ac-11ec-9103-cbc3258efd24.png', 'Rebook', '2021-12-29 13:39:42', '2021-12-29 13:39:42'),
(8, '9fed5910-b5ab-11ec-b7e9-59a011463403.jpeg', 'gucci', '2022-04-06 13:15:26', '2022-04-06 13:15:26'),
(9, 'b3304120-f793-11ec-b1cd-cb256fe82b6f.jpg', 'nike', '2022-06-29 10:10:28', '2022-06-29 10:10:28');

-- --------------------------------------------------------

--
-- Table structure for table `card`
--

CREATE TABLE `card` (
  `id` int(11) NOT NULL,
  `stripe_card_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `isDefault` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `cardType` smallint(6) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `cardNumber` varchar(16) COLLATE utf8mb4_unicode_ci NOT NULL,
  `month` int(2) NOT NULL,
  `year` int(4) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `card`
--

INSERT INTO `card` (`id`, `stripe_card_id`, `isDefault`, `cardType`, `userId`, `name`, `cardNumber`, `month`, `year`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(57, 'card_1L1SOkGlrdcC7JVi9irjTxK4', 0, 0, 3, 'hyundai', '4242424242424242', 2, 2023, 1653039932, 1653039932, '2022-05-20 09:45:31', '2022-05-20 09:45:31'),
(58, 'card_1L1T6IGlrdcC7JViIV3EVoSd', 0, 0, 3, 'pershant', '4242424242424242', 3, 2023, 1653042632, 1653042632, '2022-05-20 10:30:31', '2022-05-20 10:30:31');

-- --------------------------------------------------------

--
-- Table structure for table `cart`
--

CREATE TABLE `cart` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL DEFAULT '0',
  `qty` int(11) NOT NULL,
  `total_price` float NOT NULL,
  `save_to_later` int(11) NOT NULL DEFAULT '0' COMMENT '0=no  1=yes',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cart____old`
--

CREATE TABLE `cart____old` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `vender_id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `categoriesancestors`
--

CREATE TABLE `categoriesancestors` (
  `id` int(11) NOT NULL,
  `categoryId` int(11) DEFAULT NULL,
  `ancestorId` int(11) DEFAULT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `hierarchyLevel` int(10) UNSIGNED DEFAULT NULL,
  `parentId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categoriesancestors`
--

INSERT INTO `categoriesancestors` (`id`, `categoryId`, `ancestorId`, `created`, `updated`, `createdAt`, `updatedAt`, `hierarchyLevel`, `parentId`) VALUES
(53, 43, 41, 0, 0, '2020-09-22 12:43:16', '2020-09-22 12:43:16', NULL, NULL),
(54, 44, 41, 0, 0, '2020-09-24 12:27:34', '2020-09-24 12:27:34', NULL, NULL),
(55, 45, 41, 0, 0, '2020-09-24 12:27:46', '2020-09-24 12:27:46', NULL, NULL),
(56, 45, 43, 0, 0, '2020-09-24 12:27:46', '2020-09-24 12:27:46', NULL, NULL),
(57, 46, 41, 0, 0, '2020-09-25 04:54:40', '2020-09-25 04:54:40', NULL, NULL),
(58, 47, 41, 0, 0, '2020-10-26 14:11:36', '2020-10-26 14:11:36', NULL, NULL),
(59, 47, 46, 0, 0, '2020-10-26 14:11:36', '2020-10-26 14:11:36', NULL, NULL),
(60, 48, 41, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(61, 48, 46, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(62, 48, 47, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(63, 49, 41, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(64, 49, 46, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(65, 49, 47, 0, 0, '2020-10-26 14:12:34', '2020-10-26 14:12:34', NULL, NULL),
(66, 52, 51, 0, 0, '2020-11-25 05:29:24', '2020-11-25 05:29:24', NULL, NULL),
(67, 53, 51, 0, 0, '2020-11-25 05:29:42', '2020-11-25 05:29:42', NULL, NULL),
(68, 53, 52, 0, 0, '2020-11-25 05:29:42', '2020-11-25 05:29:42', NULL, NULL),
(69, 55, 54, 0, 0, '2020-11-25 10:51:35', '2020-11-25 10:51:35', NULL, NULL),
(70, 56, 54, 0, 0, '2020-11-25 10:51:53', '2020-11-25 10:51:53', NULL, NULL),
(71, 56, 55, 0, 0, '2020-11-25 10:51:53', '2020-11-25 10:51:53', NULL, NULL),
(72, 58, 57, 0, 0, '2020-12-01 07:08:58', '2020-12-01 07:08:58', NULL, NULL),
(73, 59, 57, 0, 0, '2020-12-01 07:09:14', '2020-12-01 07:09:14', NULL, NULL),
(74, 59, 58, 0, 0, '2020-12-01 07:09:14', '2020-12-01 07:09:14', NULL, NULL),
(75, 60, 57, 0, 0, '2020-12-01 07:09:34', '2020-12-01 07:09:34', NULL, NULL),
(76, 60, 58, 0, 0, '2020-12-01 07:09:34', '2020-12-01 07:09:34', NULL, NULL),
(77, 60, 59, 0, 0, '2020-12-01 07:09:34', '2020-12-01 07:09:34', NULL, NULL),
(78, 61, 54, 0, 0, '2020-12-08 05:30:30', '2020-12-08 05:30:30', NULL, NULL),
(79, 61, 55, 0, 0, '2020-12-08 05:30:30', '2020-12-08 05:30:30', NULL, NULL),
(80, 61, 56, 0, 0, '2020-12-08 05:30:30', '2020-12-08 05:30:30', NULL, NULL),
(85, 62, 54, 0, 0, '2020-12-08 05:48:21', '2020-12-08 05:48:21', NULL, NULL),
(86, 62, 55, 0, 0, '2020-12-08 05:48:21', '2020-12-08 05:48:21', NULL, NULL),
(88, 63, 54, 0, 0, '2020-12-09 10:04:38', '2020-12-09 10:04:38', NULL, NULL),
(89, 63, 55, 0, 0, '2020-12-09 10:04:38', '2020-12-09 10:04:38', NULL, NULL),
(90, 64, 54, 0, 0, '2020-12-09 10:05:34', '2020-12-09 10:05:34', NULL, NULL),
(91, 64, 55, 0, 0, '2020-12-09 10:05:34', '2020-12-09 10:05:34', NULL, NULL),
(92, 64, 63, 0, 0, '2020-12-09 10:05:34', '2020-12-09 10:05:34', NULL, NULL),
(93, 65, 54, 0, 0, '2020-12-09 10:05:54', '2020-12-09 10:05:54', NULL, NULL),
(94, 65, 55, 0, 0, '2020-12-09 10:05:54', '2020-12-09 10:05:54', NULL, NULL),
(95, 65, 63, 0, 0, '2020-12-09 10:05:54', '2020-12-09 10:05:54', NULL, NULL),
(96, 67, 66, 0, 0, '2021-02-09 05:51:14', '2021-02-09 05:51:14', NULL, NULL),
(97, 70, 69, 0, 0, '2021-04-02 10:24:36', '2021-04-02 10:24:36', NULL, NULL),
(98, 72, 71, 0, 0, '2021-04-23 05:24:36', '2021-04-23 05:24:36', NULL, NULL),
(104, 73, 71, 0, 0, '2021-09-01 07:23:00', '2021-09-01 07:23:00', NULL, NULL),
(105, 73, 72, 0, 0, '2021-09-01 07:23:00', '2021-09-01 07:23:00', NULL, NULL),
(107, 74, 66, 0, 0, '2021-09-01 07:41:26', '2021-09-01 07:41:26', NULL, NULL),
(108, 74, 67, 0, 0, '2021-09-01 07:41:26', '2021-09-01 07:41:26', NULL, NULL),
(109, 76, 66, 0, 0, '2021-09-02 09:33:49', '2021-09-02 09:33:49', NULL, NULL),
(110, 77, 75, 0, 0, '2021-11-29 10:57:08', '2021-11-29 10:57:08', NULL, NULL),
(111, 82, 80, 0, 0, '2021-12-22 08:42:48', '2021-12-22 08:42:48', NULL, NULL),
(112, 90, 88, 0, 0, '2022-02-16 13:03:33', '2022-02-16 13:03:33', NULL, NULL),
(113, 91, 87, 0, 0, '2022-02-16 13:03:58', '2022-02-16 13:03:58', NULL, NULL),
(117, 92, 88, 0, 0, '2022-02-19 18:09:20', '2022-02-19 18:09:20', NULL, NULL),
(120, 93, 86, 0, 0, '2022-02-20 16:10:18', '2022-02-20 16:10:18', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>active',
  `parentId` int(11) DEFAULT NULL,
  `hierarchyLevel` smallint(6) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `discount` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_category_id` int(11) NOT NULL COMMENT 'id from shopCategory table',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `status`, `parentId`, `hierarchyLevel`, `name`, `image`, `discount`, `description`, `shop_category_id`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, NULL, 0, 'Devices', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593725655, 1593787402, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(2, 1, 1, 0, 'SmartPhones', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593725655, 1593787402, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(3, 1, 1, 0, 'Laptops', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593725655, 1593787402, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(4, 1, 2, 0, 'Android', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593725655, 1593787404, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(5, 1, 2, 0, 'IOS', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593725655, 1593787404, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(6, 1, 4, 0, 'Samsung', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593725655, 1593787403, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(7, 1, 4, 0, 'Xiomi', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593725655, 1593787409, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(8, 1, 4, 0, 'Realme', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593725655, 1593787406, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(9, 1, 4, 0, 'OnePlus', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593725655, 1593787405, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(12, 1, 3, 0, 'Lenovo', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593725655, 1593788200, '2020-07-02 21:34:15', '2022-05-13 12:21:48'),
(26, 1, 3, 0, 'Asus', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1593788177, 1593788177, '2020-07-03 14:56:16', '2022-05-13 12:21:48'),
(27, 1, 5, 0, 'iPhone', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1593788177, 1593788177, '2020-07-03 14:56:16', '2022-05-13 12:21:48'),
(28, 1, 3, 1, 'Dell', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1596542046, 1596542046, '2020-08-04 11:54:05', '2022-05-13 12:21:48'),
(29, 1, 28, 2, 'XPS', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1596542073, 1596542073, '2020-08-04 11:54:32', '2022-05-13 12:21:48'),
(30, 1, 28, 2, 'Vostro', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1596542084, 1596542084, '2020-08-04 11:54:43', '2022-05-13 12:21:48'),
(31, 1, 28, 2, 'Latitude', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1596542094, 1596542094, '2020-08-04 11:54:54', '2022-05-13 12:21:48'),
(32, 1, 3, 1, 'Mac', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1596542183, 1596542183, '2020-08-04 11:56:23', '2022-05-13 12:21:48'),
(34, 1, NULL, 1, 'Kids', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1596543855, 1596543855, '2020-08-04 12:24:14', '2022-05-13 12:21:48'),
(35, 1, NULL, 1, 'Laptops and computers', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1597060381, 1597060381, '2020-08-10 11:53:01', '2022-05-13 12:21:48'),
(36, 1, NULL, 1, 'Electronics', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1598428853, 1598428853, '2020-08-26 08:00:53', '2022-05-13 12:21:48'),
(37, 1, 36, 2, 'kettle', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1600684486, 1600684486, '2020-09-21 10:34:45', '2022-05-13 12:21:48'),
(38, 1, 36, 2, 'testt', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1600684544, 1600684544, '2020-09-21 10:35:44', '2022-05-13 12:21:48'),
(39, 1, 36, 2, 'test', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1600684988, 1600684988, '2020-09-21 10:43:07', '2022-05-13 12:21:48'),
(40, 1, 36, 2, 'test', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1600685017, 1600685017, '2020-09-21 10:43:36', '2022-05-13 12:21:48'),
(41, 1, NULL, 1, 'test123', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1600778470, 1600778470, '2020-09-22 12:41:09', '2022-05-13 12:21:48'),
(42, 1, 41, 2, 'fdgd', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1600778504, 1600778504, '2020-09-22 12:41:43', '2022-05-13 12:21:48'),
(43, 1, 41, 2, 'tet123', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1600778596, 1600778596, '2020-09-22 12:43:16', '2022-05-13 12:21:48'),
(46, 1, 41, 2, 'test', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1601009680, 1601009680, '2020-09-25 04:54:40', '2022-05-13 12:21:48'),
(47, 1, 46, 3, 'Food', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1603721497, 1603721497, '2020-10-26 14:11:36', '2022-05-13 12:21:48'),
(48, 1, 47, 4, 'veg', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1603721555, 1603721555, '2020-10-26 14:12:34', '2022-05-13 12:21:48'),
(49, 1, 47, 4, 'veg', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1603721555, 1603721555, '2020-10-26 14:12:34', '2022-05-13 12:21:48'),
(51, 1, NULL, 1, 'Restaraunt', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1606282145, 1606282145, '2020-11-25 05:29:05', '2022-05-13 12:21:48'),
(52, 1, 51, 2, 'Chinese', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1606282165, 1606282165, '2020-11-25 05:29:24', '2022-05-13 12:21:48'),
(53, 1, 52, 3, 'Non Veg', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1606282182, 1606282182, '2020-11-25 05:29:42', '2022-05-13 12:21:48'),
(54, 1, NULL, 1, 'Gaming', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1606301485, 1606301485, '2020-11-25 10:51:24', '2022-05-13 12:21:48'),
(55, 1, 54, 2, 'Shooting', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1606301495, 1606301495, '2020-11-25 10:51:35', '2022-05-13 12:21:48'),
(56, 1, 55, 3, 'CSGO', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1606301514, 1606301514, '2020-11-25 10:51:53', '2022-05-13 12:21:48'),
(61, 1, 56, 4, 'TPP Mode', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1607405430, 1607405430, '2020-12-08 05:30:30', '2022-05-13 12:21:48'),
(62, 1, 55, 3, 'ecr', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1607405696, 1607406501, '2020-12-08 05:34:55', '2022-05-13 12:21:48'),
(63, 1, 55, 3, 'test', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1607508278, 1607508278, '2020-12-09 10:04:38', '2022-05-13 12:21:48'),
(64, 1, 63, 4, 'abc', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1607508335, 1607508335, '2020-12-09 10:05:34', '2022-05-13 12:21:48'),
(65, 1, 63, 4, 'Pop', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1607508354, 1639048208, '2020-12-09 10:05:54', '2022-05-13 12:21:48'),
(66, 1, NULL, 1, 'Grocery', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1612849861, 1612849861, '2021-02-09 05:51:01', '2022-05-13 12:21:48'),
(67, 1, 66, 2, 'Fruits', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1612849874, 1612849874, '2021-02-09 05:51:14', '2022-05-13 12:21:48'),
(71, 1, NULL, 1, 'Electronics', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 2, 1619155461, 1630480991, '2021-04-23 05:24:21', '2022-05-13 12:21:48'),
(72, 1, 71, 2, 'Smartphones', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1619155477, 1619155477, '2021-04-23 05:24:36', '2022-05-13 12:21:48'),
(73, 1, 72, 3, 'Samsung', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 1, 1619155507, 1630480980, '2021-04-23 05:25:07', '2022-05-13 12:21:48'),
(74, 1, 67, 3, 'Pine apple', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 1, 1630482086, 1630482086, '2021-09-01 07:41:26', '2022-05-13 12:21:48'),
(75, 1, NULL, 1, 'LED', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 2, 1630491490, 1630491490, '2021-09-01 10:18:10', '2022-05-13 12:21:48'),
(76, 1, 66, 2, 'cql test', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 2, 1630575229, 1630575229, '2021-09-02 09:33:49', '2022-05-13 12:21:48'),
(77, 1, 75, 2, 'abc', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1638183429, 1638183429, '2021-11-29 10:57:08', '2022-05-13 12:21:48'),
(78, 1, NULL, 1, 'new', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1638971641, 1638971641, '2021-12-08 13:54:01', '2022-05-13 12:21:48'),
(79, 1, NULL, 1, 'testing user', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1639048472, 1639048472, '2021-12-09 11:14:31', '2022-05-13 12:21:48'),
(80, 1, NULL, 1, 'testingsss', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1639048534, 1639048534, '2021-12-09 11:15:34', '2022-05-13 12:21:48'),
(81, 1, NULL, 1, 'Men', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1639563786, 1639563786, '2021-12-15 10:23:05', '2022-05-13 12:21:48'),
(82, 1, 80, 2, 'a', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1640162569, 1640162569, '2021-12-22 08:42:48', '2022-05-13 12:21:48'),
(83, 1, NULL, 1, 'Electronics', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1644995866, 1644995866, '2022-02-16 07:17:46', '2022-05-13 12:21:48'),
(84, 1, 83, 2, 'Tv', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1644995903, 1644995903, '2022-02-16 07:18:22', '2022-05-13 12:21:48'),
(85, 1, 83, 2, 'TV', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1644995914, 1644995914, '2022-02-16 07:18:34', '2022-05-13 12:21:48'),
(86, 1, NULL, 1, 'Clothes', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1644996324, 1644996324, '2022-02-16 07:25:24', '2022-05-13 12:21:48'),
(87, 1, 86, 2, 'B', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1644996358, 1644996358, '2022-02-16 07:25:58', '2022-05-13 12:21:48'),
(88, 1, 86, 2, 'asd', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1644997865, 1644997865, '2022-02-16 07:51:04', '2022-05-13 12:21:48'),
(89, 1, 88, 3, 'Peter Parker', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1645016553, 1645016553, '2022-02-16 13:02:33', '2022-05-13 12:21:48'),
(90, 1, 88, 3, 'Peter Parker', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1645016613, 1645016613, '2022-02-16 13:03:33', '2022-05-13 12:21:48'),
(91, 1, 87, 3, 'Peter Parker the amazing Spider man', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 75, '', 0, 1645016639, 1645016639, '2022-02-16 13:03:58', '2022-05-13 12:21:48'),
(92, 1, NULL, 1, 'shoes', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1648798632, 1648798632, '2022-04-01 07:37:12', '2022-05-13 12:21:48'),
(93, 1, NULL, 1, 'whisky', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 50, '', 0, 1648809131, 1648809131, '2022-04-01 10:32:10', '2022-05-13 12:21:48'),
(94, 1, NULL, 1, 'darro', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 0, '', 0, 1648813800, 1648813800, '2022-04-01 11:49:59', '2022-05-13 12:21:48'),
(95, 0, NULL, 1, 'dfsdfasdf', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 0, '', 0, 1649750452, 1649750452, '2022-04-12 08:00:52', '2022-07-22 06:40:35'),
(96, 0, NULL, 1, 'dfghdfgh', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 0, '', 0, 1649826843, 1649826843, '2022-04-13 05:14:03', '2022-07-22 06:40:21'),
(97, 1, NULL, 1, 'new', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 35, '', 0, 1652176265, 1652176306, '2022-05-10 09:51:05', '2022-05-13 12:21:48'),
(98, 1, NULL, 1, 'ssdfg', 'b9172fd0-d048-11ec-9401-4b2907c489ba.jpg', 34, 'orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.', 0, 1652177130, 1652177455, '2022-05-10 10:05:30', '2022-05-10 10:10:54');

-- --------------------------------------------------------

--
-- Table structure for table `chat_constants`
--

CREATE TABLE `chat_constants` (
  `id` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `groupId` int(11) NOT NULL DEFAULT '0',
  `lastMessageId` int(11) NOT NULL,
  `deletedId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chat_constants`
--

INSERT INTO `chat_constants` (`id`, `senderId`, `receiverId`, `groupId`, `lastMessageId`, `deletedId`, `created`, `updated`) VALUES
(234, 1, 142, 0, 156, 0, 1637671785, 1639473361);

-- --------------------------------------------------------

--
-- Table structure for table `color`
--

CREATE TABLE `color` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `color` varchar(15) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `color`
--

INSERT INTO `color` (`id`, `prod_id`, `color`, `createdAt`, `updatedAt`) VALUES
(1, 638, '#ff0000', '2021-12-31 07:34:14', '2021-12-31 07:34:14'),
(2, 638, '#000000', '2021-12-31 07:34:14', '2021-12-31 07:34:14'),
(3, 639, '#ff0000', '2021-12-31 11:04:53', '2021-12-31 11:04:53'),
(4, 639, '#000000', '2021-12-31 11:04:53', '2021-12-31 11:04:53'),
(5, 639, '#1fe059', '2021-12-31 11:04:53', '2021-12-31 11:04:53'),
(6, 640, '#ff0000', '2021-12-31 11:23:55', '2021-12-31 11:23:55'),
(7, 640, '#0905ff', '2021-12-31 11:23:55', '2021-12-31 11:23:55'),
(8, 640, '#5b3810', '2021-12-31 11:23:55', '2021-12-31 11:23:55'),
(9, 641, '#ff0000', '2021-12-31 11:25:03', '2021-12-31 11:25:03'),
(10, 641, '#2d20df', '2021-12-31 11:25:03', '2021-12-31 11:25:03'),
(11, 641, '#23b356', '2021-12-31 11:25:03', '2021-12-31 11:25:03'),
(12, 642, '#ff0000', '2021-12-31 11:30:03', '2021-12-31 11:30:03'),
(13, 642, '#3cd228', '2021-12-31 11:30:03', '2021-12-31 11:30:03'),
(14, 642, '#982525', '2021-12-31 11:30:03', '2021-12-31 11:30:03'),
(15, 643, '#ff0000', '2021-12-31 11:31:50', '2021-12-31 11:31:50'),
(16, 643, '#000000', '2021-12-31 11:31:50', '2021-12-31 11:31:50'),
(17, 643, '#d912a4', '2021-12-31 11:31:50', '2021-12-31 11:31:50'),
(18, 643, '#ffef0a', '2021-12-31 11:31:50', '2021-12-31 11:31:50'),
(19, 644, '#ff0000', '2021-12-31 11:33:48', '2021-12-31 11:33:48'),
(20, 644, '#923a3a', '2021-12-31 11:33:48', '2021-12-31 11:33:48'),
(21, 645, '#ff0000', '2021-12-31 11:35:15', '2021-12-31 11:35:15'),
(22, 645, '#000000', '2021-12-31 11:35:15', '2021-12-31 11:35:15'),
(23, 646, '#ff0000', '2021-12-31 11:37:30', '2021-12-31 11:37:30'),
(24, 646, '#000000', '2021-12-31 11:37:30', '2021-12-31 11:37:30'),
(25, 646, '#1709d7', '2021-12-31 11:37:30', '2021-12-31 11:37:30'),
(26, 647, '#ff0000', '2021-12-31 11:42:35', '2021-12-31 11:42:35'),
(27, 648, '#ff0000', '2022-01-05 10:01:39', '2022-01-05 10:01:39'),
(28, 649, '#ff0000', '2022-01-05 10:03:00', '2022-01-05 10:03:00'),
(29, 649, '#000000', '2022-01-05 10:03:00', '2022-01-05 10:03:00'),
(30, 649, '#248f4d', '2022-01-05 10:03:00', '2022-01-05 10:03:00'),
(31, 650, '#ff0000', '2022-01-05 10:20:16', '2022-01-05 10:20:16'),
(32, 650, '#000000', '2022-01-05 10:20:16', '2022-01-05 10:20:16'),
(33, 651, '#ff0000', '2022-01-05 11:01:17', '2022-01-05 11:01:17'),
(34, 651, '#000000', '2022-01-05 11:01:17', '2022-01-05 11:01:17'),
(35, 652, '#ff0000', '2022-01-06 06:16:09', '2022-01-06 06:16:09'),
(36, 652, '#000000', '2022-01-06 06:16:09', '2022-01-06 06:16:09'),
(37, 653, '#ff0000', '2022-01-06 12:18:05', '2022-01-06 12:18:05'),
(38, 653, '#000000', '2022-01-06 12:18:05', '2022-01-06 12:18:05'),
(39, 653, '#258d3f', '2022-01-06 12:18:05', '2022-01-06 12:18:05'),
(40, 654, '#ff0000', '2022-03-17 05:41:03', '2022-03-17 05:41:03'),
(41, 655, '#61177c', '2022-03-17 05:46:57', '2022-03-17 05:46:57'),
(42, 655, '#573400', '2022-03-17 05:46:57', '2022-03-17 05:46:57'),
(43, 655, '#ff6a00', '2022-03-17 05:46:57', '2022-03-17 05:46:57'),
(44, 655, '#a77b00', '2022-03-17 05:46:57', '2022-03-17 05:46:57'),
(45, 656, '#ff0000', '2022-03-17 05:47:57', '2022-03-17 05:47:57'),
(46, 657, '#ff0000', '2022-03-31 12:38:10', '2022-03-31 12:38:10'),
(47, 657, '#000000', '2022-03-31 12:38:10', '2022-03-31 12:38:10'),
(48, 658, '#ff0000', '2022-03-31 12:52:27', '2022-03-31 12:52:27'),
(49, 658, '#222020', '2022-03-31 12:52:27', '2022-03-31 12:52:27'),
(50, 659, '#ff0000', '2022-04-01 05:20:42', '2022-04-01 05:20:42'),
(51, 660, '#ff0000', '2022-04-04 05:52:44', '2022-04-04 05:52:44'),
(52, 660, '#5c7570', '2022-04-04 05:52:44', '2022-04-04 05:52:44'),
(53, 661, '#ff0000', '2022-04-04 06:10:53', '2022-04-04 06:10:53'),
(54, 662, '#ff0000', '2022-04-04 06:32:19', '2022-04-04 06:32:19'),
(55, 664, '#ff0000', '2022-04-04 06:46:41', '2022-04-04 06:46:41'),
(56, 664, '#000000', '2022-04-04 06:46:41', '2022-04-04 06:46:41'),
(57, 665, '#477580', '2022-04-04 09:44:15', '2022-04-04 09:44:15'),
(58, 665, '#a15e5e', '2022-04-04 09:44:15', '2022-04-04 09:44:15'),
(59, 666, '#fdd926', '2022-04-04 10:03:51', '2022-04-04 10:03:51'),
(60, 667, '#939dab', '2022-04-04 10:39:12', '2022-04-04 10:39:12'),
(61, 668, '#e5ad34', '2022-04-04 10:55:24', '2022-04-04 10:55:24'),
(62, 669, '#f18028', '2022-04-05 06:01:20', '2022-04-05 06:01:20'),
(63, 670, '#631e15', '2022-04-05 09:42:34', '2022-04-05 09:42:34'),
(64, 670, '#ff0000', '2022-06-07 11:10:44', '2022-04-06 13:08:23'),
(65, 670, '#ff0000', '2022-06-07 11:10:46', '2022-04-06 13:18:27'),
(66, 670, '#000000', '2022-06-07 11:10:49', '2022-04-06 13:18:27'),
(67, 672, '#1bb9bb', '2022-04-06 13:18:27', '2022-04-06 13:18:27'),
(68, 673, '#ff0000', '2022-04-13 06:18:40', '2022-04-13 06:18:40'),
(69, 674, '#ff0000', '2022-04-26 09:41:58', '2022-04-26 09:41:58'),
(70, 674, '#ff0000', '2022-05-10 06:37:25', '2022-05-10 06:37:25'),
(71, 674, '#ff0000', '2022-06-10 05:20:31', '2022-06-10 05:20:31'),
(72, 674, '#000000', '2022-06-10 05:20:31', '2022-06-10 05:20:31'),
(73, 674, '#4dd214', '2022-06-10 05:20:31', '2022-06-10 05:20:31'),
(74, 675, '#ff0000', '2022-06-10 11:18:58', '2022-06-10 11:18:58'),
(75, 676, '#ff0000', '2022-06-10 11:21:22', '2022-06-10 11:21:22'),
(76, 677, '#ff0000', '2022-06-15 06:17:14', '2022-06-15 06:17:14'),
(77, 677, '#000000', '2022-06-15 06:17:14', '2022-06-15 06:17:14'),
(78, 677, '#1bcd18', '2022-06-15 06:17:14', '2022-06-15 06:17:14'),
(79, 678, '#ff0000', '2022-06-15 07:19:02', '2022-06-15 07:19:02'),
(80, 678, '#000000', '2022-06-15 07:19:02', '2022-06-15 07:19:02'),
(81, 678, '#1bcd18', '2022-06-15 07:19:02', '2022-06-15 07:19:02'),
(82, 679, '#ff0000', '2022-06-15 07:20:19', '2022-06-15 07:20:19'),
(83, 681, '#ff0000', '2022-06-15 07:25:12', '2022-06-15 07:25:12'),
(84, 683, '#ff0000', '2022-06-15 07:27:09', '2022-06-15 07:27:09'),
(85, 684, '#ff0000', '2022-06-15 07:37:59', '2022-06-15 07:37:59'),
(86, 673, '#f4c076', '2022-06-16 05:52:45', '2022-06-16 05:52:45'),
(87, 674, '#ff0000', '2022-06-16 06:07:23', '2022-06-16 06:07:23'),
(88, 675, '#f4d7ae', '2022-06-16 06:15:40', '2022-06-16 06:15:40'),
(89, 676, '#ff0000', '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(90, 678, '#ff0000', '2022-07-01 06:18:38', '2022-07-01 06:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `contact_us`
--

CREATE TABLE `contact_us` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `contact_us`
--

INSERT INTO `contact_us` (`id`, `first_name`, `last_name`, `email`, `phone`, `message`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 'bsdfg', 'sdfgsd', 'admin@admin.com', '2342345', ' sfdgsdfg', 1648188737, 1648188737, '2022-03-25 06:12:17', '2022-03-25 06:12:17'),
(2, 'bsdfg', 'sdfgsd', 'huduma.panel@gmail.com', '2342345', ' ', 1648189195, 1648189195, '2022-03-25 06:19:54', '2022-03-25 06:19:54'),
(3, 'dfgjdf', 'fdghdfgh', 'admin@admin.com', '3563456345', 'dfghdfghdfgh', 1648193233, 1648193233, '2022-03-25 07:27:13', '2022-03-25 07:27:13'),
(4, 'bsdfg', 'sdfgsd', 'admin@admin.com', '345634563456', 'dbsfgsdfgsdfg', 1648201762, 1648201762, '2022-03-25 09:49:22', '2022-03-25 09:49:22');

-- --------------------------------------------------------

--
-- Table structure for table `driverDetail`
--

CREATE TABLE `driverDetail` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `faq`
--

CREATE TABLE `faq` (
  `id` int(11) NOT NULL,
  `question` text NOT NULL,
  `answer` text NOT NULL,
  `status` int(11) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `faq`
--

INSERT INTO `faq` (`id`, `question`, `answer`, `status`, `createdAt`, `updatedAt`) VALUES
(1, 'What is a FAQ Page/FAQ section?', 'FAQ stands for Frequently Asked Questions. FAQs are the questions that your customers might have, which you can answer in advance.\n\nSo, an FAQ page or section is a specific page or a section within your eCommerce store where you list down all the questions your customers might have or ask them frequently regarding your business, products/services, policies, processes, and more.', 1, '2022-03-30 08:01:10', '2022-03-31 11:32:15'),
(2, 'Why should you have FAQs for eCommerce website or product pages?\n', 'One of the top advantages of having FAQs on your eCommerce store is to improve the user experience. \n\nFAQs consists of questions that your customers frequently have. Hence, addressing them and answering them keeps them informed about your products. When they feel their queries are being listened to and answered, users, are more likely to trust your products as well as your brand.\n\n\n \nAnd, customer experience has become the topmost factor for the success of any eCommerce business. So, having it, ensures you’re making your customers happy and satisfied.', 1, '2022-03-30 08:01:10', '2022-03-31 11:33:56'),
(5, 'hello', 'hhhhhhhhhhhhhhhhhhhkashdkjasjkdbasnfdsagdfbasdfbasdfbasbdfsadf', 1, '2022-04-12 11:13:25', '2022-04-12 11:13:47'),
(6, 'jlhftufvgjhkgkhjv', 'm/bmjhvkkbjfk', 1, '2022-04-12 11:29:27', '2022-04-12 11:29:27'),
(7, 'what is you name?', 'pershant here', 1, '2022-04-13 05:12:53', '2022-04-13 05:12:53');

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `comment` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `orderId`, `userId`, `comment`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 2, 38, 'Product quality is not good', 1595607539, 1595607539, '2020-07-24 21:48:59', '2020-07-24 21:49:28'),
(2, 1, 24, 'Order is taking too long to deliver', 1595607539, 1595607539, '2020-07-24 21:48:59', '2020-07-24 21:49:37');

-- --------------------------------------------------------

--
-- Table structure for table `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `prod_id` int(11) NOT NULL,
  `images` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `images`
--

INSERT INTO `images` (`id`, `prod_id`, `images`, `createdAt`, `updatedAt`) VALUES
(163, 660, 'b3998c73-6eea-11ec-8d9d-c1feb4533bcf.png', '2022-01-06 12:18:05', '2022-01-06 12:18:05'),
(164, 661, '6c9a0bf0-b0ef-11ec-a685-778a1bb5562d.png', '2022-03-31 12:38:10', '2022-03-31 12:38:10'),
(165, 662, '6c9a0bf1-b0ef-11ec-a685-778a1bb5562d.png', '2022-03-31 12:38:10', '2022-03-31 12:38:10'),
(166, 663, '6c9a3300-b0ef-11ec-a685-778a1bb5562d.png', '2022-03-31 12:38:10', '2022-03-31 12:38:10'),
(167, 664, 'fbdcdfe0-b3e2-11ec-bd35-1d1af00261e7.png', '2022-04-04 06:46:41', '2022-04-04 06:46:41'),
(169, 666, '87796df0-b3fe-11ec-9907-d19d9b591b93.jpeg', '2022-04-04 10:03:51', '2022-04-04 10:03:51'),
(170, 667, '77d23850-b403-11ec-a624-a34acfdb6ae9.jpeg', '2022-04-04 10:39:12', '2022-04-04 10:39:12'),
(171, 668, 'bb0b2a30-b405-11ec-8970-cf8daf5cc954.jpeg', '2022-04-04 10:55:24', '2022-04-04 10:55:24'),
(172, 669, 'd0803770-b4a5-11ec-b6e3-b7b742b5e55e.jpg', '2022-04-05 06:01:20', '2022-04-05 06:01:20'),
(173, 670, 'b8bc9880-b4c4-11ec-a3e0-2f8b54d922da.jpg', '2022-04-05 09:42:34', '2022-04-05 09:42:34'),
(174, 670, 'b8bcbf90-b4c4-11ec-a3e0-2f8b54d922da.jpeg', '2022-04-05 09:42:34', '2022-04-05 09:42:34'),
(175, 670, 'b8bcbf91-b4c4-11ec-a3e0-2f8b54d922da.jpg', '2022-04-05 09:42:34', '2022-04-05 09:42:34'),
(176, 671, 'a367a830-b5aa-11ec-bccb-094dbe52815d.jpg', '2022-04-06 13:08:23', '2022-04-06 13:08:23'),
(177, 671, 'a367cf40-b5aa-11ec-bccb-094dbe52815d.jpeg', '2022-04-06 13:08:23', '2022-04-06 13:08:23'),
(178, 672, '0b6714b0-b5ac-11ec-b7e9-59a011463403.jpeg', '2022-04-06 13:18:27', '2022-04-06 13:18:27'),
(179, 672, '0b673bc0-b5ac-11ec-b7e9-59a011463403.jpeg', '2022-04-06 13:18:27', '2022-04-06 13:18:27'),
(180, 672, '0b673bc1-b5ac-11ec-b7e9-59a011463403.jpg', '2022-04-06 13:18:27', '2022-04-06 13:18:27'),
(181, 673, '8f8d9cb0-baf1-11ec-9163-b7f6ac54d45c.jpeg', '2022-04-13 06:18:40', '2022-04-13 06:18:40'),
(182, 674, '1dac9e30-c545-11ec-8727-6133585ab62d.png', '2022-04-26 09:41:58', '2022-04-26 09:41:58'),
(183, 674, 'a79ae480-d02b-11ec-8a61-bf12da16a5a2.jpg', '2022-05-10 06:37:25', '2022-05-10 06:37:25'),
(184, 674, '0bee37c0-e87d-11ec-b3ac-5b7221752a10.png', '2022-06-10 05:20:31', '2022-06-10 05:20:31'),
(186, 676, '7569edc0-e8af-11ec-981f-51cc13734afc.png', '2022-06-10 11:21:22', '2022-06-10 11:21:22'),
(187, 677, 'cc562fb0-ec72-11ec-9d8f-f50994dc4bf9.png', '2022-06-15 06:17:14', '2022-06-15 06:17:14'),
(188, 678, '6f05daf0-ec7b-11ec-9d8f-f50994dc4bf9.png', '2022-06-15 07:19:02', '2022-06-15 07:19:02'),
(189, 679, '9c9955f0-ec7b-11ec-9d8f-f50994dc4bf9.png', '2022-06-15 07:20:19', '2022-06-15 07:20:19'),
(190, 681, '4b154df0-ec7c-11ec-8197-83d7ab6a4006.png', '2022-06-15 07:25:12', '2022-06-15 07:25:12'),
(191, 683, '91240700-ec7c-11ec-8286-e7a9a6df9d80.png', '2022-06-15 07:27:09', '2022-06-15 07:27:09'),
(192, 684, '1493aea0-ec7e-11ec-96a8-2b5f9d21a2a2.png', '2022-06-15 07:37:59', '2022-06-15 07:37:59'),
(193, 673, '8b9df860-ed38-11ec-9b97-2f19438a668e.jpeg', '2022-06-16 05:52:45', '2022-06-16 05:52:45'),
(194, 674, '96eaa950-ed3a-11ec-9cfb-e5d6c8dae0cc.png', '2022-06-16 06:07:23', '2022-06-16 06:07:23'),
(195, 675, 'beeed7e0-ed3b-11ec-9cfb-e5d6c8dae0cc.jpeg', '2022-06-16 06:15:40', '2022-06-16 06:15:40'),
(196, 676, 'e5bd9270-f7aa-11ec-a3b1-f3a919da3f00.jpeg', '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(197, 678, 'a579d320-f905-11ec-a7c4-654245eb3057.png', '2022-07-01 06:18:38', '2022-07-01 06:18:38');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `senderId` int(11) NOT NULL,
  `receiverId` int(11) NOT NULL,
  `senderType` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `receiverType` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `chatConstantId` int(11) NOT NULL DEFAULT '0',
  `groupId` int(11) NOT NULL DEFAULT '0',
  `message` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `lat` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lng` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `replyMessageId` int(11) NOT NULL DEFAULT '0',
  `replyMessageOwnerId` int(11) NOT NULL DEFAULT '0',
  `replyMessage` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `replyMessageType` int(11) NOT NULL,
  `forwadedMessageId` int(11) NOT NULL DEFAULT '0',
  `readStatus` int(11) NOT NULL DEFAULT '0' COMMENT '0:unread,1 read',
  `messageType` int(11) NOT NULL COMMENT '1:media msg,0 :default',
  `caption` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `thumbnail` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `isBroadcast` int(1) NOT NULL DEFAULT '0',
  `deletedId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `orderId`, `senderId`, `receiverId`, `senderType`, `receiverType`, `chatConstantId`, `groupId`, `message`, `lat`, `lng`, `replyMessageId`, `replyMessageOwnerId`, `replyMessage`, `replyMessageType`, `forwadedMessageId`, `readStatus`, `messageType`, `caption`, `thumbnail`, `isBroadcast`, `deletedId`, `created`, `updated`) VALUES
(156, 111, 1, 42, 'driver', 'user', 234, 0, 'hrth', '', '', 0, 0, '', 0, 0, 0, 0, '', '', 0, 0, 1639473361, 1639473361);

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `user2id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `type` int(11) NOT NULL,
  `message` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`id`, `userId`, `user2id`, `orderId`, `type`, `message`, `created_at`, `updated_at`) VALUES
(142, 1, 3, 32, 0, 'Order status changed to Accepted 52959', '2022-07-13 12:18:01', '2022-07-13 12:18:01'),
(143, 1, 3, 31, 1, 'Order status changed to Accepted 81123', '2022-07-13 12:29:07', '2022-07-13 12:29:07'),
(144, 1, 3, 30, 1, 'Order status changed to Accepted 26094', '2022-07-13 12:30:22', '2022-07-13 12:30:22'),
(145, 1, 3, 29, 1, 'Order status changed to Accepted 89422', '2022-07-13 12:31:15', '2022-07-13 12:31:15'),
(146, 1, 3, 28, 1, 'Order status changed to Accepted 73810', '2022-07-13 12:39:55', '2022-07-13 12:39:55'),
(147, 1, 3, 27, 1, 'Order status changed to Accepted 41290', '2022-07-13 12:40:22', '2022-07-13 12:40:22'),
(148, 1, 3, 32, 1, 'Order status changed to Accepted 52959', '2022-07-13 12:41:31', '2022-07-13 12:41:31'),
(149, 1, 3, 31, 1, 'Order status changed to Accepted 81123', '2022-07-13 12:41:39', '2022-07-13 12:41:39'),
(150, 1, 3, 30, 1, 'Order status changed to Accepted 26094', '2022-07-13 12:42:02', '2022-07-13 12:42:02'),
(151, 1, 3, 29, 1, 'Order status changed to Accepted 89422', '2022-07-13 12:42:22', '2022-07-13 12:42:22'),
(152, 1, 3, 28, 1, 'Order status changed to Accepted 73810', '2022-07-13 12:42:27', '2022-07-13 12:42:27'),
(153, 1, 3, 27, 1, 'Order status changed to Accepted 41290', '2022-07-13 12:44:35', '2022-07-13 12:44:35'),
(154, 1, 3, 26, 1, 'Order status changed to Accepted 92229', '2022-07-13 12:45:29', '2022-07-13 12:45:29'),
(155, 1, 3, 25, 1, 'Order status changed to Accepted 78127', '2022-07-13 12:45:57', '2022-07-13 12:45:57'),
(156, 1, 3, 32, 1, 'Order status changed to Accepted 52959', '2022-07-13 12:48:20', '2022-07-13 12:48:20'),
(157, 1, 3, 32, 1, 'Order status changed to Packed 52959', '2022-07-13 12:48:51', '2022-07-13 12:48:51'),
(158, 1, 3, 32, 1, 'Order status changed to Accepted 52959', '2022-07-13 12:48:52', '2022-07-13 12:48:52'),
(159, 1, 3, 32, 1, 'Order status changed to Packed 52959', '2022-07-13 12:48:58', '2022-07-13 12:48:58'),
(160, 1, 3, 32, 1, 'Order status changed to Shipped 52959', '2022-07-13 12:49:30', '2022-07-13 12:49:30'),
(161, 1, 3, 32, 1, 'Order status changed to Delivered 52959', '2022-07-13 12:49:38', '2022-07-13 12:49:38'),
(162, 1, 3, 32, 1, 'Order status changed to Shipped 52959', '2022-07-13 12:49:40', '2022-07-13 12:49:40'),
(163, 1, 3, 32, 1, 'Order status changed to Delivered 52959', '2022-07-13 12:49:49', '2022-07-13 12:49:49'),
(164, 1, 3, 31, 1, 'Order status changed to Accepted 81123', '2022-07-13 12:50:14', '2022-07-13 12:50:14'),
(165, 1, 3, 30, 1, 'Order status changed to Accepted 26094', '2022-07-13 12:55:11', '2022-07-13 12:55:11'),
(166, 1, 3, 29, 1, 'Order status changed to Accepted 89422', '2022-07-13 12:56:35', '2022-07-13 12:56:35'),
(167, 1, 3, 28, 1, 'Order status changed to Accepted 73810', '2022-07-13 12:57:35', '2022-07-13 12:57:35'),
(168, 1, 3, 32, 1, 'Order status changed to Accepted 52959', '2022-07-13 12:57:59', '2022-07-13 12:57:59'),
(169, 1, 3, 31, 1, 'Order status changed to Accepted 81123', '2022-07-13 12:58:50', '2022-07-13 12:58:50'),
(170, 1, 3, 30, 1, 'Order status changed to Accepted 26094', '2022-07-13 12:58:57', '2022-07-13 12:58:57'),
(171, 1, 3, 32, 1, 'Withdraw Requests status changed to Packed 52959', '2022-07-14 09:39:08', '2022-07-14 09:39:08'),
(172, 1, 3, 32, 1, 'Order status changed to Shipped 52959', '2022-07-20 13:27:48', '2022-07-20 13:27:48'),
(173, 1, 3, 32, 1, 'Order status changed to Delivered 52959', '2022-07-20 13:27:52', '2022-07-20 13:27:52'),
(174, 1, 3, 31, 1, 'Order status changed to Packed 81123', '2022-07-20 13:28:03', '2022-07-20 13:28:03'),
(175, 1, 3, 30, 1, 'Order status changed to Packed 26094', '2022-07-20 13:28:22', '2022-07-20 13:28:22'),
(176, 1, 3, 28, 1, 'Order status changed to Accepted 73810', '2022-07-20 13:28:34', '2022-07-20 13:28:34');

-- --------------------------------------------------------

--
-- Table structure for table `order`
--

CREATE TABLE `order` (
  `id` int(11) NOT NULL,
  `orderNo` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `orderStatus` tinyint(4) NOT NULL COMMENT '0: ''Pending'',     1: ''Accepted'',     2: ''Packed'',     3: ''Shipped'',     4: ''Delivered'',     5: ''Cancelled'',     6: ''Declined'',',
  `isSelfpickup` int(11) NOT NULL COMMENT '1=>selfpicked 0=>none',
  `customerId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL DEFAULT '0',
  `qty` mediumint(9) NOT NULL,
  `netAmount` decimal(9,2) NOT NULL,
  `taxCharged` decimal(9,2) NOT NULL,
  `shippingCharges` decimal(9,2) NOT NULL,
  `billing_address_id` int(11) NOT NULL,
  `shiping_address_id` int(11) NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine2` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_id` int(11) NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` int(11) NOT NULL,
  `adminCommission` decimal(9,2) NOT NULL,
  `subTotal` float NOT NULL,
  `discount` int(11) NOT NULL,
  `shipping` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_tracking_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `order_tracking_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` int(11) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `paymentMethod` tinyint(4) NOT NULL COMMENT '0=>Wallet 1=>Card 2=>cash',
  `deliveryDate` date NOT NULL,
  `deliverySlot` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_withdrawn_by_vendor` int(1) NOT NULL DEFAULT '0' COMMENT '0-withdrawal pending, 1-requested, 2-completed, 3 - rejected',
  `orderJson` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `order`
--

INSERT INTO `order` (`id`, `orderNo`, `product_id`, `orderStatus`, `isSelfpickup`, `customerId`, `vendorId`, `employeeId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `billing_address_id`, `shiping_address_id`, `address`, `addressLine2`, `city`, `state`, `card_id`, `country`, `zipCode`, `adminCommission`, `subTotal`, `discount`, `shipping`, `order_tracking_id`, `order_tracking_url`, `tax`, `total`, `paymentMethod`, `deliveryDate`, `deliverySlot`, `is_withdrawn_by_vendor`, `orderJson`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(10, '66466', 675, 0, 0, 3, 1, 0, 3, '3000.00', '900.00', '234.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1655971926, 1655971926, '2022-06-23 08:12:05', '2022-07-14 10:12:51'),
(11, '15611', 667, 0, 0, 3, 1, 0, 2, '1500.00', '900.00', '20.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1655971926, 1655971926, '2022-06-23 08:12:05', '2022-07-14 10:12:51'),
(21, '34587', 675, 0, 0, 3, 1, 0, 3, '3000.00', '900.00', '234.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1656939026, 1656939026, '2022-07-04 12:50:26', '2022-07-14 10:12:51'),
(22, '43523', 675, 0, 0, 3, 1, 0, 3, '3000.00', '900.00', '234.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657001570, 1657001570, '2022-07-05 06:12:49', '2022-07-14 10:12:51'),
(23, '94314', 670, 0, 0, 3, 1, 0, 1, '500.00', '100.00', '20.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657002325, 1657002325, '2022-07-05 06:25:24', '2022-07-14 10:12:51'),
(24, '36105', 670, 0, 0, 3, 1, 0, 1, '500.00', '100.00', '20.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657002736, 1657002736, '2022-07-05 06:32:16', '2022-07-14 10:12:51'),
(25, '78127', 675, 0, 0, 3, 1, 0, 3, '3000.00', '900.00', '234.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657006280, 1657716357, '2022-07-05 07:31:20', '2022-07-14 10:12:51'),
(26, '92229', 670, 0, 0, 3, 1, 0, 2, '1000.00', '200.00', '20.00', 30, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657017318, 1657716330, '2022-07-05 10:35:17', '2022-07-14 10:12:51'),
(27, '41290', 666, 0, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542188, 1657716276, '2022-07-11 12:23:08', '2022-07-14 10:12:51'),
(28, '73810', 666, 1, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542830, 1658323715, '2022-07-11 12:33:49', '2022-07-20 13:28:34'),
(29, '89422', 666, 0, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542841, 1657716996, '2022-07-11 12:34:01', '2022-07-14 10:12:51'),
(30, '26094', 666, 2, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542910, 1658323702, '2022-07-11 12:35:10', '2022-07-20 13:28:22'),
(31, '81123', 666, 2, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542961, 1658323684, '2022-07-11 12:36:00', '2022-07-20 13:28:03'),
(32, '52959', 666, 4, 0, 3, 1, 0, 1, '300.00', '60.00', '20.00', 33, 29, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '1646564', 'https://www.fedex.com/en-in/tracking.html', 0, '0.00', 0, '0000-00-00', '', 0, '', 1657542981, 1658323673, '2022-07-11 12:36:20', '2022-07-20 13:27:52'),
(33, '77671', 668, 0, 0, 3, 1, 0, 2, '1004.00', '300.80', '20.00', 29, 28, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '0', '', 0, '0.00', 0, '0000-00-00', '', 0, '', 1658495511, 1658495511, '2022-07-22 13:11:50', '2022-07-22 13:11:50'),
(34, '90443', 672, 0, 0, 3, 1, 0, 1, '500.00', '300.80', '20.00', 29, 28, '0', '0', '0', '0', 58, '0', 0, '0.00', 0, 0, '0', '0', '', 0, '0.00', 0, '0000-00-00', '', 0, '', 1658495511, 1658495511, '2022-07-22 13:11:50', '2022-07-22 13:11:50');

-- --------------------------------------------------------

--
-- Table structure for table `orderCancellationRequest`
--

CREATE TABLE `orderCancellationRequest` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>pending 1=>approved 2=>disapproved',
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderCancellationRequest`
--

INSERT INTO `orderCancellationRequest` (`id`, `status`, `orderId`, `customerId`, `vendorId`, `reason`, `comments`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, 35, 42, 'Cancel reason 1', 'dff', 1591976366, 1601009387, '2020-06-12 15:39:26', '2020-09-25 04:49:46');

-- --------------------------------------------------------

--
-- Table structure for table `orderItem`
--

CREATE TABLE `orderItem` (
  `id` int(11) NOT NULL,
  `orderId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `qty` mediumint(9) NOT NULL,
  `netAmount` decimal(9,2) NOT NULL,
  `taxCharged` decimal(9,2) NOT NULL,
  `shippingCharges` decimal(9,2) NOT NULL,
  `adminCommission` decimal(9,2) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderItem`
--

INSERT INTO `orderItem` (`id`, `orderId`, `productId`, `qty`, `netAmount`, `taxCharged`, `shippingCharges`, `adminCommission`, `total`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2020-07-07 10:27:49'),
(2, 2, 4, 3, '20.00', '5.00', '5.00', '5.00', '20.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2020-07-07 10:27:38'),
(3, 2, 5, 3, '20.00', '5.00', '5.00', '5.00', '20.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2020-07-07 10:27:41'),
(4, 2, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2020-07-07 10:27:49'),
(5, 3, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2021-02-26 10:10:32'),
(16, 1, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2021-02-26 10:10:32'),
(17, 13, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2021-02-26 10:10:32'),
(18, 6, 1, 2, '30.00', '5.00', '20.00', '5.00', '40.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2021-02-26 10:10:32'),
(19, 7, 5, 3, '20.00', '5.00', '5.00', '5.00', '20.00', 1594104659, 1594104659, '2020-07-07 06:50:59', '2020-07-07 10:27:41'),
(20, 22, 448, 1, '26.00', '0.00', '0.00', '0.00', '26.00', 1623934878, 1623934878, '2021-06-17 13:01:17', '2021-06-17 13:01:17'),
(21, 22, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1623934878, 1623934878, '2021-06-17 13:01:17', '2021-06-17 13:01:17'),
(22, 23, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624359112, 1624359112, '2021-06-22 10:51:52', '2021-06-22 10:51:52'),
(23, 24, 449, 2, '25.00', '0.00', '0.00', '0.00', '25.00', 1624361019, 1624361019, '2021-06-22 11:23:38', '2021-06-22 11:23:38'),
(24, 25, 449, 3, '25.00', '0.00', '0.00', '0.00', '25.00', 1624363466, 1624363466, '2021-06-22 12:04:25', '2021-06-22 12:04:25'),
(25, 26, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624517284, 1624517284, '2021-06-24 06:48:04', '2021-06-24 06:48:04'),
(26, 27, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624517365, 1624517365, '2021-06-24 06:49:24', '2021-06-24 06:49:24'),
(27, 28, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624517468, 1624517468, '2021-06-24 06:51:08', '2021-06-24 06:51:08'),
(28, 29, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624517883, 1624517883, '2021-06-24 06:58:02', '2021-06-24 06:58:02'),
(29, 30, 448, 1, '26.00', '0.00', '0.00', '0.00', '26.00', 1624518028, 1624518028, '2021-06-24 07:00:28', '2021-06-24 07:00:28'),
(30, 31, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624518669, 1624518669, '2021-06-24 07:11:09', '2021-06-24 07:11:09'),
(31, 32, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624519604, 1624519604, '2021-06-24 07:26:44', '2021-06-24 07:26:44'),
(32, 33, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624522098, 1624522098, '2021-06-24 08:08:18', '2021-06-24 08:08:18'),
(33, 34, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624522618, 1624522618, '2021-06-24 08:16:58', '2021-06-24 08:16:58'),
(34, 35, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624523100, 1624523100, '2021-06-24 08:24:59', '2021-06-24 08:24:59'),
(35, 36, 448, 1, '26.00', '0.00', '0.00', '0.00', '26.00', 1624524812, 1624524812, '2021-06-24 08:53:32', '2021-06-24 08:53:32'),
(36, 37, 7, 1, '0.00', '0.00', '0.00', '0.00', '0.00', 1624532007, 1624532007, '2021-06-24 10:53:26', '2021-06-24 10:53:26'),
(37, 38, 4, 1, '15.00', '0.00', '0.00', '0.00', '15.00', 1624532253, 1624532253, '2021-06-24 10:57:32', '2021-06-24 10:57:32'),
(38, 39, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624533916, 1624533916, '2021-06-24 11:25:15', '2021-06-24 11:25:15'),
(39, 40, 449, 5, '25.00', '0.00', '0.00', '0.00', '25.00', 1624598117, 1624598117, '2021-06-25 05:15:16', '2021-06-25 05:15:16'),
(40, 41, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624599475, 1624599475, '2021-06-25 05:37:54', '2021-06-25 05:37:54'),
(41, 42, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624599903, 1624599903, '2021-06-25 05:45:03', '2021-06-25 05:45:03'),
(42, 43, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624600134, 1624600134, '2021-06-25 05:48:54', '2021-06-25 05:48:54'),
(43, 44, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624600202, 1624600202, '2021-06-25 05:50:02', '2021-06-25 05:50:02'),
(44, 45, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624600398, 1624600398, '2021-06-25 05:53:18', '2021-06-25 05:53:18'),
(45, 46, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624600628, 1624600628, '2021-06-25 05:57:08', '2021-06-25 05:57:08'),
(46, 47, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624601567, 1624601567, '2021-06-25 06:12:47', '2021-06-25 06:12:47'),
(47, 48, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624619901, 1624619901, '2021-06-25 11:18:20', '2021-06-25 11:18:20'),
(48, 49, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624947994, 1624947994, '2021-06-29 06:26:34', '2021-06-29 06:26:34'),
(49, 50, 448, 2, '26.00', '0.00', '0.00', '0.00', '26.00', 1624951287, 1624951287, '2021-06-29 07:21:27', '2021-06-29 07:21:27'),
(51, 52, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1624958274, 1624958274, '2021-06-29 09:17:53', '2021-06-29 09:17:53'),
(53, 54, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1625145701, 1625145701, '2021-07-01 13:21:40', '2021-07-01 13:21:40'),
(54, 55, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1625491744, 1625491744, '2021-07-05 13:29:04', '2021-07-05 13:29:04'),
(55, 56, 448, 5, '26.00', '0.00', '0.00', '0.00', '26.00', 1625556739, 1625556739, '2021-07-06 07:32:19', '2021-07-06 07:32:19'),
(56, 57, 451, 3, '10.00', '0.00', '0.00', '0.00', '10.00', 1625566970, 1625566970, '2021-07-06 10:22:49', '2021-07-06 10:22:49'),
(57, 57, 453, 5, '50.00', '0.00', '0.00', '0.00', '50.00', 1625566970, 1625566970, '2021-07-06 10:22:49', '2021-07-06 10:22:49'),
(59, 59, 451, 2, '10.00', '0.00', '0.00', '0.00', '10.00', 1626254825, 1626254825, '2021-07-14 09:27:04', '2021-07-14 09:27:04'),
(60, 60, 453, 4, '50.00', '0.00', '0.00', '0.00', '50.00', 1626255244, 1626255244, '2021-07-14 09:34:03', '2021-07-14 09:34:03'),
(62, 62, 451, 1, '10.00', '0.00', '0.00', '0.00', '10.00', 1626258282, 1626258282, '2021-07-14 10:24:42', '2021-07-14 10:24:42'),
(63, 63, 451, 4, '10.00', '0.00', '0.00', '0.00', '10.00', 1626262011, 1626262011, '2021-07-14 11:26:50', '2021-07-14 11:26:50'),
(65, 65, 451, 4, '10.00', '0.00', '0.00', '0.00', '10.00', 1626265916, 1626265916, '2021-07-14 12:31:56', '2021-07-14 12:31:56'),
(66, 66, 451, 5, '10.00', '0.00', '0.00', '0.00', '10.00', 1626335695, 1626335695, '2021-07-15 07:54:54', '2021-07-15 07:54:54'),
(67, 67, 453, 3, '50.00', '0.00', '0.00', '0.00', '50.00', 1626350779, 1626350779, '2021-07-15 12:06:18', '2021-07-15 12:06:18'),
(68, 68, 453, 4, '50.00', '0.00', '0.00', '0.00', '50.00', 1626421752, 1626421752, '2021-07-16 07:49:12', '2021-07-16 07:49:12'),
(69, 69, 454, 4, '49.99', '0.00', '0.00', '0.00', '49.99', 1627457663, 1627457663, '2021-07-28 07:34:22', '2021-07-28 07:34:22'),
(70, 70, 448, 3, '26.00', '0.00', '0.00', '0.00', '26.00', 1628246538, 1628246538, '2021-08-06 10:42:18', '2021-08-06 10:42:18'),
(71, 71, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1628745630, 1628745630, '2021-08-12 05:20:30', '2021-08-12 05:20:30'),
(72, 72, 462, 1, '140.00', '0.00', '0.00', '0.00', '140.00', 1628761217, 1628761217, '2021-08-12 09:40:17', '2021-08-12 09:40:17'),
(73, 73, 449, 3, '25.00', '0.00', '0.00', '0.00', '25.00', 1628857307, 1628857307, '2021-08-13 12:21:46', '2021-08-13 12:21:46'),
(74, 73, 448, 4, '26.00', '0.00', '0.00', '0.00', '26.00', 1628857307, 1628857307, '2021-08-13 12:21:46', '2021-08-13 12:21:46'),
(75, 74, 448, 4, '26.00', '0.00', '0.00', '0.00', '26.00', 1628859123, 1628859123, '2021-08-13 12:52:03', '2021-08-13 12:52:03'),
(76, 74, 449, 4, '25.00', '0.00', '0.00', '0.00', '25.00', 1628859123, 1628859123, '2021-08-13 12:52:03', '2021-08-13 12:52:03'),
(77, 75, 448, 4, '26.00', '0.00', '0.00', '0.00', '26.00', 1628859370, 1628859370, '2021-08-13 12:56:10', '2021-08-13 12:56:10'),
(78, 76, 448, 4, '26.00', '0.00', '0.00', '0.00', '26.00', 1628859974, 1628859974, '2021-08-13 13:06:14', '2021-08-13 13:06:14'),
(79, 77, 449, 3, '25.00', '0.00', '0.00', '0.00', '25.00', 1628861315, 1628861315, '2021-08-13 13:28:34', '2021-08-13 13:28:34'),
(81, 79, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1629800424, 1629800424, '2021-08-24 10:20:24', '2021-08-24 10:20:24'),
(83, 81, 466, 2, '100.00', '0.00', '0.00', '0.00', '100.00', 1629953784, 1629953784, '2021-08-26 04:56:23', '2021-08-26 04:56:23'),
(84, 82, 466, 5, '100.00', '0.00', '0.00', '0.00', '100.00', 1629964180, 1629964180, '2021-08-26 07:49:39', '2021-08-26 07:49:39'),
(85, 83, 466, 2, '100.00', '0.00', '0.00', '0.00', '100.00', 1629965467, 1629965467, '2021-08-26 08:11:06', '2021-08-26 08:11:06'),
(86, 84, 466, 5, '100.00', '0.00', '0.00', '0.00', '100.00', 1629971330, 1629971330, '2021-08-26 09:48:50', '2021-08-26 09:48:50'),
(87, 85, 466, 4, '100.00', '0.00', '0.00', '0.00', '100.00', 1629971514, 1629971514, '2021-08-26 09:51:54', '2021-08-26 09:51:54'),
(88, 86, 466, 5, '100.00', '0.00', '0.00', '0.00', '100.00', 1629971549, 1629971549, '2021-08-26 09:52:29', '2021-08-26 09:52:29'),
(90, 88, 472, 3, '200.00', '0.00', '0.00', '0.00', '200.00', 1630676211, 1630676211, '2021-09-03 13:36:51', '2021-09-03 13:36:51'),
(91, 89, 472, 1, '200.00', '0.00', '0.00', '0.00', '200.00', 1630676429, 1630676429, '2021-09-03 13:40:29', '2021-09-03 13:40:29'),
(92, 90, 473, 3, '50.00', '0.00', '0.00', '0.00', '50.00', 1630992767, 1630992767, '2021-09-07 05:32:46', '2021-09-07 05:32:46'),
(93, 91, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1633504126, 1633504126, '2021-10-06 07:08:45', '2021-10-06 07:08:45'),
(94, 92, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1633507449, 1633507449, '2021-10-06 08:04:09', '2021-10-06 08:04:09'),
(95, 93, 448, 1, '26.00', '0.00', '0.00', '0.00', '26.00', 1633508041, 1633508041, '2021-10-06 08:14:01', '2021-10-06 08:14:01'),
(96, 94, 454, 1, '49.99', '0.00', '0.00', '0.00', '49.99', 1633518317, 1633518317, '2021-10-06 11:05:16', '2021-10-06 11:05:16'),
(99, 97, 449, 3, '25.00', '0.00', '0.00', '0.00', '25.00', 1634285236, 1634285236, '2021-10-15 08:07:15', '2021-10-15 08:07:15'),
(100, 98, 478, 2, '22.00', '0.00', '0.00', '0.00', '22.00', 1634533361, 1634533361, '2021-10-18 05:02:41', '2021-10-18 05:02:41'),
(101, 99, 454, 2, '49.99', '0.00', '0.00', '0.00', '49.99', 1634533712, 1634533712, '2021-10-18 05:08:31', '2021-10-18 05:08:31'),
(102, 100, 448, 1, '26.00', '0.00', '0.00', '0.00', '26.00', 1634724763, 1634724763, '2021-10-20 10:12:43', '2021-10-20 10:12:43'),
(103, 100, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1634724763, 1634724763, '2021-10-20 10:12:43', '2021-10-20 10:12:43'),
(104, 101, 449, 3, '25.00', '0.00', '0.00', '0.00', '25.00', 1634724823, 1634724823, '2021-10-20 10:13:43', '2021-10-20 10:13:43'),
(105, 102, 449, 1, '25.00', '0.00', '0.00', '0.00', '25.00', 1634725672, 1634725672, '2021-10-20 10:27:51', '2021-10-20 10:27:51'),
(106, 103, 482, 7, '100.00', '0.00', '0.00', '0.00', '100.00', 1634728523, 1634728523, '2021-10-20 11:15:23', '2021-10-20 11:15:23'),
(107, 104, 1, 1, '5.00', '0.00', '0.00', '0.00', '5.00', 1634728714, 1634728714, '2021-10-20 11:18:33', '2021-10-20 11:18:33'),
(108, 105, 482, 1, '100.00', '0.00', '0.00', '0.00', '100.00', 1635513890, 1635513890, '2021-10-29 13:24:50', '2021-10-29 13:24:50'),
(109, 106, 495, 1, '14.00', '0.00', '0.00', '0.00', '14.00', 1636628868, 1636628868, '2021-11-11 11:07:48', '2021-11-11 11:07:48'),
(110, 107, 495, 1, '14.00', '0.00', '0.00', '0.00', '14.00', 1636714340, 1636714340, '2021-11-12 10:52:20', '2021-11-12 10:52:20');

-- --------------------------------------------------------

--
-- Table structure for table `orderRefundRequest`
--

CREATE TABLE `orderRefundRequest` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>pending 1=>approved 2=>disapproved',
  `orderId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `orderRefundRequest`
--

INSERT INTO `orderRefundRequest` (`id`, `status`, `orderId`, `customerId`, `vendorId`, `reason`, `comments`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 24, 41, 'refund reason 1', 'Want to refund Money', 1591976366, 1593158190, '2020-06-12 21:09:26', '2020-06-27 19:06:01');

-- --------------------------------------------------------

--
-- Table structure for table `orderWithdrawalRequest`
--

CREATE TABLE `orderWithdrawalRequest` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>pending 1=>approved 2=>disapproved',
  `orderId` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `bankId` int(11) NOT NULL,
  `customerId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `comments` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `page`
--

CREATE TABLE `page` (
  `id` int(11) NOT NULL,
  `accessor` varchar(100) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `page`
--

INSERT INTO `page` (`id`, `accessor`, `title`, `content`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 'aboutUs', 'About Us', '<p><strong>About Us&nbsp;</strong></p>\n<p>Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues. Li nov lingua franca va esser plu simplic e regulari quam li existent Europan lingues. It va esser tam simplic quam Occidental in fact, it va esser Occidental. A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc, litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores. At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles.</p>', 1591716283, 1600680855, '2020-03-23 15:32:10', '2022-07-20 11:53:25'),
(2, 'termsAndConditions', 'Terms & Conditions', '<p><b><span style=\"font-size: 36px;\">Terms And&nbsp; Conditions</span> </b></p><p><br></p><p>Terms and Conditions</p><p><br>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.\n\n</p><p><br>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>\n<p></p>\n<p></p>\n<p></p>', 1591716283, 1629263437, '2020-03-23 15:32:39', '2022-03-25 06:50:25'),
(3, 'privacyPolicy', 'Privacy Policy', '<p><strong>Privacy Policy</strong></p>\n<p></p>\n<p>\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</br>\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>', 1591716283, 1600680605, '2020-03-23 15:33:04', '2022-03-25 07:12:06'),
(4, 'shippingInformation', 'Shipping Information', '<p><strong>Shipping Informationxcvbxcvbxvcbxcvbxvbxcvbxcvbxb</strong></p>\n<p></p>\n<p>\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"<br>\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>', 1591716283, 1649826799, '2020-03-23 15:33:04', '2022-04-13 05:13:19'),
(5, 'returnandexchange', 'Returns & Exchanges', '<p><strong>Returns &amp; Exchangesghhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh</strong></p>\n<p></p>\n<p>\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"<br>\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>', 1591716283, 1649826819, '2020-03-23 15:33:04', '2022-04-13 05:13:39'),
(6, 'freeShippingAndReturn', 'Free Shipping and Returns', '<p><strong>Free shipping&nbsp; &amp; Returns</strong></p>\n<p></p>\n<p>\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"<br>\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>', 1591716283, 1649828799, '2020-03-23 15:33:04', '2022-04-13 05:46:39'),
(7, 'loyalityProgram', 'Loyality Program', '<p><b>Loyality Program</b></p>\n<p></p>\n<p>On spending 1$ you will get 1 point and on 10000 points you will get 50$ which you can use while shopping&nbsp;</p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">A&nbsp;<b>loyalty program</b>&nbsp;is a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Marketing_strategy\" title=\"Marketing strategy\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">marketing strategy</a>&nbsp;designed to encourage&nbsp;<a href=\"https://en.wikipedia.org/wiki/Customer\" title=\"Customer\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">customers</a>&nbsp;to continue to shop at or use the services of a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Business\" title=\"Business\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">business</a>&nbsp;associated with the program.<sup id=\"cite_ref-1\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-1\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[1]</a></sup>&nbsp;Today, such programs cover most types of commerce, each having varying features and rewards schemes, including in banking, entertainment, hospitality,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Retailing\" class=\"mw-redirect\" title=\"Retailing\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">retailing</a>&nbsp;and travel.</p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">A loyalty program typically involves the operator of a particular program set up an account for a customer of a business associated with the scheme, and then issue to the customer a&nbsp;<b>loyalty card</b>&nbsp;(variously called&nbsp;<a href=\"https://en.wikipedia.org/wiki/Cashback_reward_program\" title=\"Cashback reward program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">rewards card</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Cashback_reward_program\" title=\"Cashback reward program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">points card</a>, advantage card, club card, or some other name) which may be a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Plastic_card\" title=\"Plastic card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">plastic</a>&nbsp;or paper card, visually similar to a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Credit_card\" title=\"Credit card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">credit card</a>, that identifies the cardholder as a participant in the program. Cards may have a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Barcode\" title=\"Barcode\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">barcode</a>&nbsp;or&nbsp;<a href=\"https://en.wikipedia.org/wiki/Magstripe\" class=\"mw-redirect\" title=\"Magstripe\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">magstripe</a>&nbsp;to more easily allow for scanning, although some are&nbsp;<a href=\"https://en.wikipedia.org/wiki/Chip_card\" class=\"mw-redirect\" title=\"Chip card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">chip cards</a>&nbsp;or&nbsp;<a href=\"https://en.wikipedia.org/wiki/Proximity_card\" title=\"Proximity card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">proximity cards</a>.</p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">By presenting a card, customers typically receive either a discount on the current purchase or an allotment of points that they can use for future purchases. Hence, the card is the visible means of implementing a type of what economists call a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Two-part_tariff\" title=\"Two-part tariff\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">two-part tariff</a>. Application forms for cards usually entail agreements by the store concerning customer privacy, typically non-disclosure (by the store) of non-aggregate data about customers. The store uses aggregate data internally (and sometimes externally) as part of its&nbsp;<a href=\"https://en.wikipedia.org/wiki/Marketing_research\" title=\"Marketing research\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">marketing research</a>. Over time the data can reveal, for example, a given customer\'s favorite brand of beer, or whether they are a vegetarian. Where a customer has provided sufficient identifying information, the loyalty card may also be used to access such information to expedite verification during receipt of cheques or dispensing&nbsp;<a href=\"https://en.wikipedia.org/wiki/Medical_prescription\" title=\"Medical prescription\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">medical prescription</a>&nbsp;preparations, or for other membership privileges such as access to an&nbsp;<a href=\"https://en.wikipedia.org/wiki/Airport_lounge\" title=\"Airport lounge\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">airport lounge</a>&nbsp;using a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Frequent-flyer_program\" title=\"Frequent-flyer program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">frequent-flyer</a>&nbsp;card. In recent years, businesses now offer these loyalty cards in the form of a loyalty app, which means users are less likely to lose their cards. Almost all major casino chains also have loyalty cards, which offer members tier credits, reward credits,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Comps_(casino)\" title=\"Comps (casino)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">comps</a>, and other perks based on card members\' \"<a href=\"https://en.wikipedia.org/wiki/Comps_(casino)#Calculation\" title=\"Comps (casino)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">theo</a>\" from gambling, various demographic data, and spend patterns on various purchases at the casino, within the casino network, and with the casino\'s partners.<sup id=\"cite_ref-2\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-2\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[2]</a></sup><sup id=\"cite_ref-3\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-3\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[3]</a></sup>&nbsp;Examples of such programs include&nbsp;<a href=\"https://en.wikipedia.org/wiki/Caesars_Entertainment_(2020)\" class=\"mw-redirect\" title=\"Caesars Entertainment (2020)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Caesars</a>&nbsp;Rewards<sup id=\"cite_ref-4\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-4\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[4]</a></sup>&nbsp;(formerly called Total Rewards<sup id=\"cite_ref-5\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-5\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[5]</a></sup>) and&nbsp;<a href=\"https://en.wikipedia.org/wiki/MGM_Resorts_International\" title=\"MGM Resorts International\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">MGM Resorts International</a>\'s Mlife.<sup id=\"cite_ref-6\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-6\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[6]</a></sup></p><p>&nbsp;&nbsp;</p>', 1591716283, 1649845284, '2020-03-23 15:33:04', '2022-04-13 10:21:23'),
(8, 'copyrightPolicy', 'Copyright Policy', '<p><b>Copyright Policy</b></p><p><b><br></b>On spending 1$ you will get 1 point and on 10000 points you will get 50$ which you can use while shopping&nbsp;<br></p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">A&nbsp;<b>loyalty program</b>&nbsp;is a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Marketing_strategy\" title=\"Marketing strategy\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">marketing strategy</a>&nbsp;designed to encourage&nbsp;<a href=\"https://en.wikipedia.org/wiki/Customer\" title=\"Customer\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">customers</a>&nbsp;to continue to shop at or use the services of a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Business\" title=\"Business\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">business</a>&nbsp;associated with the program.<sup id=\"cite_ref-1\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-1\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[1]</a></sup>&nbsp;Today, such programs cover most types of commerce, each having varying features and rewards schemes, including in banking, entertainment, hospitality,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Retailing\" class=\"mw-redirect\" title=\"Retailing\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">retailing</a>&nbsp;and travel.</p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">A loyalty program typically involves the operator of a particular program set up an account for a customer of a business associated with the scheme, and then issue to the customer a&nbsp;<b>loyalty card</b>&nbsp;(variously called&nbsp;<a href=\"https://en.wikipedia.org/wiki/Cashback_reward_program\" title=\"Cashback reward program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">rewards card</a>,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Cashback_reward_program\" title=\"Cashback reward program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">points card</a>, advantage card, club card, or some other name) which may be a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Plastic_card\" title=\"Plastic card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">plastic</a>&nbsp;or paper card, visually similar to a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Credit_card\" title=\"Credit card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">credit card</a>, that identifies the cardholder as a participant in the program. Cards may have a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Barcode\" title=\"Barcode\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">barcode</a>&nbsp;or&nbsp;<a href=\"https://en.wikipedia.org/wiki/Magstripe\" class=\"mw-redirect\" title=\"Magstripe\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">magstripe</a>&nbsp;to more easily allow for scanning, although some are&nbsp;<a href=\"https://en.wikipedia.org/wiki/Chip_card\" class=\"mw-redirect\" title=\"Chip card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">chip cards</a>&nbsp;or&nbsp;<a href=\"https://en.wikipedia.org/wiki/Proximity_card\" title=\"Proximity card\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">proximity cards</a>.</p><p style=\"margin: 0.5em 0px; color: rgb(32, 33, 34); font-family: sans-serif;\">By presenting a card, customers typically receive either a discount on the current purchase or an allotment of points that they can use for future purchases. Hence, the card is the visible means of implementing a type of what economists call a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Two-part_tariff\" title=\"Two-part tariff\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">two-part tariff</a>. Application forms for cards usually entail agreements by the store concerning customer privacy, typically non-disclosure (by the store) of non-aggregate data about customers. The store uses aggregate data internally (and sometimes externally) as part of its&nbsp;<a href=\"https://en.wikipedia.org/wiki/Marketing_research\" title=\"Marketing research\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">marketing research</a>. Over time the data can reveal, for example, a given customer\'s favorite brand of beer, or whether they are a vegetarian. Where a customer has provided sufficient identifying information, the loyalty card may also be used to access such information to expedite verification during receipt of cheques or dispensing&nbsp;<a href=\"https://en.wikipedia.org/wiki/Medical_prescription\" title=\"Medical prescription\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">medical prescription</a>&nbsp;preparations, or for other membership privileges such as access to an&nbsp;<a href=\"https://en.wikipedia.org/wiki/Airport_lounge\" title=\"Airport lounge\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">airport lounge</a>&nbsp;using a&nbsp;<a href=\"https://en.wikipedia.org/wiki/Frequent-flyer_program\" title=\"Frequent-flyer program\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">frequent-flyer</a>&nbsp;card. In recent years, businesses now offer these loyalty cards in the form of a loyalty app, which means users are less likely to lose their cards. Almost all major casino chains also have loyalty cards, which offer members tier credits, reward credits,&nbsp;<a href=\"https://en.wikipedia.org/wiki/Comps_(casino)\" title=\"Comps (casino)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">comps</a>, and other perks based on card members\' \"<a href=\"https://en.wikipedia.org/wiki/Comps_(casino)#Calculation\" title=\"Comps (casino)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">theo</a>\" from gambling, various demographic data, and spend patterns on various purchases at the casino, within the casino network, and with the casino\'s partners.<sup id=\"cite_ref-2\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-2\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[2]</a></sup><sup id=\"cite_ref-3\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-3\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[3]</a></sup>&nbsp;Examples of such programs include&nbsp;<a href=\"https://en.wikipedia.org/wiki/Caesars_Entertainment_(2020)\" class=\"mw-redirect\" title=\"Caesars Entertainment (2020)\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">Caesars</a>&nbsp;Rewards<sup id=\"cite_ref-4\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-4\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[4]</a></sup>&nbsp;(formerly called Total Rewards<sup id=\"cite_ref-5\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-5\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[5]</a></sup>) and&nbsp;<a href=\"https://en.wikipedia.org/wiki/MGM_Resorts_International\" title=\"MGM Resorts International\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">MGM Resorts International</a>\'s Mlife.<sup id=\"cite_ref-6\" class=\"reference\" style=\"line-height: 1; unicode-bidi: isolate; white-space: nowrap; font-size: 11.2px;\"><a href=\"https://en.wikipedia.org/wiki/Loyalty_program#cite_note-6\" style=\"color: rgb(6, 69, 173); background-image: none; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial;\">[6]</a></sup></p><p>&nbsp;&nbsp;</p>', 1591716283, 1658395954, '2020-03-23 15:33:04', '2022-07-21 09:32:33');

-- --------------------------------------------------------

--
-- Table structure for table `payment`
--

CREATE TABLE `payment` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `sellerId` int(11) NOT NULL,
  `bookingId` int(11) NOT NULL,
  `transactionId` int(11) NOT NULL,
  `sellerName` varchar(255) NOT NULL,
  `userName` varchar(255) NOT NULL,
  `amount` float NOT NULL,
  `status` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` int(11) NOT NULL,
  `updatedAt` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `payment`
--

INSERT INTO `payment` (`id`, `userId`, `sellerId`, `bookingId`, `transactionId`, `sellerName`, `userName`, `amount`, `status`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 1, 1, 5, 'asdasd', 'sadqwdas', 20.25, 0, 0, 0, 0, 0);

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `id` int(11) NOT NULL,
  `isApproved` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=>no 1=>yes',
  `is_featured` int(11) NOT NULL COMMENT '0=no  1=yes',
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>adctive',
  `isAvailable` tinyint(4) NOT NULL DEFAULT '1' COMMENT '1=>availabe ,0=>not_available',
  `taxCategoryId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `vendorEmployeeId` int(11) NOT NULL DEFAULT '0',
  `categoryId` int(11) NOT NULL,
  `subCategoryId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryOfOrigin` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gtinNumber` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  `isBarcodeItem` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `barcode` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `barcodeImage` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sku` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `skuImage` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `brandName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `minimumSellingPrice` decimal(9,2) NOT NULL,
  `quantity` int(11) NOT NULL,
  `reviews` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shippingInformation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mrp` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `retailPrice` int(11) NOT NULL,
  `return_price` float NOT NULL,
  `shipping_price` float NOT NULL,
  `percentageDiscount` smallint(6) NOT NULL,
  `length` decimal(7,2) NOT NULL,
  `addedBy` int(4) NOT NULL COMMENT '0=>seller,1=>ByAdmin',
  `color` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `width` decimal(7,2) NOT NULL,
  `height` decimal(7,2) NOT NULL,
  `dimensionsUnit` tinyint(4) NOT NULL COMMENT '0=>Centimeters, 1=>Inches, 2=>Meters',
  `weight` decimal(7,2) NOT NULL,
  `weightUnit` tinyint(4) NOT NULL COMMENT '0=>kg, 1=>pounds',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`id`, `isApproved`, `is_featured`, `status`, `isAvailable`, `taxCategoryId`, `vendorId`, `vendorEmployeeId`, `categoryId`, `subCategoryId`, `name`, `description`, `countryOfOrigin`, `gtinNumber`, `image`, `isBarcodeItem`, `barcode`, `barcodeImage`, `sku`, `skuImage`, `brandName`, `minimumSellingPrice`, `quantity`, `reviews`, `shippingInformation`, `mrp`, `retailPrice`, `return_price`, `shipping_price`, `percentageDiscount`, `length`, `addedBy`, `color`, `width`, `height`, `dimensionsUnit`, `weight`, `weightUnit`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(666, 1, 0, 1, 1, 0, 1, 0, 81, 0, 'gold', 'gold chainsContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '', '', '', 0, '', '', '', '', 'gucci', '0.00', 1, '', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '2345', 300, 0, 20, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1649066632, 1649066635, '2022-04-04 10:03:51', '2022-07-20 11:02:35'),
(667, 1, 1, 1, 1, 0, 1, 0, 81, 0, 'silver', 'silver chaninsContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '', '', '', 0, '', '', '', '', 'gucci', '0.00', 1, '', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '222', 400, 0, 20, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1649068753, 1649068756, '2022-04-04 10:39:12', '2022-07-20 11:02:35'),
(668, 1, 1, 1, 1, 0, 1, 0, 81, 0, 'whisky', 'black labelContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '', '', '', 0, '', '', '', '', 'gucci', '0.00', 1, '', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '500', 502, 0, 20, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1649069725, 1649069729, '2022-04-04 10:55:24', '2022-07-20 11:02:35'),
(671, 1, 1, 1, 1, 0, 1, 0, 81, 0, 'belt', 'nice beltContrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '', '', '', 0, '', '', '', '', 'Rebook', '0.00', 1, '', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '500', 500, 0, 60, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1649250503, 1649250507, '2022-04-06 13:08:23', '2022-07-20 11:02:35'),
(672, 1, 0, 1, 1, 0, 1, 0, 81, 0, 'gucci shoes', 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.\n\nThe standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from \"de Finibus Bonorum et Malorum\" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.', '', '', '', 0, '', '', '', '', 'gucci', '0.00', 1, '', 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.', '5000', 500, 0, 20, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1649251107, 1652174004, '2022-04-06 13:18:27', '2022-07-20 11:02:35'),
(673, 1, 0, 1, 1, 0, 1, 0, 97, 0, 'Pant', 'Pants on sale', '', '', '', 0, '', '', '', '', 'Rebook', '0.00', 34, '', 'sfghsfgh', '56236', 1000, 25624, 456, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1655358766, 1655359068, '2022-06-16 05:52:45', '2022-07-20 11:02:35'),
(675, 1, 0, 1, 1, 0, 1, 0, 81, 0, 'pants', 'Pant on sale', '', '', '', 0, '', '', '', '', 'Rebook', '0.00', 12, '', 'asdfsadf', '1122', 1000, 232, 234, 0, '0.00', 1, '', '0.00', '0.00', 0, '0.00', 0, 1655360140, 1655361191, '2022-06-16 06:15:40', '2022-07-20 11:02:35');

-- --------------------------------------------------------

--
-- Table structure for table `productFavourite`
--

CREATE TABLE `productFavourite` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `productSpecification`
--

CREATE TABLE `productSpecification` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `productSpecification`
--

INSERT INTO `productSpecification` (`id`, `productId`, `name`, `value`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(17, 675, 'size', 'xxl', 1655361191, 1655361191, '2022-06-16 06:33:11', '2022-06-16 06:33:54'),
(18, 675, 'size', 'xl', 1655361191, 1655361191, '2022-06-16 06:33:11', '2022-06-16 06:33:49'),
(19, 675, 'size', 'l', 1655361191, 1655361191, '2022-06-16 06:33:11', '2022-06-16 06:33:11'),
(20, 675, 'size', 's', 1655361191, 1655361191, '2022-06-16 06:33:11', '2022-06-16 06:33:11'),
(21, 676, 'dfgsdfg', 's', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(22, 676, '', 'd', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(23, 676, '', 'f', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(24, 676, '', 'g', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(25, 676, '', 's', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(26, 676, '', 'd', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(27, 676, '', 'f', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(28, 676, '', 'g', 1656507391, 1656507391, '2022-06-29 12:56:31', '2022-06-29 12:56:31'),
(33, 678, 'hfg', 'f', 1656656396, 1656656396, '2022-07-01 06:19:55', '2022-07-01 06:19:55'),
(34, 678, 'dfgh', 'g', 1656656396, 1656656396, '2022-07-01 06:19:55', '2022-07-01 06:19:55'),
(35, 678, 'dfgh', 'h', 1656656396, 1656656396, '2022-07-01 06:19:55', '2022-07-01 06:19:55');

-- --------------------------------------------------------

--
-- Table structure for table `productTag`
--

CREATE TABLE `productTag` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `tag` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `product_colors`
--

CREATE TABLE `product_colors` (
  `id` int(11) NOT NULL,
  `color_code` varchar(255) NOT NULL,
  `productId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `productId` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `toUserId` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL,
  `review` text NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `reviews`
--

INSERT INTO `reviews` (`id`, `userId`, `toUserId`, `product_id`, `rating`, `review`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(29, 3, 0, 670, 4, 'nice daroo', 1655893553, 1655893553, '2022-06-22 10:25:53', '2022-06-22 10:25:53'),
(30, 3, 0, 670, 3, 'jhfuyjjhfhtiy', 1655893878, 1655893878, '2022-06-22 10:31:17', '2022-06-22 10:31:17'),
(31, 3, 0, 670, 5, 'fghdfghfh', 1655894242, 1655894242, '2022-06-22 10:37:22', '2022-06-22 10:37:22'),
(32, 3, 0, 670, 5, 'dfghdfgh', 1655894258, 1655894258, '2022-06-22 10:37:38', '2022-06-22 10:37:38'),
(33, 3, 0, 670, 1, 'ghjfghghj', 1655894481, 1655894481, '2022-06-22 10:41:20', '2022-06-22 10:41:20'),
(34, 3, 0, 675, 4, ' nice product', 1656076380, 1656076380, '2022-06-24 13:12:59', '2022-06-24 13:12:59'),
(35, 3, 0, 675, 3, ' fghjfghjfghj', 1656076467, 1656076467, '2022-06-24 13:14:26', '2022-06-24 13:14:26'),
(36, 3, 0, 675, 4, ' hrththrty', 1656076496, 1656076496, '2022-06-24 13:14:55', '2022-06-24 13:14:55');

-- --------------------------------------------------------

--
-- Table structure for table `save_to_later`
--

CREATE TABLE `save_to_later` (
  `id` int(11) NOT NULL,
  `orderNo` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `product_id` int(11) NOT NULL,
  `orderStatus` tinyint(4) NOT NULL COMMENT '0: ''Pending'',     1: ''Accepted'',     2: ''Packed'',     3: ''Shipped'',     4: ''Delivered'',     5: ''Cancelled'',     6: ''Declined'',',
  `isSelfpickup` int(11) NOT NULL COMMENT '1=>selfpicked 0=>none',
  `customerId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `employeeId` int(11) NOT NULL DEFAULT '0',
  `qty` mediumint(9) NOT NULL,
  `netAmount` decimal(9,2) NOT NULL,
  `taxCharged` decimal(9,2) NOT NULL,
  `shippingCharges` decimal(9,2) NOT NULL,
  `billing_address_id` int(11) NOT NULL,
  `shiping_address_id` int(11) NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressLine2` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `card_id` int(11) NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zipCode` int(11) NOT NULL,
  `adminCommission` decimal(9,2) NOT NULL,
  `subTotal` float NOT NULL,
  `discount` int(11) NOT NULL,
  `shipping` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tax` int(11) NOT NULL,
  `total` decimal(9,2) NOT NULL,
  `paymentMethod` tinyint(4) NOT NULL COMMENT '0=>Wallet 1=>Card 2=>cash',
  `deliveryDate` date NOT NULL,
  `deliverySlot` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_withdrawn_by_vendor` int(1) NOT NULL DEFAULT '0' COMMENT '0-withdrawal pending, 1-requested, 2-completed, 3 - rejected',
  `orderJson` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `comment` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `setting`
--

INSERT INTO `setting` (`id`, `name`, `value`, `comment`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 'maximum_site_commission', '1', 'USD', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-06-26 06:54:31'),
(2, 'global_delivery_charge_for_seller', '2', 'USD', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-09-21 11:29:44'),
(3, 'global_delivery_charge_for_delivery_staff', '3', 'USD', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-06-26 06:54:31'),
(4, 'enable_disable_referral_system', '1', '0=>disabled 1=>enabled', 1592274435, 1592274435, '2020-06-16 02:27:15', '2021-06-29 09:41:54'),
(5, 'referral_reward_points_for_drivers', '1..g', 'number', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-09-21 11:22:08'),
(6, 'referral_signup_bonus_for_drivers', '2', 'number', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-06-26 07:03:35'),
(7, 'enable_disable_promo_code', '1', '0=>disabled 1=>enabled', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-09-21 11:22:00'),
(8, 'promo_code', 'XJKSDS923S', 'promo code text', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-06-16 02:36:37'),
(9, 'apply_on_category', '1', '0=>no 1=>yes', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-09-21 11:22:29'),
(11, 'promo_code_discount_value', '200grdhbtrhth', 'in %', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-09-21 11:22:33'),
(12, 'duration_of_promo_code', '201', '', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-06-23 11:19:33'),
(13, 'notification_email', 'test@gmail.com', 'email for notification and updates', 1592274435, 1592274435, '2020-06-16 02:27:15', '2021-12-09 12:30:40'),
(14, 'tax_category', 'GST', '', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-08-26 08:07:51'),
(15, 'tax_percentage', '10', 'in %', 1592274435, 1592274435, '2020-06-16 02:27:15', '2020-08-26 08:07:51'),
(16, 'name', 'Admnin', '', 1640694438, 1640694438, '2021-12-28 12:27:18', '2021-12-29 06:15:40'),
(17, 'email', 'admin@admin.com', '', 1640694438, 1640694438, '2021-12-28 12:27:18', '2021-12-28 12:27:18'),
(18, 'password', '', '', 1640694438, 1640694438, '2021-12-28 12:27:18', '2021-12-28 12:27:18'),
(19, 'id', '1', '', 1640694438, 1640694438, '2021-12-28 12:27:18', '2021-12-28 12:27:18'),
(20, 'role', '0', '', 1640694438, 1640694438, '2021-12-28 12:27:18', '2021-12-28 12:27:18'),
(21, 'image', '3187c780-67e0-11ec-ab05-d90c896f55d7.png', '', 1640697314, 1640697314, '2021-12-28 13:15:14', '2021-12-28 13:15:14'),
(22, 'product_tax', '20', 'in %', 1592274435, 1592274435, '2020-06-16 02:27:15', '2022-04-27 11:17:42');

-- --------------------------------------------------------

--
-- Table structure for table `shopCategory`
--

CREATE TABLE `shopCategory` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>active',
  `vendorId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `shopCategory`
--

INSERT INTO `shopCategory` (`id`, `status`, `vendorId`, `name`, `image`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 'Groceries', '', 1596541378, 1596541378, '2020-08-04 11:42:57', '2020-08-04 11:42:57'),
(2, 1, 0, 'Electronics', '6cdfd83f-a93f-4f82-ae29-c92e7214ed31.png', 1598428812, 1624951562, '2020-08-26 08:00:11', '2021-09-08 07:11:40'),
(9, 1, 0, 'hello', '', 1601009518, 1601009518, '2020-09-25 04:51:58', '2020-09-25 04:51:58'),
(10, 1, 0, 'cql new', '4df3d883-cb0d-4c8e-b985-7dd3e6e5967b.jpg', 1624953917, 1624953948, '2021-06-29 08:05:17', '2021-06-29 08:05:48');

-- --------------------------------------------------------

--
-- Table structure for table `siteComission`
--

CREATE TABLE `siteComission` (
  `id` int(11) NOT NULL,
  `minimum` int(11) NOT NULL,
  `maximum` int(11) NOT NULL,
  `comission` decimal(7,2) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siteComission`
--

INSERT INTO `siteComission` (`id`, `minimum`, `maximum`, `comission`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 0, 3, '6.00', 1639123963, 1639123963, '2021-12-10 08:12:43', '2021-12-10 08:12:43'),
(4, 20, 111, '1.00', 1639123963, 1639123963, '2021-12-10 08:12:43', '2021-12-10 08:12:43');

-- --------------------------------------------------------

--
-- Table structure for table `socket_user`
--

CREATE TABLE `socket_user` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `socketId` varchar(50) NOT NULL,
  `isOnline` int(11) NOT NULL DEFAULT '0' COMMENT '0:offine,1online',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `socket_user`
--

INSERT INTO `socket_user` (`id`, `userId`, `socketId`, `isOnline`, `created`, `updated`) VALUES
(1, 191, '0RxL21Pbt5aoCwe9AAAA', 0, 1615379126, 1617281124),
(2, 190, 'Dr8A5m0mpKvts7UuAAAb', 0, 1615379140, 1615465915),
(3, 169, '2XTq64BJjsLe10eiAAC_', 0, 1615379199, 1623420331),
(4, 156, 'p5f3pxbAc5IpJUAaAAAR', 0, 1615379552, 1616365065),
(5, 192, 'Jik9sfCENAdg1EqLAAAC', 0, 1615383609, 1617281292),
(6, 187, 'SMyXqDsdSu-MeN1XAAAY', 0, 1615465342, 1615465664),
(7, 187, 'SMyXqDsdSu-MeN1XAAAY', 0, 1615465342, 1615465664),
(8, 148, 'hZsRehNpPmek0JyRAABF', 0, 1615470857, 1615501045),
(9, 194, 'ht_igSMrXaLeyi4QAABB', 0, 1615470885, 1615489686),
(10, 195, 'WKq-BNv6c1hWBIdRAABb', 0, 1615747414, 1620861805),
(11, 196, 'FErr6BqLDG1CB3D3AAAH', 0, 1615748065, 1616170322),
(12, 173, 'm8D2Z2-gzcKiyndtAAAa', 0, 1616389159, 1617359578),
(13, 198, 'VCe2egUVaCOCKPOFAAAs', 0, 1617346577, 1620024063),
(14, 199, 'ePjE3IOH2MM4rLntAAAr', 0, 1617348299, 1620023947),
(15, 199, 'ePjE3IOH2MM4rLntAAAr', 0, 1617348299, 1620023947),
(16, 202, 't1y5ITf561HdTHwGAAAv', 0, 1620024070, 1620024292),
(17, 201, 'KHAtY2AB-VpFPKMNAAAy', 0, 1620024325, 1620024804),
(18, 205, 'iN5yocKJ3zuBJaZUAAAz', 0, 1620024853, 1620025208),
(19, 204, 'gFIdOypmQPa1jzqLAAA3', 0, 1620131418, 1620132318),
(20, 207, '-X9ZwZ1w-hQvbO3QAADe', 0, 1620132364, 1623743260),
(21, 217, 'k6xm7YuAgtTxZvq4AACj', 0, 1621924796, 1623397442),
(22, 203, 'LCw6vgjT8Sz0ezFxAAAE', 0, 1622697656, 1622697666),
(23, 221, 'oX0QjYeO3SEInAgrAAB1', 0, 1622713924, 1625485819),
(24, 223, 'TYVlzO3hR5C-4QIXAAB0', 0, 1622801851, 1625485781),
(25, 223, 'TYVlzO3hR5C-4QIXAAB0', 0, 1622801851, 1625485781),
(26, 228, 'UydFSsxi3w0x9SJIAAC8', 0, 1623405848, 1623410666),
(27, 231, 'm48lb4UarNVJrQ5SAAE5', 0, 1623664682, 1625230497),
(28, 231, 'm48lb4UarNVJrQ5SAAE5', 0, 1623664682, 1625230497),
(29, 206, 'f56ZkEasuIXkNA9kAADc', 0, 1623741813, 1623742695),
(30, 208, 'EJAXvBJWH4mRRq9BAADf', 0, 1623743289, 1623756500),
(31, 209, 'EXP1uezGwpzQ8szZAAAB', 0, 1623757200, 1623835275),
(32, 226, 'pDuROR9DJGb9_nsVAAIb', 0, 1623837258, 1625057703),
(33, 213, 'p54Nd0Kab3B2M4p7AAAr', 0, 1623838527, 1624359891),
(34, 215, 'eIatLkB4MUpb4vI-AABT', 0, 1623858677, 1624607804),
(35, 214, 'd56FO_telR7MwTtEAAA0', 0, 1624359928, 1624369907),
(36, 227, 'i8OhczDMYzrGM-5_AAB6', 0, 1624531148, 1624878082),
(37, 227, 'i8OhczDMYzrGM-5_AAB6', 0, 1624531148, 1624878082),
(38, 0, 'dE4-rsbsRPwVt1ePAACu', 1, 1624553923, 1625547758),
(39, 216, 'ScnJE1zmcf5RRfQ8AADl', 0, 1624858937, 1624900109),
(40, 103, '-3UOfpccLkrKMpapAACB', 0, 1624879578, 1624880249),
(41, 224, 'SqhM5tRISTaqv5HRAAEL', 0, 1625054776, 1625221562),
(42, 222, 'F2eL9dHdp3x_BOUMAAAX', 0, 1625054831, 1625472736),
(43, 232, 'nv_xQaXk7BA3LIaeAAMu', 0, 1625056140, 1625059237),
(44, 234, '2pUTdwF9XGGKb3AqAACo', 0, 1625119586, 1625503313),
(45, 233, 'zepb4qnXHnW0YpIuAACF', 0, 1625125320, 1625487858),
(46, 235, 'CXQKTvCJVtcdoBt6AAEe', 0, 1625221052, 1625221562);

-- --------------------------------------------------------

--
-- Table structure for table `subCategory`
--

CREATE TABLE `subCategory` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>active',
  `vendorId` int(11) NOT NULL,
  `categoryId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `subCategory`
--

INSERT INTO `subCategory` (`id`, `status`, `vendorId`, `categoryId`, `name`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(2, 1, 42, 3, 'Samsung', 1594028832, 1594028832, '2020-07-06 09:47:11', '2020-07-06 09:47:11'),
(3, 1, 42, 7, 'Pro', 1594032044, 1594032044, '2020-07-06 10:40:44', '2020-07-06 10:40:44'),
(4, 1, 50, 32, 'NEw Sub Cat', 1594035920, 1594035920, '2020-07-06 11:45:19', '2020-07-06 11:45:19'),
(5, 1, 50, 27, 'dfgdf', 1594036003, 1594036138, '2020-07-06 11:46:43', '2020-07-06 11:48:58'),
(6, 1, 50, 33, 'New Sub CAt', 1594036512, 1594036512, '2020-07-06 11:55:11', '2020-07-06 11:55:11'),
(7, 1, 42, 35, 'Hardware', 1594038704, 1639048834, '2020-07-06 12:31:44', '2021-12-09 11:20:33'),
(8, 1, 0, 1, 'testing user', 1639048938, 1639048938, '2021-12-09 11:22:18', '2021-12-09 11:22:18'),
(9, 1, 0, 12, 'testabcs', 1639120854, 1639120854, '2021-12-10 07:20:53', '2021-12-10 07:20:53'),
(10, 1, 0, 81, 'Shoes', 1639563802, 1639563802, '2021-12-15 10:23:22', '2021-12-15 10:23:22');

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `id` int(11) NOT NULL,
  `status` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1=>month,2=>yearly',
  `item` int(11) NOT NULL,
  `employes` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `subscription`
--

INSERT INTO `subscription` (`id`, `status`, `amount`, `type`, `item`, `employes`, `created_at`, `updated_at`) VALUES
(1, 1, 100, 1, 100, 2, '2021-02-18 11:28:02', '2021-02-18 11:47:06');

-- --------------------------------------------------------

--
-- Table structure for table `taxCategory`
--

CREATE TABLE `taxCategory` (
  `id` int(11) NOT NULL,
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>adctive',
  `vendorId` int(11) NOT NULL,
  `taxCategory` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxInPercent` int(11) NOT NULL COMMENT '0=>no 1=>yes	',
  `taxValue` smallint(6) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `taxCategory`
--

INSERT INTO `taxCategory` (`id`, `status`, `vendorId`, `taxCategory`, `taxInPercent`, `taxValue`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 0, 'GST', 1, 10, 1600687380, 1628774555, '2020-09-21 11:22:59', '2021-08-13 02:40:11'),
(2, 1, 0, 'GST', 1, 11, 1639052032, 1639052062, '2021-12-09 12:13:51', '2021-12-09 12:14:21'),
(3, 1, 0, 'vat', 0, 20, 1639053207, 1639055970, '2021-12-09 12:33:27', '2021-12-09 13:19:30');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `role` tinyint(4) NOT NULL COMMENT '0=>admin\r\n1=>user\r\n2=>driver\r\n3=>vendor\r\n4=>venodorEmployee\r\n5=>vendorManager',
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `stripe_customer_id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `verified` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `status` tinyint(4) NOT NULL COMMENT '0=>inactive 1=>active',
  `username` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `company` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `web_token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `businessNumber` bigint(20) NOT NULL,
  `businessCNumber` bigint(20) NOT NULL,
  `verificationId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `buisnessAddress` varchar(225) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryCode` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `walletAmount` int(11) NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `forgotPasswordHash` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `facebookId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `googleId` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otp` smallint(6) NOT NULL,
  `loyality_points` int(11) NOT NULL,
  `lat` double NOT NULL,
  `long` double NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `role`, `name`, `stripe_customer_id`, `verified`, `status`, `username`, `email`, `password`, `image`, `company`, `web_token`, `businessNumber`, `businessCNumber`, `verificationId`, `buisnessAddress`, `countryCode`, `walletAmount`, `phone`, `forgotPasswordHash`, `facebookId`, `googleId`, `otp`, `loyality_points`, `lat`, `long`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 0, 'Admnin', '', 0, 1, 'admin', 'admin@admin.com', '$2y$10$SVRxf4bi7GXhd3F4sfv26.TfQ15GWA3Nzq.i6n/B2LhT3M57Hzsoi', 'ae5da050-082f-11ed-a654-33a81852f512.jpg', '', '', 0, 0, '', '0', '', 0, '923842341', '', '', '', 0, 0, 0, 0, 1591216950, 1658323640, '2020-06-04 02:12:30', '2022-07-20 13:27:20'),
(3, 1, 'pershant', 'cus_LirajiUIHay9tT', 0, 1, '', 'pershant@yopmail.com', '$2y$10$p.MZzT.bRNgHVAr5.BloluKp.ndB.1NrVBchQ46enSF7Y1nuj3YWu', '55560e20-09bf-11ed-af3f-1f4a7385a093.jpeg', '', 'eeXRhBuPmEZ-4nk7sh2S8Y:APA91bGm4Y3ezEcaCQSsoBHk7Pb7sx7NioQ4l3E6ptVrKjmxM-bN_jFNPB76hESx84xQ4jPjICOy3enN0K-Iva0HKpTJIwaHw6BDYn2BG8VjtVRIiYsFOZG_xHgPEDfSV_W5ejYsK3bl', 0, 0, '', '', '+376', 400, '7888947121', '', '', '', 0, 21819, 0, 0, 1653030153, 1653030153, '2022-05-20 07:02:32', '2022-07-22 13:12:19'),
(12, 3, 'pershant', '', 0, 1, '', 'p@yopmail.com', '$2y$10$i9vmE0M20auJt/haxI.QZO7pYrE957MDKocnIZ8h3CRH4wwp4wTXm', 'a5cb8100-e6fb-11ec-9990-372c9c279238.png', 'cqlsys', '', 1241234, 12341234, '23452345', '8b', '', 0, '', '', '', '', 0, 0, 30.7046486, 76.71787259999999, 1654672903, 1654672903, '2022-06-08 07:21:43', '2022-06-08 07:21:43'),
(13, 3, 'sachin', '', 0, 1, '', 'p@yopmail.com', '$2y$10$i9vmE0M20auJt/haxI.QZO7pYrE957MDKocnIZ8h3CRH4wwp4wTXm', 'a5cb8100-e6fb-11ec-9990-372c9c279238.png', 'cqlsys', '', 1241234, 12341234, '23452345', '8b', '', 0, '', '', '', '', 0, 0, 28.7041, 77.1025, 1654672903, 1654672903, '2022-06-08 07:21:43', '2022-06-09 11:00:30'),
(14, 3, 'chandu', '', 0, 1, '', 'p@yopmail.com', '$2y$10$i9vmE0M20auJt/haxI.QZO7pYrE957MDKocnIZ8h3CRH4wwp4wTXm', 'a5cb8100-e6fb-11ec-9990-372c9c279238.png', 'cqlsys', '', 1241234, 12341234, '23452345', '8b', '', 0, '', '', '', '', 0, 0, 31.1048, 77.1734, 1654672903, 1654672903, '2022-06-08 07:21:43', '2022-06-09 10:59:59'),
(15, 3, 'ankush', '', 0, 1, '', 'p@yopmail.com', '$2y$10$i9vmE0M20auJt/haxI.QZO7pYrE957MDKocnIZ8h3CRH4wwp4wTXm', 'a5cb8100-e6fb-11ec-9990-372c9c279238.png', 'cqlsys', '', 1241234, 12341234, '23452345', '8b', '', 0, '', '', '', '', 0, 0, 30.7333, 76.7794, 1654672903, 1654672903, '2022-06-08 07:21:43', '2022-06-09 10:59:22'),
(16, 3, 'pershant', '', 0, 1, '', 'mandeep@yopmail.com', '$2y$10$KNke.L0Vh1AL3s4SVi.QNOaZ77YlJpm8/c.Ux/gftp9bUV1tQhSvq', 'f08b57f0-edff-11ec-aebd-dfc5b3eb52e9.png', 'store', '', 346563456, 34563456436, '1115025885545', '8b', '', 0, '', '', '', '', 0, 0, 31.9501545, 75.6174525, 1655444405, 1655444405, '2022-06-17 05:40:04', '2022-06-17 05:40:04'),
(17, 1, 'hyundai', 'cus_M0Y7p6biI0ddzW', 0, 1, '', 'persh546ant@yopmail.com', '$2y$10$9lYEns2gRJG1qwl2D0rXaOSDG/LMVbPQ.R5RK0J7BK2.1XPiXTKFu', '', '', '', 0, 0, '', '', '213', 0, '23452345', '', '', '', 0, 0, 0, 0, 1657109272, 1657109272, '2022-07-06 12:07:51', '2022-07-06 12:07:51'),
(18, 1, 'hyundai', 'cus_M5lIA7metlslAJ', 0, 1, '', 'per6shant@yopmail.com', '$2y$10$rabH4fwRcgMLEJHdWLTMFOgW1GaREV2Zw1M1faYK23DuEpPKJpG8y', '', '', '', 0, 0, '', '', '+376', 0, '34554654766756', '', '', '', 0, 0, 0, 0, 1658311499, 1658311499, '2022-07-20 10:04:59', '2022-07-20 10:04:59'),
(19, 1, 'hyundai', 'cus_M5lIGzS2iDE0go', 0, 1, '', 'per6shant@yopmail.com', '$2y$10$JTQ.Wx4uZT6voVomgeFMyupkfowah.ETrBxyjgEzY3/BZATsBZnBm', '', '', 'eeXRhBuPmEZ-4nk7sh2S8Y:APA91bGm4Y3ezEcaCQSsoBHk7Pb7sx7NioQ4l3E6ptVrKjmxM-bN_jFNPB76hESx84xQ4jPjICOy3enN0K-Iva0HKpTJIwaHw6BDYn2BG8VjtVRIiYsFOZG_xHgPEDfSV_W5ejYsK3bl', 0, 0, '', '', '+376', 0, '34554654766756', '', '', '', 0, 0, 0, 0, 1658311500, 1658311500, '2022-07-20 10:05:00', '2022-07-20 10:05:01');

-- --------------------------------------------------------

--
-- Table structure for table `userAddress`
--

CREATE TABLE `userAddress` (
  `id` int(11) NOT NULL,
  `isDefault` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `userId` int(11) NOT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `countryCode` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userAddress`
--

INSERT INTO `userAddress` (`id`, `isDefault`, `userId`, `address`, `latitude`, `longitude`, `name`, `countryCode`, `phone`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(3, 0, 100, 'Chandigarh', '30.23523210', '76.36235100', 'Jameson Dwayne', '91', '8080808080', 1612863835, 1612941919, '2021-02-09 09:43:55', '2021-02-22 11:59:07'),
(5, 1, 101, '#12, street 2, sector 15, Chandigarh,india', '30.23112300', '76.36982340', 'Michel', '91', '8407079784', 1612877285, 1612877285, '2021-02-09 13:28:05', '2021-02-09 13:28:05'),
(11, 1, 122, 'bsbxb', '30.23112300', '76.36982340', 'Vsbd', '91', '1234668558', 1623397119, 1623397119, '2021-06-11 07:38:38', '2021-06-11 07:38:38'),
(13, 1, 132, 'we', '30.23112300', '76.36982340', 'as', '91', '8888888888', 1625145317, 1625145317, '2021-07-01 13:15:17', '2021-07-01 13:15:17'),
(14, 1, 133, 'Mohali', '30.23112300', '76.36982340', 'Bunny', '91', '9879464316', 1625491333, 1625491333, '2021-07-05 13:22:12', '2021-07-05 13:22:12'),
(15, 1, 128, '3 Ruby Crescent, Meridan plains, QLD 4551', '30.23112300', '76.36982340', 'Arun George', '91', '0422202370', 1625978809, 1625978809, '2021-07-11 04:46:49', '2021-07-11 04:46:49'),
(16, 1, 143, 'Phase 5', '30.23112300', '76.36982340', 'Mohali', '91', '9875464612', 1626254651, 1626254651, '2021-07-14 09:24:10', '2021-07-14 09:24:10'),
(17, 1, 112, 'dkxkfk', '30.23112300', '76.36982340', 'Dnffnf', '91', '1234567890', 1626258091, 1626258091, '2021-07-14 10:21:31', '2021-07-14 10:21:31'),
(18, 1, 168, 'Mohali', '30.23112300', '76.36982340', 'Krish', '91', '9849464646', 1628594712, 1628594712, '2021-08-10 11:25:12', '2021-08-10 11:25:12'),
(19, 1, 166, '11 , vali road , mirzpaur', '30.23112300', '76.36982340', 'pardeep', '91', '9910203040', 1628599099, 1628599099, '2021-08-10 12:38:19', '2021-08-10 12:38:19'),
(20, 1, 204, '7 springs drive, meridan plains, qld 4551', '30.23112300', '76.36982340', 'arun', '91', '0422202371', 1633094981, 1635003917, '2021-10-01 13:29:41', '2021-10-23 15:45:17'),
(22, 1, 210, 'Mohali', '30.23112300', '76.36982340', 'Mohit', '61', '9849464942', 1633519703, 1633519703, '2021-10-06 11:28:22', '2021-10-06 11:28:22'),
(24, 1, 129, 'Chandigarh', '30.23112300', '76.36982340', 'Mohit', '61', '9876442114', 1633527038, 1633527038, '2021-10-06 13:30:37', '2021-10-06 13:30:37'),
(25, 1, 216, 'Chandigarh', '30.23112300', '76.36982340', 'Varun', '61', '9879492144', 1633529592, 1633529592, '2021-10-06 14:13:11', '2021-10-06 14:13:11'),
(26, 1, 220, 'vail road', '30.23112300', '76.36982340', 'jack smith', '91', '9944110022', 1634533324, 1634533324, '2021-10-18 05:02:04', '2021-10-18 05:02:04'),
(27, 1, 221, '12 suite', '30.23112300', '76.36982340', 'jack', '91', '8054555658', 1634533680, 1634533680, '2021-10-18 05:08:00', '2021-10-18 05:08:00'),
(28, 1, 222, 'gfjfufhfh', '30.23112300', '76.36982340', 'dggxdg', '91', '7009524497', 1634728478, 1634728478, '2021-10-20 11:14:38', '2021-10-20 11:14:38');

-- --------------------------------------------------------

--
-- Table structure for table `userDeliveryAddress`
--

CREATE TABLE `userDeliveryAddress` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `completeAddress` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `zip_code` int(11) NOT NULL,
  `address_line_1` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address_line_2` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `is_primary` int(11) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1=billing 2=shipping',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userDeliveryAddress`
--

INSERT INTO `userDeliveryAddress` (`id`, `userId`, `name`, `last_name`, `completeAddress`, `city`, `state`, `country`, `zip_code`, `address_line_1`, `address_line_2`, `latitude`, `longitude`, `is_primary`, `type`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(15, 422, 'pershant', 'randan', '', 'mukerian', 'punjab', 'india', 144306, 'vill. Gurdaspur', 'po.Jandwal', '0.00000000', '0.00000000', 0, 2, 0, 1648538328, '2022-03-29 07:18:47', '2022-03-29 10:33:54'),
(16, 422, 'rahul ', 'walia', '', 'mohali', 'punjab', 'india', 144301, 'shahimajra', 'phase 3', '0.00000000', '0.00000000', 0, 2, 0, 1648554403, '2022-03-29 11:46:42', '2022-03-29 11:46:42'),
(24, 422, 'dsaf', 'asdf', '', 'asdf', 'sadfa', 'dsfasd', 56234, 'asdf', 'asdf', '0.00000000', '0.00000000', 0, 1, 1651572305, 1651572305, '2022-05-03 10:05:05', '2022-05-03 10:05:05'),
(25, 422, 'dfgh', 'dfgh', '', 'dfgh', 'dfgh', 'dfgh', 6435645, 'dfgh', 'dfgh', '0.00000000', '0.00000000', 0, 1, 1651572344, 1651572344, '2022-05-03 10:05:43', '2022-05-03 10:05:43'),
(26, 2, 'sachiin', 'chaudhary', '', 'jawala ji', 'hp', 'india', 144301, 'vill khola', 'po jawala ji', '0.00000000', '0.00000000', 0, 1, 1653025476, 1653025476, '2022-05-20 05:44:35', '2022-05-20 05:44:35'),
(27, 2, 'bsdfg', 'sdfgsd', '', 'jawala ji', 'sdfgsd', 'vcncvnb', 6455, 'vill khola', 'asdf', '0.00000000', '0.00000000', 0, 2, 1653025818, 1653025818, '2022-05-20 05:50:17', '2022-05-20 05:50:17'),
(28, 3, 'Kumar', 'chaudhary', '', 'Rajpura', 'punjab', 'India', 140140, 'Adress 201', 'address 202', '0.00000000', '0.00000000', 0, 2, 1658486081, 1658486081, '2022-07-22 10:34:41', '2022-07-22 10:34:41'),
(29, 3, 'sachiin', 'chaudhary', '', 'jawala ji', 'himachal pradesh', 'india', 45467, 'vill khola', 'po jawala ji', '0.00000000', '0.00000000', 0, 1, 1658495496, 1658495496, '2022-07-22 13:11:35', '2022-07-22 13:11:35');

-- --------------------------------------------------------

--
-- Table structure for table `userDetail`
--

CREATE TABLE `userDetail` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userDetail`
--

INSERT INTO `userDetail` (`id`, `userId`, `name`, `phone`, `address`, `image`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 1, 'USER 121', '7832410312', '', '69d0c5f8-ff47-413d-89a6-b8c8293c626b.png', 1612182365, 1612182365, '2021-02-01 12:26:05', '2021-12-14 13:18:23'),
(3, 3, 'pershant', '7888947121', '', '', 1653030153, 1653030153, '2022-05-20 07:02:32', '2022-05-20 07:02:32'),
(4, 17, 'hyundai', '23452345', '', '', 1657109272, 1657109272, '2022-07-06 12:07:51', '2022-07-06 12:07:51'),
(5, 18, 'hyundai', '34554654766756', '', '', 1658311499, 1658311499, '2022-07-20 10:04:59', '2022-07-20 10:04:59'),
(6, 19, 'hyundai', '34554654766756', '', '', 1658311500, 1658311500, '2022-07-20 10:05:00', '2022-07-20 10:05:00');

-- --------------------------------------------------------

--
-- Table structure for table `userSubscriptions`
--

CREATE TABLE `userSubscriptions` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `subscriptionId` int(11) NOT NULL,
  `amount` varchar(255) NOT NULL,
  `type` int(11) NOT NULL COMMENT '1=>month,2=>yearly	',
  `item` int(11) NOT NULL,
  `employes` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `upadted_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `userSubscriptions`
--

INSERT INTO `userSubscriptions` (`id`, `userId`, `subscriptionId`, `amount`, `type`, `item`, `employes`, `created_at`, `upadted_at`) VALUES
(1, 100, 1, '100', 1, 100, 2, '2021-02-23 10:06:12', '2021-02-23 10:07:59');

-- --------------------------------------------------------

--
-- Table structure for table `userToken`
--

CREATE TABLE `userToken` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `iat` int(11) NOT NULL COMMENT 'token issued at timestamp',
  `deviceToken` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deviceType` tinyint(4) NOT NULL COMMENT '0=>android 1=>ios',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `userToken`
--

INSERT INTO `userToken` (`id`, `userId`, `token`, `iat`, `deviceToken`, `deviceType`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 75, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3NSwiZW1haWwiOiJqb2huMTIzQHlvcG1haWwuY29tIn0sImlhdCI6MTYwOTgyMjgzMH0.tIgc2iYBZ-M9r4uw4wZ3pklLY61s5vlEvI5n99v86JI', 1609822830, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1609822830, 1609822830, '2021-01-05 05:00:29', '2021-01-05 05:00:29'),
(4, 77, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo3NywiZW1haWwiOiJqb2hubnlAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjA5OTk3OTg2fQ.0ckfCtE_j8GjI_EVWHV5a28xlrV-PJ-Czc65KJIKF5k', 1609997986, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1609997986, 1609997986, '2021-01-07 05:39:46', '2021-01-07 05:39:46'),
(9, 80, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4MCwiZW1haWwiOiJqb2huNEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTA0NDEyNjF9.5q4rNwJUuNMy8ZUZmot0EOi8Trk4YQrQquk15np_e5M', 1610441261, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1610441261, 1610441261, '2021-01-12 08:47:41', '2021-01-12 08:47:41'),
(10, 81, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4MSwiZW1haWwiOiJhbmRyb2lkMkB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTA0NDE4NDV9.e0ZVxlMPTLaFeSs_xYWLZDBiurx_gy5li7G21JElz-Q', 1610441845, '13131a32d123sa1', 0, 1610441845, 1610441845, '2021-01-12 08:57:25', '2021-01-12 08:57:25'),
(11, 82, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4MiwiZW1haWwiOiJhbmRyb2lkM0B5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTA0NDIzMTd9.e7OTHwz-WgGVC2n6wQtuTNSdqJZ8Svu674pxgMzTIHA', 1610442317, '13131a32d123sa1', 0, 1610442317, 1610442317, '2021-01-12 09:05:17', '2021-01-12 09:05:17'),
(45, 83, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4MywiZW1haWwiOiJhbmRyb2lkNEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTA2OTEwMTV9.Szz4V-u_6HBFUn2HzR8xyNAMl9e6bHhvwsdUWC4ystE', 1610691015, 'eLWkC9RGTjehRYb3r4Gs5b:APA91bFe5I1jzNz0dK47nl68gc6mHnqBtR34bWp2hOkgzHcYEAJO97bN9w9tUaU8lzCAxur5nTboh6m-JlsbxpDdNO-jKS3N1kalsTqZjXfEZ-Wj59msFlVHAY7lziyn5LWMuanGnCTc', 0, 1610691015, 1610691015, '2021-01-15 06:10:15', '2021-01-15 06:10:15'),
(61, 85, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4NSwiZW1haWwiOiJ2ZW5kb3IyQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMTA1MTA2OH0.-J9uhMjsApYAy5mcYlfZGUWTJnZ7HARLNd0xOd0tpgg', 1611051068, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611051068, 1611051068, '2021-01-19 10:11:08', '2021-01-19 10:11:08'),
(63, 84, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4NCwiZW1haWwiOiJhbmRyb2lkNUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTEwNTU0OTF9.M-Ve2Bdr8ox2KE0OujfGcij5cAdEGhsGei88N5yLzfc', 1611055491, 'fAFep-j3R-Gf9Uu5c3VNYS:APA91bERshRLmThJ9JsujMMKVVpP0UZ6EBMRaKYtXbDbqw5x4S1gtmEIViaRl41QA5Yt0By0GciE-jAhehw3eeyH0Ou8YyJEicDn4XhNkSSobHdJcyEb87kMCRqMfrWixYV8tX_ERJ-A', 0, 1611055491, 1611055491, '2021-01-19 11:24:51', '2021-01-19 11:24:51'),
(72, 87, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo4NywiZW1haWwiOiJ2ZW5kb3I1QHlvcG1haWwuY29tIn0sImlhdCI6MTYxMTMxMjEzMX0.HtSMrN7L3yOLiWnn7i-VAPd2rnVb_JgtBmZ-1PJGw98', 1611312131, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611312131, 1611312131, '2021-01-22 10:42:10', '2021-01-22 10:42:10'),
(73, 90, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5MCwiZW1haWwiOiJ2ZW5kb3IzMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTEzMTQ2MDF9.b7hJFhiX72thC2yLacgRmv9s6L-eR8DVyJZ-Dn3jAGM', 1611314601, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611314601, 1611314601, '2021-01-22 11:23:20', '2021-01-22 11:23:20'),
(74, 91, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5MSwiZW1haWwiOiJ2ZW5kb3I4QHlvcG1haWwuY29tIn0sImlhdCI6MTYxMTMxNTQxNH0.RDAv2T1r-OWY0rFeydMTHaNY4l3rZQHQqeKQTmIPV2s', 1611315414, 'cBW_JMSdRbmkg0j6Qg3smm:APA91bHGbI7Rt1DOv1tEzgSAgzsukZRWqaE4OEt_bYqRyJfwLO43rFN-2mWoy1s-bOQEgH1nAa66gAIyzoK8ZPYEtqu5cKf2zeivshiBu2UeyF8tyrA0jXBdHCs5Tzkc_4Cadew1bv-F', 0, 1611315414, 1611315414, '2021-01-22 11:36:53', '2021-01-22 11:36:53'),
(77, 92, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5MiwiZW1haWwiOiJ2ZW5kb3IxMEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTE1NzcwMzB9.PhKJ8r9v-5YJ44Xt1PPSiKKjOumaEQ6Ix1SsddfiJTg', 1611577030, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611577030, 1611577030, '2021-01-25 12:17:09', '2021-01-25 12:17:09'),
(78, 93, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5MywiZW1haWwiOiJ2ZW5kb3IxMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTE1NzcyNzl9.7h49WgqmdgM-Dd9rTv0xVVpr_S6hECyBIPpdpxmtK8Y', 1611577279, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611577279, 1611577279, '2021-01-25 12:21:18', '2021-01-25 12:21:18'),
(136, 103, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDMsImVtYWlsIjoidmVuZG9yMTJAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjExOTQ1MTA3fQ.WEtgwP_QlEzWg1mq2RuZKOaP-w5eH_P4OAQ5WZE68dw', 1611945107, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(142, 106, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDYsImVtYWlsIjoidXNlcjEyM0B5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTIxODIzNjV9.Hf0ZLjyqO_dPA-u_MADNJq-Lw-lDNPrzPzYVkkxQZ_s', 1612182365, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1612182365, 1612182365, '2021-02-01 12:26:05', '2021-02-01 12:26:05'),
(143, 107, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDcsImVtYWlsIjoidmVuZG9yMTIzQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjE4MjQzNn0.MiaCOXMQGFtFhZ-jvavIq2f2p3Fu4n25YqT08Vr0zfw', 1612182436, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(147, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjMzNTgyMH0.Lo66fFtLRwgFLiKLtFLuEfjn_F0SBU_LdMy16fYBLQs', 1612335820, 'eRgzZq9cTxO_gbdSUt7IEn:APA91bE0c4vA-JsEaG9j6n1NdH84xnIUjn-FGxXeCrKFJQrDf2-YLVABfEoLsQVc_Qz071SwY_E8kunOW-owQVQn6iSuLPhldIteXD8Vf_htrzAro2XlsomNzqPBfNMxl4IM1rLSDJWb', 0, 1612335821, 1612335821, '2021-02-03 07:03:40', '2021-02-03 07:03:40'),
(176, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjg2NTM2MH0.GBztlB45wP_73j-24gXuzy4dCkgBHnt5-R3JBwtsWrs', 1612865360, 'f6ELKWljRYWCl0HfzCaceL:APA91bFq77k_twBL4fJ7EErhQO9pEtJbA1wPr2P7IIxC4c2qYjvqjp6jq712XFhjq3rsk3U-PntWUHItqc9sJsbxUQccY9ew0Hip-CSgejTslgB0Qmn6olzCJmljLaM0k2EF_54l-XTv', 0, 1612865361, 1612865361, '2021-02-09 10:09:20', '2021-02-09 10:09:20'),
(178, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjg3NjM0Mn0.rNSWDP9yQ82yVSU-jcv_mk11iG_r-3pIAcol8DX1iTc', 1612876342, 'fC6lX4uvSIyxIzK1zK2Vb0:APA91bEHS6ZNGxEoLRbQgmITIVCWi8CTBaN_kTqdPVqqJLaYZhkQx-CbOw9QNKy8lmYtGSbNKH0Hh3-FlCCvXcpBJm9lb7cdNOnqkBsA3-hMXIbIguBFy5EV8r6NekYo0RVl8ylFwGOe', 0, 1612876342, 1612876342, '2021-02-09 13:12:22', '2021-02-09 13:12:22'),
(179, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjg3NzA5OH0.4IXNK4N_VEYc7IpKf7_zWe06kZgC_w_2czWZxqRSxg8', 1612877098, 'dpEQdxjhRw-2prbbBdrXbI:APA91bHmFFVBkR8nCMPu3I8DUMqR6oVeJNMxkelLqU2BHJcBEIcP7ax1jZDB7evWthkNrHmLWf7Jju8sUtH4-Ml4_i1WeHnqD53o5OGadWWVj4SApThQRX5G7SyEb7WFWE2SiC_y_RK_', 0, 1612877099, 1612877099, '2021-02-09 13:24:58', '2021-02-09 13:24:58'),
(182, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjk0MTAwOH0.ZWQb8bp8r4xL37CQOMpwlpeGT4IY-fjzpgkjSRsKmVM', 1612941008, 'eXUaUL7TTWybI7wn4Bo3nE:APA91bEVY8o4jIRDJBlb96YDWlLlrnFNHH7G21kq7uiLsy0HNaqKKXb8a6TO5VIab3YI2qctNn1hjALxe33OSddqLQrjDo70lJpkcN-H6pduMF6h-ww_sRjuxzdAZeE1uk89thrKbwS4', 0, 1612941009, 1612941009, '2021-02-10 07:10:08', '2021-02-10 07:10:08'),
(183, 101, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDEsImVtYWlsIjoidXNlcjEwQHlvcG1haWwuY29tIn0sImlhdCI6MTYxMjk0MTc0Nn0.3L1zRjcCqZmbK9sWHLq0V2rQmQIF6tnSt-ralrsSvAc', 1612941746, 'cCpXuMeMQJ-YdF1Gyc6v4G:APA91bF2R3_3hLeF7NTCcCNoswB8YubvQh6ebwkz34NnB_ATzYh50VfnbkWy_-pnAAZtoMhgJObq4MW9u9Kf_XWlQM1FwUT_1GJMnbvPqM-IjCTmbp7ti2M6ZbF9zDE46Ogy0UbJFZ2x', 0, 1612941747, 1612941747, '2021-02-10 07:22:26', '2021-02-10 07:22:26'),
(188, 108, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDgsImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzc2NDUzfQ.ZIBsMgF-7xipqs1PwvoeWI5QTnrLSfSj9f2TmTqDfdI', 1613376453, '', 0, 1613376453, 1613376453, '2021-02-15 08:07:32', '2021-02-15 08:07:32'),
(189, 108, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDgsImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzc2NDUzfQ.ZIBsMgF-7xipqs1PwvoeWI5QTnrLSfSj9f2TmTqDfdI', 1613376453, '', 0, 1613376563, 1613376563, '2021-02-15 08:09:23', '2021-02-15 08:09:23'),
(190, 109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzgwMTMwfQ.fJTAe9Xpv2AjxokWKiLvHB9oscOjLUY5DjaIYQuoM94', 1613380130, '', 0, 1613380130, 1613380130, '2021-02-15 09:08:50', '2021-02-15 09:08:50'),
(191, 96, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5NiwiZW1haWwiOiJ2ZW5kb3I4QHlvcG1haWwuY29tIn0sImlhdCI6MTYxMzM5NDA0N30.d_FjMMHJPdN8QaYXGl3FoT6spa6rp5OxSK02QAgIvRw', 1613394047, 'fe9gaX_5T0S3XYl9DtAyoq:APA91bFc1rCQ4i17k1RBigqagN2lJCN49rBMQ9Mxz5gU1E6QCzYMu5jKdpnEGOlp2gKGbad5Xp_4L7ulf_XG7rDeXj2RZQlD6qWjtt6PXB-uoBtDcSaQhVr97Gk_UR4H7LLCqYRzDlcy', 0, 1613394048, 1613394048, '2021-02-15 13:00:47', '2021-02-15 13:00:47'),
(192, 109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzgwMTMwfQ.fJTAe9Xpv2AjxokWKiLvHB9oscOjLUY5DjaIYQuoM94', 1613380130, '', 0, 1613452218, 1613452218, '2021-02-16 05:10:17', '2021-02-16 05:10:17'),
(193, 109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzgwMTMwfQ.fJTAe9Xpv2AjxokWKiLvHB9oscOjLUY5DjaIYQuoM94', 1613380130, '', 0, 1613452232, 1613452232, '2021-02-16 05:10:31', '2021-02-16 05:10:31'),
(194, 109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzgwMTMwfQ.fJTAe9Xpv2AjxokWKiLvHB9oscOjLUY5DjaIYQuoM94', 1613380130, '', 0, 1613452245, 1613452245, '2021-02-16 05:10:45', '2021-02-16 05:10:45'),
(195, 109, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMDksImVtYWlsIjoiYW5hc0BnbWFpbC5jb20ifSwiaWF0IjoxNjEzMzgwMTMwfQ.fJTAe9Xpv2AjxokWKiLvHB9oscOjLUY5DjaIYQuoM94', 1613380130, '', 0, 1613455004, 1613455004, '2021-02-16 05:56:43', '2021-02-16 05:56:43'),
(248, 98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5OCwiZW1haWwiOiJ2ZW5kb3I3QHlvcG1haWwuY29tIn0sImlhdCI6MTYxNDA3Mjc4MH0.9D1P_AJ3vIbxX5kdxy3YUTFsbiFP0zJTdhRzjEH2SXE', 1614072780, 'dpSSemLZQf6-QtHNcvMrjZ:APA91bGnuNOsPB0opUEJjaFc8VZ6WGBanhkpFDRRlCvTedNAop2nZ5_Oqtmzx0AltcZh9vKEzB-Q5ZCFqPEvF-I607DLWA_yVE5ebsRrr9LjK8zu8E4w-Oehv8Rv6GhkBclKf5GonRFC', 0, 1614072780, 1614072780, '2021-02-23 09:33:00', '2021-02-23 09:33:00'),
(258, 98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5OCwiZW1haWwiOiJ2ZW5kb3I3QHlvcG1haWwuY29tIn0sImlhdCI6MTYxNDE1ODEyN30.4yvN5olx0L17KEiCWf4k-CZ1i86_fQ1KtDEJtgXzix0', 1614158127, 'edsyY0TYTxuf0F9EIAWgU9:APA91bHxoDObG8zRbjojXX-n4Dgr-7wzb-WarwB75-uqU-Iq_Q7iMLhzmARDn9-4UwmFZn99KbyxDBI4AygdJVHW0I8b03mwLcA5w_CVi3F554cspvVRfpMRG5RFIZJRCu4d567Y_p7V', 0, 1614158128, 1614158128, '2021-02-24 09:15:27', '2021-02-24 09:15:27'),
(259, 98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5OCwiZW1haWwiOiJ2ZW5kb3I3QHlvcG1haWwuY29tIn0sImlhdCI6MTYxNDE1ODU3Nn0.h3PbNsrMaA9W8SSYm4w0hAXxsGuDxLgbtFcKXf_b96s', 1614158576, 'fQqkhlU4ROKD3b9dpluvu6:APA91bHXEx5HGkCHMgxHZs9lJM9HqPxNkBDsm-2KeNBUAqjCgPhlWWpvp_62XdFCQS1G3MHf7GTKB8hpbPWrSb2uquCcIFXpAu87sX-ZNmkPU7aVnh1oMl5b3NKbpBWWEbu3XG26Ibw1', 0, 1614158576, 1614158576, '2021-02-24 09:22:56', '2021-02-24 09:22:56'),
(335, 115, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMTUsImVtYWlsIjoiZW1wbG95ZWVAZ21haWwuY29tIn0sImlhdCI6MTYxNDk0ODA5OH0.cwzFs-npJ8b7lZ8LnsS3ELLGbMzQkSoKqTmaSxkcE0s', 1614948098, 'dt1Y5Vd1Q-Orz__slAOSLq:APA91bHUx1zto4DkpsScHQOsZfW6G7q9VnDaZNUwiEw8CXIbZaB3GGeUq9lD68ul4CsWImkqEFFFLPmazUES4fIjdQGKNdfA-Yg2PIhkU1IeUxVNcfkMPvbzjx_HDPRvRFYlTSn98geL', 0, 1614948098, 1614948098, '2021-03-05 12:41:38', '2021-03-05 12:41:38'),
(387, 98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5OCwiZW1haWwiOiJ2ZW5kb3I3QHlvcG1haWwuY29tIn0sImlhdCI6MTYxNTI3MjIyMX0.tm4uOUM3cBKH7QGtlRqnrueyUPtBPz30huHqT0NOvyE', 1615272221, 'dNmBam2vRmmvDMwi7sxOdJ:APA91bGcVkVyewqXeTNyp9nRcNK735HEm2ap0t-M4l50REBjP6gAerUFBpWQbdQMPpEnaKnO2Bv-bqGl5X_zGMFNr9yF8sxDW_19_LGWh45BcrcqKhjPCklM7JlfM6R9S3kh3HZfQaAR', 0, 1615272222, 1615272222, '2021-03-09 06:43:41', '2021-03-09 06:43:41'),
(422, 116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMTYsImVtYWlsIjoidmVuZG9yOEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTU1NTQ3NDV9.pPWEcL6_x31l1DJanp2QvOvXeDDsvRHQr5wD9vDZ3Sk', 1615554745, 'dss5m6PEStynJH0t55Wksu:APA91bEyOCX23bSYUpVSm7avYmi8Yx73OFBhoaeXJloTZXEDN1w63INbp5tuYLNvY0Nt_vgTOUYELYTT-7lo2Wm8EfbjpMl4M7d87rInvxrp5rHpQTe7KMqvVrtlZrthdwN7Ol6DWYdR', 0, 1615554746, 1615554746, '2021-03-12 13:12:25', '2021-03-12 13:12:25'),
(426, 98, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo5OCwiZW1haWwiOiJ2ZW5kb3I3QHlvcG1haWwuY29tIn0sImlhdCI6MTYxNjA2NTQzNH0.sdrrK9YveBTxqswLcyM5uPmTwcjc0va07F-65YjK8zw', 1616065434, 'eHunnP5lQM2h2ywi2b_e1e:APA91bHpwKk9P-41yVOhUEy38xwr5cHu8E4utIGiL1VytvxISmKg_pUgay8XwFl8-Io-woT9L_cBXRIsdBE-LG572p_pkCWbIXOc46WHww10bw9yWUE0k3qSqnUgVE9slJksHzCNDFmX', 0, 1616065434, 1616065434, '2021-03-18 11:03:54', '2021-03-18 11:03:54'),
(432, 116, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMTYsImVtYWlsIjoidmVuZG9yOEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MTY0ODQzNjR9.MkuU6cEvioehabBqgy0PQCIl1PdWXUVjpjkhd_uO2WQ', 1616484364, 'fo9cGPOCRP68EoHKR0zqgw:APA91bEkho4dwEn8KR5OioEhm-QSXFxDSeGO9ov-gLifJ9FQFeZq1eNDxbxal3MCD4cNiOuqjjoKPbMemFwfYiIiCGU1o4JpjfJ35LcxJx8KQp09ohGEmF1ROqUNaPSJpMVZ0pCc-fhR', 0, 1616484365, 1616484365, '2021-03-23 07:26:04', '2021-03-23 07:26:04'),
(435, 119, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMTksImVtYWlsIjoidnNlbXBAZ21haWwuY29tIn0sImlhdCI6MTYxNjQ4NTAwM30.9beChktSCoGdfE4PRvvcSbGYSbjkY7pCWQQE2rDLoZA', 1616485003, 'eQG1eZi_SQexeG9fiPQpPG:APA91bGrXacQMiCi-rw0V7kiOHYpgUoEu7NUkMonamzfvDPdY4EcYHW5PL6mFpSUlbrxeV0GMbBJtJtTkzlx75_CcMyfi0uvGB1DcG5f7VIvQawCLl2sge9wmt0xkbnqgLkQZxOXTXJR', 0, 1616485003, 1616485003, '2021-03-23 07:36:43', '2021-03-23 07:36:43'),
(444, 120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjAsImVtYWlsIjoibWFudWJoYXRpYTIyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjAyMDU2MTF9.ILDzfacTMlgyMHUvlCWeKGf0HjYxVKaVloYmM_w21Jk', 1620205611, 'fIfnjZYXShuWt9NBsXr1NQ:APA91bG_3e8diYZPDUoxtY_9vDnFy3_QcF0PwJ6BFG0hyLxnP76g1u6l7EanUc6z039KqUpl_ah02y23Lz-lsYDtzQHDhX8TYqgMiB40ys2GXIZUZDR_UFqaZY3MpQasfaVLRbPZmzvj', 0, 1620205611, 1620205611, '2021-05-05 09:06:51', '2021-05-05 09:06:51'),
(445, 120, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjAsImVtYWlsIjoibWFudWJoYXRpYTIyQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjAyMTM3NzN9.noYB9JIfJtO0AOWjyv1Ez8FgIi4QcfStAsz4s0024sA', 1620213773, 'dgtOItpKTea3YRQNwfJiUH:APA91bFfTP5Yol9hZKnYn1rI3vk2zyNRQ9DmsIdTRAy0Y4JFI1HsfIWtwXTIvoGVn80jeVsbu0U7pESVAtC2CcDuMkYhmgmI-Lfk5dMJ57aDy5cRnt7brZJCzC8FbHIb8VTRo8rO_asx', 0, 1620213774, 1620213774, '2021-05-05 11:22:53', '2021-05-05 11:22:53'),
(458, 121, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjEsImVtYWlsIjoiZW1wbG95ZWUxQG9uZ29zaG9wLmNvbSJ9LCJpYXQiOjE2MjEwNzQzMjJ9.Y-2EdusxNigub8L_KjsedxGroRzfNa8IINEImJbG6Q8', 1621074322, 'fHqOFxBXSRqRBzrjIocREJ:APA91bGNGWruRuWs7tFZou_fnBV2nRQ8bV6oIqBqUzM-5TKPVPSbfg1QXws_PefHC_I62IXv8nqL8jpdZgW1otWX2HKG6ppEAy5Pstw2GHXABFPsapFIktcXoM4Bsj0L4lqauI9VTlLH', 0, 1621074323, 1621074323, '2021-05-15 10:25:22', '2021-05-15 10:25:22'),
(469, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjIxNTg1NjA1fQ.Eb-z44osO9OCOxxs5BA2GFFHH4IJqey7uy7vZjF4IcI', 1621585605, '13131a32d123sa1', 0, 1621585605, 1621585605, '2021-05-21 08:26:44', '2021-05-21 08:26:44'),
(485, 126, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjYsImVtYWlsIjoiYXJ1bmdlbzAwOEB5YWhvby5jb20ifSwiaWF0IjoxNjIyODgxNjM0fQ.ISn_h2wJVUzYCEtOwQ-zGv2YfuttVFeCvbn58cWM7vo', 1622881634, 'fYTOpsrYQgux7KTdyr0wMj:APA91bENV5eLJeMciiwm-CrCrirS1XJhwvscFnqImyTfrdE4GeglRln5HiGHvMHxXuHWFdaj0uKQDpnH6sPcQRQHxy-8W6qhgx1kBriPJA4buvHpVzv5iAMTIUJAaikazlVXSQLhqlcy', 0, 1622881634, 1622881634, '2021-06-05 08:27:14', '2021-06-05 08:27:14'),
(487, 127, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjcsImVtYWlsIjoiYXJ1bmdlbzAwOEB5YWhvby5jb20ifSwiaWF0IjoxNjIyODgyNDExfQ.bdyMxUr7d65XH17hEoIvzmVgsFc4BDsn9ASWu_Mw-m0', 1622882411, 'fYTOpsrYQgux7KTdyr0wMj:APA91bENV5eLJeMciiwm-CrCrirS1XJhwvscFnqImyTfrdE4GeglRln5HiGHvMHxXuHWFdaj0uKQDpnH6sPcQRQHxy-8W6qhgx1kBriPJA4buvHpVzv5iAMTIUJAaikazlVXSQLhqlcy', 0, 1622882411, 1622882411, '2021-06-05 08:40:11', '2021-06-05 08:40:11'),
(510, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI0MzYxNzg4fQ.z91rtoRApfS-VxtwhEEF8EWYUNJWLkpkutIcFIAWj-Y', 1624361788, 'fITDb1rQQEWAYzEtDmbmn-:APA91bFsy_SYxZoBv2kRTX1Qm6rU2mCjz3HNTcFE-Wr3OVBX8tgQeBlbhrpn3HYiZJVMSl2GIez8Hkdm0nSzjEACa5lDqIMCsuTxklXio95I0NypEBkIy4oTETJCGq4nIeiIieMGB2hS', 0, 1624361789, 1624361789, '2021-06-22 11:36:28', '2021-06-22 11:36:28'),
(512, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI0MzY3Mjk3fQ.ZjaFvQKk9nsRUg8HTj3l4KoBCnE5So1-_STVfjA_m_o', 1624367297, 'cmLx1YxcRf-1QspHZPaOw2:APA91bHdzlCtD9nimZQrf0bYpJMzSYsuIMKeyXtquONHBnLY-u4XUXA8EV9GWOofbekHE30HixVEsfMCmnIjlCkTLwUwJnr5mnpf6j3Nfwjsr21vBvXpO1KvE_SvQonjz1cVJZ1Zp9Rg', 0, 1624367298, 1624367298, '2021-06-22 13:08:17', '2021-06-22 13:08:17'),
(524, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI0ODgzNjI1fQ.WUBI_4TASrHxDhfFqRrSiuh3uQ1veIhMVe3nmJagBM8', 1624883625, 'c7OV5nH3Q0--ZPmIHfmO8U:APA91bFw8Ad_FIr6c-fH8SYn1abFysyB8AhsTaLd1tlfsdc7GvfkcYrmr8_zP9M62HCIZxIoR3DgEuDlaF7yoSoJoApGGKCHBt0Y2UErzYI4BiQYxnI4bdsUe_IpKChUR1iKbSzTRR_Q', 0, 1624883626, 1624883626, '2021-06-28 12:33:45', '2021-06-28 12:33:45'),
(526, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI0ODg2NDU4fQ.bmUHRad-nDjT9Up9T2nJV8KU4bz3vLGej3DM2b0uMcI', 1624886458, 'c1aQldlHRCi6W1YaUjFiqu:APA91bHslLe2UNzL3s4hLMo7hwpKHImJ6fSytj3se0kQK7-DPnYoAFqGknh6Szw2LZR1DpyTv2O7PlK2P-q8uHyxFNfrjv5HpkW-PmGPQeW2GJ6B1IrmLW42CFOqY4uT681Yp7JVpBmw', 0, 1624886459, 1624886459, '2021-06-28 13:20:58', '2021-06-28 13:20:58'),
(536, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI0OTY2OTQyfQ.Fx8T6sJc8bVOk8u4UWbgyySA6my5vQIv8OrH3gzWelc', 1624966942, 'eJZ20l2qQkq_adJoe1imRG:APA91bGvY1PwM182GohjuaX8KsUxbwYFO8a8XOsd9tG730-uKaDPf28QuKDQZfPca8HVd5oCV63uy7ndU_B-h8C071_5gEi_CKSCHIoEGRF7RgNKESvyezBCkXHKBemBaRz0Ii-8OJn0', 0, 1624966942, 1624966942, '2021-06-29 11:42:22', '2021-06-29 11:42:22'),
(538, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI0OTY4MjI4fQ.pUOQbZ4jRYYwyoKoCRBpgm2mShZ0Vg61wjDBBoydFKA', 1624968228, 'cVs4Cd2RRe2UExeDg3bHfv:APA91bHGPAwYhRu6ZIHyo74fUhJm-3bO2TCDUYs9S9Wyl67abwWEkXwNlhA33tCHaKfVJZWa95Lpv9gzOsdnDkmNm9JnKh_S7Ifi3WzReJFNMxBDW-hPpzzoZReoyjXThlfJVLkjy5wG', 0, 1624968229, 1624968229, '2021-06-29 12:03:48', '2021-06-29 12:03:48'),
(540, 132, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzIsImVtYWlsIjoid3d3QHlvcG1haWwuY29tIn0sImlhdCI6MTYyNTE0NTExNn0.GGMHal1RJjS_J9JoNTwYDynmFxveIdpX5fj-45vxWwQ', 1625145116, '13131a32d123sa1', 0, 1625145116, 1625145116, '2021-07-01 13:11:55', '2021-07-01 13:11:55'),
(541, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI1MjAzMDA3fQ.f1JBwBdthj6lpCoMyTpx18iAhImOeIebYIxIV2DcN1o', 1625203007, 'fHclV4obRSCw5HYBVBk04X:APA91bFYjhDpgL4C78vE7pAqz6DItdloGsSSk4a7k-_tG0d3HQUHoZG-8WSnLfmPMbSUL6VcT-aNqRqqHtULhS_YlEkZMUr0NmSth2WCZ5LYlvD56DTOtj0FyMEMVu4AV5NxVg-rxe1C', 0, 1625203008, 1625203008, '2021-07-02 05:16:47', '2021-07-02 05:16:47'),
(543, 122, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjIsImVtYWlsIjoidnMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI1MjI3Mzk1fQ.MV275pzrJohqQiSSS0eUcat8XRt-rw6VXRhq3hXaayU', 1625227395, 'dJY_JTbLSuyC2IIq2Tf1IL:APA91bEKCy9-veCDZT7_q-IkM-48NWhUu6_N74tIGJghGjkkdo9-G9i8gP6dxAWlty1bC8Gt4BBKs66S5teP2bwX4R5MmZRVX3_zrnENqwUtpR2KWH4WmTSTZzl_rQ3KWMx25I1_5nvN', 0, 1625227395, 1625227395, '2021-07-02 12:03:15', '2021-07-02 12:03:15'),
(547, 133, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzMsImVtYWlsIjoiYnVubnlAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI1NDkxMDc1fQ.WKx4PwLZMuJfaMpgf61-d1ijMsRg0ZoZmZH6mytMBTc', 1625491075, 'cNOz5U_sRXiOcrDv4UQd15:APA91bHa2HEk7em4eyHjclFQR6gVu1VA1MATdGyX85DwLgMJHTErObg4XoVorCNVd8-T9gBRvgI0KochPi4HOPXx8UzS24CV6khnvuBnJuH9BCGUTR6Z81RvjHLDzZ19Qa2v9XgOu-GZ', 0, 1625491075, 1625491075, '2021-07-05 13:17:55', '2021-07-05 13:17:55'),
(548, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI1NTUwNDA5fQ.TwIazi3RgQ-pZ38VmtEDyJJdBT98B8yvwFl1WVDpDMk', 1625550409, 'ehETWM2VT8aRW9iJ8XWNGL:APA91bGmcUI8rDYpJL9UPGi3tW5s0P3jS2lymizQaYD9m7n6ASnyAEEgJ8fxndT1STBIYXF7JDrtbgvov6hTbQPZXYR3HrawzHxVj6oV67fH_ADBgn4e9lowk8Nu0d97C63kbVa0KCg4', 0, 1625550410, 1625550410, '2021-07-06 05:46:49', '2021-07-06 05:46:49'),
(550, 134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzQsImVtYWlsIjoiamF0aW5AeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI1NTUzNDk0fQ.gOvJCNi9mSfxYgN1pQwH0fJTd2sENeY65OqdTPxsfCA', 1625553494, 'dW_4R63FTueWznHoizWiDF:APA91bGtP_VsBd-HmE653l1FWtWXyOIn3BWsoIe3gyN6MJ7gzwuGxLQIa8jpr4F3ygnDLIpc-KW_ouLgmdGt2m0GokFdQl1GSbSY8rmbUWsJjEr8ivStzFx4AV4chsB6CEjM-gr6aPMC', 0, 1625553495, 1625553495, '2021-07-06 06:38:14', '2021-07-06 06:38:14'),
(556, 135, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzUsImVtYWlsIjoiQmlybGFnQHlvcG1haWwuY29tIn0sImlhdCI6MTYyNTU3MDY2NH0.SSIpHXY6kXNTq_79GRfieplpfCCKbbws0tTFzsLoFXI', 1625570664, 'epcoCgZ8ROGmpdtj0o0276:APA91bE_KMqqQJkR0XK1R6-nE8lnipYA122hOlkdEKnJH5Z1kA3LVzHaQ3R3Dd94qzMl3hQQvyBQIkbizijMBMdcOOnhGF06jQ8PzQI_v-pi-PVLQ0bUyuoaRa_IRJxlve0PeUJ26B2R', 0, 1625570665, 1625570665, '2021-07-06 11:24:24', '2021-07-06 11:24:24'),
(558, 136, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzYsImVtYWlsIjoiYXJ1bmdlb3JnZTkxNkBnbWFpbC5jb20ifSwiaWF0IjoxNjI1OTI4OTAzfQ.XndTzBPJ3ehRUczek8eB83lHQk2gGayseuCJ8IHyiVU', 1625928903, 'eSqvtdrASnGlGCQmVga2x5:APA91bF09Di2HocQdJa2dW-to7lzZSOsqQTplwLa9S8ohbi1u-8g5hT-625MUmjmnD3Hq49Nfuf-5EmREZYdSkCykXCzQJ3yOrZGjCZscFOs7BSByZ_66JaRms9ifxy24PD-ZsyYFX4o', 0, 1625928903, 1625928903, '2021-07-10 14:55:03', '2021-07-10 14:55:03'),
(559, 137, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzcsImVtYWlsIjoiYWRtaW4xQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjU5MzIyMDN9.Qlw0jChDYfKA9Gg6EYWW-Sk5Z3HsRMu9x84Qr9LWhRE', 1625932203, 'dt6reAQTT72XMrmmcjRCVF:APA91bEjnZU7lz8p_76zkfNUmC2F-oLLX-n2RGQC4iL8ddbS24Bd-n5oTP1PVOIXGtQRdNqCggVmgC0nkH0irnKy9KTyC2jkJ7mKY3yMVugCS_eVH033K7hcsAxPBUzHhMqvcPt7UI1e', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(560, 138, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzgsImVtYWlsIjoiYXJ1bmdlb3JnZTkxMkBnbWFpbC5jb20ifSwiaWF0IjoxNjI1OTYwMTc5fQ.qpCNp7iruoKeiGRhQdslnEJt0e94PGzUYi9U9qH3HWM', 1625960179, 'cCgJHhczToytuR8EJhf2j-:APA91bFuIx3VYvYqthKjtOBI7cPmPQG63i7-Cavv44zyYbppZX5sgrCrKQbxKLsDFs29sXlxxdXxjQr7BH6S95o9UunH7stL73CgNuE5bl_Ku5aw-FgBDYwH9bg_pgt5dExsUwsh5ZZP', 0, 1625960179, 1625960179, '2021-07-10 23:36:19', '2021-07-10 23:36:19'),
(563, 128, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjgsImVtYWlsIjoiYXJ1bmdlb3JnZTkxMUBnbWFpbC5jb20ifSwiaWF0IjoxNjI1OTc4Mzg0fQ.tdqX6BGH7pWtNPFhNhaJgROnR2nQ_PENCtP0dz4DF-s', 1625978384, 'dRMEJnvYR7OTcEQMocY5Lr:APA91bFXD-8AdVyl7LCLRnDmnvCh3k4vDuG6iCnJr_S8XKGcnouB9swOfz6wll6Kw1GgkYybSYwTNLLbnVbI_pbNzWdJQ47XgNapt7OzAOmLZF24QxRXeIfEicUNVmHi9dQ9TuFjFfwA', 0, 1625978384, 1625978384, '2021-07-11 04:39:44', '2021-07-11 04:39:44'),
(566, 141, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDEsImVtYWlsIjoibW9oaXR2ZW5kb3JAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI2MTUyNzQyfQ.gdYTEqSubyVZo6YFjUu6fdrxa4QlKe_S_miRAmyDmdE', 1626152742, 'cg96GGPHTfCtFdAo3TFazk:APA91bEwlaA3_jCX-T-c4jVeY0eafTWqJTdL6hg9Ndqi-Ipvp3WFi5lzSB_UUhg1YZ4FJS8HyH6wgHwYCdXHA3lITmNDv3y8DoXUdcSIkJ3VnvkeNM7SQ11B-mLnyOSt_CsJM7OuU29J', 0, 1626152743, 1626152743, '2021-07-13 05:05:42', '2021-07-13 05:05:42'),
(587, 134, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzQsImVtYWlsIjoiamF0aW5AeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI2MjQ4Mzk2fQ.7r-EPyd-ZIwduynjRNwfaVFI0oq7Yi7rTKD-fwavuV0', 1626248396, 'cA9v3c4xQ_qrJnU845I_DJ:APA91bHvCjTMzHUVYSKivneB6hM00iuwT5mKo3dEweVIoD07R7EjaFI4K-mKzwUdzyvIfxWhQIoisXjqf5QcXCnMfMHWBQG_Q5M-XSSRtpHirDEFJp9xUNgeqJf6xVvDnSpDRdG6K1qH', 0, 1626248396, 1626248396, '2021-07-14 07:39:56', '2021-07-14 07:39:56'),
(590, 144, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDQsImVtYWlsIjoidXNlcmFkbWluQHlvcG1haWwuY29tIn0sImlhdCI6MTYyNjI0ODU0MX0.jzSrN5Rh5DDoT8pNnk0Y0i-Bpg91dm5VBpwbmJcdGUk', 1626248541, 'c91zFGCLT3KF1cxcia8HcX:APA91bGSGnGX7OPs3ojGBV4wy1V-Bn2WHzidfHjR6fG_jym4AzrtudPEAxAaf7C8alfSGWBXj6zb5WCs0m27u4xRC3JpbGEC81O-0XBDdSvLNugvzI61IGJFFmY5wEDR5VcO6JtHnhqd', 0, 1626248542, 1626248542, '2021-07-14 07:42:21', '2021-07-14 07:42:21'),
(591, 133, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzMsImVtYWlsIjoiYnVubnlAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI2MjQ4OTE3fQ.xcoAKoTpDPWz0dt1wK1uQDEJRgQW0VnRaFVQOUiM2kg', 1626248917, 'dec11JT7TNS4_ZU7YGzYoQ:APA91bHF3XS_Bsh13Wzvk25T1UsQZRua6vLYghXGui6co2KhTiK0TszYVcSeIQlsD7Oprw0BolxMKvKC8ISw1ILxTRlSs6OZPCqsLK6DVXRK4fs_8HwG5kPB65xe9gV46fwHtWRdcdXq', 0, 1626248918, 1626248918, '2021-07-14 07:48:37', '2021-07-14 07:48:37'),
(592, 133, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzMsImVtYWlsIjoiYnVubnlAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI2MjQ5MTA3fQ.YstdOOgZ46cXD8un3yCQpTEjYHerwVx1wKO1IK8_rmY', 1626249107, 'dOUKkQfKRKSydtBAhtzQx6:APA91bGkdZFGFw5LhNmFpUoCQREOzEAvWojMJqanu47rTcM05KxWNeta0-SZANZgPgLsZeQ7ttLSr7PrV17wTYDy3yHXa43ndoupFDkV-zXXAwCbZcKvENDHMR8fluP4rxTYghF-qygV', 0, 1626249108, 1626249108, '2021-07-14 07:51:47', '2021-07-14 07:51:47'),
(629, 135, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzUsImVtYWlsIjoiQmlybGFnQHlvcG1haWwuY29tIn0sImlhdCI6MTYyNjQxNDA5N30.4FhigAMFT9CcBVIErnHTafQ_5rmAZOoJGgjlLzPkliI', 1626414097, 'e4kCW-IhRNaBwWR4cZ85NP:APA91bEfkJKznvJQpGFhB8_gqhPAg4KWilPzZJAAj9OqtVIzrf8Nm0w_7WSv7702gw2ikS1HhoqE-m7w9OGWDnUOAkWP_YqoIplVVnstWm_B5vdDL1YGQlrywJiRF2A0G1QfyjxHKplb', 0, 1626414097, 1626414097, '2021-07-16 05:41:37', '2021-07-16 05:41:37'),
(633, 152, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTIsImVtYWlsIjoiZGVudmVyQHlvcG1haWwuY29tIn0sImlhdCI6MTYyNjQxOTQ4M30.dxZ2tjlZs0t9OwzimqBrbu_ruO7iIJEWuNZRwAdDy8k', 1626419483, 'dAfznx6OSZqSmbmum0F_oW:APA91bEXcwsnAft9UIVCKROywCkGqWhmC2zyPhNHYjZrzQY_Esfl5wUH61usAGJk0JBrsDsp6Xp8vDYVv_iTtRrlf4GhQvBZJm0UkSFYJy17WCU5Lvz4Z-P172lgwKCSFYdjnmN8XoU0', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(635, 153, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTMsImVtYWlsIjoiamFjazAxQHlvcG1haWwuY29tIn0sImlhdCI6MTYyNjQyMDE1M30.JnTRp89qAui4eh8Nhbgs9YAQisxzF_X8fhbkNCvPrGY', 1626420153, 'eunWyoITS22YT80DenAqPG:APA91bEH_oqZiyayLcEWLkpHt_1OoZ_1ic_gk6EnbIr9rtq5gGNA3BSZHAiq7RTOIwhuCZ1NvI_qj_tR4gJH11LHvZxUuLCRlkT1UUKKH7xwhOkROJU5g7M_4KLq5w2xA00nkde3qOEc', 0, 1626420153, 1626420153, '2021-07-16 07:22:33', '2021-07-16 07:22:33'),
(653, 154, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTQsImVtYWlsIjoibW9oaXQxMjNAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI2NDQ0MjA5fQ.JGvaHSETJh41oMHeXK0xSbt0BWAQ2EvmtICAYHI9JXA', 1626444209, 'e-EZEFSoSWuc-7Cq0w6BYA:APA91bFqny1iU4NKpm-9CH3bhtSEjOXdwoyzcY8CQmdBumTReY11ccXe5QSbj5YStHJDvKucKznH9XcIxANVtyV6fmkhnUZwC6SfqH8884xEWC7S9dhEpzeuYQCp_RDOFjgZKAqRu0is', 0, 1626444209, 1626444209, '2021-07-16 14:03:29', '2021-07-16 14:03:29'),
(655, 155, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTUsImVtYWlsIjoiYXJ1bmdlb3JnZTkxeEBnbWFpbC5jb20ifSwiaWF0IjoxNjI2NjA5NjM1fQ.KutsZ1IGZyxSzMWMzvrnol5LrJwZslloQ2C61QCaO88', 1626609635, 'dlzfcz-RQ5eWNbypTUks7s:APA91bEJ0O8Tik4fuS7igEX-9IjQtMIQ7_4HzJzH1VGXQyQCxjetslXrkGAWPASs24oLHhngb-kkt37Rxupi4sKJzIp0PQLs4y4UtKfDaqdU-gvEAvw9s32dPynjNMswiWVHwEPao_wE', 0, 1626609636, 1626609636, '2021-07-18 12:00:35', '2021-07-18 12:00:35'),
(656, 156, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTYsImVtYWlsIjoiYXJ1bmdlb3JnZTkxeUBnbWFpbC5jb20ifSwiaWF0IjoxNjI2NjEwMTc3fQ.mG6geSAnYIRm1Szf2KNhUVI_DG_Um2Vn1Cc3WFXWg4Q', 1626610177, '13131a32d123sa1', 0, 1626610177, 1626610177, '2021-07-18 12:09:37', '2021-07-18 12:09:37'),
(661, 157, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTcsImVtYWlsIjoibXMxMEBnbWFpbC5jb20ifSwiaWF0IjoxNjI2NzY3OTMwfQ.lmTJOfO8jzPSL8eHtPSmTPpjXq-RlO5UD6cV1UPnMtI', 1626767930, 'dXcsXA68QFifb1O6OW2Chn:APA91bGiWbCN5Q0Mn7poPSxRd1CCprM4vd3oh72vRELeSB8m4AkugzZFgdN-z4brvykkUavKIFDwAHCDCLSV8gAL0RE-MYidClIcnF1N94KnOiJs4YMRHZSCD_TZudRICDVY_XIjltKL', 0, 1626767931, 1626767931, '2021-07-20 07:58:50', '2021-07-20 07:58:50'),
(667, 143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDMsImVtYWlsIjoiaGFyc2hAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI3MjkxNDMzfQ.wAz_BAqhCkixiAnu4hsUqiGRyJJRr9K9MMGK-XRkBg8', 1627291433, 'dLzFYIYDRAueBY4UgUNYpT:APA91bGHwnFNn_ErLpAzU2aZaSw9hJRNsVMaZc2qqQ1kgUu1CdcIfRilnvZlGjQ2U_zaUWbU6MyiY3wx8Ap2qNe8u3xBMCIl-_uMUUGR-_RK_yVm11oND5qYkFMYOldqb-NOKyQFBHM8', 0, 1627291433, 1627291433, '2021-07-26 09:23:53', '2021-07-26 09:23:53'),
(670, 143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDMsImVtYWlsIjoiaGFyc2hAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI3Mjk3NTc4fQ.eqR7VL3O0RQedyYxIgIALfcgiWv2RUOaeJg8gqCL_2c', 1627297578, 'dneFDBvXSEKCUQhXlV7nkL:APA91bE4RB9QE0BrPJsF7c3UYHQVH_ImN9smTaFcMP79NEyVatHOjEB6IAC32fnS0t_wLKawGrRZcwjIkuloLXfXEVs4IKXQXqjJ_4rS7kFDijRjT5lVDIvAAuBBZ2VkeZUERXEqkIVb', 0, 1627297579, 1627297579, '2021-07-26 11:06:18', '2021-07-26 11:06:18'),
(686, 143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDMsImVtYWlsIjoiaGFyc2hAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI3Mjk5MjY2fQ.ZlGeDMHep8ugZe8Bd7rbVYLEJeum_MDagAVS11bwJu0', 1627299266, 'eN2JEaulT9K3nUADZQi1bK:APA91bFdYjOADotiL-KNGFyPJyMoNTXlxqhyavysddgZzJ-TWy6vLvZ_BNW0EB-DG4sI_rnv4lr8VHdpAxwWFC3TDjuUevpyDVlHPedh8eoICxPK3qF77FMz6iO6oFbZ87RR6TyB5Iux', 0, 1627299266, 1627299266, '2021-07-26 11:34:26', '2021-07-26 11:34:26'),
(697, 143, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNDMsImVtYWlsIjoiaGFyc2hAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI3Mzc4MzAyfQ.CGGvQIhToBPENTZZC5Za63fg3_9M-nxkVB2TKwYRtR8', 1627378302, 'dxg-mybNRuOM29nslVMSWH:APA91bHiH3CsefmAzSYBXKwHSh6qqRsjHQTkLprqwdLlFSlbyiyj9PF06k7NPT-AW9PtpLqwMFga7MC6G4Yy-2eDc1oFdAwQweZYlCYKHgQ-ouy9tmeWM_Vg0BVAnkic8yySg_aTzSvU', 0, 1627378302, 1627378302, '2021-07-27 09:31:42', '2021-07-27 09:31:42'),
(773, 159, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTksImVtYWlsIjoiYXNoaW1hMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2Mjc2NTYwMTB9.gnbiJ-RWaUE52rpcGqvQPrLQXwcEqa3lJFjfgJqtvN8', 1627656010, 'cQ52-LHiT7-64_HdH9OqMw:APA91bGMtDdfQ4POsjgCZD4BtHawf9WvdPCkfFbJ5V4jHHJh8QNe3SM7RruxoFylZ2FluI4HcAmxWDjQimBcTMJVsfcR2MacYweNpKOu6YNYK9jpVcTBtnDAqn54P4_pTiDVvyeFwQqw', 0, 1627656010, 1627656010, '2021-07-30 14:40:10', '2021-07-30 14:40:10'),
(774, 161, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjEsImVtYWlsIjoia2FuaWthNTFAZ21haWwuY29tIn0sImlhdCI6MTYyNzkwNzg5M30.IQDa93TbZtzVTOxs5tdmKHxvIu26OVfijGw-5fFMTUE', 1627907893, 'c27hI_1AQ_agYz0k8CTi2f:APA91bGuTi5drZIgvtJAHxrz_TUKDBIT_c9vV_dTmeYqi9h53FiSmouQsOe9hCSPbE9Sr6XntSWgAnjxsXQhQQ0EuYe3j8A5bZYuNqP3AkN8bh_-rugJTjqu9Zjv_XAB6BGhalcPgK4B', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(775, 162, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjIsImVtYWlsIjoicG9vbmFtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2Mjc5NjY2NjZ9.uv1sZSp2iaU4sBxLrHycByFtKNUcsnVGFkUBxM32zDU', 1627966666, '13131a32d123sa1', 0, 1627966666, 1627966666, '2021-08-03 04:57:45', '2021-08-03 04:57:45'),
(783, 164, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjQsImVtYWlsIjoiamFja0BtYWlsLmNvbSJ9LCJpYXQiOjE2MjgxNTUxODl9.TgenO2rqsWxCqzaDwvDqXskYqd-nGE_N7KK3QYnbDJw', 1628155189, 'dfQzl4QbRIS-aMEkHA57mz:APA91bEdfzJ0a3sACAX1AjS2klyaHThoLHfmFiIO8G2_Qu9Una3SUzs_0itQzMLLX784lgoyYAqpRBn0MUVmY_TpwAV-KMKXQHLjob8jcz2gJZx5iSS6JSLpNWxst7ycmsSse5mHU7rN', 0, 1628155189, 1628155189, '2021-08-05 09:19:49', '2021-08-05 09:19:49'),
(785, 162, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjIsImVtYWlsIjoicG9vbmFtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjgxNTg0NDJ9.9K3AIcs6sPvghfizA_XuvOgeJle599YUEMNbS-RukOs', 1628158442, 'dQe0m6CxRCaSEcXlniSd41:APA91bHNeP_6mHeTfOwCfwDIuKTiJQ9GlwVMM1_3oqTJbug23IRPejxLIWcl3KL-qcsRpN0gzxWz-qRu8djqfWTLZvTp1CCj-Zy5IYL5R8HaBE9umFrYu2jFR8vM_BjYQTAMaT3yrlL5', 0, 1628158443, 1628158443, '2021-08-05 10:14:02', '2021-08-05 10:14:02'),
(786, 163, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjMsImVtYWlsIjoiZ2FnYW5AZ21haWwuY29tIn0sImlhdCI6MTYyODE2MDc1MH0.urL9Rivj0c1yQ4ypwT0MDFZydOx-wULuA7ga5KhdFZs', 1628160750, 'fI80_gpQQOav3Hzu__ws0D:APA91bFDusACkwuFEx-UxYYD6Xj3WcKwpVgJfF3MrXSrZqCGIj2NuYak3esfIYV1fjgEkCjE7MnUrt1-AEuM9SQ9jc2LcEo7UPt7LrzznL2Sx7nNFsISRNx2xcnRPLcWXHFCZM63Q6jH', 0, 1628160750, 1628160750, '2021-08-05 10:52:30', '2021-08-05 10:52:30'),
(787, 159, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNTksImVtYWlsIjoiYXNoaW1hMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MjgxNjI1NjB9.Zq5xScbPgN_Cx3a4d-zwRpvDDvwG3Z-fpA8pcGhcLhU', 1628162560, 'flV2RwfIQiuAG_QMm6GudM:APA91bFIkNlcf-lNwNb6pSBTIdMuZWMgGkKX-yvBMrQ9xDGY_qgtTx1PxsXxX8Y-sv0B4B1Q6dPDxeUfl11534tacx6I7xJAH79ThDFVrr8hKy3sIXUOLQiQ05vZHOIizEfpWyh4WeBn', 0, 1628162560, 1628162560, '2021-08-05 11:22:40', '2021-08-05 11:22:40'),
(788, 165, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjUsImVtYWlsIjoicGFtQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjgxNjQ0NzV9.D8lBc0H0QXP_owi6kK9r0WlkTAtKTYtsbQjfl6kb-kY', 1628164475, '13131a32d123sa1', 0, 1628164475, 1628164475, '2021-08-05 11:54:35', '2021-08-05 11:54:35'),
(789, 164, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjQsImVtYWlsIjoiamFja0BtYWlsLmNvbSJ9LCJpYXQiOjE2MjgxNjgwMTV9.HDSt154lDocRmpiDyovF-URf0FyV35zJ5L4ar27NXhk', 1628168015, 'cbBfwxr3SFu-dQB1l976Qf:APA91bF0SZuYBsUBGd6vAuJeTG1vDMlbIcKWgoz49k0uz-2VLKo_WSVZA05j4tT1mBSQtqdLyZNqG8pMwWzPW6hPpGSIlDfMuW-FLI8y_AQaJh3L6dd6Zy8reTiXiZApzWdCQtQtN6q_', 0, 1628168015, 1628168015, '2021-08-05 12:53:35', '2021-08-05 12:53:35'),
(794, 167, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjcsImVtYWlsIjoibW9oaXQxQHlvcG1haWwuY29tIn0sImlhdCI6MTYyODU3Nzc2NH0.MUFrKCL3Nq0wLMd6oX4HVKHwe4gbHtmeq-DdmM6BKYA', 1628577764, '13131a32d123sa1', 0, 1628577764, 1628577764, '2021-08-10 06:42:43', '2021-08-10 06:42:43'),
(796, 168, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjgsImVtYWlsIjoia3Jpc2hAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI4NTk0NTUzfQ.pCBnBnf60Hn0ysBbuCEZIKLvKz-hGGl2IRP5jkwPqXg', 1628594553, '13131a32d123sa1', 0, 1628594553, 1628594553, '2021-08-10 11:22:32', '2021-08-10 11:22:32'),
(797, 169, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjksImVtYWlsIjoiakBqLmNvbSJ9LCJpYXQiOjE2Mjg1OTU4NTB9.ZlKcmg9ZgYKvYOSr-onRrb4FO1xl_vT06pXUf4Ly-Ow', 1628595850, '13131a32d123sa1', 0, 1628595850, 1628595850, '2021-08-10 11:44:09', '2021-08-10 11:44:09'),
(798, 170, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzAsImVtYWlsIjoiamFja3lAbWFpbC5jb20ifSwiaWF0IjoxNjI4NTk2NDY4fQ.ZCfeouIveTFVQgEqU3OkwMHJ60j0Q_ceinqW5BM8Xoc', 1628596468, '13131a32d123sa1', 0, 1628596468, 1628596468, '2021-08-10 11:54:27', '2021-08-10 11:54:27'),
(799, 171, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzEsImVtYWlsIjoic2FtQG1haWwuY29tIn0sImlhdCI6MTYyODU5NjU2MX0.15AN_dhFFTREq8ROR8xOxsP_febr7iuOGCZPJw5ijZs', 1628596561, '13131a32d123sa1', 0, 1628596561, 1628596561, '2021-08-10 11:56:01', '2021-08-10 11:56:01'),
(800, 172, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzIsImVtYWlsIjoiYWxAbWFpbC5jb20ifSwiaWF0IjoxNjI4NTk2NzA3fQ.eqvUuOVDflY2UiM23vS24lejViLTz1hgw6QVO9cdyaE', 1628596707, '13131a32d123sa1', 0, 1628596707, 1628596707, '2021-08-10 11:58:26', '2021-08-10 11:58:26'),
(801, 173, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzMsImVtYWlsIjoiaGV5QG1haWwuY29tIn0sImlhdCI6MTYyODU5NjkwMX0.wWpqMlAxnrD73NM58b8sdMDFF0ej7hNUHaWKBgd-1H8', 1628596901, '13131a32d123sa1', 0, 1628596901, 1628596901, '2021-08-10 12:01:40', '2021-08-10 12:01:40'),
(802, 174, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzQsImVtYWlsIjoiaEBobWFpbC5jb20ifSwiaWF0IjoxNjI4NTk3Mjk5fQ.IuQJvQPbuwte3FklgvhnpeFjlT8zP2vrtmKpBflRto4', 1628597299, '13131a32d123sa1', 0, 1628597299, 1628597299, '2021-08-10 12:08:18', '2021-08-10 12:08:18'),
(803, 175, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzUsImVtYWlsIjoiaEBhYi5jb20ifSwiaWF0IjoxNjI4NTk3NTE0fQ.lzLT77aBEjrkHmBrFu3vqIm6HF6uCFhDAiMymR5_UIg', 1628597514, '13131a32d123sa1', 0, 1628597514, 1628597514, '2021-08-10 12:11:53', '2021-08-10 12:11:53'),
(804, 176, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzYsImVtYWlsIjoiYkBtYWlsLmNvbSJ9LCJpYXQiOjE2Mjg1OTc3NDJ9.fnwZnIxYPOGW1vg8MtMJRJyv8-Uj8-h79oXFt1wnGyw', 1628597742, '13131a32d123sa1', 0, 1628597742, 1628597742, '2021-08-10 12:15:42', '2021-08-10 12:15:42'),
(805, 177, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzcsImVtYWlsIjoieUBtYWlsLmNvbSJ9LCJpYXQiOjE2Mjg1OTc4NzB9.Wp0_RQZs_mLdriM3yOo9TR2SzayhiMzd1hQDm6sqfps', 1628597870, '13131a32d123sa1', 0, 1628597870, 1628597870, '2021-08-10 12:17:50', '2021-08-10 12:17:50'),
(807, 178, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNzgsImVtYWlsIjoiYXJ1bkB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2Mjg2NjIyNzd9.JMlY8yASDfEXrp_4cHls9tt68Dv8Zml2SlXQirzhsss', 1628662277, '13131a32d123sa1', 0, 1628662277, 1628662277, '2021-08-11 06:11:17', '2021-08-11 06:11:17'),
(812, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2Mjg3NTA2NTB9.L6EhxZ_LK53MiGf6i9iXypX4zTmK50BA93PfBTkJxUE', 1628750650, 'dC0cU3upQ46cTHOLWaGHPw:APA91bFEXz1vfQWbgouQXSdGJ6Qr8MX-g5GPMpanW4O0wSbuxeQoSSzaBqzlDvV07AnxuzRxU-8otG0fGLTeDsE4sCo42MNLrLCER77RcAFYvTa5f9Nm7QsQbR62qFEQUmj-QTCPqinw', 0, 1628750651, 1628750651, '2021-08-12 06:44:10', '2021-08-12 06:44:10'),
(824, 182, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODIsImVtYWlsIjoiam9obkB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2Mjg4NTMxNjN9.bOz5Qsj60IYsOPkiOqxpxlGIv2KlAn85hfwfVPJLOQI', 1628853163, '13131a32d123sa1', 0, 1628853163, 1628853163, '2021-08-13 11:12:43', '2021-08-13 11:12:43'),
(828, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MjkxMDU0OTB9.vm4cK2yFWQI165yhOBfLrAgHUl4cYrUOXXbh26be5KA', 1629105490, 'c42_EuPBQcSzQTiWCC4jGe:APA91bGj5bP-TcmDupF9thMi0IMaf3CfuTRwRnNzVEZuSMneQoxVTJBzG1W3AVlpTrroVZHq0clQy3tlt076ZoHogakU7MSz-Rc3Nq3h3YQ36LfBsM5Uvh8c4tFzeh43pkDQSg2dvw5U', 0, 1629105491, 1629105491, '2021-08-16 09:18:10', '2021-08-16 09:18:10'),
(841, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI5MzUyNzI0fQ.TaHMt6TeZGiURUluvh0RMbY84ovghsE7up_VRaJdpU0', 1629352724, 'cgUHepHZSlaUActKqBWhpI:APA91bExnmhbzINaByYARBgBa3LLls6ayk0TkIDH-KzrKTn1zsTa6aBFWR5VPeBErvZhWaArXfv6_NshOUu80hpy6gcL9hZnWyQYRmaMs7AdxmGN_gFN2wSeHpUptn_nE9kp2Wu_VK6h', 0, 1629352724, 1629352724, '2021-08-19 05:58:44', '2021-08-19 05:58:44'),
(844, 183, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODMsImVtYWlsIjoicmF2bmVldEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MjkzNTQ2MTF9.WeTsucgh0hkS1FIlbpReHwAFmf7T-RtTl9HLTN114SE', 1629354611, 'cSRb3iQmTnK-0QcDziIgFq:APA91bHP9UJoFfuK5Oq9CPwxbgSQvQ9grcb8HoUCjHsAOuIre2Bv4fsK234YNnLV8QVfxeuPPCgL3XufNLbQnQ0pJ8LVirM3avUz-VZlLNaLp8z-NdGRjbaTHnqWLUFGzRFiZJR7rVc5', 0, 1629354612, 1629354612, '2021-08-19 06:30:11', '2021-08-19 06:30:11'),
(908, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI5ODA4ODA1fQ.2pajX573GnmL8QDKKfB0RTrKaXLaLoAFNXy1g5hO5ZU', 1629808805, 'fc0_gPXvQ8KNipiNnb42fB:APA91bHkpZftHUyfD3EQkWhDVR7PhgfUdwZNdDIWwwRZCUQEMjxOIVh5kRL2FwlUpWS95HZdbcoYpgj-fYhlJywzoNHTGFwN-Ad2-9FOauzJIEjoA7ZJ_KcRoXrXDqXWdLFHsG4YnpA-', 0, 1629808806, 1629808806, '2021-08-24 12:40:05', '2021-08-24 12:40:05'),
(909, 186, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODYsImVtYWlsIjoiYXNoaW1hMDFAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI5ODY2NTIwfQ.FXAm8P4elQDt4AccMYCuEU6vC6mRaS5AjPVPkkeAkp8', 1629866520, 'drw9nbQBQtWcDySlXh1ydH:APA91bGe0K5cxiTUrdhyVCXDFKeB-nBIrSoJs08oqNtGU7CEPMwqYkYRQfOnwTluI63CZBsybgIaYkBuNSlPnOXFxzKFzgQgQ8h-KmO5spNyv5d3JdvIW3Vlxnq00h9mRMoj2WlbOC86', 0, 1629866520, 1629866520, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(911, 187, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODcsImVtYWlsIjoiZ2F1cmF2QHlvcG1haWwuY29tIn0sImlhdCI6MTYyOTg4NDMzMX0.PLf3vzYX9alRAxfMCmqFAYuQeBY0eVhRfl7Sb17-MWo', 1629884331, '13131a32d123sa1', 0, 1629884331, 1629884331, '2021-08-25 09:38:51', '2021-08-25 09:38:51'),
(912, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI5ODg2MDMyfQ.CKbzU6oxjqSkwePFNCkglyJwkL0kuWu38pWwfm8QXYQ', 1629886032, 'dBWpzKgkSVupAtRlGXRyaY:APA91bETYrWeWCiQrDolEfbheNDc_0_YQhsY0B3gYJ6zxP54hekbjJgCKNkWqRkPHOvn1O-hMXmtxWgGfbnpA2uYF_qvVHTsqEcVDJVJ9ECjy8as9HXtrlITD_GAvK48YBenQoQnyLtQ', 0, 1629886032, 1629886032, '2021-08-25 10:07:12', '2021-08-25 10:07:12'),
(917, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjI5OTcxMjgxfQ.gjplR1VCM4coZqeYHUyDBpG4JgZRg3hE7vO1Hv4_tQk', 1629971281, 'dEZ_17YsRCuisINqJxtAbr:APA91bF6OgHAJ16_UtbTacEdo0kGrhvbe73A_GofNXm84mAj0zN_05qe_WkDTrdb4K720iqp8ZbxxSCDdByPyao-ovEZxOlA-2qja24mqwGeLW_XxS17VNiHvOjWyhsrioRbkk2pWkGe', 0, 1629971281, 1629971281, '2021-08-26 09:48:01', '2021-08-26 09:48:01'),
(921, 189, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODksImVtYWlsIjoic3VraGkwMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2Mjk5ODQxOTd9.5KC0XHlr7m_egNkpQs-2w-eqxgSkUwBxdBcI2bN1IM0', 1629984197, 'fPr-a0DzTVaSg9f5ZkwKPu:APA91bGlBik3eLAUC2sFO3gNiVHqm0j-WgzC4aaK4xjvy79wW0x3gNkvc96crTMD6v-dAEBfNOTJlShQ6GRf213CXWdbnpc58LWIeNNlhla6aTIzNfTB5nZMWNQyqSD5guTMx5KzWxOI', 0, 1629984197, 1629984197, '2021-08-26 13:23:17', '2021-08-26 13:23:17'),
(923, 183, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODMsImVtYWlsIjoicmF2bmVldEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzAzMjE4MjN9._5T9etDv0zqS_dNZBjybkye76GtOBYwmb50TaMIQosE', 1630321823, 'fTGkK5ICQpKkLud-cKTtva:APA91bGvcCQU53rDCPekntQF3CvdfpmNStgzqarL9qVurbtj9opahYlnrIgF9v5zMS0dkxz1dAa2ftKolP3RQnhRH6l1_twnT1m4D1w29jA7dkTB7lYIIR1YtjB7ulkBC-hw2-atYZuw', 0, 1630321824, 1630321824, '2021-08-30 11:10:23', '2021-08-30 11:10:23'),
(930, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzA0MDYyNTN9.y7HhiRVB3T0JiAnTaSDYmRtK5W1OsWuzCBNPK1g0R78', 1630406253, 'fs7NKki5TyKyohA6AXw1Hd:APA91bFJEB8d5JW2re52YBB9yFGcd7WdReA_l2gMNyNydUKiWoC13zVQZ27NQ0bdZ4aE_YQyHECTL7iIRBijw6jjgdi3nKTf8pGkmwWtRp-_-MAlSS7cxdPv-r3rnwxfsB6wPVsYlBB4', 0, 1630406254, 1630406254, '2021-08-31 10:37:33', '2021-08-31 10:37:33'),
(942, 198, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTgsImVtYWlsIjoicHJkcEB5YWhvby5jb20ifSwiaWF0IjoxNjMwNTY2OTcwfQ.LF0_RaRW1W-54MA47EXnfJRvSwraN37-6xTa0L0YT8w', 1630566970, '12456', 0, 1630566970, 1630566970, '2021-09-02 07:16:10', '2021-09-02 07:16:10'),
(946, 199, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxOTksImVtYWlsIjoibWpAZ21haWwuY29tIn0sImlhdCI6MTYzMDY0NTYzMH0.EyDaKAGQZOkOYXDwR0Az8qnPrDSPOfrVtx0_LdcupS8', 1630645630, '13131a32d123sa1', 0, 1630645630, 1630645630, '2021-09-03 05:07:10', '2021-09-03 05:07:10'),
(947, 183, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODMsImVtYWlsIjoicmF2bmVldEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzA2NzU1Nzl9.TagENH_Lb806v8obJ4ZQGKH9WQ9EgYMjZutRWW6ZWEo', 1630675579, 'fuLTXO_HScyVkDySGRS7ob:APA91bFamR3BIeh_CjpC8PbFipQuguiZh_DV1BQCDNjXox_s9kIhdATMX3mkCKK0xZ_iCJ4XOgc942ScfQ1tJPiprzddYnoRhQm8PmsZaU4sgRzalt8C_0H7iXJa0w6diUoCMdb_JKcq', 0, 1630675580, 1630675580, '2021-09-03 13:26:19', '2021-09-03 13:26:19'),
(949, 200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDAsImVtYWlsIjoidGVzdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzA5OTEwMjB9.5jKN-4PnfbpYJO5tPzMtiI9Q_ywVvNvYAE5sIqXUEKk', 1630991020, 'djouvMZPSEqW5R8BRLKRnL:APA91bHE6s1tideH25D_Wi4FpCZIxgj5Wtb8o4Bl7eCzoO8MzjeA7ZuFs7r0iLcIz006zvfiqEZ6ngq-o0j4FyH-eXvKxUi1ybWrL2UqteMG-IYWIufkif8pHGq0xUOyRPN6u4wVkKul', 0, 1630991020, 1630991020, '2021-09-07 05:03:40', '2021-09-07 05:03:40'),
(950, 201, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDEsImVtYWlsIjoibW1qakBnbWFpbC5jb20ifSwiaWF0IjoxNjMwOTk2ODE5fQ.f9u7zfXMwkhTbHcpfFUtUQYb_Bq-B-Gvsj_JmX94Bsc', 1630996819, '13131a32d123sa1', 0, 1630996819, 1630996819, '2021-09-07 06:40:18', '2021-09-07 06:40:18'),
(953, 200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDAsImVtYWlsIjoidGVzdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzEwMDUzOTJ9.yp0arXZKdOGnC3wL2s98C1Hs30dVnDJ-WxxAOSanmO0', 1631005392, 'f2RbgaddR-CdOkxOwiE-W3:APA91bFeNiraPi-u2B5z54nivF7CKGHRzn2IJVII0JG2eYEKMpdzl4luYdlUAUYA1JqPBZJRMPec3YG45m7fmif69XtIVdZMBl99vAgKWXG2BMnMr9sqbSRO0szNjrV2xOOzgsbCqX-f', 0, 1631005392, 1631005392, '2021-09-07 09:03:12', '2021-09-07 09:03:12'),
(955, 200, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDAsImVtYWlsIjoidGVzdEB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzEwMjA0MTF9.alfduS8yLxgQa_jCmzMNiv3nLpDj-hqscEf4rMSN6mM', 1631020411, 'dqK6XdL1QuyQbhixAAPfyo:APA91bEnk6xJzYq2UgsbzBgIiRoaFqXSFTVcntXzMrtLabMz6rKCEeKiwnb9DCP_moBki6HtehVttYo4mleIY7vv5EAuLTKbe7thkY0bo258nMExUqsVbxsO--CFBZ2nhC-mYxVEs0Cy', 0, 1631020411, 1631020411, '2021-09-07 13:13:31', '2021-09-07 13:13:31'),
(958, 185, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODUsImVtYWlsIjoicHJkcEBnbWFpbC5jb20ifSwiaWF0IjoxNjMxMDgxMTUwfQ.VeSO43S4gFhqoYXS02sn7o83oSw0HHmeVCfpV_YzPLY', 1631081150, 'fjzFAA9OQYiKrV0LlW-2TD:APA91bFwbeLuMw7bDA3cPTi2jijkhOmjH_5CIufYnrdAAcbVRPRXWGSFUk53Wf4vhH1kEPyBjg9P-BP46rC8wzutvRVlYQCTYJT3TVo1-Awf_7orKGrg2x8L0wZxyI_sEmBwwS-WRMSx', 0, 1631081150, 1631081150, '2021-09-08 06:05:50', '2021-09-08 06:05:50'),
(962, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzExNjgxNTl9.b4O-Bl7gYrEWovn1K8JhsQQ0oEQnDq8D1npCVit3AtM', 1631168159, 'dzcSnt70Tg6SnMiXrDh3ci:APA91bFY4A_FTumv6UF6ee05slE9sL5mzXtcl8WA_5qvOWljtI8b4XsnK6ACYF6uCFl0jK3SjgDp8I9iFTLyEecsuPVfA3iMTfCuprg_nOJLaoNP4JDcbS5uFQsqiZ1Hkj9-U-mew5Qn', 0, 1631168159, 1631168159, '2021-09-09 06:15:59', '2021-09-09 06:15:59'),
(967, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzEyNzY2MzF9.Y6Vm6bD728AWePQgEUYaVHHzUJYA07bDhKNdglKa4cw', 1631276631, 'f83N-j8vt13Mvn6RfZ2j-k:APA91bGwXaCMyWcz4cWlmHQxvztvS89qVw771r8e_m8qjItGc8RZElPFHZBcOpv97PJviYIwS2kSkbaTXMcdu2JHJWhgadAq0a6-bOZquT7FRmACtFzLNfzlj_qJpyRhaftK4S15P0oR', 0, 1631276631, 1631276631, '2021-09-10 12:23:51', '2021-09-10 12:23:51'),
(968, 204, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDQsImVtYWlsIjoiYXJ1bmdlb3JnZTgxMUBnbWFpbC5jb20ifSwiaWF0IjoxNjMzMDk0MjQ1fQ.dlbPVDnMYeTCzZZs14u0QQq3CNdSoJmD6J8Kw4NTwEg', 1633094245, '13131a32d123sa1', 0, 1633094245, 1633094245, '2021-10-01 13:17:24', '2021-10-01 13:17:24'),
(970, 205, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDUsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0NzIzMn0.j0NLaYk6yTJ6goTK8gOqoEOuYtlQ-H6H2iiLf3zWCno', 1633347232, '', 0, 1633347232, 1633347232, '2021-10-04 11:33:51', '2021-10-04 11:33:51'),
(971, 205, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDUsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0NzIzMn0.j0NLaYk6yTJ6goTK8gOqoEOuYtlQ-H6H2iiLf3zWCno', 1633347232, '', 0, 1633347835, 1633347835, '2021-10-04 11:43:55', '2021-10-04 11:43:55'),
(972, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348071, 1633348071, '2021-10-04 11:47:51', '2021-10-04 11:47:51'),
(973, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348094, 1633348094, '2021-10-04 11:48:14', '2021-10-04 11:48:14'),
(974, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348124, 1633348124, '2021-10-04 11:48:44', '2021-10-04 11:48:44'),
(975, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348210, 1633348210, '2021-10-04 11:50:10', '2021-10-04 11:50:10'),
(976, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348484, 1633348484, '2021-10-04 11:54:44', '2021-10-04 11:54:44'),
(977, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633348511, 1633348511, '2021-10-04 11:55:11', '2021-10-04 11:55:11'),
(978, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633349702, 1633349702, '2021-10-04 12:15:01', '2021-10-04 12:15:01'),
(979, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633349771, 1633349771, '2021-10-04 12:16:11', '2021-10-04 12:16:11');
INSERT INTO `userToken` (`id`, `userId`, `token`, `iat`, `deviceToken`, `deviceType`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(980, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633349829, 1633349829, '2021-10-04 12:17:08', '2021-10-04 12:17:08'),
(981, 206, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDYsImVtYWlsIjoiY3Fsc3lzNjBAZ21haWwuY29tIn0sImlhdCI6MTYzMzM0ODA3MX0.qLH0nHJ-8Hl-mmSTGRG-QTXRvJXzMiBdV1lPgE44HNI', 1633348071, '', 0, 1633349889, 1633349889, '2021-10-04 12:18:08', '2021-10-04 12:18:08'),
(982, 207, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDcsImVtYWlsIjoicGFydmVlbi5jcWxAZ21haWwuY29tIn0sImlhdCI6MTYzMzM1MTc1OH0.l_BoFhqto5PW2SbeOyAZ3cXoLMTvBx9yr0jCovQF_ws', 1633351758, '', 0, 1633351758, 1633351758, '2021-10-04 12:49:18', '2021-10-04 12:49:18'),
(983, 207, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDcsImVtYWlsIjoicGFydmVlbi5jcWxAZ21haWwuY29tIn0sImlhdCI6MTYzMzM1MTc1OH0.l_BoFhqto5PW2SbeOyAZ3cXoLMTvBx9yr0jCovQF_ws', 1633351758, '', 0, 1633352473, 1633352473, '2021-10-04 13:01:12', '2021-10-04 13:01:12'),
(986, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjMzNDMyODEwfQ.RgexdiICSmetggWbcBA0cXCIzNaexv0yZxEOZljv1mc', 1633432810, 'lsdakfjalsdjf', 0, 1633432811, 1633432811, '2021-10-05 11:20:10', '2021-10-05 11:20:10'),
(988, 208, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDgsImVtYWlsIjoibW9oaXRhcm9yYTc4NjZAZ21haWwuY29tIn0sImlhdCI6MTYzMzQzNDgzOH0.NadUje5EHeWw3GBDIJvysP--efDp7X9WzBSfk4vKelo', 1633434838, '', 0, 1633434838, 1633434838, '2021-10-05 11:53:57', '2021-10-05 11:53:57'),
(990, 209, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDksImVtYWlsIjoicmlja3lfc2hhcm1hMjAxMUB5YWhvby5jb20ifSwiaWF0IjoxNjMzNDM4MDAxfQ.RbmQbgNpz_Bq2c73T4K7gwmhF5nirJYY1-goIq4XdyQ', 1633438001, '', 0, 1633438001, 1633438001, '2021-10-05 12:46:40', '2021-10-05 12:46:40'),
(992, 209, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDksImVtYWlsIjoicmlja3lfc2hhcm1hMjAxMUB5YWhvby5jb20ifSwiaWF0IjoxNjMzNDM4MDAxfQ.RbmQbgNpz_Bq2c73T4K7gwmhF5nirJYY1-goIq4XdyQ', 1633438001, '', 0, 1633438210, 1633438210, '2021-10-05 12:50:09', '2021-10-05 12:50:09'),
(994, 210, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTAsImVtYWlsIjoibW9oaXRjcWxzeXMxMjNAZ21haWwuY29tIn0sImlhdCI6MTYzMzUxODc0N30.8MtNS1Y2Qbj_hXfZCrKe7vehyJli9_lSm6DyC0vHTVY', 1633518747, '', 0, 1633518747, 1633518747, '2021-10-06 11:12:26', '2021-10-06 11:12:26'),
(997, 208, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDgsImVtYWlsIjoibW9oaXRhcm9yYTc4NjZAZ21haWwuY29tIn0sImlhdCI6MTYzMzQzNDgzOH0.NadUje5EHeWw3GBDIJvysP--efDp7X9WzBSfk4vKelo', 1633434838, '', 0, 1633527275, 1633527275, '2021-10-06 13:34:34', '2021-10-06 13:34:34'),
(999, 211, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTEsImVtYWlsIjoiYUBhLmNvbSJ9LCJpYXQiOjE2MzM1MjgyODF9.41T6bsvqe1jbBpIelXjjW8zY3S5AG5iXjMr0N-eTSJY', 1633528281, '13131a32d123sa1', 0, 1633528281, 1633528281, '2021-10-06 13:51:21', '2021-10-06 13:51:21'),
(1000, 212, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTIsImVtYWlsIjoidmVuZG9yM0B5b3BtYWlsLmNvbW0ifSwiaWF0IjoxNjMzNTI4NTk0fQ._BlRwqRSFiej3RjCuHnLm0WPtC5F2KLqZptvpX4bNn0', 1633528594, 'lkjsadfahsdfkjashdfiasuhfiawuefh124124124asd', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(1001, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjMzNTI4NzQ3fQ.n2OmoLM9pVSpQ6FvuR5aSJVhQ9-SCWhysFcOfdgPtZ0', 1633528747, 'dEZ_17YsRCuisINqJxtAbr:APA91bGkw7h-3homZ5y3qvujrf9c66oYRxsN9OXQp2v_qBx9myQ1eFIiy9sWN0o9njRP8d_nd7zROwwlzXryLp6JuM3VZN8Li64HDT2W21fAVcPx7ZS0mrhvRqBJLAbWqzfAOmHZfw8J', 0, 1633528747, 1633528747, '2021-10-06 13:59:07', '2021-10-06 13:59:07'),
(1002, 213, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTMsImVtYWlsIjoicEBwLmNvbSJ9LCJpYXQiOjE2MzM1Mjg5NzJ9.CdbFUIaOYBCK1Tnn8XspK3itcUGs_w9Lp3NHQd09LEk', 1633528972, '13131a32d123sa1', 0, 1633528972, 1633528972, '2021-10-06 14:02:52', '2021-10-06 14:02:52'),
(1003, 214, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTQsImVtYWlsIjoiakBqLmNvbW0ifSwiaWF0IjoxNjMzNTI5MjI5fQ.eDN3KaVXMFitOiZkfgrm9VbpIXnFsvxN_o5XqjByxBg', 1633529229, '13131a32d123sa1', 0, 1633529229, 1633529229, '2021-10-06 14:07:08', '2021-10-06 14:07:08'),
(1004, 215, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTUsImVtYWlsIjoicmlzaGFiQHlvcG1haWwuY29tIn0sImlhdCI6MTYzMzUyOTQ0MH0.-WSXM48ozidP5Wt6GzWLFZJ3BThdbJS9_ZKi8tZpGlk', 1633529440, '13131a32d123sa1', 0, 1633529440, 1633529440, '2021-10-06 14:10:40', '2021-10-06 14:10:40'),
(1005, 210, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTAsImVtYWlsIjoibW9oaXRjcWxzeXMxMjNAZ21haWwuY29tIn0sImlhdCI6MTYzMzUxODc0N30.8MtNS1Y2Qbj_hXfZCrKe7vehyJli9_lSm6DyC0vHTVY', 1633518747, '', 0, 1633529510, 1633529510, '2021-10-06 14:11:50', '2021-10-06 14:11:50'),
(1006, 216, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTYsImVtYWlsIjoidmFydW5AeW9wbWFpbC5jb20ifSwiaWF0IjoxNjMzNTI5NTQ2fQ.x_C1yEATs2aJxd98T8yvz_udhILUGv2P-LFSPajBXQY', 1633529546, '13131a32d123sa1', 0, 1633529546, 1633529546, '2021-10-06 14:12:25', '2021-10-06 14:12:25'),
(1008, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM0MTk3NTY2fQ.EHh4uUmuwEEhQjmGWfEqsACaTVSq6e5i1KAtsszeAeU', 1634197566, 'chPDGiusQ7uIPCPfi1n0Cs:APA91bFmj2uDSAhzLkLWIhg2-LCC3Ch-2vNqMrWx6yDa8vZT6gZipIQ2DUWLgUIP_AbpL18-tstb5m60KAG7xjottxi9P2SEO-FYHrMmse5eqQfY9ri4awOiqTA7B9-46prcjRcnhEA8', 0, 1634197567, 1634197567, '2021-10-14 07:46:06', '2021-10-14 07:46:06'),
(1011, 217, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTcsImVtYWlsIjoiYXJ1bmdlb3JnZTkxMUBtZS5jb20ifSwiaWF0IjoxNjM0NDgxODIwfQ.Wh8y-6K2K0pic-PFMmTuocKIl_m5UOjQ1qIcM9Ci6BQ', 1634481820, 'cY4uSMwERDqVSpjs6B_8Dm:APA91bF04mnJfIoZAfPuzvtY_McResrcvusnU-KCkMIPTib9uKNl-3_FxJm3uHYUb5rHIbJRlGgIM0nyHmuS4o79G_GiMWThILuqjXM8B952LDGhE6VH7BsL_2GSQ1Fb0fxs8rreT7YH', 0, 1634481821, 1634481821, '2021-10-17 14:43:40', '2021-10-17 14:43:40'),
(1012, 219, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMTksImVtYWlsIjoiamFja3lAZ21haWwuY29tIn0sImlhdCI6MTYzNDUzMTk5MX0.G5KcEUJ0JCkJnP0EoEB--0eEKFvD-oFYayinaYIuvy4', 1634531991, '13131a32d123sa1', 0, 1634531991, 1634531991, '2021-10-18 04:39:50', '2021-10-18 04:39:50'),
(1013, 220, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjAsImVtYWlsIjoidGVzdEBnbWFpbC5jb20ifSwiaWF0IjoxNjM0NTMzMjY0fQ.6gZM1VS1LfG_ajUVJW7eBD-sDhG4ck5Gb2D1HWxYByg', 1634533264, '13131a32d123sa1', 0, 1634533264, 1634533264, '2021-10-18 05:01:04', '2021-10-18 05:01:04'),
(1014, 221, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjEsImVtYWlsIjoibmV3QGdtYWlsLmNvbSJ9LCJpYXQiOjE2MzQ1MzM2MzB9.HSvPK1biiJ6MVxmR0IxUPh89xg1dJQFGT8uAisPriMg', 1634533630, '13131a32d123sa1', 0, 1634533630, 1634533630, '2021-10-18 05:07:09', '2021-10-18 05:07:09'),
(1017, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM0NTM4NzUzfQ.-HGYf8zbJ1BRGfUiTIPdWtcZh4PwUTNZ7E_cPjGFpjo', 1634538753, 'feR2pML1RNCQlweGpFD8R2:APA91bG9JvTz9wzXov_zYVFQ_EaSq8VM9f3fZJaooqEkFovKOPiDb_YykDgW1UmunAr_wtfjzN0rxNhXPQ2oOVpNq3QPBOfBOd8S37GTlh_S-mWLvjr_s7jHGZZnWEaGZcOXkzAyE9ju', 0, 1634538754, 1634538754, '2021-10-18 06:32:33', '2021-10-18 06:32:33'),
(1018, 185, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODUsImVtYWlsIjoicHJkcEBnbWFpbC5jb20ifSwiaWF0IjoxNjM0NTQzNDY4fQ.cZjvcLeEFQB0w3o_RDxFZ0490ZJEjn7oeI0myz_npBA', 1634543468, 'ei5MVB_aR_yCb5Q9Y09zmw:APA91bH0IBY4W5GS25dBZZpekhDuiemkmYaiKoCuJeQ8zDaiHw1Q-bapYaIcZ3tJJn772uMVonWrttV_-7TiTxYcT_NxsjQa95xjIwGPH3OPfpUDyz4iAkoonvOuVKFuQ2LIoXaifvsT', 0, 1634543468, 1634543468, '2021-10-18 07:51:08', '2021-10-18 07:51:08'),
(1020, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzQ3MjMwMjh9.6F9NmxrXkukNWdzQb19YGn2MWB8S0cwrg8WovAtoXps', 1634723028, 'cIXlrQFzR862AaIO3nadYm:APA91bFKQSKGwe3Ew8CuZtAg_Df2SxpJK6xHsXxiBKBnSy42GUHOeG_9hVLhlKrcW3yol1IfIUqEteLrKk5Pz26-oUMftuvH0egFT_4GZOAxLcGCjs7UXR-8Cf6H6uqREwwLiMSMSz4b', 0, 1634723028, 1634723028, '2021-10-20 09:43:48', '2021-10-20 09:43:48'),
(1024, 42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0MiwiZW1haWwiOiJzZWxsZXJhZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNjM0NzI3NTE0fQ.ax52dRldbFmq7WN63i7nibOi3lo3JqUiKrsrlyM6Gkk', 1634727514, 'eG9ByF5nukW_r7PWy4iyAl:APA91bEIXuRPzZUxW4LzQHx_hWGHufnTRvWnYOxawnUcL0X12LyCnqN14MWEumwWn8bRRvAwQD-mwEvJJJT9yZW8W04TD61XQG4m7z6cUHZK0c374avgKQwkg0ceDRJ9H8AfEevQpYV7', 0, 1634727514, 1634727514, '2021-10-20 10:58:34', '2021-10-20 10:58:34'),
(1025, 42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0MiwiZW1haWwiOiJzZWxsZXJhZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNjM0NzI3NjQ5fQ.yBJur-KFlcZUC1aF0nF4eA_Osjzf_qMkONI5E1Sdob0', 1634727649, 'cwuMHnnQTiaptq4Fyse1xL:APA91bEjfyXzGFEgsPDLseWLOFUz2j7o_0bn41geJZzN8dSsJG7MszafP-WYxZNMBK7dJ78kT54yGaC_6YUB_o4YKk69slWvAQlKUSs3MkfY3nhPrrznKr2hyOYnGtQ4pLSX5Kkkaajx', 0, 1634727649, 1634727649, '2021-10-20 11:00:49', '2021-10-20 11:00:49'),
(1026, 222, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjIsImVtYWlsIjoiZ2F1cmF2MUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzQ3Mjc5MDN9.RHyAVBjO9DsX5MCsZmgbIOU7rF74QcoRNdZOc0dZUTQ', 1634727903, '13131a32d123sa1', 0, 1634727903, 1634727903, '2021-10-20 11:05:03', '2021-10-20 11:05:03'),
(1028, 42, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjo0MiwiZW1haWwiOiJzZWxsZXJhZG1pbkBnbWFpbC5jb20ifSwiaWF0IjoxNjM0NzI3OTY5fQ.xnu6HMkBH0bfhmmgof4dcvzrWPlzkR9IdNNZ6eYBrAk', 1634727969, 'dD3jR2g7SmKYrcVRGnV-yl:APA91bGP4DBbqrZXpkT6QOQYT1JxgqJL4hK3bNaNEvcOIr0_aklomKU_Dfl1xpz5nfcOC3s0UtnF8HZUr1SkpRl4u6_mlC72dOKU7QvXIW9pvDRF_WYoEpsUmTc0y556ByJPOWoZxDlU', 0, 1634727970, 1634727970, '2021-10-20 11:06:09', '2021-10-20 11:06:09'),
(1029, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzQ3MjgwMTB9.rxOVmDMYUgFQ2HrffeKSWKRj0lQXCwkE56YU7Tan3rQ', 1634728010, 'fta7YT9CSdWi2p3zhvvKO5:APA91bHv2TR9wCyfEtYodDZuTH4f6UWhubcQ5kgMUF3ME65cQ6fNPzo81Ui1wn6VG0t_ZZpgtF7wInEip-_gkzMx2P1LsTo_E419htN8lMqHkZDJtbomQ8GO9ZWfnAxbLydmlXZOvmJs', 0, 1634728010, 1634728010, '2021-10-20 11:06:50', '2021-10-20 11:06:50'),
(1030, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzQ4OTUzOTh9.cp9j8JqUKiiM4w26KTT3WVoN2ShyUbAVufXBIP9FvO0', 1634895398, 'cgC8Kmt8Rn246hcpiEJTJ4:APA91bEDS2kWxQzxP05owJIPoo5Cj0bC1J_Wm-Uv3fXcJJjURLPILGCjVihXNC9eueR1lvxDxemi3e9Yxrz0kgSlrsB9PiHpClJUUwGt_9MP_wVyW-ctttMS5MRK6eUVH9KC95sV7sd9', 0, 1634895398, 1634895398, '2021-10-22 09:36:38', '2021-10-22 09:36:38'),
(1034, 204, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMDQsImVtYWlsIjoiYXJ1bmdlb3JnZTgxMUBnbWFpbC5jb20ifSwiaWF0IjoxNjM1MDAwNTE5fQ.aqZ7Q1gyjbig8kb09szzTsafGrpEIc9l4dGn7Q3klmo', 1635000519, 'fSDr6qOmQSyWnZNn4wxzgK:APA91bEYA7MBsuFzKJKMVSTnszBUNoDrL6vOaLvbAJSpJdWhZKIIEBMx3JvuGDfgYcn4bm_VKiEw_lZFQ_XniLXzegom2cPVVsAQP5YhuESVbeuhczgTLM9e8wwJK9QWodKyfCfpjreH', 0, 1635000519, 1635000519, '2021-10-23 14:48:39', '2021-10-23 14:48:39'),
(1036, 224, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjQsImVtYWlsIjoiYXJ1bmdlb3JnZTcxMUBnbWFpbC5jb20ifSwiaWF0IjoxNjM1MTIyMDg5fQ.VSAkpS2JinqpCsP2fUl_zfxL8FQAKjnFE7Ku32qB3-Q', 1635122089, 'c9xx1HX4QdSWgCgfJ0qZFn:APA91bE7c4vy3DKhpMwHvoDlZKvMyssxBxPOv2spSvmMJNcDCtLJ9YN9Vd1reFeXMHpicSRScRY-mV6ZUqKLoXI01sZgQzutRKlUphnpukHrv6_gJ_ypUE2iph8zI5qhTKWnMOwoo8om', 0, 1635122090, 1635122090, '2021-10-25 00:34:49', '2021-10-25 00:34:49'),
(1040, 227, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjcsImVtYWlsIjoicmlib3pvbWl0aWMzQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MzUxNTQ2OTN9.t0xSUWDyZElef3kYSo4wC-q3WPIxeMcTL_Xb8zIZry4', 1635154693, 'f1ncIwOvQaCUBWxLMSrD-h:APA91bEbYkMOW8k7sSoVF1wmZEOaizChWA6sJXsM9wEfrUHSjEOrrPE7TUu5yzgvDQADoQ4r6FKmL7p4bxUMNyi_RlFMVRVl88j0XivasgZJyUvTtFuJ27eJ_gLqbRCGXEfftHO9jt2i', 0, 1635154694, 1635154694, '2021-10-25 09:38:13', '2021-10-25 09:38:13'),
(1046, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1NTA2Njg0fQ.Yp-8eiM8uVqKvgiWbNeXS6F4aJ4glcjE-pNbwsKu3hU', 1635506684, 'f563Xe32QqqzuAxRht0Tf2:APA91bGUX2jK7CvadcDd1WJaX8FOS-sISd-GSZs6LKKKT7_t-psI0g60TcAuxsoo11AMTDwADtitjh690aqih017mL2EoqfACxlak8DGsR6Fmg1oxK02PE6C4meL4__fr5Zry2p1AsaO', 0, 1635506684, 1635506684, '2021-10-29 11:24:44', '2021-10-29 11:24:44'),
(1051, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1NTExODY2fQ.1tNlBRbbQx7DIDMwuZIiRx4iFnwrRO_vDy-2d9E9YcY', 1635511866, 'eefBqelsRoClQToADrtDJ9:APA91bFqUmIo8iyfgitGqMZdr70wOtn1-CzPTtbXHHcs_la3Bhpdb5pqtEC4XmMLwKAtizbJidhiw6q4ixV5_-fT57jfJWUXnrjsDx8xVw6r2i4kvcM1Lw8MqtlBfM6MYjMbw1oWys3z', 0, 1635511866, 1635511866, '2021-10-29 12:51:06', '2021-10-29 12:51:06'),
(1052, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1NTEyMDg0fQ.Ns9KXsWcgCE55LYxQKsSBCL5xrWV2fDOGHTx05r7Ies', 1635512084, 'eHZT-_JNQG2qIIkHPy8N2t:APA91bHi7KPnYMdvVn7fvT_cO6zXbf0O8cEx4WQPITjCZvJuH-HcRdPK28Kwg4IMMeE83ne-mrdfp06sXC3fwL-7QMXmBDuae060o56L323dWkL4uHrHQcaCG44HybJGMI3RdtAa1R2p', 0, 1635512084, 1635512084, '2021-10-29 12:54:44', '2021-10-29 12:54:44'),
(1053, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1NTEzODE1fQ.KtG2mG1_UCNB_LAv2Pa7nalrqlZJUc4nZhM42ohuWGo', 1635513815, 'cSfcgV8vT2iToNXskCgCM6:APA91bEmApf0N2gRXnV5jRwLCn9Dn-Sci1-R6ABlKA0yihZHWor-7WJnk96PfxEIWeaYPQJd_OX4nBD9YG7tlxbQnozQWr-Rzjlau9_FcB6x8VZust-nu0uPNDe57GuCDaNEL5pINKp8', 0, 1635513816, 1635513816, '2021-10-29 13:23:35', '2021-10-29 13:23:35'),
(1056, 228, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMjgsImVtYWlsIjoidmVuMUB5b3BtYWlsLmNvbSJ9LCJpYXQiOjE2MzU1NzIyMDR9.1x37GlkhPDFwK7sqo-XYeNZc69OeVIMqrn1FiIeuDKc', 1635572204, 'dLgVhU82Sh6y8UdIvQiOxz:APA91bHv7-37zb9tUcSpeTJRmpENcmeCLcARGa1xj3PCY89X5dkGzb14v-_rl2S0sLLpij_i6-mrO2sTKB6GaV66y65I7KrHJsmMfiaBgqRfCebUgw26rbsNlyolZCOobWvgxzQStO62', 0, 1635572204, 1635572204, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(1075, 237, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMzcsImVtYWlsIjoicm9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1NTkxNjA0fQ.5XSP3dhwdsuAh8rRF3jw7P-yMgzmv7k18ITpoZWXb-A', 1635591604, 'dizxCUa2QY-8a0iJUpRuTM:APA91bFwUqCA3AL-65bUU4ASisuT4VS3jVZiQY8igK-pAE4GHR6DcJ7hzkYy1FJL57KN0gQc4VQP0BqsxJ6p81Q3IW_SgMtGrchndz8Luzkg4NLlAdrRJiVLUdJWcrGKURQB7I1iLtPU', 0, 1635591604, 1635591604, '2021-10-30 11:00:04', '2021-10-30 11:00:04'),
(1076, 131, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMzEsImVtYWlsIjoiY3Fsc2VsbGVyMDFAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM1ODM2NDcwfQ.2JGRSzoZHEi-N8i0U0ZlGKWGzNVxmecfPFIuXYDkuYQ', 1635836470, 'etZwFtHcTjm3jwmJ3MbbHL:APA91bHl9YBQNKXl86JH46d4vwYaSdC8GBJuVvpo8JIUtdtzzpE2NcRye57h25wlCcpCa-oclfRjV5-9AfsUooR9Qu8Ib1RcyJMGcPcNjEJUHbS917yVTVyRApW3c5SliDd2Rf3pnBy0', 0, 1635836471, 1635836471, '2021-11-02 07:01:10', '2021-11-02 07:01:10'),
(1080, 128, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjgsImVtYWlsIjoiYXJ1bmdlb3JnZTkxMUBnbWFpbC5jb20ifSwiaWF0IjoxNjM2MjgxMjg4fQ.TsYzMQl4PlnwXkBWoqYQFKZrJlQvhfYaRDfUNhblOsw', 1636281288, 'f1cS3JyaTCexgZhWc7eKS3:APA91bHNk7vvcocsZxpqmPzkamLUU_symq-i_fRYnIvTlD4qAI9ip2CBIoRUdPfq_SA7lDVF1_a2Urwq4jWDOulj2aNCfpxHjaXyCYOfGO1XD8CteoKAOCBhOFX0GMqSd2xPFUhwzIr7', 0, 1636281289, 1636281289, '2021-11-07 10:34:48', '2021-11-07 10:34:48'),
(1081, 239, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyMzksImVtYWlsIjoibWFja0BtYWlsLmNvbSJ9LCJpYXQiOjE2MzY0NTgyOTR9.hC1SG_Js46BAl8eKuPQ7avbqi1GdNDf7fAwciAHguCQ', 1636458294, 'dsEqQNYGTaiVZLHuYdrGvi:APA91bHUqSu0SVGZLTaKemGUHQfJWFKcgYccQbbr-v60zkkcYfn0M7lBtY3ktVBXJ-Q-zFOMnDMaIWnyAIXyIwEgl2APxlzjMSIEr2F0xTgWV1_H8Vz9-HOVyVgqLSfK-hIgvq0K4zoY', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(1082, 240, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNDAsImVtYWlsIjoidG9tbXlAbWFpbC5jb20ifSwiaWF0IjoxNjM2NDU5NDY1fQ.odCLomISk3nCOtWz-YVbB2JN6oHaP5JRNQv4Kumw2uw', 1636459465, 'dsEqQNYGTaiVZLHuYdrGvi:APA91bHUqSu0SVGZLTaKemGUHQfJWFKcgYccQbbr-v60zkkcYfn0M7lBtY3ktVBXJ-Q-zFOMnDMaIWnyAIXyIwEgl2APxlzjMSIEr2F0xTgWV1_H8Vz9-HOVyVgqLSfK-hIgvq0K4zoY', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(1083, 241, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNDEsImVtYWlsIjoiamFja3NvbkBnbWFpbC5jb20ifSwiaWF0IjoxNjM2NDYwNDk0fQ.we8NR61P9yt-UYZdy0mm_-mE9mrjpNg2N6qwOb77GCY', 1636460494, 'dsEqQNYGTaiVZLHuYdrGvi:APA91bHUqSu0SVGZLTaKemGUHQfJWFKcgYccQbbr-v60zkkcYfn0M7lBtY3ktVBXJ-Q-zFOMnDMaIWnyAIXyIwEgl2APxlzjMSIEr2F0xTgWV1_H8Vz9-HOVyVgqLSfK-hIgvq0K4zoY', 0, 1636460494, 1636460494, '2021-11-09 12:21:34', '2021-11-09 12:21:34'),
(1085, 242, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoyNDIsImVtYWlsIjoic3R1ZGlvY3JlYXRpdmU5MjVAZ21haWwuY29tIn0sImlhdCI6MTYzNjQ2NDQzMX0.dfY42CYKpPZPRZ2NA6oaO6WOsAyQ42mw0K9hEu8Xp8c', 1636464431, 'emPGQk--T2i74Bzsr3FHBE:APA91bFAvqrCYWl8CB4W_awTMHWVEjK17Uh88Vw9GIrUjv4ijcd-2q0v6F92rYTLHx8pbUs-ZKUPD6E04sS-q0Xz3AhTRQdHHCIL8BL346DDAWQ12UYzO9e2ErvcXLnRv7VoZRcqTxfW', 0, 1636464431, 1636464431, '2021-11-09 13:27:11', '2021-11-09 13:27:11'),
(1087, 185, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxODUsImVtYWlsIjoicHJkcEBnbWFpbC5jb20ifSwiaWF0IjoxNjM2NDY0NDYwfQ.SONADWtQpz8kVKcqjFXGSbIucdCNP21ygiM05ITCCfM', 1636464460, 'dh0A-Ge5Q7O1JFN-CF6SfL:APA91bFlt_EoDuUTS-9gjpveqsklq-4UQP8Rra_ncDWQTn1-87z4Lr3eNk3O4kJEg-hr1n86XHHOkBRwND2Z5VgVhRK24p1wYy4Aq-NreXVMtbVZi_-c3dXkeiuaTnsSUNvKbae29pBD', 0, 1636464460, 1636464460, '2021-11-09 13:27:40', '2021-11-09 13:27:40'),
(1088, 129, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxMjksImVtYWlsIjoibW9oaXRAeW9wbWFpbC5jb20ifSwiaWF0IjoxNjM2NjI4NzEyfQ.-GMgMZPq-tm_5u82R_F8yaN_V2kNyAFp_sBCJUVbwZM', 1636628712, 'cBHquTIEQGCXsB4QeUoIZW:APA91bET4EZbcetCa4RM-mFo17OQQTjuUvPYtYHN5ElGrNezyD8OdDVZVSx-eTDC2hDzb9M_JhxF2-eRLJNpLJ_DvQyGwFuWGgi7EdbY9oSAPMf5QRPED3xXOHyYCqsl2afT-jEgE950', 0, 1636628713, 1636628713, '2021-11-11 11:05:12', '2021-11-11 11:05:12'),
(1089, 166, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxNjYsImVtYWlsIjoicHJkcEBtYWlsLmNvbSJ9LCJpYXQiOjE2MzgxNjUxOTF9.OE496APr-HdB6SGQOfXVZb1jZo_6D5qza80AAS-fnvU', 1638165191, 'eGEO9dUWR4KwnOhF8N31P_:APA91bGQrA6CmF0RpynavWMsg9w3RfS3kUw7zkicff11mBCRgfgCv_YwTKyQiEJvtDxFNOgQlehcobASSMu9Ka0lWPlstkIPUmUxIj9bhzPf69DZUiWSMPVTNXdpJIyoish828B-ntR8', 0, 1638165192, 1638165192, '2021-11-29 05:53:12', '2021-11-29 05:53:12');

-- --------------------------------------------------------

--
-- Table structure for table `vendorBannerImages`
--

CREATE TABLE `vendorBannerImages` (
  `id` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorBannerImages`
--

INSERT INTO `vendorBannerImages` (`id`, `vendorId`, `image`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(3, 42, 'e2efd901-8741-4350-9079-d2871ff4e891.png', 1619536874, 1619536874, '2021-04-27 15:21:13', '2021-04-27 15:21:13'),
(4, 42, '4b1c30a9-e27f-41c2-ba9f-5504cf0c03b1.png', 1619536874, 1619536874, '2021-04-27 15:21:13', '2021-04-27 15:21:13');

-- --------------------------------------------------------

--
-- Table structure for table `vendorDeliveryCharges`
--

CREATE TABLE `vendorDeliveryCharges` (
  `id` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `minDistance` smallint(6) NOT NULL,
  `maxDistance` smallint(6) NOT NULL,
  `price` decimal(9,2) NOT NULL,
  `noDelivery` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `freeDelivery` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorDeliveryCharges`
--

INSERT INTO `vendorDeliveryCharges` (`id`, `vendorId`, `minDistance`, `maxDistance`, `price`, `noDelivery`, `freeDelivery`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(111, 95, 0, 5, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(112, 95, 5, 10, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(113, 95, 10, 15, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(114, 95, 15, 20, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(115, 95, 20, 25, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(116, 95, 25, 30, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(117, 95, 30, 35, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(118, 95, 35, 40, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(119, 95, 40, 45, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(120, 95, 45, 50, '0.00', 0, 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(131, 97, 0, 5, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(132, 97, 5, 10, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(133, 97, 10, 15, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(134, 97, 15, 20, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(135, 97, 20, 25, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(136, 97, 25, 30, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(137, 97, 30, 35, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(138, 97, 35, 40, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(139, 97, 40, 45, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(140, 97, 45, 50, '0.00', 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(141, 98, 0, 5, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(142, 98, 5, 10, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(143, 98, 10, 15, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(144, 98, 15, 20, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(145, 98, 20, 25, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(146, 98, 25, 30, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(147, 98, 30, 35, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(148, 98, 35, 40, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(149, 98, 40, 45, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(150, 98, 45, 50, '0.00', 0, 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(151, 99, 0, 5, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(152, 99, 5, 10, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(153, 99, 10, 15, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(154, 99, 15, 20, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(155, 99, 20, 25, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(156, 99, 25, 30, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(157, 99, 30, 35, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(158, 99, 35, 40, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(159, 99, 40, 45, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(160, 99, 45, 50, '0.00', 0, 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(161, 103, 0, 5, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(162, 103, 5, 10, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(163, 103, 10, 15, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(164, 103, 15, 20, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(165, 103, 20, 25, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(166, 103, 25, 30, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(167, 103, 30, 35, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(168, 103, 35, 40, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(169, 103, 40, 45, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(170, 103, 45, 50, '0.00', 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(171, 107, 0, 5, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(172, 107, 5, 10, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(173, 107, 10, 15, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(174, 107, 15, 20, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(175, 107, 20, 25, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(176, 107, 25, 30, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(177, 107, 30, 35, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(178, 107, 35, 40, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(179, 107, 40, 45, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(180, 107, 45, 50, '0.00', 0, 0, 1612182436, 1612182436, '2021-02-01 12:27:16', '2021-02-01 12:27:16'),
(211, 111, 0, 5, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(212, 111, 5, 10, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(213, 111, 10, 15, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(214, 111, 15, 20, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(215, 111, 20, 25, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(216, 111, 25, 30, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(217, 111, 30, 35, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(218, 111, 35, 40, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(219, 111, 40, 45, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(220, 111, 45, 50, '0.00', 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(221, 112, 0, 5, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(222, 112, 5, 10, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(223, 112, 10, 15, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(224, 112, 15, 20, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(225, 112, 20, 25, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(226, 112, 25, 30, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(227, 112, 30, 35, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(228, 112, 35, 40, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(229, 112, 40, 45, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(230, 112, 45, 50, '0.00', 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(231, 113, 0, 5, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(232, 113, 5, 10, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(233, 113, 10, 15, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(234, 113, 15, 20, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(235, 113, 20, 25, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(236, 113, 25, 30, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(237, 113, 30, 35, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(238, 113, 35, 40, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(239, 113, 40, 45, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(240, 113, 45, 50, '0.00', 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(241, 114, 0, 5, '10.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(242, 114, 5, 10, '25.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(243, 114, 10, 15, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(244, 114, 15, 20, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(245, 114, 20, 25, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(246, 114, 25, 30, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(247, 114, 30, 35, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(248, 114, 35, 40, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(249, 114, 40, 45, '0.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(250, 114, 45, 50, '10.00', 0, 0, 1614585829, 1614599488, '2021-03-01 08:03:48', '2021-03-01 11:51:28'),
(271, 115, 0, 5, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(272, 115, 5, 10, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(273, 115, 10, 15, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(274, 115, 15, 20, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(275, 115, 20, 25, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(276, 115, 25, 30, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(277, 115, 30, 35, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(278, 115, 35, 40, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(279, 115, 40, 45, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(280, 115, 45, 50, '20.00', 10, 10, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(281, 42, 0, 5, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(282, 42, 5, 10, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(283, 42, 10, 15, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(284, 42, 15, 20, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(285, 42, 20, 25, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(286, 42, 25, 30, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(287, 42, 30, 35, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(288, 42, 35, 40, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(289, 42, 40, 45, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(290, 42, 45, 50, '20.00', 10, 10, 1615210670, 1615210670, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(301, 116, 0, 5, '20.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(302, 116, 5, 10, '0.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(303, 116, 10, 15, '0.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(304, 116, 15, 20, '0.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(305, 116, 20, 25, '0.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(306, 116, 25, 30, '0.00', 10, 1, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(307, 116, 30, 35, '10.00', 10, 0, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(308, 116, 35, 40, '15.00', 10, 0, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(309, 116, 40, 45, '18.00', 10, 0, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(310, 116, 45, 50, '20.00', 10, 0, 1615282543, 1615282543, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(311, 120, 0, 5, '3.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(312, 120, 5, 10, '2.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(313, 120, 10, 15, '3.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(314, 120, 15, 20, '4.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(315, 120, 20, 25, '5.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(316, 120, 25, 30, '6.00', 0, 0, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(317, 120, 30, 35, '7.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(318, 120, 35, 40, '2.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(319, 120, 40, 45, '1.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(320, 120, 45, 50, '9.00', 0, 1, 1620205611, 1620205611, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(321, 123, 0, 5, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(322, 123, 5, 10, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(323, 123, 10, 15, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(324, 123, 15, 20, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(325, 123, 20, 25, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(326, 123, 25, 30, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(327, 123, 30, 35, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(328, 123, 35, 40, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(329, 123, 40, 45, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(330, 123, 45, 50, '0.00', 0, 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(371, 130, 0, 5, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(372, 130, 5, 10, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(373, 130, 10, 15, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(374, 130, 15, 20, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(375, 130, 20, 25, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(376, 130, 25, 30, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(377, 130, 30, 35, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(378, 130, 35, 40, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(379, 130, 40, 45, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(380, 130, 45, 50, '0.00', 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(391, 134, 0, 5, '500.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(392, 134, 5, 10, '1000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(393, 134, 10, 15, '2000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(394, 134, 15, 20, '3000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(395, 134, 20, 25, '4000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(396, 134, 25, 30, '5000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(397, 134, 30, 35, '6000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(398, 134, 35, 40, '7000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(399, 134, 40, 45, '8000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(400, 134, 45, 50, '10000.00', 0, 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(411, 137, 0, 5, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(412, 137, 5, 10, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(413, 137, 10, 15, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(414, 137, 15, 20, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(415, 137, 20, 25, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(416, 137, 25, 30, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(417, 137, 30, 35, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(418, 137, 35, 40, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(419, 137, 40, 45, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(420, 137, 45, 50, '0.00', 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(441, 141, 0, 5, '1.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(442, 141, 5, 10, '2.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(443, 141, 10, 15, '3.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(444, 141, 15, 20, '4.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(445, 141, 20, 25, '5.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(446, 141, 25, 30, '6.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(447, 141, 30, 35, '7.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(448, 141, 35, 40, '8.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(449, 141, 40, 45, '9.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(450, 141, 45, 50, '10.00', 0, 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(451, 145, 0, 5, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(452, 145, 5, 10, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(453, 145, 10, 15, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(454, 145, 15, 20, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(455, 145, 20, 25, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(456, 145, 25, 30, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(457, 145, 30, 35, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(458, 145, 35, 40, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(459, 145, 40, 45, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(460, 145, 45, 50, '0.00', 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(461, 146, 0, 5, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(462, 146, 5, 10, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(463, 146, 10, 15, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(464, 146, 15, 20, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(465, 146, 20, 25, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(466, 146, 25, 30, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(467, 146, 30, 35, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(468, 146, 35, 40, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(469, 146, 40, 45, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(470, 146, 45, 50, '0.00', 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(471, 147, 0, 5, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(472, 147, 5, 10, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(473, 147, 10, 15, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(474, 147, 15, 20, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(475, 147, 20, 25, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(476, 147, 25, 30, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(477, 147, 30, 35, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(478, 147, 35, 40, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(479, 147, 40, 45, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(480, 147, 45, 50, '0.00', 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(481, 148, 0, 5, '1.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(482, 148, 5, 10, '2.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(483, 148, 10, 15, '3.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(484, 148, 15, 20, '4.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(485, 148, 20, 25, '5.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(486, 148, 25, 30, '6.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(487, 148, 30, 35, '7.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(488, 148, 35, 40, '8.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(489, 148, 40, 45, '9.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(490, 148, 45, 50, '10.00', 0, 0, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(491, 149, 0, 5, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(492, 149, 5, 10, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(493, 149, 10, 15, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(494, 149, 15, 20, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(495, 149, 20, 25, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(496, 149, 25, 30, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(497, 149, 30, 35, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(498, 149, 35, 40, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(499, 149, 40, 45, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(500, 149, 45, 50, '0.00', 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(501, 150, 0, 5, '0.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(502, 150, 5, 10, '5.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(503, 150, 10, 15, '5.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(504, 150, 15, 20, '5.00', 0, 0, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(505, 150, 20, 25, '5.00', 0, 0, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(506, 150, 25, 30, '5.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(507, 150, 30, 35, '5.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(508, 150, 35, 40, '5.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(509, 150, 40, 45, '0.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(510, 150, 45, 50, '0.00', 0, 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(511, 152, 0, 5, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(512, 152, 5, 10, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(513, 152, 10, 15, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(514, 152, 15, 20, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(515, 152, 20, 25, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(516, 152, 25, 30, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(517, 152, 30, 35, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(518, 152, 35, 40, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(519, 152, 40, 45, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(520, 152, 45, 50, '0.00', 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(521, 153, 0, 5, '1.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(522, 153, 5, 10, '2.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(523, 153, 10, 15, '3.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(524, 153, 15, 20, '4.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(525, 153, 20, 25, '5.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(526, 153, 25, 30, '6.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(527, 153, 30, 35, '7.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(528, 153, 35, 40, '8.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(529, 153, 40, 45, '9.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(530, 153, 45, 50, '10.00', 0, 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(541, 158, 0, 5, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(542, 158, 5, 10, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(543, 158, 10, 15, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(544, 158, 15, 20, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(545, 158, 20, 25, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(546, 158, 25, 30, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(547, 158, 30, 35, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(548, 158, 35, 40, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(549, 158, 40, 45, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(550, 158, 45, 50, '0.00', 0, 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(551, 131, 0, 5, '1.00', 0, 1, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(552, 131, 5, 10, '5.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(553, 131, 10, 15, '3.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(554, 131, 15, 20, '4.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(555, 131, 20, 25, '5.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(556, 131, 25, 30, '6.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(557, 131, 30, 35, '7.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(558, 131, 35, 40, '8.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(559, 131, 40, 45, '9.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(560, 131, 45, 50, '10.00', 0, 0, 1627642081, 1627642081, '2021-06-29 05:02:48', '2021-07-15 07:53:13'),
(561, 161, 0, 5, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(562, 161, 5, 10, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(563, 161, 10, 15, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(564, 161, 15, 20, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(565, 161, 20, 25, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(566, 161, 25, 30, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(567, 161, 30, 35, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(568, 161, 35, 40, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(569, 161, 40, 45, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(570, 161, 45, 50, '0.00', 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(571, 163, 0, 5, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(572, 163, 5, 10, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(573, 163, 10, 15, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(574, 163, 15, 20, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(575, 163, 20, 25, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(576, 163, 25, 30, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(577, 163, 30, 35, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(578, 163, 35, 40, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(579, 163, 40, 45, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(580, 163, 45, 50, '0.00', 0, 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(581, 164, 0, 5, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(582, 164, 5, 10, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(583, 164, 10, 15, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(584, 164, 15, 20, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(585, 164, 20, 25, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(586, 164, 25, 30, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(587, 164, 30, 35, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(588, 164, 35, 40, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(589, 164, 40, 45, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(590, 164, 45, 50, '0.00', 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(601, 180, 0, 5, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(602, 180, 5, 10, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(603, 180, 10, 15, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(604, 180, 15, 20, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(605, 180, 20, 25, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(606, 180, 25, 30, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(607, 180, 30, 35, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(608, 180, 35, 40, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(609, 180, 40, 45, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(610, 180, 45, 50, '0.00', 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(611, 181, 0, 5, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(612, 181, 5, 10, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(613, 181, 10, 15, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(614, 181, 15, 20, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(615, 181, 20, 25, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(616, 181, 25, 30, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(617, 181, 30, 35, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(618, 181, 35, 40, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(619, 181, 40, 45, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(620, 181, 45, 50, '0.00', 0, 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(621, 183, 0, 5, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(622, 183, 5, 10, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(623, 183, 10, 15, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(624, 183, 15, 20, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(625, 183, 20, 25, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(626, 183, 25, 30, '1.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(627, 183, 30, 35, '10.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(628, 183, 35, 40, '10.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(629, 183, 40, 45, '10.00', 0, 0, 1629711409, 1629711650, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(630, 183, 45, 50, '10.00', 1, 1, 1629711409, 1629711651, '2021-08-19 06:26:28', '2021-08-23 09:40:50'),
(631, 184, 0, 5, '10.00', 0, 0, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(632, 184, 5, 10, '20.00', 0, 0, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(633, 184, 10, 15, '30.00', 0, 0, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(634, 184, 15, 20, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(635, 184, 20, 25, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(636, 184, 25, 30, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(637, 184, 30, 35, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(638, 184, 35, 40, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(639, 184, 40, 45, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(640, 184, 45, 50, '0.00', 0, 1, 1629450617, 1629450617, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(641, 185, 0, 5, '150.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(642, 185, 5, 10, '10.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(643, 185, 10, 15, '0.00', 0, 1, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(644, 185, 15, 20, '5.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(645, 185, 20, 25, '0.00', 0, 1, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(646, 185, 25, 30, '0.00', 0, 1, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(647, 185, 30, 35, '0.00', 0, 1, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(648, 185, 35, 40, '50.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(649, 185, 40, 45, '50.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(650, 185, 45, 50, '70.00', 0, 0, 1634544312, 1634544312, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(651, 186, 0, 5, '1.00', 0, 1, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(652, 186, 5, 10, '0.00', 0, 1, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(653, 186, 10, 15, '2.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(654, 186, 15, 20, '3.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(655, 186, 20, 25, '4.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(656, 186, 25, 30, '5.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(657, 186, 30, 35, '6.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(658, 186, 35, 40, '7.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(659, 186, 40, 45, '8.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(660, 186, 45, 50, '9.00', 0, 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(661, 188, 0, 5, '0.00', 0, 1, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(662, 188, 5, 10, '0.00', 0, 1, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(663, 188, 10, 15, '0.00', 0, 1, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(664, 188, 15, 20, '1.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(665, 188, 20, 25, '2.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(666, 188, 25, 30, '3.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(667, 188, 30, 35, '4.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(668, 188, 35, 40, '5.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(669, 188, 40, 45, '6.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(670, 188, 45, 50, '7.00', 0, 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(671, 189, 0, 5, '0.00', 0, 1, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(672, 189, 5, 10, '0.00', 0, 1, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(673, 189, 10, 15, '1.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(674, 189, 15, 20, '2.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(675, 189, 20, 25, '3.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(676, 189, 25, 30, '4.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(677, 189, 30, 35, '6.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(678, 189, 35, 40, '7.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(679, 189, 40, 45, '8.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(680, 189, 45, 50, '8.00', 0, 0, 1629897912, 1629897912, '2021-08-25 13:18:33', '2021-08-25 13:18:33'),
(681, 190, 0, 5, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(682, 190, 5, 10, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(683, 190, 10, 15, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(684, 190, 15, 20, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(685, 190, 20, 25, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(686, 190, 25, 30, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(687, 190, 30, 35, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(688, 190, 35, 40, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(689, 190, 40, 45, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(690, 190, 45, 50, '0.00', 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(691, 191, 0, 5, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(692, 191, 5, 10, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(693, 191, 10, 15, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(694, 191, 15, 20, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(695, 191, 20, 25, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(696, 191, 25, 30, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(697, 191, 30, 35, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(698, 191, 35, 40, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(699, 191, 40, 45, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(700, 191, 45, 50, '0.00', 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(701, 192, 0, 5, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(702, 192, 5, 10, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(703, 192, 10, 15, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(704, 192, 15, 20, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(705, 192, 20, 25, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(706, 192, 25, 30, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(707, 192, 30, 35, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(708, 192, 35, 40, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(709, 192, 40, 45, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(710, 192, 45, 50, '0.00', 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(711, 193, 0, 5, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(712, 193, 5, 10, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(713, 193, 10, 15, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(714, 193, 15, 20, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(715, 193, 20, 25, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(716, 193, 25, 30, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(717, 193, 30, 35, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(718, 193, 35, 40, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(719, 193, 40, 45, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(720, 193, 45, 50, '0.00', 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(721, 194, 0, 5, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(722, 194, 5, 10, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(723, 194, 10, 15, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(724, 194, 15, 20, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(725, 194, 20, 25, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(726, 194, 25, 30, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(727, 194, 30, 35, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(728, 194, 35, 40, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(729, 194, 40, 45, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(730, 194, 45, 50, '0.00', 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(731, 195, 0, 5, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(732, 195, 5, 10, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(733, 195, 10, 15, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(734, 195, 15, 20, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(735, 195, 20, 25, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(736, 195, 25, 30, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(737, 195, 30, 35, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(738, 195, 35, 40, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(739, 195, 40, 45, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(740, 195, 45, 50, '0.00', 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(741, 196, 0, 5, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(742, 196, 5, 10, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(743, 196, 10, 15, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(744, 196, 15, 20, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(745, 196, 20, 25, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(746, 196, 25, 30, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(747, 196, 30, 35, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(748, 196, 35, 40, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(749, 196, 40, 45, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(750, 196, 45, 50, '0.00', 0, 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(751, 197, 0, 5, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(752, 197, 5, 10, '50.00', 0, 0, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(753, 197, 10, 15, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(754, 197, 15, 20, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(755, 197, 20, 25, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(756, 197, 25, 30, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(757, 197, 30, 35, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(758, 197, 35, 40, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(759, 197, 40, 45, '25.00', 0, 0, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(760, 197, 45, 50, '0.00', 0, 1, 1630654238, 1630654238, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(761, 198, 0, 5, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(762, 198, 5, 10, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(763, 198, 10, 15, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(764, 198, 15, 20, '15.00', 0, 0, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(765, 198, 20, 25, '37.00', 0, 0, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(766, 198, 25, 30, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(767, 198, 30, 35, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(768, 198, 35, 40, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(769, 198, 40, 45, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01');
INSERT INTO `vendorDeliveryCharges` (`id`, `vendorId`, `minDistance`, `maxDistance`, `price`, `noDelivery`, `freeDelivery`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(770, 198, 45, 50, '0.00', 0, 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(771, 200, 0, 5, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(772, 200, 5, 10, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(773, 200, 10, 15, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(774, 200, 15, 20, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(775, 200, 20, 25, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(776, 200, 25, 30, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(777, 200, 30, 35, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(778, 200, 35, 40, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(779, 200, 40, 45, '0.00', 0, 1, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(780, 200, 45, 50, '1.00', 0, 0, 1631020376, 1631020376, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(781, 202, 0, 5, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(782, 202, 5, 10, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(783, 202, 10, 15, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(784, 202, 15, 20, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(785, 202, 20, 25, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(786, 202, 25, 30, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(787, 202, 30, 35, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(788, 202, 35, 40, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(789, 202, 40, 45, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(790, 202, 45, 50, '0.00', 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(791, 203, 0, 5, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(792, 203, 5, 10, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(793, 203, 10, 15, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(794, 203, 15, 20, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(795, 203, 20, 25, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(796, 203, 25, 30, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(797, 203, 30, 35, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(798, 203, 35, 40, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(799, 203, 40, 45, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(800, 203, 45, 50, '0.00', 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(801, 212, 0, 5, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(802, 212, 5, 10, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(803, 212, 10, 15, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(804, 212, 15, 20, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(805, 212, 20, 25, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(806, 212, 25, 30, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(807, 212, 30, 35, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(808, 212, 35, 40, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(809, 212, 40, 45, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(810, 212, 45, 50, '0.00', 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(851, 226, 0, 5, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(852, 226, 5, 10, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(853, 226, 10, 15, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(854, 226, 15, 20, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(855, 226, 20, 25, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(856, 226, 25, 30, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(857, 226, 30, 35, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(858, 226, 35, 40, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(859, 226, 40, 45, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(860, 226, 45, 50, '0.00', 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(861, 227, 0, 5, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(862, 227, 5, 10, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(863, 227, 10, 15, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(864, 227, 15, 20, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(865, 227, 20, 25, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(866, 227, 25, 30, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(867, 227, 30, 35, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(868, 227, 35, 40, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(869, 227, 40, 45, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(870, 227, 45, 50, '0.00', 0, 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(871, 228, 0, 5, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(872, 228, 5, 10, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(873, 228, 10, 15, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(874, 228, 15, 20, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(875, 228, 20, 25, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(876, 228, 25, 30, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(877, 228, 30, 35, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(878, 228, 35, 40, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(879, 228, 40, 45, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(880, 228, 45, 50, '0.00', 0, 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(881, 229, 0, 5, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(882, 229, 5, 10, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(883, 229, 10, 15, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(884, 229, 15, 20, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(885, 229, 20, 25, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(886, 229, 25, 30, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(887, 229, 30, 35, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(888, 229, 35, 40, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(889, 229, 40, 45, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(890, 229, 45, 50, '0.00', 0, 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(891, 230, 0, 5, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(892, 230, 5, 10, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(893, 230, 10, 15, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(894, 230, 15, 20, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(895, 230, 20, 25, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(896, 230, 25, 30, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(897, 230, 30, 35, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(898, 230, 35, 40, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(899, 230, 40, 45, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(900, 230, 45, 50, '0.00', 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(901, 231, 0, 5, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(902, 231, 5, 10, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(903, 231, 10, 15, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(904, 231, 15, 20, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(905, 231, 20, 25, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(906, 231, 25, 30, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(907, 231, 30, 35, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(908, 231, 35, 40, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(909, 231, 40, 45, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(910, 231, 45, 50, '0.00', 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(911, 232, 0, 5, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(912, 232, 5, 10, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(913, 232, 10, 15, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(914, 232, 15, 20, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(915, 232, 20, 25, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(916, 232, 25, 30, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(917, 232, 30, 35, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(918, 232, 35, 40, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(919, 232, 40, 45, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(920, 232, 45, 50, '0.00', 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(921, 233, 0, 5, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(922, 233, 5, 10, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(923, 233, 10, 15, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(924, 233, 15, 20, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(925, 233, 20, 25, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(926, 233, 25, 30, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(927, 233, 30, 35, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(928, 233, 35, 40, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(929, 233, 40, 45, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(930, 233, 45, 50, '0.00', 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(931, 234, 0, 5, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(932, 234, 5, 10, '15.00', 0, 0, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(933, 234, 10, 15, '50.00', 0, 0, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(934, 234, 15, 20, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(935, 234, 20, 25, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(936, 234, 25, 30, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(937, 234, 30, 35, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(938, 234, 35, 40, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(939, 234, 40, 45, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(940, 234, 45, 50, '0.00', 0, 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(941, 235, 0, 5, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(942, 235, 5, 10, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(943, 235, 10, 15, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(944, 235, 15, 20, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(945, 235, 20, 25, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(946, 235, 25, 30, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(947, 235, 30, 35, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(948, 235, 35, 40, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(949, 235, 40, 45, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(950, 235, 45, 50, '0.00', 0, 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(951, 236, 0, 5, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(952, 236, 5, 10, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(953, 236, 10, 15, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(954, 236, 15, 20, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(955, 236, 20, 25, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(956, 236, 25, 30, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(957, 236, 30, 35, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(958, 236, 35, 40, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(959, 236, 40, 45, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(960, 236, 45, 50, '0.00', 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(961, 237, 0, 5, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(962, 237, 5, 10, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(963, 237, 10, 15, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(964, 237, 15, 20, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(965, 237, 20, 25, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(966, 237, 25, 30, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(967, 237, 30, 35, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(968, 237, 35, 40, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(969, 237, 40, 45, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(970, 237, 45, 50, '0.00', 0, 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(971, 238, 0, 5, '5.00', 0, 1, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(972, 238, 5, 10, '10.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(973, 238, 10, 15, '15.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(974, 238, 15, 20, '20.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(975, 238, 20, 25, '25.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(976, 238, 25, 30, '30.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(977, 238, 30, 35, '35.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(978, 238, 35, 40, '40.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(979, 238, 40, 45, '50.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(980, 238, 45, 50, '60.00', 0, 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(981, 239, 0, 5, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(982, 239, 5, 10, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(983, 239, 10, 15, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(984, 239, 15, 20, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(985, 239, 20, 25, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(986, 239, 25, 30, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(987, 239, 30, 35, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(988, 239, 35, 40, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(989, 239, 40, 45, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(990, 239, 45, 50, '0.00', 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(991, 240, 0, 5, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(992, 240, 5, 10, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(993, 240, 10, 15, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(994, 240, 15, 20, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(995, 240, 20, 25, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(996, 240, 25, 30, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(997, 240, 30, 35, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(998, 240, 35, 40, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(999, 240, 40, 45, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(1000, 240, 45, 50, '0.00', 0, 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(1001, 241, 0, 5, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1002, 241, 5, 10, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1003, 241, 10, 15, '200.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1004, 241, 15, 20, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1005, 241, 20, 25, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1006, 241, 25, 30, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:07'),
(1007, 241, 30, 35, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:08'),
(1008, 241, 35, 40, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:08'),
(1009, 241, 40, 45, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:08'),
(1010, 241, 45, 50, '0.00', 0, 0, 1636460494, 1639047848, '2021-11-09 12:21:34', '2021-12-09 11:04:08'),
(1011, 242, 0, 5, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1012, 242, 5, 10, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1013, 242, 10, 15, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1014, 242, 15, 20, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1015, 242, 20, 25, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1016, 242, 25, 30, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1017, 242, 30, 35, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1018, 242, 35, 40, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1019, 242, 40, 45, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01'),
(1020, 242, 45, 50, '0.00', 0, 0, 1636464111, 1639047961, '2021-11-09 13:21:51', '2021-12-09 11:06:01');

-- --------------------------------------------------------

--
-- Table structure for table `vendorDeliveryOptions`
--

CREATE TABLE `vendorDeliveryOptions` (
  `id` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `sortOrder` tinyint(4) NOT NULL,
  `day` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryTimeFrom` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryTimeTo` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `noDelivery` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorDeliveryOptions`
--

INSERT INTO `vendorDeliveryOptions` (`id`, `vendorId`, `sortOrder`, `day`, `deliveryTimeFrom`, `deliveryTimeTo`, `noDelivery`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(78, 95, 1, 'sun', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(79, 95, 2, 'mon', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(80, 95, 3, 'tue', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(81, 95, 4, 'wed', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(82, 95, 5, 'thu', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(83, 95, 6, 'fri', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(84, 95, 7, 'sat', '', '', 0, 1611724102, 1611724102, '2021-01-27 05:08:21', '2021-01-27 05:08:21'),
(92, 97, 1, 'sun', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(93, 97, 2, 'mon', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(94, 97, 3, 'tue', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(95, 97, 4, 'wed', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(96, 97, 5, 'thu', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(97, 97, 6, 'fri', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(98, 97, 7, 'sat', '', '', 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(99, 98, 1, 'sun', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(100, 98, 2, 'mon', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(101, 98, 3, 'tue', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(102, 98, 4, 'wed', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(103, 98, 5, 'thu', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(104, 98, 6, 'fri', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(105, 98, 7, 'sat', '', '', 0, 1611841400, 1611841400, '2021-01-28 13:43:19', '2021-01-28 13:43:19'),
(106, 99, 1, 'sun', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(107, 99, 2, 'mon', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(108, 99, 3, 'tue', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(109, 99, 4, 'wed', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(110, 99, 5, 'thu', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(111, 99, 6, 'fri', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(112, 99, 7, 'sat', '', '', 0, 1611942173, 1611942173, '2021-01-29 17:42:52', '2021-01-29 17:42:52'),
(113, 103, 1, 'sun', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(114, 103, 2, 'mon', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(115, 103, 3, 'tue', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(116, 103, 4, 'wed', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(117, 103, 5, 'thu', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(118, 103, 6, 'fri', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(119, 103, 7, 'sat', '', '', 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(120, 107, 1, 'sun', '7:15 PM', '6:30 PM', 0, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(121, 107, 2, 'mon', '6:15 PM', '6:15 PM', 0, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(122, 107, 3, 'tue', '6:15 PM', '6:15 PM', 1, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(123, 107, 4, 'wed', '6:15 PM', '6:15 PM', 0, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(124, 107, 5, 'thu', '6:15 PM', '6:15 PM', 1, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(125, 107, 6, 'fri', '6:15 PM', '6:15 PM', 0, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(126, 107, 7, 'sat', '6:15 PM', '6:15 PM', 0, 1612182436, 1613560142, '2021-02-01 12:27:16', '2021-02-17 11:09:01'),
(148, 111, 1, 'sun', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(149, 111, 2, 'mon', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(150, 111, 3, 'tue', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(151, 111, 4, 'wed', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(152, 111, 5, 'thu', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(153, 111, 6, 'fri', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(154, 111, 7, 'sat', '', '', 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(155, 112, 1, 'sun', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(156, 112, 2, 'mon', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(157, 112, 3, 'tue', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(158, 112, 4, 'wed', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(159, 112, 5, 'thu', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(160, 112, 6, 'fri', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(161, 112, 7, 'sat', '', '', 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(162, 113, 1, 'sun', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(163, 113, 2, 'mon', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(164, 113, 3, 'tue', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(165, 113, 4, 'wed', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(166, 113, 5, 'thu', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(167, 113, 6, 'fri', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(168, 113, 7, 'sat', '', '', 0, 1614584896, 1614584896, '2021-03-01 07:48:15', '2021-03-01 07:48:15'),
(169, 114, 1, 'sun', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(170, 114, 2, 'mon', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(171, 114, 3, 'tue', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(172, 114, 4, 'wed', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(173, 114, 5, 'thu', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(174, 114, 6, 'fri', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(175, 114, 7, 'sat', '', '', 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(183, 117, 1, 'sun', '06:42 PM', '09:42 PM', 0, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(184, 117, 2, 'mon', '02:00 PM', '09:00 PM', 0, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(185, 117, 3, 'tue', '10:45 PM', '05:00 PM', 1, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(186, 117, 4, 'wed', '04:58 PM', '08:58 PM', 1, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(187, 117, 5, 'thu', '', '', 1, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(188, 117, 6, 'fri', '11:00 PM', '10:00 PM', 0, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(189, 117, 7, 'sat', '', '', 1, 1615201004, 1615201004, '2021-03-02 11:24:23', '2021-03-02 11:24:23'),
(190, 115, 1, 'sun', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(191, 115, 2, 'mon', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(192, 115, 3, 'tue', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(193, 115, 4, 'wed', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(194, 115, 5, 'thu', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(195, 115, 6, 'fri', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(196, 115, 7, 'sat', '65465', '546456', 0, 1614758456, 1614758456, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(197, 42, 1, 'sun', '10:00 AM', '9:00 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(198, 42, 2, 'mon', '6:54 AM', '11:59 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(199, 42, 3, 'tue', '10:00 AM', '10:00 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(200, 42, 4, 'wed', '6:54 AM', '11:59 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(201, 42, 5, 'thu', '6:54 AM', '11:59 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(202, 42, 6, 'fri', '6:54 AM', '11:59 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(203, 42, 7, 'sat', '6:54 AM', '11:59 PM', 0, 1615210670, 1628840485, '2021-01-25 11:21:23', '2021-08-13 07:41:24'),
(204, 116, 1, 'sun', '10:00 PM', '11:55 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(205, 116, 2, 'mon', '09:00 AM', '09:00 PM', 1, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(206, 116, 3, 'tue', '11:00 AM', '09:00 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(207, 116, 4, 'wed', '10:30 AM', '09:30 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(208, 116, 5, 'thu', '03:00 PM', '10:00 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(209, 116, 6, 'fri', '12:00 PM', '10:00 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(210, 116, 7, 'sat', '07:00 PM', '11:00 PM', 0, 1615554746, 1615554746, '2021-01-25 11:21:23', '2021-01-25 11:21:23'),
(211, 120, 1, 'sun', '09:10 AM', '02:10 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(212, 120, 2, 'mon', '09:10 AM', '02:10 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(213, 120, 3, 'tue', '09:10 AM', '02:10 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(214, 120, 4, 'wed', '09:10 AM', '02:11 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(215, 120, 5, 'thu', '09:11 AM', '02:11 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(216, 120, 6, 'fri', '09:11 AM', '02:11 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(217, 120, 7, 'sat', '09:11 AM', '02:11 PM', 0, 1620117797, 1620117797, '2021-05-04 06:58:56', '2021-05-04 06:58:56'),
(218, 123, 1, 'sun', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(219, 123, 2, 'mon', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(220, 123, 3, 'tue', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(221, 123, 4, 'wed', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(222, 123, 5, 'thu', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(223, 123, 6, 'fri', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(224, 123, 7, 'sat', '', '', 0, 1622877725, 1622877725, '2021-06-05 07:22:04', '2021-06-05 07:22:04'),
(253, 130, 1, 'sun', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(254, 130, 2, 'mon', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(255, 130, 3, 'tue', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(256, 130, 4, 'wed', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(257, 130, 5, 'thu', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(258, 130, 6, 'fri', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(259, 130, 7, 'sat', '', '', 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(267, 134, 1, 'sun', '09:00 am', '07:00 pm', 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(268, 134, 2, 'mon', '08:00 am', '09:00 pm', 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(269, 134, 3, 'tue', '09:00 am', '07:00 pm', 0, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(270, 134, 4, 'wed', '', '', 1, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(271, 134, 5, 'thu', '', '', 1, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(272, 134, 6, 'fri', '', '', 1, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(273, 134, 7, 'sat', '', '', 1, 1625553495, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:28:13'),
(281, 137, 1, 'sun', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(282, 137, 2, 'mon', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(283, 137, 3, 'tue', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(284, 137, 4, 'wed', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(285, 137, 5, 'thu', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(286, 137, 6, 'fri', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(287, 137, 7, 'sat', '', '', 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(302, 141, 1, 'sun', '10:34 am', '06:34 pm', 0, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(303, 141, 2, 'mon', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(304, 141, 3, 'tue', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(305, 141, 4, 'wed', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(306, 141, 5, 'thu', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(307, 141, 6, 'fri', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(308, 141, 7, 'sat', '', '', 1, 1626152743, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:03:01'),
(309, 145, 1, 'sun', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(310, 145, 2, 'mon', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(311, 145, 3, 'tue', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(312, 145, 4, 'wed', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(313, 145, 5, 'thu', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(314, 145, 6, 'fri', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(315, 145, 7, 'sat', '', '', 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(316, 146, 1, 'sun', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(317, 146, 2, 'mon', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(318, 146, 3, 'tue', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(319, 146, 4, 'wed', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(320, 146, 5, 'thu', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(321, 146, 6, 'fri', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(322, 146, 7, 'sat', '', '', 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(323, 147, 1, 'sun', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(324, 147, 2, 'mon', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(325, 147, 3, 'tue', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(326, 147, 4, 'wed', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(327, 147, 5, 'thu', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(328, 147, 6, 'fri', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(329, 147, 7, 'sat', '', '', 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(330, 148, 1, 'sun', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(331, 148, 2, 'mon', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(332, 148, 3, 'tue', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(333, 148, 4, 'wed', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(334, 148, 5, 'thu', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(335, 148, 6, 'fri', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(336, 148, 7, 'sat', '', '', 1, 1626330729, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:12:27'),
(337, 149, 1, 'sun', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(338, 149, 2, 'mon', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(339, 149, 3, 'tue', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(340, 149, 4, 'wed', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(341, 149, 5, 'thu', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(342, 149, 6, 'fri', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(343, 149, 7, 'sat', '', '', 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(344, 150, 1, 'sun', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(345, 150, 2, 'mon', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(346, 150, 3, 'tue', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(347, 150, 4, 'wed', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(348, 150, 5, 'thu', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(349, 150, 6, 'fri', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(350, 150, 7, 'sat', '', '', 1, 1626333755, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:11:49'),
(351, 152, 1, 'sun', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(352, 152, 2, 'mon', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(353, 152, 3, 'tue', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(354, 152, 4, 'wed', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(355, 152, 5, 'thu', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(356, 152, 6, 'fri', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(357, 152, 7, 'sat', '', '', 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(358, 153, 1, 'sun', '09:00 AM', '06:00 PM', 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(359, 153, 2, 'mon', '', '', 1, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(360, 153, 3, 'tue', '', '', 1, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(361, 153, 4, 'wed', '', '', 1, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(362, 153, 5, 'thu', '', '', 1, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(363, 153, 6, 'fri', '', '', 1, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(364, 153, 7, 'sat', '11:00 AM', '05:00 PM', 0, 1626420153, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:19:35'),
(372, 158, 1, 'sun', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(373, 158, 2, 'mon', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(374, 158, 3, 'tue', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(375, 158, 4, 'wed', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(376, 158, 5, 'thu', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(377, 158, 6, 'fri', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(378, 158, 7, 'sat', '', '', 0, 1627279739, 1627279739, '2021-07-26 06:08:59', '2021-07-26 06:08:59'),
(515, 131, 1, 'sun', '05:05 pm', '9:00 AM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(519, 131, 2, 'mon', '5:45 PM', '5:45 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(523, 131, 3, 'tue', '5:45 PM', '5:45 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(527, 131, 4, 'wed', '5:45 PM', '5:45 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(531, 131, 5, 'thu', '5:45 PM', '5:45 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(535, 131, 6, 'fri', '4:30 PM', '5:30 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(539, 131, 7, 'sat', '11:00 AM', '6:00 PM', 1, 1627645051, 1627645051, '2021-06-29 05:02:48', '2021-07-29 06:33:01'),
(540, 161, 1, 'sun', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(541, 161, 2, 'mon', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(542, 161, 3, 'tue', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(543, 161, 4, 'wed', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(544, 161, 5, 'thu', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(545, 161, 6, 'fri', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(546, 161, 7, 'sat', '', '', 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(547, 163, 1, 'sun', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(548, 163, 2, 'mon', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(549, 163, 3, 'tue', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(550, 163, 4, 'wed', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(551, 163, 5, 'thu', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(552, 163, 6, 'fri', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(553, 163, 7, 'sat', '', '', 0, 1627975953, 1627975953, '2021-08-03 07:32:32', '2021-08-03 07:32:32'),
(554, 164, 1, 'sun', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(555, 164, 2, 'mon', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(556, 164, 3, 'tue', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(557, 164, 4, 'wed', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(558, 164, 5, 'thu', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(559, 164, 6, 'fri', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(560, 164, 7, 'sat', '', '', 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(568, 180, 1, 'sun', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(569, 180, 2, 'mon', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(570, 180, 3, 'tue', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(571, 180, 4, 'wed', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(572, 180, 5, 'thu', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(573, 180, 6, 'fri', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(574, 180, 7, 'sat', '', '', 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(575, 181, 1, 'sun', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(576, 181, 2, 'mon', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(577, 181, 3, 'tue', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(578, 181, 4, 'wed', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(579, 181, 5, 'thu', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(580, 181, 6, 'fri', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(581, 181, 7, 'sat', '', '', 0, 1628834378, 1628834378, '2021-08-13 05:59:37', '2021-08-13 05:59:37'),
(582, 183, 1, 'sun', '10:00 AM', '6:00 PM', 0, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(583, 183, 2, 'mon', '10:45 AM', '8:00 PM', 0, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(584, 183, 3, 'tue', '7:15 PM', '7:15 PM', 1, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(585, 183, 4, 'wed', '7:15 PM', '7:15 PM', 1, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(586, 183, 5, 'thu', '7:15 PM', '7:15 PM', 1, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(587, 183, 6, 'fri', '7:15 PM', '7:15 PM', 1, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(588, 183, 7, 'sat', '7:15 PM', '7:15 PM', 1, 1630676710, 1630676710, '2021-08-19 06:26:28', '2021-09-03 13:44:35'),
(589, 184, 1, 'sun', '03:09 AM', '07:09 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(590, 184, 2, 'mon', '02:09 AM', '10:09 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(591, 184, 3, 'tue', '04:11 AM', '10:11 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(592, 184, 4, 'wed', '06:18 PM', '09:18 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(593, 184, 5, 'thu', '03:48 PM', '07:48 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(594, 184, 6, 'fri', '02:35 PM', '10:35 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(595, 184, 7, 'sat', '03:35 PM', '10:35 PM', 0, 1629799528, 1629799528, '2021-08-19 07:35:12', '2021-08-19 07:35:12'),
(596, 185, 1, 'sun', '12:26 PM', '09:26 PM', 0, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(597, 185, 2, 'mon', '', '', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(598, 185, 3, 'tue', '', '', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(599, 185, 4, 'wed', '', '', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(600, 185, 5, 'thu', '', '', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(601, 185, 6, 'fri', '', '', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(602, 185, 7, 'sat', '05:51 PM', '11:51 PM', 1, 1629874608, 1629874608, '2021-08-24 12:19:37', '2021-08-24 12:19:37'),
(603, 186, 1, 'sun', '09:30 am', '07:00 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(604, 186, 2, 'mon', '11:00 am', '05:00 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(605, 186, 3, 'tue', '11:30 am', '04:30 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(606, 186, 4, 'wed', '11:30 am', '05:30 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(607, 186, 5, 'thu', '10:00 am', '06:00 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(608, 186, 6, 'fri', '11:00 am', '05:00 pm', 0, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(609, 186, 7, 'sat', '', '', 1, 1629867004, 1629867004, '2021-08-25 04:41:59', '2021-08-25 04:41:59'),
(610, 188, 1, 'sun', '10:30 am', '06:00 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(611, 188, 2, 'mon', '10:00 am', '06:30 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(612, 188, 3, 'tue', '10:30 am', '06:30 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(613, 188, 4, 'wed', '10:30 am', '05:30 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(614, 188, 5, 'thu', '10:00 am', '06:30 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(615, 188, 6, 'fri', '10:00 am', '06:00 pm', 0, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(616, 188, 7, 'sat', '', '', 1, 1629894040, 1629894040, '2021-08-25 12:16:37', '2021-08-25 12:16:37'),
(617, 189, 1, 'sun', '9:30 AM', '7:50 PM', 0, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(618, 189, 2, 'mon', '11:30 AM', '6:30 PM', 0, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(619, 189, 3, 'tue', '10:50 AM', '6:30 PM', 0, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(620, 189, 4, 'wed', '', '', 1, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(621, 189, 5, 'thu', '', '', 1, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(622, 189, 6, 'fri', '', '', 1, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(623, 189, 7, 'sat', '', '', 1, 1629897912, 1629971563, '2021-08-25 13:18:33', '2021-08-26 09:52:43'),
(624, 190, 1, 'sun', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(625, 190, 2, 'mon', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(626, 190, 3, 'tue', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(627, 190, 4, 'wed', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(628, 190, 5, 'thu', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(629, 190, 6, 'fri', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(630, 190, 7, 'sat', '', '', 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(631, 191, 1, 'sun', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(632, 191, 2, 'mon', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(633, 191, 3, 'tue', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(634, 191, 4, 'wed', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(635, 191, 5, 'thu', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(636, 191, 6, 'fri', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(637, 191, 7, 'sat', '', '', 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(638, 192, 1, 'sun', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(639, 192, 2, 'mon', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(640, 192, 3, 'tue', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(641, 192, 4, 'wed', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(642, 192, 5, 'thu', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(643, 192, 6, 'fri', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(644, 192, 7, 'sat', '', '', 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(645, 193, 1, 'sun', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(646, 193, 2, 'mon', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(647, 193, 3, 'tue', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(648, 193, 4, 'wed', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(649, 193, 5, 'thu', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(650, 193, 6, 'fri', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(651, 193, 7, 'sat', '', '', 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(652, 194, 1, 'sun', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(653, 194, 2, 'mon', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(654, 194, 3, 'tue', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(655, 194, 4, 'wed', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(656, 194, 5, 'thu', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(657, 194, 6, 'fri', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(658, 194, 7, 'sat', '', '', 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(659, 195, 1, 'sun', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(660, 195, 2, 'mon', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(661, 195, 3, 'tue', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(662, 195, 4, 'wed', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(663, 195, 5, 'thu', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(664, 195, 6, 'fri', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(665, 195, 7, 'sat', '', '', 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(666, 196, 1, 'sun', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(667, 196, 2, 'mon', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(668, 196, 3, 'tue', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(669, 196, 4, 'wed', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(670, 196, 5, 'thu', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(671, 196, 6, 'fri', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(672, 196, 7, 'sat', '', '', 1, 1630406220, 1630406220, '2021-08-31 09:45:47', '2021-08-31 09:45:47'),
(673, 197, 1, 'sun', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(674, 197, 2, 'mon', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(675, 197, 3, 'tue', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(676, 197, 4, 'wed', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(677, 197, 5, 'thu', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(678, 197, 6, 'fri', '', '', 1, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(679, 197, 7, 'sat', '11:29 AM', '06:29 PM', 0, 1630558819, 1630558819, '2021-09-02 04:58:08', '2021-09-02 04:58:08'),
(680, 198, 1, 'sun', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(681, 198, 2, 'mon', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(682, 198, 3, 'tue', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(683, 198, 4, 'wed', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(684, 198, 5, 'thu', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(685, 198, 6, 'fri', '', '', 1, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(686, 198, 7, 'sat', '12:41 PM', '09:41 PM', 0, 1630566710, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:10:01'),
(687, 200, 1, 'sun', '09:00 am', '06:30 pm', 1, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(688, 200, 2, 'mon', '10:00 am', '06:00 pm', 0, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(689, 200, 3, 'tue', '11:00 am', '05:00 pm', 0, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(690, 200, 4, 'wed', '12:00 pm', '04:00 pm', 0, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(691, 200, 5, 'thu', '', '', 1, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(692, 200, 6, 'fri', '', '', 1, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(693, 200, 7, 'sat', '', '', 1, 1631020320, 1631020320, '2021-09-07 04:59:45', '2021-09-07 04:59:45'),
(694, 202, 1, 'sun', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(695, 202, 2, 'mon', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(696, 202, 3, 'tue', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(697, 202, 4, 'wed', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(698, 202, 5, 'thu', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(699, 202, 6, 'fri', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(700, 202, 7, 'sat', '', '', 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(701, 203, 1, 'sun', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(702, 203, 2, 'mon', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(703, 203, 3, 'tue', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(704, 203, 4, 'wed', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(705, 203, 5, 'thu', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(706, 203, 6, 'fri', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(707, 203, 7, 'sat', '', '', 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(708, 212, 1, 'sun', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(709, 212, 2, 'mon', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(710, 212, 3, 'tue', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(711, 212, 4, 'wed', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(712, 212, 5, 'thu', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(713, 212, 6, 'fri', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(714, 212, 7, 'sat', '', '', 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(743, 226, 1, 'sun', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(744, 226, 2, 'mon', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(745, 226, 3, 'tue', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(746, 226, 4, 'wed', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(747, 226, 5, 'thu', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(748, 226, 6, 'fri', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(749, 226, 7, 'sat', '', '', 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(750, 227, 1, 'sun', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(751, 227, 2, 'mon', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(752, 227, 3, 'tue', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(753, 227, 4, 'wed', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(754, 227, 5, 'thu', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(755, 227, 6, 'fri', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(756, 227, 7, 'sat', '', '', 0, 1635154588, 1635154588, '2021-10-25 09:36:27', '2021-10-25 09:36:27'),
(757, 228, 1, 'sun', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(758, 228, 2, 'mon', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(759, 228, 3, 'tue', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(760, 228, 4, 'wed', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(761, 228, 5, 'thu', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(762, 228, 6, 'fri', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(763, 228, 7, 'sat', '', '', 1, 1635572903, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:36:43'),
(764, 229, 1, 'sun', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(765, 229, 2, 'mon', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(766, 229, 3, 'tue', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(767, 229, 4, 'wed', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(768, 229, 5, 'thu', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(769, 229, 6, 'fri', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(770, 229, 7, 'sat', '', '', 0, 1635577327, 1635577327, '2021-10-30 07:02:07', '2021-10-30 07:02:07'),
(771, 230, 1, 'sun', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(772, 230, 2, 'mon', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(773, 230, 3, 'tue', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(774, 230, 4, 'wed', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(775, 230, 5, 'thu', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(776, 230, 6, 'fri', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(777, 230, 7, 'sat', '', '', 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(778, 231, 1, 'sun', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(779, 231, 2, 'mon', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(780, 231, 3, 'tue', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(781, 231, 4, 'wed', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(782, 231, 5, 'thu', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(783, 231, 6, 'fri', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(784, 231, 7, 'sat', '', '', 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(785, 232, 1, 'sun', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(786, 232, 2, 'mon', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(787, 232, 3, 'tue', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(788, 232, 4, 'wed', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(789, 232, 5, 'thu', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(790, 232, 6, 'fri', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(791, 232, 7, 'sat', '', '', 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(792, 233, 1, 'sun', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(793, 233, 2, 'mon', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(794, 233, 3, 'tue', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(795, 233, 4, 'wed', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(796, 233, 5, 'thu', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(797, 233, 6, 'fri', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(798, 233, 7, 'sat', '', '', 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(799, 234, 1, 'sun', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(800, 234, 2, 'mon', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(801, 234, 3, 'tue', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(802, 234, 4, 'wed', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(803, 234, 5, 'thu', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(804, 234, 6, 'fri', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(805, 234, 7, 'sat', '', '', 1, 1635579908, 1635579908, '2021-10-30 07:42:58', '2021-10-30 07:42:58'),
(806, 235, 1, 'sun', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(807, 235, 2, 'mon', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(808, 235, 3, 'tue', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(809, 235, 4, 'wed', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(810, 235, 5, 'thu', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(811, 235, 6, 'fri', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(812, 235, 7, 'sat', '', '', 0, 1635589545, 1635589545, '2021-10-30 10:25:44', '2021-10-30 10:25:44'),
(813, 236, 1, 'sun', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(814, 236, 2, 'mon', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(815, 236, 3, 'tue', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(816, 236, 4, 'wed', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(817, 236, 5, 'thu', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(818, 236, 6, 'fri', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(819, 236, 7, 'sat', '', '', 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(820, 237, 1, 'sun', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(821, 237, 2, 'mon', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(822, 237, 3, 'tue', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(823, 237, 4, 'wed', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(824, 237, 5, 'thu', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(825, 237, 6, 'fri', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(826, 237, 7, 'sat', '', '', 0, 1635590649, 1635590649, '2021-10-30 10:44:08', '2021-10-30 10:44:08'),
(827, 238, 1, 'sun', '08:00 am', '12:00 pm', 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(828, 238, 2, 'mon', '08:00 am', '12:00 pm', 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(829, 238, 3, 'tue', '08:00 am', '11:00 am', 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(830, 238, 4, 'wed', '08:00 am', '09:00 am', 0, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(831, 238, 5, 'thu', '', '', 1, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(832, 238, 6, 'fri', '', '', 1, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(833, 238, 7, 'sat', '', '', 1, 1636277321, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:21:55'),
(834, 239, 1, 'sun', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(835, 239, 2, 'mon', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(836, 239, 3, 'tue', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(837, 239, 4, 'wed', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(838, 239, 5, 'thu', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(839, 239, 6, 'fri', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(840, 239, 7, 'sat', '', '', 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(841, 240, 1, 'sun', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(842, 240, 2, 'mon', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(843, 240, 3, 'tue', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25');
INSERT INTO `vendorDeliveryOptions` (`id`, `vendorId`, `sortOrder`, `day`, `deliveryTimeFrom`, `deliveryTimeTo`, `noDelivery`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(844, 240, 4, 'wed', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(845, 240, 5, 'thu', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(846, 240, 6, 'fri', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(847, 240, 7, 'sat', '', '', 0, 1636459465, 1636459465, '2021-11-09 12:04:25', '2021-11-09 12:04:25'),
(848, 241, 1, 'sun', '4:45 PM', '4:45 PM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(849, 241, 2, 'mon', '5:45 PM', '5:15 AM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(850, 241, 3, 'tue', '4:45 PM', '4:45 PM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(851, 241, 4, 'wed', '4:45 PM', '4:45 PM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(852, 241, 5, 'thu', '4:45 PM', '4:45 PM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(853, 241, 6, 'fri', '4:45 PM', '4:45 PM', 1, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(854, 241, 7, 'sat', '4:45 PM', '4:45 PM', 0, 1636460494, 1639047807, '2021-11-09 12:21:34', '2021-12-09 11:03:27'),
(855, 242, 1, 'sun', '9:00 AM', '1:15 AM', 1, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(856, 242, 2, 'mon', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(857, 242, 3, 'tue', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(858, 242, 4, 'wed', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(859, 242, 5, 'thu', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(860, 242, 6, 'fri', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22'),
(861, 242, 7, 'sat', '1:15 AM', '1:15 AM', 0, 1636464111, 1637219243, '2021-11-09 13:21:51', '2021-11-18 07:07:22');

-- --------------------------------------------------------

--
-- Table structure for table `vendorDetail`
--

CREATE TABLE `vendorDetail` (
  `id` int(11) NOT NULL,
  `approvalStatus` tinyint(4) NOT NULL COMMENT '0=>pending 1=>pending_more_info 2=>approve 3=>suspend 4=decline',
  `approvalStatusReason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopLogo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopCategory` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shop_category_id` int(11) DEFAULT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abn` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `buildingNumber` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `streetNumber` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `city` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `state` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `country` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `postalCode` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `geoLocation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopOpenTime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopCloseTime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `homeDelivery` tinyint(4) NOT NULL COMMENT '0=>noo 1=>yes',
  `deliveriesPerDay` int(11) NOT NULL,
  `shopAddress` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `shopDescription` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `paymentPolicy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deliveryPolicy` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sellerInformation` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `taxInPercent` tinyint(4) NOT NULL COMMENT '0=>no 1=>yes',
  `taxValue` smallint(6) NOT NULL,
  `bankName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankBranch` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountHolderName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `accountNumber` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bsbNumber` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ifscSwiftCode` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `bankAddress` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `isShopAdded` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `isHomeDeliveryAdded` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `isDeliveryOptionsAdded` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `isDeliveryDaysAdded` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `isDeliveryChargesAdded` tinyint(4) NOT NULL COMMENT '0=>no, 1=>yes',
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorDetail`
--

INSERT INTO `vendorDetail` (`id`, `approvalStatus`, `approvalStatusReason`, `userId`, `name`, `shopName`, `shopLogo`, `image`, `shopCategory`, `shop_category_id`, `phone`, `abn`, `buildingNumber`, `streetNumber`, `city`, `state`, `country`, `postalCode`, `latitude`, `longitude`, `geoLocation`, `shopOpenTime`, `shopCloseTime`, `homeDelivery`, `deliveriesPerDay`, `shopAddress`, `shopDescription`, `paymentPolicy`, `deliveryPolicy`, `sellerInformation`, `taxInPercent`, `taxValue`, `bankName`, `bankBranch`, `accountHolderName`, `accountNumber`, `bsbNumber`, `ifscSwiftCode`, `bankAddress`, `isShopAdded`, `isHomeDeliveryAdded`, `isDeliveryOptionsAdded`, `isDeliveryDaysAdded`, `isDeliveryChargesAdded`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(4, 2, 'Need more documents for license', 42, 'Seller', 'Business', '', 'bd236a67-17a3-4428-9cfc-6b56a2555819.jpg', 'Business Category', 0, '9988998899', '923824', '823', '7', 'mohali', 'ACT', 'india', '160055', '0.00000000', '0.00000000', '1.2', '10: 00 am', '11: 00 pm', 1, 30, '<p>#22 sd</p>', '<p>this is great</p>', 'give', '<p>no GR</p>', '<p>good</p>', 0, 0, 'q', 'q', 'q', 'q', '123331', '', '', 1, 1, 0, 1, 0, 1594027242, 1634728105, '2020-07-06 09:20:41', '2021-10-20 11:08:25'),
(23, 0, '', 95, 'vendor2', 'Business', '', '580f4d1c-0875-4068-b284-6b5177c9c880.png', 'Business Category', 0, '982342412312', '923824', '823', '7', 'New York City', 'New York', 'US', '12418423', '0.00000000', '0.00000000', '', '10: 00 am', '11: 00 pm', 0, 30, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1611724102, 1611732258, '2021-01-27 05:08:21', '2021-01-27 07:24:17'),
(25, 0, '', 97, 'Latest vendor', '', '', '684bfb0e-b228-4d3b-9054-3785e5ce6423.png', '', 0, '8490707640', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1611830070, 1611830070, '2021-01-28 10:34:30', '2021-01-28 10:34:30'),
(26, 0, '', 98, 'Maker vendor', 'Business', 'aa17f507-9968-4c15-948a-1efd4490cb41.jpg', 'a6650697-9833-46e0-ba28-fff39dd3b202.jpg', 'Business Category', 0, '8467046407', '923824', '823', '7', 'New York City', 'New York', 'US', '12418423', '0.00000000', '0.00000000', '', '10: 00 am', '11: 00 pm', 1, 30, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1611841400, 1614072780, '2021-01-28 13:43:19', '2021-02-23 09:33:00'),
(27, 0, '', 99, 'Lohri vendor', 'Michael Business', '9a2a3220-77e7-43e8-aa8e-6108943dfb05.jpg', '5252af4b-3df9-41db-9908-1a8969583092.png', 'Devices', 0, '8040794849', 'AB29292', 'building 6', 'Street 3', 'Kolkata', 'West Bengal', 'India', '840489', '0.00000000', '0.00000000', '', '10:00 AM', '09:00 PM', 1, 50, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1611942173, 1611942475, '2021-01-29 17:42:52', '2021-01-29 17:47:54'),
(28, 0, '', 103, 'USER 121', '', '', '4f2c12d5-49a4-440e-9998-67fa5dbed22b.png', '', 0, '7832412312', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1611945107, 1611945107, '2021-01-29 18:31:47', '2021-01-29 18:31:47'),
(29, 2, '', 107, 'Vendor 121', '', '', '12b5a375-7b4e-4e1f-9a62-100d91314fb5.png', '', 0, '7832410311', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1612182436, 1612849815, '2021-02-01 12:27:16', '2021-02-09 05:50:15'),
(31, 0, '', 111, 'Chick Khurana', '', '', '74bdbe22-82e0-44df-b152-badd0b0a9fee.jpg', '', 0, '8888855566', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1614580990, 1614580990, '2021-03-01 06:43:10', '2021-03-01 06:43:10'),
(32, 0, '', 112, 'vs', '', '', '4d52dbd2-58cd-4c30-94bd-877c3857af18.jpg', '', 0, '1234567890', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1614583607, 1614583607, '2021-03-01 07:26:46', '2021-03-01 07:26:46'),
(33, 0, '', 113, 'Mokke', '', '', '395b8b5c-c72a-46ff-81c8-a209f7c33e24.jpg', '', 0, '8888332255', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1614584896, 1614584896, '2021-03-01 07:48:16', '2021-03-01 07:48:16'),
(34, 0, '', 114, 'sfs', '', '', '5d232323-8715-4c1a-9229-52fe2f50f355.jpg', '', 0, '1234567891', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1614585829, 1614585829, '2021-03-01 08:03:48', '2021-03-01 08:03:48'),
(35, 0, '', 116, 'vs', 'Business', 'ee569d2b-9f68-4b4d-8eb0-b9ae3e332c19.jpg', '3c23e1e2-e65b-4571-a3fd-a5a897c470d5.jpg', 'Business Category', 0, '1234567897', '923824', '823', '7', 'New York City', 'New York', 'US', '1241842300', '0.00000000', '0.00000000', '', '10: 00 am', '11: 00 pm', 1, 30, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1614683632, 1615554746, '2021-03-02 11:13:51', '2021-03-12 13:12:25'),
(36, 2, '', 117, 'vs', 'Raccoon', '98d00316-42ce-4c0f-acbf-cc1146f3fe6a.jpg', 'b1ebaad9-0a47-4f92-9575-64bd188aaef8.jpg', 'Restaraunt', 0, '1234567898', 'ASNNS', '465', 'street 15', 'Mumbai', 'Maharashtra', 'India', '1614161', '0.00000000', '0.00000000', '', '02:57 PM', '08:57 PM', 1, 60, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1614684264, 1622877598, '2021-03-02 11:24:23', '2021-06-05 07:19:58'),
(37, 0, '', 120, 'Manu', 'Bhatia general store', 'e10b4de3-8f49-4efa-b960-bfdac1561ab1.jpg', '77724660-f44c-4e9f-8510-6ff3745e5992.jpg', 'Electronics', 0, '7206578798', 'hh', '123', '124747', 'Ambala', 'Haryana', 'India', '134003', '0.00000000', '0.00000000', '', '09:36 AM', '02:37 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1620111536, 1620205611, '2021-05-04 06:58:56', '2021-05-05 09:06:51'),
(38, 2, '', 123, 'arunvendor', 'Business 1', '', '', 'Electronics', 0, '', '1234564545', '3', 'Ruby Crescent', 'Meridan Plains', 'QLD', '', '4551', '0.00000000', '0.00000000', '', '0800', '1700', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1622877725, 1622877939, '2021-06-05 07:22:04', '2021-06-05 07:25:39'),
(43, 0, '', 130, 'Seller abhinav', '', '', '71746e6c-1033-42b5-9bab-290934aaa130.jpeg', '', 0, '9536818181', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1624883339, 1624883339, '2021-06-28 12:28:58', '2021-06-28 12:28:58'),
(44, 2, '', 131, 'Pardeep Sharma', 'cql businessrrrr', 'd3c940e6-697a-46ec-9c4b-0ff5745959ae.jpeg', '05141559-b635-4583-a0d5-0f8fc29eafd3.jpg', 'Electronics', 0, '9536363681', '123456', '123', '123', 'Mohali', 'QLD', 'India', '247001', '30.73331480', '76.77941790', 'Chandigarh', '10:00 am', '06:00 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1624942969, 1635852693, '2021-06-29 05:02:48', '2021-11-02 11:31:32'),
(45, 0, '', 134, 'jatin', 'Big bazar', '86c6449c-69b1-4631-b1d0-a7c6f833adc3.jpeg', 'e38ec2e1-4d36-4dbc-94ad-f424cc1034a1.jpeg', 'Grocery', 0, '9878494949', 'jsjejdjd', '19w91', '9191o1', 'punjab', 'punjab', 'india', '98646944', '0.00000000', '0.00000000', '', '09:00 am', '09:00 pm', 1, 100, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1625552893, 1625553495, '2021-07-06 06:28:13', '2021-07-06 06:38:14'),
(47, 0, '', 137, 'admin1', '', '', 'acb4a0fe-857c-4b60-b74a-6283c058b95f.jpg', '', 0, '1234567896', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1625932203, 1625932203, '2021-07-10 15:50:03', '2021-07-10 15:50:03'),
(50, 0, '', 141, 'Mohit vendor', 'Mohit Vending shop', '954b4d8c-d7e5-46f5-9a1d-9ae3a0176451.jpeg', '51df40b1-9688-4c5b-927c-7a2db516a3b5.jpeg', 'Restaraunt', 0, '9536818170', '748596', '1234', '12', 'mohali', 'Punjab', 'India', '160055', '0.00000000', '0.00000000', '', '10:00 am', '07:00 pm', 1, 20, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1626152581, 1626152743, '2021-07-13 05:03:01', '2021-07-13 05:05:42'),
(51, 0, '', 145, 'Varun vendor', '', '', '', '', 0, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1626248993, 1626248993, '2021-07-14 07:49:53', '2021-07-14 07:49:53'),
(52, 0, '', 146, 'xcc', '', '', 'f439f7d7-b6f0-43ea-beeb-3c5ee773cc69.jpg', '', 0, '1234567856', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1626273400, 1626273400, '2021-07-14 14:36:40', '2021-07-14 14:36:40'),
(53, 0, '', 147, 'bxb', '', '', '3b29d2ab-8af4-4a53-ac7f-86c6721644a3.jpg', '', 0, '1234567995', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1626274462, 1626274462, '2021-07-14 14:54:21', '2021-07-14 14:54:21'),
(54, 0, '', 148, 'Rohit Vendor', 'Rohit general store', '30a8dbd3-ddf2-4e0a-bfa4-5b7aadde4b3a.jpg', '5365d4ec-a1ca-4f58-8678-309ad1d8aabf.jpeg', 'Grocery', 0, '9584758695', '74859685741', 'D199', 'Quark street', 'Mohali', 'TAS', 'india', '475869', '0.00000000', '0.00000000', '', '12:01 PM', '08:30 PM', 1, 1, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1626329547, 1626330729, '2021-07-15 06:12:27', '2021-07-15 06:32:09'),
(55, 0, '', 149, 'gourav', '', '', '1e835823-bbc3-4140-ae0a-d09f9429bc74.jpg', '', 0, '8574142536', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1626331109, 1626331109, '2021-07-15 06:38:29', '2021-07-15 06:38:29'),
(56, 0, '', 150, 'ashima', 'ashima genral store', '1ea7156a-6f2c-46b6-87d8-17e1f6b8b027.jpeg', '4ff0785f-4dcc-4839-94a7-ec62ab8b6c45.jpeg', 'Gaming', 0, '7584758475', '142536987', '324', 'Daniel strt', 'Melbourne', 'QLD', 'Australia', '142536', '0.00000000', '0.00000000', '', '10:00 AM', '06:00 PM', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1626333110, 1626333755, '2021-07-15 07:11:49', '2021-07-15 07:22:34'),
(57, 0, '', 152, 'Denver', '', '', '4504798c-0d9e-4314-a4c9-786f286adcd6.jpeg', '', 0, '8574963526', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1626419483, 1626419483, '2021-07-16 07:11:23', '2021-07-16 07:11:23'),
(58, 0, '', 153, 'Jack', 'Jack', 'c0e1e352-6c96-4baa-a11c-592292c3764b.jpg', 'd8e423b6-09c9-4ec6-be33-880f17c462d7.jpeg', 'Electronics', 0, '8596352414', '748596', '123', 'New stree', 'Canberra', 'QLD', 'Australia', '748596', '0.00000000', '0.00000000', '', '10:00 AM', '06:00 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1626419976, 1626420153, '2021-07-16 07:19:35', '2021-07-16 07:22:33'),
(60, 2, '', 158, 'John Doe', '', '', '', '', 0, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1627279739, 1627279792, '2021-07-26 06:08:59', '2021-07-26 06:09:52'),
(62, 0, '', 161, 'kanika', '', '', '5b9f97c5-1151-4fac-a01b-3269820e5371.jpg', '', 0, '8708123197', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1627907893, 1627907893, '2021-08-02 12:38:13', '2021-08-02 12:38:13'),
(63, 0, '', 163, 'gagan', 'xyz', '0638909c-0674-4db0-9995-f1db4e755148.jpg', 'aea4db1f-5ff7-4f44-a206-d42bd4d0a609.jpg', 'Restaraunt', 0, '8053212548', '5555556', '5', '4', 'London', 'ACT', 'uk', '53633568', '0.00000000', '0.00000000', '', '05:07 AM', '04:07 PM', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1627975953, 1627976270, '2021-08-03 07:32:32', '2021-08-03 07:37:49'),
(64, 0, '', 164, 'jack', '', '', 'b387dc99-3ce7-40e4-86d8-ee610c199a09.jpg', '', 0, '9592538653', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1628155023, 1628155023, '2021-08-05 09:17:03', '2021-08-05 09:17:03'),
(66, 0, '', 180, 'check one', '', '', '2fdff410-8e1c-4ec6-8bce-2acbf41a7257.jpg', '', 0, '9911443355', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1628834246, 1628834246, '2021-08-13 05:57:25', '2021-08-13 05:57:25'),
(67, 0, '', 181, 'roman', 'footart', '964622fe-dd12-4a0c-831d-062dcb017bc8.jpg', '1e3ab8f4-8a2e-40ac-85fd-c6689c95bf83.jpg', 'Kids', 0, '8054555657', '13224', '25', 'tork', 'geneva', 'TAS', 'india', '145045', '0.00000000', '0.00000000', '', '12:00 PM', '05:31 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1628834378, 1628834945, '2021-08-13 05:59:37', '2021-08-13 06:09:05'),
(68, 2, '', 183, 'Ravneet Seller', 'Shop Ravneet', '07f81d1b-06c5-4602-a502-3a12ab23d5be.jpeg', 'e319bcf1-da59-4f98-b6f7-1c3bbbd2a472.jpeg', 'Electronics', 0, '7526893594', '123456', '133', 'new street', 'mohali', 'QLD', 'India', '478569', '0.00000000', '0.00000000', '', '10:00 am', '06:00 pm', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629354389, 1630676710, '2021-08-19 06:26:28', '2021-09-08 07:13:21'),
(69, 0, '', 184, 'Pardeep Sharma', 'Business1', '1adc852b-52b5-4202-9cca-d42cc0c226de.jpg', 'c0b67a3e-bffa-4150-9398-c9728bfa1b08.jpg', 'Business Category', 0, '9910806071', '923824', '823', '7', 'New York City', 'QLD', 'US', '12418423', '0.00000000', '0.00000000', '', '10: 00 am', '11: 00 pm', 1, 30, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629358512, 1629799528, '2021-08-19 07:35:12', '2021-08-24 10:05:28'),
(70, 0, '', 185, 'pardeep', 'all', 'd10005b7-4e89-4c2f-94d5-3845284639a9.jpg', '332723c2-6ae4-4195-93a7-b2c809303533.jpg', 'Grocery', 0, '9911223344', '122345', '85', 'german vazi', 'tokyo', 'QLD', 'japan', '145236', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '05:51 PM', '10:51 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629807577, 1636617600, '2021-08-24 12:19:37', '2021-11-11 07:59:59'),
(71, 2, '', 186, 'Ashima', 'Ashima', '24f7908f-3aee-4430-9642-e53dfb12c933.jpeg', '3fd6cad9-a0da-40d5-a60b-baf35b5eb4c0.jpeg', 'Gaming', 0, '9536818160', '745326', '123', 'Bacons', 'Mohali', 'QLD', 'India', '142536', '0.00000000', '0.00000000', '', '10:00 am', '06:30 pm', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629866520, 1629877526, '2021-08-25 04:41:59', '2021-08-25 07:45:25'),
(72, 2, '', 188, 'Sukhi', 'Alshu', '03dd095a-9b87-4bdc-8efc-a143df1426b4.jpeg', 'adb2e461-27d5-4c0d-af02-be4f43e9c70d.jpeg', 'Electronics', 0, '9536816097', '748521', '123456', 'Street best', 'Mohali', 'NSW', 'India', '247665', '0.00000000', '0.00000000', '', '10:00 am', '06:30 pm', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629893798, 1629897309, '2021-08-25 12:16:37', '2021-08-25 13:15:09'),
(73, 2, '', 189, 'sukhi1', 'Sukhi Shop', '92acbf69-2ae5-4c57-9515-07db37854154.jpeg', '0f4e5e11-05b1-44af-9e86-b49e3bc601a0.jpeg', 'Electronics', 0, '9856322541', '475632', '123', 'Durban street', 'mohali', 'QLD', 'india', '574869', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '10:00 am', '06:30 pm', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1629897513, 1629964424, '2021-08-25 13:18:33', '2021-08-26 07:53:43'),
(74, 0, '', 190, 'Gaurav', '', '', '184cf93b-c3d5-49c7-8cc4-425575da34cb.jpg', '', 0, '9536585858', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1629984070, 1629984070, '2021-08-26 13:21:09', '2021-08-26 13:21:09'),
(75, 0, '', 191, 'Cql', '', '', 'a1213ff9-52ef-4202-b90d-681257822600.jpg', '', 0, '9865327845', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1630321713, 1630321713, '2021-08-30 11:08:33', '2021-08-30 11:08:33'),
(76, 0, '', 192, 'john', '', '', '41ec9960-8693-454c-b111-5d035ac9cd42.jpg', '', 0, '9910506070', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1630326558, 1630326558, '2021-08-30 12:29:18', '2021-08-30 12:29:18'),
(77, 0, '', 193, 'testjob', '', '', '66b11e1d-e4ae-45d9-9cc3-9c9e990c8c60.jpg', '', 0, '9888776655', '', '', '', '', '', '', '', '30.82301140', '75.17344710', 'Moga', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1630401239, 1630401239, '2021-08-31 09:13:58', '2021-08-31 09:13:58'),
(78, 0, '', 194, 'jack', '', '', 'e6d1e291-5ca3-4a83-a80d-d082e606ab2c.jpg', '', 0, '9977442266', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1630401665, 1630401665, '2021-08-31 09:21:04', '2021-08-31 09:21:04'),
(79, 0, '', 195, 'sam', '', '', 'ea990e42-1a89-4dca-8985-15e08f0d9449.jpg', '', 0, '9646474849', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1630402282, 1630402282, '2021-08-31 09:31:22', '2021-08-31 09:31:22'),
(80, 0, '', 196, 'james', 'all goods', 'fa33fa58-280e-48b2-a405-698afc74467d.jpg', 'cb1bf146-a545-437e-8694-3d2d959312ca.jpg', 'Groceries', 0, '9988111213', '123', '145', 'sazor road', 'leeds', 'QLD', 'England', '145001', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '04:05 PM', '10:05 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1630403148, 1630474027, '2021-08-31 09:45:47', '2021-09-01 05:27:06'),
(81, 0, '', 197, 'NewUser', 'pardeep', '626ee3f4-a51f-4eeb-9a75-00a82aeabf42.jpg', 'fdc09a22-20bf-4ade-8127-9e8916250f1b.jpg', 'Electronics', 2, '9988304050', '123', '456', 'uttam nagar', 'Amritsar', 'QLD', 'india', '145002', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '10:29 AM', '06:29 PM', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1630558688, 1630654238, '2021-09-02 04:58:08', '2021-09-03 07:30:37'),
(82, 0, '', 198, 'Pardeep Sharma', 'Sharma Store', 'aacd8627-368c-46ab-9345-e731448eb85b.jpg', '469f6229-bb6a-4225-9790-32b548ce947e.jpg', 'hello', 9, '7009847963', '123', '456', 'ram nagar', 'pathankot', 'QLD', 'India', '145001', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '12:40 PM', '07:41 PM', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1630566601, 1630566710, '2021-09-02 07:10:01', '2021-09-02 07:11:49'),
(83, 2, '', 200, 'TestVendor', 'Test vendor', 'e687a356-fed8-4fd9-8ab1-b97cae579276.jpg', 'a777034d-2335-4275-9e82-bdd574be8c21.jpeg', 'Groceries', 1, '9095909536', '142536', '12', 'Test stree', 'mohali', 'QLD', 'india', '201301', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '10:00 am', '06:00 pm', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1630990786, 1631020376, '2021-09-07 04:59:45', '2021-09-07 13:12:55'),
(84, 0, '', 202, 'checkOne', '', '', '8b42d77b-909a-4f49-8cdf-b99941109837.jpg', '', 0, '6263646566', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1631000730, 1631000730, '2021-09-07 07:45:29', '2021-09-07 07:45:29'),
(85, 0, '', 203, 'checktwo', '', '', '12705c14-7f00-4c37-bef1-182733be1966.jpg', '', 0, '6263656667', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1631001213, 1631001213, '2021-09-07 07:53:32', '2021-09-07 07:53:32'),
(86, 0, '', 212, 'vendor2', '', '', '', '', 0, '9823424123121', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1633528594, 1633528594, '2021-10-06 13:56:34', '2021-10-06 13:56:34'),
(91, 0, '', 226, 'tedla', '', '', '6b648ad1-71b9-4233-bd2e-66d17b0b6afc.jpg', '', 0, '5632782355', '', '', '', '', '', '', '', '44.43036700', '26.11486910', 'Cauzasi 50', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635147599, 1635147599, '2021-10-25 07:39:58', '2021-10-25 07:39:58'),
(92, 0, '', 227, 'moko', 'arrza', '9469357a-d279-452f-8ead-a147217dbb10.jpg', 'beb19f38-988d-4a22-9d2d-66a09bbdb208.webp', 'Electronics', 0, '0723473450', '5464', 'Hah', 'gag', 'uah', 'QLD', 'rona', '31254', '44.43036700', '26.11486910', 'Cauzasi 50', '01:10 AM', '06:35 PM', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1635154588, 1635154665, '2021-10-25 09:36:27', '2021-10-25 09:37:45'),
(93, 0, '', 228, 'vendor1', 'testing', '0d0e175d-b8d7-4993-9e1b-e45464e9dba3.jpg', 'df9ca9de-bb32-4e32-a8de-b3975c0cf5bf.jpg', 'Electronics', 2, '9876543222', '123', '123gshsjdk', '32526vjdkdkd', 'mohali', 'SA', 'india', '97846454', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '11:07 am', '02:15 pm', 1, 5, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1635572204, 1635572903, '2021-10-30 05:36:43', '2021-10-30 05:48:23'),
(94, 0, '', 229, 'jack', 'shop', '70a5f9de-365e-414e-a0e0-d31d0095b06e.jpg', 'b75d5c50-8625-4868-b1ae-420d433f5bb9.jpg', 'hello', 0, '8054555659', '12345', '1245', 'ciaz', 'mohali', 'QLD', 'india', '145001', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '06:33 AM', '12:33 PM', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1635577327, 1635577435, '2021-10-30 07:02:07', '2021-10-30 07:03:55'),
(95, 0, '', 230, 'tom', '', '', '6c07b03d-bca4-482f-9db7-99041ee78daf.jpg', '', 0, '7080907070', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635577539, 1635577539, '2021-10-30 07:05:38', '2021-10-30 07:05:38'),
(96, 0, '', 231, 'gf', '', '', '665d2959-6e76-4c3b-ae00-a4c7f5e3d9bc.jpg', '', 0, '8054102030', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635577956, 1635577956, '2021-10-30 07:12:36', '2021-10-30 07:12:36'),
(97, 0, '', 232, 'tom', '', '', 'dd672906-93b1-4171-b935-5672358ba53b.jpg', '', 0, '8054565758', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635579108, 1635579108, '2021-10-30 07:31:47', '2021-10-30 07:31:47'),
(98, 0, '', 233, 'jack', '', '', 'ace2fc56-91ce-414e-9555-4fe640804391.jpg', '', 0, '8070605040', '', '', '', '', '', '', '', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635579548, 1635579548, '2021-10-30 07:39:08', '2021-10-30 07:39:08'),
(99, 0, '', 234, 'tom', 'f', '96290a72-aa4c-48b5-a633-3b7e355770ff.jpg', '74448e9c-ae3e-4737-bf68-a231f67d2147.jpg', 'Electronics', 2, '8054102050', '55', '1457', 'void', 'rome', 'QLD', 'india', '1254', '30.70464860', '76.71787260', 'Sahibzada Ajit Singh Nagar', '01:13 PM', '07:13 PM', 1, 10, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1635579778, 1635852226, '2021-10-30 07:42:58', '2021-11-02 11:23:45'),
(100, 0, '', 235, 'Navi', 'Grocery', '2638b733-406a-4a74-a1a8-b2f6e6d21b72.jpg', 'fefbcaad-5b57-4036-b423-5d6c057a6781.jpg', 'Groceries', 0, '9988552233', '12461', '1929', 'Mohali', 'Mohali', 'SA', 'India', '9894', '30.90096500', '75.85727580', 'Ludhiana', '09:00 am', '08:30 pm', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1635589545, 1635589629, '2021-10-30 10:25:44', '2021-10-30 10:27:08'),
(101, 0, '', 236, 'Nishant', '', '', 'cc99bba4-2cc6-4449-8e16-31ac45c95dab.jpg', '', 0, '7788665544', '', '', '', '', '', '', '', '30.71402850', '76.69094590', 'Cqlsys Technologies Pvt. Ltd', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1635590389, 1635590389, '2021-10-30 10:39:49', '2021-10-30 10:39:49'),
(102, 2, '', 237, 'Rohit', 'Cqlsys', 'f683e0e4-c24a-4027-9f22-21f82b39f7b5.jpeg', 'afe055eb-b2d4-4b12-96b5-c5b67cdf11bb.jpg', 'cql new', 0, '9879494949', '3234', '321', 'Gilco', 'Kharar', 'VIC', 'India', '989449', '30.71402850', '76.69094590', 'Cqlsys Technologies Pvt. Ltd', '09:00 am', '09:00 pm', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1635590649, 1635591586, '2021-10-30 10:44:08', '2021-10-30 10:59:46'),
(103, 2, '', 238, 'Arun George', 'ABT', '3612f3ba-5189-4461-a9b6-93a14ebd37a1.jpg', 'ff25ec4b-0b59-4211-b13f-f4691cafede2.jpg', 'Electronics', 2, '0449658480', '12345678900', '3', 'Ruby Crescent', 'meridan plains', 'QLD', 'Australia', '4551', '-26.77019290', '153.09392990', '3 Ruby Cres', '08:00 am', '05:00 pm', 1, 15, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 1, 0, 1636276915, 1636277321, '2021-11-07 09:21:55', '2021-11-07 09:28:40'),
(104, 0, '', 239, 'jack', '', '', 'e2024ffe-96c2-428d-be20-d0f6af3f819a.jpg', '', 0, '9988102030', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1636458294, 1636458294, '2021-11-09 11:44:53', '2021-11-09 11:44:53'),
(105, 2, '', 240, 'tom', '', '', '31e5b1b0-ca1d-4d3a-990b-ac7d3a61f317.jpg', '', 0, '9988205060', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1636459465, 1639993297, '2021-11-09 12:04:25', '2021-12-20 09:41:37'),
(106, 2, '', 241, 'jacky', 'Cqlsys Technology', '93ede6ff-9467-4b8b-ab88-f852e97b93e0.jpg', '9c22e8f4-bdbd-4557-8203-a9575abfc8e5.jpg', '', 0, '8054102021', '123456', '45612', '7485', 'QLD', 'punjab', '', '1452001', '0.00000000', '0.00000000', '', '05:52 PM', '06:52 PM', 1, 20, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 0, 0, 0, 0, 1636460494, 1639563750, '2021-11-09 12:21:34', '2021-12-15 10:22:30'),
(107, 2, '', 242, 'Ongo November', 'Ongo November Test 1', '11d2c9e4-93de-4945-b5ff-ada1d0bcbf08.jpg', 'ff9815ca-e90f-4773-a107-c06b80cb00d5.jpg', 'Electronics', 0, '0422202370', '1234567890', '3', 'Ruby Crescent', 'Meridan Plains', 'QLD', 'Australia', '4551', '-26.77019290', '153.09392990', '3 Ruby Cres', '08:00 am', '05:00 pm', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 1, 1, 0, 0, 0, 1636464111, 1636478914, '2021-11-09 13:21:51', '2021-11-09 17:28:34'),
(108, 2, '', 247, 'prk', '', '', 'bf668230-679f-11ec-955b-69c46712d3f3.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640669635, 1640677741, '2021-12-28 05:33:55', '2021-12-28 07:49:01'),
(109, 3, 'xyz', 244, 'asd', '', '', '34dca100-67a2-11ec-955b-69c46712d3f3.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640670691, 1640678543, '2021-12-28 05:51:31', '2021-12-28 08:02:22'),
(110, 2, '', 246, 'asdp', '', '', '9cdecca0-67a3-11ec-9aa6-277915ed3995.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640671295, 1640685569, '2021-12-28 06:01:35', '2021-12-28 09:59:28'),
(111, 0, '', 0, 'a', '', '', '6152b230-67af-11ec-9b50-c947dd5621db.jpg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640676349, 1640676349, '2021-12-28 07:25:49', '2021-12-28 07:25:49'),
(112, 2, '', 250, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640686012, 1640686021, '2021-12-28 10:06:52', '2021-12-28 10:07:01'),
(113, 0, '', 251, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640696322, 1640696322, '2021-12-28 12:58:41', '2021-12-28 12:58:41'),
(114, 0, '', 252, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640696540, 1640696540, '2021-12-28 13:02:19', '2021-12-28 13:02:19'),
(115, 2, '', 253, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1640696770, 1640765645, '2021-12-28 13:06:10', '2021-12-29 08:14:04'),
(116, 0, '', 254, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641379437, 1641379437, '2022-01-05 10:43:57', '2022-01-05 10:43:57'),
(117, 0, '', 255, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641379638, 1641379638, '2022-01-05 10:47:18', '2022-01-05 10:47:18'),
(118, 0, '', 256, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641381721, 1641381721, '2022-01-05 11:22:01', '2022-01-05 11:22:01'),
(119, 0, '', 257, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641383944, 1641383944, '2022-01-05 11:59:03', '2022-01-05 11:59:03'),
(120, 0, '', 259, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392187, 1641392187, '2022-01-05 14:16:26', '2022-01-05 14:16:26'),
(121, 0, '', 260, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392192, 1641392192, '2022-01-05 14:16:31', '2022-01-05 14:16:31'),
(122, 0, '', 261, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392192, 1641392192, '2022-01-05 14:16:31', '2022-01-05 14:16:31'),
(123, 0, '', 262, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392193, 1641392193, '2022-01-05 14:16:32', '2022-01-05 14:16:32'),
(124, 0, '', 263, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392193, 1641392193, '2022-01-05 14:16:33', '2022-01-05 14:16:33'),
(125, 2, '', 264, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641392361, 1641393106, '2022-01-05 14:19:20', '2022-01-05 14:31:45'),
(126, 0, '', 265, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641393079, 1641393079, '2022-01-05 14:31:19', '2022-01-05 14:31:19'),
(127, 2, '', 266, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641393194, 1641393228, '2022-01-05 14:33:14', '2022-01-05 14:33:48'),
(128, 0, '', 267, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641405320, 1641405320, '2022-01-05 17:55:19', '2022-01-05 17:55:19'),
(129, 2, '', 268, 'Prakhar', '', '', '252884d0-6ed3-11ec-92f8-65505f4685ed.png', '', NULL, '789654213', '', '', '', 'punjab', 'mohali', 'India', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641461191, 1641461490, '2022-01-06 09:26:31', '2022-01-06 09:31:30'),
(130, 0, '', 269, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641472392, 1641472392, '2022-01-06 12:33:11', '2022-01-06 12:33:11'),
(131, 0, '', 270, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641472901, 1641472901, '2022-01-06 12:41:41', '2022-01-06 12:41:41'),
(132, 0, '', 271, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641474731, 1641474731, '2022-01-06 13:12:11', '2022-01-06 13:12:11'),
(133, 0, '', 272, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641476164, 1641476164, '2022-01-06 13:36:04', '2022-01-06 13:36:04'),
(134, 2, 'prakhar', 273, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641532536, 1641532694, '2022-01-07 05:15:36', '2022-01-07 05:18:14'),
(135, 2, '', 274, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641532798, 1641532806, '2022-01-07 05:19:58', '2022-01-07 05:20:06'),
(136, 2, '', 275, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641533732, 1641533748, '2022-01-07 05:35:31', '2022-01-07 05:35:47'),
(137, 2, '', 276, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641548915, 1641548927, '2022-01-07 09:48:34', '2022-01-07 09:48:47'),
(138, 2, '', 277, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641554615, 1641554634, '2022-01-07 11:23:34', '2022-01-07 11:23:54'),
(139, 2, '', 278, '', '', '', '', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641791005, 1641791067, '2022-01-10 05:03:24', '2022-01-10 05:04:27'),
(140, 2, '', 279, 'Abhi', '', '', 'd325fb90-71d4-11ec-85e5-4d7ec9b0d9cb.jpg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641791943, 1641792019, '2022-01-10 05:19:03', '2022-01-10 05:20:18'),
(141, 2, '', 280, 'Vivian', '', '', '39386b80-71de-11ec-85e5-4d7ec9b0d9cb.jpg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641795980, 1641796056, '2022-01-10 06:26:19', '2022-01-10 06:27:36'),
(142, 2, '', 281, 'Abhishek', '', '', '893c0c70-728a-11ec-85e5-4d7ec9b0d9cb.jpg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1641869988, 1641870041, '2022-01-11 02:59:47', '2022-01-11 03:00:40'),
(143, 2, '', 282, 'test44', '', '', '281060d0-a5ad-11ec-83f8-97607fc8499c.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1647492366, 1647492560, '2022-03-17 04:46:06', '2022-03-17 04:49:20'),
(144, 2, '', 427, 'Prakhar', '', '', '2670e280-b0ee-11ec-a685-778a1bb5562d.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1648729744, 1648729775, '2022-03-31 12:29:03', '2022-03-31 12:29:34'),
(145, 2, '', 428, 'Pare shant', '', '', '99c21060-b0ee-11ec-a685-778a1bb5562d.jpg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1648729937, 1648730001, '2022-03-31 12:32:17', '2022-03-31 12:33:21'),
(146, 2, '', 4, 'jatin', '', '', '12ebde70-e16f-11ec-9cf2-f352a5584238.jpeg', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654062772, 1654062807, '2022-06-01 05:52:51', '2022-06-01 05:53:27'),
(147, 2, '', 5, 'pershant', '', '', 'df8ff080-e64f-11ec-9444-f1860a3b9194.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654599127, 1654599164, '2022-06-07 10:52:06', '2022-06-07 10:52:43'),
(148, 0, '', 8, 'hyundai', '', '', 'c4fd9860-e6f6-11ec-b37c-ab04ab38fcea.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654670808, 1654670808, '2022-06-08 06:46:48', '2022-06-08 06:46:48'),
(149, 0, '', 9, 'hyundai', '', '', '66582d30-e6fa-11ec-a87c-dfc8e8dd8373.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654672368, 1654672368, '2022-06-08 07:12:47', '2022-06-08 07:12:47'),
(150, 0, '', 10, 'hyundai', '', '', '7a098720-e6fa-11ec-a87c-dfc8e8dd8373.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654672401, 1654672401, '2022-06-08 07:13:20', '2022-06-08 07:13:20'),
(151, 0, '', 11, 'hyundai', '', '', 'a47d99b0-e6fa-11ec-961d-53b2fec0d95d.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654672472, 1654672472, '2022-06-08 07:14:31', '2022-06-08 07:14:31'),
(152, 0, '', 12, 'pershant', '', '', 'a5cb8100-e6fb-11ec-9990-372c9c279238.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1654672903, 1654672903, '2022-06-08 07:21:43', '2022-06-08 07:21:43'),
(153, 2, '', 16, 'pershant', '', '', 'f08b57f0-edff-11ec-aebd-dfc5b3eb52e9.png', '', NULL, '', '', '', '', '', '', '', '', '0.00000000', '0.00000000', '', '', '', 0, 0, '', '', '', '', '', 0, 0, '', '', '', '', '', '', '', 0, 0, 0, 0, 0, 1655444405, 1655444438, '2022-06-17 05:40:04', '2022-06-17 05:40:38');

-- --------------------------------------------------------

--
-- Table structure for table `vendorShopCategory`
--

CREATE TABLE `vendorShopCategory` (
  `id` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `shopCategoryId` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorShopCategory`
--

INSERT INTO `vendorShopCategory` (`id`, `vendorId`, `shopCategoryId`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(1, 42, 1, 1619533773, 1619533773, '2021-04-27 14:29:33', '2021-04-27 14:29:33'),
(2, 42, 2, 1619533773, 1619533773, '2021-04-27 14:29:33', '2021-04-27 14:29:33'),
(3, 131, 1, 1624952823, 1624952823, '2021-06-29 07:47:02', '2021-06-29 07:47:02'),
(4, 139, 2, 1625964900, 1625964900, '2021-07-11 00:54:59', '2021-07-11 00:54:59'),
(5, 183, 2, 1629711705, 1629711705, '2021-08-23 09:41:44', '2021-08-26 13:19:08'),
(6, 189, 2, 1629711705, 1629711705, '2021-08-23 09:41:44', '2021-08-26 13:19:08'),
(7, 197, 2, 1594104659, 1594104659, '2021-09-02 06:57:38', '2021-09-02 06:57:38'),
(8, 198, 9, 1630566710, 1630566710, '2021-09-02 07:11:49', '2021-09-02 07:11:49'),
(9, 200, 1, 1630990964, 1630990964, '2021-09-07 05:02:43', '2021-09-07 05:02:43'),
(10, 224, 2, 1634994787, 1634994787, '2021-10-23 13:13:06', '2021-10-23 13:13:06'),
(11, 225, 2, 1635002281, 1635002281, '2021-10-23 15:18:01', '2021-10-23 15:18:01'),
(12, 228, 2, 1635572903, 1635572903, '2021-10-30 05:48:23', '2021-10-30 05:48:23'),
(13, 234, 2, 1635579908, 1635579908, '2021-10-30 07:45:07', '2021-10-30 07:45:07'),
(15, 238, 2, 1636277321, 1636277321, '2021-11-07 09:28:40', '2021-11-07 09:28:40'),
(16, 242, 2, 1636470899, 1636470899, '2021-11-09 15:14:58', '2021-11-09 15:14:58');

-- --------------------------------------------------------

--
-- Table structure for table `vendorStaffDetail`
--

CREATE TABLE `vendorStaffDetail` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(15) COLLATE utf8mb4_unicode_ci NOT NULL,
  `image` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `permissions` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `vendorStaffDetail`
--

INSERT INTO `vendorStaffDetail` (`id`, `userId`, `vendorId`, `name`, `phone`, `image`, `permissions`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(13, 118, 42, 'test', '', '', '{\"manageShop\":[\"view\"],\"product\":[\"add\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[],\"orderReturnRequests\":[],\"report\":[\"view\"],\"setting\":[\"delete\",\"view\"]}', 1616066937, 1616484160, '2021-03-18 11:28:57', '2021-03-23 07:22:40'),
(14, 119, 42, 'Raghu Employee', '', '', '{\"manageShop\":[\"edit\",\"view\"],\"product\":[\"add\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[\"view\"],\"orderReturnRequests\":[],\"report\":[\"view\"],\"setting\":[]}', 1616477436, 1620020463, '2021-03-23 05:30:35', '2021-05-03 05:41:03'),
(15, 121, 42, 'Employee 1', '', '', '{\"manageShop\":[\"edit\",\"view\"],\"product\":[\"add\",\"delete\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[\"edit\",\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"view\"]}', 1621073506, 1622877380, '2021-05-15 10:11:45', '2021-06-05 07:16:20'),
(16, 135, 131, 'BirlaG', '', '07ffbf0f-b937-4651-89bf-ddb16bb22017.jpeg', '{\"manageShop\":[\"view\"],\"product\":[\"add\",\"delete\",\"edit\",\"view\"],\"orders\":[\"view\"],\"cancellationRequests\":[\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"add\",\"view\"]}', 1625570534, 1626413997, '2021-07-06 11:22:13', '2021-07-16 05:39:57'),
(18, 142, 131, 'Jatin Employee', '', 'a6ada71d-54ad-43e7-bf60-08dc3e69c42a.jpeg', '{\"manageShop\":[\"edit\",\"view\"],\"product\":[\"add\",\"view\"],\"orders\":[\"view\"],\"cancellationRequests\":[\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"view\"]}', 1626242620, 1626242620, '2021-07-14 06:03:40', '2021-07-14 06:03:40'),
(19, 151, 131, 'test111', '', '', '{\"manageShop\":[\"view\"],\"product\":[\"add\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[\"edit\",\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"add\",\"edit\",\"view\"]}', 1626414374, 1626414374, '2021-07-16 05:46:13', '2021-07-16 05:46:13'),
(20, 154, 131, 'Mohit', '', 'd4b2689f-ab08-4112-94df-17012bc67e8c.jpeg', '{\"manageShop\":[\"view\"],\"product\":[\"add\",\"view\"],\"orders\":[],\"cancellationRequests\":[],\"orderReturnRequests\":[],\"report\":[],\"setting\":[\"view\"]}', 1626426649, 1626426649, '2021-07-16 09:10:48', '2021-07-16 09:10:48'),
(21, 159, 131, 'Ashima', '9889494941', '14749018-f1a7-4c11-b3d6-4a62d70fd796.jpg', '{\"manageShop\":[\"edit\",\"view\"],\"product\":[\"add\",\"delete\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[\"edit\",\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"add\",\"delete\",\"edit\",\"view\"]}', 1627298599, 1627656010, '2021-07-26 11:23:18', '2021-07-30 14:40:10'),
(22, 160, 131, 'Sukhi', '', '1aa65f8e-737e-4257-b298-00e3e2a34fab.jpg', '{\"manageShop\":[\"edit\",\"view\"],\"product\":[\"add\",\"delete\",\"edit\",\"view\"],\"orders\":[\"edit\",\"view\"],\"cancellationRequests\":[\"edit\",\"view\"],\"orderReturnRequests\":[\"view\"],\"report\":[\"view\"],\"setting\":[\"add\",\"delete\",\"edit\",\"view\"]}', 1627300653, 1627300653, '2021-07-26 11:57:32', '2021-07-26 11:57:32');

-- --------------------------------------------------------

--
-- Table structure for table `wallet`
--

CREATE TABLE `wallet` (
  `id` int(11) NOT NULL,
  `vendorId` int(11) NOT NULL,
  `bankId` int(11) NOT NULL,
  `status` int(11) NOT NULL COMMENT '0=>Unverified,1=>Verifie',
  `updated` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `withdraw_amount` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `wishlist`
--

CREATE TABLE `wishlist` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `created` int(11) NOT NULL,
  `updated` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `wishlist`
--

INSERT INTO `wishlist` (`id`, `user_id`, `product_id`, `created`, `updated`, `createdAt`, `updatedAt`) VALUES
(12, 452, 672, 1651840629, 1651840629, '2022-05-06 12:37:08', '2022-05-06 12:37:08'),
(17, 3, 667, 1658491440, 1658491440, '2022-07-22 12:03:59', '2022-07-22 12:03:59'),
(18, 3, 668, 1658491907, 1658491907, '2022-07-22 12:11:46', '2022-07-22 12:11:46');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `add_to_compare`
--
ALTER TABLE `add_to_compare`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `adminDetail`
--
ALTER TABLE `adminDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `adminDetail_userId_foreign_idx` (`userId`);

--
-- Indexes for table `bank`
--
ALTER TABLE `bank`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bank_ibfk_1` (`userId`);

--
-- Indexes for table `bank_details`
--
ALTER TABLE `bank_details`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banner`
--
ALTER TABLE `banner`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog`
--
ALTER TABLE `blog`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_category`
--
ALTER TABLE `blog_category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `blog_comment`
--
ALTER TABLE `blog_comment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `brand`
--
ALTER TABLE `brand`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `card`
--
ALTER TABLE `card`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart____old`
--
ALTER TABLE `cart____old`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categoriesancestors`
--
ALTER TABLE `categoriesancestors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `parentId` (`parentId`);

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_constants`
--
ALTER TABLE `chat_constants`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `color`
--
ALTER TABLE `color`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `contact_us`
--
ALTER TABLE `contact_us`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `driverDetail`
--
ALTER TABLE `driverDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_delete_update_driver_idx` (`userId`);

--
-- Indexes for table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderId` (`orderId`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order`
--
ALTER TABLE `order`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderCancellationRequest`
--
ALTER TABLE `orderCancellationRequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderItem`
--
ALTER TABLE `orderItem`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderRefundRequest`
--
ALTER TABLE `orderRefundRequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderWithdrawalRequest`
--
ALTER TABLE `orderWithdrawalRequest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bankId` (`bankId`);

--
-- Indexes for table `page`
--
ALTER TABLE `page`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `payment`
--
ALTER TABLE `payment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `bookingId` (`bookingId`),
  ADD KEY `payment_ibfk_1` (`sellerId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productFavourite`
--
ALTER TABLE `productFavourite`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productSpecification`
--
ALTER TABLE `productSpecification`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `productTag`
--
ALTER TABLE `productTag`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_colors`
--
ALTER TABLE `product_colors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `save_to_later`
--
ALTER TABLE `save_to_later`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `shopCategory`
--
ALTER TABLE `shopCategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `siteComission`
--
ALTER TABLE `siteComission`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `socket_user`
--
ALTER TABLE `socket_user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `subCategory`
--
ALTER TABLE `subCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `categoryId` (`categoryId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taxCategory`
--
ALTER TABLE `taxCategory`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userAddress`
--
ALTER TABLE `userAddress`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userDeliveryAddress`
--
ALTER TABLE `userDeliveryAddress`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_delete_user_detail_user_idx` (`userId`);

--
-- Indexes for table `userDetail`
--
ALTER TABLE `userDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_delete_user_detail_user_idx` (`userId`);

--
-- Indexes for table `userSubscriptions`
--
ALTER TABLE `userSubscriptions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userToken`
--
ALTER TABLE `userToken`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `vendorBannerImages`
--
ALTER TABLE `vendorBannerImages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_vendor_delivery_options_user_idx` (`vendorId`);

--
-- Indexes for table `vendorDeliveryCharges`
--
ALTER TABLE `vendorDeliveryCharges`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_vendor_delivery_charges_user_idx` (`vendorId`);

--
-- Indexes for table `vendorDeliveryOptions`
--
ALTER TABLE `vendorDeliveryOptions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_vendor_delivery_options_user_idx` (`vendorId`);

--
-- Indexes for table `vendorDetail`
--
ALTER TABLE `vendorDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_delete_user_detail_user_idx` (`userId`);

--
-- Indexes for table `vendorShopCategory`
--
ALTER TABLE `vendorShopCategory`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_vendor_delivery_options_user_idx` (`vendorId`);

--
-- Indexes for table `vendorStaffDetail`
--
ALTER TABLE `vendorStaffDetail`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cascade_delete_user_detail_user_idx` (`userId`),
  ADD KEY `cascade_vendor_detail_user_idxx` (`vendorId`);

--
-- Indexes for table `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id`),
  ADD KEY `vendorId` (`vendorId`),
  ADD KEY `bankId` (`bankId`);

--
-- Indexes for table `wishlist`
--
ALTER TABLE `wishlist`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `add_to_compare`
--
ALTER TABLE `add_to_compare`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `adminDetail`
--
ALTER TABLE `adminDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `bank`
--
ALTER TABLE `bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `bank_details`
--
ALTER TABLE `bank_details`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `banner`
--
ALTER TABLE `banner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `blog`
--
ALTER TABLE `blog`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `blog_category`
--
ALTER TABLE `blog_category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
--
-- AUTO_INCREMENT for table `blog_comment`
--
ALTER TABLE `blog_comment`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
--
-- AUTO_INCREMENT for table `brand`
--
ALTER TABLE `brand`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
--
-- AUTO_INCREMENT for table `card`
--
ALTER TABLE `card`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
--
-- AUTO_INCREMENT for table `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
--
-- AUTO_INCREMENT for table `cart____old`
--
ALTER TABLE `cart____old`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `categoriesancestors`
--
ALTER TABLE `categoriesancestors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;
--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=99;
--
-- AUTO_INCREMENT for table `chat_constants`
--
ALTER TABLE `chat_constants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=235;
--
-- AUTO_INCREMENT for table `color`
--
ALTER TABLE `color`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;
--
-- AUTO_INCREMENT for table `contact_us`
--
ALTER TABLE `contact_us`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `driverDetail`
--
ALTER TABLE `driverDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=198;
--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;
--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;
--
-- AUTO_INCREMENT for table `order`
--
ALTER TABLE `order`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `orderCancellationRequest`
--
ALTER TABLE `orderCancellationRequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orderItem`
--
ALTER TABLE `orderItem`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;
--
-- AUTO_INCREMENT for table `orderRefundRequest`
--
ALTER TABLE `orderRefundRequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `orderWithdrawalRequest`
--
ALTER TABLE `orderWithdrawalRequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `page`
--
ALTER TABLE `page`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=676;
--
-- AUTO_INCREMENT for table `productFavourite`
--
ALTER TABLE `productFavourite`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `productSpecification`
--
ALTER TABLE `productSpecification`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- AUTO_INCREMENT for table `productTag`
--
ALTER TABLE `productTag`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_colors`
--
ALTER TABLE `product_colors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;
--
-- AUTO_INCREMENT for table `save_to_later`
--
ALTER TABLE `save_to_later`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `shopCategory`
--
ALTER TABLE `shopCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `siteComission`
--
ALTER TABLE `siteComission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `socket_user`
--
ALTER TABLE `socket_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
--
-- AUTO_INCREMENT for table `subCategory`
--
ALTER TABLE `subCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `taxCategory`
--
ALTER TABLE `taxCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT for table `userAddress`
--
ALTER TABLE `userAddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;
--
-- AUTO_INCREMENT for table `userDeliveryAddress`
--
ALTER TABLE `userDeliveryAddress`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT for table `userDetail`
--
ALTER TABLE `userDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT for table `userSubscriptions`
--
ALTER TABLE `userSubscriptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `userToken`
--
ALTER TABLE `userToken`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1090;
--
-- AUTO_INCREMENT for table `vendorBannerImages`
--
ALTER TABLE `vendorBannerImages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `vendorDeliveryCharges`
--
ALTER TABLE `vendorDeliveryCharges`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1021;
--
-- AUTO_INCREMENT for table `vendorDeliveryOptions`
--
ALTER TABLE `vendorDeliveryOptions`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=862;
--
-- AUTO_INCREMENT for table `vendorDetail`
--
ALTER TABLE `vendorDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=154;
--
-- AUTO_INCREMENT for table `vendorShopCategory`
--
ALTER TABLE `vendorShopCategory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT for table `vendorStaffDetail`
--
ALTER TABLE `vendorStaffDetail`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT for table `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `wishlist`
--
ALTER TABLE `wishlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `adminDetail`
--
ALTER TABLE `adminDetail`
  ADD CONSTRAINT `adminDetail_userId_foreign_idx` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `bank`
--
ALTER TABLE `bank`
  ADD CONSTRAINT `bank_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `categoriesancestors`
--
ALTER TABLE `categoriesancestors`
  ADD CONSTRAINT `categoriesancestors_ibfk_1` FOREIGN KEY (`parentId`) REFERENCES `categoriesancestors` (`id`) ON UPDATE CASCADE;

--
-- Constraints for table `driverDetail`
--
ALTER TABLE `driverDetail`
  ADD CONSTRAINT `cascade_delete_update_driver_idx` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orderWithdrawalRequest`
--
ALTER TABLE `orderWithdrawalRequest`
  ADD CONSTRAINT `orderWithdrawalRequest_ibfk_1` FOREIGN KEY (`bankId`) REFERENCES `bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `payment`
--
ALTER TABLE `payment`
  ADD CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`);

--
-- Constraints for table `userDetail`
--
ALTER TABLE `userDetail`
  ADD CONSTRAINT `cascade_delete_user_detail_user_idx` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `wallet`
--
ALTER TABLE `wallet`
  ADD CONSTRAINT `wallet_ibfk_1` FOREIGN KEY (`bankId`) REFERENCES `bank` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
