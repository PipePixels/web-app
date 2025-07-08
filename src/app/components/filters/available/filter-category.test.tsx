import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import {
    FilterCategoryContainer,
    FilterCategoryProps,
} from './filter-category-container';
import {
    FilterCategory as FilterCategoryEnum,
    FilterMetadata,
} from '@/core/domain/filters/filter-metadata/filter-metadata';
import { FilterCardAvailableProps } from '@/app/components/filters/available/filter-card-available';

// Mock the FilterCardAvailable component
jest.mock('@/app/components/filters/available/filter-card-available', () => ({
    FilterCardAvailable: ({ filter }: FilterCardAvailableProps) => (
        <div data-testid="filter-card">{filter.name}</div>
    ),
}));

describe('FilterCategory', () => {
    const mockFilter: FilterMetadata = {
        // @ts-expect-error - Mocking Id property for testing
        id: 'filter1',
        name: 'Test Filter',
        category: FilterCategoryEnum.Detail,
        description: 'Test description',
        creditCost: 1,
    };
    const mockFilter2: FilterMetadata = {
        // @ts-expect-error - Mocking Id property for testing
        id: 'filter2',
        name: 'Test Filter 2',
        category: FilterCategoryEnum.Detail,
        description: 'Another description',
        creditCost: 2,
    };

    const defaultProps: FilterCategoryProps = {
        category: {
            id: FilterCategoryEnum.Detail,
            name: 'Detail',
            filters: [mockFilter],
        },
        hasImages: true,
        onAddFilter: jest.fn(),
    };

    it('should render the category name', () => {
        render(<FilterCategoryContainer {...defaultProps} />);
        expect(screen.getByText('Detail')).toBeInTheDocument();
    });

    it('should render filters within the category', () => {
        render(<FilterCategoryContainer {...defaultProps} />);
        const listItem = screen.getByRole('listitem');
        expect(listItem).toHaveTextContent('Test Filter');
        expect(listItem).toBeInTheDocument();
        expect(screen.getByTestId('filter-card')).toBeInTheDocument();
    });

    it('should call onAddFilter when a filter is clicked and hasImages is true', () => {
        const mockOnAddFilter = jest.fn();
        render(
            <FilterCategoryContainer
                {...defaultProps}
                onAddFilter={mockOnAddFilter}
                hasImages={true}
            />,
        );

        const filterButton = screen.getByRole('button');
        fireEvent.click(filterButton);

        expect(mockOnAddFilter).toHaveBeenCalledWith(mockFilter);
    });

    it('should not call onAddFilter when a filter is clicked and hasImages is false', () => {
        const mockOnAddFilter = jest.fn();
        render(
            <FilterCategoryContainer
                {...defaultProps}
                onAddFilter={mockOnAddFilter}
                hasImages={false}
            />,
        );

        const filterButton = screen.getByRole('button');
        fireEvent.click(filterButton);

        expect(mockOnAddFilter).not.toHaveBeenCalled();
    });

    it('should disable buttons when hasImages is false', () => {
        render(<FilterCategoryContainer {...defaultProps} hasImages={false} />);

        const filterButton = screen.getByRole('button');
        expect(filterButton).toBeDisabled();
    });

    it('should render multiple filters when the category has several filters', () => {
        const multipleFilters = {
            ...defaultProps,
            category: {
                ...defaultProps.category,
                filters: [mockFilter, mockFilter2],
            },
        };

        render(<FilterCategoryContainer {...multipleFilters} />);
        const allItems = screen.getAllByRole('listitem');
        expect(allItems[0]).toBeInTheDocument();
        expect(allItems[1]).toBeInTheDocument();
        expect(screen.getAllByTestId('filter-card')).toHaveLength(2);
    });
});
