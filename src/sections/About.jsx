// /src/sections/About.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar, Award, Users, Building2 } from "lucide-react";

const historyEvents = [
    {
        year: "1993",
        title: "Hội đồng sáng lập",
        description: "Thành lập Hội đồng Sáng lập Trường ĐH Dân lập Hùng Vương.",
        icon: Building2,
        color: "bg-blue-500",
        image: "/assets/1993.png",
    },
    {
        year: "1995",
        title: "Thành lập chính thức",
        description: "Chính thức thành lập Trường Đại học Dân lập Hùng Vương TP.HCM.",
        icon: Calendar,
        color: "bg-green-500",
        image: null,
    },
    {
        year: "1996",
        title: "Ra mắt logo truyền thống",
        description: "Ra mắt logo truyền thống lần đầu tiên.",
        icon: Award,
        color: "bg-yellow-500",
        image: "/assets/logo-1996.png",
    },
    {
        year: "2008",
        title: "Đổi tên trường",
        description: "Đổi tên thành Trường Đại học Hùng Vương TP.HCM.",
        icon: Calendar,
        color: "bg-purple-500",
        image: null,
    },
    {
        year: "2010",
        title: "Chuyển đổi loại hình",
        description: "Chuyển từ dân lập sang tư thục.",
        icon: Users,
        color: "bg-red-500",
        image: null,
    },
    {
        year: "2017",
        title: "Logo HVUH",
        description: "Ra mắt bộ nhận diện thương hiệu HVUH.",
        icon: Award,
        color: "bg-indigo-500",
        image: "/assets/logo-2017.png",
    },
    {
        year: "2023",
        title: "Logo DHV mới",
        description: "Công bố bộ nhận diện thương hiệu DHV mới.",
        icon: Award,
        color: "bg-pink-500",
        image: "/assets/logo-2023.png",
    },
];

const About = () => {
    return (
        <section
            id="about"
            className="py-20 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#0f0f1a] to-[#1a1a2e]"
        >
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-akashi text-white mb-4">
                        GIỚI THIỆU
                    </h2>
                    <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                        Trường Đại học Hùng Vương TP.HCM – Hành trình gần 30 năm xây dựng
                        và phát triển bền vững.
                    </p>
                </motion.div>

                <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-pink-500/30 hidden md:block"></div>

                    <div className="space-y-16">
                        {historyEvents.map((item, index) => (
                            <motion.div
                                key={item.year}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className={`flex items-center ${
                                    index % 2 === 0
                                        ? "md:flex-row"
                                        : "md:flex-row-reverse"
                                } flex-col md:flex-row`}
                            >
                                <div
                                    className={`w-full md:w-5/12 ${
                                        index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                                    }`}
                                >
                                    <div className="bg-white/5 backdrop-blur rounded-xl shadow-lg overflow-hidden hover:shadow-pink-500/20 transition">
                                        {/* Nếu có ảnh */}
                                        {item.image && (
                                            <div className="relative h-48 overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-full h-full object-cover rounded-t-xl transition-transform duration-300 hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                                {/* Year badge */}
                                                <div className="absolute top-4 left-4">
                                                    <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-1">
                            <span className="text-xl font-bold text-gray-800">
                              {item.year}
                            </span>
                                                    </div>
                                                </div>

                                                {/* Icon */}
                                                <div
                                                    className={`absolute bottom-4 right-4 w-10 h-10 rounded-full ${item.color} flex items-center justify-center text-white shadow-lg`}
                                                >
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Nội dung chính */}
                                        <div className="p-5">
                                            <h4 className="text-xl font-bold text-pink-400 mb-2">
                                                {item.title}
                                            </h4>
                                            <p className="text-gray-300 text-sm whitespace-pre-line">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Dot timeline */}
                                <div className="w-6 h-6 bg-pink-500 rounded-full border-4 border-white shadow-lg hidden md:flex items-center justify-center relative z-10">
                                    <div className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-20"></div>
                                </div>

                                <div className="w-full md:w-5/12" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
