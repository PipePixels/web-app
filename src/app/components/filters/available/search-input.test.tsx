import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SearchInput } from './search-input';

// Mock the Search icon to avoid SVG issues in tests
jest.mock('lucide-react', () => ({
    Search: () => <div data-testid="search-icon" />,
}));

describe('SearchInput', () => {
    const defaultProps = {
        value: '',
        onSearch: jest.fn(),
        disabled: false,
    };

    const getInput = () => screen.getByRole('textbox');

    it('should render correctly with default props', () => {
        render(<SearchInput {...defaultProps} />);

        expect(getInput()).toBeInTheDocument();
        expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('should display the correct value', () => {
        render(<SearchInput {...defaultProps} value="test" />);

        const inputElement = getInput();
        expect(inputElement).toHaveValue('test');
    });

    it('should call onSearch when changing the input', () => {
        const mockOnSearch = jest.fn();
        render(<SearchInput {...defaultProps} onSearch={mockOnSearch} />);

        const inputElement = getInput();
        fireEvent.change(inputElement, { target: { value: 'new value' } });

        expect(mockOnSearch).toHaveBeenCalledTimes(1);
    });

    it('should be disabled when disabled is true', () => {
        render(<SearchInput {...defaultProps} disabled={true} />);

        const inputElement = getInput();
        expect(inputElement).toBeDisabled();
    });

    it('should be enabled when disabled is false', () => {
        render(<SearchInput {...defaultProps} disabled={false} />);

        const inputElement = getInput();
        expect(inputElement).not.toBeDisabled();
    });
});
