"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ScholarshipFund from "./ScholarshipFund.jsx";
import ScholarshipItem from "./ScholarshipItem.jsx";

const HeroText2 = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth < 640);
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    return (
        <div className="relative flex flex-col items-center justify-center w-full h-full text-center gap-6 px-4 pointer-events-none">

            {/* KHỐI TIÊU ĐỀ HỌC BỔNG */}
            <motion.div
                className="pointer-events-auto max-w-md  ml-30 sm:ml-0"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, ease: "easeOut" }}
                viewport={{ once: true, amount: 0.6 }}
            >
                <ScholarshipFund
                    amount={{ value: 30, unit: "TỶ ĐỒNG" }}
                    label="QUỸ HỌC BỔNG"
                    subtitle="cho Sinh viên nhập học năm 2025"
                />
            </motion.div>

            {/* KHỐI HỌC BỔNG PHỤ — chỉ hiện khi không phải mobile */}
            {!isMobile && (
                <div className="grid sm:grid-cols-2 gap-4 pointer-events-auto w-full max-w-md">
                    <ScholarshipItem
                        title='Học bổng "Hào Khí Hùng Vương"'
                        percent="70%"
                        period="Học phí HK1"
                        delay={1.1}
                        rotateFrom={-6}
                    />
                    <ScholarshipItem
                        title='Học bổng "Đôi Bạn Cùng Tiến"'
                        percent="40%"
                        period="Học phí HK2"
                        delay={1.3}
                        rotateFrom={5}
                    />
                </div>
            )}

            {/* CTA BUTTON */}
            <motion.a
                initial={{ scale: 0.92, opacity: 0.85 }}
                animate={{ scale: [1, 1.07, 1], opacity: 1 }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
                href="#admissions"
                className="pointer-events-auto ml-30 sm:ml-0 inline-block px-6 py-3 rounded-2xl bg-gradient-to-r from-pink-600 via-indigo-600 to-blue-400 text-white text-base sm:text-lg font-bold shadow-lg shadow-pink-500/30 hover:scale-105 active:scale-95 focus:outline-none"
            >
                Đăng ký xét tuyển
            </motion.a>
        </div>
    );
};

export default HeroText2;
