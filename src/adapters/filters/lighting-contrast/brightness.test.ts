import { brightness } from './brightness';

const createImageData = (pixels: number[]): ImageData => {
    const data = new Uint8ClampedArray(pixels);
    return { data, width: 1, height: 1 } as ImageData;
};

describe('brightness', () => {
    let imageData: ImageData;

    beforeEach(() => {
        // Create a small 2x2 image data with known values
        const data = new Uint8ClampedArray([
            100,
            100,
            100,
            255, // Pixel 1: RGB(100,100,100)
            150,
            150,
            150,
            255, // Pixel 2: RGB(150,150,150)
            200,
            200,
            200,
            255, // Pixel 3: RGB(200,200,200)
            50,
            50,
            50,
            255, // Pixel 4: RGB(50,50,50)
        ]);
        imageData = new ImageData(data, 2, 2);
    });

    it('should not change pixels when brightness value is 0', () => {
        const result = brightness({ value: 0 })(imageData);
        expect([...result.data.slice(0, 3)]).toEqual([100, 100, 100]);
    });

    it('should increase brightness correctly with positive value', () => {
        const result = brightness({ value: 50 })(imageData);
        expect([...result.data.slice(0, 3)]).toEqual([228, 228, 228]);
    });

    it('should decrease brightness correctly with negative value', () => {
        const result = brightness({ value: -50 })(imageData);
        const expectedValue = Math.max(0, 100 - 127.5);
        expect([...result.data.slice(0, 3)]).toEqual([
            expectedValue,
            expectedValue,
            expectedValue,
        ]);
    });

    it('should make the image completely black with value -100', () => {
        const image = createImageData([100, 150, 200, 255]);
        const result = brightness({ value: -100 })(image);
        expect([...result.data.slice(0, 4)]).toEqual([0, 0, 0, 255]);
    });

    it('should make the image completely white with value 100', () => {
        const image = createImageData([100, 150, 200, 255]);
        const result = brightness({ value: 100 })(image);
        expect([...result.data.slice(0, 4)]).toEqual([255, 255, 255, 255]);
    });

    it('should clamp brightness value to maximum 100', () => {
        const result = brightness({ value: 150 })(imageData);
        const expectedValue = Math.min(255, 100 + 255);
        expect([...result.data.slice(0, 3)]).toEqual([
            expectedValue,
            expectedValue,
            expectedValue,
        ]);
    });

    it('should clamp brightness value to minimum -100', () => {
        const result = brightness({ value: -150 })(imageData);
        const expectedValue = Math.max(0, 100 - 255);
        expect([...result.data.slice(0, 3)]).toEqual([
            expectedValue,
            expectedValue,
            expectedValue,
        ]);
    });

    it('should preserve alpha channel', () => {
        const result = brightness({ value: 50 })(imageData);
        expect([
            result.data[3],
            result.data[7],
            result.data[11],
            result.data[15],
        ]).toEqual([255, 255, 255, 255]);
    });

    it('should handle edge case with full black pixels', () => {
        const blackImage = new ImageData(
            new Uint8ClampedArray([0, 0, 0, 255]),
            1,
            1,
        );
        const result = brightness({ value: 50 })(blackImage);
        expect([...result.data.slice(0, 3)]).toEqual([128, 128, 128]);
    });

    it('should handle edge case with full white pixels', () => {
        const whiteImage = new ImageData(
            new Uint8ClampedArray([255, 255, 255, 255]),
            1,
            1,
        );
        const result = brightness({ value: -50 })(whiteImage);
        expect([...result.data.slice(0, 3)]).toEqual([128, 128, 128]);
    });
});
