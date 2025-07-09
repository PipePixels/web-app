import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { FlipFilter } from './flip-filter';

describe('FlipFilter', () => {
    // Constants for switch names
    const HORIZONTAL_SWITCH = 'Horizontal Flip';
    const VERTICAL_SWITCH = 'Vertical Flip';

    // Helper functions to get switches
    function getHorizontalSwitch() {
        return screen.getByRole('switch', { name: HORIZONTAL_SWITCH });
    }

    const getVerticalSwitch = () =>
        screen.getByRole('switch', { name: VERTICAL_SWITCH });

    // Setup function to create a mock and render the component
    const setup = () => {
        const mockOnUpdate = jest.fn();
        render(<FlipFilter onUpdate={mockOnUpdate} />);
        return { mockOnUpdate };
    };

    it('should render correctly with initial values', () => {
        // Arrange & Act
        const { mockOnUpdate } = setup();

        // Assert
        expect(getHorizontalSwitch()).toBeInTheDocument();
        expect(getVerticalSwitch()).toBeInTheDocument();

        // Verify that switches are initially unchecked
        expect(getHorizontalSwitch()).not.toBeChecked();
        expect(getVerticalSwitch()).not.toBeChecked();

        // Verify that the onUpdate function was called with initial values
        expect(mockOnUpdate).toHaveBeenCalledWith({
            horizontal: false,
            vertical: false,
        });
    });

    it('should call onUpdate when the horizontal switch is toggled', () => {
        // Arrange & Act
        const { mockOnUpdate } = setup();

        // Clear previous mock calls (the initial call during mounting)
        mockOnUpdate.mockClear();

        const horizontalSwitch = getHorizontalSwitch();

        // Click the horizontal switch
        fireEvent.click(horizontalSwitch);

        // Assert
        expect(mockOnUpdate).toHaveBeenCalledWith({
            horizontal: true,
            vertical: false,
        });
    });

    it('should call onUpdate when the vertical switch is toggled', () => {
        // Arrange & Act
        const { mockOnUpdate } = setup();
        const verticalSwitch = getVerticalSwitch();

        // Clear previous mock calls (the initial call during mounting)
        mockOnUpdate.mockClear();

        // Click the vertical switch
        fireEvent.click(verticalSwitch);

        // Assert
        expect(mockOnUpdate).toHaveBeenCalledWith({
            horizontal: false,
            vertical: true,
        });
    });

    it('should stay independent when toggling switches', () => {
        // Arrange
        const { mockOnUpdate } = setup();
        const horizontalSwitch = getHorizontalSwitch();
        const verticalSwitch = getVerticalSwitch();

        // Clear previous mock calls (the initial call during mounting)
        mockOnUpdate.mockClear();

        // Act - Toggle the horizontal switch
        fireEvent.click(horizontalSwitch);

        // Check if horizontal is active
        expect(mockOnUpdate).toHaveBeenLastCalledWith({
            horizontal: true,
            vertical: false,
        });

        // Act - Toggle the vertical switch
        fireEvent.click(verticalSwitch);

        // Check if both horizontal and vertical are active
        expect(mockOnUpdate).toHaveBeenLastCalledWith({
            horizontal: true,
            vertical: true,
        });

        // Uncheck the horizontal switch
        fireEvent.click(horizontalSwitch);

        // Check if only vertical is active
        expect(mockOnUpdate).toHaveBeenLastCalledWith({
            horizontal: false,
            vertical: true,
        });
    });
});
