// src/slides/BraceletSlide.jsx
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center } from "@react-three/drei";

import { RubberBracelet } from "../canvas/RubberBracelet";
import state from "../store";

import ColorPicker from "../components/ColorPicker";
import LogoPositionControls from "../components/LogoPositionControls";
import BraceletTextControls from "../components/BraceletTextControls";

const BraceletSlide = () => {
    const [file] = useState(null);
    const [activeTab, setActiveTab] = useState("");

    // Set global model
    state.currentModel = "bracelet";

    return (
        <>
            {/* Sidebar */}
            <div className="fixed top-24 left-6 z-50 w-[260px] bg-neutral-900 text-white p-4 rounded-xl shadow-xl space-y-4">
                {/* Tabs */}
                <div className="flex gap-2">
                    <button
                        onClick={() => setActiveTab(activeTab === "color" ? "" : "color")}
                        className={`flex-1 py-1 rounded ${
                            activeTab === "color"
                                ? "bg-blue-600"
                                : "bg-neutral-800 hover:bg-neutral-700"
                        }`}
                    >
                        🎨 Màu
                    </button>
                </div>

                {/* Tab Content */}
                {activeTab === "color" && <ColorPicker />}
                <LogoPositionControls />
                <BraceletTextControls />
            </div>

            {/* 3D Canvas */}
            <Canvas
                className="w-full h-full"
                camera={{ position: [0, 0.5, 1.8], fov: 45 }}
                gl={{ preserveDrawingBuffer: true }}
            >
                <ambientLight intensity={0.5} />
                <Environment preset="city" />

                <Center position={[0, 0.4, 0]} scale={[1, 1, 1]}>
                    <RubberBracelet />
                </Center>

                <OrbitControls
                    enablePan={false}
                    enableRotate
                    enableZoom
                    minDistance={1.5}
                    maxDistance={3.5}
                    target={[0, 0.4, 0]}
                />
            </Canvas>
        </>
    );
};

export default BraceletSlide;
