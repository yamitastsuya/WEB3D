import React, { useState, useEffect } from "react";
import Navbar from "../sections/Navbar";
import ModelBox from "../components/ModelBox";
import ModelViewer from "../components/ModelViewer";
import PresetSidebar from "../components/PresetSidebar";
import { FloatingDock } from "../components/FloatingDock";
import state from "../store";
//import { useSnapshot } from "valtio";
import { useTransition } from "@react-spring/three";
import {
    IconShirt, IconCircleDashed, IconPhoto, IconShare3, IconStar,
} from "@tabler/icons-react";

// Preset môi trường (background)
const envPresets = [
    { name: "City", value: "city", img: "/env-thumbnails/City.png" },
    { name: "Sunset", value: "sunset", img: "/env-thumbnails/Sunset.jpg" },
    { name: "Forest", value: "forest", img: "/env-thumbnails/Forest.jpg" },
    { name: "Warehouse", value: "warehouse", img: "/env-thumbnails/Warehouse.png" },
    { name: "Night", value: "night", img: "/env-thumbnails/Night.png" },
    { name: "Lobby", value: "lobby", img: "/env-thumbnails/Lobby.jpg" },
];

const shirtPresets = [];
const braceletPresets = [];

const Souvenir = () => {
    const models = ["shirt", "bracelet"];
    const [modelIndex, setModelIndex] = useState(0);
    const currentModel = models[modelIndex];
    const [showPresetPanel, setShowPresetPanel] = useState(true);
    const [userPresets, setUserPresets] = useState(() => {
        const saved = localStorage.getItem("userPresets");
        return saved ? JSON.parse(saved) : [];
    });
    const [userBraceletPresets, setUserBraceletPresets] = useState(() => {
        const saved = localStorage.getItem("userBraceletPresets");
        return saved ? JSON.parse(saved) : [];
    });
    const [partsColor, setPartsColor] = useState({
        than_ao: state.shirt.partsColor.than_ao,
        tay_ao: state.shirt.partsColor.tay_ao,
    });
    const setPartColor = (part, color) => {
        setPartsColor(prev => {
            const updated = { ...prev, [part]: color };
            state.shirt.partsColor[part] = color;
            return updated;
        });
    };

    // custom backgrounds (upload)
    const [customBgs, setCustomBgs] = useState(() => {
        const saved = localStorage.getItem("customBgs");
        return saved ? JSON.parse(saved) : [];
    });

    const [envPreset, setEnvPreset] = useState("city");

    useEffect(() => {
        state.currentModel = currentModel;
    }, [currentModel]);

    //  chuyển đổi model
    const transitions = useTransition(currentModel, {
        from: { opacity: 0, scale: 0.8, rotation: [0, Math.PI, 0] },
        enter: { opacity: 1, scale: 1, rotation: [0, 0, 0] },
        leave: { opacity: 0, scale: 0.8, rotation: [0, -Math.PI, 0] },
        config: { mass: 1, tension: 230, friction: 32 }
    });

    // Xoá preset áo
    const deletePreset = (index) => {
        const updated = [...userPresets];
        updated.splice(index, 1);
        setUserPresets(updated);
        localStorage.setItem("userPresets", JSON.stringify(updated));
    };
    // Xoá preset vòng tay
    const deleteBraceletPreset = (index) => {
        const updated = [...userBraceletPresets];
        updated.splice(index, 1);
        setUserBraceletPresets(updated);
        localStorage.setItem("userBraceletPresets", JSON.stringify(updated));
    };

    // Floating dock
    const dockItems = [
        { title: "Áo thun", icon: <IconShirt size={20} color="white" />, value: "shirt" },
        { title: "Vòng tay", icon: <IconCircleDashed size={20} color="white" />, value: "bracelet" },
        { title: "Lưu ảnh", icon: <IconPhoto size={20} color="white" />, value: "save-image" },
        { title: "Chia sẻ", icon: <IconShare3 size={20} color="white" />, value: "share-link" },
        { title: "Mẫu áo/vòng", icon: <IconStar size={20} color="white" />, value: "preset-shirt" },
    ];

    // Nút hiện sidebar dạng tab
    const FloatingOpenTab = (
        !showPresetPanel &&
        <button
            className={`
                fixed left-0 bottom-1/3 z-50
                bg-gradient-to-b from-blue-400 to-blue-600
                rounded-r-full shadow-xl w-11 h-20 flex items-center justify-center
                hover:scale-110 active:scale-95 transition
                border-2 border-l-0 border-blue-300
            `}
            style={{ boxShadow: "0 6px 28px rgba(60,100,220,0.10)" }}
            onClick={() => setShowPresetPanel(true)}
            title="Mở sidebar"
        >
            <svg width="30" height="30" viewBox="0 0 30 30">
                <polyline points="12,8 20,15 12,22" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
            </svg>
        </button>
    );

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <Navbar />
            <ModelBox>
                <ModelViewer
                    currentModel={currentModel}
                    transitions={transitions}
                    envPreset={envPreset}
                    customBgs={customBgs}
                />
            </ModelBox>
            <FloatingDock
                items={dockItems}
                onClickItem={(value) => {
                    if (value === "save-image") {
                        const link = document.createElement("a");
                        link.download = "souvenir.png";
                        link.href = document.querySelector("canvas").toDataURL();
                        link.click();
                    } else if (value === "share-link") {
                        navigator.clipboard.writeText(window.location.href);
                    } else if (value === "preset-shirt") {
                        setShowPresetPanel((prev) => !prev);
                    } else {
                        const idx = models.indexOf(value);
                        if (idx !== -1) setModelIndex(idx);
                    }
                }}
            />
            <PresetSidebar
                showPresetPanel={showPresetPanel}
                setShowPresetPanel={setShowPresetPanel}
                currentModel={currentModel}
                shirtPresets={shirtPresets}
                userPresets={userPresets}
                setUserPresets={setUserPresets}
                braceletPresets={braceletPresets}
                userBraceletPresets={userBraceletPresets}
                setUserBraceletPresets={setUserBraceletPresets}
                deletePreset={deletePreset}
                deleteBraceletPreset={deleteBraceletPreset}
                envPreset={envPreset}
                setEnvPreset={setEnvPreset}
                envPresets={envPresets}
                customBgs={customBgs}
                setCustomBgs={setCustomBgs}
                partsColor={partsColor}
                setPartColor={setPartColor}
            />
            {FloatingOpenTab}
        </div>
    );
};

export default Souvenir;
