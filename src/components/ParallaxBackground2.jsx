"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "react-responsive";
const ParallaxBackground2 = () => {
    const { scrollX } = useScroll();
    const xPos = useTransform(scrollX, [0, 1000], [0, -200]);
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

    return (
        <div className="absolute inset-0 w-full h-full z-0 bg-white overflow-hidden">
            {/* Lớp SVG background (tĩnh) */}
            <img
                src="/assets/svg/scattered-forcefields.svg"
                alt="Modern Parallax Lines"
                className="w-full h-full object-cover pointer-events-none select-none"
                draggable={false}
            />

            {!isMobile && (
                <>
                    {/* Hình người với hiệu ứng parallax */}
                    <motion.img
                        src="/assets/humanpoint.png"
                        alt="Người chỉ tay"
                        draggable={false}
                        style={{ x: xPos }}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="absolute -bottom-80 right-0 h-[500px] md:h-[1000px] max-w-none object-contain pointer-events-none select-none z-10"
                    />

                    {/* Đám mây */}
                    <motion.img
                        src="/assets/may.png"
                        alt="Đám mây"
                        draggable={false}
                        initial={{ opacity: 0, y: -100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        viewport={{ once: false, amount: 0.2 }}
                        className="absolute top-0 left-0 h-[500px] md:h-[1500px] max-w-none object-top pointer-events-none select-none z-0"
                    />

                    {/* QR học bổng */}
                    <motion.img
                        src="/assets/QRhocbongxettuyen.png"
                        alt="dangkyxettuyen"
                        draggable={false}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="absolute bottom-2 left-5 h-[200px] md:h-[200px] max-w-none object-cover pointer-events-none select-none z-10"
                    />
                </>
            )}
        </div>
    );
};

export default ParallaxBackground2;
