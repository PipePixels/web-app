import { FlipOperation } from '@/core/domain/filters/interfaces/operations/transform/flip';

export const flip: FlipOperation =
    ({ horizontal, vertical }) =>
    (image) => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        ctx.save();

        if (horizontal) {
            ctx.translate(image.width, 0);
            ctx.scale(-1, 1);
        }

        if (vertical) {
            ctx.translate(0, image.height);
            ctx.scale(1, -1);
        }

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (!tempCtx) {
            throw new Error('Temp canvas context not available');
        }

        tempCtx.putImageData(image, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0);
        ctx.restore();
        return ctx.getImageData(0, 0, image.width, image.height);
    };
