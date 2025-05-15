import { Card, CardContent } from '@/app/ui/card';
import { Checkbox } from '@/app/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/app/ui/dropdown-menu';
import { Button } from '@/app/ui/button';
import { Download, Eye, MoreVertical, Trash2 } from 'lucide-react';
import { ImageItem } from '@/app/components/new/images-context';
import { memo, useEffect, useRef } from 'react';

export type ImageListCardProps = {
    image: ImageItem;
    selected: boolean;
    onCheckedToggle: (image: ImageItem) => void;
    onDelete: (image: ImageItem) => void;
    onDownload: (image: ImageItem) => void;
    onPreview: (image: ImageItem) => void;
};

// TODO: Memoize this
function ImageListCardInternal(props: ImageListCardProps) {
    console.log(`RENDERED IMAGE CARD ${props.image.name}`);
    const {
        image,
        selected,
        onCheckedToggle,
        onDelete,
        onDownload,
        onPreview,
    } = props;

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (!canvas) {
            return;
        }

        const ctx = canvas.getContext('2d');

        if (ctx) {
            canvas.width = image.preview.width;
            canvas.height = image.preview.height;
            ctx.putImageData(image.preview, 0, 0);
        }
    }, [image.preview]);

    return (
        <Card
            className={`overflow-hidden ${selected ? 'ring-2 ring-primary' : ''}`}>
            {selected + ''}
            <div className="relative aspect-square group">
                <canvas
                    ref={canvasRef}
                    className="object-cover transition-all group-hover:brightness-90 size-full"
                />
                <div className="absolute inset-0 flex items-start justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Checkbox
                        checked={selected}
                        onCheckedChange={() => onCheckedToggle(image)}
                        className="bg-background/80 border-background/80"
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 bg-background/80 backdrop-blur-sm">
                                <MoreVertical className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem
                                onClick={() => onPreview(image)}
                                className="text-primary hover:text-primary focus:text-primary">
                                <Eye className="mr-2 h-4 w-4" /> Preview with
                                Filters
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onDownload(image)}>
                                <Download className="mr-2 h-4 w-4" /> Download
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="text-destructive"
                                onClick={() => onDelete(image)}>
                                <Trash2 className="mr-2 h-4 w-4" /> Delete
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
            <CardContent className="p-3">
                <p className="text-sm font-medium truncate">{image.name}</p>
                {/*TODO: Rewrite this to use a better way to get the file size*/}
                {/*<p className="text-xs text-muted-foreground">*/}
                {/*    {Math.round(image.file.size / 1024)} KB*/}
                {/*</p>*/}
            </CardContent>
        </Card>
    );
}

export const ImageListCard = memo(ImageListCardInternal);
