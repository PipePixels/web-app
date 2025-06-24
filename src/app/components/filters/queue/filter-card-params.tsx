import {
    FilterBasicSettings,
    FilterMetadata,
    filterSingleNumberSettings,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/app/ui/input';
import React from 'react';
import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export type FilterCardParamsProps = {
    metadata: FilterMetadata;
};

export function FilterCardParams(props: FilterCardParamsProps) {
    const { metadata } = props;
    const [value, setValue] = React.useState(0);

    if (filterSingleNumberSettings.has(metadata.id)) {
        const settings = metadata.settings as FilterBasicSettings;
        return (
            <div className="grid grid-cols-[1fr_8ch] gap-2">
                <Slider
                    value={[value]}
                    min={settings.min}
                    max={settings.max}
                    onValueChange={(values) => setValue(values[0])}
                    step={1}
                />
                <Input
                    max={settings.max}
                    min={settings.min}
                    onChange={(e) => setValue(Number(e.target.value))}
                    value={value}
                    type={'number'}
                />
            </div>
        );
    }

    if (metadata.id === FilterType.Rotate) {
        return (
            <div className="grid grid-cols-[1fr_8ch] gap-2">
                <Slider
                    value={[value]}
                    min={0}
                    max={360}
                    onValueChange={(values) => setValue(values[0])}
                    step={1}
                />
                <Input
                    max={360}
                    min={0}
                    onChange={(e) => setValue(Number(e.target.value))}
                    value={value}
                    type={'number'}
                />
            </div>
        );
    }

    if (metadata.id === FilterType.Flip) {
        return (
            <div className="grid gap-3">
                <div className="flex gap-2">
                    <Switch id="horizontal-mode" />
                    <Label htmlFor="horizontal-mode">Spell Horizontal</Label>
                </div>
                <div className="flex gap-2">
                    <Switch id="vertical-mode" />
                    <Label htmlFor="vertical-mode">Spell Vertical</Label>
                </div>
            </div>
        );
    }

    throw new Error(
        `Filter type not supported: ${metadata.id} - ${metadata.name}`,
    );
}
