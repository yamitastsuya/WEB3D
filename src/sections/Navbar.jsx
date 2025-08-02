import React, { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import LogoFlipNavbar from "../components/LogoFlipNavbar";
import { Link, useNavigate, useLocation } from "react-router-dom";

const navItems = [
    { name: "Trang Chủ", type: "link", to: "/" }, // Updated to point to the root path
    { name: "Thông Tin", type: "scroll", id: "about" },
    { name: "Tuyển Sinh", type: "link", to: "/tuyen-sinh" },
    {
        name: "Cựu Sinh Viên", type: "scroll", id: "cuusinhvien", children: [
            {
                title: "Huỳnh Phúc Vinh",
                description: "Cựu SV ngành CNTT. CTO VinHMS - Tập đoàn VinGroup.",
                id: "cuusinhvien1",
                img: "/assets/Cuusinhvien1.png",
            },
            {
                title: "Nguyễn Mỹ Linh",
                description: "Cựu SV ngành Quản lý Bệnh viện. Trưởng phòng CTXH BV Nguyễn Tri Phương.",
                id: "cuusinhvien2",
                img: "/assets/Cuusinhvien2.png",
            },
            {
                title: "Đoàn Lâm Quang Minh",
                description: "Cựu SV ngành Du lịch. Founder Minh Team SJC.",
                id: "cuusinhvien3",
                img: "/assets/Cuusinhvien3.png",
            },
        ]
    },
    { name: "Thành Tựu", type: "scroll", id: "Achievements" },
    { name: "Liên Hệ", type: "scroll", id: "contact" },
    { name: "Quà Lưu Niệm", type: "link", to: "/souvenir" },
];

const Navbar = () => {
    const [hoveredItem, setHoveredItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // Scroll effect
    let scrollY = { on: () => {} };
    try {
        scrollY = useScroll ? useScroll() : { on: () => {} };
        useMotionValueEvent && useMotionValueEvent(scrollY.scrollY, "change", (latest) => {
            setScrolled(latest > 50);
        });
    } catch {}


    const scrollToId = (id) => {
        if (location.pathname === "/") {
            const el = document.getElementById(id);
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else {
            localStorage.setItem("scrollToSection", id);
            navigate("/");
        }
    };

    return (
        <div className="fixed top-5 inset-x-0 z-50 flex justify-center">
            <motion.div
                className="bg-black/90 backdrop-blur-md rounded-full shadow-lg px-6 sm:px-8 w-full max-w-6xl flex items-center justify-between"
                initial={{ y: -20, opacity: 0 }}
                animate={{
                    y: 0,
                    opacity: 1,
                    paddingTop: scrolled ? 10 : 16,
                    paddingBottom: scrolled ? 10 : 16,
                    scale: scrolled ? 0.98 : 1,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 30 }}
            >
                <Link to="/" className="flex items-center">
                    <LogoFlipNavbar />
                </Link>

                {/* Mobile Toggle */}
                <button className="sm:hidden p-2 z-50 relative" onClick={() => setIsOpen(!isOpen)}>
                    <img
                        src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
                        alt="menu"
                        className="w-7 h-7"
                    />
                </button>

                {/* Desktop Nav */}
                <ul className="hidden sm:flex gap-6 text-white font-semibold text-sm relative">
                    {navItems.map((item, idx) => (
                        <li
                            key={idx}
                            onMouseEnter={() => item.children && setHoveredItem(item.name)}
                            onMouseLeave={() => setHoveredItem(null)}
                            className="relative"
                        >
                            {item.type === "link" ? (
                                <Link to={item.to} className="hover:text-aqua transition">
                                    {item.name}
                                </Link>
                            ) : (
                                <span
                                    onClick={() => scrollToId(item.id)}
                                    className={`cursor-pointer hover:text-aqua transition ${hoveredItem === item.name ? "text-aqua" : ""}`}
                                >
                                    {item.name}
                                </span>
                            )}

                            {/* Dropdown */}
                            <AnimatePresence>
                                {item.children && hoveredItem === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.25 }}
                                        className="absolute top-full mt-4 left-1/2 -translate-x-1/2 z-50 bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 w-[90vw] max-w-3xl justify-items-center"
                                    >
                                        {item.children.map((alumni, i) => (
                                            <div
                                                key={i}
                                                onClick={() => {
                                                    scrollToId(alumni.id);
                                                    setHoveredItem(null);
                                                }}
                                                className="flex flex-col items-center text-center hover:text-aqua transition-all w-full max-w-[180px] cursor-pointer"
                                            >
                                                <img src={alumni.img} alt={alumni.title} className="w-20 h-20 object-cover rounded-full mb-3 shadow-md" />
                                                <h4 className="font-semibold text-sm text-black dark:text-white">
                                                    {alumni.title}
                                                </h4>
                                                <p className="text-xs text-neutral-700 dark:text-neutral-300 mt-1 leading-snug">
                                                    {alumni.description}
                                                </p>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute top-full mt-4 w-[90%] bg-black text-white rounded-2xl shadow-lg p-4 flex flex-col gap-4 sm:hidden z-40"
                    >
                        {navItems.map((item, idx) => (
                            <li key={idx}>
                                {item.type === "link" ? (
                                    <Link
                                        to={item.to}
                                        onClick={() => setIsOpen(false)}
                                        className="block w-full text-left hover:text-aqua transition"
                                    >
                                        {item.name}
                                    </Link>
                                ) : (
                                    <span
                                        onClick={() => {
                                            scrollToId(item.id);
                                            setIsOpen(false);
                                        }}
                                        className="block w-full text-left hover:text-aqua transition cursor-pointer"
                                    >
                                        {item.name}
                                    </span>
                                )}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Navbar;
