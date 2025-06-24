import { Button } from '@/app/ui/button';
import {
    FilterQueueActionType,
    useFiltersQueue,
} from '@/app/shared/state/filter-queue.state';
import {
    FilterQueueItemStateActionType,
    useFilterQueueCollapse,
} from '@/app/shared/state/filter-queue-item.state';

// TODO: Include processing flag for the apply button
export type FiltersQueueFooterProps = {
    onApplyFilters: () => void;
};

export function FiltersQueueFooter(props: FiltersQueueFooterProps) {
    const { state: filterQueueState, dispatch: filterQueueDispatch } =
        useFiltersQueue();
    const { state: expandedTypesState, dispatch: expandedTypesDispatch } =
        useFilterQueueCollapse();
    const queuedFilters = filterQueueState.queuedFilters;

    const onToggleStateAllItems = () => {
        expandedTypesDispatch({
            type: FilterQueueItemStateActionType.ToggleCollapseAll,
            payload: queuedFilters,
        });
    };

    const onClearAll = () => {
        filterQueueDispatch({
            type: FilterQueueActionType.ClearAll,
        });
    };

    const { onApplyFilters } = props;
    const hasFilters = queuedFilters.length > 0;

    if (!hasFilters) {
        return null;
    }

    return (
        <div className="grid gap-y-3 w-full">
            <div className="mt-4 flex justify-between">
                <Button
                    size="sm"
                    variant="outline"
                    onClick={onToggleStateAllItems}>
                    {expandedTypesState.allExpanded
                        ? 'Collapse All'
                        : 'Expand All'}
                </Button>
                <Button size="sm" onClick={onClearAll}>
                    Clear All
                </Button>
            </div>

            <Button
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={onApplyFilters}
                disabled={props.processing}>
                {props.processing ? (
                    <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></div>
                        Processing...
                    </>
                ) : (
                    <>Apply Filters to All Images</>
                )}
            </Button>
        </div>
    );
}
