"use client";
import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const ParallaxBackground = () => {
    const { scrollYProgress } = useScroll();
    const x = useSpring(scrollYProgress, { damping: 50 });
    const cityY = useTransform(x, [0, 0.5], ["0%", "70%"]);
    const birdDX = useTransform(x, [0, 0.5], ["0%", "-20%"]);
    const nui2Y = useTransform(x, [0, 0.5], ["0%", "30%"]);

    const isMobile = useMediaQuery({ maxWidth: 639 });

    return (
        <section className="absolute inset-0 bg-black/40">
            <div className="relative h-screen overflow-y-hidden">
                {/* Sky static background */}
                <motion.div
                    className="absolute inset-0 w-full h-screen -z-50"
                    style={{
                        backgroundImage: "url(/assets/sky.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                />

                {/* City layer with parallax & entrance fade-up */}
                <motion.div
                    className="absolute inset-0 -z-40"
                    style={{
                        backgroundImage: "url(/assets/city.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        y: cityY,
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                />

                {/* Birds layer with slide-in from left */}
                <motion.div
                    className="absolute inset-0 -z-30"
                    style={{
                        backgroundImage: "url(/assets/birdss.png)",
                        backgroundPosition: "bottom",
                        backgroundSize: "cover",
                        x: birdDX,
                    }}
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.4, delay: 0.4 }}
                />

                {/* Mountains with scale + fade effect */}
                <motion.div
                    className="absolute inset-0 -z-10 w-full h-full"
                    style={{
                        backgroundImage: "url(/assets/nui2.png)",
                        backgroundPosition: isMobile ? "top 20px center" : "bottom -550px center",
                        backgroundSize: isMobile ? "400% auto" : "130% auto",
                        backgroundRepeat: "no-repeat",
                        y: nui2Y,
                    }}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 0.6 }}
                />
            </div>
        </section>
    );
};

export default ParallaxBackground;
