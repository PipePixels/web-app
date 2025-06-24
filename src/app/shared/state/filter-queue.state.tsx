'use client';

import { createContext, type ReactNode, useContext, useReducer } from 'react';
import {
    FilterOperation,
    FilterType,
} from '@/core/domain/filters/interfaces/operations/filter-operation';
import { handlerByType } from '@/adapters/filters/handler-by-type';

export interface FilterQueued {
    type: FilterType;
    params: Record<string, unknown>;
    handler: FilterOperation<never>;
}

interface FilterQueueContextType {
    queuedFilters: FilterQueued[];
}

const initialState: FilterQueueContextType = {
    queuedFilters: [],
};

export enum FilterQueueActionType {
    Append = 'PUSH',
    Remove = 'REMOVE',
    ClearAll = 'CLEAR_ALL',
    UpdateParams = 'UPDATE_PARAMS',
}

type FilterQueueAction =
    | { type: FilterQueueActionType.Append; payload: FilterType }
    | { type: FilterQueueActionType.Remove; payload: FilterType }
    | {
          type: FilterQueueActionType.UpdateParams;
          payload: { type: FilterType; params: Record<string, unknown> };
      }
    | { type: FilterQueueActionType.ClearAll };

type Dispatch = (action: FilterQueueAction) => void;

const FilterQueueContext = createContext<
    { state: FilterQueueContextType; dispatch: Dispatch } | undefined
>(undefined);

// TODO: Calculate total credits required based on queued filters
export function filterQueueReducer(
    state: FilterQueueContextType,
    action: FilterQueueAction,
): FilterQueueContextType {
    const actionType = action.type;
    switch (action.type) {
        case FilterQueueActionType.Append: {
            const type = action.payload;
            const newFilter: FilterQueued = {
                type,
                params: {},
                handler: handlerByType[type],
            };
            return {
                ...state,
                queuedFilters: [...state.queuedFilters, newFilter],
            };
        }

        case FilterQueueActionType.Remove: {
            const type = action.payload;
            return {
                ...state,
                queuedFilters: state.queuedFilters.filter(
                    (filter) => filter.type !== type,
                ),
            };
        }

        case FilterQueueActionType.UpdateParams: {
            const { type, params } = action.payload;
            const { queuedFilters } = state;
            const queueUpdated = queuedFilters.map((filter) => {
                if (filter.type === type) {
                    return {
                        ...filter,
                        params,
                    };
                }
                return filter;
            });
            console.log(queueUpdated);
            return {
                ...state,
                queuedFilters: queueUpdated,
            };
        }

        case FilterQueueActionType.ClearAll: {
            return {
                ...state,
                queuedFilters: [],
            };
        }
        default:
            throw new Error(`Unhandled action type: ${actionType}`);
    }
}

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
