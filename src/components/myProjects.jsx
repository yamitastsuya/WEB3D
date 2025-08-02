export const myProjects = [
    {
        title: 'KHOA CÔNG NGHỆ THÔNG TIN (TEC)',
        desc: 'Vào ngày 23 tháng 6 năm 2023 khoa kỹ thuật công nghệ đã chính thức được cấp giấy kiến nhận kiểm định chất lượng sau khi hoàn thành được\n' +
            'khảo sát phục vụ đánh giá ngoài chương trình đào tạo ngành công nghệ thông tin đây là minh chứng cho nỗ lực không người trong việc nương cao chất lượng giảng dạy đảm bảo chuẩn đầu ra và cam kết mang đến môi trường học tập đạt chuẩn cho sinh viên tại khoa kỹ thuật công nghệ trường Đại học Hùng Vương thành phố Hồ Chí Minh không chỉ đào tạo kỹ sư giỏi mà đào tạo những người dám nghĩ dám làm',
        href: 'https://www.youtube.com/watch?v=FpsXAMZHddo',
        texture: '/textures/TEC.mp4',
        logo: '/assets/TEC.png',
        logoStyle: {
            backgroundColor: '#2A1816',
            border: '0.2px solid #36201D',
            boxShadow: '0px 0px 60px 0px #AA3C304D',
        },
        spotlight: '/assets/spotlight1.png',
        tags: [
            { id: 1, name: 'React.js', path: '/assets/logos/react.svg' },
            { id: 2, name: 'TailwindCSS', path: '/assets/logos/tailwindcss.svg' },
            { id: 3, name: 'TypeScript', path: '/assets/logos/javascript.svg' },
            { id: 4, name: 'Framer Motion', path: '/assets/logos/html5.svg' },
        ],
    },
    {
        title: 'KHOA DU LỊCH NHÀ HÀNG KHÁCH SẠN (HOST)',
        desc: 'Khoa tập trung nâng cao chất lượng đào tạo và mở rộng quy mô, đặc biệt chú trọng vào các chương trình đào tạo được thiết kế theo định hướng ứng dụng cao, gắn liền với nhu cầu thực tế của thị trường lao động. Điều này giúp sinh viên sẵn sàng hội nhập và phát triển sự nghiệp ngay sau khi ra trường.\n' +
            '\n' +
            'Khoa tự hào sở hữu đội ngũ giảng viên chất lượng cao, bao gồm các giáo sư, phó giáo sư, tiến sĩ và thạc sĩ dày dạn kinh nghiệm, có năng lực nghiên cứu và giảng dạy xuất sắc, với nhiều công bố quốc tế uy tín. Đặc biệt, đội ngũ còn có các giảng viên trẻ nhiệt huyết, năng động, chuyên môn vững vàng và áp dụng phương pháp giảng dạy hiện đại, gần gũi với sinh viên.\n' +
            '\n' +
            'Theo phản hồi tích cực từ sinh viên, đội ngũ giảng viên của khoa được đánh giá là một trong những tập thể giảng viên được yêu thích nhất tại Trường Đại học Hùng Vương, Thành phố Hồ Chí Minh.',
        href: 'https://www.youtube.com/watch?v=CpTBMcLStEo',
        texture: '/textures/HOST.mp4',
        logo: '/assets/HOST.png',
        logoStyle: {
            backgroundColor: '#13202F',
            border: '0.2px solid #17293E',
            boxShadow: '0px 0px 60px 0px #2F6DB54D',
        },
        spotlight: '/assets/spotlight2.png',
        tags: [
            { id: 1, name: 'lan', path: '/assets/LAN.png' },
            { id: 2, name: 'tec', path: 'assets/TEC.png' },
            { id: 3, name: 'BAM', path: '/assets/BAM.png' },
            { id: 4, name: 'HEAL', path: '/assets/HEAL.png' },
        ],
    },
    {
        title: 'KHOA KHOA HỌC SỨC KHỎE (HEAL)',
        desc: 'Sinh viên của khoa không chỉ được học tập trong môi trường hiện đại, ' +
            'thực tiễn mà còn có cơ hội tham gia các chương trình giao lưu học thuật và ' +
            'học tập ngắn hạn tại các trường đại học đối tác ở Hàn Quốc, Đài Loan, châu Âu và Mỹ. ' +
            'Những trải nghiệm này không chỉ giúp mở rộng góc nhìn quốc tế mà còn đưa các em đến gần hơn với ước mơ hội nhập toàn cầu. ' +
            'Nhiều sinh viên xuất sắc đã nhận được học bổng du học sau đại học tại các quốc gia phát triển, tiếp tục hành trình tri thức ở những nền giáo dục tiên tiến. Sau khi tốt nghiệp, sinh viên trở thành nguồn nhân lực chất lượng cao, đóng góp vào đội ngũ chuyên môn tại các bệnh viện, phòng khám và trung tâm trị liệu trong nước cũng như quốc tế.',
        href: 'https://www.youtube.com/watch?v=l27RqsidX4k',
        texture: '/textures/HEAL.mp4',
        logo: '/assets/HEAL.png',
        logoStyle: {
            backgroundColor: '#0A1F44', // Màu nền đơn giản
            background: 'linear-gradient(145deg, #0A1F44, #132F64)', //dùng gradient, thì cái này sẽ ghi đè backgroundColor
            border: '0.2px solid #17427A', //Màu viền
            boxShadow: '0 0 40px 5px rgba(0, 123, 255, 0.3)',//Hiệu ứng tỏa sáng
        },
        spotlight: '/assets/spotlight3.png',
        tags: [
            { id: 1, name: 'tec', path: '/assets/TEC.png' },
            { id: 2, name: 'host', path: '/assets/HOST.png' },
            { id: 3, name: 'HEAL', path: '/assets/HEAL.png' },
            { id: 4, name: 'bam', path: '/assets/BAM.png' },
        ],
    },
    {
        title: 'KHOA NGÔN NGỮ (LAN)',
        desc: 'Với gần 30 năm hình thành và phát triển, ' +
            'Khoa không ngừng đổi mới để đào tạo nguồn nhân lực chất lượng cao trong lĩnh vực ' +
            'ngôn ngữ và văn hóa quốc tế. Hiện nay, Khoa đang đào tạo các chuyên ngành: ' +
            'Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Ngôn ngữ Nhật Bản và Ngôn ngữ Hàn Quốc. ' +
            'Các chương trình học được thiết kế hiện đại, sát với thực tiễn, ' +
            'giúp sinh viên phát triển toàn diện kỹ năng giao tiếp, biên – phiên dịch, ' +
            'kiến thức văn hóa và tư duy toàn cầu.',
        href: 'https://www.youtube.com/watch?v=JjxV-yNEJ_U',
        texture: '/textures/LAN.mp4',
        logo: '/assets/LAN.png',
        logoStyle: {
            backgroundColor: '#0E1F38',
            border: '0.2px solid #0E2D58',
            boxShadow: '0px 0px 60px 0px #2F67B64D',
        },
        spotlight: '/assets/spotlight4.png',
        tags: [
            { id: 1, name: 'tec', path: '/assets/TEC.png' },
            { id: 2, name: 'BAM', path: 'assets/BAM.png' },
            { id: 3, name: 'HOST', path: '/assets/HOST.png' },
            { id: 4, name: 'HEAL', path: '/assets/HEAL.png' },
        ],
    },
];
