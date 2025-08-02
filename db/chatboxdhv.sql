-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 20, 2025 lúc 08:51 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `chatboxdhv`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bot_qa`
--

CREATE TABLE `bot_qa` (
  `id` int(11) NOT NULL,
  `question` varchar(255) NOT NULL,
  `answer` text NOT NULL,
  `question_norm` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `bot_qa`
--

INSERT INTO `bot_qa` (`id`, `question`, `answer`, `question_norm`) VALUES
(1, 'chào', 'Chào bạn! Mình là trợ lý ảo của Đại Học Hùng Vương HCM. Bạn cần hỗ trợ gì?', 'chào'),
(4, 'Trường được thành lập năm nào?', 'Trường được thành lập từ năm 1995, hiệu trường đầu tiên là GS. ThS Y khoa Ngô Gia Hy nhiệm kỳ 1995 – 2001', 'trường được thành lập năm nào'),
(6, 'Chào bạn', 'Chào bạn nhóe!', 'chào bạn'),
(9, 'bạn khỏe ko', 'Tôi khỏe vì tôi là chat bot mà ( ´ ▽ ` )', 'bạn khỏe ko'),
(10, 'bạn khỏe không', 'Tôi khỏe vì tôi là chat bot mà ( ´ ▽ ` )', 'bạn khỏe không'),
(14, 'Bạn khỏe ko?', 'Siêu khỏe luôn bạn ei (´• ω •`)', 'bạn khỏe ko'),
(16, 'bạn là ai?', 'Tôi chỉ là một con chat bot có thể trò chuyện với bạn ở cái web này!(￢_￢;)', 'bạn là ai'),
(19, 'bạn bao nhiêu tuổi', 'bot chat cần tuổi à?(」°ロ°)」', 'bạn bao nhiêu tuổi'),
(20, 'cần chứ', 'bí mật tự mò đi <(￣ ﹌ ￣)>', 'cần chứ'),
(35, 'địa chỉ trường', 'Bạn muốn hỏi cơ sở nào? vì trường có 2 cơ sở lận á!', 'địa chỉ trường'),
(36, 'cơ sở chính', '736 Nguyễn Trãi, Phường 11, Quận 5, TP.HCM .', 'cơ sở chính'),
(37, 'cơ sở 2 (phụ, mới)', '37 Kinh Dương Vương, Phường 12, Quận 6, TP.HCM ​.', 'cơ sở 2 phụ mới'),
(39, 'chao xìn', 'chao xìn', 'chao xìn'),
(40, 'Trường được thành lập mấy năm rồi', '30 năm nhóe', 'trường được thành lập mấy năm rồi'),
(41, 'hiệu trưởng đầu tiên', 'GS. ThS Y khoa Ngô Gia Hy nhiệm kỳ 1995 – 2001', 'hiệu trưởng đầu tiên'),
(42, 'các đời hiệu trưởng', '- GS. ThS Y khoa Ngô Gia Hy – Hiệu trưởng đầu tiên (1995 – 2001)\r\n- TS. Cao Xuân Tiến – Hiệu trưởng (2001 – 2005)\r\n- PGS. NGƯT Lê Văn Lý – Hiệu trưởng (2005 – 2015)\r\n- TS. Tạ Thị Kiều An – Hiệu trưởng (2017 – 2018)\r\n- PGS.TS. NGND. Đỗ Văn Xê – Hiệu trưởng (2018 – 2019)\r\n- TS. Nguyễn Kim Quang – Hiệu trưởng (2020 - 2021)', 'các đời hiệu trưởng'),
(43, 'hiệu trưởng hiện tại', 'Dr. Trần Việt Anh', 'hiệu trưởng hiện tại'),
(44, 'bye', 'ok bye bạn', 'bye'),
(45, 'tạm biệt', 'Cần gì alo mình nhé!', 'tạm biệt'),
(46, 'alo', 'Bạn cần gì é?', 'alo'),
(47, 'hello', 'chào nhé', 'hello'),
(48, 'Ăn gì chưa?', 'Tôi đâu có cần ăn đâu', 'ăn gì chưa'),
(49, 'trường', 'Trường mình tên là Đại Học Hùng Vương nhen!', 'trường'),
(50, 'trường có mấy cơ sở', 'Trường có 2 cơ sở đó bạn', 'trường có mấy cơ sở'),
(51, 'trường chính ở đâu', '736 Nguyễn Trãi Q5', 'trường chính ở đâu'),
(52, 'Hợp lí', 'Sao lại không nhỉ?', 'hợp lí'),
(53, 'học phí', 'Học phí mỗi ngành khác nhau', 'học phí'),
(54, 'Trường ở đâu?', 'Trường có 2 cơ sở, bạn muốn biết cơ sở nào?', 'trường ở đâu'),
(55, '1', '736 Nguyễn Trãi', '1'),
(56, 'Học phí bao nhiêu?', 'Tùy nghành á bạn!', 'học phí bao nhiêu'),
(57, 'Cơ sở chính là gì?', '736 Nguyễn Trãi', 'cơ sở chính là gì'),
(58, 'Liên hệ phòng đào tạo', 'gọi 1 trong 2 số này nhé 02871000888 - 02871001888 hoặc kéo xuống Liên Hệ để biết thêm chi tiết nhé bạn hiền =))', 'liên hệ phòng đào tạo');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bot_qa`
--
ALTER TABLE `bot_qa`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bot_qa`
--
ALTER TABLE `bot_qa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
