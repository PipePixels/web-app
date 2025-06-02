import { FilterMetadata } from '@/core/domain/filters/interfaces/operations/filter-metadata';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Info } from 'lucide-react';
import type React from 'react';

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
                        <div className="text-xs text-muted-foreground pt-1 border-t">
                            Cost: {props.filter.creditCost} credit
                            {props.filter.creditCost > 1 ? 's' : ''} per
                            operation
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
