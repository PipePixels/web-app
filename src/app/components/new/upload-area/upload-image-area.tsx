import { Upload } from 'lucide-react';
import { Button } from '@/app/ui/button';
import { DropzoneInputProps } from 'react-dropzone';

export interface UploadImageAreaProps {
    getInputProps: () => DropzoneInputProps;
}

// TODO: Memoize this
export function UploadImageArea(props: UploadImageAreaProps) {
    const { getInputProps } = props;

    return (
        <div
            className={`border-2 border-dashed border-primary/30 rounded-lg p-12 text-center cursor-pointer hover:bg-primary/5 transition-colors`}>
            <input {...getInputProps()} />

            <Upload className="mx-auto h-12 w-12 text-primary animate-pulse" />
            <h3 className="mt-4 text-lg font-medium text-primary">
                No Images Available
            </h3>
            <p className="mt-2 text-muted-foreground">
                Upload images to start applying filters
            </p>
            <Button variant="default" className="mt-4">
                Select Images
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
                Or drag & drop images here
            </p>
        </div>
    );
}
