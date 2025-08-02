import { Canvas } from '@react-three/fiber';
import { useVideoTexture } from '@react-three/drei';

const VideoPlane = () => {
    const texture = useVideoTexture('/textures/project/eduverse.mp4', {
        loop: true,
        muted: true,
        start: true,
        crossOrigin: 'anonymous'
    });

    return (
        <mesh>
            <planeGeometry args={[4, 2.25]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
        </mesh>
    );
};

const TestScene = () => {
    return (
        <Canvas>
            <ambientLight />
            <VideoPlane />
        </Canvas>
    );
};

export default TestScene;
