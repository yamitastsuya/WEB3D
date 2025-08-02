import React from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = ({ selectedPart = 'than_ao' }) => {
    const snap = useSnapshot(state);
    const currentModel = snap.currentModel;
    const model = snap[currentModel];

    const currentColor =
        model.partsColor?.[selectedPart] || model.color || '#ffffff';

    const handleColorChange = (color) => {
        if (!state[currentModel].partsColor) {
            state[currentModel].partsColor = {};
        }

        state[currentModel].partsColor[selectedPart] = color.hex;
    };

    return (
        <div className="p-2 bg-black rounded-lg shadow-lg">
            <SketchPicker
                color={currentColor}
                disableAlpha
                onChange={handleColorChange}
            />
        </div>
    );
};

export default ColorPicker;
