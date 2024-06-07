-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 03, 2024 at 09:58 AM
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
-- Database: `lab_komputer`
--

-- --------------------------------------------------------

--
-- Table structure for table `komputer`
--

CREATE TABLE `komputer` (
  `id_komputer` int(11) NOT NULL,
  `id_lab_komputer` int(11) DEFAULT NULL,
  `no_komputer` varchar(255) DEFAULT NULL,
  `status` enum('tersedia','dipakai') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `komputer`
--

INSERT INTO `komputer` (`id_komputer`, `id_lab_komputer`, `no_komputer`, `status`) VALUES
(10, 25, '72', 'dipakai'),
(11, 25, '78', 'dipakai'),
(12, 25, '79', 'dipakai'),
(13, 25, '75', 'tersedia'),
(14, 26, '03', 'dipakai');

-- --------------------------------------------------------

--
-- Table structure for table `lab_komputer`
--

CREATE TABLE `lab_komputer` (
  `id_lab_komputer` int(11) NOT NULL,
  `nama_lab` varchar(255) NOT NULL,
  `tempat` enum('batuan','pamolokan') NOT NULL,
  `id_satpam` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `lab_komputer`
--

INSERT INTO `lab_komputer` (`id_lab_komputer`, `nama_lab`, `tempat`, `id_satpam`) VALUES
(25, 'Lab-07', 'batuan', 3),
(26, 'Lab-02', 'pamolokan', 3);

-- --------------------------------------------------------

--
-- Table structure for table `peminjaman_lab`
--

CREATE TABLE `peminjaman_lab` (
  `id_peminjaman_lab` int(11) NOT NULL,
  `alasan` varchar(255) NOT NULL,
  `id_mahasiswa` int(11) DEFAULT NULL,
  `id_komputer` int(11) NOT NULL,
  `tanggal_mulai` varchar(255) DEFAULT NULL,
  `tanggal_selesai` varchar(255) NOT NULL,
  `status` enum('menunggu_persetujuan','disetujui','ditolak') DEFAULT NULL,
  `file_pdf` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `peminjaman_lab`
--

INSERT INTO `peminjaman_lab` (`id_peminjaman_lab`, `alasan`, `id_mahasiswa`, `id_komputer`, `tanggal_mulai`, `tanggal_selesai`, `status`, `file_pdf`) VALUES
(65, 'mengerjakan tugas', 21, 10, '2024-04-18', '2024-04-18', 'disetujui', '1713404997005.pdf'),
(66, 'edit video', 25, 12, '2024-04-18', '2024-04-18', 'disetujui', '1713410059047.pdf'),
(67, 'mengerjakan tugas', 21, 14, '2024-04-20', '2024-04-23', 'disetujui', '1714010805056.pdf'),
(68, 'online meet', 21, 14, '2024-04-25', '2024-04-25', 'ditolak', ''),
(69, 'mengerjakan tugas', 26, 11, '2024-04-25', '2024-04-26', 'disetujui', '1714012126063.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `satpam`
--

CREATE TABLE `satpam` (
  `id_satpam` int(11) NOT NULL,
  `nama_satpam` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `satpam`
--

INSERT INTO `satpam` (`id_satpam`, `nama_satpam`) VALUES
(3, 'raihan nosina'),
(4, 'dono doni');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id_users` int(11) NOT NULL,
  `nama_pengguna` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `peran` enum('admin','mahasiswa') NOT NULL,
  `foto` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id_users`, `nama_pengguna`, `email`, `password`, `peran`, `foto`) VALUES
(21, 'eko darmawan', 'eko@gmail.com', '$2b$10$5yiLxgyZeYndfkSWfGA1jeehpBWL3XJYLPWbWxXA.1H6lGCJlmolC', 'mahasiswa', '1712947399335.jpg'),
(23, 'dono kasino', 'dono@gmail.com', '$2b$10$4EcV3.7SYYojJYHCyeK.vec7ILg9/FEHlYSsU07ahqF/P6oWDIsQ2', 'admin', '1713017708656.jpg'),
(24, 'nina nono', 'nina@gmail.com', '$2b$10$d.l21FrPhyNmpgK4PdqJ1u6c8YsghqGmbXtwjB6Omxy.o92SA26OC', 'mahasiswa', '1713018524726.jpg'),
(25, 'farel badraldin2', 'farel@gmail.com', '$2b$10$Pbj5iN8YnT9lD5TBwHZU6OC6XjNq.Ojila2.qRjUCCsIGEuGVwCla', 'mahasiswa', '1713409885762.jpg'),
(26, 'nabil royyan', 'nabil@gmail.com', '$2b$10$t7WN2oQtam24pAbtP1QyF.j2DWv6QwaJvIr0HmS8dPwh8aHP/IuGG', 'mahasiswa', '1714012028330.jpg');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `komputer`
--
ALTER TABLE `komputer`
  ADD PRIMARY KEY (`id_komputer`),
  ADD KEY `id_lab_komputer` (`id_lab_komputer`);

--
-- Indexes for table `lab_komputer`
--
ALTER TABLE `lab_komputer`
  ADD PRIMARY KEY (`id_lab_komputer`),
  ADD KEY `id_satpam` (`id_satpam`);

--
-- Indexes for table `peminjaman_lab`
--
ALTER TABLE `peminjaman_lab`
  ADD PRIMARY KEY (`id_peminjaman_lab`),
  ADD KEY `id_mahasiswa` (`id_mahasiswa`),
  ADD KEY `id_komputer` (`id_komputer`);

--
-- Indexes for table `satpam`
--
ALTER TABLE `satpam`
  ADD PRIMARY KEY (`id_satpam`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_users`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `komputer`
--
ALTER TABLE `komputer`
  MODIFY `id_komputer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `lab_komputer`
--
ALTER TABLE `lab_komputer`
  MODIFY `id_lab_komputer` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `peminjaman_lab`
--
ALTER TABLE `peminjaman_lab`
  MODIFY `id_peminjaman_lab` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `satpam`
--
ALTER TABLE `satpam`
  MODIFY `id_satpam` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id_users` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `komputer`
--
ALTER TABLE `komputer`
  ADD CONSTRAINT `komputer_ibfk_1` FOREIGN KEY (`id_lab_komputer`) REFERENCES `lab_komputer` (`id_lab_komputer`);

--
-- Constraints for table `lab_komputer`
--
ALTER TABLE `lab_komputer`
  ADD CONSTRAINT `lab_komputer_ibfk_1` FOREIGN KEY (`id_satpam`) REFERENCES `satpam` (`id_satpam`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `peminjaman_lab`
--
ALTER TABLE `peminjaman_lab`
  ADD CONSTRAINT `peminjaman_lab_ibfk_1` FOREIGN KEY (`id_mahasiswa`) REFERENCES `users` (`id_users`),
  ADD CONSTRAINT `peminjaman_lab_ibfk_3` FOREIGN KEY (`id_komputer`) REFERENCES `komputer` (`id_komputer`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
