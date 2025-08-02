export const downloadCanvasToImage = () => {
    const canvas = document.querySelector("canvas");
    const dataURL = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = dataURL;
    link.download = "canvas.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

export const reader = (file) =>
    new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result);
        fileReader.readAsDataURL(file);
    });

export const getContrastingColor = (hexColor) => {
    // Bỏ ký tự # nếu có
    const color = hexColor.replace('#', '');

    // Parse R, G, B từ mã hex
    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    // Tính độ sáng theo công thức tiêu chuẩn WCAG
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Ngưỡng độ sáng trung bình: nếu sáng thì chữ đen, nếu tối thì chữ trắng
    return brightness > 160 ? '#000000' : '#ffffff';
};
