import { contrast } from './contrast';
import { BLACK_PIXEL, createImageData, WHITE_PIXEL } from '../test-utils/image';

describe('contrast', () => {
    const defaultImage = createImageData([100, 150, 200, 255]);

    it('should return the same image when value is 0', () => {
        const result = contrast({ value: 0 })(defaultImage);
        expect(result.data).toEqual(defaultImage.data);
    });

    it('should increase contrast for positive value', () => {
        const result = contrast({ value: 50 })(defaultImage);
        const expected = new Uint8ClampedArray([86, 161, 235, 255]);
        expect(result.data).toEqual(expected);
    });

    it('should decrease contrast for negative value', () => {
        const result = contrast({ value: -50 })(defaultImage);
        const expected = new Uint8ClampedArray([109, 143, 177, 255]);
        expect(result.data).toEqual(expected);
    });

    it('should clamp values to stay within [0, 255]', () => {
        const image = createImageData([250, 5, 128, 255]);
        const result = contrast({ value: 100 })(image);
        expect(result.data[0]).toBe(255);
        expect(result.data[1]).toBe(0);
        expect(result.data[2]).toBe(128);
        expect(result.data[3]).toBe(255);
    });

    describe('edge cases', () => {
        it('should apply correct contrast for values below, at, and above midpoint', () => {
            const image = createImageData([100, 128, 200, 255]);
            const result = contrast({ value: 100 })(image);

            // Expected result:
            // 100 < 128 → should get darker
            expect(result.data[0]).toBe(65);

            // 128 → midpoint, should remain the same
            expect(result.data[1]).toBe(128);

            // 200 > 128 → should get lighter
            expect(result.data[2]).toBe(255);
        });

        it('should handle edge case with all black pixels', () => {
            const image = createImageData(BLACK_PIXEL);
            const result = contrast({ value: 100 })(image);
            expect(result.data).toEqual(BLACK_PIXEL);
        });

        it('should handle edge case with all white pixels', () => {
            const image = createImageData(WHITE_PIXEL);
            const result = contrast({ value: 100 })(image);
            expect(result.data).toEqual(WHITE_PIXEL);
        });
    });
});
