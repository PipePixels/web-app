import React from 'react';
import { render, screen } from '@testing-library/react';
import { NoFiltersMessage } from './no-filters-message';

describe('NoFiltersMessage', () => {
    it('should render the correct message', () => {
        render(<NoFiltersMessage />);
        const messageElement = screen.getByRole('status');
        expect(messageElement).toHaveTextContent(
            'No filters match your search',
        );
    });

    it('should have the correct style classes', () => {
        const { container } = render(<NoFiltersMessage />);
        const messageContainer = container.firstChild as HTMLElement;
        expect(messageContainer).toHaveClass('flex');
        expect(messageContainer).toHaveClass('flex-col');
        expect(messageContainer).toHaveClass('items-center');
        expect(messageContainer).toHaveClass('justify-center');
        expect(messageContainer).toHaveClass('text-muted-foreground');
    });

    it('should have a paragraph with text-sm class', () => {
        const { container } = render(<NoFiltersMessage />);
        const paragraph = container.querySelector('p');
        expect(paragraph).toHaveClass('text-sm');
    });
});
