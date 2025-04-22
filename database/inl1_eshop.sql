-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Värd: localhost
-- Tid vid skapande: 22 apr 2025 kl 13:01
-- Serverversion: 10.4.28-MariaDB
-- PHP-version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Databas: `inl1_eshop`
--

-- --------------------------------------------------------

--
-- Tabellstruktur `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Fruit'),
(2, 'Vegetables'),
(3, 'Snacks'),
(4, 'Bakery'),
(5, 'Dairy'),
(6, 'Beverages'),
(7, 'Nuts'),
(9, 'Sweets'),
(11, 'Cheese'),
(13, 'Berries');

-- --------------------------------------------------------

--
-- Tabellstruktur `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `stock` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `stock`, `price`, `image_url`, `created_at`) VALUES
(1, 'Banana', 'Organic banana, class 1', 75, 8.95, 'https://via.placeholder.com/150?text=Banana\r\n', '2025-04-16 13:53:15'),
(2, 'Apple', 'Organic apple', 100, 5.95, 'https://via.placeholder.com/150?text=Apple', '2025-04-16 14:02:05'),
(3, 'Chips', 'Salted potato chips', 70, 34.95, 'https://via.placeholder.com/150?text=Chips', '2025-04-16 14:02:05'),
(4, 'Dark Chocolate', 'Dark chocolate with 85% cocoa content', 80, 46.95, 'https://via.placeholder.com/150?text=Chocolate', '2025-04-16 14:02:05'),
(5, 'Carrots', 'Organic carrots, 500 g', 90, 2.95, 'https://via.placeholder.com/150?text=Carrots', '2025-04-16 14:02:05'),
(6, 'Milk', 'Organic, fresh milk, 3% fat', 100, 18.95, 'https://via.placeholder.com/150?text=Milk', '2025-04-16 14:03:52'),
(7, 'Almonds', 'Almonds, natural', 80, 32.95, 'https://via.placeholder.com/150?text=Almonds', '2025-04-16 14:03:52'),
(8, 'Orange', 'Orange, class 1', 65, 9.95, 'https://via.placeholder.com/150?text=Orange', '2025-04-16 14:03:52'),
(9, 'Pineapple', 'Pineapple, class 1', 50, 30.95, 'https://via.placeholder.com/150?text=Pineapple', '2025-04-16 14:03:52'),
(10, 'Lemon', 'Lemon, class 1', 100, 10.95, 'https://via.placeholder.com/150?text=Lemon', '2025-04-16 14:03:52'),
(11, 'Cheddar Cheese', 'Mild and flavorful cheese', 30, 69.95, 'https://via.placeholder.com/150?text=Cheddar+Cheese', '2025-04-16 14:19:30'),
(12, 'Mozzarella Cheese', 'Fresh mozzarella', 40, 21.95, 'https://via.placeholder.com/150?text=Mozzarella+Cheese', '2025-04-16 14:19:30'),
(13, 'Greek Yogurt', 'Greek yogurt with high protein content', 30, 23.95, 'https://via.placeholder.com/150?text=Greek+Yogurt', '2025-04-16 14:19:30'),
(14, 'Butter', 'Salted butter, 82% fat', 50, 52.95, 'https://via.placeholder.com/150?text=Butter', '2025-04-16 14:19:30'),
(17, 'Blueberries', 'Organic blueberries, handpicked in Sweden', 37, 45.95, 'https://via.placeholder.com/150?text=Blueberries', '2025-04-17 13:29:56');

-- --------------------------------------------------------

--
-- Tabellstruktur `product_categories`
--

CREATE TABLE `product_categories` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `category_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumpning av Data i tabell `product_categories`
--

INSERT INTO `product_categories` (`id`, `product_id`, `category_id`) VALUES
(4, 1, 1),
(3, 2, 1),
(9, 3, 3),
(11, 4, 3),
(10, 4, 9),
(6, 5, 2),
(14, 6, 5),
(15, 6, 6),
(2, 7, 3),
(1, 7, 7),
(18, 8, 1),
(19, 9, 1),
(13, 10, 1),
(8, 11, 5),
(7, 11, 11),
(17, 12, 5),
(16, 12, 11),
(12, 13, 5),
(5, 14, 5),
(22, 17, 13);

--
-- Index för dumpade tabeller
--

--
-- Index för tabell `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Index för tabell `product_categories`
--
ALTER TABLE `product_categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_product_category` (`product_id`,`category_id`),
  ADD KEY `fk_product_categories_category` (`category_id`);

--
-- AUTO_INCREMENT för dumpade tabeller
--

--
-- AUTO_INCREMENT för tabell `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT för tabell `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT för tabell `product_categories`
--
ALTER TABLE `product_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Restriktioner för dumpade tabeller
--

--
-- Restriktioner för tabell `product_categories`
--
ALTER TABLE `product_categories`
  ADD CONSTRAINT `fk_product_categories_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_product_categories_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
