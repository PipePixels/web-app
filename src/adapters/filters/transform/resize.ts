import { ResizeOperation } from '@/core/domain/filters/interfaces/operations/transform/resize';

export const resize: ResizeOperation = ({ height, width }) => {
    return (image) => {
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (!tempCtx) {
            throw new Error('Temp canvas context not available');
        }

        tempCtx.putImageData(image, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0, width, height);
        return ctx.getImageData(0, 0, width, height);
    };
};
