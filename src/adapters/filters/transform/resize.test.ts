// Utilitário para criar uma imagem com cor sólida
import { resize } from '@/adapters/filters/transform/resize';

function createTestImage(
    width: number,
    height: number,
    color: [number, number, number, number],
): ImageData {
    const data = new Uint8ClampedArray(width * height * 4);
    for (let i = 0; i < data.length; i += 4) {
        data.set(color, i);
    }
    return new ImageData(data, width, height);
}

it('resizes with only width, preserving aspect ratio', () => {
    const img = createTestImage(4, 2, [100, 100, 100, 255]); // 2:1
    // @ts-ignore
    const resized = resize({ width: 2 })(img);
    expect(resized.width).toBe(2);
    expect(resized.height).toBe(1); // 2:1 mantido
});

it('resizes with only height, preserving aspect ratio', () => {
    const img = createTestImage(2, 4, [50, 50, 50, 255]); // 1:2
    // @ts-ignore
    const resized = resize({ height: 2 })(img);
    expect(resized.width).toBe(1);
    expect(resized.height).toBe(2); // 1:2 mantido
});

it('resizes to fit inside bounding box (width & height), preserving aspect ratio', () => {
    const img = createTestImage(4, 2, [10, 20, 30, 255]); // 2:1
    const resized = resize({ width: 3, height: 3 })(img);

    expect(resized.width).toBe(3);
    expect(resized.height).toBe(2); // 3x2 = 2:1 dentro de 3x3
});

it('throws if neither width nor height is provided', () => {
    const img = createTestImage(4, 4, [0, 0, 0, 255]);
    const expectedError = "You must provide 'width' or 'height'.";
    // @ts-ignore
    expect(() => resize({})(img)).toThrow(expectedError);
});
