import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
    const snap = useSnapshot(state);

    const style = isFilterTab
        ? {
            backgroundColor: snap.color,
            opacity: isActiveTab ? 0.5 : 1,
            borderRadius: '9999px'
        }
        : {};

    return (
        <button
            onClick={handleClick}
            className={`tab-btn ${isFilterTab ? 'glassmorphism' : 'rounded-md'} p-2`}
            style={style}
        >
            <img
                src={tab.icon}
                alt={tab.name}
                className={isFilterTab ? 'w-2/3 h-2/3' : 'w-11/12 h-11/12 object-contain'}
            />
        </button>
    );
};

export default Tab;
