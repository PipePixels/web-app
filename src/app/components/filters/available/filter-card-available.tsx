import { FilterMetadata } from '@/core/domain/filters/filter-metadata/filter-metadata';
import { memo } from 'react';
import { FilterCardTooltip } from '@/app/components/filters/filter-card-tooltip';

// TODO: Improve semantic HTML, rename prop 'hasImages' to 'disabled'
export type FilterCardAvailableProps = {
    filter: FilterMetadata;
    hasImages: boolean;
};

function FilterCardAvailableInternal(props: FilterCardAvailableProps) {
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
                </div>
            </div>

            <FilterCardTooltip filter={filter} />
        </div>
    );
}

export const FilterCardAvailable = memo(FilterCardAvailableInternal);
