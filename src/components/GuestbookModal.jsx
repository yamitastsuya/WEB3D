import React, { useState } from "react";

export default function GuestbookModal({ onClose, onSuccess }) {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        try {
            const res = await fetch("/add_guestbook.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, message }),
            });
            const result = await res.json();
            if (result.success) {
                onSuccess();
            } else {
                setError(result.error || "Gửi thất bại, hãy thử lại!");
            }
        } catch {
            setError("Lỗi kết nối máy chủ!");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                >
                    &times;
                </button>
                <h3 className="text-xl font-bold text-blue-700 mb-4">Gửi lời chúc</h3>
                <input
                    type="text"
                    placeholder="Tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full border text-black border-gray-300 rounded px-3 py-2 mb-3"
                />
                <textarea
                    placeholder="Lời chúc..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows="4"
                    className="w-full border text-black border-gray-300 rounded px-3 py-2 mb-3"
                />
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Gửi lời chúc
                </button>
                {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
            </div>
        </div>
    );
}
