'use client';

import { createContext, type ReactNode, useContext, useReducer } from 'react';
import {
    FilterHandler,
    FilterType,
} from '@/core/domain/filters/interfaces/operations/filter-operation';

interface FilterQueueContextType {
    queuedFilters: FilterHandler[];
    setQueuedFilters: (filters: FilterHandler[]) => void;
}

const initialState: FilterQueueContextType = {
    queuedFilters: [],
    setQueuedFilters: () => {},
};

export enum FilterQueueActionType {
    Append = 'PUSH',
    Remove = 'REMOVE',
    ClearAll = 'CLEAR_ALL',
}

type FilterQueueAction =
    | { type: FilterQueueActionType.Append; payload: FilterType }
    | { type: FilterQueueActionType.Remove; payload: FilterType }
    | { type: FilterQueueActionType.ClearAll };

type Dispatch = (action: FilterQueueAction) => void;

const FilterQueueContext = createContext<
    { state: FilterQueueContextType; dispatch: Dispatch } | undefined
>(undefined);

// TODO: Implement the reducer logic to handle filter queue actions
export const filterQueueReducer = (
    state: FilterQueueContextType,
    action: FilterQueueAction,
): FilterQueueContextType => {
    return state;
};

export function FiltersQueueProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(filterQueueReducer, initialState);
    const value = { state, dispatch };

    return (
        <FilterQueueContext.Provider value={value}>
            {children}
        </FilterQueueContext.Provider>
    );
}

export function useFiltersQueue() {
    const context = useContext(FilterQueueContext);
    if (context === undefined) {
        throw new Error(
            'useFiltersQueue must be used within a FiltersQueueProvider',
        );
    }
    return context;
}
