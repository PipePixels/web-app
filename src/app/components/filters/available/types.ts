import {
    FilterCategory,
    FilterMetadata,
} from '@/core/domain/filters/filter-metadata/filter-metadata';
import { ChangeEventHandler } from 'react';

export interface FilterCategoryGroup {
    id: FilterCategory;
    name: string;
    filters: FilterMetadata[];
}

export interface AvailableFiltersSectionProps {
    hasImages: boolean;
    value: string;
    onSearch: ChangeEventHandler<HTMLInputElement>;
    filteredCategories: FilterCategoryGroup[];
}
