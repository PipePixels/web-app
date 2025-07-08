import {
    ArrowLeftRightIcon,
    CircleIcon,
    ContrastIcon,
    CropIcon,
    DropletIcon,
    RotateCwIcon,
    SearchIcon,
    SparklesIcon,
    StarIcon,
    SunIcon,
} from 'lucide-react';
import { FilterType } from '../interfaces/operations/filter-operation';
import {
    FilterBasicSettings,
    FilterCategory,
    FilterMetadata,
} from './filter-metadata';

type FilterSettingsMap = {
    [FilterType.Brightness]: FilterBasicSettings;
    [FilterType.Contrast]: FilterBasicSettings;
    [FilterType.Exposure]: FilterBasicSettings;
    [FilterType.Highlights]: FilterBasicSettings;

    [FilterType.Blur]: FilterBasicSettings;
    [FilterType.Clarity]: FilterBasicSettings;
    [FilterType.Sharpen]: FilterBasicSettings;
    [FilterType.Smooth]: FilterBasicSettings;

    [FilterType.Bloom]: FilterBasicSettings;
    [FilterType.Glamour]: FilterBasicSettings;
    [FilterType.Grain]: FilterBasicSettings;
    [FilterType.Monochrome]: undefined;

    [FilterType.Resize]: { width: number; height: number };
    [FilterType.Rotate]: FilterBasicSettings;
    [FilterType.Flip]: { horizontal: boolean; vertical: boolean };
};

type FilterMetadataMap = {
    [K in keyof FilterSettingsMap]: FilterMetadata<FilterSettingsMap[K]> & {
        id: K;
    };
};

export const filterMetadata = [
    {
        id: FilterType.Brightness,
        name: 'Brightness',
        category: FilterCategory.Tone,
        description: 'Adjusts the overall lightness or darkness of the image.',
        creditCost: 1,
        settings: { min: -100, max: 100 },
        icon: <SunIcon />,
    },
    {
        id: FilterType.Contrast,
        name: 'Contrast',
        category: FilterCategory.Tone,
        description:
            'Increases or decreases the difference between light and dark areas.',
        creditCost: 1,
        settings: { min: -100, max: 100 },
        icon: <ContrastIcon />,
    },
    {
        id: FilterType.Exposure,
        name: 'Exposure',
        category: FilterCategory.Tone,
        description: 'Controls the amount of light in the image.',
        creditCost: 1,
        settings: { min: -100, max: 100 },
        icon: <SunIcon />,
    },
    {
        id: FilterType.Highlights,
        name: 'Highlights',
        category: FilterCategory.Tone,
        description:
            'Adjusts the brightness of the brightest parts of the image.',
        creditCost: 1,
        settings: { min: -100, max: 100 },
        icon: <SunIcon />,
    },

    {
        id: FilterType.Blur,
        name: 'Blur',
        category: FilterCategory.Detail,
        description: 'Softens the image by reducing detail.',
        creditCost: 1,
        settings: { min: 0, max: 100 },
        icon: <DropletIcon />,
    },
    {
        id: FilterType.Clarity,
        name: 'Clarity',
        category: FilterCategory.Detail,
        description: 'Enhances the definition of edges.',
        creditCost: 2,
        settings: { min: -100, max: 100 },
        icon: <SearchIcon />,
    },
    {
        id: FilterType.Sharpen,
        name: 'Sharpen',
        category: FilterCategory.Detail,
        description: 'Increases the definition of edges.',
        creditCost: 2,
        settings: { min: 0, max: 100 },
        icon: <SearchIcon />,
    },
    {
        id: FilterType.Smooth,
        name: 'Smooth',
        category: FilterCategory.Detail,
        description: 'Reduces noise while preserving edges.',
        creditCost: 2,
        settings: { min: 0, max: 100 },
        icon: <DropletIcon />,
    },

    {
        id: FilterType.Bloom,
        name: 'Bloom',
        category: FilterCategory.Effect,
        description: 'Creates a soft glow around bright areas.',
        creditCost: 3,
        settings: { min: 0, max: 100 },
        icon: <StarIcon />,
    },
    {
        id: FilterType.Glamour,
        name: 'Glamour',
        category: FilterCategory.Effect,
        description: 'Softens skin tones and adds a subtle glow.',
        creditCost: 3,
        settings: { min: 0, max: 100 },
        icon: <SparklesIcon />,
    },
    {
        id: FilterType.Grain,
        name: 'Grain',
        category: FilterCategory.Effect,
        description: 'Adds film-like grain texture.',
        creditCost: 2,
        settings: { min: 0, max: 100 },
        icon: <CircleIcon />,
    },
    {
        id: FilterType.Monochrome,
        name: 'Monochrome',
        category: FilterCategory.Effect,
        description: 'Converts the image to black and white.',
        creditCost: 1,
        icon: <CircleIcon />,
    },

    {
        id: FilterType.Resize,
        name: 'Resize',
        category: FilterCategory.Transform,
        description: 'Resizes the image while maintaining aspect ratio.',
        creditCost: 1,
        settings: { width: 256, height: 256 },
        icon: <CropIcon />,
    },
    {
        id: FilterType.Rotate,
        name: 'Rotate',
        category: FilterCategory.Transform,
        description: 'Rotates the image by the specified angle.',
        creditCost: 1,
        settings: { min: 0, max: 360 },
        icon: <RotateCwIcon />,
    },
    {
        id: FilterType.Flip,
        name: 'Flip',
        category: FilterCategory.Transform,
        description: 'Flips the image horizontally or vertically.',
        creditCost: 1,
        settings: { horizontal: false, vertical: false },
        icon: <ArrowLeftRightIcon />,
    },
] as const satisfies readonly FilterMetadataMap[keyof FilterMetadataMap][];

export const filterCategories: { id: FilterCategory; name: string }[] = [
    { id: FilterCategory.Tone, name: 'Tone Adjustments' },
    { id: FilterCategory.Detail, name: 'Detail Enhancement' },
    { id: FilterCategory.Effect, name: 'Effects' },
    { id: FilterCategory.Transform, name: 'Transformations' },
];

const filterIdDataPairs = filterMetadata.map((filter) => [filter.id, filter]);

export const filterMetadataMap = Object.fromEntries(filterIdDataPairs) as {
    [K in FilterType]: Extract<(typeof filterMetadata)[number], { id: K }>;
};
