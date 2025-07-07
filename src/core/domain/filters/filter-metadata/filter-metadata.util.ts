import { filterMetadata } from '@/core/domain/filters/filter-metadata/filter-metadata.const';
import {
    FilterBasicSettings,
    FilterCategory,
    FilterMetadata,
} from './filter-metadata';
import { FilterType } from '../interfaces/operations/filter-operation';

export function getFiltersByCategory(category: FilterCategory) {
    return filterMetadata.filter((f) => f.category === category);
}

/**
 * A Set containing filter types that have settings that are a single number value
 * with a min and max value.
 */
const filterSingleNumberSettings = new Set<FilterType>([
    FilterType.Brightness,
    FilterType.Contrast,
    FilterType.Exposure,
    FilterType.Highlights,
    FilterType.Blur,
    FilterType.Clarity,
    FilterType.Sharpen,
    FilterType.Smooth,
    FilterType.Bloom,
    FilterType.Glamour,
    FilterType.Grain,
    FilterType.Rotate,
]);

export function isFilterNumeric(
    filter: FilterMetadata,
): filter is FilterMetadata<FilterBasicSettings> {
    return filterSingleNumberSettings.has(filter.id);
}
