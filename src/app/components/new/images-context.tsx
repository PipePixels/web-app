'use client';

import { createContext, type ReactNode, useContext, useReducer } from 'react';

export type ImageItem = {
    id: string;
    data: ImageData;
    preview: ImageData;
    selected: boolean;
    name: string;
};

export enum ImagesActionType {
    ToggleSelection = 'TOGGLE_SELECTION',
    SelectAll = 'SELECT_ALL',
    AddImages = 'ADD_IMAGES',
    ClearImages = 'CLEAR_IMAGES',
    RemoveSelected = 'REMOVE_SELECTED',
    RemoveAllSelected = 'REMOVE_ALL_SELECTED',
}

type ImagesAction =
    | { type: ImagesActionType.ToggleSelection; payload: string }
    | { type: ImagesActionType.SelectAll }
    | { type: ImagesActionType.AddImages; payload: ImageItem[] }
    | { type: ImagesActionType.RemoveSelected; payload: string }
    | { type: ImagesActionType.RemoveAllSelected }
    | { type: ImagesActionType.ClearImages };

type Dispatch = (action: ImagesAction) => void;

interface ImagesContextType {
    images: ImageItem[];
    setImages: (images: ImageItem[]) => void;
    hasImages: boolean;

    allSelected: boolean;
    hasSelectedImages: boolean;
    selectedImagesIds: Set<string>;
}

const ImagesContext = createContext<
    { state: ImagesContextType; dispatch: Dispatch } | undefined
>(undefined);

const initialState: ImagesContextType = {
    images: [],
    setImages: () => {},
    hasImages: false,

    allSelected: false,
    hasSelectedImages: false,
    selectedImagesIds: new Set<string>(),
};

export function ImagesProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(imagesReducer, initialState);
    const value = { state, dispatch };
    return (
        <ImagesContext.Provider value={value}>
            {children}
        </ImagesContext.Provider>
    );
}

export function useImages() {
    const context = useContext(ImagesContext);
    if (context == null) {
        throw new Error('useImages must be used within an ImagesProvider');
    }
    return context;
}

export function useImagesSub() {
    const context = useContext(ImagesContext);
    if (context == null) {
        throw new Error('useImages must be used within an ImagesProvider');
    }
    const { state } = context;
    return {
        images: state.images,
        hasImages: state.hasImages,
    };
}

export function useImageSelection() {
    const context = useContext(ImagesContext);

    if (context == null) {
        throw new Error(
            'useImageActions must be used within an ImagesProvider',
        );
    }
    const { state } = context;
    return {
        allSelected: state.allSelected,
        hasSelectedImages: state.hasSelectedImages,
    };
}

// TODO: Check if has dependency to reduce boilerplate
export const imagesReducer = (
    state: ImagesContextType,
    action: ImagesAction,
): ImagesContextType => {
    switch (action.type) {
        case ImagesActionType.AddImages:
            return {
                ...state,
                images: [...state.images, ...action.payload],
                hasImages: true,
            };

        case ImagesActionType.RemoveSelected:
        case ImagesActionType.RemoveAllSelected:
            const selectedImagesIds =
                action.type === ImagesActionType.RemoveSelected
                    ? new Set([action.payload])
                    : state.selectedImagesIds;
            const remainingImages = state.images.filter(
                (image) => !selectedImagesIds.has(image.id),
            );
            return {
                ...state,
                images: remainingImages,
                hasImages: remainingImages.length > 0,
                selectedImagesIds: new Set(),
                allSelected: false,
                hasSelectedImages: false,
            };

        case ImagesActionType.ClearImages:
            return {
                ...state,
                allSelected: false,
                hasImages: false,
                hasSelectedImages: false,
                images: [],
                selectedImagesIds: new Set(),
            };

        case ImagesActionType.ToggleSelection: {
            const isSelected = state.selectedImagesIds.has(action.payload);
            const selectedImagesIds = new Set(state.selectedImagesIds);

            if (isSelected) {
                selectedImagesIds.delete(action.payload);
            } else {
                selectedImagesIds.add(action.payload);
            }
            return {
                ...state,
                allSelected: selectedImagesIds.size === state.images.length,
                hasSelectedImages: selectedImagesIds.size > 0,
                selectedImagesIds,
            };
        }

        // TODO: Implement toggle
        case ImagesActionType.SelectAll: {
            const shouldSelectAll = state.allSelected === false;

            if (shouldSelectAll) {
                return {
                    ...state,
                    allSelected: true,
                    hasSelectedImages: true,
                    selectedImagesIds: new Set(
                        state.images.map(({ id }) => id),
                    ),
                };
            }
            return {
                ...state,
                allSelected: false,
                hasSelectedImages: false,
                selectedImagesIds: new Set(),
            };
        }

        default:
            return state;
    }
};
