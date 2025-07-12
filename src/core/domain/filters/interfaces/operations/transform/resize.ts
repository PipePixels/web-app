import { FilterOperation } from '@/core/domain/filters/interfaces/operations/filter-operation';

/**
 * Represents the parameters for a resize operation.
 *
 * This type is used to define the dimensions for resizing an element,
 * typically in operations that involve resizing images, UI components,
 * or other graphical content.
 *
 */
export type ResizeOperationParams = {
    // The desired width after the resize operation
    width: number;

    // The desired height after the resize operation
    height: number;
};

/**
 * Resize the dimensions of an element to fit within a bounding box
 * while preserving the aspect ratio.
 */
export type ResizeOperation = FilterOperation<ResizeOperationParams>;
