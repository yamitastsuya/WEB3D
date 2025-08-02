import React, { useState } from 'react';
import state from '../store';

const UploadButton = () => {
    const [fileName, setFileName] = useState('');

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (!file || !file.type.startsWith('image/')) {
            alert('Vui lòng chọn ảnh hợp lệ!');
            return;
        }

        const imageURL = URL.createObjectURL(file);
        const img = new Image();

        img.onload = () => {
            const aspect = img.width / img.height;
            const height = 0.15; // chiều cao chuẩn
            const width = height * aspect;

            state.shirt.logoDecal = imageURL;
            state.shirt.isLogoTexture = true;
            state.shirt.isFullTexture = false;
            state.shirt.logoScale = [width, height, 1]; // giữ tỷ lệ

            setFileName(file.name);
        };

        img.src = imageURL;
    };

    return (
        <div className="space-y-2">
            <label htmlFor="upload-logo" className="text-sm font-medium text-gray-700">
                Tải ảnh lên
            </label>

            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                id="upload-logo"
                className="hidden"
            />

            <label
                htmlFor="upload-logo"
                className="cursor-pointer inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
                Chọn ảnh
            </label>

            {fileName && <p className="text-sm text-gray-600">{fileName}</p>}
        </div>
    );
};

export default UploadButton;
