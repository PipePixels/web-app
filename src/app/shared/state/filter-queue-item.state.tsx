import React, { createContext, ReactNode, useContext, useReducer } from 'react';
import { FilterType } from '@/core/domain/filters/interfaces/operations/filter-operation';

type StatusByType = {
    [key in FilterType]?: boolean;
};

// Store expanded filter types in a Set
type State = {
    expanded: Set<FilterType>;
    statusByType: StatusByType;
    allExpanded: boolean;
};

export enum FilterQueueItemStateActionType {
    ToggleCollapse = 'TOGGLE_COLLAPSE',
    ToggleCollapseAll = 'TOGGLE_COLLAPSE_ALL',
    Remove = 'REMOVE',
    Start = 'START',
}

const defaultState: State = {
    expanded: new Set(),
    statusByType: {},
    allExpanded: false,
};

type Action =
    | {
          type: FilterQueueItemStateActionType.ToggleCollapse;
          payload: FilterType;
      }
    | {
          type: FilterQueueItemStateActionType.ToggleCollapseAll;
          payload: { type: FilterType }[];
      }
    | {
          type: FilterQueueItemStateActionType.Remove;
          payload: FilterType;
      }
    | {
          type: FilterQueueItemStateActionType.Start;
          payload: { type: FilterType }[];
      };

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case FilterQueueItemStateActionType.Start: {
            const types = action.payload.map((f) => f.type);
            return {
                expanded: new Set(types),
                statusByType: types.reduce((acc, type) => {
                    acc[type] = true;
                    return acc;
                }, {} as StatusByType),
                allExpanded: true,
            };
        }

        case FilterQueueItemStateActionType.ToggleCollapse: {
            const statusByType = state.statusByType;

            if (statusByType[action.payload]) {
                statusByType[action.payload] = false;
                state.expanded.delete(action.payload);
                return {
                    ...state,
                    expanded: new Set(state.expanded),
                    statusByType,
                    allExpanded: false,
                };
            }
            statusByType[action.payload] = true;
            const expanded = new Set(state.expanded.add(action.payload));
            return {
                ...state,
                expanded,
                statusByType,
                allExpanded: expanded.size === Object.keys(statusByType).length,
            };
        }

        case FilterQueueItemStateActionType.ToggleCollapseAll: {
            const types = action.payload.map((f) => f.type);
            const everyTypeExpanded = types.every((t) => state.expanded.has(t));

            if (everyTypeExpanded) {
                return {
                    ...state,
                    expanded: new Set(),
                    statusByType: types.reduce((acc, type) => {
                        acc[type] = false;
                        return acc;
                    }, {} as StatusByType),
                    allExpanded: false,
                };
            }
            return {
                ...state,
                expanded: new Set(types),
                statusByType: types.reduce((acc, type) => {
                    acc[type] = true;
                    return acc;
                }, {} as StatusByType),
                allExpanded: true,
            };
        }

        case FilterQueueItemStateActionType.Remove: {
            const statusByType = state.statusByType;
            delete statusByType[action.payload];
            state.expanded.delete(action.payload);
            return {
                ...state,
                expanded: new Set(state.expanded),
                statusByType,
                allExpanded: state.allExpanded,
            };
        }

        default:
            return state;
    }
}

const FilterCollapseContext = createContext<
    { state: State; dispatch: React.Dispatch<Action> } | undefined
>(undefined);

export function FilterCollapseProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(reducer, defaultState);
    return (
        <FilterCollapseContext.Provider value={{ state, dispatch }}>
            {children}
        </FilterCollapseContext.Provider>
    );
}

export function useFilterQueueCollapse() {
    const context = useContext(FilterCollapseContext);
    if (!context)
        throw new Error(
            'useFilterCollapse must be used within FilterCollapseProvider',
        );
    return context;
}
