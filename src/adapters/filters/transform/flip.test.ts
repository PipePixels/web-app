import { flip } from './flip';
import { FlipOperationParams } from '@/core/domain/filters/interfaces/operations/transform/flip';

describe('flip operation', () => {
    const imageSize = { width: 4, height: 2 };
    let mockImageData: ImageData;
    let mockCanvas: HTMLCanvasElement;
    let mockContext: CanvasRenderingContext2D;

    beforeEach(() => {
        mockImageData = new ImageData(
            new Uint8ClampedArray([
                255, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 255,
                255, 255,

                255, 0, 0, 255, 255, 255, 255, 255, 255, 0, 0, 255, 255, 255,
                255, 255,
            ]),
            imageSize.width,
            imageSize.height,
        );

        // Mock do contexto do canvas
        mockContext = {
            save: jest.fn(),
            translate: jest.fn(),
            scale: jest.fn(),
            drawImage: jest.fn(),
            restore: jest.fn(),
            putImageData: jest.fn(),
            getImageData: jest.fn().mockReturnValue(mockImageData),
        } as unknown as CanvasRenderingContext2D;

        // Mock do canvas
        mockCanvas = {
            getContext: jest.fn().mockReturnValue(mockContext),
            width: imageSize.width,
            height: imageSize.height,
        } as unknown as HTMLCanvasElement;

        // Mock do createElement
        global.document.createElement = jest.fn().mockReturnValue(mockCanvas);
    });

    const testCases: [string, FlipOperationParams][] = [
        ['nenhuma transformação', { horizontal: false, vertical: false }],
        ['flip horizontal', { horizontal: true, vertical: false }],
        ['flip vertical', { horizontal: false, vertical: true }],
        ['ambos os flips', { horizontal: true, vertical: true }],
    ];

    test.each(testCases)('deve aplicar %s', (_, params) => {
        const result = flip(params)(mockImageData);

        // Verifica se os métodos básicos foram chamados
        expect(mockContext.save).toHaveBeenCalled();
        expect(mockContext.restore).toHaveBeenCalled();
        expect(result).toBeDefined();

        // Verifica transformações específicas
        if (params.horizontal) {
            expect(mockContext.translate).toHaveBeenCalledWith(
                imageSize.width,
                0,
            );
            expect(mockContext.scale).toHaveBeenCalledWith(-1, 1);
        }

        if (params.vertical) {
            expect(mockContext.translate).toHaveBeenCalledWith(
                0,
                imageSize.height,
            );
            expect(mockContext.scale).toHaveBeenCalledWith(1, -1);
        }
    });

    test('deve lançar erro quando o contexto do canvas principal não está disponível', () => {
        (mockCanvas.getContext as jest.Mock).mockReturnValue(null);

        expect(() => {
            flip({ horizontal: true, vertical: false })(mockImageData);
        }).toThrow('Canvas context not available');
    });

    test('deve lançar erro quando o contexto do canvas temporário não está disponível', () => {
        let callCount = 0;
        (global.document.createElement as jest.Mock).mockImplementation(() => {
            callCount++;
            return {
                ...mockCanvas,
                getContext: () => (callCount === 2 ? null : mockContext),
            };
        });

        expect(() => {
            flip({ horizontal: true, vertical: false })(mockImageData);
        }).toThrow('Temp canvas context not available');
    });

    test('deve manter as dimensões originais da imagem', () => {
        const customImageData = new ImageData(
            imageSize.width,
            imageSize.height,
        );
        flip({ horizontal: true, vertical: true })(customImageData);

        expect(mockCanvas.width).toBe(imageSize.width);
        expect(mockCanvas.height).toBe(imageSize.height);
    });

    test('deve retornar uma nova ImageData', () => {
        const result = flip({ horizontal: false, vertical: false })(
            mockImageData,
        );

        expect(result).toBeInstanceOf(ImageData);
        expect(mockContext.getImageData).toHaveBeenCalledWith(
            0,
            0,
            imageSize.width,
            imageSize.height,
        );
    });
});
