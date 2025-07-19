import { BrightnessOperation } from '@/core/domain/filters/interfaces/operations/lighting-contrast/brightness';

export const brightness: BrightnessOperation =
    ({ value }) =>
    (image: ImageData) => {
        const dataClone = new Uint8ClampedArray(image.data);
        if (value === 0) {
            return image;
        }

        const factor = (value / 100) * 255;

        for (let i = 0; i < dataClone.length; i += 4) {
            dataClone[i] = clamp(dataClone[i] + factor); // Red
            dataClone[i + 1] = clamp(dataClone[i + 1] + factor); // Green
            dataClone[i + 2] = clamp(dataClone[i + 2] + factor); // Blue
        }

        const newImage = new ImageData(image.width, image.height);
        newImage.data.set(dataClone);
        return newImage;
    };

function clamp(val: number): number {
    return Math.max(0, Math.min(255, val));
}
