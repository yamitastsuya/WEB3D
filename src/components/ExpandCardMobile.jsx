import React, { useState, useEffect } from "react";

export default function ExpandCardMobile({
                                             open,
                                             onClose,
                                             image,
                                             title,
                                             desc,
                                             prev,
                                             next,
                                             showNav = false
                                         }) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (open) setIsClosing(false);
    }, [open]);

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") handleClose(e);
        };
        if (open) window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [open]);

    useEffect(() => {
        if (open) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "";
        return () => { document.body.style.overflow = ""; };
    }, [open]);

    if (!open || isClosing) return null;

    const handleClose = (e) => {
        e.stopPropagation();
        setIsClosing(true);
        setTimeout(() => { onClose(); }, 120);
    };

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm"
            onClick={handleClose}
        >
            <div
                className="relative bg-black/90 rounded-3xl overflow-hidden w-full max-w-md mx-auto shadow-2xl animate-fadein"
                style={{ maxHeight: "90vh" }}
                onClick={handleClose} // NHẤN VÀO CARD CŨNG TẮT
            >
                <div className="relative">
                    {image && (
                        <img
                            src={image}
                            alt={title}
                            className="w-full max-h-60 object-cover object-center"
                            draggable={false}
                        />
                    )}
                    <button
                        className="absolute top-2 right-2 z-10 bg-gray-800/80 rounded-full p-2 text-white hover:bg-red-600 transition"
                        onClick={handleClose}
                        aria-label="Đóng"
                    >
                        <svg width="22" height="22" viewBox="0 0 20 20">
                            <path d="M6 6l8 8M14 6l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    {showNav && (
                        <>
                            <button
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-900 p-2 rounded-full text-white z-10"
                                onClick={e => { e.stopPropagation(); prev && prev(); handleClose(e); }}
                            >&#8592;</button>
                            <button
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-700/80 hover:bg-blue-900 p-2 rounded-full text-white z-10"
                                onClick={e => { e.stopPropagation(); next && next(); handleClose(e); }}
                            >&#8594;</button>
                        </>
                    )}
                </div>
                <div className="px-6 py-5">
                    <h3 className="font-akashi text-xl mb-2 text-white">{title}</h3>
                    <div className="text-base text-neutral-200">{desc}</div>
                </div>
            </div>
        </div>
    );
}
