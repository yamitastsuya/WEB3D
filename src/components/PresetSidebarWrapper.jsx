import React, { useState, useRef } from "react";
import PresetSidebar from "./PresetSidebar"; // Đúng đường dẫn
import { ChevronLeft } from "lucide-react";

const glassStyle = {
    background: "rgba(255,255,255,0.77)",
    boxShadow: "8px 0 32px 0 #4493d5a5, 0 4px 32px 0 #ffffff0f",
    borderRight: "2px solid rgba(170, 205, 255, 0.25)",
    backdropFilter: "blur(18px)",
};

export default function PresetSidebarWrapper(props) {
    const [open, setOpen] = useState(false);
    const [hover, setHover] = useState(false);
    const sidebarRef = useRef();

    React.useEffect(() => {
        let timeout;
        function handleMove(e) {
            if (e.clientX <= 18 && !open) {
                setHover(true);
                timeout = setTimeout(() => setOpen(true), 160);
            } else {
                setHover(false);
                clearTimeout(timeout);
            }
        }
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, [open]);

    function handleSidebarLeave(e) {
        if (!sidebarRef.current) return;
        // Nếu di chuyển khỏi bên phải sidebar => ẩn đi
        if (e.clientX > sidebarRef.current.getBoundingClientRect().right) {
            setOpen(false);
        }
    }

    return (
        <>
            {/* Nút bật/tắt sidebar */}
            {!open && (
                <button
                    aria-label="Mở menu"
                    className={`
            fixed z-[999] left-0 top-1/2 -translate-y-1/2
            p-0 w-14 h-24
            flex items-center justify-center
            bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400
            rounded-r-full shadow-2xl border-none
            ring-2 ring-white/10 hover:ring-blue-400
            transition-all duration-400
            ${hover ? "opacity-90 scale-110" : "opacity-80"}
            cursor-pointer group"
          `}
                    style={{
                        boxShadow: "2px 6px 32px 0 #4d88ee3b",
                        filter: "drop-shadow(0 4px 24px #89c6ff44)",
                        outline: "none"
                    }}
                    onClick={() => setOpen(true)}
                    tabIndex={0}
                >
                    <ChevronLeft size={38} className="text-white drop-shadow-lg transition-transform group-hover:-translate-x-1" />
                </button>
            )}

            {/* Sidebar chính */}
            <aside
                ref={sidebarRef}
                className={`
          fixed z-[1000] top-0 left-0
          h-full max-h-screen w-[328px] sm:w-[358px]
          transition-transform duration-500
          ${open ? "translate-x-0" : "-translate-x-[93%] sm:-translate-x-[95%]"}
        `}
                style={{
                    ...glassStyle,
                    borderTopRightRadius: 32,
                    borderBottomRightRadius: 32,
                    overflowY: "auto",
                    transitionTimingFunction: "cubic-bezier(0.78,0.1,0.22,1.08)",
                }}
                onMouseLeave={handleSidebarLeave}
                onMouseEnter={() => setOpen(true)}
            >
                {/* Nút đóng */}
                <button
                    className={`
            absolute right-[-38px] top-1/2 -translate-y-1/2
            w-14 h-24 flex items-center justify-center
            bg-gradient-to-b from-blue-400 via-blue-500 to-cyan-400
            rounded-l-full shadow-xl border-none
            hover:scale-110 hover:ring-2 hover:ring-blue-300
            transition-all duration-400
            cursor-pointer
          `}
                    style={{
                        boxShadow: "0 2px 32px #70b1f2a9",
                        filter: "drop-shadow(0 6px 30px #bae2ff99)",
                    }}
                    onClick={() => setOpen(false)}
                    tabIndex={0}
                >
                    <ChevronLeft size={38} className="text-white rotate-180 drop-shadow" />
                </button>
                {/* Nội dung sidebar cũ */}
                <PresetSidebar {...props} />
            </aside>
        </>
    );
}
