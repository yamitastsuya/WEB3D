// ScholarshipItem.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { scholarshipVariants } from "./variants.js";

const ScholarshipItem = ({ title, percent, period, delay, rotateFrom }) => (
    <motion.div
        variants={scholarshipVariants}
        custom={delay}
        className="rounded-2xl px-4 py-2 flex flex-col items-center bg-white/90 shadow-md border border-[#e7e7e7] min-w-[150px]"
    >
        <motion.div
            initial={{ rotate: rotateFrom }}
            animate={{ rotate: [0, -rotateFrom, rotateFrom, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatType: "mirror", delay }}
            className="text-base md:text-lg font-bold text-[#cd1831] mb-1 tracking-tight text-center"
        >
            {title}
        </motion.div>
        <span className="text-[#cd1831] text-3xl md:text-4xl font-black leading-none mt-2 mb-1">
      {percent}
    </span>
        <span className="text-black text-base font-semibold uppercase">
      {period}
    </span>
    </motion.div>
);

export default ScholarshipItem;
