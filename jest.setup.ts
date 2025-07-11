import '@testing-library/jest-dom';

class ResizeObserverMock {
    observe() {}

    unobserve() {}

    disconnect() {}
}

// @ts-ignore
global.ImageData = class ImageData {
    data: Uint8ClampedArray;
    width: number;
    height: number;

    constructor(
        data: Uint8ClampedArray | number[],
        width: number,
        height: number,
    ) {
        this.data = new Uint8ClampedArray(data);
        this.width = width;
        this.height = height;
    }
};

global.ResizeObserver = ResizeObserverMock;
