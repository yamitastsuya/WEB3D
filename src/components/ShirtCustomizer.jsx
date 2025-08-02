// ShirtCustomizer.jsx (chỉ hiển thị)
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import { Model } from '../canvas/Shirt.jsx';

const ShirtContent = () => {
    const logoTexture = useTexture('/assets/logo-2023.png');

    return (
        <group>
            <Model />

            {/* Logo đính vào ngực áo */}
            <mesh position={[0, 1.05, 0.15]} rotation={[0, 0, 0]}> {/* Y cao lên */}
                <planeGeometry args={[0.25, 0.25]} />
                <meshBasicMaterial map={logoTexture} transparent />
            </mesh>
        </group>
    );
};

const ShirtScene = () => {
    return (
        <Canvas camera={{ position: [0, 0, 2.5], fov: 50 }}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.8} />
                <directionalLight position={[2, 2, 5]} intensity={1} />
                <Environment preset="studio" />
                <OrbitControls enableZoom={true} />
                <ShirtContent />
            </Suspense>
        </Canvas>
    );
};

export default ShirtScene;