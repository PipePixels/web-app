import { ResizeOperation } from '@/core/domain/filters/interfaces/operations/transform/resize';

const resizeSimple: ResizeOperation =
    ({ width: targetWidth, height: targetHeight }) =>
    (image: ImageData): ImageData => {
        const { width: srcWidth, height: srcHeight, data: srcData } = image;
        const dstData = new Uint8ClampedArray(targetWidth * targetHeight * 4);

        for (let y = 0; y < targetHeight; y++) {
            const srcY = Math.floor((y / targetHeight) * srcHeight);
            for (let x = 0; x < targetWidth; x++) {
                const srcX = Math.floor((x / targetWidth) * srcWidth);

                const srcIndex = (srcY * srcWidth + srcX) * 4;
                const dstIndex = (y * targetWidth + x) * 4;

                dstData[dstIndex] = srcData[srcIndex]; // R
                dstData[dstIndex + 1] = srcData[srcIndex + 1]; // G
                dstData[dstIndex + 2] = srcData[srcIndex + 2]; // B
                dstData[dstIndex + 3] = srcData[srcIndex + 3]; // A
            }
        }

        return new ImageData(dstData, targetWidth, targetHeight);
    };

export const resize: ResizeOperation = (settings) => {
    return (image) => {
        const { width: targetW, height: targetH } = settings;
        const { width: srcW, height: srcH } = image;

        if (!targetW && !targetH) {
            throw new Error("You must provide 'width' or 'height'.");
        }

        // Calcula a nova largura/altura mantendo proporção
        let newW: number, newH: number;
        const aspectRatio = srcW / srcH;

        if (targetW && !targetH) {
            newW = targetW;
            newH = Math.round(targetW / aspectRatio);
        } else if (!targetW && targetH) {
            newH = targetH;
            newW = Math.round(targetH * aspectRatio);
        } else {
            // Se ambos forem fornecidos, ajusta para caber dentro mantendo proporção
            const scaleW = targetW! / srcW;
            const scaleH = targetH! / srcH;
            const scale = Math.min(scaleW, scaleH);
            newW = Math.round(srcW * scale);
            newH = Math.round(srcH * scale);
        }

        // Usa o resize rápido com dimensões ajustadas
        return resizeSimple({ width: newW, height: newH })(image);
    };
};
