import {
    FilterOperation,
    FilterType,
} from '@/core/domain/filters/interfaces/operations/filter-operation';
import { bloom } from '@/adapters/filters/creative-effects/custom-cpu/bloom';
import { blur } from '@/adapters/filters/sharpness-clarity/blur';
import { brightness } from '@/adapters/filters/lighting-contrast/brightness';
import { clarity } from '@/adapters/filters/sharpness-clarity/clarity';
import { saturation } from '@/adapters/filters/color/custom-cpu/saturation';
import { temperature } from '@/adapters/filters/color/custom-cpu/temperature';
import { tint } from '@/adapters/filters/color/custom-cpu/tint';
import { vibrance } from '@/adapters/filters/color/custom-cpu/vibrance';
import { glamour } from '@/adapters/filters/creative-effects/custom-cpu/glamour';
import { grain } from '@/adapters/filters/creative-effects/custom-cpu/grain';
import { monochrome } from '@/adapters/filters/creative-effects/custom-cpu/monochrome';
import { contrast } from '@/adapters/filters/lighting-contrast/contrast';
import { exposure } from '@/adapters/filters/lighting-contrast/exposure';
import { highlight } from '@/adapters/filters/lighting-contrast/highlight';
import { sharpen } from '@/adapters/filters/sharpness-clarity/sharpen';
import { smooth } from '@/adapters/filters/sharpness-clarity/smooth';

export const handlerByType: Record<FilterType, FilterOperation<never>> = {
    [FilterType.Saturation]: saturation,
    [FilterType.Temperature]: temperature,
    [FilterType.Tint]: tint,
    [FilterType.Vibrance]: vibrance,
    [FilterType.Bloom]: bloom,
    [FilterType.Glamour]: glamour,
    [FilterType.Grain]: grain,
    [FilterType.Brightness]: brightness,
    [FilterType.Contrast]: contrast,
    [FilterType.Exposure]: exposure,
    [FilterType.Highlights]: highlight,
    [FilterType.Blur]: blur,
    [FilterType.Clarity]: clarity,
    [FilterType.Sharpen]: sharpen,
    [FilterType.Smooth]: smooth,
    [FilterType.Monochrome]: monochrome,
    // TODO: Implement the handlers for the following filters
    [FilterType.Resize]: tint,
    [FilterType.Rotate]: tint,
    [FilterType.Flip]: tint,
};
