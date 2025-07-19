import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { NumericFilter } from './numeric-filter';

describe('NumericFilter', () => {
    const mockOnUpdate = jest.fn();
    const getSliderInput = () =>
        screen.getByRole('spinbutton') as HTMLInputElement;
    const getSlider = () => screen.getByRole('slider') as HTMLInputElement;

    const defaultProps = {
        min: 0,
        max: 100,
        onUpdate: mockOnUpdate,
    };

    const setupTest = (props = {}) => {
        const user = userEvent.setup();
        render(<NumericFilter {...defaultProps} {...props} />);
        return {
            user,
            input: getSliderInput(),
            slider: getSlider(),
        };
    };

    const typeIntoInput = async (
        user: ReturnType<typeof userEvent.setup>,
        input: HTMLInputElement,
        value: string,
    ) => {
        await user.clear(input);
        await user.type(input, value);
    };

    beforeEach(() => jest.clearAllMocks());

    it('should render with default values', () => {
        const { input } = setupTest();
        expect(input.value).toBe('0');
        expect(mockOnUpdate).toHaveBeenCalledWith(0);
    });

    it('should render with custom initial value', () => {
        const { input } = setupTest({ defaultValue: 50 });
        expect(input.value).toBe('50');
        expect(mockOnUpdate).toHaveBeenCalledWith(50);
    });

    it('should update value when typing in input', async () => {
        const { user, input } = setupTest();
        await typeIntoInput(user, input, '75');

        expect(input).toHaveValue(75);
        expect(mockOnUpdate).toHaveBeenCalledWith(75);
    });

    it('should respect minimum and maximum limits', async () => {
        const { user, input } = setupTest();

        await typeIntoInput(user, input, '-10');
        expect(input).toHaveValue(10);

        await typeIntoInput(user, input, '150');
        expect(input).toHaveValue(100);
    });

    it('should update value when slider is moved', async () => {
        const { user, slider, input } = setupTest();

        slider.focus();
        await user.keyboard('[ArrowRight]');
        await user.keyboard('[ArrowRight]');
        await user.keyboard('[ArrowRight]');

        expect(input).toHaveValue(3);
        expect(mockOnUpdate).toHaveBeenCalledWith(3);
    });

    it('should maintain synchronization between slider and input', async () => {
        const { user, input, slider } = setupTest();

        await typeIntoInput(user, input, '25');

        expect(slider).toHaveValue(25);
        expect(mockOnUpdate).toHaveBeenCalledWith(25);
    });
});
