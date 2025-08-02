import React, { useState } from "react";

export default function LogoFlipNavbar() {
    const [flipped, setFlipped] = useState(false);

    return (
        <div
            className="w-12 h-12 cursor-pointer"
            onClick={() => setFlipped(f => !f)}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
            style={{ perspective: 500 }}
            title="Chuyển đổi logo"
        >
            <div
                className={`
                    relative w-full h-full duration-500
                    [transform-style:preserve-3d]
                    ${flipped ? "[transform:rotateY(180deg)]" : ""}
                `}
            >
                {/* Mặt trước */}
                <img
                    src="/assets/logo-2023.png"
                    alt="logo 2023"
                    className="absolute w-full h-full object-contain"
                    style={{ backfaceVisibility: "hidden" }}
                    draggable={false}
                />
                {/* Mặt sau */}
                <img
                    src="/assets/logo-2017.png"
                    alt="logo 2017"
                    className="absolute w-full h-full object-contain scale-200"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                    draggable={false}
                />
            </div>
        </div>
    );
}
