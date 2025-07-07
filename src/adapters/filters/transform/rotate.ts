import { RotateOperation } from '@/core/domain/filters/interfaces/operations/transform/rotate';

export const rotate: RotateOperation =
    ({ angle }) =>
    (image) => {
        const radians = (angle * Math.PI) / 180;
        const sin = Math.abs(Math.sin(radians));
        const cos = Math.abs(Math.cos(radians));
        const newWidth = Math.ceil(image.width * cos + image.height * sin);
        const newHeight = Math.ceil(image.width * sin + image.height * cos);

        const canvas = document.createElement('canvas');
        canvas.width = newWidth;
        canvas.height = newHeight;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Canvas context not available');
        }

        // Centraliza e rotaciona
        ctx.translate(newWidth / 2, newHeight / 2);
        ctx.rotate(radians);
        ctx.translate(-image.width / 2, -image.height / 2);

        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = image.width;
        tempCanvas.height = image.height;
        const tempCtx = tempCanvas.getContext('2d');

        if (!tempCtx) {
            throw new Error('Temp canvas context not available');
        }

        tempCtx.putImageData(image, 0, 0);
        ctx.drawImage(tempCanvas, 0, 0);
        return ctx.getImageData(0, 0, newWidth, newHeight);
    };
