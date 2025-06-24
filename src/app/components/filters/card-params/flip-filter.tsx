import React, { useEffect, useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export type FlipParams = {
    horizontal: boolean;
    vertical: boolean;
};

export type FlipFilterProps = {
    onUpdate: (params: FlipParams) => void;
};

function FlipFilterInternal({ onUpdate }: FlipFilterProps) {
    const [state, setState] = useState<FlipParams>({
        horizontal: false,
        vertical: false,
    });

    useEffect(() => {
        onUpdate(state);
    }, [state]);

    const toggle = (key: keyof FlipParams) => {
        setState((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    return (
        <div className="grid gap-3">
            <div className="flex gap-2">
                <Switch
                    checked={state.horizontal}
                    id="horizontal-mode"
                    onCheckedChange={() => toggle('horizontal')}
                />
                <Label htmlFor="horizontal-mode">Horizontal Flip</Label>
            </div>
            <div className="flex gap-2">
                <Switch
                    checked={state.vertical}
                    id="vertical-mode"
                    onCheckedChange={() => toggle('vertical')}
                />
                <Label htmlFor="vertical-mode">Vertical Flip</Label>
            </div>
        </div>
    );
}

export const FlipFilter = React.memo(FlipFilterInternal);
