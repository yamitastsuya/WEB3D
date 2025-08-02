"use client";
import React from 'react';
import { motion } from 'framer-motion';
import {
    GraduationCap,
    MapPin,
    Phone,
    Mail,
    Facebook,
    Instagram,
    Youtube,
    Linkedin,
    Heart
} from 'lucide-react';

const Footer = () => {
    return (
        <footer id="contact" className="bg-gray-900 text-white text-sm">
            <div className="container mx-auto px-4 py-16">
                <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-start gap-12 text-center lg:text-left">
                    {/* Logo & Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex flex-col items-center lg:items-start space-y-3 mb-6">
                            <div className="flex items-center space-x-3">
                                <div>
                                    <h3 className="text-xl font-bold">Trường Đại học Hùng Vương</h3>
                                    <p className="text-gray-400">TP. Hồ Chí Minh</p>
                                </div>
                            </div>
                            <p className="text-gray-300 max-w-md">
                                30 năm kinh nghiệm đào tạo, chúng tôi cam kết mang đến chất lượng giáo dục tốt nhất
                                và môi trường học tập hiện đại cho sinh viên.
                            </p>
                        </div>
                        {/* Social Media */}
                        <div className="flex justify-center lg:justify-start space-x-4">
                            <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-200">
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-200">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors duration-200">
                                <Youtube className="w-5 h-5" />
                            </a>
                            <a href="#" className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-200">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        <h4 className="text-lg font-semibold mb-6">Liên hệ</h4>
                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-center justify-start space-x-3">
                                <Phone className="w-5 h-5 text-blue-400" />
                                <p>02871000888 - 02871001888</p>
                            </div>
                            <div className="flex items-center justify-start space-x-3">
                                <Mail className="w-5 h-5 text-blue-400" />
                                <p>info@dhv.edu.vn | media@dhv.edu.vn</p>
                            </div>
                            <div className="flex items-start justify-start space-x-3">
                                <MapPin className="w-5 h-5 text-blue-400 mt-1" />
                                <div className="space-y-1">
                                    <p>Trụ sở chính: 736 Nguyễn Trãi, Phường 11, Quận 5, Tp.HCM</p>
                                    <p>Cơ sở 1: 28–30 Ngô Quyền, Phường 6, Quận 5, Tp.HCM</p>
                                    <p>Cơ sở 2: 37 Kinh Dương Vương, Phường 12, Quận 6, TP.HCM</p>
                                    <p>Cơ sở 3: Công viên Phần mềm Quang Trung, P. Tân Chánh Hiệp, Quận 12, TP.HCM (Cơ sở thực hành – nghiên cứu)</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold mb-6">Liên kết nhanh</h4>
                        <div className="space-y-3">
                            <a href="#about" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Giới thiệu</a>
                            <a href="#timeline" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Lịch sử phát triển</a>
                            <a href="#alumni" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Cựu thành viên</a>
                            <a href="#souvenirs" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Quà lưu niệm</a>
                            <a href="#admissions" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Tuyển sinh</a>
                            <a href="#gallery" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Thư viện ảnh</a>
                            <a href="#contact" className="block text-gray-300 hover:text-blue-400 transition-colors duration-200">Liên hệ</a>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="border-t border-gray-800 pt-8 mt-12"
                >
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="text-gray-400 text-sm">
                            © 2025 Trường Đại học Hùng Vương TP.HCM. Tất cả quyền được bảo lưu.
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;