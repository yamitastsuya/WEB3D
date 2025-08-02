// variants.js
export const scholarshipVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (delay = 0) => ({
        opacity: 1,
        y: 0,
        transition: { delay, duration: 0.75, type: "spring", stiffness: 90 },
    }),
};
