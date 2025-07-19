import { ContrastOperation } from '@/core/domain/filters/interfaces/operations/lighting-contrast/contrast';

export const contrast: ContrastOperation =
    ({ value }) =>
    (image: ImageData): ImageData => {
        if (value === 0) {
            return image;
        }

        const data = new Uint8ClampedArray(image.data);
        const factor = (259 * (value + 255)) / (255 * (259 - value));

        for (let i = 0; i < data.length; i += 4) {
            data[i] = clamp(factor * (data[i] - 128) + 128); // Red
            data[i + 1] = clamp(factor * (data[i + 1] - 128) + 128); // Green
            data[i + 2] = clamp(factor * (data[i + 2] - 128) + 128); // Blue
        }

        const result = new ImageData(image.width, image.height);
        result.data.set(data);
        return result;
    };

function clamp(val: number): number {
    return Math.max(0, Math.min(255, Math.round(val)));
}
