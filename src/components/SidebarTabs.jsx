// SidebarTabs.jsx
import React from "react";

const SidebarTabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { key: "color", label: "🎨 Màu" },
        { key: "file", label: "📁 Ảnh" },
    ];

    return (
        <div className="flex gap-2">
            {tabs.map((tab) => (
                <button
                    key={tab.key}
                    onClick={() => setActiveTab(activeTab === tab.key ? "" : tab.key)}
                    className={`flex-1 py-1 rounded ${
                        activeTab === tab.key
                            ? "bg-blue-600"
                            : "bg-neutral-800 hover:bg-neutral-700"
                    }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};

export default SidebarTabs;
