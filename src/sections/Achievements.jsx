//src/sections/Achievements.jsx
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Center, OrbitControls } from '@react-three/drei';

import { myProjects } from '../components/myProjects';
import CanvasLoader from '../components/Loader.jsx';
import DemoComputer from '../components/DemoComputer.jsx';

const Achievements = () => {
    const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
    const projectCount = myProjects.length;
    useGSAP(() => {
        gsap.fromTo(
            '.heading-title',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
        );
    }, []);
    const handleNavigation = (direction) => {
        setSelectedProjectIndex((prevIndex) => {
            if (direction === 'previous') {
                return prevIndex === 0 ? projectCount - 1 : prevIndex - 1;
            } else {
                return prevIndex === projectCount - 1 ? 0 : prevIndex + 1;
            }
        });
    };

    const currentProject = myProjects[selectedProjectIndex];

    useGSAP(() => {
        gsap.fromTo(
            '.animatedText',
            { opacity: 0 },
            { opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.inOut' }
        );
    }, [selectedProjectIndex]);

    return (
        <section id="Achievements" className="c-space my-20">
            <p className="text-heading heading-title">THÀNH TỰU</p>

            <div className="grid lg:grid-cols-2 grid-cols-1 mt-12 gap-5 w-full">
                {/* LEFT: DỮ LIỆU TEXT */}
                <div className="flex flex-col gap-5 relative sm:p-10 py-10 px-5 shadow-2xl shadow-black-200 rounded-xl bg-navy overflow-hidden">
                    {/* Spotlight image */}
                    <div className="absolute top-0 right-0 w-full h-96">
                        <img
                            src={currentProject.spotlight}
                            alt="spotlight"
                            className="w-full h-full object-cover rounded-xl"
                        />
                    </div>

                    {/* Logo */}
                    <div
                        className="p-3 backdrop-filter backdrop-blur-3xl w-fit rounded-lg z-10"
                        style={currentProject.logoStyle}
                    >
                        <img className="w-9 h-11 shadow-sm" src={currentProject.logo} alt="logo" />
                    </div>

                    {/* Nội dung văn bản */}
                    <div className="flex flex-col gap-5 text-white-600 my-5 z-10">
                        <p className="text-white text-2xl font-semibold animatedText">
                            {currentProject.title}
                        </p>
                        <p className="animatedText">{currentProject.desc}</p>
                        {currentProject.subdesc && <p className="animatedText">{currentProject.subdesc}</p>}
                    </div>

                    {/* Tags */}
                    <div className="flex items-center justify-between flex-wrap gap-5 z-10">
                        <div className="flex items-center gap-3">
                            {currentProject.tags.map((tag, index) => (
                                <div key={index} className="tech-logo w-6 h-6">
                                    <img src={tag.path} alt={tag.name} />
                                </div>
                            ))}
                        </div>

                        {/* Link */}
                        <a
                            className="flex items-center gap-2 cursor-pointer text-white-600"
                            href={currentProject.href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <p>Xem trực tiếp</p>
                            <img src="/assets/arrow-up.png" alt="arrow" className="w-3 h-3" />
                        </a>
                    </div>


                    {/* Điều hướng */}
                    <div className="flex justify-between items-center mt-7 z-10 gap-4">
                        <button onClick={() => handleNavigation('previous')} className="arrow-btn">
                            <img src="/assets/left-arrow.png" alt="Trái" className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleNavigation('next')} className="arrow-btn">
                            <img src="/assets/right-arrow.png" alt="Phải" className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                {/* RIGHT: CANVAS */}
                <div className="border border-black-300 bg-black-200 rounded-lg h-96 md:h-full">
                    <Canvas>
                        <ambientLight intensity={Math.PI} />
                        <directionalLight position={[10, 10, 5]} />
                        <Center>
                            <Suspense fallback={<CanvasLoader />}>
                                <group scale={2} position={[0, -3, 0]} rotation={[0, -0.1, 0]}>
                                    <DemoComputer texture={currentProject.texture} />
                                </group>
                            </Suspense>
                        </Center>
                        <OrbitControls maxPolarAngle={Math.PI / 2} enableZoom={false} />
                    </Canvas>
                </div>
            </div>
        </section>
    );
};

export default Achievements;
