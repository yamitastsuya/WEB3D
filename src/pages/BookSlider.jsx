import React, { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import {
    Float,
    Environment,
    OrbitControls,
    Html
} from '@react-three/drei'
import { useAtom } from 'jotai'
import { pageAtom, pages } from '../components/UI.jsx'
import { Book } from '../components/Book.jsx'
import { Clouds } from '../components/Clouds.jsx'
import Loading from '../components/Loading.jsx'
import { useNavigate } from 'react-router-dom'

export default function BookSlider() {
    const [page, setPage] = useAtom(pageAtom)
    const maxPage = pages.length
    const navigate = useNavigate()

    // Reset về trang đầu
    useEffect(() => {
        setPage(0)
    }, [setPage])

    // Hiệu ứng loading
    const [showLoader, setShowLoader] = useState(true)
    useEffect(() => {
        const t = setTimeout(() => setShowLoader(false), 2000)
        return () => clearTimeout(t)
    }, [])

    const isFloatActive = page === 0 || page === maxPage

    return (
        <div className="relative w-full h-screen bg-gray-900 flex flex-col">
            <div className="relative flex-1">


                {!showLoader && (
                    <button
                        onClick={() => navigate("/home")}
                        className="absolute top-4 right-4 z-30 bg-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow-lg hover:bg-blue-700 transition-all"
                    >
                        Cùng nhau khám phá →
                    </button>
                )}

                <Canvas
                    className="w-full h-full"
                    shadows
                    gl={{ preserveDrawingBuffer: true, alpha: true }}
                    camera={{ fov: 28, position: [0, 0, 5] }}
                >
                    <ambientLight intensity={0.02} />
                    <directionalLight
                        position={[2, 5, 2]}
                        intensity={0.6}
                        castShadow
                        shadow-mapSize-width={2048}
                        shadow-mapSize-height={2048}
                        shadow-bias={-0.0001}
                    />
                    <Environment preset="studio" background />

                    <Clouds active={showLoader} />

                    <Suspense
                        fallback={
                            <Html center>
                                <span className="text-white">Loading book…</span>
                            </Html>
                        }
                    >
                        <Float
                            rotation-x={-Math.PI / 4}
                            floatIntensity={isFloatActive ? 1 : 0}
                            speed={isFloatActive ? 2 : 0}
                            rotationIntensity={0}
                        >
                            <Book />
                        </Float>
                    </Suspense>

                    <mesh position-y={-1.5} rotation-x={-Math.PI / 2} receiveShadow>
                        <planeGeometry args={[100, 100]} />
                        <shadowMaterial transparent opacity={0.2} />
                    </mesh>

                    <OrbitControls
                        enablePan={false}
                        enableRotate={true}
                        enableZoom={true}
                        minDistance={1}
                        maxDistance={5}
                    />
                </Canvas>

                {showLoader && (
                    <div className="absolute inset-0 z-20 bg-black/30 flex items-center justify-center pointer-events-none">
                        <Loading />
                    </div>
                )}
            </div>

            <footer className="h-16 bg-gray-800 flex items-center justify-center space-x-2">
                {[...Array(maxPage + 1).keys()].map((i) => (
                    <button
                        key={i}
                        onClick={() => setPage(i)}
                        className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
                            ${page === i
                            ? 'bg-blue-500 text-white'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                    >
                        {i}
                    </button>
                ))}
            </footer>
        </div>
    )
}
