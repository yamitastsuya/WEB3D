import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls, Center, Html, Bounds } from "@react-three/drei";
import { a } from "@react-spring/three";
import Shirt from "../canvas/Shirt";
import { RubberBracelet } from "../canvas/RubberBracelet";
import state from "../store";

const presetList = [
    "apartment", "city", "dawn", "forest", "lobby", "night", "park", "studio", "sunset", "warehouse"
];

const ModelViewer = ({
                         currentModel,
                         transitions,
                         envPreset = "city",
                         customBgs = []
                     }) => {
    const isPreset = presetList.includes(envPreset);
    const customBg = customBgs.find(bg => bg.value === envPreset);

    return (
        <Canvas
            className="w-full h-full"
            gl={{ preserveDrawingBuffer: true, alpha: true }}
            camera={{ fov: 28, position: [0, 0, 2] }}
        >
            <color attach="background" args={[1, 1, 1, 0]} />
            <ambientLight intensity={0.5} />
            <Environment
                preset={isPreset ? envPreset : undefined}
                files={!isPreset && customBg ? customBg.img : undefined}
                background
            />
            <Bounds fit clip observe margin={1.2}>
                <Suspense
                    fallback={
                        <Html>
                            <div className="text-white text-sm">Loading...</div>
                        </Html>
                    }
                >
                    {transitions((style, item) => (
                        <a.group style={style} key={item} rotation={style.rotation}>
                            <Center>
                                {item === "shirt" ? <Shirt /> : <RubberBracelet />}
                            </Center>
                        </a.group>
                    ))}
                </Suspense>
            </Bounds>
            <OrbitControls
                enablePan={false}
                enableRotate
                enableZoom
                minDistance={1}
                maxDistance={5}
            />
        </Canvas>
    );
};

export default ModelViewer;
