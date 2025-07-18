import { brightness } from './brightness';
import { BLACK_PIXEL, clamp, createImageData, GRAY_PIXEL, WHITE_PIXEL } from '../test-utils/image';

describe('brightness', () => {
    const imageData = createImageData(
        [
            100,
            100,
            100,
            255, // Pixel 1
            150,
            150,
            150,
            255, // Pixel 2
            200,
            200,
            200,
            255, // Pixel 3
            50,
            50,
            50,
            255, // Pixel 4
        ],
        2,
        2,
    );

    it('should preserve alpha channel', () => {
        const result = brightness({ value: -50 })(imageData);
        const pixelsAlpha = [
            result.data[3],
            result.data[7],
            result.data[11],
            result.data[15,
        ];
        expect(pixelsAlpha).toEqual([255, 255, 255, 255]);
    });

    describe('clamp values', () => {
        it('should clamp brightness to maximum when value exceeds 100', () => {
            const result = brightness({ value: 150 })(imageData);
            const hasExceedingValues = result.data.some((value) => value > 255);
            expect(hasExceedingValues).toBe(false);
        });

        it('should clamp brightness to minimum when value is below -100', () => {
            const result = brightness({ value: -150 })(imageData);
            const hasNegativeValues = result.data.some((value) => value < 0);
            expect(hasNegativeValues).toBe(false);
        });
    });

    describe('basic operations', () => {
        it('should not change pixels when brightness value is 0', () => {
            const result = brightness({ value: 0 })(imageData);
            expect(result).toEqual(imageData);
        });

        it('should increase brightness correctly with positive value', () => {
            const result = brightness({ value: 50 })(imageData);
            const expectedData = new Uint8ClampedArray([
                228, 228, 228, 255, 255, 255, 255, 255, 255, 255, 255, 255, 178,
                178, 178, 255
            ]);
            expect(result.data).toEqual(expectedData);
        });

        it('should decrease brightness correctly with negative value', () => {
            const result = brightness({ value: -50 })(imageData);
            const expectedValue = clamp(100 - 127.5);
            expect([...result.data.slice(0, 3)]).toEqual([
                expectedValue,
                expectedValue,
                expectedValue,
            ]);
        });
    });

    describe('edge values', () => {
        it('should handle edge case with full black pixels', () => {
            const blackImage = createImageData(BLACK_PIXEL);
            const result = brightness({ value: 50 })(blackImage);
            expect(result.data).toEqual(GRAY_PIXEL);
        });

        it('should handle edge case with full white pixels', () => {
            const whiteImage = createImageData(WHITE_PIXEL);
            const result = brightness({ value: -50 })(whiteImage);
            expect(result.data).toEqual(GRAY_PIXEL);
        });

        it('should make the image completely black with value -100', () => {
            const image = createImageData(GRAY_PIXEL);
            const result = brightness({ value: -100 })(image);
            expect(result.data).toEqual(BLACK_PIXEL);
        });

        it('should make the image completely white with value 100', () => {
            const image = createImageData(GRAY_PIXEL);
            const result = brightness({ value: 100 })(image);
            expect(result.data).toEqual(WHITE_PIXEL);
        });
    });
});
