import React from "react";
import { useGLTF, Text } from "@react-three/drei";
import { useSnapshot } from "valtio";
import state from "../store";

export function RubberBracelet(props) {
    const { nodes, materials } = useGLTF("/models/Rubber bracelet3.glb");
    const snap = useSnapshot(state);
    const bracelet = snap.bracelet;

    const {
        braceletColor: color = "#ffffff",


        braceletText: text = "",
        textColor = "#000000",
        outlineColor = "#ffffff",
        outlineWidth = 0,
        fontFamily = "UTM-Akashi",
    } = bracelet;

    // Set màu vật liệu
    if (materials.mat0) {
        materials.mat0.color.set(color);
    }

    // Mapping font-family -> file .ttf
    const getFontPath = (fontName) => {
        const fonts = {
            "UTM-Akashi": "/Font/UTM-Akashi.ttf",
            "COOPBL": "/Font/COOPBL.TTF",
            "DL-Calvera-2": "/Font/DL-Calvera-2.otf",
            "MTO CHANEY": "/Font/MTO CHANEY.TTF",
        };
        return fonts[fontName] || undefined;
    };

    return (
        <group {...props} dispose={null}>
            <group rotation={[Math.PI, -0.14, Math.PI]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.imagetostl_mesh0_1.geometry}
                    material={materials.mat0}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.imagetostl_mesh0_2.geometry}
                    material={materials["Material.002"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.imagetostl_mesh0_3.geometry}
                    material={nodes.imagetostl_mesh0_3.material}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.imagetostl_mesh0_4.geometry}
                    material={materials["lv-bx"]}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.imagetostl_mesh0_5.geometry}
                    material={materials["logo-2023"]}
                />
            </group>

            {/* Text */}
            {text && (
                <Text
                    position={[0, -0.015, 0.978]}
                    rotation={[0, 0, 0]}
                    fontSize={bracelet.fontSize || 0.07}
                    color={textColor}
                    outlineColor={outlineColor}
                    outlineWidth={outlineWidth}
                    font={getFontPath(fontFamily)}
                    anchorX="center"
                    anchorY="middle"
                    maxWidth={1}
                    curveRadius={-1}
                >
                    {text}
                </Text>
            )}
        </group>
    );
}

useGLTF.preload("/models/Rubber bracelet3.glb");
