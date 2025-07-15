import { FlipOperation } from '@/core/domain/filters/interfaces/operations/transform/flip';

export const flip: FlipOperation =
    ({ horizontal, vertical }) =>
    (image: ImageData): ImageData => {
        const { width, height, data } = image;
        const resultData = new Uint8ClampedArray(data.length);

        for (let y = 0; y < height; y++) {
            const srcY = vertical ? height - 1 - y : y;

            for (let x = 0; x < width; x++) {
                const srcX = horizontal ? width - 1 - x : x;

                const srcIndex = (srcY * width + srcX) * 4;
                const dstIndex = (y * width + x) * 4;

                resultData[dstIndex] = data[srcIndex];
                resultData[dstIndex + 1] = data[srcIndex + 1];
                resultData[dstIndex + 2] = data[srcIndex + 2];
                resultData[dstIndex + 3] = data[srcIndex + 3];
            }
        }
        const result = new ImageData(width, height);
        result.data.set(resultData);
        return result;
    };
