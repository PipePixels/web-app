import {
    FilterMetadata,
    isFilterNumeric,
} from '@/core/domain/filters/interfaces/operations/filter-metadata';
import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
import { NumericFilter } from '../card-params/numeric-filter';
import { FlipFilter } from '../card-params/flip-filter';

export type FilterCardParamsProps = {
    metadata: FilterMetadata;
    onUpdateParams: (f: FilterType, params: Record<string, unknown>) => void;
};

export function FilterCardParams({
    metadata,
    onUpdateParams,
}: FilterCardParamsProps) {
    if (isFilterNumeric(metadata)) {
        const settings = metadata.settings!;
        const half = (settings.max - settings.min) / 2;
        return (
            <NumericFilter
                min={settings.min}
                max={settings.max}
                defaultValue={half}
                onUpdate={(value) => onUpdateParams(metadata.id, { value })}
            />
        );
    }

    if (metadata.id === FilterType.Rotate) {
        return (
            <NumericFilter
                min={0}
                max={360}
                defaultValue={0}
                onUpdate={(value) => onUpdateParams(metadata.id, { value })}
            />
        );
    }

    if (metadata.id === FilterType.Flip) {
        return <FlipFilter onUpdate={(v) => onUpdateParams(metadata.id, v)} />;
    }

    throw new Error(
        `Tipo de filtro não suportado: ${metadata.id} - ${metadata.name}`,
    );
}
