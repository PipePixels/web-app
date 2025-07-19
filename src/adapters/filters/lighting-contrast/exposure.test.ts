import { exposure } from './exposure';
import { BLACK_PIXEL, createImageData, WHITE_PIXEL } from '../test-utils/image';

describe('exposure', () => {
    const defaultPixel = [100, 150, 200, 255];
    const defaultImage = createImageData(defaultPixel);
    const exposition2x = 100; // 2^(100 / 100) = 2
    const multiplier2x = Math.pow(2, exposition2x / 100); // 2^(100 / 100) = 2
    const multiplier2xNeg = Math.pow(2, -exposition2x / 100); // 2^(-100 / 100) = 0.5
    const exposition4x = 200; // 2^(200 / 100) = 4

    it('should return the same image when value is 0', () => {
        const result = exposure({ value: 0 })(defaultImage);
        expect(result.data).toEqual(defaultImage.data);
    });

    it('should increase brightness exponentially for positive value', () => {
        const result = exposure({ value: exposition2x })(defaultImage);

        const expected = new Uint8ClampedArray([
            Math.min(255, defaultPixel[0] * multiplier2x),
            Math.min(255, defaultPixel[1] * multiplier2x),
            Math.min(255, defaultPixel[2] * multiplier2x),
            255,
        ]);
        expect(result.data).toEqual(expected);
    });

    it('should decrease brightness exponentially for negative value', () => {
        const exposition = -exposition2x;
        const result = exposure({ value: exposition })(defaultImage);

        const expected = new Uint8ClampedArray([
            defaultPixel[0] * multiplier2xNeg,
            defaultPixel[1] * multiplier2xNeg,
            defaultPixel[2] * multiplier2xNeg,
            255,
        ]);
        expect(result.data).toEqual(expected);
    });

    it('should clamp pixel values to maximum 255', () => {
        const result = exposure({ value: exposition4x })(defaultImage);

        // With exposure 200, multiplier is 2^2 = 4
        // Any value * 4 > 255 should be clamped to 255
        const hasExceedingValues = [...result.data].some(
            (value) => value > 255,
        );
        expect(hasExceedingValues).toBe(false);
    });
    describe('edge cases', () => {
        it('should preserve values that are already at maximum', () => {
            const image = createImageData(WHITE_PIXEL);
            const result = exposure({ value: exposition2x })(image);
            expect(result.data).toEqual(WHITE_PIXEL);
        });

        it('should handle edge case with all black pixels', () => {
            const image = createImageData(BLACK_PIXEL);
            const result = exposure({ value: exposition4x })(image);
            expect(result.data).toEqual(BLACK_PIXEL);
        });

        it('should preserve alpha channel', () => {
            const image = createImageData([100, 150, 200, 200]);
            const result = exposure({ value: exposition4x })(image);
            expect(result.data[3]).toBe(200);
        });
    });
});
