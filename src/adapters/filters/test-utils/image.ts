// Utility functions for image-related tests

export function createImageData(
    pixels: ArrayLike<number>,
    width = 1,
    height?: number,
): ImageData {
    if (!height) {
        height = Math.ceil(pixels.length / 4 / width);
    }
    const data = new Uint8ClampedArray(pixels);
    return new ImageData(data, width, height);
}

export function clamp(val: number): number {
    return Math.max(0, Math.min(255, Math.round(val)));
}

export const BLACK_PIXEL = new Uint8ClampedArray([0, 0, 0, 255]);
export const WHITE_PIXEL = new Uint8ClampedArray([255, 255, 255, 255]);
export const GRAY_PIXEL = new Uint8ClampedArray([128, 128, 128, 255]);
