import { FilterQueued } from '@/app/shared/state/filter-queue.state';
import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/app/ui/collapsible';
import { Button } from '@/app/ui/button';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import React from 'react';
import {
    filterMetadata,
    FilterMetadata,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import { FilterCardParams } from '@/app/components/filters/queue/filter-card-params';
import { Separator } from '@/components/ui/separator';

const metadataByType: { [key in FilterType]: FilterMetadata } =
    filterMetadata.reduce(
        (acc, filter) => {
            acc[filter.id] = filter;
            return acc;
        },
        {} as { [key in FilterType]: FilterMetadata },
    );

export function FilterCardList(props: {
    filters: FilterQueued[];
    hasImages: boolean;
    expandedTypes: Set<FilterType>;
    onRemoveFilter: (index: number) => void;
    onToggleStateItem: (type: FilterType) => void;
}) {
    const {
        filters,
        hasImages,
        expandedTypes,
        onToggleStateItem,
        onRemoveFilter,
    } = props;
    return filters.map((filter, index) => {
        const filterMeta = metadataByType[filter.type];
        return (
            <div
                className={`bg-card p-3 rounded-lg border shadow-sm ${!hasImages ? 'opacity-60' : ''}`}
                key={filterMeta.id}>
                <Collapsible
                    open={expandedTypes.has(filterMeta.id)}
                    onOpenChange={() => onToggleStateItem(filterMeta.id)}
                    className="w-full">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                                {filterMeta.icon}
                            </div>
                            <span className="font-medium">
                                {filterMeta.name}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <CollapsibleTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 mr-1">
                                    {expandedTypes.has(filterMeta.id) ? (
                                        <ChevronUp className="h-4 w-4" />
                                    ) : (
                                        <ChevronDown className="h-4 w-4" />
                                    )}
                                </Button>
                            </CollapsibleTrigger>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => onRemoveFilter(index)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    <CollapsibleContent>
                        <Separator className="my-4" />
                        <FilterCardParams metadata={filterMeta} />
                    </CollapsibleContent>
                </Collapsible>
            </div>
        );
    });
}
