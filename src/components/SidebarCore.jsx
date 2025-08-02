import React, { createContext, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { useSnapshot } from "valtio";
import state from "../store";

import CustomButton from "./CustomButton";
import ColorPicker from "./ColorPicker";
import FilePicker from "./FilePicker";
import LogoPositionControls from "./LogoPositionControls";

const SidebarContext = createContext();
export const useSidebar = () => useContext(SidebarContext);

export const SidebarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{ open, setOpen }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const SidebarCore = () => {
    const { open, setOpen } = useSidebar();
    const snap = useSnapshot(state);

    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("color");
    const [selectedPart, setSelectedPart] = useState("than_ao");

    const currentModel = snap.currentModel;

    const readFile = (type) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (type === "logo") {
                state[currentModel].logoDecal = result;
                state[currentModel].isLogoTexture = true;
            } else if (type === "full") {
                state[currentModel].fullDecal = result;
                state[currentModel].isFullTexture = true;
            }
        };
        if (file) reader.readAsDataURL(file);
    };

    return (
        <>
            {/* Toggle Button */}
            {!open && (
                <button
                    onClick={() => setOpen(true)}
                    className="fixed bottom-6 left-6 z-50 p-2 rounded-full bg-black text-white shadow"
                >
                    <IconMenu2 />
                </button>
            )}

            {/* Sidebar Panel */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: "-100%", opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-6 left-6 z-50 w-[280px] max-h-[90vh] overflow-y-auto bg-neutral-900 text-white p-4 rounded-xl shadow-xl space-y-4"
                    >
                        {/* Header */}
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-semibold">Tùy chỉnh</h2>
                            <button onClick={() => setOpen(false)}>
                                <IconX />
                            </button>
                        </div>

                        {/* Model Switch */}
                        <div className="flex gap-2">
                            {["shirt", "bracelet"].map((modelKey) => (
                                <button
                                    key={modelKey}
                                    onClick={() => (state.currentModel = modelKey)}
                                    className={`flex-1 py-1 rounded ${
                                        currentModel === modelKey
                                            ? "bg-indigo-600"
                                            : "bg-neutral-800 hover:bg-neutral-700"
                                    }`}
                                >
                                    {modelKey === "shirt" ? "👕 Áo" : "🧤 Vòng"}
                                </button>
                            ))}
                        </div>

                        {/* Tabs */}
                        <div className="flex gap-2">
                            <CustomButton
                                type="filled"
                                title="🎨"
                                handleClick={() => setActiveTab("color")}
                            />
                            <CustomButton
                                type="filled"
                                title="📁"
                                handleClick={() => setActiveTab("file")}
                            />
                        </div>

                        {/* Tab Content */}

                        {activeTab === "file" && (
                            <FilePicker file={file} setFile={setFile} readFile={readFile} />
                        )}

                        {/* Logo Controls */}
                        <LogoPositionControls />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
