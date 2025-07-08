import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/app/ui/tooltip';
import { FilterMetadata } from '@/core/domain/filters/filter-metadata/filter-metadata';
import { Info } from 'lucide-react';

export function FilterCardTooltip(props: { filter: FilterMetadata }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Info className="h-4 w-4 text-muted-foreground" />
                </TooltipTrigger>

                <TooltipContent className="bg-popover text-popover-foreground border-border max-w-xs">
                    <div className="space-y-2">
                        <p>{props.filter.description}</p>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
