import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';
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
import { ReactElement } from 'react';

export enum FilterCategory {
    Tone = 'tone',
    Detail = 'detail',
    Effect = 'effect',
    Transform = 'transform',
}

export interface FilterBasicSettings {
    min: number;
    max: number;
}

export interface FilterMetadata<T = unknown> {
    id: FilterType;
    name: string;
    category: FilterCategory;
    description: string;
    creditCost: number;
    settings?: T;
    icon?: ReactElement;
}

export const filterMetadata: FilterMetadata<unknown>[] = [
    // Tone filters
    {
        id: FilterType.Brightness,
        name: 'Brightness',
        category: FilterCategory.Tone,
        description:
            'Adjusts the overall lightness or darkness of the image. Higher values make the image brighter, lower values make it darker.',
        creditCost: 1,
        settings: {
            min: -100,
            max: 100,
        },
        icon: <SunIcon />,
    },
    {
        id: FilterType.Contrast,
        name: 'Contrast',
        category: FilterCategory.Tone,
        description:
            'Increases or decreases the difference between light and dark areas. Higher values increase contrast, lower values decrease it.',
        creditCost: 1,
        settings: {
            min: -100,
            max: 100,
        },
        icon: <ContrastIcon />,
    },
    {
        id: FilterType.Exposure,
        name: 'Exposure',
        category: FilterCategory.Tone,
        description:
            'Controls the amount of light in the image. Similar to brightness but affects highlights more dramatically.',
        creditCost: 1,
        settings: {
            min: -100,
            max: 100,
        },
        icon: <SunIcon />,
    },
    {
        id: FilterType.Highlights,
        name: 'Highlights',
        category: FilterCategory.Tone,
        description:
            'Adjusts the brightness of the brightest parts of the image without affecting shadows.',
        creditCost: 1,
        settings: {
            min: -100,
            max: 100,
        },
        icon: <SunIcon />,
    },

    // Detail filters
    {
        id: FilterType.Blur,
        name: 'Blur',
        category: FilterCategory.Detail,
        description:
            'Softens the image by reducing detail and creating a hazy effect. Higher values create more blur.',
        creditCost: 1,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <DropletIcon />,
    },
    {
        id: FilterType.Clarity,
        name: 'Clarity',
        category: FilterCategory.Detail,
        description:
            'Enhances the definition of edges in the image. Increases local contrast while maintaining overall contrast.',
        creditCost: 2,
        settings: {
            min: -100,
            max: 100,
        },
        icon: <SearchIcon />,
    },
    {
        id: FilterType.Sharpen,
        name: 'Sharpen',
        category: FilterCategory.Detail,
        description:
            'Increases the definition of edges to make the image appear more defined and crisp.',
        creditCost: 2,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <SearchIcon />,
    },
    {
        id: FilterType.Smooth,
        name: 'Smooth',
        category: FilterCategory.Detail,
        description:
            'Reduces noise and small details while preserving edges, creating a smoother appearance.',
        creditCost: 2,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <DropletIcon />,
    },

    // Effect filters
    {
        id: FilterType.Bloom,
        name: 'Bloom',
        category: FilterCategory.Effect,
        description:
            'Creates a soft glow around bright areas of the image, similar to the effect seen in dreamy photography.',
        creditCost: 3,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <StarIcon />,
    },
    {
        id: FilterType.Glamour,
        name: 'Glamour',
        category: FilterCategory.Effect,
        description:
            'Softens skin tones and adds a subtle glow, commonly used in portrait photography.',
        creditCost: 3,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <SparklesIcon />,
    },
    {
        id: FilterType.Grain,
        name: 'Grain',
        category: FilterCategory.Effect,
        description:
            'Adds film-like grain texture to the image, creating a vintage or analog appearance.',
        creditCost: 2,
        settings: {
            min: 0,
            max: 100,
        },
        icon: <CircleIcon />,
    },
    {
        id: FilterType.Monochrome,
        name: 'Monochrome',
        category: FilterCategory.Effect,
        description:
            'Converts the image to black and white while maintaining contrast and detail.',
        creditCost: 1,
        icon: <CircleIcon />,
    },

    // Transform filters
    {
        id: FilterType.Resize,
        name: 'Resize',
        category: FilterCategory.Transform,
        description:
            'Resizes the image while maintaining its aspect ratio. Values above 100 enlarge, below 100 reduce size.',
        creditCost: 1,
        settings: {
            width: 256,
            height: 256,
        },
        icon: <CropIcon />,
    },
    {
        id: FilterType.Rotate,
        name: 'Rotate',
        category: FilterCategory.Transform,
        description:
            'Rotates the image by the specified angle in degrees. Positive values rotate clockwise.',
        creditCost: 1,
        settings: {
            min: 0,
            max: 360,
        },
        icon: <RotateCwIcon />,
    },
    {
        id: FilterType.Flip,
        name: 'Flip',
        category: FilterCategory.Transform,
        description:
            'Flips the image horizontally, creating a mirror reflection of the original.',
        creditCost: 1,
        settings: {
            horizontal: false,
            vertical: false,
        },
        icon: <ArrowLeftRightIcon />,
    },
];

export const filterCategories: { id: FilterCategory; name: string }[] = [
    { id: FilterCategory.Tone, name: 'Tone Adjustments' },
    { id: FilterCategory.Detail, name: 'Detail Enhancement' },
    { id: FilterCategory.Effect, name: 'Effects' },
    { id: FilterCategory.Transform, name: 'Transformations' },
];
