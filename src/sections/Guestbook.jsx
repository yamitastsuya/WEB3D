// src/components/Guestbook.jsx
import React, { useEffect, useState } from "react";

export default function Guestbook() {
    const [messages, setMessages] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        role: "",
        year: "",
        message: ""
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchMessages = async () => {
        setLoading(true);
        setError("");
        try {
            const res = await fetch(`/list_guestbook.php`);
            const data = await res.json();

            // Nếu API trả về { messages: [...] }, lấy data.messages
            let list = [];
            if (Array.isArray(data)) {
                list = data;
            } else if (data && Array.isArray(data.messages)) {
                list = data.messages;
            } else {
                console.warn("Unexpected response shape:", data);
            }

            setMessages(list);
        } catch (err) {
            console.error("Lỗi tải lời chúc:", err);
            setError("Không thể tải lời chúc. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/add_guestbook.php`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            if (result.success) {
                alert("Cảm ơn bạn đã gửi lời chúc!");
                setFormData({ name: "", role: "", year: "", message: "" });
                await fetchMessages();
            } else {
                throw new Error(result.error || "Unknown error");
            }
        } catch (err) {
            console.error("Lỗi gửi lời chúc:", err);
            alert("Lỗi gửi lời chúc. Vui lòng thử lại.");
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                        Lời Tri Ân & Chia Sẻ
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Gửi lời chúc, chia sẻ những kỷ niệm đẹp và mong muốn cho tương lai của trường
                    </p>
                </div>

                {/* Messages */}
                <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 mb-16">
                    {loading && <p>Đang tải lời chúc…</p>}
                    {error && <p className="text-red-500">{error}</p>}
                    {!loading && !error && messages.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center">Chưa có lời chúc nào.</p>
                    )}
                    {!loading && !error && messages.map((msg, idx) => (
                        <div key={idx} className="bg-white border rounded-lg shadow p-6">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="text-blue-800 font-semibold text-lg">{msg.name}</h4>
                                    <p className="text-sm text-gray-500">
                                        {msg.role || "Khách"} {msg.year && `• ${msg.year}`}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-400">
                  {msg.created_at
                      ? new Date(msg.created_at).toLocaleDateString("vi-VN")
                      : ""}
                </span>
                            </div>
                            <blockquote className="italic text-gray-700">"{msg.message}"</blockquote>
                        </div>
                    ))}
                </div>

                {/* Form */}
                <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
                    <h3 className="text-2xl font-semibold text-blue-800 mb-4">Gửi lời chúc của bạn</h3>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 mb-1">Họ và tên *</label>
                                <input
                                    required
                                    className="w-full border text-black border-gray-300 rounded px-3 py-2"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 mb-1">Vai trò *</label>
                                <input
                                    required
                                    className="w-full border text-black border-gray-300 rounded px-3 py-2"
                                    value={formData.role}
                                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                    placeholder="Sinh viên, Giảng viên, Phụ huynh..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Khóa/Năm (nếu có)</label>
                            <input
                                className="w-full border text-black border-gray-300 rounded px-3 py-2"
                                value={formData.year}
                                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                                placeholder="VD: K2020, 10 năm gắn bó"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 mb-1">Lời chúc / Chia sẻ *</label>
                            <textarea
                                rows={4}
                                required
                                className="w-full border text-black border-gray-300 rounded px-3 py-2"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold py-2 rounded transition"
                        >
                            Gửi lời chúc
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
