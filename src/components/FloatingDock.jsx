import {
    AnimatePresence,
    motion,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";
import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import { useRef, useState } from "react";

export const FloatingDock = ({ items, onClickItem, extraButtons = [] }) => {
    const mergedItems = [...items, ...extraButtons];
    return (
        <>
            <FloatingDockDesktop items={mergedItems} onClickItem={onClickItem} />
            <FloatingDockMobile items={mergedItems} onClickItem={onClickItem} />
        </>
    );
};

const FloatingDockMobile = ({ items, onClickItem }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="fixed bottom-10 left-6 z-50 md:hidden">
            <AnimatePresence>
                {open && (
                    <motion.div
                        layoutId="nav"
                        className="absolute inset-x-0 bottom-full mb-2 flex flex-col gap-2"
                    >
                        {items.map((item, idx) => (
                            <motion.button
                                key={item.title || item.value || idx}
                                onClick={() => {
                                    setOpen(false);
                                    onClickItem(item.value);
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10, transition: { delay: idx * 0.05 } }}
                                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
                                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
                            >
                                <div className="h-5 w-5">{item.icon}</div>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
            <button
                onClick={() => setOpen(!open)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white"
            >
                <IconLayoutNavbarCollapse className="h-5 w-5 text-white" />
            </button>
        </div>
    );
};

const FloatingDockDesktop = ({ items, onClickItem }) => {
    const mouseX = useMotionValue(Infinity);

    return (
        <motion.div
            onMouseMove={(e) => mouseX.set(e.pageX)}
            onMouseLeave={() => mouseX.set(Infinity)}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 hidden md:flex h-16 items-end gap-4 rounded-2xl bg-black px-4 pb-3 z-50"
        >
            {items.map((item) => (
                <IconContainer
                    key={item.title || item.value}
                    mouseX={mouseX}
                    title={item.title}
                    icon={item.icon}
                    onClick={() => onClickItem(item.value)}
                />
            ))}
        </motion.div>
    );
};

function IconContainer({ mouseX, title, icon, onClick }) {
    const ref = useRef(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: 0,
        };
        return val - bounds.x - bounds.width / 2;
    });

    const size = useSpring(useTransform(distance, [-150, 0, 150], [40, 80, 40]), {
        mass: 0.1,
        stiffness: 150,
        damping: 12,
    });

    const iconSize = useSpring(
        useTransform(distance, [-150, 0, 150], [20, 40, 20]),
        {
            mass: 0.1,
            stiffness: 150,
            damping: 12,
        }
    );

    const [hovered, setHovered] = useState(false);

    return (
        <button onClick={onClick} className="relative">
            <motion.div
                ref={ref}
                style={{ width: size, height: size }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                className="flex items-center justify-center rounded-full bg-black text-white"
            >
                <AnimatePresence>
                    {hovered && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, x: "-50%" }}
                            animate={{ opacity: 1, y: 0, x: "-50%" }}
                            exit={{ opacity: 0, y: 2, x: "-50%" }}
                            className="absolute -top-8 left-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-xs text-black shadow"
                        >
                            {title}
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    style={{ width: iconSize, height: iconSize }}
                    className="flex items-center justify-center"
                >
                    {icon}
                </motion.div>
            </motion.div>
        </button>
    );
}
