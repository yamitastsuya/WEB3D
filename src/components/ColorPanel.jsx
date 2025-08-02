// src/components/ColorPanel.jsx
import React from "react";
import ColorPicker from "./ColorPicker";
import state from "../store";

const ColorPanel = ({
                        selectedPart,
                        setSelectedPart,
                        isMobile,
                        showShirtPanelMobile,
                        setShowShirtPanelMobile,
                        currentModel,
                    }) => (
    <>
        {currentModel === "shirt" && isMobile && (
            <button
                onClick={() => setShowShirtPanelMobile((prev) => !prev)}
                className="fixed bottom-4 right-4 z-[60] px-4 py-2 bg-blue-600 text-white font-semibold rounded-full shadow-lg transition-transform duration-300 hover:scale-105"
            >
                {showShirtPanelMobile ? "Ẩn cài đặt áo" : "Hiện cài đặt áo"}
            </button>
        )}
        {currentModel === "shirt" && (!isMobile || showShirtPanelMobile) && (
            <div className="fixed bottom-15 right-6 z-50 bg-white border shadow-xl rounded-xl p-4 w-[300px] space-y-4 hover:shadow-2xl hover:ring-2 hover:ring-blue-300 transition-all duration-300">
                <h3 className="text-lg font-semibold">🌸 Đổi màu áo</h3>
                <select
                    value={selectedPart}
                    onChange={(e) => setSelectedPart(e.target.value)}
                    className="w-full px-2 py-1 rounded border text-black"
                >
                    <option value="than_ao">Thân áo</option>
                    <option value="tay_ao">Tay & Cổ áo</option>
                </select>
                <ColorPicker selectedPart={selectedPart} />
                <div className="pt-4">
                    <label className="block text-sm text-gray-700 font-medium mb-1">Tải logo lên áo</label>
                    <input
                        type="file"
                        accept="image/*"
                        id="upload-logo"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (!file || !file.type.startsWith("image/")) {
                                alert("Vui lòng chọn ảnh hợp lệ!");
                                return;
                            }
                            const reader = new FileReader();
                            reader.onload = () => {
                                state.shirt.logoDecal = reader.result;
                                state.shirt.isLogoTexture = true;
                            };
                            reader.readAsDataURL(file);
                        }}
                        className="hidden"
                    />
                    <label
                        htmlFor="upload-logo"
                        className="cursor-pointer inline-block px-4 py-2 mt-1 bg-blue-500 text-white rounded transition-transform hover:bg-blue-600 hover:scale-105 duration-300"
                    >
                        📁 Tải logo lên
                    </label>
                </div>
            </div>
        )}
    </>
);

export default ColorPanel;
