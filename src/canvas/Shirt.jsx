import React, { useRef } from 'react';
import { useGLTF, useTexture } from '@react-three/drei';
import { useSnapshot } from 'valtio';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import state from '../store';

export default function Shirt(props) {
    const groupRef = useRef();
    const snap = useSnapshot(state);
    const { nodes, materials } = useGLTF('./models/shirt_baked.glb');

    const logoTexture = useTexture(snap.shirt.logoDecal || 'public/placeholder.png');

    // Hiệu ứng quay nhẹ nếu không kéo
    useFrame((_, delta) => {
        if (groupRef.current && !snap.isDragging) {
            groupRef.current.rotation.y += delta * 0.3;
        }
    });

    // Cấu hình map decal rõ nét
    if (logoTexture && logoTexture.image) {
        logoTexture.wrapS = THREE.ClampToEdgeWrapping;
        logoTexture.wrapT = THREE.ClampToEdgeWrapping;
        logoTexture.anisotropy = 16;
    }

    const shouldShowLogo =
        snap.shirt.isLogoTexture &&
        snap.shirt.logoDecal?.startsWith('data:image') &&
        logoTexture?.image;

    // Cập nhật vật liệu logo nếu đủ điều kiện
    if (shouldShowLogo && materials['Material.002']) {
        materials['Material.002'].map = logoTexture;
        materials['Material.002'].transparent = true;
        materials['Material.002'].needsUpdate = true;
    }

    // Thiết lập base vật liệu hiện đại
    const baseMatProps = {
        roughness: 0.4,
        metalness: 0.1,
        flatShading: false,
    };

    const thanAoMaterial = new THREE.MeshStandardMaterial({
        ...baseMatProps,
        color: snap.shirt.partsColor.than_ao,
    });

    const tayAoMaterial = new THREE.MeshStandardMaterial({
        ...baseMatProps,
        color: snap.shirt.partsColor.tay_ao,
    });

    const coAoMaterial = new THREE.MeshStandardMaterial({
        ...baseMatProps,
        color: snap.shirt.partsColor.co_ao,
    });

    return (
        <group {...props} dispose={null} ref={groupRef}>
            <group position={[0.009, 0.51, -0.26]} rotation={[Math.PI / 2, 0, 0]} scale={1.578}>
                {/* Cổ áo */}
                <mesh geometry={nodes.co_ao.geometry} material={coAoMaterial} />

                {/* Chi tiết phụ */}
                <mesh
                    geometry={nodes.node_42727979_f98a_4bcb_8680_7bf112de91fa_mesh0004.geometry}
                    material={materials.mat_0}
                />
                <mesh
                    geometry={nodes.node_42727979_f98a_4bcb_8680_7bf112de91fa_mesh0006.geometry}
                    material={materials.mat_0}
                />

                {/* Tay áo */}
                <mesh geometry={nodes.tay_ao.geometry} material={tayAoMaterial} position={[-0.209, -0.021, -0.062]} />

                {/* Thân áo */}
                <mesh geometry={nodes.than_ao.geometry} material={thanAoMaterial} />
            </group>

            {/* Logo phía trước */}
            <mesh
                geometry={nodes.LogoPlane.geometry}
                material={materials['Material.002']}
                position={nodes.LogoPlane.position}
                rotation={nodes.LogoPlane.rotation}
                scale={nodes.LogoPlane.scale}
            />

            {/* Logo phía sau (cố định) */}
            <mesh
                geometry={nodes.logocodinh.geometry}
                material={materials.logo}
                position={[-0.003, 0.599, -0.685]}
                rotation={[Math.PI / 2, 0, 3.002]}
                scale={0.567}
            />
        </group>
    );
}

useGLTF.preload('./models/shirt_baked.glb');
