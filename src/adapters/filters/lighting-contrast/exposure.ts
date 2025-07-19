import { ExposureOperation } from '@/core/domain/filters/interfaces/operations/lighting-contrast/exposure';

function applyExposureFilter(
    imageData: ImageData,
    exposure: number,
): ImageData {
    const newImageData = new ImageData(imageData.width, imageData.height);
    newImageData.data.set(new Uint8ClampedArray(imageData.data));
    const multiplier = Math.pow(2, exposure / 100);

    if (multiplier === 1) {
        return newImageData;
    }

    const data = newImageData.data;

    for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * multiplier); // Red
        data[i + 1] = Math.min(255, data[i + 1] * multiplier); // Green
        data[i + 2] = Math.min(255, data[i + 2] * multiplier); // Blue
    }

    return newImageData;
}

export const exposure: ExposureOperation = ({ value }) => {
    return (image) => {
        return applyExposureFilter(image, value);
    };
};
