import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';
import { getContrastingColor } from '../config/helpers';

/**
 * CustomButton component:
 * @param {string} type - 'filled' | 'outline'
 * @param {string} title - Text hiển thị trên nút
 * @param {string} customStyles - Class Tailwind tùy chỉnh
 * @param {function} handleClick - Sự kiện khi click
 */
const CustomButton = ({ type = "filled", title, customStyles = "", handleClick }) => {
    const snap = useSnapshot(state);

    const baseColor = snap.color || '#3B82F6'; // fallback màu xanh dương Tailwind
    const textColor = getContrastingColor(baseColor); // đảm bảo chữ nổi bật

    // Style cho từng loại nút
    const styles = {
        filled: {
            backgroundColor: baseColor,
            color: textColor,
            border: '1px solid transparent',
        },
        outline: {
            backgroundColor: '#f9f9f9',
            color: '#111827',
            border: '1px solid #d1d5db',
        },
    };

    return (
        <button
            onClick={handleClick}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 shadow hover:shadow-md active:scale-95 ${customStyles}`}
            style={styles[type]}
        >
            {title}
        </button>
    );
};

export default CustomButton;
