// ScholarshipFund.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { scholarshipVariants } from "./variants.js";

// Các kiểu animation cho thanh highlight
const highlightVariants = {
    hidden: { scaleX: 0, opacity: 0.3 },
    visible: {
        scaleX: 1,
        opacity: 1,
        transition: { duration: 0.6, ease: "easeOut" },
    },
};

const ScholarshipFund = ({ amount, label, subtitle }) => (
    <motion.div
        variants={scholarshipVariants}
        custom={0.8}
        className="flex flex-col items-center"
    >
        {/* Label chính */}
        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-tight leading-none mb-2"
        >
            <span className="text-[#cd1831]">{label}</span>
        </motion.div>

        {/* Subtitle với hiệu ứng highlight */}
        <div className="relative inline-block mt-1 mb-2">
            {/* Thanh highlight phía sau */}
            <motion.span
                className="absolute w-full inset-y-0 left-0  bg-blue-600/40"
                style={{ transformOrigin: "left center" }}
                variants={highlightVariants}
                initial="hidden"
                animate="visible"
            />
            {/* Text gốc */}
            <span className="font-chaney relative text-black text-1xl font-bold">
        {subtitle}
      </span>
        </div>

        {/* Giá trị quỹ */}
        <span className="block text-yellow-500 text-6xl md:text-8xl font-black leading-none mb-1">
      {amount.value}
    </span>
        <span className="text-[#cd1831] text-3xl md:text-5xl font-extrabold">
      {amount.unit}
    </span>
    </motion.div>
);

export default ScholarshipFund;
