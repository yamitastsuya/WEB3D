// src/sections/Oldstudents.jsx
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Briefcase, Award, ChevronLeft, ChevronRight } from 'lucide-react';

const Oldstudents = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const alumni = [
        {
            name: "Huỳnh Phúc Vinh",
            class: "Công nghệ thông tin - Khóa 2002",
            position: "CTO VinHMS - Vingroup",
            image: "/assets/Cuusinhvien1.png",
            quote: "Đại học Hùng Vương là nền tảng giúp tôi bước vào thế giới công nghệ với sự tự tin, kỷ luật và sáng tạo. Tôi biết ơn những trải nghiệm học tập tại đây.",
            achievements: [
                "Giám đốc Công nghệ VinHMS",
                "15 năm kinh nghiệm công nghệ",
                "Diễn giả tại các hội thảo công nghệ lớn"
            ]
        },
        {
            name: "Nguyễn Mỹ Linh",
            class: "Quản lý bệnh viện - Khóa 2004",
            position: "Trưởng phòng CTXH BV Nguyễn Tri Phương",
            image: "/assets/Cuusinhvien2.png",
            quote: "Tôi vừa học lý thuyết vừa đi thực tập thực tế. Trường giúp tôi vững chuyên môn và tự tin trong giao tiếp cũng như trình bày trước đám đông.",
            achievements: [
                "Trưởng phòng CTXH BV Nguyễn Tri Phương",
                "Diễn giả cộng đồng y tế",
                "Tình nguyện viên tiêu biểu TP.HCM"
            ]
        },
        {
            name: "Đoàn Lâm Quang Minh",
            class: "Du lịch - Khóa 2008",
            position: "Founder Minh Team SJC",
            image: "/assets/Cuusinhvien3.png",
            quote: "ĐH Hùng Vương là ngôi nhà thứ 2 của tôi. Nhờ các hoạt động phong trào và môi trường cởi mở, tôi tự tin thành lập doanh nghiệp du lịch riêng.",
            achievements: [
                "Founder Minh Team SJC",
                "10+ năm kinh nghiệm tổ chức sự kiện",
                "Cố vấn nhiều dự án du lịch cộng đồng"
            ]
        }
    ];

    const stats = [
        { number: '35,000+', label: 'Cựu sinh viên', icon: Award },
        { number: '30', label: 'Kinh nghiệm', icon: Award },
        { number: '507', label: 'Giảng viên', icon: Briefcase },
        { number: '50', label: 'Chương trình', icon: Briefcase }
    ];

    const nextTestimonial = () => {
        setCurrentTestimonial((prev) => (prev + 1) % alumni.length);
    };

    const prevTestimonial = () => {
        setCurrentTestimonial((prev) => (prev - 1 + alumni.length) % alumni.length);
    };

    return (
        <section id="cuusinhvien" className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-6"
                >
                    Cựu Sinh Viên Tiêu Biểu
                </motion.h2>
                <p className="text-center text-gray-600 mb-16 max-w-2xl mx-auto text-lg">
                    Hành trình thành công của các thế hệ cựu sinh viên là niềm tự hào và minh chứng cho chất lượng đào tạo của nhà trường.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="text-center bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                        >
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <stat.icon className="w-6 h-6 text-blue-600" />
                            </div>
                            <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </motion.div>
                    ))}
                </div>

                {/* Featured Alumni */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-xl overflow-hidden mb-16"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                        {/* Image */}
                        <div className="relative h-64 lg:h-auto">
                            <img
                                src={alumni[currentTestimonial].image}
                                alt={alumni[currentTestimonial].name}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r" />
                        </div>

                        {/* Content */}
                        <div className="p-8 lg:p-12 flex flex-col justify-center">
                            <Quote className="w-10 h-10 text-blue-600 mb-4" />
                            <blockquote className="text-lg text-gray-700 mb-6 leading-relaxed">
                                “{alumni[currentTestimonial].quote}”
                            </blockquote>

                            <h3 className="text-2xl font-bold text-gray-800">{alumni[currentTestimonial].name}</h3>
                            <p className="text-blue-600 font-semibold">{alumni[currentTestimonial].position}</p>
                            <p className="text-sm text-gray-500 mb-6">{alumni[currentTestimonial].class}</p>

                            <div>
                                <h4 className="font-semibold text-gray-800 mb-2">Thành tựu nổi bật:</h4>
                                <ul className="space-y-2 text-sm">
                                    {alumni[currentTestimonial].achievements.map((item, idx) => (
                                        <li key={idx} className="flex items-start space-x-2">
                                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5"></div>
                                            <span className="text-gray-600">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Nav Buttons */}
                            <div className="flex justify-between items-center mt-6">
                                <div className="flex space-x-2">
                                    {alumni.map((_, idx) => (
                                        <button
                                            key={idx}
                                            className={`w-3 h-3 rounded-full ${
                                                idx === currentTestimonial ? "bg-blue-600" : "bg-gray-300"
                                            }`}
                                            onClick={() => setCurrentTestimonial(idx)}
                                        />
                                    ))}
                                </div>
                                <div className="flex space-x-2">
                                    <button onClick={prevTestimonial} className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center">
                                        <ChevronLeft className="w-5 h-5 text-blue-600" />
                                    </button>
                                    <button onClick={nextTestimonial} className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center">
                                        <ChevronRight className="w-5 h-5 text-blue-600" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Alumni Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {alumni.map((alumnus, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl cursor-pointer"
                            onClick={() => setCurrentTestimonial(idx)}
                        >
                            <div className="h-48 relative">
                                <img src={alumnus.image} alt={alumnus.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                            </div>
                            <div className="p-5">
                                <h4 className="text-lg font-bold text-gray-800">{alumnus.name}</h4>
                                <p className="text-blue-600 text-sm">{alumnus.position}</p>
                                <p className="text-gray-500 text-xs">{alumnus.class}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mt-20"
                >
                    <div className="bg-blue-600 text-white rounded-2xl p-8">
                        <h3 className="text-2xl font-bold mb-4">Bạn sẽ là câu chuyện tiếp theo?</h3>
                        <p className="text-blue-100 mb-6 max-w-xl mx-auto">
                            Tham gia cộng đồng cựu sinh viên và truyền cảm hứng cho thế hệ sau.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <a
                                href="#admissions"
                                className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100"
                            >
                                Đăng ký tuyển sinh
                            </a>
                            <a
                                href="#contact"
                                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600"
                            >
                                Kết nối Cựu sinh viên
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Oldstudents;
