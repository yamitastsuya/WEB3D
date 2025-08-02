//src/sections/Admissions.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Clock, FileText, Phone, Mail, MapPin } from 'lucide-react';

const AdmissionsSection = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        program: '',
        message: ''
    });

    const programs = [
        'Công nghệ thông tin',
        'Kinh tế',
        'Quản trị kinh doanh',
        'Ngôn ngữ Anh',
        'Kế toán',
        'Marketing',
        'Khác'
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        alert('Cảm ơn bạn đã đăng ký! Chúng tôi sẽ liên hệ sớm nhất có thể.');
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <section id="admissions" className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Tuyển sinh 2025
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Tham gia cộng đồng sinh viên Hùng Vương - nơi ươm mầm tương lai và phát triển tài năng
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Thông tin tuyển sinh */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                                <GraduationCap className="w-6 h-6 text-blue-600 mr-3" />
                                Thông tin tuyển sinh
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start space-x-4">
                                    <Clock className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Thời gian đăng ký</h4>
                                        <p className="text-gray-600">01/03/2025 - 31/08/2025</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-4">
                                    <FileText className="w-5 h-5 text-blue-600 mt-1" />
                                    <div>
                                        <h4 className="font-semibold text-gray-800">Hồ sơ cần thiết</h4>
                                        <ul className="text-gray-600 mt-2 space-y-1">
                                            <li>• Bằng tốt nghiệp THPT (bản sao)</li>
                                            <li>• Học bạ THPT (bản sao)</li>
                                            <li>• Giấy khai sinh (bản sao)</li>
                                            <li>• Ảnh 3x4 (4 ảnh)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Ngành đào tạo nổi bật
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {programs.slice(0, 6).map((program, index) => (
                                    <div key={index} className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                        <span className="text-gray-700">{program}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>

                    {/* Form đăng ký */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white rounded-xl shadow-lg p-8">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">
                                Đăng ký tư vấn nhanh
                            </h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                        Họ và tên *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full text-black px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nhập họ và tên của bạn"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nhập email của bạn"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                                        Số điện thoại *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nhập số điện thoại"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-2">
                                        Ngành quan tâm *
                                    </label>
                                    <select
                                        id="program"
                                        name="program"
                                        required
                                        value={formData.program}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Chọn ngành học</option>
                                        {programs.map((program, index) => (
                                            <option key={index} value={program}>{program}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                                        Tin nhắn
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={4}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Nhập câu hỏi hoặc thông tin thêm..."
                                    />
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 shadow-lg hover:shadow-xl"
                                >
                                    Gửi đăng ký
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AdmissionsSection;
//tam duoc