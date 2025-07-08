import { Info } from 'lucide-react';
import React from 'react';

export function AppliedAllImagesWarning() {
    return (
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 rounded-md">
            <p className="text-sm text-blue-600 dark:text-blue-400 flex items-center">
                <Info className="w-4 h-4 mr-2" />
                Filters will be applied to all images
            </p>
        </div>
    );
}
