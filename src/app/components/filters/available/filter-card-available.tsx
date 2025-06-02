import { FilterMetadata } from '@/core/domain/filters/interfaces/operations/filter-metadata';
import type React from 'react';
import { Badge } from '@/app/ui/badge';
import { FilterCardTooltip } from '@/app/components/filters/filter-card-tooltip';

export function FilterCardAvailable(props: {
    filter: FilterMetadata;
    hasImages: boolean;
}) {
    const { filter, hasImages } = props;
    return (
        <div
            className={`bg-card border rounded-md p-3 flex items-center gap-3 ${
                hasImages
                    ? 'cursor-grab hover:bg-accent/50'
                    : 'cursor-not-allowed'
            } transition-colors`}>
            <div
                className={`p-1.5 rounded-md ${hasImages ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}`}>
                {filter.icon}
            </div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center">
                    <span className="text-sm font-medium">{filter.name}</span>
                    <Badge variant="outline" className="ml-2 text-xs">
                        {filter.creditCost} credit
                        {filter.creditCost > 1 ? 's' : ''}
                    </Badge>
                </div>
            </div>

            <FilterCardTooltip filter={filter} />
        </div>
    );
}
