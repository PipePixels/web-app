import {
    FilterCategory,
    FilterMetadata,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import type React from 'react';
import { ChangeEventHandler } from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Input } from '@/app/ui/input';
import { FilterCardAvailable } from '@/app/components/filters/available/filter-card-available';
import {
    FilterQueueActionType,
    useFiltersQueue,
} from '@/app/shared/state/filter-queue.state';

export function AvailableFiltersSection(props: {
    hasImages: boolean;
    value: string;
    onSearch: ChangeEventHandler<HTMLInputElement>;
    filteredCategories: {
        id: FilterCategory;
        name: string;
        filters: FilterMetadata[];
    }[];
}) {
    const { state, dispatch } = useFiltersQueue();
    const hasMatchedFilters = props.filteredCategories.length > 0;

    const addFilter = (filter: FilterMetadata) => {
        dispatch({
            type: FilterQueueActionType.Append,
            payload: filter.id,
        });
    };

    return (
        <Card>
            <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium">
                    Available Filters
                </CardTitle>
                <CardDescription>
                    {props.hasImages
                        ? 'Drag these filters to the queue above'
                        : 'Upload images to enable filters'}
                </CardDescription>

                <div className="relative mt-2">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search filters..."
                        value={props.value}
                        onChange={props.onSearch}
                        className="pl-8"
                        disabled={!props.hasImages}
                    />
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div
                    className={`max-h-[400px] overflow-y-auto pr-1.5 pl-3 pb-3 ${!props.hasImages ? 'opacity-60' : ''}`}>
                    {!hasMatchedFilters ? (
                        <div className="flex flex-col items-center justify-center h-20 text-muted-foreground p-4">
                            <p className="text-sm">
                                No filters match your search
                            </p>
                        </div>
                    ) : (
                        props.filteredCategories.map((category, index) => (
                            <div
                                key={category.id}
                                className={index > 0 ? 'mt-6' : 'mt-3'}>
                                <h3 className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                                    {category.name}
                                </h3>
                                <div className="space-y-2">
                                    {category.filters.map((filter) => (
                                        <a
                                            onClick={() =>
                                                props.hasImages &&
                                                addFilter(filter)
                                            }
                                            key={filter.id}>
                                            <FilterCardAvailable
                                                key={filter.id}
                                                filter={filter}
                                                hasImages={props.hasImages}
                                            />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
