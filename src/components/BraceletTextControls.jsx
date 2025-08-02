// src/components/BraceletTextControls.jsx
import React from "react";
import { useSnapshot } from "valtio";
import state from "../store";

const BraceletTextControls = () => {
    const snap = useSnapshot(state);
    const braceletSnap = useSnapshot(state.bracelet);

    if (snap.currentModel !== "bracelet") return null;

    return (
        <div className="fixed top-24 right-6 z-50 w-[260px] p-4 bg-white rounded-xl shadow-xl text-sm space-y-3">
            <h2 className="text-base font-semibold text-black">Thiết kế chữ vòng tay</h2>

            <div>
                <label className="block text-gray-700 mb-1">Nội dung chữ:</label>
                <input
                    type="text"
                    value={braceletSnap.braceletText || ""}
                    placeholder="Nhập chữ..."
                    onChange={(e) => (state.bracelet.braceletText = e.target.value)}
                    className="w-full px-3 py-2 border rounded bg-white text-black"
                />
            </div>

            <div>
                <label className="block text-gray-700 mb-1">Màu chữ:</label>
                <input
                    type="color"
                    value={braceletSnap.textColor || "#000000"}
                    onChange={(e) => (state.bracelet.textColor = e.target.value)}
                    className="w-full h-10 rounded"
                />
            </div>
        </div>
    );
};

export default BraceletTextControls;
