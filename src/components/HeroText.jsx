import { FlipWords } from "./FlipWord.jsx";
import {motion} from "motion/react";

const container = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.1 },
    },
};

const item = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const HeroText = () => {
    const words = ["Trung Nghĩa", "Tự Tin", "Trách Nhiệm"];

    return (
        <motion.div
            className="z-10 mt-8 text-center md:mt-20 md:text-left rounded-3xl"
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {/* Desktop */}
            <div className="hidden md:flex flex-col items-center c-space gap-3 mt-16">
                {/* Kỷ Niệm - nhỏ, màu gradient hoặc nhấn màu */}
                <motion.h2
                    className="font-akashi text-5xl font-bold text-indigo-400 tracking-wider mb-2"
                    variants={item}
                >
                    Kỷ Niệm
                </motion.h2>

                <motion.h1
                    className="font-akashi text-6xl font-black text-white mb-1 tracking-wide"
                    variants={item}
                >
                    30 NĂM THÀNH LẬP
                </motion.h1>


                <motion.div variants={item} className="my-2">
                    <FlipWords
                        words={words}
                        className="font-akashi text-8xl font-black text-white drop-shadow-md"
                        duration={0.1}
                    />
                </motion.div>


                <motion.p
                    className="font-chaney text-xl font-medium text-neutral-300 uppercase tracking-widest mt-6"
                    variants={item}
                >
                    TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG TP. HCM
                </motion.p>
            </div>

            {/* Mobile */}
            <div className=" flex-col space-y-4 md:hidden c-space mt-12">
                <motion.h1
                    className="font-vietnam text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-pink-600"
                    variants={item}
                >
                    Kỷ Niệm
                </motion.h1>

                <motion.p
                    className="font-akashi text-4xl font-semibold text-neutral-300"
                    variants={item}
                >
                    30 NĂM THÀNH LẬP
                </motion.p>

                <motion.div variants={item}>
                    <FlipWords
                        words={words}
                        className="font-calvera ont-bold text-5xl text-center text-white"
                    />
                </motion.div>

                <motion.p
                    className="font-akashi text-xl font-medium text-neutral-300 uppercase"
                    variants={item}
                >
                    TRƯỜNG ĐẠI HỌC HÙNG VƯƠNG TP. HCM
                </motion.p>
            </div>
        </motion.div>
    );
};

export default HeroText;
