import { FilterOperation } from '@/core/domain/filters/interfaces/operations/filter-operation';

/**
 * Represents the parameters for a rotation operation.
 */
export type RotateOperationParams = {
    /**
     * The angle in degrees to rotate the element.
     * Positive values indicate clockwise rotation,
     * while negative values indicate counterclockwise rotation.
     */
    angle: number;
};

export type RotateOperation = FilterOperation<RotateOperationParams>;
