// src/components/ModelBox.jsx
import React from "react";

const ModelBox = ({ children }) => (
    <div
        className="rounded-2xl shadow-2xl bg-black flex items-center justify-center"
        style={{
            width: 1000,
            height: 600,
            margin: 'auto',
            padding: 0,
        }}
    >
        {children}
    </div>
);

export default ModelBox;
