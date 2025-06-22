import React, { useCallback } from 'react';
import {
    FilterMetadata,
    filterMetadata,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Button } from '@/app/ui/button';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from '@/app/ui/collapsible';
import { Badge } from '@/app/ui/badge';
import { Slider } from '@/components/ui/slider';
import { NoImagesWarning } from '@/app/components/filters/queue/no-images-warning';
import { AppliedAllImagesWarning } from '@/app/components/filters/queue/applied-all-images-warning';
import {
    FilterQueueActionType,
    useFiltersQueue,
} from '@/app/shared/state/filter-queue.state';
import {
    FilterQueueItemStateActionType,
    useFilterQueueCollapse,
} from '@/app/shared/state/filter-queue-item.state';
import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
import { useImagesSub } from '@/app/components/new/images-context';

function FilterCardParams(props: {
    param: string;
    value: number;
    onValueChange: (values: number[]) => void;
}) {
    return (
        <div className="mt-3">
            <div className="flex justify-between text-xs mb-1.5">
                <span className="capitalize text-muted-foreground">
                    {props.param}
                </span>
                <Badge variant="outline" className="h-5 px-2 font-normal">
                    {props.value}
                </Badge>
            </div>
            <Slider
                value={[props.value]}
                min={props.param === 'angle' ? -180 : -100}
                max={props.param === 'angle' ? 180 : 200}
                step={1}
                onValueChange={props.onValueChange}
                className="my-0.5"
            />
        </div>
    );
}

const metadataByType: { [key in FilterType]: FilterMetadata } =
    filterMetadata.reduce(
        (acc, filter) => {
            acc[filter.id] = filter;
            return acc;
        },
        {} as { [key in FilterType]: FilterMetadata },
    );

export function FiltersQueue(props: {
    credits: number;
    onApplyFilters: () => Promise<void>;
    processing: boolean;
}) {
    const { state: filterQueueState, dispatch: filterQueueDispatch } =
        useFiltersQueue();
    const { state: expandedTypesState, dispatch: expandedTypesDispatch } =
        useFilterQueueCollapse();
    const { queuedFilters } = filterQueueState;
    const { hasImages } = useImagesSub();
    const expandedTypes = expandedTypesState.expanded;

    const toggleStateItem = (type: FilterType) => {
        expandedTypesDispatch({
            type: FilterQueueItemStateActionType.ToggleCollapse,
            payload: type,
        });
    };

    const toggleStateAllItems = () => {
        expandedTypesDispatch({
            type: FilterQueueItemStateActionType.ToggleCollapseAll,
            payload: queuedFilters,
        });
    };

    // Remove a filter from the queue
    const removeFilter = useCallback(
        (index: number) => {
            const filterType = queuedFilters[index].type;
            filterQueueDispatch({
                type: FilterQueueActionType.Remove,
                payload: filterType,
            });
            expandedTypesDispatch({
                type: FilterQueueItemStateActionType.Remove,
                payload: filterType,
            });
        },
        [expandedTypesDispatch, filterQueueDispatch, queuedFilters],
    );

    const clearAll = () => {
        filterQueueDispatch({
            type: FilterQueueActionType.ClearAll,
        });
    };

    // Update filter parameters
    // TODO: Finalize this
    const updateFilterParam = (
        index: number,
        paramName: string,
        value: number,
    ) => {
        const newQueuedFilters = [...queuedFilters];
        if (newQueuedFilters[index].params) {
            newQueuedFilters[index].params![paramName] = value;
            // setQueuedFilters(newQueuedFilters);
        }
    };

    return (
        <Card className="mb-6">
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                    Queued Filters
                </CardTitle>
                <CardDescription>
                    {hasImages
                        ? 'Tap on a filter to add it to the queue'
                        : 'Upload images first to enable filters'}
                </CardDescription>
                {!hasImages && <NoImagesWarning />}

                <AppliedAllImagesWarning />
            </CardHeader>
            <CardContent>
                {queuedFilters.map((filter, index) => {
                    const filterMeta = metadataByType[filter.type];
                    const creditCost = filterMeta.creditCost ?? 1;
                    return (
                        <div
                            className={`bg-card rounded-lg border shadow-sm ${!hasImages ? 'opacity-60' : ''}`}
                            key={filter.type}>
                            <Collapsible
                                open={expandedTypes.has(filter.type)}
                                onOpenChange={() =>
                                    toggleStateItem(filter.type)
                                }
                                className="w-full">
                                <div className="p-3 flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="bg-primary/10 p-1.5 rounded-md text-primary">
                                            {filterMeta.icon}
                                        </div>
                                        <span className="font-medium">
                                            {filterMeta.name}
                                        </span>
                                        <Badge
                                            variant="outline"
                                            className="ml-1 text-xs">
                                            {creditCost} credit
                                            {creditCost > 1 ? 's' : ''}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center">
                                        <CollapsibleTrigger asChild>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-7 w-7 mr-1">
                                                {expandedTypes.has(
                                                    filter.type,
                                                ) ? (
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
                                            onClick={() => removeFilter(index)}>
                                            <X className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <CollapsibleContent className="px-3 pb-3">
                                    Parameters:
                                    {filter.params &&
                                        Object.entries(filter.params).map(
                                            ([param, value]) => (
                                                <FilterCardParams
                                                    key={param}
                                                    param={param}
                                                    value={value}
                                                    onValueChange={(values) =>
                                                        updateFilterParam(
                                                            index,
                                                            param,
                                                            values[0],
                                                        )
                                                    }
                                                />
                                            ),
                                        )}
                                </CollapsibleContent>
                            </Collapsible>
                        </div>
                    );
                })}

                {hasImages && (
                    <div className="mt-4 flex justify-between">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={toggleStateAllItems}>
                            {expandedTypesState.allExpanded
                                ? 'Collapse All'
                                : 'Expand All'}
                        </Button>
                        <Button size="sm" onClick={clearAll}>
                            Clear All
                        </Button>
                    </div>
                )}
            </CardContent>
            {hasImages && (
                <CardFooter className="pt-0">
                    <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                        onClick={props.onApplyFilters}
                        disabled={
                            props.processing ||
                            props.credits < props.totalCreditsRequired
                        }>
                        {props.processing ? (
                            <>
                                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                                Processing...
                            </>
                        ) : props.credits < props.totalCreditsRequired ? (
                            <>Not Enough Credits</>
                        ) : (
                            <>Apply Filters to All Images</>
                        )}
                    </Button>
                </CardFooter>
            )}
        </Card>
    );
}
