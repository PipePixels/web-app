import { FilterMetadata } from '@/core/domain/filters/filter-metadata/filter-metadata';
import React, { memo, useCallback } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    FilterQueueActionType,
    useFiltersQueue,
} from '@/app/shared/state/filter-queue.state';
import { SearchInput } from './search-input';
import { NoFiltersMessage } from './no-filters-message';
import { FilterCategoryContainer } from './filter-category-container';
import { AvailableFiltersSectionProps } from './types';

function AvailableFiltersSectionInternal({
    hasImages,
    value,
    onSearch,
    filteredCategories,
}: AvailableFiltersSectionProps) {
    const { dispatch, state } = useFiltersQueue();
    const queuedFiltersTypes = new Set(state.queuedFilters.map((f) => f.type));
    const availableCategories = filteredCategories
        .map((c) => ({
            ...c,
            filters: c.filters.filter((f) => !queuedFiltersTypes.has(f.id)),
        }))
        .filter((c) => c.filters.length > 0);

    const hasMatchedFilters = availableCategories.length > 0;

    const handleAddFilter = useCallback(
        (filter: FilterMetadata) => {
            dispatch({
                type: FilterQueueActionType.Append,
                payload: filter.id,
            });
        },
        [dispatch],
    );

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                    Available Filters
                </CardTitle>
                <CardDescription>
                    {hasImages
                        ? 'Drag these filters to the queue above'
                        : 'Upload images to enable filters'}
                </CardDescription>
                <SearchInput
                    value={value}
                    onSearch={onSearch}
                    disabled={!hasImages}
                />
            </CardHeader>

            <CardContent className="p-0">
                <div
                    className={`max-h-[400px] overflow-y-auto pr-1.5 pl-3 pb-3 ${!hasImages ? 'opacity-60' : ''}`}>
                    {!hasMatchedFilters ? (
                        <NoFiltersMessage />
                    ) : (
                        availableCategories.map((category) => (
                            <FilterCategoryContainer
                                key={category.id}
                                category={category}
                                hasImages={hasImages}
                                onAddFilter={handleAddFilter}
                            />
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export const AvailableFiltersSection = memo(AvailableFiltersSectionInternal);
