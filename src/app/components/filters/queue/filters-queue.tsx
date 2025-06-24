import React, { useCallback } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
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
import { FiltersQueueFooter } from '@/app/components/filters/queue/filters-queue-footer';
import { FilterCardList } from './filters-card-list';

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

    const updateFilterParam = useCallback(
        (type: FilterType, params: Record<string, unknown>) => {
            filterQueueDispatch({
                type: FilterQueueActionType.UpdateParams,
                payload: {
                    type: type,
                    params,
                },
            });
        },
        [filterQueueDispatch],
    );

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
                <div
                    className={`max-h-[400px] overflow-y-auto grid gap-y-2 pr-2 -mr-2`}>
                    <FilterCardList
                        filters={queuedFilters}
                        expandedTypes={expandedTypes}
                        hasImages={hasImages}
                        onToggleStateItem={toggleStateItem}
                        onRemoveFilter={removeFilter}
                        onUpdateFilterParam={updateFilterParam}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <FiltersQueueFooter onApplyFilters={props.onApplyFilters} />
            </CardFooter>
        </Card>
    );
}
