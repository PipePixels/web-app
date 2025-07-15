import '@testing-library/jest-dom';
import 'jest-canvas-mock';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;

// @ts-ignore
global.ImageData = class ImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(width: number, height: number, data?: Uint8ClampedArray) {
        this.width = width;
        this.height = height;
        this.data = data || new Uint8ClampedArray(width * height * 4);
    }
};
