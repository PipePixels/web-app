import { Checkbox } from '@/app/ui/checkbox';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/ui/tooltip';
import { Button } from '@/app/ui/button';
import { Play, Trash2 } from 'lucide-react';
import { memo } from 'react';

export type ImageListActionsProps = {
    allSelected: boolean;
    hasSelectedImages: boolean;
    onSelectAllToggle: () => void;
    onDeletePress: () => void;
    onProcessPress: () => void;
};

function ImageListActionsInternal(props: ImageListActionsProps) {
    console.log('>>> ImageListActions');
    const {
        allSelected,
        hasSelectedImages,
        onSelectAllToggle,
        onDeletePress,
        onProcessPress,
    } = props;

    return (
        <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
                <Checkbox
                    id="selectAll"
                    checked={allSelected}
                    onCheckedChange={onSelectAllToggle}
                />
                <label htmlFor="selectAll" className="text-sm cursor-pointer">
                    Select All
                </label>
            </div>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/*TODO: implement delete action*/}
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={onDeletePress}
                            disabled={!hasSelectedImages}>
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Delete selected</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {/*TODO: implement process action*/}
                        <Button
                            onClick={onProcessPress}
                            variant="outline"
                            size="icon"
                            disabled={!hasSelectedImages}>
                            <Play className="h-4 w-4" />
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>Process all images</TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}

export const ImageListActions = memo(ImageListActionsInternal);
