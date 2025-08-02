//src/sections/Hero.jsx
import React, { useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Float } from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import HeroText from "../components/HeroText.jsx";
import HeroText2 from "../components/HeroText2.jsx";
import ParallaxBackground from "../components/ParallaxBackground.jsx";
import Loader from "../components/Loader";
import { Astronaut } from "../components/Astronaut.jsx";
import { useMediaQuery } from "react-responsive";
import ParallaxBackground2 from "../components/ParallaxBackground2.jsx";

const getSlides = (isMobile) => [
    {
        key: "slide1",
        bg: <ParallaxBackground />,
        object: (
            <Float>
                <Astronaut
                    scale={isMobile ? 1.3 : 2}
                    position={isMobile ? [0, -2, 0] : [5, -1.2, -1.5]}
                />
            </Float>
        ),
        content: (
            <div
                className={`
          absolute z-20 left-0 top-0 w-full h-full flex items-start
          ${isMobile ? "justify-center pt-8 pl-0" : "justify-start pt-14 pl-20"}
          pointer-events-none
        `}
            >
                <HeroText />
            </div>
        ),
    },
    {
        key: "slide2",
        bg: <ParallaxBackground2 />,
        object: null,
        content: (
            <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
                <div
                    className="transform"
                    style={{
                        translate: "calc(-15vw) 0px" // Tự chỉnh nếu muốn dịch trái, lên xuống
                    }}
                >
                    <HeroText2 />
                </div>
            </div>
        ),
    },
];

const AUTO_SLIDE_DELAY = 4213;
const TRANSITION_DURATION = 0.95;

const Hero = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
    const [current, setCurrent] = useState(0);
    const slides = getSlides(isMobile);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((c) => (c + 1) % slides.length);
        }, AUTO_SLIDE_DELAY);
        return () => clearInterval(timer);
    }, [slides.length]);

    const next = () => setCurrent((c) => (c + 1) % slides.length);
    const prev = () => setCurrent((c) => (c - 1 + slides.length) % slides.length);

    return (
        <section
            className={`
        relative w-screen 
        ${isMobile ? "h-[80vh] min-h-[420px]" : "h-screen min-h-[600px]"} 
        overflow-hidden z-0
      `}
        >
            {/* Slide Background hiệu ứng */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[current].key + "-bg"}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: TRANSITION_DURATION }}
                    className="absolute inset-0 z-0"
                >
                    {slides[current].bg}
                </motion.div>
            </AnimatePresence>

            {/* Nội dung chữ động (tuyển sinh hoặc hero text) */}
            {slides[current].content}

            {/* 3D Canvas hiệu ứng chuyển */}
            <AnimatePresence mode="wait">
                {slides[current].object && (
                    <motion.figure
                        key={slides[current].key + "-3d"}
                        className="absolute inset-0 w-full h-full z-10"
                        initial={{ opacity: 0, x: 80 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -80 }}
                        transition={{ duration: TRANSITION_DURATION }}
                    >
                        <Canvas camera={{ position: [0, 1, 5] }}>
                            <Suspense fallback={<Loader />}>
                                <ambientLight intensity={1} />
                                {slides[current].object}
                                <OrbitControls />
                            </Suspense>
                        </Canvas>
                    </motion.figure>
                )}
            </AnimatePresence>

            {/* Carousel Controls */}
            <div className="absolute bottom-6 w-full flex justify-center items-center z-30 gap-4 pointer-events-auto">
                <button
                    onClick={prev}
                    className="rounded-full p-2 bg-black/40 hover:bg-black/70 text-white text-2xl"
                    aria-label="Prev slide"
                >&#8592;</button>
                {slides.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => setCurrent(i)}
                        className={`mx-1 w-3 h-3 rounded-full border border-white ${current === i ? "bg-white" : "bg-gray-500/50"}`}
                        aria-label={`Go to slide ${i + 1}`}
                    />
                ))}
                <button
                    onClick={next}
                    className="rounded-full p-2 bg-black/40 hover:bg-black/70 text-white text-2xl"
                    aria-label="Next slide"
                >&#8594;</button>
            </div>
        </section>
    );
};

export default Hero;
