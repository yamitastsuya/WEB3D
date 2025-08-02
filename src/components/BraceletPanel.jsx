// src/components/BraceletPanel.jsx
import React from "react";
import state from "../store";

const BraceletPanel = ({
                           currentModel,
                           isMobile,
                           showTextPanelMobile,
                           setShowTextPanelMobile,
                           braceletSnap,
                           fontOptions,
                           minFontSize,
                           maxFontSize
                       }) => (
    currentModel === "bracelet" && (
        <div className="fixed z-50 w-[92vw] max-w-sm bottom-2 left-2 right-2 md:bottom-6 md:right-6 md:left-auto bg-white p-4 rounded-xl shadow-xl text-black space-y-2 hover:shadow-2xl hover:ring-2 hover:ring-blue-300 transition-all duration-300">
            {isMobile && (
                <button
                    onClick={() => setShowTextPanelMobile((prev) => !prev)}
                    className="fixed bottom-4 right-4 z-[60] px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
                >
                    {showTextPanelMobile ? "Ẩn cài đặt chữ" : "Hiện cài đặt chữ"}
                </button>
            )}
            {(!isMobile || showTextPanelMobile) && (
                <div className="space-y-2">
                    <label className="text-sm font-medium block">Nội dung chữ:</label>
                    <input
                        type="text"
                        className="w-full p-2 rounded border"
                        value={braceletSnap.braceletText || ""}
                        onChange={(e) => (state.bracelet.braceletText = e.target.value)}
                    />
                    <label className="text-sm font-medium block">Màu chữ:</label>
                    <input
                        type="color"
                        className="w-full h-10"
                        value={braceletSnap.textColor}
                        onChange={(e) => (state.bracelet.textColor = e.target.value)}
                    />
                    <label className="text-sm font-medium block">Màu viền:</label>
                    <input
                        type="color"
                        className="w-full h-10"
                        value={braceletSnap.outlineColor}
                        onChange={(e) => (state.bracelet.outlineColor = e.target.value)}
                    />
                    <label className="text-sm font-medium block">Độ rộng viền:</label>
                    <input
                        type="range"
                        min={0}
                        max={0.1}
                        step={0.001}
                        value={braceletSnap.outlineWidth}
                        onChange={(e) => (state.bracelet.outlineWidth = parseFloat(e.target.value))}
                    />
                    <label className="text-sm font-medium block">Font:</label>
                    <select
                        className="w-full p-2 rounded border"
                        value={braceletSnap.fontFamily}
                        onChange={(e) => (state.bracelet.fontFamily = e.target.value)}
                    >
                        {fontOptions.map((font) => (
                            <option key={font.value} value={font.value}>
                                {font.label}
                            </option>
                        ))}
                    </select>
                    <label className="text-sm font-medium block">Màu vòng:</label>
                    <input
                        type="color"
                        className="w-full h-10"
                        value={braceletSnap.braceletColor}
                        onChange={(e) => (state.bracelet.braceletColor = e.target.value)}
                    />
                    <label className="text-sm font-medium block">Kích thước chữ:</label>
                    <input
                        type="range"
                        min={minFontSize}
                        max={maxFontSize}
                        step={0.001}
                        value={braceletSnap.fontSize || 0.07}
                        onChange={(e) => (state.bracelet.fontSize = parseFloat(e.target.value))}
                    />
                </div>
            )}
        </div>
    )
);

export default BraceletPanel;
