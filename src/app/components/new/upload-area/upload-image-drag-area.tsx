import { Upload } from 'lucide-react';
import { memo } from 'react';

function UploadImageDragAreaInternal() {
    return (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center rounded-lg z-10">
            <div className="text-center p-8 rounded-lg">
                <Upload className="mx-auto h-16 w-16 text-primary animate-bounce" />
                <p className="mt-4 text-xl font-medium">Drop images here</p>
            </div>
        </div>
    );
}

export const UploadImageDragArea = memo(UploadImageDragAreaInternal);
