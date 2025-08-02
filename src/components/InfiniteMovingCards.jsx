"use client";

import React, { useEffect, useRef, useState } from "react";

export const InfiniteMovingCards = ({
                                        items,
                                        direction = "left",
                                        speed = "fast",
                                        pauseOnHover = true,
                                        className = ""
                                    }) => {
    const containerRef = useRef(null);
    const scrollerRef = useRef(null);
    const [start, setStart] = useState(false);

    useEffect(() => {
        addAnimation();
    }, []);

    const addAnimation = () => {
        if (containerRef.current && scrollerRef.current) {
            const scrollerContent = Array.from(scrollerRef.current.children);
            scrollerContent.forEach((item) => {
                const clone = item.cloneNode(true);
                scrollerRef.current.appendChild(clone);
            });

            const dir = direction === "left" ? "forwards" : "reverse";
            containerRef.current.style.setProperty("--animation-direction", dir);

            const duration = speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
            containerRef.current.style.setProperty("--animation-duration", duration);

            setStart(true);
        }
    };

    return (
        <div
            ref={containerRef}
            className={`relative overflow-hidden max-w-6xl mx-auto mask-gradient z-20 ${className}`}
            style={{
                "--animation-direction": "forwards",
                "--animation-duration": "40s"
            }}
        >
            <ul
                ref={scrollerRef}
                className={`flex gap-4 py-4 w-max min-w-full animate-scroll whitespace-nowrap ${
                    pauseOnHover ? "hover:[animation-play-state:paused]" : ""
                }`}
            >
                {items.map((item, idx) => (
                    <li
                        key={item.name}
                        className="flex flex-col justify-between w-full max-w-md min-w-[250px] rounded-xl shadow-md bg-neutral-900 text-white p-5 break-words"
                    >
                        <p className="text-base leading-relaxed break-words whitespace-pre-line">
                            {item.quote}
                        </p>
                        <p className="text-sm text-indigo-400 font-medium mt-4">{item.name}</p>
                    </li>

                ))}
            </ul>
        </div>
    );
};
