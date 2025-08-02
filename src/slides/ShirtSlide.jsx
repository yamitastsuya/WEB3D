// src/slides/ShirtSlide.jsx
import React, { Suspense, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center } from "@react-three/drei";
import Shirt from "../canvas/Shirt";
import state from "../store";
import Navbar from "../sections/Navbar";
import ColorPicker from "../components/ColorPicker";
import FilePicker from "../components/FilePicker";
import LogoPositionControls from "../components/LogoPositionControls";

const ShirtSlide = () => {
    const [file, setFile] = useState(null);
    const [activeTab, setActiveTab] = useState("");

    const readFile = (type) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            state.shirt.logoDecal = result;
            state.shirt.isLogoTexture = true;
        };
        if (file) reader.readAsDataURL(file);
    };

    return (
        <>
            <Navbar />
            <div className="absolute left-4 top-20 z-50 w-64 bg-neutral-900 text-white p-4 rounded-xl shadow-xl space-y-4">
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab(activeTab === "color" ? "" : "color")}
                        className={`flex-1 py-1 rounded ${
                            activeTab === "color" ? "bg-blue-600" : "bg-neutral-800 hover:bg-neutral-700"
                        }`}
                    >
                        🎨 Màu
                    </button>
                    <button
                        onClick={() => setActiveTab(activeTab === "file" ? "" : "file")}
                        className={`flex-1 py-1 rounded ${
                            activeTab === "file" ? "bg-blue-600" : "bg-neutral-800 hover:bg-neutral-700"
                        }`}
                    >
                        📁 Ảnh
                    </button>
                </div>
                {activeTab === "color" && <ColorPicker />}
                {activeTab === "file" && <FilePicker file={file} setFile={setFile} readFile={readFile} />}
                <LogoPositionControls />
            </div>

            <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <Environment preset="city" />
                <Suspense fallback={null}>
                    <Center position={[0, -0.5, 0]} scale={[1.2, 1.2, 1.2]}>
                        <Shirt />
                    </Center>
                </Suspense>
                <OrbitControls enablePan={false} enableRotate enableZoom minDistance={2.2} maxDistance={3.5} target={[0, -0.5, 0]} />
            </Canvas>
        </>
    );
};

export default ShirtSlide;
//CHinh lai het cai nay loi roi render kho lam