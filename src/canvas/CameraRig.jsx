import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';
import { useSnapshot } from 'valtio';
import state from '../store';

const CameraRig = ({ children }) => {
    const group = useRef();
    const snap = useSnapshot(state);

    useFrame(({ camera, pointer }, delta) => {
        const isMobile = window.innerWidth <= 768;

        // Vị trí camera
        const targetPos = snap.intro
            ? isMobile
                ? [0, 0.2, 2.5]
                : [-0.4, 0, 2]
            : isMobile
                ? [0, 0, 2.5]
                : [0, 0, 2];

        // Dịch camera & mô hình
        easing.damp3(camera.position, targetPos, 0.25, delta);
        easing.dampE(group.current.rotation, [pointer.y / 10, -pointer.x / 5, 0], 0.25, delta);

        // Dịch mô hình về phải nếu mobile
        easing.damp3(group.current.position, isMobile ? [0.4, -0.2, 0] : [0, 0, 0], 0.25, delta);
    });

    return <group ref={group}>{children}</group>;
};

export default CameraRig;
