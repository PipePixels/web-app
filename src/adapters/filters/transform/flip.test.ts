import { flip } from './flip';
import { FlipOperationParams } from '@/core/domain/filters/interfaces/operations/transform/flip';

function getImageData(
    width: number,
    height: number,
    data: ArrayLike<number>,
): ImageData {
    const image = new ImageData(width, height);
    image.data.set(new Uint8ClampedArray(data));
    return image;
}

describe('flip operation', () => {
    const imageSize = { width: 3, height: 2 };
    let mockCanvas: HTMLCanvasElement;
    let mockContext: CanvasRenderingContext2D;
    const red = [255, 0, 0, 255];
    const blue = [0, 0, 255, 255];
    const green = [0, 255, 0, 255];
    const yellow = [255, 255, 0, 255];
    const black = [0, 0, 0, 255];
    const white = [255, 255, 255, 255];

    const imageData = getImageData(imageSize.width, imageSize.height, [
        ...red, // Red pixel
        ...blue, // Blue pixel
        ...green, // Green pixel
        ...yellow, // Yellow pixel
        ...black, // Black pixel
        ...white, // White pixel
    ]);
    const flippedHorizontal = getImageData(imageSize.width, imageSize.height, [
        ...green, // Green pixel
        ...blue, // Blue pixel
        ...red, // Red pixel
        ...white, // White pixel
        ...black, // Black pixel
        ...yellow, // Yellow pixel
    ]);
    const flippedVertical = getImageData(imageSize.width, imageSize.height, [
        ...yellow, // Yellow pixel
        ...black, // Black pixel
        ...white, // White pixel
        ...red, // Red pixel
        ...blue, // Blue pixel
        ...green, // Green pixel
    ]);
    const flippedBoth = getImageData(imageSize.width, imageSize.height, [
        ...white, // White pixel
        ...black, // Black pixel
        ...yellow, // Yellow pixel
        ...green, // Green pixel
        ...blue, // Blue pixel
        ...red, // Red pixel
    ]);

    beforeEach(() => {
        mockContext = {
            save: jest.fn(),
            translate: jest.fn(),
            scale: jest.fn(),
            drawImage: jest.fn(),
            restore: jest.fn(),
            putImageData: jest.fn(),
            getImageData: jest.fn().mockReturnValue(imageData),
        } as unknown as CanvasRenderingContext2D;

        mockCanvas = {
            getContext: jest.fn().mockReturnValue(mockContext),
            width: imageSize.width,
            height: imageSize.height,
        } as unknown as HTMLCanvasElement;

        global.document.createElement = jest.fn().mockReturnValue(mockCanvas);
    });

    describe('should apply flip right', () => {
        const testCases: [string, FlipOperationParams, ImageData][] = [
            [
                'no transformation',
                { horizontal: false, vertical: false },
                imageData,
            ],
            [
                'horizontal flip',
                { horizontal: true, vertical: false },
                flippedHorizontal,
            ],
            [
                'vertical flip',
                { horizontal: false, vertical: true },
                flippedVertical,
            ],
            ['both flips', { horizontal: true, vertical: true }, flippedBoth],
        ];

        test.each(testCases)('should apply %s', (_, params, expected) => {
            const result = flip(params)(imageData);
            expect(result).toEqual(expected);
        });
    });

    test('should keep the original image dimensions', () => {
        const customImageData = new ImageData(
            imageSize.width,
            imageSize.height,
        );
        flip({ horizontal: true, vertical: true })(customImageData);

        expect(mockCanvas.width).toBe(imageSize.width);
        expect(mockCanvas.height).toBe(imageSize.height);
    });

    test('should return a new ImageData', () => {
        const result = flip({ horizontal: false, vertical: false })(imageData);
        expect(result).toBeInstanceOf(ImageData);
    });
});
