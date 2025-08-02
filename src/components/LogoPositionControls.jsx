// src/components/LogoPositionControls.jsx
import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const LogoPositionControls = () => {
    const snap = useSnapshot(state);
    const currentModel = snap.currentModel;
    const model = snap[currentModel];

    // Defensive fallback
    const position = model.logoPosition || [0, 0.04, 0.15];
    const scale = model.logoScale || 0.15;

    const updatePosition = (axis, value) => {
        const index = { x: 0, y: 1, z: 2 }[axis];
        const newPos = [...position];
        newPos[index] = parseFloat(value);

        // 🔥 Valtio-safe update
        state[currentModel] = {
            ...state[currentModel],
            logoPosition: newPos,
        };
    };

    const updateScale = (value) => {
        state[currentModel] = {
            ...state[currentModel],
            logoScale: parseFloat(value),
        };
    };

    return (
        <div className="space-y-3 w-64">
            {['x', 'y', 'z'].map((axis, idx) => (
                <div key={axis} className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-black">Trục {axis.toUpperCase()}:</label>
                    <div className="flex items-center space-x-2">
                        <input
                            type="range"
                            min={-1}
                            max={1}
                            step={0.01}
                            value={position[idx]}
                            onChange={(e) => updatePosition(axis, e.target.value)}
                            className="flex-1"
                        />
                        <span className="text-xs text-black w-10 text-right">
              {position[idx].toFixed(2)}
            </span>
                    </div>
                </div>
            ))}

            {/* Logo scale */}
            <div className="flex flex-col space-y-1 pt-2">
                <label className="text-sm font-medium text-black">🔍 Kích thước logo:</label>
                <div className="flex items-center space-x-2">
                    <input
                        type="range"
                        min={0.05}
                        max={0.4}
                        step={0.01}
                        value={scale}
                        onChange={(e) => updateScale(e.target.value)}
                        className="flex-1"
                    />
                    <span className="text-xs text-black w-10 text-right">
            {scale.toFixed(2)}
          </span>
                </div>
            </div>
        </div>
    );
};

export default LogoPositionControls;
