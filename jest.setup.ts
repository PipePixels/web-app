import '@testing-library/jest-dom';
import 'jest-canvas-mock';

class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

global.ResizeObserver = ResizeObserverMock;
