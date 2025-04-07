-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2025 at 08:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `e_commerce`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `image` varchar(1000) NOT NULL,
  `username` varchar(30) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `image`, `username`, `status`, `email`, `password`) VALUES
(37, '', 'saad', 'active', 'saadfaruk786@gmail.com', '$2b$10$Zi7T6nwUk51vG33LNsHBJO646q/acKzG4dan1hWC1acZ2jzMnK0Kq'),
(38, '', 'rashid', 'inactive', 'rashid@gmail.com', '$2b$10$zqECaWdkSxAptiH2iCwiIeiVGaDb1TSblTc8mdOLsMI/HYetcNPJO');

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `status` enum('Pending','Removed') DEFAULT 'Pending' COMMENT 'Status of the item',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `product_id`, `quantity`, `status`, `created_at`, `updated_at`) VALUES
(217, 79, 64, 1, 'Pending', '2025-04-04 06:00:47', '2025-04-04 06:00:47'),
(218, 79, 65, 1, 'Pending', '2025-04-04 06:00:47', '2025-04-04 06:00:47');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `image`, `title`, `status`, `created_at`, `updated_at`) VALUES
(33, '1740453226347-a.n.jpg', 'bhdjhsin', NULL, '2025-02-25 03:13:46', '2025-02-25 03:13:46'),
(34, '1740566618456-a.d.jpg', 'rytfgio', NULL, '2025-02-26 10:43:38', '2025-02-26 10:43:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(11) NOT NULL,
  `order_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL COMMENT 'E.g., Credit Card, PayPal, etc.',
  `payment_status` varchar(255) DEFAULT NULL COMMENT 'Payment status, e.g., Pending, Completed, Failed',
  `transaction_id` varchar(255) DEFAULT NULL COMMENT 'Transaction ID for reference',
  `amount` decimal(10,2) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT 'Payment status, e.g., Pending, Completed, Failed',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` decimal(10,2) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `category_id` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `status`, `image`, `name`, `price`, `description`, `category_id`, `created_at`, `updated_at`) VALUES
(59, 'active', '1740652268720-a.d.jpg', 'yuiio', 879.00, '<p>uijkp[bguo</p>', 33, '2025-02-27 10:31:08', '2025-03-04 05:30:27'),
(60, 'active', '1740652989756-a.arrow.jpg', 'hjko', 78998.00, '<p>uyiujkjl[</p>', 33, '2025-02-27 10:43:09', '2025-02-28 06:30:10'),
(61, 'active', '1740653023523-a.d.jpg', 'tuhgjuh', 7980.00, '<p>iguhjijpokko[</p>', 34, '2025-02-27 10:43:43', '2025-02-28 06:30:12'),
(62, 'active', '1740653622233-a.i.jpg', 'tyfgyui', 7687.00, '<p>ujikoihjhuhiojpokok</p>', 34, '2025-02-27 10:53:42', '2025-02-28 06:30:13'),
(64, 'active', '1741063987553-a.i.jpg', 'ibnkm,', 8908.00, '<p>guihiojyuhbuihuo</p>', 33, '2025-03-04 04:53:07', '2025-03-04 05:29:19'),
(65, 'active', '1741064000985-a.l.jpg', 'yhjkhpiom', 8909.00, '<p>uhokjpokpoko[</p>', 33, '2025-03-04 04:53:20', '2025-03-04 05:29:02'),
(66, 'active', '1741071385070-a.arrow.jpg', 'yghjool', 78980.00, '<p>guhjhioj</p>', 33, '2025-03-04 06:56:25', '2025-03-04 06:56:25'),
(67, 'active', '1741072405088-a.i.jpg', 'hjol', 7980.00, '<p>fyguhjop;l</p>', 33, '2025-03-04 07:13:25', '2025-03-04 07:13:25'),
(68, 'inactive', '1741150081958-a.i.jpg', 'Saad', 234.00, '<p>asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof &nbsp;asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof &nbsp;asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof asdsdf uihiosjf 3urifiwu udhgodgeo isodhfviof&nbsp;</p>', 33, '2025-03-05 04:48:01', '2025-04-05 05:38:15'),
(69, 'active', '1741150129448-a.i.jpg', 'Saad', 87768.00, '<p>werwet</p>', 33, '2025-03-05 04:48:49', '2025-03-05 04:48:49'),
(70, 'active', '1741150625315-a.d.jpg', 'fgjhkl', 8789.00, '<p>tuyjklkokihuijhilkj</p>', 33, '2025-03-05 04:57:05', '2025-03-05 04:57:05'),
(71, 'active', '1741150673769-a.arrow.jpg', 'bjdjlnkl', 8789.00, '<p>tfyguihijjp</p>', 33, '2025-03-05 04:57:53', '2025-03-05 04:57:53');

-- --------------------------------------------------------

--
-- Table structure for table `shipping_addresses`
--

CREATE TABLE `shipping_addresses` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `country` varchar(255) DEFAULT NULL,
  `zip_code` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL COMMENT 'Status of the address, e.g., Active, Inactive',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email_or_phone` varchar(1000) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `otp` int(100) NOT NULL,
  `picture` varchar(2000) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp() COMMENT 'Updates on modification'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email_or_phone`, `password`, `otp`, `picture`, `created_at`, `updated_at`) VALUES
(78, 'asrar', 'asrarjabir786@gmail.com', '$2b$10$3hgxF4A7lUt7VQSAcsdiFebbAbs8mnh3Frbo4CcQzYSJiNwfFAbN6', 292722, '', '2025-03-20 05:32:49', '2025-03-20 05:32:49'),
(79, 'saad', 'saadfaruk786@gmail.com', '$2b$10$bLEhxezil8qhbrnty9Vxa.cxtej/4.YiUxGC9RjKEzrr2RQBlFvQ.', 489929, '', '2025-03-20 05:45:18', '2025-03-20 05:45:18');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `order_id` (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_ibfk_1` (`category_id`);

--
-- Indexes for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `email` (`email_or_phone`(768));

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=80;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `cart_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Constraints for table `payments`
--
ALTER TABLE `payments`
  ADD CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
  ADD CONSTRAINT `payments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `shipping_addresses`
--
ALTER TABLE `shipping_addresses`
  ADD CONSTRAINT `shipping_addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
