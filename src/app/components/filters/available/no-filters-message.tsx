import React, { memo } from 'react';

function NoFiltersMatchedMessage() {
    return (
        <div
            role="status"
            aria-atomic="true"
            className="flex flex-col items-center justify-center h-20 text-muted-foreground p-4">
            <p className="text-sm">No filters match your search</p>
        </div>
    );
}

export const NoFiltersMessage = memo(NoFiltersMatchedMessage);
