import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
import { ReactElement } from 'react';

export enum FilterCategory {
    Tone = 'tone',
    Detail = 'detail',
    Effect = 'effect',
    Transform = 'transform',
}

export interface FilterBasicSettings {
    min: number;
    max: number;
}

export interface FilterMetadata<T = unknown> {
    id: FilterType;
    name: string;
    category: FilterCategory;
    description: string;
    creditCost: number;
    settings?: T;
    icon?: ReactElement;
}
