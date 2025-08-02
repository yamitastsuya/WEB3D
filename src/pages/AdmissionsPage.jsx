import React, { useState, useEffect, useRef, useCallback } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FileText, Calendar, Users, Award, Phone, Mail, MapPin, UploadCloud } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Navbar from '../sections/Navbar';
import Footer from '../sections/Footer';

const AdmissionsPage = () => {
    const formRef = useRef();
    const { pathname } = useLocation();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        grade: '',
        message: '',
        file: null
    });
    const [floatingStyle, setFloatingStyle] = useState({});

    useEffect(() => {
        window.scrollTo(0, 0);
        AOS.init({ duration: 800, once: true });

        const handleScroll = () => {
            const offset = window.pageYOffset;
            setFloatingStyle({
                transform: `translateY(${offset * 0.1}px)`
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    const scrollToForm = useCallback(() => {
        formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'file' ? files[0] : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        // Logic to submit form data (e.g., API call) can be added here
    };

    return (
        <div className="bg-gray-50 m-0 p-0 overflow-x-hidden">
            <Navbar />
            <div className="pt-0 min-h-screen bg-gray-50">
                {/* Hero Section */}
                <section className="relative pt-28 bg-gradient-to-r from-blue-700 to-red-600 text-white overflow-hidden">
                    {/* Animation background */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-[url('/assets/bgh.jpg')] bg-cover bg-center opacity-20"></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/90 to-red-600/90"></div>
                    </div>

                    <div className="relative max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-between py-20">
                        <div className="lg:w-1/2 text-center lg:text-left z-10" data-aos="fade-right">
                            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                                <span className="inline-block" data-aos="fade-up" data-aos-delay="100">Tuyển sinh năm học</span>
                                <br />
                                <span className="text-yellow-300" data-aos="fade-up" data-aos-delay="200">2024-2025</span>
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 relative inline-block" data-aos="fade-up" data-aos-delay="300">
                                <span className="relative z-10">Mở cửa tương lai - Đồng hành cùng ước mơ</span>
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start" data-aos="fade-up" data-aos-delay="400">
                                <button
                                    onClick={scrollToForm}
                                    className="relative overflow-hidden group bg-white text-blue-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
                                >
                                    <span className="relative z-10">Đăng ký ngay</span>
                                    <span className="absolute inset-0 w-0 bg-blue-700 group-hover:w-full transition-all duration-300 ease-in-out"></span>
                                </button>
                            </div>
                        </div>

                        <div className="lg:w-1/2 mt-10 lg:mt-0 relative z-10" data-aos="fade-left" style={floatingStyle}>
                            <div className="relative group">
                                <img
                                    src="/assets/bgh.jpg" // Đảm bảo đường dẫn đúng
                                    alt="Học sinh trong lớp học"
                                    className="w-full max-w-md mx-auto lg:max-w-lg rounded-xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-blue-500/10 rounded-xl group-hover:bg-transparent transition-all duration-500"></div>
                                <div className="absolute -inset-4 rounded-2xl border-2 border-white/30 pointer-events-none transform transition-all duration-700 group-hover:scale-105 group-hover:opacity-0"></div>
                            </div>
                        </div>
                    </div>

                    {/* Particle animation */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute rounded-full bg-white/20"
                                style={{
                                    width: Math.random() * 10 + 5 + 'px',
                                    height: Math.random() * 10 + 5 + 'px',
                                    top: Math.random() * 100 + '%',
                                    left: Math.random() * 100 + '%',
                                    animation: `float ${Math.random() * 10 + 5}s linear infinite`,
                                    animationDelay: `${Math.random() * 5}s`
                                }}
                            />
                        ))}
                    </div>
                </section>

                <style jsx>{`
                    @keyframes float {
                        0% { transform: translateY(0) translateX(0); opacity: 1; }
                        100% { transform: translateY(-100vh) translateX(20px); opacity: 0; }
                    }
                `}</style>

                {/* Admission Info */}
                {/* Admission Info */}
                <section className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12">Thông tin tuyển sinh</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {/* Item 1 */}
                            <div className="text-center p-6 bg-blue-50 rounded-lg">
                                <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Calendar className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-blue-600">Thời gian</h3>
                                <p className="text-gray-600">01/03 - 31/08/2024</p>
                            </div>

                            {/* Item 2 */}
                            <div className="text-center p-6 bg-red-50 rounded-lg">
                                <div className="bg-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-red-600">Chỉ tiêu</h3>
                                <p className="text-gray-600">2,500 sinh viên</p>
                            </div>

                            {/* Item 3 */}
                            <div className="text-center p-6 bg-green-50 rounded-lg">
                                <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Award className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-green-600">Điểm chuẩn</h3>
                                <p className="text-gray-600">Từ 16.0 điểm</p>
                            </div>

                            {/* Item 4 */}
                            <div className="text-center p-6 bg-purple-50 rounded-lg">
                                <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <FileText className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-purple-600">Hồ sơ</h3>
                                <p className="text-gray-600">Online & Offline</p>
                            </div>
                        </div>
                    </div>
                </section>


                {/* Admission Process */}
                <section className="py-16 bg-gray-50" data-aos="fade-up">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Quy trình tuyển sinh</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { step: 1, color: 'blue', title: 'Đăng ký', desc: 'Điền form đăng ký online hoặc nộp hồ sơ trực tiếp tại 4 cơ sở của trường' },
                                { step: 2, color: 'red', title: 'Xét tuyển', desc: 'Xét tuyển dựa trên kết quả thi THPT Quốc gia hoặc học bạ THPT' },
                                { step: 3, color: 'green', title: 'Nhập học', desc: 'Thông báo kết quả và hoàn thành thủ tục nhập học' }
                            ].map(({ step, color, title, desc }) => (
                                <div key={step} className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition" data-aos="zoom-in">
                                    <div className={`bg-${color}-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        <span className="text-white font-bold text-xl">{step}</span>
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-4 text-${color}-600`}>{title}</h3>
                                    <p className="text-gray-600">{desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Registration Form */}
                <section ref={formRef} className="py-16 bg-white" data-aos="fade-up">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Đăng ký tư vấn</h2>
                        <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-md" encType="multipart/form-data">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Họ và tên *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Số điện thoại *</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        required
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-3 py-2 text-black border border-gray-300 rounded-md"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Ngành dự tuyển *</label>
                                    <select
                                        name="grade"
                                        required
                                        value={formData.grade}
                                        onChange={handleInputChange}
                                        className="w-full text-black px-3 py-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Chọn ngành</option>
                                        <option value="HOST">Du lịch (HOST)</option>
                                        <option value="BAM">Kinh tế (BAM)</option>
                                        <option value="TEC">Công nghệ (TEC)</option>
                                        <option value="LAN">Ngôn ngữ (LAN)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Upload hồ sơ */}
                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Tải lên hồ sơ (CV / PDF)</label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="file"
                                        name="file"
                                        accept=".pdf,.doc,.docx"
                                        onChange={handleInputChange}
                                        className="w-full text-blue-500"
                                    />
                                    <UploadCloud className="text-blue-500" />
                                </div>
                            </div>

                            <div className="mt-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">Lời nhắn</label>
                                <textarea
                                    name="message"
                                    rows={4}
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Bạn muốn hỏi gì?"
                                    className="w-full text-black px-3 py-2 border border-gray-300 rounded-md"
                                />
                            </div>

                            <div className="mt-8 text-center">
                                <button type="submit" className="bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
                                    Gửi đăng ký
                                </button>
                            </div>
                        </form>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-16 bg-gray-50" data-aos="fade-up">
                    <div className="max-w-7xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Liên hệ tư vấn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                { icon: <Phone />, title: 'Điện thoại', color: 'blue', values: ['02871000888', '02871001888'] },
                                { icon: <Mail />, title: 'Email', color: 'red', values: ['info@dhv.edu.vn', 'media@dhv.edu.vn'] },
                                { icon: <MapPin />, title: 'Địa chỉ', color: 'green', values: ['736 Nguyễn Trãi, Phường 11, Quận 5', 'TP.HCM, Việt Nam'] }
                            ].map(({ icon, title, color, values }, idx) => (
                                <div key={idx} className="text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition" data-aos="zoom-in">
                                    <div className={`bg-${color}-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                        {React.cloneElement(icon, { className: 'h-8 w-8 text-white' })}
                                    </div>
                                    <h3 className={`text-xl font-semibold mb-2 text-${color}-600`}>{title}</h3>
                                    {values.map((v, i) => <p key={i} className="text-gray-600">{v}</p>)}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </div>
    );
};

export default AdmissionsPage;
