import { FilterOperation } from '@/core/domain/filters/interfaces/operations/filter-operation';

/**
 * Parameters for the Flip operation.
 */
export type FlipOperationParams = {
    // Whether to flip horizontally
    horizontal: boolean;

    // Whether to flip vertically
    vertical: boolean;
};

export type FlipOperation = FilterOperation<FlipOperationParams>;
