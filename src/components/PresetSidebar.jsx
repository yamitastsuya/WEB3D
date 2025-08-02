import React, { useRef, useState } from "react";
import state from "../store";
import { Sparkles, ChevronLeft, Upload } from "lucide-react";

// Dropdown chọn màu bộ phận áo
const ColorDropdown = ({ label, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const [custom, setCustom] = useState(value);

    const colorList = [
        "#ffffff", "#000000", "#FFD600", "#FF5757", "#409CFF", "#59E99E",
        "#7A54FF", "#FF81F2", "#FF9800", "#BEBEBE"
    ];

    return (
        <div className="relative mb-2 w-full">
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className={`
                    w-full flex items-center justify-between
                    bg-white bg-opacity-90 rounded-xl border border-gray-200
                    shadow px-3 py-2
                    hover:border-blue-300 transition
                    focus:outline-none
                `}
            >
                <div className="flex items-center gap-3">
                    <span
                        className="w-7 h-7 rounded-full border border-gray-300 shadow"
                        style={{ background: value }}
                    />
                    <span className="text-[16px] font-medium text-gray-900">{label}</span>
                </div>
                <svg width="20" height="20" className="ml-2 opacity-80" style={{ transform: open ? "rotate(180deg)" : "" }}>
                    <polyline points="6,8 10,12 14,8" fill="none" stroke="#444" strokeWidth="2" strokeLinecap="round" />
                </svg>
            </button>
            {open && (
                <div className="absolute left-0 mt-2 z-40 bg-white bg-opacity-95 rounded-xl shadow-xl p-4 border w-56 animate-fade-in">
                    <div className="flex flex-wrap gap-2 mb-2">
                        {colorList.map(c => (
                            <button
                                key={c}
                                onClick={() => { onChange(c); setCustom(c); setOpen(false); }}
                                className="w-7 h-7 rounded-full border border-gray-300"
                                style={{ background: c }}
                            />
                        ))}
                    </div>
                    <input
                        type="color"
                        value={custom}
                        onChange={e => { setCustom(e.target.value); onChange(e.target.value); }}
                        className="w-full h-8 mt-2 rounded-full border-none cursor-pointer"
                    />
                    <button
                        className="block mx-auto mt-2 text-xs text-blue-500 underline"
                        onClick={() => setOpen(false)}
                    >Đóng</button>
                </div>
            )}
        </div>
    );
};

const PresetSidebar = ({
                           showPresetPanel,
                           setShowPresetPanel,
                           currentModel,
                           shirtPresets,
                           userPresets,
                           setUserPresets,
                           braceletPresets,
                           userBraceletPresets,
                           setUserBraceletPresets,
                           deletePreset,
                           deleteBraceletPreset,
                           envPreset,
                           setEnvPreset,
                           envPresets,
                           customBgs,
                           setCustomBgs,
                           partsColor,
                           setPartColor,
                       }) => {
    const [presetName, setPresetName] = useState("");
    const sidebarRef = useRef(null);

    // Upload background
    const handleUploadBg = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = () => {
            const newBg = {
                id: "custom_" + Date.now(),
                name: file.name,
                img: reader.result,
            };
            const updated = [...customBgs, newBg];
            setCustomBgs(updated);
            setEnvPreset(newBg.id);
            localStorage.setItem("customBgs", JSON.stringify(updated));
        };
        reader.readAsDataURL(file);
        e.target.value = "";
    };

    // Lưu preset áo hoặc vòng tay
    const handleSavePreset = () => {
        if (!presetName.trim()) return;
        const canvas = document.querySelector("canvas");
        const thumbnail = canvas?.toDataURL?.() || "";

        if (currentModel === "shirt") {
            const snap = state.shirt;
            const newPreset = {
                name: presetName,
                colorThan: snap.partsColor.than_ao,
                colorTayCo: snap.partsColor.tay_ao,
                logo: snap.logoDecal,
                thumbnail,
            };
            const updated = [...userPresets, newPreset];
            setUserPresets(updated);
            localStorage.setItem("userPresets", JSON.stringify(updated));
        } else if (currentModel === "bracelet") {
            const snap = state.bracelet;
            const newPreset = {
                name: presetName,
                braceletText: snap.braceletText,
                textColor: snap.textColor,
                outlineColor: snap.outlineColor,
                outlineWidth: snap.outlineWidth,
                fontFamily: snap.fontFamily,
                braceletColor: snap.braceletColor,
                fontSize: snap.fontSize,
                thumbnail,
            };
            const updated = [...userBraceletPresets, newPreset];
            setUserBraceletPresets(updated);
            localStorage.setItem("userBraceletPresets", JSON.stringify(updated));
        }
        setPresetName("");
    };

    // Lấy preset theo loại (áo hoặc vòng tay)
    const allPresets = currentModel === "shirt"
        ? [...shirtPresets, ...userPresets]
        : [...braceletPresets, ...userBraceletPresets];

    // Áp preset
    const applyPreset = (preset, idx) => {
        if (currentModel === "shirt") {
            state.shirt.partsColor = {
                ...state.shirt.partsColor,
                than_ao: preset.colorThan,
                tay_ao: preset.colorTayCo,
                co_ao: preset.colorTayCo,
            };
            state.shirt.logoDecal = preset.logo;
            state.shirt.isLogoTexture = true;
            state.shirt = { ...state.shirt };
        } else if (currentModel === "bracelet") {
            state.bracelet.braceletText = preset.braceletText;
            state.bracelet.textColor = preset.textColor;
            state.bracelet.outlineColor = preset.outlineColor;
            state.bracelet.outlineWidth = preset.outlineWidth;
            state.bracelet.fontFamily = preset.fontFamily;
            state.bracelet.braceletColor = preset.braceletColor;
            state.bracelet.fontSize = preset.fontSize;
        }
    };

    // Xóa preset đúng loại
    const handleDeletePreset = idx => {
        if (currentModel === "shirt") {
            deletePreset(idx);
        } else if (currentModel === "bracelet") {
            deleteBraceletPreset(idx);
        }
    };

    return (
        <>
            {/* Sidebar căn giữa và ẩn hoàn toàn khi translate-x-full */}
            <div
                ref={sidebarRef}
                className={`
                    fixed z-50 left-0
                    ${showPresetPanel ? "translate-x-0" : "-translate-x-full"}
                    top-1/2 -translate-y-1/2
                    bg-white bg-opacity-60 backdrop-blur-xl
                    border border-blue-100
                    rounded-3xl shadow-2xl
                    flex flex-col
                    transition-all duration-400 ease-in-out
                    min-h-[360px] max-h-[90vh]
                    w-[92vw] max-w-[330px] sm:w-[350px]
                    p-3
                `}
                style={{
                    boxShadow: "0 8px 32px 0 rgba(31,38,135,0.13)",
                }}
            >
                {/* Nút toggle chỉ render khi sidebar đang mở */}
                {showPresetPanel && (
                    <button
                        className={`
                            absolute -right-10 z-50
                            rounded-r-full rounded-l-none
                            shadow-2xl
                            w-12 h-12 flex items-center justify-center pl-2
                            bg-gradient-to-b from-blue-400 to-blue-600
                            text-white text-2xl
                            hover:scale-105 hover:shadow-xl hover:brightness-110
                            transition
                        `}
                        style={{
                            top: "50%",
                            transform: "translateY(-50%)",
                            boxShadow: "0 2px 12px 2px #74B0FF33",
                        }}
                        onClick={() => setShowPresetPanel(s => !s)}
                        title="Ẩn sidebar"
                        tabIndex={0}
                    >
                        <ChevronLeft size={28} />
                    </button>
                )}

                {/* ============ ÁO ============= */}
                {currentModel === "shirt" && (
                    <div className="pb-2">
                        <label className="block text-xs mb-2 font-bold text-gray-600 tracking-widest">COLOR</label>
                        <ColorDropdown
                            label="Tshirt-Body"
                            value={partsColor.than_ao}
                            onChange={color => setPartColor("than_ao", color)}
                        />
                        <ColorDropdown
                            label="Tshirt-Neck"
                            value={partsColor.tay_ao}
                            onChange={color => setPartColor("tay_ao", color)}
                        />
                    </div>
                )}

                {/* ============ VÒNG TAY ============= */}
                {currentModel === "bracelet" && (
                    <div className="mb-4 flex flex-col gap-2">
                        {/* Nội dung chữ */}
                        <label className="text-xs font-semibold text-gray-700">Nội dung chữ:</label>
                        <input
                            type="text"
                            className="rounded-lg border border-gray-300 px-2 py-1 text-sm text-black focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                            value={state.bracelet.braceletText}
                            maxLength={24}
                            onChange={e => {
                                state.bracelet.braceletText = e.target.value;
                                state.bracelet = { ...state.bracelet };
                            }}
                            placeholder="Nhập chữ trên vòng tay"
                        />

                        {/* Nhóm màu & font gọn ngang */}
                        <div className="flex flex-row gap-2">
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-gray-700">Màu chữ:</label>
                                <input
                                    type="color"
                                    className="h-8 w-full rounded"
                                    value={state.bracelet.textColor}
                                    onChange={e => {
                                        state.bracelet.textColor = e.target.value;
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                />
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-gray-700">Màu vòng:</label>
                                <input
                                    type="color"
                                    className="h-8 w-full rounded"
                                    value={state.bracelet.braceletColor}
                                    onChange={e => {
                                        state.bracelet.braceletColor = e.target.value;
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                />
                            </div>
                        </div>

                        {/* Font + Kích thước */}
                        <div className="flex flex-row gap-2 items-end">
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-gray-700">Font:</label>
                                <select
                                    value={state.bracelet.fontFamily}
                                    onChange={e => {
                                        state.bracelet.fontFamily = e.target.value;
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                    className="rounded-lg border border-gray-300 px-2 py-1 text-xs text-black focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200"
                                >
                                    <option value="UTM-Akashi">UTM Akashi</option>
                                    <option value="COOPBL">COOPBL</option>
                                    <option value="DL-Calvera-2">DL Calvera 2</option>
                                    <option value="MTO CHANEY">MTO Chaney</option>
                                    <option value="Arial">Arial</option>
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-gray-700">Cỡ chữ:</label>
                                <input
                                    type="range"
                                    min={0.05}
                                    max={0.1}
                                    step={0.001}
                                    value={state.bracelet.fontSize}
                                    onChange={e => {
                                        state.bracelet.fontSize = Number(e.target.value);
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                    className="w-full accent-blue-500"
                                />
                            </div>
                        </div>

                        {/* Nâng cao: Ẩn/hiện các options ít dùng */}
                        <details>
                            <summary className="cursor-pointer text-xs text-blue-600 select-none">Nâng cao</summary>
                            <div className="mt-2 flex flex-col gap-2">
                                <label className="text-xs font-semibold text-gray-700">Màu viền:</label>
                                <input
                                    type="color"
                                    className="h-8 w-full rounded"
                                    value={state.bracelet.outlineColor}
                                    onChange={e => {
                                        state.bracelet.outlineColor = e.target.value;
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                />
                                <label className="text-xs font-semibold text-gray-700">Độ rộng viền:</label>
                                <input
                                    type="range"
                                    min={0}
                                    max={0.08}
                                    step={0.001}
                                    value={state.bracelet.outlineWidth}
                                    onChange={e => {
                                        state.bracelet.outlineWidth = Number(e.target.value);
                                        state.bracelet = { ...state.bracelet };
                                    }}
                                    className="w-full accent-blue-500"
                                />
                            </div>
                        </details>
                    </div>
                )}

                {/* ============ CHỌN BACKGROUND ============= */}
                <div className="mb-2">
                    <div className="flex items-center justify-between mb-1">
                        <label className="block text-xs font-semibold text-gray-700">Background 3D</label>
                        <label
                            htmlFor="upload-bg-input"
                            className="flex items-center gap-1 cursor-pointer text-xs text-blue-500 hover:underline"
                            title="Tải lên background mới"
                        >
                            <Upload size={14} /> Upload
                            <input
                                id="upload-bg-input"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleUploadBg}
                            />
                        </label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        {/* Preset nền có sẵn */}
                        {envPresets.map((p) => (
                            <button
                                key={p.value}
                                className={`
                                    group focus:outline-none rounded-lg overflow-hidden border-2 relative
                                    ${envPreset === p.value ? "border-blue-500 shadow-lg" : "border-transparent opacity-80"}
                                    transition hover:scale-105 hover:opacity-100
                                `}
                                onClick={() => setEnvPreset(p.value)}
                                title={p.name}
                                type="button"
                            >
                                <img src={p.img} alt={p.name} className="w-full h-14 object-cover" />
                                <div className={`text-[10px] font-medium text-center py-1 ${envPreset === p.value ? "text-blue-600" : "text-gray-700"}`}>
                                    {p.name}
                                </div>
                            </button>
                        ))}
                        {/* Ảnh upload của user */}
                        {customBgs.map((bg, idx) => (
                            <div key={bg.id || idx} className="relative group">
                                <button
                                    className={`
                                        focus:outline-none rounded-lg overflow-hidden border-2 w-full h-full
                                        ${envPreset === bg.id ? "border-blue-500 shadow-lg" : "border-transparent opacity-80"}
                                        transition hover:scale-105 hover:opacity-100
                                    `}
                                    onClick={() => setEnvPreset(bg.id)}
                                    type="button"
                                    title={bg.name || "Custom Background"}
                                >
                                    <img src={bg.img} alt={bg.name} className="w-full h-14 object-cover" />
                                    <div className={`text-[10px] font-medium text-center py-1 ${envPreset === bg.id ? "text-blue-600" : "text-gray-700"}`}>
                                        {bg.name || "Custom"}
                                    </div>
                                </button>
                                {/* Nút xóa ảnh nền */}
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-80 hover:opacity-100 shadow group-hover:block"
                                    style={{ zIndex: 10 }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        const updated = [...customBgs];
                                        updated.splice(idx, 1);
                                        setCustomBgs(updated);
                                        localStorage.setItem("customBgs", JSON.stringify(updated));
                                        if (envPreset === bg.id) {
                                            setEnvPreset(envPresets[0].value);
                                        }
                                    }}
                                    title="Xóa ảnh này"
                                    tabIndex={-1}
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Header preset */}
                <div className="flex items-center gap-2 mb-2 pl-1 pr-2">
                    <span className="bg-gradient-to-r from-pink-400 to-blue-400 p-1.5 rounded-full shadow-md animate-pulse">
                        <Sparkles size={20} className="text-white" />
                    </span>
                    <h3 className="text-base font-bold text-gray-800 flex-1">
                        {currentModel === "shirt" ? "Mẫu thiết kế áo" : "Mẫu vòng tay"}
                    </h3>
                </div>
                {/* Danh sách preset */}
                <div className="flex-1 overflow-y-auto px-1 pb-2 pt-1">
                    <div className="grid grid-cols-2 gap-2">
                        {allPresets.map((preset, idx) => (
                            <div
                                key={idx}
                                className="
                                    group relative rounded-xl bg-white border border-gray-200 shadow
                                    hover:shadow-lg hover:-translate-y-0.5 hover:scale-[1.07] transition
                                    cursor-pointer flex flex-col items-center py-2 px-1
                                    min-h-[90px]
                                "
                                onClick={() => applyPreset(preset, idx)}
                            >
                                <img
                                    src={preset.thumbnail}
                                    alt={preset.name}
                                    className="rounded-md w-16 h-16 object-cover shadow-inner bg-gray-50 group-hover:ring-2 group-hover:ring-blue-300"
                                />
                                <div className="w-full text-center text-[12px] font-semibold text-gray-700 truncate mt-1">
                                    {preset.name}
                                </div>
                                {/* Nếu là preset tự tạo, cho phép xóa */}
                                {idx >= (currentModel === "shirt" ? shirtPresets.length : braceletPresets.length) && (
                                    <button
                                        className="
                                            absolute top-1 right-1 text-xs text-white px-1
                                            bg-red-500/80 rounded opacity-0 group-hover:opacity-100
                                            transition shadow-sm hover:bg-red-600
                                        "
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleDeletePreset(idx - (currentModel === "shirt" ? shirtPresets.length : braceletPresets.length));
                                        }}
                                        title="Xóa preset này"
                                    >
                                        X
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
                {/* Nhập tên và lưu preset */}
                <div className="pt-1 pb-1 flex flex-col gap-2">
                    <label htmlFor="preset-name-input" className="text-xs font-semibold text-gray-600 mb-1 ml-1">
                        {currentModel === "shirt" ? "Tên preset áo" : "Tên preset vòng tay"}
                    </label>
                    <input
                        id="preset-name-input"
                        type="text"
                        placeholder={currentModel === "shirt" ? "Nhập tên preset áo..." : "Nhập tên preset vòng tay..."}
                        className="
                            rounded-lg border border-gray-300
                            px-2 py-1
                            focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-200
                            text-xs text-black transition
                        "
                        value={presetName}
                        onChange={e => setPresetName(e.target.value)}
                    />
                    <button
                        onClick={handleSavePreset}
                        disabled={!presetName.trim()}
                        className={`
                            w-full flex items-center justify-center gap-1.5
                            bg-gradient-to-r from-green-400 to-lime-300
                            text-white font-bold py-2 rounded-xl text-sm shadow
                            hover:scale-105 hover:shadow-lg transition active:scale-95
                            ${!presetName.trim() ? 'opacity-60 pointer-events-none' : ''}
                        `}
                    >
                        <span role="img" aria-label="folder">📁</span> Lưu preset
                    </button>
                </div>
            </div>
        </>
    );
};

export default PresetSidebar;
