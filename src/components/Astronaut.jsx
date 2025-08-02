import React, { useRef, useEffect } from "react";
import { useGLTF } from '@react-three/drei'
import { useMotionValue, useSpring } from "motion/react";
import { useFrame } from "@react-three/fiber";

export function Astronaut(props) {
    const group = useRef();
    const { nodes, materials } = useGLTF('/models/3d_sketchbook_6_-_education_icon.glb');

    // motion value và spring
    const yPosition = useMotionValue(10);
    const ySpring = useSpring(yPosition, { damping: 40 });

    useEffect(() => {
        ySpring.set(-2);
    }, [ySpring]);

    useFrame(() => {
        if (group.current) {
            group.current.position.y = ySpring.get();
        }
    });

    return (
        <group {...props} dispose={null} ref={group}>
            <group position={[0, 0.297, 0]} rotation={[0, 0.554, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_7.geometry}
                    material={materials.Book2}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_8.geometry}
                    material={materials.Pages}
                />
            </group>
            <group position={[0, 1.067, 0]}>
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_12.geometry}
                    material={materials.Rope}
                />
                <mesh
                    castShadow
                    receiveShadow
                    geometry={nodes.Object_13.geometry}
                    material={materials.Bead}
                />
            </group>
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_4.geometry}
                material={materials.Book1}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_5.geometry}
                material={materials.Pages}
            />
            <mesh
                castShadow
                receiveShadow
                geometry={nodes.Object_10.geometry}
                material={materials.material}
                position={[0, 1.049, 0]}
            />
        </group>
    )
}

useGLTF.preload('/models/3d_sketchbook_6_-_education_icon.glb')
