// components/CurvedText.jsx
import React from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';

const RADIUS = 1.1; // Bán kính đường cong quanh vòng tay

export const CurvedText = ({ text, color = 'black' }) => {
    const characters = text.split('');
    const angleStep = (Math.PI * 1.5) / characters.length; // phân bố theo cung

    return (
        <group rotation={[Math.PI, 0, 0]} position={[0, -0.99, 0]}>
            {characters.map((char, i) => {
                const angle = angleStep * i - (characters.length * angleStep) / 2;
                const x = RADIUS * Math.cos(angle);
                const z = RADIUS * Math.sin(angle);

                return (
                    <Text
                        key={i}
                        position={[x, 0, z]}
                        rotation={[0, -angle, 0]}
                        fontSize={0.08}
                        color={color}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {char}
                    </Text>
                );
            })}
        </group>
    );
};
