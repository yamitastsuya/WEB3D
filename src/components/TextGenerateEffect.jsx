// TextGenerateEffect.jsx
"use client";
import React from "react";
import { motion } from "framer-motion";

const container = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2
        }
    }
};

const child = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: {
        opacity: 1,
        filter: "blur(0px)",
        transition: { duration: 0.5 }
    }
};

export function TextGenerateEffect({ words, className = "" }) {
    return (
        <motion.div
            className={`inline-block ${className}`}
            variants={container}
            initial="hidden"
            animate="visible"
        >
            {words.split(" ").map((word, idx) => (
                <motion.span
                    key={idx}
                    className="inline-block"
                    variants={child}
                >
                    {word}&nbsp;
                </motion.span>
            ))}
        </motion.div>
    );
}
