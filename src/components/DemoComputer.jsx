import React, { useRef, useEffect } from 'react';
import { useGLTF, useVideoTexture } from '@react-three/drei';
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const DemoComputer = ({ texture, ...props }) => {
    const group = useRef();
    const { nodes, materials } = useGLTF('/models/computer.glb');

    // Load video texture
    const videoTexture = useVideoTexture(texture || '/textures/project/eduverse.mp4');

    // Cập nhật video khi thay đổi
    useEffect(() => {
        if (videoTexture) {
            videoTexture.flipY = false;
            videoTexture.encoding = 3001; // sRGBEncoding
            videoTexture.needsUpdate = true;
            videoTexture.image?.play?.();
        }
    }, [videoTexture]);
    useGSAP(() => {
        gsap.from(group.current.rotation, {
            y: Math.PI / 2,
            duration: 1,
            ease: 'power3.out',
        });
    }, [videoTexture]);
    return (
        <group ref={group} {...props} dispose={null}>
            <group name="Scene">
                {/* TV screen */}
                <mesh
                    geometry={nodes['monitor-screen'].geometry}
                    position={[0.127, 1.831, 0.511]}
                    rotation={[1.571, -0.005, 0.031]}
                    scale={[0.661, 0.608, 0.401]}
                >
                    <meshBasicMaterial map={videoTexture} toneMapped={false} />
                </mesh>

                {/* Máy tính */}
                <group
                    name="Monitor-B"
                    position={[0.266, 1.132, 0.051]}
                    rotation={[0, -0.033, 0]}
                    scale={[0.042, 0.045, 0.045]}
                >
                    {Array.from({ length: 8 }).map((_, i) => (
                        <mesh
                            key={i}
                            geometry={nodes[`Monitor-B-_computer_0_${i + 1}`]?.geometry}
                            material={materials[Object.keys(materials)[i]]}
                        />
                    ))}
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/models/computer.glb');

export default DemoComputer;
