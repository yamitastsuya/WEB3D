import React from 'react';
import CustomButton from './CustomButton';

const FilePicker = ({ file, setFile, readFile }) => {
    return (
        <div className="p-4 bg-white rounded-xl shadow-md space-y-3 text-black">
            {/* Upload Input */}
            <div className="flex flex-col space-y-1">
                <input
                    id="file-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                />
                <label
                    htmlFor="file-upload"
                    className="cursor-pointer text-blue-600 underline text-sm font-medium"
                >
                    Tải ảnh lên
                </label>
                <p className="text-sm truncate">{file?.name || "Chưa chọn file"}</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 pt-1">
                <CustomButton
                    type="outline"
                    title="Logo"
                    handleClick={() => readFile('logo')}
                    customStyles="text-sm w-full"
                />
                <CustomButton
                    type="filled"
                    title="Full"
                    handleClick={() => readFile('full')}
                    customStyles="text-sm w-full"
                />
            </div>
        </div>
    );
};

export default FilePicker;
