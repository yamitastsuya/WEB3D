import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const parts = [
    { key: 'than_ao', label: 'Thân áo' },
    { key: 'tay_ao', label: 'Tay áo' },
    { key: 'co_ao', label: 'Cổ áo' }
];

const ColorPickerDropdown = () => {
    const snap = useSnapshot(state);
    const currentModel = snap.currentModel;
    const model = snap[currentModel];

    const [selectedPart, setSelectedPart] = useState(parts[0].key);

    const handleChangeColor = (color) => {
        const updated = {
            ...model,
            partsColor: {
                ...model.partsColor,
                [selectedPart]: color.hex,
            }
        };
        state[currentModel] = updated;
    };

    const currentColor = model.partsColor?.[selectedPart] || '#ffffff';

    return (
        <div className="p-2 bg-black rounded-lg shadow space-y-3">
            <select
                value={selectedPart}
                onChange={(e) => setSelectedPart(e.target.value)}
                className="w-full p-1 rounded bg-white text-black text-sm font-medium"
            >
                {parts.map((part) => (
                    <option key={part.key} value={part.key}>
                        {part.label}
                    </option>
                ))}
            </select>

            <SketchPicker
                color={currentColor}
                disableAlpha
                onChange={handleChangeColor}
            />
        </div>
    );
};

export default ColorPickerDropdown;
