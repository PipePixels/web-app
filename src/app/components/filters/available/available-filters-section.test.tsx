import React from 'react';
import { render, screen } from '@testing-library/react';
import {
    FilterCategory as FilterCategoryType,
    FilterCategory as FilterCategoryEnum,
} from '@/core/domain/filters/filter-metadata/filter-metadata';
import { getFiltersByCategory } from '@/core/domain/filters/filter-metadata/filter-metadata.util';
import { AvailableFiltersSectionProps } from '@/app/components/filters/available/types';
import { FilterCategoryContainer } from './filter-category-container';
import { AvailableFiltersSection } from '@/app/components/filters/available/available-filters-section';
import {
    FilterQueueContextType,
    FilterQueued,
} from '@/app/shared/state/filter-queue.state';
import { SearchInputProps } from '@/app/components/filters/available/search-input';

// Mock the extracted components
jest.mock('@/app/components/filters/available/search-input', () => ({
    SearchInput: (props: SearchInputProps) => (
        <input
            onChange={props.onSearch}
            data-testid="search-input"
            disabled={props.disabled}
            value={props.value}
        />
    ),
}));

jest.mock('./no-filters-message', () => ({
    NoFiltersMessage: () => <div data-testid="no-filters-message" />,
}));

jest.mock('./filter-category-container', () => ({
    FilterCategory: jest.fn(({ category }) => (
        <div data-testid="filter-category">
            <h3>{category.name}</h3>
        </div>
    )),
}));

// Mock the useFiltersQueue hook
const mockDispatch = jest.fn();
let mockQueuedFilters: FilterQueued[] = [];

jest.mock('@/app/shared/state/filter-queue.state', () => ({
    useFiltersQueue: () => ({
        state: {
            queuedFilters: mockQueuedFilters,
        } as FilterQueueContextType,
        dispatch: mockDispatch,
    }),
    FilterQueueActionType: { Append: 'PUSH' },
}));

describe('AvailableFiltersSection', () => {
    const mockFilter = getFiltersByCategory(FilterCategoryType.Detail)[0];

    beforeEach(() => {
        mockQueuedFilters = [];
        jest.clearAllMocks();
    });

    const defaultProps: AvailableFiltersSectionProps = {
        hasImages: true,
        value: '',
        onSearch: jest.fn(),
        filteredCategories: [
            {
                id: FilterCategoryEnum.Detail,
                name: 'Detail',
                filters: [mockFilter],
            },
        ],
    };

    it('should render the correct title', () => {
        render(<AvailableFiltersSection {...defaultProps} />);

        expect(screen.getByText('Available Filters')).toBeInTheDocument();
    });

    it('should render the description when hasImages is true', () => {
        render(<AvailableFiltersSection {...defaultProps} />);

        expect(
            screen.getByText('Drag these filters to the queue above'),
        ).toBeInTheDocument();
    });

    it('should render the alternative description when hasImages is false', () => {
        render(<AvailableFiltersSection {...defaultProps} hasImages={false} />);

        expect(
            screen.getByText('Upload images to enable filters'),
        ).toBeInTheDocument();
        const disabledSearchInput = screen.getByRole('textbox');
        expect(disabledSearchInput).toBeDisabled();
    });

    it('should render the SearchInput component with the correct props', () => {
        render(<AvailableFiltersSection {...defaultProps} />);
        const searchInput = screen.getByRole('textbox');
        expect(searchInput).toHaveAttribute('value', '');
        expect(searchInput).not.toBeDisabled();
    });

    it('should render filter categories when filteredCategories has items', () => {
        render(<AvailableFiltersSection {...defaultProps} />);

        expect(screen.getByTestId('filter-category')).toBeInTheDocument();
        expect(screen.getByText('Detail')).toBeInTheDocument();
    });

    it('should render the no filters message when filteredCategories is empty', () => {
        render(
            <AvailableFiltersSection
                {...defaultProps}
                filteredCategories={[]}
            />,
        );

        expect(screen.getByTestId('no-filters-message')).toBeInTheDocument();
    });

    it('should pass hasImages to the FilterCategory component', () => {
        render(<AvailableFiltersSection {...defaultProps} hasImages={true} />);
        // expect(filterCategory).toHaveAttribute('hasImages', 'false');
        expect(FilterCategoryContainer).toHaveBeenLastCalledWith(
            {
                category: expect.any(Object),
                hasImages: true,
                onAddFilter: expect.any(Function),
            },
            undefined,
        );
    });

    it('should render multiple categories when filteredCategories has multiple items', () => {
        const multipleCategories = {
            ...defaultProps,
            filteredCategories: [
                {
                    id: FilterCategoryEnum.Detail,
                    name: 'Detail',
                    filters: [mockFilter],
                },
                {
                    id: FilterCategoryEnum.Effect,
                    name: 'Effect',
                    filters: [
                        getFiltersByCategory(FilterCategoryType.Effect)[0],
                    ],
                },
            ],
        };

        render(<AvailableFiltersSection {...multipleCategories} />);

        const filterCategories = screen.getAllByTestId('filter-category');
        expect(filterCategories).toHaveLength(2);
        expect(screen.getByText('Detail')).toBeInTheDocument();
        expect(screen.getByText('Effect')).toBeInTheDocument();
    });

    it('should not display filters that are already in the queue', () => {
        // Setup: Add a filter to the queue
        const detailFilter = getFiltersByCategory(FilterCategoryType.Detail)[0];
        mockQueuedFilters = [
            { type: detailFilter.id, params: {}, handler: jest.fn() },
        ];

        // Create test props with both Detail and Effect filters
        const effectFilter = getFiltersByCategory(FilterCategoryType.Effect)[0];
        const testProps = {
            ...defaultProps,
            filteredCategories: [
                {
                    id: FilterCategoryEnum.Detail,
                    name: 'Detail',
                    filters: [detailFilter],
                },
                {
                    id: FilterCategoryEnum.Effect,
                    name: 'Effect',
                    filters: [effectFilter],
                },
            ],
        };

        render(<AvailableFiltersSection {...testProps} />);

        // Verify: Only the Effect category should be rendered
        // The Detail category should be filtered out since its only filter is already in the queue
        const filterCategories = screen.getAllByTestId('filter-category');
        expect(filterCategories).toHaveLength(1);
        expect(screen.getByText('Effect')).toBeInTheDocument();
        expect(screen.queryByText('Detail')).not.toBeInTheDocument();
    });

    it('should render NoFiltersMessage when all filters are already in the queue', () => {
        // Setup: Add all available filters to the queue
        const detailFilter = getFiltersByCategory(FilterCategoryType.Detail)[0];
        mockQueuedFilters = [
            { type: detailFilter.id, params: {}, handler: jest.fn() },
        ];

        render(<AvailableFiltersSection {...defaultProps} />);

        // Verify: NoFiltersMessage should be displayed
        expect(screen.getByTestId('no-filters-message')).toBeInTheDocument();
        expect(screen.queryByTestId('filter-category')).not.toBeInTheDocument();
    });
});
