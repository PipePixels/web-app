import React, { memo } from 'react';
import { FilterMetadata } from '@/core/domain/filters/filter-metadata/filter-metadata';
import { FilterCardAvailable } from '@/app/components/filters/available/filter-card-available';
import { FilterCategoryGroup } from './types';

export type FilterCategoryProps = {
    category: FilterCategoryGroup;
    hasImages: boolean;
    onAddFilter: (filter: FilterMetadata) => void;
};

function FilterCategoryInternal({
    category,
    hasImages,
    onAddFilter,
}: FilterCategoryProps) {
    return (
        <div className="mt-3 first:mt-3">
            <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                {category.name}
            </h3>
            <ol className="space-y-2">
                {category.filters.map((filter) => (
                    <li key={filter.id} role="listitem">
                        <button
                            onClick={() => onAddFilter(filter)}
                            className="w-full text-left"
                            disabled={!hasImages}>
                            <FilterCardAvailable
                                filter={filter}
                                hasImages={hasImages}
                            />
                        </button>
                    </li>
                ))}
            </ol>
        </div>
    );
}

export const FilterCategory = memo(FilterCategoryInternal);
