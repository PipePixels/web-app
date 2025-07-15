import { RotateOperation } from '@/core/domain/filters/interfaces/operations/transform/rotate';

export const rotate: RotateOperation = ({ angle }) => {
    return (image: ImageData): ImageData => {
        const { width, height, data } = image;

        // Apenas ângulos múltiplos de 90
        const normalizedAngle = ((angle % 360) + 360) % 360;

        let newWidth = width;
        let newHeight = height;

        if (normalizedAngle === 90 || normalizedAngle === 270) {
            newWidth = height;
            newHeight = width;
        }

        const result = new Uint8ClampedArray(newWidth * newHeight * 4);

        const getPixel = (x: number, y: number) => {
            const idx = (y * width + x) * 4;
            return data.slice(idx, idx + 4);
        };

        const setPixel = (
            x: number,
            y: number,
            rgba: Uint8ClampedArray | number[],
        ) => {
            const idx = (y * newWidth + x) * 4;
            result.set(rgba, idx);
        };

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const pixel = getPixel(x, y);

                let newX = x;
                let newY = y;

                switch (normalizedAngle) {
                    case 90:
                        newX = height - 1 - y;
                        newY = x;
                        break;
                    case 180:
                        newX = width - 1 - x;
                        newY = height - 1 - y;
                        break;
                    case 270:
                        newX = y;
                        newY = width - 1 - x;
                        break;
                    case 0:
                        newX = x;
                        newY = y;
                        break;
                    default:
                        throw new Error(
                            'Unsupported angle. Use 0, 90, 180, or 270.',
                        );
                }

                setPixel(newX, newY, pixel);
            }
        }

        const output = new ImageData(newWidth, newHeight);
        output.data.set(result);
        return output;
    };
};
