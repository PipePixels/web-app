import { flip } from './flip';
import { FlipOperationParams } from '@/core/domain/filters/interfaces/operations/transform/flip';

describe('flip operation', () => {
    const imageSize = { width: 3, height: 2 };
    let mockCanvas: HTMLCanvasElement;
    let mockContext: CanvasRenderingContext2D;
    const imageData = new ImageData(
        new Uint8ClampedArray([
            255,
            0,
            0,
            255, // Red pixel
            0,
            0,
            255,
            255, // Blue pixel
            0,
            255,
            0,
            255, // Green pixel

            255,
            255,
            0,
            255, // Yellow pixel
            0,
            0,
            0,
            255, // Black pixel
            255,
            255,
            255,
            255, // White pixel
        ]),
        imageSize.width,
        imageSize.height,
    );
    const flippedHorizontal = new ImageData(
        new Uint8ClampedArray([
            0,
            255,
            0,
            255, // Green
            0,
            0,
            255,
            255, // Blue
            255,
            0,
            0,
            255, // Red

            255,
            255,
            255,
            255, // White
            0,
            0,
            0,
            255, // Black
            255,
            255,
            0,
            255, // Yellow
        ]),
        imageSize.width,
        imageSize.height,
    );
    const flippedVertical = new ImageData(
        new Uint8ClampedArray([
            255,
            255,
            0,
            255, // Yellow
            0,
            0,
            0,
            255, // Black
            255,
            255,
            255,
            255, // White

            255,
            0,
            0,
            255, // Red
            0,
            0,
            255,
            255, // Blue
            0,
            255,
            0,
            255, // Green
        ]),
        imageSize.width,
        imageSize.height,
    );
    const flippedBoth = new ImageData(
        new Uint8ClampedArray([
            // Linha 1 (invertida)
            255,
            255,
            255,
            255, // Branco
            0,
            0,
            0,
            255, // Preto
            255,
            255,
            0,
            255, // Amarelo

            // Linha 0 (invertida)
            0,
            255,
            0,
            255, // Verde
            0,
            0,
            255,
            255, // Azul
            255,
            0,
            0,
            255, // Vermelho
        ]),
        imageSize.width,
        imageSize.height,
    );

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
