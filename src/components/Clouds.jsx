// src/components/Clouds.jsx
import React, { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { useSprings, animated } from '@react-spring/three'
import * as THREE from 'three'

export function Clouds() {
    // 1. Load texture thẳng từ public/assets
    const cloudTex = useLoader(THREE.TextureLoader, '/assets/may.png')

    // 2. Cài đặt số lượng, vùng spawn và vùng drift
    const count = 100
    const defs = useMemo(() => {
        const rnd = (min, max) => min + Math.random() * (max - min)
        return Array.from({ length: count }).map(() => {
            const dir = Math.random() < 0.5 ? -1 : 1
            return {
                // từ full màn: x∈[-6,6], y∈[-4,4], z∈[0.8,1.2]
                from: {
                    position: [ rnd(-6, 6),   rnd(-4, 4),   rnd(0.8, 1.2) ],
                    scale:    [ 4, 4, 4 ],
                    opacity:  1
                },
                // tới drift: x∈[±8,±12], y∈[-4,4], z∈[-2,2], scale lên [6,8], opacity→0
                to: {
                    position: [ dir * rnd(8, 12), rnd(-4, 4), rnd(-2, 2) ],
                    scale:    [ rnd(6, 8), rnd(6, 8), rnd(6, 8) ],
                    opacity:  0
                }
            }
        })
    }, [])

    // 3. Dùng useSprings để animate ngay lập tức, kéo dài 10s, stagger mỗi 0.1s
    const springs = useSprings(
        count,
        defs.map(({ from, to }, i) => ({
            from,
            to,
            config: { duration: 4000 },   // 4000ms = 4s
                         // mỗi cloud cách nhau 100ms
        }))
    )

    // 4. Render sprite với spring-driven props
    return (
        <>
            {springs.map((spr, i) => (
                <animated.sprite
                    key={i}
                    position={spr.position}
                    scale={spr.scale}
                >
                    <animated.spriteMaterial
                        map={cloudTex}
                        transparent
                        opacity={spr.opacity}
                    />
                </animated.sprite>
            ))}
        </>
    )
}
