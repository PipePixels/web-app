import { rotate } from './rotate';

const red = [255, 0, 0, 255];
const green = [0, 255, 0, 255];
const blue = [0, 0, 255, 255];
const white = [255, 255, 255, 255];

describe('rotate operation', () => {
    let mockImageData: ImageData;

    beforeEach(() => {
        mockImageData = new ImageData(2, 2);
        mockImageData.data.set(
            new Uint8ClampedArray([
                ...red, // pixel 1: red
                ...green, // pixel 2: green
                ...blue, // pixel 3: blue
                ...white, // pixel 4: white
            ]),
        );
    });

    describe('should rotate image by specified angle', () => {
        type RotateTestCase = {
            angle: number;
            expectedData: Uint8ClampedArray;
        };
        const testCases: RotateTestCase[] = [
            {
                angle: 0,
                expectedData: new Uint8ClampedArray([
                    ...red,
                    ...green,
                    ...blue,
                    ...white,
                ]),
            },
            {
                angle: 90,
                expectedData: new Uint8ClampedArray([
                    ...blue,
                    ...red,
                    ...white,
                    ...green,
                ]),
            },
            {
                angle: 180,
                expectedData: new Uint8ClampedArray([
                    ...white, // pixel 1: white
                    ...blue, // pixel 2: blue
                    ...green, // pixel 3: green
                    ...red, // pixel 4: red
                ]),
            },
            {
                angle: 270,
                expectedData: new Uint8ClampedArray([
                    ...green, // pixel 1: green
                    ...white, // pixel 2: white
                    ...red, // pixel 3: red
                    ...blue, // pixel 4: blue
                ]),
            },
        ];

        testCases.forEach(({ angle, expectedData }) => {
            test(`should rotate image by ${angle} degrees`, () => {
                const rotateOperation = rotate({ angle });
                const result = rotateOperation(mockImageData);
                const expected = new ImageData(2, 2);
                expected.data.set(expectedData);
                expect(result).toEqual(expected);
            });
        });
    });

    it('should throw an error if angle is not a multiple of 90', () => {
        const invalidAngle = 45;
        const rotateOperation = rotate({ angle: invalidAngle });
        const expectedMessage = `Unsupported angle. Use 0, 90, 180, or 270.`;
        expect(() => rotateOperation(mockImageData)).toThrow(expectedMessage);
    });

    it('should preserve RGBA values during rotation', () => {
        const rotateOperation = rotate({ angle: 90 });
        const result = rotateOperation(mockImageData);
        const originalPixels = Array.from(mockImageData.data).toSorted();
        const rotatedPixels = Array.from(result.data).toSorted();
        expect(rotatedPixels).toEqual(originalPixels);
    });

    it('should maintain correct dimensions after multiple rotations', () => {
        const image = mockImageData;
        const rot90 = rotate({ angle: 90 })(image);
        const rot180 = rotate({ angle: 90 })(rot90);
        const rot270 = rotate({ angle: 90 })(rot180);
        const rot360 = rotate({ angle: 90 })(rot270);
        expect(rot360).toEqual(image);
    });

    it('should handle empty ImageData correctly', () => {
        const emptyImageData = new ImageData(1, 1);
        const rotateOperation = rotate({ angle: 90 });
        const result = rotateOperation(emptyImageData);

        expect(result.width).toBe(1);
        expect(result.height).toBe(1);
        expect(result.data).toEqual(emptyImageData.data);
    });

    it('should preserve transparency during rotation', () => {
        const transparentImage = new ImageData(2, 2);
        const transparentRed = [255, 0, 0, 128];
        const transparentGreen = [0, 255, 0, 64];
        const transparentBlue = [0, 0, 255, 192];
        const transparentWhite = [255, 255, 255, 0];
        transparentImage.data.set(
            new Uint8ClampedArray([
                ...transparentRed, // pixel 1: semi-transparent red
                ...transparentGreen, // pixel 2: more transparent green
                ...transparentBlue, // pixel 3: less transparent blue
                ...transparentWhite, // pixel 4: fully transparent white
            ]),
        );

        const rotateOperation = rotate({ angle: 90 });
        const result = rotateOperation(transparentImage);
        expect(result.data[3]).toBe(192); // First pixel
        expect(result.data[7]).toBe(128); // Second pixel
        expect(result.data[11]).toBe(0); // Third pixel
        expect(result.data[15]).toBe(64); // Fourth pixel
    });
});
