import React, { useEffect, useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/app/ui/input';

export type NumericFilterProps = {
    min: number;
    max: number;
    defaultValue?: number;
    onUpdate: (value: number) => void;
};

function NumericFilterInternal({
    min,
    max,
    defaultValue = min,
    onUpdate,
}: NumericFilterProps) {
    const [value, setValue] = useState<number>(defaultValue);

    useEffect(() => {
        onUpdate(value);
    }, [value]);

    return (
        <div className="grid grid-cols-[1fr_8ch] gap-2">
            <Slider
                value={[value]}
                min={min}
                max={max}
                onValueChange={(values) => setValue(values[0])}
                step={1}
            />
            <Input
                type="number"
                value={value}
                min={min}
                max={max}
                onChange={(e) => setValue(Number(e.target.value))}
            />
        </div>
    );
}

export const NumericFilter = React.memo(NumericFilterInternal);
